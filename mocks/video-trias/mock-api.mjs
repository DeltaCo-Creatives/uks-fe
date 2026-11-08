// Local stand-in for uks-be while uploaded videos (Publikasi) and UKS/M paragraph alignment are built and reviewed.
// It serves the admin and public endpoints those two features use from memory, so the CMS (5174) and the site (5173)
// can be clicked through without a database. Run with `node mocks/video-trias/mock-api.mjs` (port 5103, the dev API
// URL; MOCK_PORT overrides it). Every other public GET is forwarded to the dev API.
// The CMS signs in with any email and password and the user holds every permission, so it listens on 127.0.0.1 only;
// edits and uploads last until the process stops.
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const PORT = Number(process.env.MOCK_PORT) || 5103;
const BASE = '/api/v1';
const UPSTREAM = 'https://uks-dev-dhg9h5fwh7d0gzc0.southeastasia-01.azurewebsites.net/api/v1';
const SELF = `http://localhost:${PORT}`;
const UKSM_SEED_FILE = new URL('../../../uks-be/Uks.Infrastructure/Data/SeedData/uksm/uksm.json', import.meta.url);

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const isoNow = () => new Date().toISOString();
const todayJakarta = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());
const text = (value) => (typeof value === 'string' && value.trim() ? value.trim() : null);

// ---------- Auth and permissions (same claims shape as uks-be's JWT; the CMS only decodes the payload) ----------

const CRUD_MODULES = [
  'Agenda', 'Aplikasi', 'Berita', 'BidangUsahaMitra', 'DukunganMitra', 'Faq', 'HeroSlide', 'JenisDokumen', 'Jenjang',
  'KategoriAgenda', 'KategoriBerita', 'KategoriPraktikBaik', 'KategoriUptBercerita', 'Kementerian', 'Lomba', 'MediaSosial',
  'Mitra', 'PemenangLomba', 'Pengumuman', 'Permissions', 'PraktikBaik', 'ProdukHukum', 'ProgramPrioritas', 'ProgramTautan',
  'Publikasi', 'Roles', 'StatusAgenda', 'StatusBerita', 'StatusPraktikBaik', 'StatusProdukHukum', 'StatusPublikasi',
  'StatusUptBercerita', 'Submenu', 'SystemSettings', 'Tag', 'UptBercerita', 'Users'
];
const PERMISSIONS = [
  ...CRUD_MODULES.flatMap((module) => ['Read', 'Create', 'Update', 'Delete'].map((action) => `${module}.${action}`)),
  'AuditLogs.Read', 'Content.PermanentDelete', 'Roles.AssignPermissions', 'Sessions.Read', 'Sessions.Revoke',
  'StatistikPengunjung.Read', 'Uksm.Read', 'Uksm.Update', 'Uploads.Create', 'Users.AssignRoles'
];
const TOKEN_MINUTES = 8 * 60;
const MOCK_USER_ID = '00000000-0000-4000-a000-000000000001';
const revokedSessions = new Set();

function issueToken(email) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const claims = {
    sub: MOCK_USER_ID, email, jti: randomUUID(), sid: randomUUID(), permission: PERMISSIONS,
    iat: issuedAt, exp: issuedAt + TOKEN_MINUTES * 60
  };
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode(claims)}.`;
}

function claimsOf(req) {
  const token = /^Bearer (\S+)$/i.exec(req.headers.authorization ?? '')?.[1] ?? '';
  try {
    const claims = JSON.parse(Buffer.from(token.split('.')[1] ?? '', 'base64url').toString('utf8'));
    return claims.exp * 1000 > Date.now() && !revokedSessions.has(claims.sid) ? claims : null;
  } catch {
    return null;
  }
}

const hasPermission = (claims, permission) =>
  [claims.permission].flat().some((p) => typeof p === 'string' && p.toLowerCase() === permission.toLowerCase());

function login({ body, reply, invalid }) {
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const errors = {};
  if (!email) errors.Email = ['Email wajib diisi.'];
  else if (!/^[^@\s]+@[^@\s]+$/.test(email)) errors.Email = ['Format email tidak valid.'];
  if (!password.trim()) errors.Password = ['Kata sandi wajib diisi.'];
  if (Object.keys(errors).length > 0) return invalid(errors);
  reply(200, {
    token: issueToken(email), expiresInMinutes: TOKEN_MINUTES, userId: MOCK_USER_ID, email,
    mfaRequired: false, challengeId: null, verifyingEmail: false
  });
}

function logout({ claims, reply }) {
  revokedSessions.add(claims.sid);
  reply(204);
}

// ---------- Response helpers ----------

const PROBLEM = { 'Content-Type': 'application/problem+json; charset=utf-8' };
const FAILURE_TITLES = { 400: 'Bad Request', 404: 'Resource Not Found', 409: 'Conflict' };
const NOT_FOUND = 'Data tidak ditemukan.';

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(body === undefined ? '' : JSON.stringify(body));
}

function paged(q, rows, defaultSize = 10, maxSize = 100) {
  const page = Math.max(1, Number.parseInt(q.get('page'), 10) || 1);
  const requested = Number.parseInt(q.get('pageSize'), 10);
  const pageSize = Math.min(maxSize, requested > 0 ? requested : defaultSize);
  const totalPages = Math.ceil(rows.length / pageSize);
  return {
    items: rows.slice((page - 1) * pageSize, page * pageSize),
    totalCount: rows.length, pageNumber: page, pageSize, totalPages,
    hasPreviousPage: page > 1, hasNextPage: page < totalPages
  };
}

const compare = (x, y) => (x === y ? 0 : x === null || x === undefined ? -1 : y === null || y === undefined ? 1 : x < y ? -1 : 1);
const sortRows = (rows, q, sorters, fallback) => {
  const pick = sorters[q.get('sortBy') ?? fallback];
  const direction = (q.get('sortDir') ?? 'asc').toLowerCase() === 'asc' ? 1 : -1;
  return rows.sort((a, b) => (pick ? direction * compare(pick(a), pick(b)) : 0) || compare(a.createdAt, b.createdAt));
};

// ---------- Uploads ----------

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const DOCUMENT_RULE = {
  ext: ['.pdf', '.doc', '.docx'],
  types: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  mb: 100
};
const UPLOAD_RULES = {
  cover: { ext: ['.jpg', '.jpeg', '.png', '.webp', '.gif'], types: IMAGE_TYPES, mb: 25 },
  logo: { ext: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'], types: [...IMAGE_TYPES, 'image/svg+xml'], mb: 25 },
  dokumen: DOCUMENT_RULE,
  panduan: DOCUMENT_RULE,
  video: { ext: ['.mp4', '.webm'], types: ['video/mp4', 'video/webm'], mb: 100 }
};
// uks-be's FileSignatureValidator: the first 12 bytes as hex. An MP4 has "ftyp" at offset 4, a WebM the EBML magic.
const SIGNATURES = {
  '.jpg': /^ffd8ff/, '.jpeg': /^ffd8ff/, '.png': /^89504e470d0a1a0a/, '.gif': /^474946383[79]61/,
  '.webp': /^52494646.{8}57454250/, '.pdf': /^25504446/, '.docx': /^504b0304/, '.doc': /^d0cf11e0a1b11ae1/,
  '.mp4': /^.{8}66747970/, '.webm': /^1a45dfa3/
};
const uploads = new Map();

const fileUrl = (path) => (path ? `${SELF}/__files/${path}` : null);

async function upload({ req, raw, reply, invalid }) {
  let form = null;
  try {
    form = await new Response(raw, { headers: { 'Content-Type': req.headers['content-type'] ?? '' } }).formData();
  } catch {
    // Not a multipart body: reported below as a missing file.
  }
  const kind = typeof form?.get('kind') === 'string' ? form.get('kind').toLowerCase() : '';
  const file = form?.get('file');
  const rule = Object.hasOwn(UPLOAD_RULES, kind) ? UPLOAD_RULES[kind] : null;
  const errors = {};
  let stored = null;
  if (!rule) errors.Kind = ['Jenis unggahan tidak dikenali.'];
  if (!file || typeof file === 'string' || file.size === 0) {
    errors.File = ['Berkas wajib diisi.'];
  } else if (rule) {
    const ext = extname(file.name).toLowerCase();
    const type = file.type.toLowerCase();
    const bytes = Buffer.from(await file.arrayBuffer());
    if (!rule.ext.includes(ext)) errors.File = [`Ekstensi berkas tidak diizinkan untuk jenis '${kind}'.`];
    else if (!rule.types.includes(type)) errors.File = ['Tipe konten berkas tidak sesuai.'];
    else if (file.size > rule.mb * 1024 * 1024) errors.File = [`Ukuran berkas melebihi batas maksimum ${rule.mb} MB.`];
    else if (ext !== '.svg' && !SIGNATURES[ext].test(bytes.subarray(0, 12).toString('hex'))) {
      errors.File = ['Isi berkas tidak sesuai dengan format yang diklaim.'];
    } else stored = { bytes, type, ext };
  }
  if (Object.keys(errors).length > 0) return invalid(errors);
  const date = new Date();
  const path = `${kind}/${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${randomUUID()}${stored.ext}`;
  uploads.set(path, stored);
  reply(200, { path, url: fileUrl(path), size: stored.bytes.length, contentType: stored.type });
}

// GET/HEAD /__files/*: the stored content type, with Range so <video> can seek.
function serveFile(req, res, path) {
  const stored = uploads.get(decodeURIComponent(path.slice('/__files/'.length)));
  if (!stored) return send(res, 404, { message: NOT_FOUND });
  const total = stored.bytes.length;
  const headers = {
    'Content-Type': stored.type, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store',
    // SVG uploads skip uks-be's sanitizer here, so this stops their scripts when one is opened directly.
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; media-src 'self'"
  };
  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range ?? '');
  let start = 0;
  let end = total - 1;
  let status = 200;
  if (range && (range[1] || range[2])) {
    if (range[1]) {
      start = Number(range[1]);
      end = range[2] ? Math.min(Number(range[2]), total - 1) : total - 1;
    } else {
      start = Math.max(0, total - Number(range[2]));
    }
    if (start > end || start >= total) {
      res.writeHead(416, { ...headers, 'Content-Range': `bytes */${total}` });
      return res.end();
    }
    status = 206;
    headers['Content-Range'] = `bytes ${start}-${end}/${total}`;
  }
  headers['Content-Length'] = end - start + 1;
  res.writeHead(status, headers);
  res.end(req.method === 'HEAD' ? undefined : stored.bytes.subarray(start, end + 1));
}

// ---------- Masters used by the Publikasi form and filters ----------

const stamp = isoNow();
const master = (id, nama, slug) => ({
  id, nama, slug, status: 'aktif', isDeleted: false, deletedAt: null, createdAt: stamp, updatedAt: stamp
});
const MASTERS = {
  'jenis-dokumen': { permission: 'JenisDokumen', rows: [master('5a000000-0000-4000-8000-000000000001', 'Pedoman', 'pedoman'), master('5a000000-0000-4000-8000-000000000002', 'Panduan', 'panduan')] },
  jenjang: { permission: 'Jenjang', rows: [master('5b000000-0000-4000-8000-000000000001', 'PAUD', 'paud'), master('5b000000-0000-4000-8000-000000000002', 'SD', 'sd'), master('5b000000-0000-4000-8000-000000000003', 'SMP', 'smp')] },
  'status-publikasi': { permission: 'StatusPublikasi', rows: [master('5c000000-0000-4000-8000-000000000001', 'Draf', 'draf'), master('5c000000-0000-4000-8000-000000000002', 'Publis', 'publis')] },
  tag: { permission: 'Tag', rows: [] }
};
const STATUS_PUBLIS = MASTERS['status-publikasi'].rows[1];

function listMaster(name) {
  return ({ url, reply }) => {
    const q = url.searchParams;
    const search = (q.get('search') ?? '').trim().toLowerCase();
    const dataStatus = q.get('dataStatus') ?? 'aktif';
    const status = q.get('status');
    const rows = MASTERS[name].rows.filter((r) =>
      (dataStatus === 'semua' || r.isDeleted === (dataStatus === 'dihapus'))
      && (!status || r.status === status)
      && (!search || r.nama.toLowerCase().includes(search)));
    sortRows(rows, q, { nama: (r) => r.nama.toLowerCase(), createdAt: (r) => r.createdAt }, 'nama');
    reply(200, paged(q, rows));
  };
}

function getMaster(name) {
  return ({ params: [id], reply, fail }) => {
    const row = MASTERS[name].rows.find((r) => r.id === id.toLowerCase());
    return row ? reply(200, row) : fail(404, NOT_FOUND);
  };
}

// ---------- Submenus (sidebar, filters, form) ----------

const SUBMENU_IDS = {
  buku: '3f6b2d10-7a41-4c8e-9b05-1e2a4d6c8f06',
  infografis: '3f6b2d10-7a41-4c8e-9b05-1e2a4d6c8f07',
  video: '3f6b2d10-7a41-4c8e-9b05-1e2a4d6c8f08'
};
const submenus = [
  ['buku', 'Buku Panduan & Juknis', 'fa-solid fa-book', 1],
  ['infografis', 'Infografis Edukasi', 'fa-solid fa-chart-pie', 2],
  ['video', 'Video Pembiasaan & Senam', 'fa-solid fa-film', 3]
].map(([slug, label, ikon, urutan]) => ({
  id: SUBMENU_IDS[slug], menu: 'publikasi', slug, label, ikon, urutan, template: slug, isAktif: true,
  isDeleted: false, deletedAt: null, createdAt: stamp, updatedAt: stamp
}));
const toOption = ({ id, slug, label, menu, template }) => ({ id, slug, label, menu, template });

function submenuOptions({ url, reply }) {
  const templates = (url.searchParams.get('templates') ?? '').split(',').map((t) => t.trim()).filter(Boolean);
  reply(200, submenus.filter((s) => s.isAktif && (templates.length === 0 || templates.includes(s.template))).map(toOption));
}

// ---------- Publikasi ----------

const YOUTUBE_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com'];

function youtubeId(value) {
  const u = typeof value === 'string' && URL.canParse(value.trim()) ? new URL(value.trim()) : null;
  if (!u || !YOUTUBE_HOSTS.includes(u.hostname)) return null;
  const parts = u.pathname.split('/').filter(Boolean);
  let id = null;
  if (u.hostname === 'youtu.be') id = parts.length === 1 ? parts[0] : null;
  else if (parts.length === 1 && parts[0] === 'watch') id = u.searchParams.get('v');
  else if (parts.length === 2 && ['shorts', 'embed', 'live', 'v'].includes(parts[0])) id = parts[1];
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;
}

const daysAgo = (n) => new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);
const blankPublikasi = {
  deskripsi: null, jenisDokumenId: null, jenjangId: null, penulis: null, penerbit: null, cover: null, coverLink: null,
  thumbnail: null, thumbnailLink: null, fileDokumen: null, fileLink: null, ukuranFile: null, jumlahHalaman: null,
  durasi: null, linkEksternal: null, urlYoutube: null, kodeEmbedYoutube: null, kodeJurnal: null, fileVideo: null,
  foto: [], tagIds: []
};
const publikasi = [
  ['Cbqg3RnW0ss', 'Senam Sehat Sekolah Sehat', 'senam-sehat-sekolah-sehat', '05:12', 'Kemendikdasmen', 2],
  ['gl56oxJOWVo', 'Pembiasaan Cuci Tangan Pakai Sabun', 'pembiasaan-cuci-tangan-pakai-sabun', '03:40', 'Kemendikdasmen', 9]
].map(([kode, judul, slug, durasi, penerbit, age], i) => ({
  ...blankPublikasi,
  id: `00000000-0000-4000-b000-${String(i + 1).padStart(12, '0')}`, judul, slug, submenuId: SUBMENU_IDS.video,
  statusId: STATUS_PUBLIS.id, tanggalPublikasi: daysAgo(age), durasi, penerbit,
  urlYoutube: `https://www.youtube.com/watch?v=${kode}`, kodeEmbedYoutube: kode,
  isDeleted: false, deletedAt: null, createdAt: new Date(Date.now() - (10 - i) * 3_600_000).toISOString(), updatedAt: null,
  jumlahDilihat: 0, jumlahDiunduh: 0
}));

const findPublikasi = (id) => publikasi.find((p) => p.id === String(id).toLowerCase());
const refOf = (rows, id) => (id ? rows.find((r) => r.id === id) ?? null : null);

function tagRefs(p) {
  return p.tagIds.map((id) => MASTERS.tag.rows.find((t) => t.id === id)).filter(Boolean).map(({ id, nama, slug }) => ({ id, nama, slug }));
}

function toListItem(p) {
  const jenis = refOf(MASTERS['jenis-dokumen'].rows, p.jenisDokumenId);
  const jenjang = refOf(MASTERS.jenjang.rows, p.jenjangId);
  const status = refOf(MASTERS['status-publikasi'].rows, p.statusId);
  return {
    id: p.id, judul: p.judul, slug: p.slug, submenuId: p.submenuId,
    submenu: toOption(submenus.find((s) => s.id === p.submenuId)),
    jenisDokumen: jenis && { id: jenis.id, nama: jenis.nama }, jenjang: jenjang && { id: jenjang.id, nama: jenjang.nama },
    status: { id: status.id, nama: status.nama, slug: status.slug },
    tanggalPublikasi: p.tanggalPublikasi, coverUrl: p.cover ? fileUrl(p.cover) : p.coverLink,
    tags: tagRefs(p), isDeleted: p.isDeleted, deletedAt: p.deletedAt, createdAt: p.createdAt, updatedAt: p.updatedAt,
    jumlahDilihat: p.jumlahDilihat, jumlahDiunduh: p.jumlahDiunduh
  };
}

function toDetail(p) {
  return {
    ...toListItem(p),
    deskripsi: p.deskripsi, jenisDokumenId: p.jenisDokumenId, jenjangId: p.jenjangId, statusId: p.statusId,
    penulis: p.penulis, penerbit: p.penerbit, cover: p.cover, coverLink: p.coverLink,
    thumbnail: p.thumbnail, thumbnailUrl: fileUrl(p.thumbnail), thumbnailLink: p.thumbnailLink,
    fileDokumen: p.fileDokumen, fileDokumenUrl: fileUrl(p.fileDokumen), fileLink: p.fileLink, ukuranFile: p.ukuranFile,
    jumlahHalaman: p.jumlahHalaman, durasi: p.durasi, linkEksternal: p.linkEksternal, urlYoutube: p.urlYoutube,
    kodeEmbedYoutube: p.kodeEmbedYoutube, kodeJurnal: p.kodeJurnal,
    fileVideo: p.fileVideo, fileVideoUrl: fileUrl(p.fileVideo),
    foto: p.foto.map((f) => ({ file: f.file, fileUrl: fileUrl(f.file), keterangan: f.keterangan }))
  };
}

const PUBLIKASI_SORTERS = {
  judul: (p) => p.judul.toLowerCase(),
  tanggalPublikasi: (p) => p.tanggalPublikasi,
  createdAt: (p) => p.createdAt,
  updatedAt: (p) => p.updatedAt,
  jumlahDilihat: (p) => p.jumlahDilihat
};

function listPublikasi({ url, reply }) {
  const q = url.searchParams;
  const dataStatus = q.get('dataStatus') ?? 'aktif';
  const search = (q.get('search') ?? '').trim().toLowerCase();
  const rows = publikasi.filter((p) =>
    (dataStatus === 'semua' || p.isDeleted === (dataStatus === 'dihapus'))
    && (!search || p.judul.toLowerCase().includes(search))
    && ['submenuId', 'jenisDokumenId', 'jenjangId', 'statusId'].every((key) => !q.get(key) || p[key] === q.get(key).toLowerCase())
    && (!q.get('tagId') || p.tagIds.includes(q.get('tagId').toLowerCase())));
  if (!q.get('sortBy')) q.set('sortBy', 'tanggalPublikasi');
  if (!q.get('sortDir')) q.set('sortDir', 'desc');
  const result = paged(q, sortRows(rows, q, PUBLIKASI_SORTERS, 'tanggalPublikasi'));
  reply(200, { ...result, items: result.items.map(toListItem) });
}

function getPublikasi({ params: [id], reply, fail }) {
  const p = findPublikasi(id);
  return p ? reply(200, toDetail(p)) : fail(404, NOT_FOUND);
}

function slugAvailable({ url, reply }) {
  const slug = url.searchParams.get('slug') ?? '';
  const exclude = (url.searchParams.get('excludeId') ?? '').toLowerCase();
  reply(200, { available: !publikasi.some((p) => p.slug === slug && p.id !== exclude) });
}

function resolveTags(names) {
  const ids = [];
  for (const raw of Array.isArray(names) ? names : []) {
    const nama = text(raw);
    if (!nama) continue;
    let tag = MASTERS.tag.rows.find((t) => t.nama.toLowerCase() === nama.toLowerCase());
    if (!tag) {
      const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'tag';
      tag = master(randomUUID(), nama, slug);
      MASTERS.tag.rows.push(tag);
    }
    if (!ids.includes(tag.id)) ids.push(tag.id);
  }
  return ids;
}

const nullable = (value) => text(value);

function savePublikasi({ body, reply, invalid, fail }, id) {
  const input = isObject(body) ? body : {};
  const errors = {};
  const judul = text(input.judul);
  const slug = text(input.slug);
  const submenu = submenus.find((s) => s.id === String(input.submenuId ?? '').toLowerCase());
  const status = refOf(MASTERS['status-publikasi'].rows, String(input.statusId ?? '').toLowerCase());
  if (!judul) errors.Judul = ['Judul wajib diisi.'];
  else if (judul.length > 255) errors.Judul = ['Judul maksimal 255 karakter.'];
  if (!slug) errors.Slug = ['Slug wajib diisi.'];
  else if (!/^[a-z0-9-]+$/.test(slug)) errors.Slug = ['Slug hanya boleh huruf kecil, angka, dan tanda hubung.'];
  else if (publikasi.some((p) => p.slug === slug && p.id !== id)) errors.Slug = ['Slug sudah digunakan.'];
  if (!submenu) errors.SubmenuId = ['Submenu tidak ditemukan.'];
  if (!status) errors.StatusId = ['Status tidak ditemukan.'];
  if (input.tanggalPublikasi && !/^\d{4}-\d{2}-\d{2}$/.test(input.tanggalPublikasi)) errors.TanggalPublikasi = ['Tanggal publikasi tidak valid.'];

  const fields = {
    judul, slug, submenuId: submenu?.id, statusId: status?.id, tanggalPublikasi: input.tanggalPublikasi || null,
    deskripsi: nullable(input.deskripsi), jenisDokumenId: nullable(input.jenisDokumenId)?.toLowerCase() ?? null,
    jenjangId: nullable(input.jenjangId)?.toLowerCase() ?? null, penulis: nullable(input.penulis), penerbit: nullable(input.penerbit),
    cover: nullable(input.cover), coverLink: nullable(input.coverLink), thumbnail: nullable(input.thumbnail),
    thumbnailLink: nullable(input.thumbnailLink), fileDokumen: nullable(input.fileDokumen), fileLink: nullable(input.fileLink),
    jumlahHalaman: Number.isInteger(input.jumlahHalaman) ? input.jumlahHalaman : null, durasi: nullable(input.durasi),
    linkEksternal: nullable(input.linkEksternal), urlYoutube: nullable(input.urlYoutube),
    kodeEmbedYoutube: nullable(input.kodeEmbedYoutube), kodeJurnal: nullable(input.kodeJurnal), fileVideo: nullable(input.fileVideo),
    foto: [], tagIds: []
  };
  if (fields.jenisDokumenId && !refOf(MASTERS['jenis-dokumen'].rows, fields.jenisDokumenId)) errors.JenisDokumenId = ['Jenis dokumen tidak ditemukan.'];
  if (fields.jenjangId && !refOf(MASTERS.jenjang.rows, fields.jenjangId)) errors.JenjangId = ['Jenjang tidak ditemukan.'];

  if (submenu?.template === 'video') {
    if (fields.fileVideo && !fields.fileVideo.startsWith('video/')) errors.FileVideo = ['Berkas video tidak valid.'];
    else if (!fields.urlYoutube && !fields.fileVideo) errors.UrlYoutube = ['Video wajib memiliki URL YouTube atau berkas video.'];
    else if (fields.urlYoutube && fields.fileVideo) errors.UrlYoutube = ['Pilih salah satu: URL YouTube atau berkas video.'];
    else if (fields.fileVideo && !fields.thumbnail && !fields.thumbnailLink) errors.Thumbnail = ['Video unggahan wajib memiliki thumbnail.'];
    if (fields.urlYoutube && !errors.UrlYoutube && !youtubeId(fields.urlYoutube)) errors.UrlYoutube = ['URL YouTube tidak valid.'];
  } else {
    fields.fileVideo = null;
  }
  if (submenu?.template === 'galeri' || Array.isArray(input.foto)) {
    fields.foto = submenu?.template === 'galeri' ? (input.foto ?? []).filter((f) => text(f?.file)).map((f) => ({ file: f.file, keterangan: nullable(f.keterangan) })) : [];
  }

  if (Object.keys(errors).length > 0) return invalid(errors);
  fields.tagIds = resolveTags(input.tags);
  if (fields.urlYoutube && !fields.kodeEmbedYoutube) fields.kodeEmbedYoutube = youtubeId(fields.urlYoutube);
  if (id) {
    const existing = findPublikasi(id);
    if (!existing || existing.isDeleted) return fail(404, NOT_FOUND);
    Object.assign(existing, fields, { updatedAt: isoNow() });
    return reply(204);
  }
  const item = {
    ...blankPublikasi, ...fields, id: randomUUID(), isDeleted: false, deletedAt: null, createdAt: isoNow(), updatedAt: null,
    jumlahDilihat: 0, jumlahDiunduh: 0
  };
  publikasi.push(item);
  reply(201, { id: item.id });
}

function softDelete(p) {
  p.isDeleted = true;
  p.deletedAt = isoNow();
}

function deletePublikasi({ params: [id], reply, fail }) {
  const p = findPublikasi(id);
  if (!p || p.isDeleted) return fail(404, NOT_FOUND);
  softDelete(p);
  reply(204);
}

function bulkDeletePublikasi({ body, reply, invalid }) {
  if (!Array.isArray(body?.ids)) return invalid({ Ids: ['Ids wajib diisi.'] });
  const failed = [];
  for (const id of body.ids) {
    const p = findPublikasi(id);
    if (p && !p.isDeleted) softDelete(p);
    else failed.push({ id, reason: NOT_FOUND });
  }
  reply(200, { deleted: body.ids.length - failed.length, failed });
}

function restorePublikasi({ params: [id], reply, fail }) {
  const p = findPublikasi(id);
  if (!p) return fail(404, NOT_FOUND);
  if (!p.isDeleted) return fail(400, 'Data tidak dalam status terhapus.');
  p.isDeleted = false;
  p.deletedAt = null;
  reply(204);
}

function purgePublikasi({ params: [id], reply, fail }) {
  const p = findPublikasi(id);
  if (!p) return fail(404, NOT_FOUND);
  if (!p.isDeleted) return fail(400, 'Hapus data terlebih dahulu; hapus permanen hanya untuk data yang sudah terhapus.');
  publikasi.splice(publikasi.indexOf(p), 1);
  reply(204);
}

// GET /public/publikasi for the video submenu; any other submenu is forwarded upstream by the caller.
function publicVideoList(url, res) {
  const q = url.searchParams;
  const page = q.has('page') ? Number(q.get('page')) : 1;
  const size = q.has('pageSize') ? Number(q.get('pageSize')) : 10;
  if (!Number.isInteger(page) || page < 1 || page > 10_000 || !Number.isInteger(size) || size < 1 || size > 50) {
    return send(res, 400, { title: 'One or more validation errors occurred.', status: 400, errors: { PageSize: ['pageSize harus antara 1 dan 50.'] } }, PROBLEM);
  }
  const today = todayJakarta();
  const rows = publikasi
    .filter((p) => p.submenuId === SUBMENU_IDS.video && !p.isDeleted && p.statusId === STATUS_PUBLIS.id
      && p.tanggalPublikasi && p.tanggalPublikasi <= today)
    .sort((a, b) => compare(b.tanggalPublikasi, a.tanggalPublikasi) || compare(b.createdAt, a.createdAt));
  const items = rows.map((p) => {
    const id = youtubeId(p.urlYoutube);
    const uploaded = Boolean(p.fileVideo);
    return {
      id: p.id, slug: p.slug, title: p.judul, duration: p.durasi, channel: p.penerbit,
      thumb: p.thumbnailLink ?? fileUrl(p.thumbnail) ?? (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null),
      youtubeUrl: uploaded ? null : p.urlYoutube,
      embedUrl: uploaded || !id ? null : `https://www.youtube-nocookie.com/embed/${id}`,
      videoUrl: uploaded ? fileUrl(p.fileVideo) : null,
      submenuId: p.submenuId, submenuSlug: 'video'
    };
  });
  const result = paged(new URLSearchParams({ page, pageSize: size }), items);
  send(res, 200, result, { 'Cache-Control': 'no-store' });
}

// ---------- UKS/M ----------

const KELOMPOK_ORDER = ['trias', 'profil', 'struktur', 'stratifikasi', 'mitra'];
const ALIGN_VALUES = ['center', 'right', 'justify'];
const ALIGN_ERROR = 'Perataan teks tidak valid.';
const SECTION_LIMIT = 30;
let halaman = [];

const usable = (rows) => Array.isArray(rows) && rows.length > 0 && rows.every((r) =>
  isObject(r) && typeof r.slug === 'string' && typeof r.kelompok === 'string' && 'induk' in r
  && Number.isInteger(r.urutan) && typeof r.judul === 'string' && isObject(r.dokumen));

async function seedUksm() {
  let rows = null;
  let origin = 'dev API';
  try {
    const r = await fetch(`${UPSTREAM}/public/uksm`, { signal: AbortSignal.timeout(10_000) });
    if (r.ok) rows = await r.json();
  } catch {
    // Offline: the seed file below stands in.
  }
  if (!usable(rows)) {
    rows = JSON.parse(await readFile(UKSM_SEED_FILE, 'utf8'));
    origin = 'uksm.json';
  }
  halaman = rows
    .map((r) => ({ id: randomUUID(), slug: r.slug, kelompok: r.kelompok, induk: r.induk ?? null, urutan: r.urutan, judul: r.judul, dokumen: structuredClone(r.dokumen), updatedAt: null }))
    .sort((a, b) => compare(KELOMPOK_ORDER.indexOf(a.kelompok), KELOMPOK_ORDER.indexOf(b.kelompok)) || a.urutan - b.urutan);
  console.log(`UKS/M seeded with ${halaman.length} rows from ${origin}`);
}

const findHalaman = (id) => halaman.find((h) => h.id === String(id).toLowerCase());
const toHalamanDto = (h) => ({ id: h.id, slug: h.slug, kelompok: h.kelompok, induk: h.induk, urutan: h.urutan, judul: h.judul, updatedAt: h.updatedAt, dokumen: h.dokumen });

const HALAMAN_SORTERS = {
  judul: (h) => h.judul.toLowerCase(),
  updatedAt: (h) => (h.updatedAt ? Date.parse(h.updatedAt) : null),
  urutan: (h) => h.urutan
};

function listHalaman({ url, reply }) {
  const q = url.searchParams;
  const search = (q.get('search') ?? '').trim().toLowerCase();
  const rows = halaman.filter((h) =>
    (!q.get('kelompok') || h.kelompok === q.get('kelompok'))
    && (!q.get('induk') || h.induk === q.get('induk'))
    && (!search || h.judul.toLowerCase().includes(search) || h.slug.includes(search)));
  const pick = HALAMAN_SORTERS[q.get('sortBy') ?? 'urutan'] ?? HALAMAN_SORTERS.urutan;
  const direction = (q.get('sortDir') ?? 'asc').toLowerCase() === 'asc' ? 1 : -1;
  rows.sort((a, b) => direction * compare(pick(a), pick(b)) || compare(a.id, b.id));
  const result = paged(q, rows);
  reply(200, { ...result, items: result.items.map(toHalamanDto) });
}

function getHalaman({ params: [id], reply, fail }) {
  const h = findHalaman(id);
  return h ? reply(200, toHalamanDto(h)) : fail(404, NOT_FOUND);
}

// Paragraph fields a row may align: pillar -> description, sub-program -> summary + description, profil/tujuan -> sentence.
function alignFieldsOf(h) {
  if (h.kelompok === 'trias') return h.induk === null ? ['description'] : ['summary', 'description'];
  if (h.kelompok === 'profil' && h.slug === 'tujuan') return ['sentence'];
  return [];
}

// Returns the dokumen with "left" dropped and empty maps removed, or null when an align value is not allowed.
function normalizeAlign(h, dokumen) {
  const next = structuredClone(dokumen);
  const clean = (map, allowed) => {
    if (map === undefined) return { map: undefined };
    if (!isObject(map)) return null;
    const out = {};
    for (const [field, value] of Object.entries(map)) {
      if (!allowed.includes(field) || typeof value !== 'string' || ![...ALIGN_VALUES, 'left'].includes(value)) return null;
      if (value !== 'left') out[field] = value;
    }
    return { map: Object.keys(out).length > 0 ? out : undefined };
  };
  const top = clean(next.align, alignFieldsOf(h));
  if (!top) return null;
  if (top.map) next.align = top.map;
  else delete next.align;
  if (Array.isArray(next.sections)) {
    if (next.sections.length > SECTION_LIMIT) return null;
    for (const section of next.sections) {
      if (!isObject(section)) continue;
      const result = clean(section.align, section.type === 'text' ? ['text'] : []);
      if (!result) return null;
      if (result.map) section.align = result.map;
      else delete section.align;
    }
  }
  return next;
}

function updateHalaman({ params: [id], body, reply, invalid, fail }) {
  const input = isObject(body) ? body : {};
  const judul = text(input.judul);
  const errors = {};
  if (!isObject(input.dokumen)) errors.Dokumen = ['Dokumen wajib diisi.'];
  if (input.judul !== undefined && input.judul !== null && !judul) errors.Judul = ['Judul wajib diisi.'];
  const h = findHalaman(id);
  let dokumen = null;
  if (!errors.Dokumen && h) {
    dokumen = normalizeAlign(h, input.dokumen);
    if (!dokumen) errors.Dokumen = [ALIGN_ERROR];
  }
  if (Object.keys(errors).length > 0) return invalid(errors);
  if (!h) return fail(404, NOT_FOUND);
  // Milliseconds, because a client that re-serializes the value through a JS Date has lost the last digits.
  const millis = (value) => (value ? Date.parse(value) : null);
  if (millis(input.updatedAt) !== millis(h.updatedAt)) {
    return fail(409, 'Halaman sudah diubah orang lain. Muat ulang halaman lalu ulangi perubahan Anda.');
  }
  if (judul) h.judul = judul;
  h.dokumen = dokumen;
  h.updatedAt = isoNow();
  reply(204);
}

const publicHalaman = ({ slug, kelompok, induk, urutan, judul, dokumen }) => ({ slug, kelompok, induk, urutan, judul, dokumen });

// ---------- Site settings (Pengaturan Situs) ----------

const SETTINGS_MODULES = ['kontak', 'tautan', 'stratifikasi', 'pengunjung', 'tampilan'];
const JARAK_HURUF_KEY = 'tampilan.jarakHurufJudul';
const JARAK_HURUF_VALUES = ['rapat', 'sedang', 'lega'];
const JARAK_HURUF_ERROR = 'Pilihan jarak huruf judul tidak valid.';
const JARAK_KATA_KEY = 'tampilan.jarakKataJudul';
const JARAK_KATA_ERROR = 'Pilihan jarak antar kata judul tidak valid.';
const settings = new Map();

function getSettingsModule({ params: [module], reply, fail }) {
  const prefix = `${module.toLowerCase()}.`;
  if (!SETTINGS_MODULES.includes(prefix.slice(0, -1))) return fail(404, NOT_FOUND);
  reply(200, Object.fromEntries([...settings].filter(([key]) => key.startsWith(prefix))));
}

function putSettingsModule({ params: [module], body, reply, invalid, fail }) {
  const name = module.toLowerCase();
  if (!SETTINGS_MODULES.includes(name)) return fail(404, NOT_FOUND);
  if (!isObject(body?.values)) return invalid({ Values: ['Values wajib diisi.'] });
  const entries = Object.entries(body.values);
  if (entries.some(([key, value]) => !key.startsWith(`${name}.`) || typeof value !== 'string')) {
    return invalid({ Values: ['Kunci pengaturan tidak valid.'] });
  }
  if (name === 'tampilan') {
    const errors = [];
    for (const [key, value] of entries) {
      const ok = value.trim() === '' || JARAK_HURUF_VALUES.includes(value.trim());
      if (key === JARAK_HURUF_KEY && !ok) errors.push(JARAK_HURUF_ERROR);
      else if (key === JARAK_KATA_KEY && !ok) errors.push(JARAK_KATA_ERROR);
      else if (key !== JARAK_HURUF_KEY && key !== JARAK_KATA_KEY) errors.push(JARAK_HURUF_ERROR);
    }
    if (errors.length) return invalid({ Values: [...new Set(errors)] });
  }
  for (const [key, value] of entries) settings.set(key, value.trim());
  reply(204);
}

// The dev API's map with the locally saved keys on top; just the local keys when the dev API is unreachable.
async function publicPengaturan(res, url) {
  let upstream = {};
  try {
    const r = await fetch(`${UPSTREAM}${url.pathname.slice(BASE.length)}${url.search}`, { signal: AbortSignal.timeout(10_000) });
    const data = r.ok ? await r.json() : null;
    if (isObject(data)) upstream = data;
  } catch {
    // Offline: only the local keys are returned.
  }
  send(res, 200, { ...upstream, ...Object.fromEntries(settings) }, { 'Cache-Control': 'no-store' });
}

// ---------- Misc CMS shell calls ----------

function ringkasan({ reply }) {
  reply(200, { tanggal: todayJakarta(), hariIni: 0, mingguIni: 0, bulanIni: 0, total: 0 });
}

const GUID = '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})';
const masterRoutes = Object.entries(MASTERS).flatMap(([name, { permission }]) => [
  ['GET', `/admin/${name}`, `${permission}.Read`, listMaster(name)],
  ['GET', `/admin/${name}/${GUID}`, `${permission}.Read`, getMaster(name)]
]);
// Matched case-insensitively like ASP.NET routing, which still passes route values on as they were sent.
const ROUTES = [
  ['POST', '/auth/logout', null, logout],
  ['POST', '/admin/uploads', 'Uploads.Create', upload],
  ['GET', '/admin/statistik-pengunjung/ringkasan', 'StatistikPengunjung.Read', ringkasan],
  ['GET', '/admin/statistik-pengunjung/harian', 'StatistikPengunjung.Read', ({ reply }) => reply(200, [])],
  ['GET', '/admin/submenu/options', 'Submenu.Read', submenuOptions],
  ['GET', `/admin/submenu/${GUID}`, 'Submenu.Read', ({ params: [id], reply, fail }) => {
    const s = submenus.find((x) => x.id === id.toLowerCase());
    return s ? reply(200, s) : fail(404, NOT_FOUND);
  }],
  ...masterRoutes,
  ['GET', '/admin/publikasi', 'Publikasi.Read', listPublikasi],
  ['POST', '/admin/publikasi', 'Publikasi.Create', (ctx) => savePublikasi(ctx)],
  ['POST', '/admin/publikasi/bulk-delete', 'Publikasi.Delete', bulkDeletePublikasi],
  ['GET', '/admin/publikasi/slug-available', 'Publikasi.Read', slugAvailable],
  ['GET', `/admin/publikasi/${GUID}`, 'Publikasi.Read', getPublikasi],
  ['PUT', `/admin/publikasi/${GUID}`, 'Publikasi.Update', (ctx) => savePublikasi(ctx, ctx.params[0].toLowerCase())],
  ['DELETE', `/admin/publikasi/${GUID}`, 'Publikasi.Delete', deletePublikasi],
  ['POST', `/admin/publikasi/${GUID}/restore`, 'Publikasi.Delete', restorePublikasi],
  ['DELETE', `/admin/publikasi/${GUID}/permanent`, 'Content.PermanentDelete', purgePublikasi],
  ['GET', '/SystemSettings/module/([a-z]+)', 'SystemSettings.Read', getSettingsModule],
  ['PUT', '/SystemSettings/module/([a-z]+)', 'SystemSettings.Update', putSettingsModule],
  ['GET', '/admin/uksm', 'Uksm.Read', listHalaman],
  ['GET', `/admin/uksm/${GUID}`, 'Uksm.Read', getHalaman],
  ['PUT', `/admin/uksm/${GUID}`, 'Uksm.Update', updateHalaman]
].map(([method, pattern, permission, handler]) => ({ method, pattern: new RegExp(`^${pattern}$`, 'i'), permission, handler }));

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function handleApi(req, res, url) {
  const path = url.pathname;
  const route = path.slice(BASE.length);
  const raw = req.method === 'POST' || req.method === 'PUT' ? await readBody(req) : Buffer.alloc(0);
  let body = null;
  try {
    body = JSON.parse(raw.toString('utf8'));
  } catch {
    // Empty or not JSON: each handler validates the fields it needs.
  }
  const ctx = {
    req, url, raw, body,
    reply: (status, data, headers) => send(res, status, data, headers),
    invalid: (errors) => send(res, 400, { title: 'One or more validation errors occurred.', status: 400, instance: path, errors }, PROBLEM),
    fail: (status, detail) => send(res, status, { title: FAILURE_TITLES[status], status, detail, instance: path }, PROBLEM)
  };
  if (req.method === 'POST' && route.toLowerCase() === '/auth/login') return login(ctx);

  for (const { method, pattern, permission, handler } of ROUTES) {
    const match = req.method === method ? pattern.exec(route) : null;
    if (!match) continue;
    ctx.claims = claimsOf(req);
    // Empty 401 and 403 bodies, as uks-be sends them.
    if (!ctx.claims || (permission && !hasPermission(ctx.claims, permission))) {
      res.writeHead(ctx.claims ? 403 : 401, ctx.claims ? {} : { 'WWW-Authenticate': 'Bearer' });
      res.end();
      return;
    }
    return handler({ ...ctx, params: match.slice(1) });
  }
  send(res, 404, { message: 'Not handled by the mock API' });
}

async function proxyPublic(res, url) {
  try {
    const r = await fetch(`${UPSTREAM}${url.pathname.slice(BASE.length)}${url.search}`, { signal: AbortSignal.timeout(10_000) });
    res.writeHead(r.status, { 'Content-Type': r.headers.get('content-type') || 'application/json' });
    res.end(Buffer.from(await r.arrayBuffer()));
  } catch {
    send(res, 502, { message: 'Upstream unreachable' });
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, SELF);
  const path = url.pathname;
  res.on('finish', () => console.log(`${req.method} ${path}${url.search} ${res.statusCode}`));
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Range');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  try {
    if (path.startsWith('/__files/') && (req.method === 'GET' || req.method === 'HEAD')) return serveFile(req, res, path);

    if (req.method === 'GET' && path === `${BASE}/public/uksm`) {
      return send(res, 200, halaman.map(publicHalaman), { 'Cache-Control': 'no-store' });
    }
    if (req.method === 'GET' && path === `${BASE}/public/publikasi`
      && (url.searchParams.get('submenuId') ?? '').toLowerCase() === SUBMENU_IDS.video) {
      return publicVideoList(url, res);
    }
    if (req.method === 'GET' && path === `${BASE}/public/pengaturan`) return await publicPengaturan(res, url);
    // Visit and view counters must never reach the live statistics from a dev machine.
    if (req.method === 'POST' && path.startsWith(`${BASE}/public/`)) return send(res, 204);
    if (req.method === 'GET' && path.startsWith(`${BASE}/public/`)) return await proxyPublic(res, url);
    if (path.startsWith(`${BASE}/`)) return await handleApi(req, res, url);
    send(res, 404, { message: 'Not handled by the mock API' });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) send(res, 500, { title: 'Mock API error', status: 500 });
  }
});

await seedUksm();
server.listen(PORT, '127.0.0.1', () => console.log(`Mock API on ${SELF}${BASE} (upstream ${UPSTREAM})`));
