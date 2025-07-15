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
        primaryWhite: '#ddd',
        primaryRed: '#ef4444',
        secondaryRed: '#b91c1c',
        tertiaryRed: '#c44536',
        primaryYellow: '#facc15',
        secondaryYellow: '#ca8a04'
      },
      transitionProperty: {
      'colors': 'background-color, border-color, color, fill, stroke',
    },
    },
  },
  plugins: [],
}

