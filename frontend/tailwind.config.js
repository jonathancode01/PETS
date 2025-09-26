/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'unipett-green-light': '#C6D57E',
        'unipett-green': '#A2B970',
        'unipett-teal': '#6A999C',
        'unipett-blue-light': '#A9D6E5',
        'unipett-blue-primary': '#468FAF',
        'unipett-blue-dark': '#01497C',
        'unipett-pink': '#E56B9F',
        'unipett-dark': '#2B2D42',
      }
    },
  },
  plugins: [],
}