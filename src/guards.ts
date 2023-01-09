import type { PlainFunction, Unpack } from "./types"

/**
 * Whether the value is a number.
 *
 * @param value - The value to check.
 */
export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

/**
 * Whether the value is a function.
 *
 * @param value - The value to check.
 */
export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

/**
 * Whether the value is a canvas (either `HTMLCanvasElement` or `OffscreenCanvas`).
 *
 * @param value - The value to check.
 */
export function isCanvas<T extends HTMLCanvasElement | OffscreenCanvas>(
  value: T | unknown
): value is T {
  return isFunction((value as HTMLCanvasElement | OffscreenCanvas)?.getContext)
}

/**
 * Whether the value is a canvas that can transfer its control.
 *
 * @param value - The value to check.
 */
export function isTransferableCanvas(
  value: HTMLCanvasElement | OffscreenCanvas | unknown
): value is HTMLCanvasElement {
  return (
    Boolean(value) &&
    "transferControlToOffscreen" in (value as HTMLCanvasElement)
  )
}
