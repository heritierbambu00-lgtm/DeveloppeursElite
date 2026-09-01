/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F6F3EC',
        ink:   '#181B20',
        inkr:  '#2A2E35',
        smoke: '#6C7280',
        mist:  '#E5E0D3',
        line:  '#DBD4C4',
        clay:  '#BC4B0E',
        clayd: '#97390A',
        moss:  '#1F6B4A'
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Public Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
