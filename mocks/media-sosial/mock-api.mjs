// Local stand-in for uks-be while the Media Sosial feature is built and reviewed. The backend cannot run on
// machines without SQL Server, so this serves the new endpoints from memory and forwards every other public
// GET to the live API. Run with `node mocks/media-sosial/mock-api.mjs` (port 5103, the dev API URL; MOCK_PORT overrides it).
// Switch the public response to test the site's states: /__mock/mode?media=normal|slow|error|empty|missing
// The CMS signs in here with any email and password, so it listens on 127.0.0.1 only; its edits, uploads and
// settings last until the process stops.
// The seeded Instagram covers are generated placeholders ("Cover contoh N"); the last post has none, to show the caption tile.
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';

const PORT = Number(process.env.MOCK_PORT) || 5103;
const BASE = '/api/v1';
const UPSTREAM = 'https://uks.pauddasmen.id/api/v1';
const SELF = `http://localhost:${PORT}`;

// No beranda keys yet, like a fresh database: a missing key means the section shows.
const settings = {};
let mode = 'normal';

// Real posts and videos taken from the repos' seed data and docs; only the Instagram covers are placeholders.
const instagramSeed = [
  ['C8fXXrjSIul', 'reel', 'Gala Kreasi 2024, Inspiratif 1: TK YAPIS Agats'],
  ['C8i410ESI6I', 'reel', 'Gala Kreasi 2024, Terbaik 6: TK Mutiara Hati'],
  ['C8ojXuAyzR7', 'foto', 'Gala Kreasi 2024, Terbaik 3: SDK Soverdi'],
  ['C8uTpUHSC05', 'reel', 'Gala Kreasi 2024, Terbaik 7: TK Al-Fazza'],
  ['C8yfAqySUGq', 'foto', 'Gala Kreasi 2024, Terbaik 5: SD Islam Al Azhar 14'],
  ['C8xCWv8vfZh', 'reel', 'Gala Kreasi 2024, Terbaik 8: TK Khadijah']
];
const youtubeSeed = [
  ['Cbqg3RnW0ss', 'video'], ['3OUZDfI_Yhc', 'shorts'], ['gl56oxJOWVo', 'video'], ['3kDTgPMKW3Q', 'shorts'],
  ['V-GpqteRbeA', 'video'], ['AxnuV6_6mYI', 'shorts'], ['DF-0fcEbqWs', 'video']
];

const now = new Date().toISOString();
const items = [
  ...instagramSeed.map(([kode, jenis, judul], i) => {
    const covered = i < instagramSeed.length - 1;
    return {
      id: `00000000-0000-4000-8000-${String(i + 1).padStart(12, '0')}`,
      platform: 'instagram', kodeKonten: kode, jenis, judul, namaKanal: null,
      gambar: covered ? `cover/mock/ig-${i + 1}.svg` : null, gambarUrl: covered ? `${SELF}/mock-files/ig-${i + 1}.svg` : null,
      urutan: i, isAktif: true, isDeleted: false, deletedAt: null, createdAt: now, updatedAt: null
    };
  }),
  ...youtubeSeed.map(([kode, jenis], i) => ({
    id: `00000000-0000-4000-9000-${String(i + 1).padStart(12, '0')}`,
    platform: 'youtube', kodeKonten: kode, jenis, judul: `Video YouTube ${kode}`, namaKanal: null,
    gambar: null, gambarUrl: null,
    urutan: i, isAktif: true, isDeleted: false, deletedAt: null, createdAt: now, updatedAt: null
  }))
];

function publicInstagram(it) {
  const seg = it.jenis === 'reel' ? 'reel' : 'p';
  return {
    id: it.id, code: it.kodeKonten, kind: it.jenis === 'reel' ? 'reel' : 'photo',
    url: `https://www.instagram.com/${seg}/${it.kodeKonten}/`,
    embedUrl: `https://www.instagram.com/${seg}/${it.kodeKonten}/embed/`,
    title: it.judul, coverUrl: it.gambarUrl
  };
}

function publicYoutube(it) {
  const short = it.jenis === 'shorts';
  return {
    id: it.id, code: it.kodeKonten, kind: short ? 'short' : 'video',
    url: short ? `https://www.youtube.com/shorts/${it.kodeKonten}` : `https://www.youtube.com/watch?v=${it.kodeKonten}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${it.kodeKonten}`,
    title: it.judul, channelName: it.namaKanal,
    thumbnailUrl: `https://i.ytimg.com/vi/${it.kodeKonten}/${short ? 'sddefault' : 'maxresdefault'}.jpg`,
    thumbnailFallbackUrl: `https://i.ytimg.com/vi/${it.kodeKonten}/hqdefault.jpg`
  };
}

function section(platform, settingKey, toPublic) {
  const list = items
    .filter((it) => it.platform === platform && it.isAktif && !it.isDeleted)
    .sort((a, b) => a.urutan - b.urutan || b.createdAt.localeCompare(a.createdAt))
    .slice(0, 24)
    .map(toPublic);
  const visible = settings[settingKey] !== 'false' && list.length > 0;
  return { visible, items: visible ? list : [] };
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...headers });
  res.end(body === undefined ? '' : JSON.stringify(body));
}

function coverSvg(n) {
  const tints = ['#DDEBE1', '#EBF0EC', '#E6EEE0', '#E9ECEA'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="${tints[(n - 1) % tints.length]}"/>` +
    `<text x="300" y="290" font-family="sans-serif" font-size="40" text-anchor="middle" fill="#536359">Cover contoh ${n}</text>` +
    `<text x="300" y="345" font-family="sans-serif" font-size="26" text-anchor="middle" fill="#536359">(diunggah admin di CMS)</text></svg>`;
}

const PLATFORMS = ['instagram', 'youtube'];
const MSG = {
  igLink: 'Tautan harus berupa postingan atau reel Instagram, misalnya https://www.instagram.com/reel/kode/.',
  ytLink: 'Tautan harus berupa video YouTube, misalnya https://youtu.be/kodevideo.',
  igBlocked: 'Postingan ini tidak bisa ditampilkan. Pastikan akunnya publik, postingannya masih ada, dan penyematan tidak dimatikan.',
  ytBlocked: 'Pemilik video tidak mengizinkan video ini diputar di situs lain.',
  ytNotFound: 'Video tidak ditemukan. Periksa kembali tautannya.',
  ytUnreachable: 'YouTube tidak dapat dihubungi saat ini. Coba lagi beberapa saat lagi.',
  duplicate: 'Konten ini sudah ada di daftar.',
  judulRequired: 'Keterangan wajib diisi.',
  judulTooLong: 'Keterangan maksimal 150 karakter.',
  gambarInvalid: 'Gambar tidak valid, unggah ulang gambarnya.',
  platform: 'Platform harus salah satu dari: instagram, youtube.',
  notFound: 'Data tidak ditemukan.'
};

const CRUD_MODULES = [
  'Agenda', 'Aplikasi', 'Berita', 'BidangUsahaMitra', 'DukunganMitra', 'Faq', 'HeroSlide', 'JenisDokumen', 'Jenjang',
  'KategoriAgenda', 'KategoriBerita', 'KategoriPraktikBaik', 'KategoriUptBercerita', 'Kementerian', 'Lomba', 'MediaSosial',
  'Mitra', 'PemenangLomba', 'Pengumuman', 'Permissions', 'PraktikBaik', 'ProdukHukum', 'ProgramPrioritas', 'ProgramTautan',
  'Publikasi', 'Roles', 'StatusAgenda', 'StatusBerita', 'StatusPraktikBaik', 'StatusProdukHukum', 'StatusPublikasi',
  'StatusUptBercerita', 'Submenu', 'SystemSettings', 'Tag', 'UptBercerita', 'Users'
];
// Every permission uks-be defines, plus MediaSosial, so each CMS page and button is reachable.
const PERMISSIONS = [
  ...CRUD_MODULES.flatMap((module) => ['Read', 'Create', 'Update', 'Delete'].map((action) => `${module}.${action}`)),
  'AuditLogs.Read', 'Content.PermanentDelete', 'Roles.AssignPermissions', 'Sessions.Read', 'Sessions.Revoke',
  'StatistikPengunjung.Read', 'Uksm.Read', 'Uksm.Update', 'Uploads.Create', 'Users.AssignRoles'
];
const TOKEN_MINUTES = 8 * 60;
const MOCK_USER_ID = '00000000-0000-4000-a000-000000000001';
const revokedSessions = new Set();

const PENGATURAN_MODULES = ['kontak', 'tautan', 'pengunjung', 'footer', 'beranda'];
const BERANDA_KEYS = ['beranda.tampilkanInstagram', 'beranda.tampilkanYoutube'];
const BOOLEAN_KEYS = [...BERANDA_KEYS, 'pengunjung.tampilkanStatistik'];

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
  panduan: DOCUMENT_RULE
};
// uks-be's FileSignatureValidator, applied to the first 12 bytes as hex.
const SIGNATURES = {
  '.jpg': /^ffd8ff/, '.jpeg': /^ffd8ff/, '.png': /^89504e470d0a1a0a/, '.gif': /^474946383[79]61/,
  '.webp': /^52494646.{8}57454250/, '.pdf': /^25504446/, '.docx': /^504b0304/, '.doc': /^d0cf11e0a1b11ae1/
};
const uploads = new Map();

// The backend checker's User-Agent, so Instagram and YouTube see the same client.
const USER_AGENT = 'Uks.Api/1.0 (Portal UKS; pemeriksa tautan media sosial)';
const IG_HOSTS = ['instagram.com', 'www.instagram.com', 'm.instagram.com'];
const IG_JENIS = new Map([['p', 'foto'], ['reel', 'reel'], ['reels', 'reel'], ['tv', 'reel']]);
const YT_HOSTS = [
  'youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be', 'youtube-nocookie.com', 'www.youtube-nocookie.com'
];

const PROBLEM = { 'Content-Type': 'application/problem+json; charset=utf-8' };
const FAILURE_TITLES = { 400: 'Bad Request', 404: 'Resource Not Found', 409: 'Conflict' };
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const isoNow = () => new Date().toISOString();
const findItem = (id) => items.find((it) => it.id === String(id).toLowerCase());

function fileUrl(path) {
  const seed = /^cover\/mock\/(ig-\d+\.svg)$/.exec(path);
  return `${SELF}/mock-files/${seed ? seed[1] : path}`;
}

function canonicalUrl(platform, kode, jenis) {
  if (platform === 'instagram') return `https://www.instagram.com/${jenis === 'reel' ? 'reel' : 'p'}/${kode}/`;
  return jenis === 'shorts' ? `https://www.youtube.com/shorts/${kode}` : `https://www.youtube.com/watch?v=${kode}`;
}

function toDto(it) {
  return {
    id: it.id, platform: it.platform, url: canonicalUrl(it.platform, it.kodeKonten, it.jenis), kodeKonten: it.kodeKonten,
    jenis: it.jenis, judul: it.judul, namaKanal: it.namaKanal, gambar: it.gambar, gambarUrl: it.gambarUrl,
    thumbnailUrl: it.platform === 'youtube' ? `https://i.ytimg.com/vi/${it.kodeKonten}/mqdefault.jpg` : null,
    urutan: it.urutan, isAktif: it.isAktif, isDeleted: it.isDeleted, deletedAt: it.deletedAt,
    createdAt: it.createdAt, updatedAt: it.updatedAt
  };
}

function httpUrl(text) {
  const u = typeof text === 'string' && URL.canParse(text.trim()) ? new URL(text.trim()) : null;
  return u && ['http:', 'https:'].includes(u.protocol) ? u : null;
}

// uks-be's MediaSosialLinkParser rules: { kodeKonten, jenis } for Instagram, { kodeKonten, pastedShorts } for YouTube, else null.
function parseLink(platform, text) {
  const u = httpUrl(text);
  if (!u) return null;
  const parts = u.pathname.split('/').filter(Boolean);
  if (platform === 'instagram') {
    const [type, code] = parts.length === 3 ? parts.slice(1) : parts.length === 2 ? parts : [];
    const jenis = IG_JENIS.get(type);
    return IG_HOSTS.includes(u.hostname) && jenis && /^[A-Za-z0-9_-]{5,64}$/.test(code) ? { kodeKonten: code, jenis } : null;
  }
  if (!YT_HOSTS.includes(u.hostname)) return null;
  let id = null;
  if (u.hostname === 'youtu.be') id = parts.length === 1 ? parts[0] : null;
  else if (parts.length === 1 && parts[0] === 'watch') id = u.searchParams.get('v');
  else if (parts.length === 2 && ['shorts', 'embed', 'live'].includes(parts[0])) id = parts[1];
  return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? { kodeKonten: id, pastedShorts: parts[0] === 'shorts' } : null;
}

async function fetchJson(endpoint) {
  const response = await fetch(endpoint, { headers: { 'User-Agent': USER_AGENT }, signal: AbortSignal.timeout(5000) });
  return { status: response.status, data: await response.json().catch(() => null) };
}

const isTemporary = (status) => status === 429 || status >= 500;

async function instagramError({ kodeKonten, jenis }) {
  const target = encodeURIComponent(canonicalUrl('instagram', kodeKonten, jenis));
  try {
    const { status, data } = await fetchJson(
      `https://graph.facebook.com/v25.0/instagram_oembed?url=${target}&omitscript=true&hidecaption=true&maxwidth=320`
    );
    if (status === 200 && typeof data?.html === 'string' && data.html.trim()) return null;
    const error = isObject(data?.error) ? data.error : {};
    if (!isTemporary(status) && (error.code === 24 || [2207045, 2207046, 2207047].includes(error.error_subcode))) {
      return MSG.igBlocked;
    }
    console.warn(`Instagram oEmbed answered ${status} for ${kodeKonten}; saving without the check.`);
  } catch (error) {
    console.warn(`Instagram oEmbed unreachable for ${kodeKonten} (${error.name}); saving without the check.`);
  }
  return null;
}

// uks-be stores YouTube's title and channel trimmed and cut to 255 characters; a blank one counts as missing.
const fit = (text) => (typeof text === 'string' && text.trim() ? text.trim().slice(0, 255) : null);

async function youtubeDetails({ kodeKonten, pastedShorts }) {
  const oembed = (link) => fetchJson(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(link)}`);
  let video;
  try {
    video = await oembed(`https://www.youtube.com/watch?v=${kodeKonten}`);
  } catch {
    return { error: MSG.ytUnreachable };
  }
  if (video.status === 401 || video.status === 403) return { error: MSG.ytBlocked };
  if (video.status === 400 || video.status === 404) return { error: MSG.ytNotFound };
  const judul = fit(video.data?.title);
  if (video.status !== 200 || !judul) return { error: MSG.ytUnreachable };
  let jenis = pastedShorts ? 'shorts' : 'video';
  try {
    const { status, data } = await oembed(`https://www.youtube.com/shorts/${kodeKonten}`);
    if (status === 200 && typeof data?.width === 'number' && typeof data?.height === 'number') {
      jenis = data.height > data.width ? 'shorts' : 'video';
    } else if (status >= 400 && !isTemporary(status)) {
      jenis = 'video';
    }
  } catch {
    // The Shorts lookup failed: keep the guess from the pasted link.
  }
  return { kodeKonten, jenis, judul, namaKanal: fit(video.data.author_name) };
}

async function checkLink(platform, link) {
  if (platform === 'youtube') return youtubeDetails(link);
  const error = await instagramError(link);
  return error ? { error } : { ...link, judul: null, namaKanal: null };
}

function issueToken(email) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const claims = {
    sub: MOCK_USER_ID, email, jti: randomUUID(), sid: randomUUID(), permission: PERMISSIONS,
    iat: issuedAt, exp: issuedAt + TOKEN_MINUTES * 60
  };
  // Unsigned: the CMS only decodes the payload, and only this mock accepts the token.
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

function hasPermission(claims, permission) {
  return [claims.permission].flat().some((p) => typeof p === 'string' && p.toLowerCase() === permission.toLowerCase());
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function upstreamPengaturan() {
  try {
    const r = await fetch(`${UPSTREAM}/public/pengaturan`, { signal: AbortSignal.timeout(5000) });
    if (r.ok) return await r.json();
  } catch {
    // Upstream unreachable: serve the local keys only.
  }
  return {};
}

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

async function getModule({ params: [name], reply }) {
  // SQL Server matches the module case-insensitively.
  const module = name.toLowerCase();
  // The live API has no beranda keys, so only the older modules start from its values.
  const values = { ...(module === 'beranda' ? {} : await upstreamPengaturan()), ...settings };
  reply(200, Object.fromEntries(Object.entries(values).filter(([key]) => key.toLowerCase().startsWith(`${module}.`))));
}

function putModule({ params: [name], body, reply, invalid }) {
  const values = body?.values;
  const errors = {};
  if (!PENGATURAN_MODULES.includes(name)) errors.Module = [`Module harus salah satu dari: ${PENGATURAN_MODULES.join(', ')}.`];
  if (!isObject(values)) errors.Values = ['Values wajib diisi.'];
  for (const [key, value] of Object.entries(isObject(values) ? values : {})) {
    const field = `Values[${key}]`;
    if (!key.startsWith(`${name}.`) || !/^[a-z]+\.[A-Za-z]+$/.test(key) || (name === 'beranda' && !BERANDA_KEYS.includes(key))) {
      errors[field] = [`Key '${key}' tidak valid untuk module '${name}'.`];
    } else if (typeof value !== 'string' || value.length > 1000) {
      errors[field] = [`Value untuk '${key}' tidak boleh lebih dari 1000 karakter.`];
    } else if (BOOLEAN_KEYS.includes(key) && value !== 'true' && value !== 'false') {
      errors[field] = [`'${key}' harus bernilai "true" atau "false".`];
    } else if (key.endsWith('Url') && value && !(URL.canParse(value) && ['http:', 'https:'].includes(new URL(value).protocol))) {
      errors[field] = [`'${key}' harus kosong atau URL absolut http/https.`];
    } else if (key === 'kontak.email' && value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      errors[field] = ["'kontak.email' harus kosong atau alamat email yang valid."];
    }
  }
  if (Object.keys(errors).length > 0) return invalid(errors);
  Object.assign(settings, values);
  reply(204);
}

async function upload({ req, raw, reply, invalid }) {
  let form = null;
  try {
    form = await new Response(raw, { headers: { 'Content-Type': req.headers['content-type'] ?? '' } }).formData();
  } catch {
    // Not a multipart body: reported below as a missing file.
  }
  const kind = form?.get('kind');
  const file = form?.get('file');
  const rule = typeof kind === 'string' && Object.hasOwn(UPLOAD_RULES, kind.toLowerCase()) ? UPLOAD_RULES[kind.toLowerCase()] : null;
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

function ringkasan({ reply }) {
  const tanggal = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());
  reply(200, { tanggal, hariIni: 0, mingguIni: 0, bulanIni: 0, total: 0 });
}

const SORTERS = {
  judul: (it) => it.judul.toLowerCase(),
  urutan: (it) => it.urutan,
  createdAt: (it) => Date.parse(it.createdAt),
  updatedAt: (it) => (it.updatedAt ? Date.parse(it.updatedAt) : null)
};
const ascending = (x, y) => (x === y ? 0 : x === null ? -1 : y === null ? 1 : x < y ? -1 : 1);

function listMedia({ url, reply }) {
  const q = url.searchParams;
  const platform = q.get('platform');
  const dataStatus = q.get('dataStatus');
  const search = (q.get('search') ?? '').trim().toLowerCase();
  const isAktif = (q.get('isAktif') ?? '').toLowerCase();
  const filterAktif = isAktif === 'true' || isAktif === 'false';
  const rows = items.filter((it) =>
    (dataStatus === 'semua' || it.isDeleted === (dataStatus === 'dihapus'))
    && (!platform?.trim() || it.platform === platform)
    && (!search || it.judul.toLowerCase().includes(search))
    && (!filterAktif || String(it.isAktif) === isAktif));
  const sortBy = q.get('sortBy') ?? 'urutan';
  const pick = Object.hasOwn(SORTERS, sortBy) ? SORTERS[sortBy] : null;
  const direction = (q.get('sortDir') ?? 'asc').toLowerCase() === 'asc' ? 1 : -1;
  rows.sort((a, b) => (pick ? direction * ascending(pick(a), pick(b)) : a.urutan - b.urutan)
    || Date.parse(b.createdAt) - Date.parse(a.createdAt));
  const page = Math.max(1, Number.parseInt(q.get('page'), 10) || 1);
  const requestedSize = Number.parseInt(q.get('pageSize'), 10);
  const pageSize = Math.min(100, requestedSize > 0 ? requestedSize : 10);
  const totalPages = Math.ceil(rows.length / pageSize);
  reply(200, {
    items: rows.slice((page - 1) * pageSize, page * pageSize).map(toDto),
    totalCount: rows.length, pageNumber: page, pageSize, totalPages,
    hasPreviousPage: page > 1, hasNextPage: page < totalPages
  });
}

function getMedia({ params: [id], reply, fail }) {
  const it = findItem(id);
  return it ? reply(200, toDto(it)) : fail(404, MSG.notFound);
}

async function saveMedia({ body, reply, invalid, fail }, id) {
  const input = isObject(body) ? body : {};
  const { platform } = input;
  const isInstagram = platform === 'instagram';
  const judul = typeof input.judul === 'string' ? input.judul.trim() : '';
  const gambar = typeof input.gambar === 'string' && input.gambar.trim() ? input.gambar : '';
  const urutan = Number(input.urutan ?? 0);
  const errors = {};
  if (!PLATFORMS.includes(platform)) errors.Platform = [MSG.platform];
  if (isInstagram && !judul) errors.Judul = [MSG.judulRequired];
  else if (isInstagram && judul.length > 150) errors.Judul = [MSG.judulTooLong];
  if (isInstagram && gambar && (gambar.length > 255 || !gambar.startsWith('cover/'))) errors.Gambar = [MSG.gambarInvalid];
  if (!Number.isInteger(urutan)) errors.Urutan = ['Urutan harus berupa bilangan bulat.'];
  else if (urutan < 0) errors.Urutan = ['Urutan tidak boleh negatif.'];
  let found = null;
  if (!errors.Platform) {
    const link = parseLink(platform, input.url);
    if (!link) {
      errors.Url = [isInstagram ? MSG.igLink : MSG.ytLink];
    } else if (items.some((it) => it.id !== id && !it.isDeleted && it.platform === platform && it.kodeKonten === link.kodeKonten)) {
      errors.Url = [MSG.duplicate];
    } else {
      found = await checkLink(platform, link);
      if (found.error) errors.Url = [found.error];
    }
  }
  if (Object.keys(errors).length > 0) return invalid(errors);
  const fields = {
    platform, kodeKonten: found.kodeKonten, jenis: found.jenis,
    judul: isInstagram ? judul : found.judul, namaKanal: found.namaKanal,
    gambar: isInstagram && gambar ? gambar : null, gambarUrl: isInstagram && gambar ? fileUrl(gambar) : null,
    urutan, isAktif: input.isAktif === true
  };
  if (id) {
    // uks-be validates before it loads the item, so a bad payload answers 400 even for a missing id.
    const existing = findItem(id);
    if (!existing || existing.isDeleted) return fail(404, MSG.notFound);
    Object.assign(existing, fields, { updatedAt: isoNow() });
    return reply(204);
  }
  const item = { id: randomUUID(), ...fields, isDeleted: false, deletedAt: null, createdAt: isoNow(), updatedAt: null };
  items.push(item);
  reply(201, { id: item.id });
}

function softDelete(it) {
  it.isDeleted = true;
  it.deletedAt = isoNow();
}

function deleteMedia({ params: [id], reply, fail }) {
  const it = findItem(id);
  if (!it || it.isDeleted) return fail(404, MSG.notFound);
  softDelete(it);
  reply(204);
}

function bulkDelete({ body, reply, invalid }) {
  if (!Array.isArray(body?.ids)) return invalid({ Ids: ['Ids wajib diisi.'] });
  const failed = [];
  for (const id of body.ids) {
    const it = findItem(id);
    if (it && !it.isDeleted) softDelete(it);
    else failed.push({ id, reason: MSG.notFound });
  }
  reply(200, { deleted: body.ids.length - failed.length, failed });
}

function restoreMedia({ params: [id], reply, fail }) {
  const it = findItem(id);
  if (!it) return fail(404, MSG.notFound);
  if (!it.isDeleted) return fail(400, 'Data tidak dalam status terhapus.');
  if (items.some((other) => !other.isDeleted && other.platform === it.platform && other.kodeKonten === it.kodeKonten)) {
    return fail(409, MSG.duplicate);
  }
  it.isDeleted = false;
  it.deletedAt = null;
  reply(204);
}

function purgeMedia({ params: [id], reply, fail }) {
  const it = findItem(id);
  if (!it) return fail(404, MSG.notFound);
  if (!it.isDeleted) return fail(400, 'Hapus data terlebih dahulu; hapus permanen hanya untuk data yang sudah terhapus.');
  items.splice(items.indexOf(it), 1);
  reply(204);
}

function reorder({ body, reply, invalid, fail }) {
  const platform = body?.platform;
  const ids = Array.isArray(body?.ids) ? body.ids.map((id) => String(id).toLowerCase()) : [];
  const errors = {};
  if (!PLATFORMS.includes(platform)) errors.Platform = [MSG.platform];
  if (ids.length === 0) errors.Ids = ['Ids wajib diisi.'];
  else if (new Set(ids).size !== ids.length) errors.Ids = ['Ids tidak boleh mengandung duplikat.'];
  if (Object.keys(errors).length > 0) return invalid(errors);
  const live = items.filter((it) => it.platform === platform && !it.isDeleted);
  if (ids.length !== live.length || !live.every((it) => ids.includes(it.id))) {
    return fail(400, 'Ids harus sama persis dengan seluruh konten platform ini yang belum dihapus.');
  }
  const changedAt = isoNow();
  ids.forEach((id, index) => {
    const it = findItem(id);
    if (it.urutan !== index) Object.assign(it, { urutan: index, updatedAt: changedAt });
  });
  reply(204);
}

async function periksa({ body, reply, invalid }) {
  const platform = body?.platform;
  if (!PLATFORMS.includes(platform)) return invalid({ Platform: [MSG.platform] });
  const link = parseLink(platform, body.url);
  if (!link) return invalid({ Url: [platform === 'instagram' ? MSG.igLink : MSG.ytLink] });
  const found = await checkLink(platform, link);
  if (found.error) return invalid({ Url: [found.error] });
  reply(200, {
    platform, jenis: found.jenis, kodeKonten: found.kodeKonten, url: canonicalUrl(platform, found.kodeKonten, found.jenis),
    judul: found.judul, namaKanal: found.namaKanal,
    thumbnailUrl: platform === 'youtube' ? `https://i.ytimg.com/vi/${found.kodeKonten}/hqdefault.jpg` : null
  });
}

const GUID = '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})';
// Matched case-insensitively like ASP.NET routing, which still passes route values on as they were sent.
const ROUTES = [
  ['POST', '/auth/logout', null, logout],
  ['GET', '/systemsettings/module/([^/]+)', 'SystemSettings.Read', getModule],
  ['PUT', '/systemsettings/module/([^/]+)', 'SystemSettings.Update', putModule],
  ['POST', '/admin/uploads', 'Uploads.Create', upload],
  ['GET', '/admin/submenu/options', 'Submenu.Read', ({ reply }) => reply(200, [])],
  ['GET', '/admin/statistik-pengunjung/ringkasan', 'StatistikPengunjung.Read', ringkasan],
  ['GET', '/admin/statistik-pengunjung/harian', 'StatistikPengunjung.Read', ({ reply }) => reply(200, [])],
  ['GET', '/admin/media-sosial', 'MediaSosial.Read', listMedia],
  ['POST', '/admin/media-sosial', 'MediaSosial.Create', (ctx) => saveMedia(ctx)],
  ['POST', '/admin/media-sosial/bulk-delete', 'MediaSosial.Delete', bulkDelete],
  ['PUT', '/admin/media-sosial/reorder', 'MediaSosial.Update', reorder],
  ['POST', '/admin/media-sosial/periksa', 'MediaSosial.Create', periksa],
  ['GET', `/admin/media-sosial/${GUID}`, 'MediaSosial.Read', getMedia],
  ['PUT', `/admin/media-sosial/${GUID}`, 'MediaSosial.Update', (ctx) => saveMedia(ctx, ctx.params[0].toLowerCase())],
  ['DELETE', `/admin/media-sosial/${GUID}`, 'MediaSosial.Delete', deleteMedia],
  ['POST', `/admin/media-sosial/${GUID}/restore`, 'MediaSosial.Delete', restoreMedia],
  ['DELETE', `/admin/media-sosial/${GUID}/permanent`, 'Content.PermanentDelete', purgeMedia]
].map(([method, pattern, permission, handler]) => ({ method, pattern: new RegExp(`^${pattern}$`, 'i'), permission, handler }));

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
  send(res, 404, { title: 'Not handled by the mock API' });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = new URL(req.url, SELF);
  const path = url.pathname;

  if (path === '/__mock/mode') {
    mode = url.searchParams.get('media') || 'normal';
    send(res, 200, { mode });
    return;
  }

  const svg = path.match(/^\/mock-files\/ig-(\d+)\.svg$/);
  if (svg) {
    res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    res.end(coverSvg(Number(svg[1])));
    return;
  }

  const stored = path.startsWith('/mock-files/') ? uploads.get(path.slice('/mock-files/'.length)) : undefined;
  if (stored) {
    // SVG uploads skip uks-be's sanitizer here, so this header stops their scripts when one is opened directly.
    res.writeHead(200, { 'Content-Type': stored.type, 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'" });
    res.end(stored.bytes);
    return;
  }

  if (req.method === 'GET' && path === `${BASE}/public/media-sosial`) {
    if (mode === 'slow') await new Promise((r) => setTimeout(r, 4000));
    if (mode === 'error') { send(res, 500, { title: 'Mock error' }); return; }
    if (mode === 'missing') { send(res, 404, { title: 'Not Found' }); return; }
    if (mode === 'empty') {
      send(res, 200, { instagram: { visible: false, items: [] }, youtube: { visible: false, items: [] } });
      return;
    }
    send(res, 200, {
      instagram: section('instagram', 'beranda.tampilkanInstagram', publicInstagram),
      youtube: section('youtube', 'beranda.tampilkanYoutube', publicYoutube)
    }, { 'Cache-Control': 'no-store' });
    return;
  }

  if (req.method === 'GET' && path === `${BASE}/public/pengaturan`) {
    // Live beranda values are dropped so this always agrees with the local /public/media-sosial.
    const live = Object.entries(await upstreamPengaturan()).filter(([key]) => !key.toLowerCase().startsWith('beranda.'));
    send(res, 200, { ...Object.fromEntries(live), ...settings });
    return;
  }

  // Visit and view counters must never reach the live statistics from a dev machine.
  if (req.method === 'POST' && path.startsWith(`${BASE}/public/`)) {
    send(res, 204);
    return;
  }

  if (req.method === 'GET' && path.startsWith(`${BASE}/public/`)) {
    try {
      const r = await fetch(`${UPSTREAM}${path.slice(BASE.length)}${url.search}`);
      res.writeHead(r.status, { 'Content-Type': r.headers.get('content-type') || 'application/json' });
      res.end(Buffer.from(await r.arrayBuffer()));
    } catch {
      send(res, 502, { title: 'Upstream unreachable' });
    }
    return;
  }

  if (path.startsWith(`${BASE}/`) && !path.startsWith(`${BASE}/public/`)) {
    try {
      await handleApi(req, res, url);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) send(res, 500, { title: 'Mock API error', status: 500 });
    }
    return;
  }

  send(res, 404, { title: 'Not handled by the mock API' });
});

// The YouTube seeds get what the backend stores for a pasted link; offline they keep the placeholder title.
await Promise.all(items.filter((it) => it.platform === 'youtube').map(async (it) => {
  const found = await youtubeDetails({ kodeKonten: it.kodeKonten, pastedShorts: it.jenis === 'shorts' });
  if (!found.error) Object.assign(it, { jenis: found.jenis, judul: found.judul, namaKanal: found.namaKanal });
}));

server.listen(PORT, '127.0.0.1', () => console.log(`Mock API on ${SELF}${BASE} (upstream ${UPSTREAM})`));
