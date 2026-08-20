/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9fe',
          200: '#c2d4fe',
          300: '#94b5fd',
          400: '#608bf9',
          500: '#3b62f6',
          600: '#2541ec',
          700: '#1d2ed9',
          800: '#1e27b0',
          900: '#1e248b',
          950: '#111554',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
        },
        amber: {
          500: '#f59e0b',
        }
      },
    },
  },
  plugins: [],
}
