/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#B15B60',
          DEFAULT: '#8F141B'
        },
        secondary: {
          light: '#E5DDB8',
          DEFAULT: '#DFD4A6'
        }
      }
    }
  },
  plugins: []
}
