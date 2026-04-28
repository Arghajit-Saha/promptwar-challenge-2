/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF8F2', // warm ivory
        navy: {
          900: '#0F2040',
          800: '#152C55',
          700: '#1E3A6E', // primary deep navy
          600: '#284C8F',
        },
        ivory: {
          DEFAULT: '#FAF8F2',
          light: '#FFFFFF',
          dark: '#F0ECE1',
        },
        red: {
          DEFAULT: '#C0392B', // election red
        },
        gold: {
          DEFAULT: '#C8A84B', // accent
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'], // body (readable)
        serif: ['"Playfair Display"', 'serif'], // headings (authoritative)
      },
      boxShadow: {
        'editorial': '0 4px 20px rgba(30, 58, 110, 0.08)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
