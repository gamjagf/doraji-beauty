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
          indigo: '#3B4A8C',
          cream: '#F8F4EC',
          gold: '#C9A84C'
        }
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
