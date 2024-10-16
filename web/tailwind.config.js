/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#cf4bfe",
        secondary: "#dcff3f",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
