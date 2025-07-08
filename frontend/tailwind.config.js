/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-green": "#6afc9f",
        "dark-bg": "#111827",
        "dark-card": "#1f2937",
        "dark-border": "#374151",
        "dark-text": "#d1d5db",
        "dark-text-secondary": "#9ca3af",
        "purple-accent": "#8b5cf6",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
}
