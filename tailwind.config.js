/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sephia: {
          blue: '#1e3a8a',
          cyan: '#06b6d4',
          emerald: '#10b981',
          orange: '#f97316',
          bg: '#f0f9ff'
        }
      }
    },
  },
  plugins: [],
}
