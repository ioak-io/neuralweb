const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    fontSize: {
      xs: '.75em',
      sm: '.875em',
      tiny: '.9em',
      base: '1em',
      lg: '1.125em',
      xl: '1.25em',
      '2xl': '1.5em',
      '3xl': '1.875em',
      '4xl': '2.25em',
      '5xl': '3em',
      '6xl': '4em',
      '7xl': '5em',
    },
    extend: {
      colors: {
        dark: {
          100: '#505050',
          200: '#414141',
          300: '#202020',
          400: '#161616',
          500: '#000000',
        },
        light: {
          100: '#ffffff',
          200: '#fafafa',
          300: '#f4f4f4',
          400: '#efefef',
          500: '#d0d0d0',
          600: '#c0c0c0',
        },
      },
    },
  },
  plugins: [
    [
      'postcss-preset-env',
      {
        // Options
      },
    ],
  ],
};
