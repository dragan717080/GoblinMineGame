/* eslint-disable import/no-extraneous-dependencies */
import tailwindTypography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
const colors = require('tailwindcss/colors')

export default {
  mode: 'jit',
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#FF9519',
      secondary: '#FF9B00',
      beige: "#D2BDAB",
      skintone: "#DE9B72",
      coffee: "#432B2A",
      lightcoffee: "#6F3B3A",
      peach: "#FFDAB9",
      darkpeach: "#FFBC80",
      limegreen: "#1DB954",
      limegreenalt: '#CBFC48',
      dark: "#3A3D3E",
      transparent: 'transparent',
      current: 'currentColor',
      red: colors.red,
      black: colors.black,
      white: colors.white,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      stone: colors.warmGray,
      sky: colors.lightBlue,
      neutral: colors.trueGray,
      gray: colors.coolGray,
      slate: colors.blueGray,
    },
    fontFamily: {
      sans: ['"Plus Jakarta Sans Variable"', ...fontFamily.sans],
    },
  },
  plugins: [
    tailwindTypography,
    require("./namedColors"),
  ],
} satisfies Config;
