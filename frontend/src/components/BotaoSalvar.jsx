// src/components/BotaoSalvar.jsx

// Usamos "props" (propriedades) para tornar o botão configurável.
// 'onClick' é a função que será executada ao clicar.
// 'children' é o texto ou ícone que aparecerá dentro do botão.
export default function BotaoSalvar({ onClick, children, type = 'submit' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-8 py-3 bg-brand-pink text-white font-bold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink transition-transform transform hover:scale-105"
    >
      {children}
    </button>
  );
}