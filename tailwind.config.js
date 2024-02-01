/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        volcanoGif: "url('/src/assets/vocanicEuruption1.gif')",
        stHelensWithtop: "url('src/assets/sthelens1-animation-eb3a7d-640.gif')",
        stHelensWithPlume: "url('src/assets/st-helens.webp')",
        lavaVolcano: "url('src/assets/lava-volcano-image.jpg')",
        activeVolcano: "url('src/assets/active-volcano-turrialba-in-costa-rica.jpg')",
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
