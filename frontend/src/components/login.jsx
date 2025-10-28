import { motion } from 'framer-motion';

function Login() {
  // 1. Removemos o 'useState' e 'axios', pois não há mais formulário.

  // 2. Removemos a função 'handleSubmit', pois a rota /login não existe.

  // 3. Corrigimos a URL do Google Login
  const handleGoogleLogin = () => {
    // O backend está em localhost:3000
    window.location.href = 'http://localhost:3002/auth/google';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#F2F2F2] min-h-screen flex items-center justify-center p-6 font-sans"
    >
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#D971AA] text-center mb-6">Login - UNIPET</h1>
        
        {/* 4. O <form> inteiro foi removido */}
        
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-[#4BBFB4] text-white py-3 rounded-lg shadow-md hover:shadow-lg"
        >
          Entrar com Google
        </button>
      </div>
    </motion.div>
  );
}

export default Login;