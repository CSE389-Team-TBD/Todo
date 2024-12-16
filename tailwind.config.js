/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      // Set Arial as the Main Font for the App.
      sans: ['"Arial"', 'sans-serif']
    }
  },
  plugins: [],
}

