"use client"

/**
 * Renders the full-screen canvas that the dashboard scripts animate.
 * Currently acts as a no-op placeholder so the app builds without errors.
 */
export default function ParticleBackground() {
  return <canvas id="particles-canvas" className="fixed inset-0 w-full h-full -z-10" />
}
