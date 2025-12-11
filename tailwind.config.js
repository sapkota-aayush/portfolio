/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8ddd0',
          300: '#d4c2a8',
          400: '#b89d7a',
          500: '#9d7a5c',
          600: '#8b6b4f',
          700: '#735842',
          800: '#5f4938',
          900: '#4f3d30',
        },
      },
    },
  },
  plugins: [],
}

