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
        moss:  '#1F6B4A',
        // Lumaora Inspired Colors
        'luma-dark': '#0B0813',
        'luma-card': 'rgba(25, 20, 38, 0.6)',
        'luma-purple': '#9E7AFF',
        'luma-blue': '#53B1FD',
        'luma-pink': '#FE83F2',
      },
      backgroundImage: {
        'luma-gradient': 'linear-gradient(135deg, #0B0813 0%, #1A1429 100%)',
        'neon-purple': 'linear-gradient(90deg, #9E7AFF 0%, #FE83F2 100%)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Public Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
