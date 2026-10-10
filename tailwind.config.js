/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        eco: {
          emerald: '#059669',
          teal: '#0d9488',
          mint: '#10b981',
          lime: '#84cc16',
          forest: '#064e3b',
          leaf: '#22c55e',
          earth: '#78350f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(34, 197, 94, 0.25)',
        'glow-md': '0 0 25px -5px rgba(34, 197, 94, 0.35)',
        'glow-lg': '0 0 40px -10px rgba(34, 197, 94, 0.45)',
      }
    },
  },
  plugins: [],
}
