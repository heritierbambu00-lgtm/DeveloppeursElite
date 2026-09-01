/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elite-blue': '#0085FF',
        'elite-dark': '#020617',
      }
    },
  },
  plugins: [],
}
