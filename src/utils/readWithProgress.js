const REPORT_EVERY_MS = 120;

/**
 * Reads a fetch response to the end while reporting how much has arrived, so a
 * slow connection shows movement instead of a silent wait. `total` is 0 when the
 * server doesn't send a length (the bar then runs indeterminate). Cancel by
 * aborting the signal the fetch was started with.
 *
 * @param {Response} response
 * @param {(progress: { loaded: number, total: number }) => void} onProgress
 * @returns {Promise<Uint8Array[]>} the body, in chunks
 */
export async function readWithProgress(response, onProgress) {
  const total = Number(response.headers.get('content-length')) || 0;

  if (!response.body) {
    const whole = new Uint8Array(await response.arrayBuffer());
    onProgress({ loaded: whole.length, total: whole.length });
    return [whole];
  }

  const reader = response.body.getReader();
  const chunks = [];
  let loaded = 0;
  let lastReport = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
    loaded += value.length;

    // Chunks arrive far faster than a screen can usefully repaint.
    const now = performance.now();
    if (now - lastReport >= REPORT_EVERY_MS) {
      lastReport = now;
      onProgress({ loaded, total });
    }
  }

  onProgress({ loaded, total: total || loaded });
  return chunks;
}

/**
 * Joins chunks into one array without the extra copy a Blob round trip costs.
 *
 * @param {Uint8Array[]} chunks
 */
export function joinChunks(chunks) {
  const joined = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.length;
  }
  return joined;
}
