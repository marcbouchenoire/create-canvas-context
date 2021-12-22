import { isCanvas, isNumber, isTransferableCanvas } from "./guards"
import {
  ContextAttributes,
  ContextRenderingContext,
  ContextType,
  OffscreenContextRenderingContext,
  OffscreenContextType
} from "./types"
import { returnIf } from "./utils/return-if"
import {
  supportsCanvas,
  supportsOffscreenCanvas
} from "./utils/supports-canvas"

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 150

interface Options {
  canvas?: HTMLCanvasElement | OffscreenCanvas
  height?: number
  offscreen?: boolean
  width?: number
}

const defaultOptions: Options = {
  offscreen: false
}

/**
 * Create a canvas and get a rendering context from it.
 *
 * @param type - The rendering context type to get.
 * @param [options] - An optional set of options and context attributes.
 * @param [options.canvas] - Provide an existing canvas.
 * @param [options.offscreen] - Use `OffscreenCanvas` instead of `HTMLCanvasElement` when supported.
 * @param [options.width] - Set the canvas width.
 * @param [options.height] - Set the canvas height.
 * @param [options...attributes] - Set context attributes.
 * @returns The selected rendering context and its canvas.
 *
 * @example
 *
 * ```js
 * const [context, canvas] = createCanvasContext("2d", {
 *   canvas: document.createElement("canvas"),
 *   offscreen: true,
 *   alpha: false
 * })
 *
 * // context: CanvasRenderingContext2D
 * // canvas: OffscreenCanvas
 * ```
 */
export function createCanvasContext<T extends ContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas?: undefined; offscreen?: false })
): [ContextRenderingContext<T> | null, HTMLCanvasElement | null]
export function createCanvasContext<T extends OffscreenContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas?: undefined; offscreen: true })
): [
  ContextRenderingContext<T> | OffscreenContextRenderingContext<T> | null,
  HTMLCanvasElement | OffscreenCanvas | null
]
export function createCanvasContext<T extends ContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas: HTMLCanvasElement; offscreen?: false })
): [ContextRenderingContext<T> | null, HTMLCanvasElement]
export function createCanvasContext<T extends OffscreenContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas: HTMLCanvasElement; offscreen: true })
): [
  ContextRenderingContext<T> | OffscreenContextRenderingContext<T> | null,
  HTMLCanvasElement | OffscreenCanvas
]
export function createCanvasContext<T extends OffscreenContextType>(
  type: T,
  options?:
    | ContextAttributes<T>
    | (Options & { canvas: OffscreenCanvas; offscreen?: true })
): [OffscreenContextRenderingContext<T> | null, OffscreenCanvas]
export function createCanvasContext<
  T extends ContextType | OffscreenContextType
>(type: T, options: ContextAttributes<T> | Options = defaultOptions) {
  const {
    canvas: optionsCanvas,
    offscreen,
    width,
    height,
    ...attributes
  } = {
    ...defaultOptions,
    ...options
  }

  const providedCanvas = returnIf(optionsCanvas, isCanvas)
  let canvas: HTMLCanvasElement | OffscreenCanvas

  if (offscreen && supportsOffscreenCanvas()) {
    canvas =
      providedCanvas && isTransferableCanvas(providedCanvas)
        ? providedCanvas.transferControlToOffscreen()
        : new OffscreenCanvas(DEFAULT_WIDTH, DEFAULT_HEIGHT)
  } else if (supportsCanvas()) {
    canvas = providedCanvas ?? document.createElement("canvas")
  } else {
    return [null, providedCanvas]
  }

  if (isNumber(width)) {
    canvas.width = width
  }

  if (isNumber(height)) {
    canvas.height = height
  }

  return [canvas.getContext(type as OffscreenContextType, attributes), canvas]
}
