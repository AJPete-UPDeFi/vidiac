// tailwind.config.js
import {nextui} from "@nextui-org/react";
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        brandBlue: '#0053a5',
        brandGreen: '#00be81',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

export default config;