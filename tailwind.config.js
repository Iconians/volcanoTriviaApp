/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        volcanoGif: "url('/vocanicEuruption1.gif')",
        stHelensWithtop: "url('/sthelens1-animation-eb3a7d-640.gif')",
        stHelensWithPlume: "url('/st-helens.webp')",
        lavaVolcano: "url('/lava-volcano-image.jpg')",
        activeVolcano: "url('/active-volcano-turrialba-in-costa-rica.jpg')",
      },
      colors: {
        brown: {
          500: '#a52a2a'
        }
      }
    }
  },
  plugins: []
}
