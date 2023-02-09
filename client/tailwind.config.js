/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.js'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: colors.zinc,
      green: colors.lime,
      primary: {
        light: '#56de45',
        DEFAULT: '#4fc41d',
        dark: '#4cb51d',
      },
    },
    extend: {},
  },
  plugins: [],
}
