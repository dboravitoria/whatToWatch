/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'index.html',
    './src/**/*.{html,js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBack: '#242424',
        primaryBlack: '#121212',
        primaryRed: '#ef4444',
        primaryYellow: '#eab308'
      }
    },
  },
  plugins: [],
}

