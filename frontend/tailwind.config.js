/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
    theme: {
      extend: {
        screens: {
          'xs': '220px', // Custom breakpoint for min-width of 220px
        },
      },
    },
  
}