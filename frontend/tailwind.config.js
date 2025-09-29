/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Aqui adicionamos nossas cores customizadas
      colors: {
        'brand-dark': '#2A2E34', // O cinza escuro do fundo
        'brand-pink': '#E66A9D', // O rosa principal do logo
        'brand-blue': {
          light: '#A1C6E4',
          DEFAULT: '#3B8DCC', // Um azul padrão da paleta
          dark: '#004A8D',   // O azul mais escuro
        },
        'brand-green': {
          light: '#C7E8AA',
          DEFAULT: '#6ABEA7', // O verde/água padrão
        },
        'brand-gray-light': '#F3F4F6', // O cinza bem claro/quase branco
      }
    },
  },
  plugins: [],
}