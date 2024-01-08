/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/css")
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss"), [require("nativewind/postcss")]],
}

