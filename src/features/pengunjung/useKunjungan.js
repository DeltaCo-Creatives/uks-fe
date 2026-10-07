import { useEffect, useSyncExternalStore } from 'react';
import { apiFetch } from '@/utils/apiClient';
import { jakartaToday } from './jakartaDate';
import { readMarker, writeMarker } from './kunjunganStorage';

const LOCK_NAME = 'uks-kunjungan';
const SUMMARY_COUNTS = ['hariIni', 'mingguIni', 'bulanIni', 'total'];

let snapshot = { ringkasan: null, urutan: null, loading: true, error: null };
const listeners = new Set();

// One request per page load: StrictMode's double effect and every consumer share this promise.
let flight = null;
let pending = false;

function publish(next) {
  snapshot = { ...snapshot, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => snapshot;

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

function readRingkasan(data) {
  const ringkasan = data?.ringkasan;
  const valid =
    ringkasan &&
    typeof ringkasan.tanggal === 'string' &&
    SUMMARY_COUNTS.every((count) => Number.isFinite(ringkasan[count]));
  if (!valid) throw new Error('/public/kunjungan responded with an unexpected body');
  return ringkasan;
}

// Re-reads the marker inside the lock, so a tab that waited sees what the winning tab stored.
async function registerVisit() {
  const marker = readMarker();
  const query = marker ? `?tanggalTerakhir=${marker.tanggal}` : '';
  const data = await apiFetch(`/public/kunjungan${query}`, { method: 'POST' });

  const ringkasan = readRingkasan(data);
  if (isPositiveInteger(data.urutan)) {
    writeMarker({ tanggal: ringkasan.tanggal, urutan: data.urutan });
    return { ringkasan, urutan: data.urutan };
  }
  return { ringkasan, urutan: marker?.tanggal === ringkasan.tanggal ? marker.urutan : null };
}

// Tabs opened together queue on the lock so only the first counts; a refused lock runs the task directly.
async function withLock(task) {
  const locks = globalThis.navigator?.locks;
  if (!locks?.request) return task();

  let started = false;
  try {
    return await locks.request(LOCK_NAME, () => {
      started = true;
      return task();
    });
  } catch (error) {
    if (started) throw error;
    return task();
  }
}

function visit() {
  if (!flight) {
    pending = true;
    flight = withLock(registerVisit).then(
      ({ ringkasan, urutan }) => {
        pending = false;
        publish({ ringkasan, urutan, loading: false, error: null });
      },
      (error) => {
        pending = false;
        // A failed re-check keeps the numbers already on screen.
        publish({ loading: false, error: snapshot.ringkasan ? null : error });
      }
    );
  }
  return flight;
}

// The device clock only hints that a new WIB day may have begun; the server decides whether it counts.
function recheckAfterMidnight() {
  if (document.visibilityState !== 'visible' || pending || !snapshot.ringkasan) return;
  const today = jakartaToday();
  if (!today || today === snapshot.ringkasan.tanggal) return;
  flight = null;
  visit();
}

/**
 * Counts this browser's visit for the WIB day (at most once per page load, and once per day per browser)
 * and returns the visitor summary. Call it unconditionally: counting must not depend on the block showing.
 *
 * @returns {{
 *   ringkasan: { tanggal: string, hariIni: number, mingguIni: number, bulanIni: number, total: number } | null,
 *   urutan: number | null,
 *   loading: boolean,
 *   error: Error | null
 * }}
 */
export function useKunjungan() {
  useEffect(() => {
    visit();
    document.addEventListener('visibilitychange', recheckAfterMidnight);
    return () => document.removeEventListener('visibilitychange', recheckAfterMidnight);
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot);
}
