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
        secundaryBlack: '#1a1a1a',
        tertiaryBlack: '#a3a3a3',
        primaryRed: '#ef4444',
        secondaryRed: '#b91c1c',
        primaryYellow: '#facc15',
        secondaryYellow: '#ca8a04'
      }
    },
  },
  plugins: [],
}

