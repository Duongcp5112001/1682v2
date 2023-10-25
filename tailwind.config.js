/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(138, 47, 199)',
        secondary: 'rgb(165, 126, 177)',
        bgColor: 'rgb(255, 245, 245)',
        btnPrimary: 'rgb(8, 102, 255)',
        btnSecondary: 'rgb(78, 79, 80)',
        btnHover: 'rgb(64,150,255)',
        btnAntd: 'rgb(22,119,255)'
      }
    },
  },
  plugins: [],
}