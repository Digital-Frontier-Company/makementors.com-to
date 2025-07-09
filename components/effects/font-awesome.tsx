"use client"

import Script from "next/script"

/**
 * Loads the Font Awesome JS so the <i className="fa-solid …" /> icons render.
 */
export function FontAwesomeScript() {
  return (
    <Script
      src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
      strategy="afterInteractive"
    />
  )
}
