/**
 * Return whether `HTMLCanvasElement` exists.
 */
export function supportsCanvas() {
  return typeof HTMLCanvasElement !== "undefined"
}

/**
 * Return whether `OffscreenCanvas` exists.
 */
export function supportsOffscreenCanvas() {
  return typeof OffscreenCanvas !== "undefined"
}
