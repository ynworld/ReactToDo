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
        tint: 'rgba(79, 196, 29, 0.4)',
        dark: '#4cb51d',
      },
      secondary: {
        DEFAULT: '#a30e0e',
      },
    },
    extend: {
      animation: {
        ripple: 'ripple 0.3s ease-out forwards',
      },
      keyframes: {
        ripple: {
          '99%': {
            left: '0px',
            top: '0px',
            width: '24px',
            height: '24px',
            transform: 'scale(3)',
            opacity: '0',
          },
          '100%': {
            left: '10px',
            top: '10px',
            width: '0px',
            height: '0px',
            transform: 'scale(0)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}
