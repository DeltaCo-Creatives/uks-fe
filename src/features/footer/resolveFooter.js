// Pure rules that turn the settings map and the link list into what each footer column renders.
import { VIEW_PATHS, pathForView } from '@/routes';
import { FOOTER_DEFAULTS as DEFAULTS, DEFAULT_LINKS } from './defaults';

const SOCIAL_NETWORKS = [
  { key: 'instagram', setting: 'footer.instagramUrl', name: 'Instagram', icon: 'fa-brands fa-instagram' },
  { key: 'youtube', setting: 'footer.youtubeUrl', name: 'YouTube', icon: 'fa-brands fa-youtube' },
  { key: 'facebook', setting: 'footer.facebookUrl', name: 'Facebook', icon: 'fa-brands fa-facebook-f' },
  { key: 'x', setting: 'footer.xUrl', name: 'X', icon: 'fa-brands fa-x-twitter' },
  { key: 'tiktok', setting: 'footer.tiktokUrl', name: 'TikTok', icon: 'fa-brands fa-tiktok' }
];

/** True for the `{ "module.key": "value" }` object that /public/pengaturan answers with. */
export const isSettingsMap = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

/** A switch: a default-true key is off only for exactly "false", a default-false key is on only for exactly "true". */
export function readFlag(settings, key) {
  const value = settings?.[key];
  return DEFAULTS[key] ? value !== 'false' : value === 'true';
}

/** Text that must have a value: a missing or blank value reads as the default. */
export function readText(settings, key) {
  const value = settings?.[key];
  return typeof value === 'string' && value.trim() ? value.trim() : DEFAULTS[key];
}

/** Text that may be empty on purpose (deskripsi, slogan): only a missing key reads as the default. */
export function readOptionalText(settings, key) {
  const value = settings?.[key];
  return typeof value === 'string' ? value.trim() : DEFAULTS[key];
}

// A kontak.* value has no footer default: missing or blank means nothing to show.
function readValue(settings, key) {
  const value = settings?.[key];
  return typeof value === 'string' ? value.trim() : '';
}

/** The trimmed URL when it is absolute http(s), otherwise an empty string. */
export function safeHttpUrl(value) {
  if (typeof value !== 'string') return '';
  const text = value.trim();
  try {
    const { protocol } = new URL(text);
    return protocol === 'http:' || protocol === 'https:' ? text : '';
  } catch {
    return '';
  }
}

/** Social icons whose URL is filled, in the contract order. */
export function resolveSocial(settings) {
  return SOCIAL_NETWORKS.flatMap(({ key, setting, name, icon }) => {
    const href = safeHttpUrl(settings?.[setting]);
    return href ? [{ key, href, icon, label: `UKS di ${name}` }] : [];
  });
}

/** Contact lines: the address, then `items` (email, phone, ULT, hours, website, map) whose switch is on and value is filled; an item without `href` is plain text. */
export function resolveKontak(settings) {
  const shown = (flag, key) => (readFlag(settings, flag) ? readValue(settings, key) : '');
  const alamat = shown('footer.kontakAlamat', 'kontak.address');
  const email = shown('footer.kontakEmail', 'kontak.email');
  const telepon = shown('footer.kontakTelepon', 'kontak.phone');
  const ult = shown('footer.kontakTeleponUlt', 'kontak.ultPhone');
  const jam = shown('footer.kontakJamOperasional', 'kontak.operatingHours');
  const website = shown('footer.kontakWebsite', 'kontak.websiteUrl');
  const peta = safeHttpUrl(shown('footer.kontakPeta', 'kontak.mapsUrl'));

  const items = [];
  if (email) items.push({ key: 'email', icon: 'fa-envelope', href: `mailto:${email}`, text: email });
  if (telepon) items.push({ key: 'telepon', icon: 'fa-phone', href: `tel:${telepon}`, text: telepon });
  if (ult) items.push({ key: 'ult', icon: 'fa-headset', href: `tel:${ult}`, text: `ULT: ${ult}` });
  if (jam) items.push({ key: 'jam', icon: 'fa-clock', text: jam });
  if (website) {
    items.push({ key: 'website', icon: 'fa-arrow-up-right-from-square', href: website, external: true, text: website.replace(/^https?:\/\//, '') });
  }
  if (peta) {
    items.push({ key: 'peta', icon: 'fa-map-location-dot', href: peta, external: true, newTabHint: true, text: 'Lihat di peta' });
  }
  return { alamat, items, social: resolveSocial(settings) };
}

/** Links the page can render, in API order; a Halaman link needs a known page key and an Eksternal one an http(s) URL, anything else is skipped. */
export function resolveNavLinks(items) {
  if (!Array.isArray(items)) return [];
  return items.flatMap((item, index) => {
    const label = typeof item?.label === 'string' ? item.label.trim() : '';
    if (!label) return [];
    const key = String(item.id ?? `tautan-${index}`);

    if (item.jenis === 'Halaman') {
      const known = typeof item.halaman === 'string' && Object.hasOwn(VIEW_PATHS, item.halaman);
      return known ? [{ key, label, external: false, to: pathForView(item.halaman) }] : [];
    }
    if (item.jenis === 'Eksternal') {
      const href = safeHttpUrl(item.url);
      return href ? [{ key, label, external: true, href }] : [];
    }
    return [];
  });
}

// 'loading' until the request settles, 'ready' with usable data, 'fallback' when it failed or came back malformed.
function sourceStatus(data, loading, isUsable) {
  if (loading && data == null) return 'loading';
  return isUsable(data) ? 'ready' : 'fallback';
}

// A part fed by several requests is loading while any is, and on defaults when any failed.
function combine(...statuses) {
  if (statuses.includes('loading')) return 'loading';
  return statuses.includes('fallback') ? 'fallback' : 'ready';
}

/** Props of every footer column from the settings map and link list; each part has `status` (loading, ready, fallback) and `visible`, and a loading part stays visible to hold its place as a skeleton. */
export function buildFooterConfig({ settings, settingsLoading, links, linksLoading }) {
  const settingsStatus = sourceStatus(settings, settingsLoading, isSettingsMap);
  const linksStatus = sourceStatus(links, linksLoading, Array.isArray);
  const waiting = settingsStatus === 'loading';
  // Unusable settings read as an empty map, so every key falls back to its default.
  const source = settingsStatus === 'ready' ? settings : {};

  const kontak = resolveKontak(source);
  const kontakFilled = Boolean(kontak.alamat || kontak.items.length || kontak.social.length);

  const navigasiOn = readFlag(source, 'footer.tampilkanNavigasi');
  const navLinks = resolveNavLinks(linksStatus === 'ready' ? links : DEFAULT_LINKS);
  const navigasiStatus = combine(settingsStatus, ...(navigasiOn ? [linksStatus] : []));

  return {
    brand: {
      status: settingsStatus,
      deskripsi: readFlag(source, 'footer.tampilkanDeskripsi') ? readOptionalText(source, 'footer.deskripsi') : ''
    },
    kontak: {
      status: settingsStatus,
      visible: waiting || (readFlag(source, 'footer.tampilkanKontak') && kontakFilled),
      judul: readText(source, 'footer.judulKontak'),
      ...kontak
    },
    navigasi: {
      status: navigasiStatus,
      visible: navigasiStatus === 'loading' || (navigasiOn && navLinks.length > 0),
      judul: readText(source, 'footer.judulNavigasi'),
      links: navLinks
    },
    statistik: {
      status: settingsStatus,
      visible: waiting || readFlag(source, 'pengunjung.tampilkanStatistik'),
      // Null while loading, so the heading shows a skeleton instead of flashing the default.
      judul: waiting ? null : readText(source, 'footer.judulStatistik')
    },
    bottom: {
      status: settingsStatus,
      hakCipta: readText(source, 'footer.hakCipta'),
      slogan: readOptionalText(source, 'footer.slogan')
    }
  };
}
