export type Unpack<T> = T extends (infer U)[] ? U : T

export type Guard<T> = (value: T | unknown) => value is T

export type PlainObject<T = unknown> = Record<string, T>

export type PlainFunction<P = any, R = any> = (...args: P[]) => R

export type ContextType = "2d" | "bitmaprenderer" | "webgl" | "webgl2"

export type OffscreenContextType = "2d"

interface ContextsRenderingContext {
  /**
   * A 2D drawing context for an `HTMLCanvasElement`.
   */
  "2d": CanvasRenderingContext2D

  /**
   * A bitmap drawing context for an `HTMLCanvasElement`.
   */
  bitmaprenderer: ImageBitmapRenderingContext

  /**
   * A WebGL drawing context for an `HTMLCanvasElement`.
   */
  webgl: WebGLRenderingContext

  /**
   * A WebGL 2 drawing context for an `HTMLCanvasElement`.
   */
  webgl2: WebGL2RenderingContext
}

interface OffscreenContextsRenderingContext {
  /**
   * A 2D drawing context for an `OffscreenCanvas`.
   */
  "2d": OffscreenCanvasRenderingContext2D

  /**
   * A bitmap drawing context for an `OffscreenCanvas`.
   */
  bitmaprenderer: ImageBitmapRenderingContext

  /**
   * A WebGL drawing context for an `OffscreenCanvas`.
   */
  webgl: WebGLRenderingContext

  /**
   * A WebGL 2 drawing context for an `OffscreenCanvas`.
   */
  webgl2: WebGL2RenderingContext
}

interface ContextsAttributes {
  /**
   * Attributes for a 2D drawing context.
   */
  "2d": CanvasRenderingContext2DSettings

  /**
   * Attributes for a bitmap drawing context.
   */
  bitmaprenderer: ImageBitmapRenderingContextSettings

  /**
   * Attributes for a WebGL drawing context.
   */
  webgl: WebGLContextAttributes

  /**
   * Attributes for a WebGL 2 drawing context.
   */
  webgl2: WebGLContextAttributes
}

export type ContextRenderingContext<T extends ContextType> =
  ContextsRenderingContext[T]

export type OffscreenContextRenderingContext<T extends ContextType> =
  OffscreenContextsRenderingContext[T]

export type ContextAttributes<T extends ContextType> = ContextsAttributes[T]
