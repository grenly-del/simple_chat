/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Quick: ['Quicksand', 'sans-serif'],
        Pacifico: ['Pacifico', 'cursive'],
        Itim: ['Itim', 'cursive']
      }
    },
  },
  plugins: [],
}

