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
        bgColor: 'rgb(255, 245, 245)'
      }
    },
  },
  plugins: [],
}