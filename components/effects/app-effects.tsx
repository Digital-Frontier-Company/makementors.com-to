"use client"

import { useEffect } from "react"
import gsap from "gsap"

export function AppEffects() {
  useEffect(() => {
    // Custom Cursor
    const cursor = document.querySelector(".custom-cursor")
    if (!cursor) return

    const hoverables = document.querySelectorAll(
      'button, a, input, [class*="hover:"], .cursor-pointer, [data-testid="resizable-handle"]',
    )
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2, ease: "power3.out" })
    }
    const onMouseDown = () => gsap.to(cursor, { scale: 0.8, duration: 0.2 })
    const onMouseUp = () => gsap.to(cursor, { scale: 1, duration: 0.2 })

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)

    const onMouseEnter = () => gsap.to(cursor, { scale: 1.5, backgroundColor: "rgba(187, 0, 255, 0.7)", duration: 0.3 })
    const onMouseLeave = () => gsap.to(cursor, { scale: 1, backgroundColor: "rgba(0, 255, 255, 0.7)", duration: 0.3 })

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter)
      el.addEventListener("mouseleave", onMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter)
        el.removeEventListener("mouseleave", onMouseLeave)
      })
    }
  }, [])

  return <div className="custom-cursor"></div>
}
