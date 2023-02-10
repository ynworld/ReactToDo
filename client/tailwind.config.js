/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.js'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
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
        tint: 'rgba(79, 196, 29, 0.4)',
        dark: '#4cb51d',
      },
      alert: {
        DEFAULT: '#a30e0e',
      },
    },
  },
  plugins: [],
}
