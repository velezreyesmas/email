/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        leftappear: {
          '0%': { marginLeft: '-10%', opacity: '0' },
          '100%': { marginLeft: '0',  opacity: '1' },
        }
      }
    }
  },
  plugins: [],
}