import { PlainFunction, Unpack } from "./types"

/**
 * Return whether the value is a number.
 *
 * @param value - The value to be checked.
 */
export function isNumber(value: number | unknown): value is number {
  return typeof value === "number"
}

/**
 * Return whether the value is a function.
 *
 * @param value - The value to be checked.
 */
export function isFunction<T extends PlainFunction>(
  value: T | unknown
): value is PlainFunction<Unpack<Parameters<T>>, ReturnType<T>> {
  return value instanceof Function
}

/**
 * Return whether the value is a canvas (either `HTMLCanvasElement` or `OffscreenCanvas`).
 *
 * @param value - The value to be checked.
 */
export function isCanvas<T extends HTMLCanvasElement | OffscreenCanvas>(
  value: T | unknown
): value is T {
  return isFunction((value as HTMLCanvasElement | OffscreenCanvas)?.getContext)
}

/**
 * Return whether the value is a canvas that can transfer its control.
 *
 * @param value - The value to be checked.
 */
export function isTransferableCanvas(
  value: HTMLCanvasElement | OffscreenCanvas | unknown
): value is HTMLCanvasElement {
  return (
    Boolean(value) &&
    "transferControlToOffscreen" in (value as HTMLCanvasElement)
  )
}
