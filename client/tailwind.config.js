/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('/tailwind/defaulttheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      // }
    },
  },
  plugins: [require('flowbite/plugin')],
}

