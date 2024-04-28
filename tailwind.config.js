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
        brandPink: '#fe157d',
        brandDeepBlue: '#6d66f9',
        brandLavender: '#ecebff',
      },
      // Adding custom keyframes for animations
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        rotate: {
          '0%, 20%': { transform: 'rotate(0deg)' },
          '20%, 100%': { transform: 'rotate(360deg)' },
        },
      },
      // Defining animations that use the keyframes
      animation: {
        shake: 'shake 0.5s infinite',
        rotate: 'rotate 5s linear infinite',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}

export default config;