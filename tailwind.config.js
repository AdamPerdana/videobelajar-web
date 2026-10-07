/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        brandGreen: {
          DEFAULT: '#3ECF4C', // Primary Green
          hover: '#36B843',
          light: '#E8F9EA',
        },
        brandYellow: {
          DEFAULT: '#FFC107', // Secondary Yellow
          light: '#FFF8E1',
        },
        brandOrange: {
          DEFAULT: '#F26522', // Logo Brand
        },
      },
    },
  },
  plugins: [],
}