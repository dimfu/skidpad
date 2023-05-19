/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        neutral: {
          50: '#e5e5e5',
          100: '#dbdbdb',
          200: '#b3b3b3',
          300: '#acacac',
          400: '#9c9c9c',
          500: '#6d6d6d',
          600: '#2c2c2c',
          700: '#3d3d3d',
          800: '#232323',
          900: '#161616',
        },
      },
    },
  },
  plugins: [],
}
