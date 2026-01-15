/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          neon: '#a855f7',
          dark: '#0f172a',
          surface: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}
