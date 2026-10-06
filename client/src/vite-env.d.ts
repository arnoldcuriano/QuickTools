/// <reference types="vite/client" />

interface Window {
  createDotGlobe?: (
    canvas: HTMLCanvasElement,
    options?: Record<string, unknown>,
  ) => { destroy: () => void };
}
