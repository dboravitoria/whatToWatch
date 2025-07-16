// src/pages/Error500.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Error500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkBack dark:bg-primaryBlack text-primaryRed dark:text-primaryYellow p-6">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Oops! Parece que algo deu errado no servidor. Estamos trabalhando para resolver isso rapidinho!
      </p>
      <Link to="/" className="px-6 py-3 bg-primaryRed dark:bg-primaryYellow text-white dark:text-primaryBlack rounded hover:bg-secondaryRed dark:hover:bg-secondaryRed transition">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
