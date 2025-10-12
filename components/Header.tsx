import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm shadow-lg shadow-cyan-500/10 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
            <path d="M2 17l10 5 10-5"></path>
            <path d="M2 12l10 5 10-5"></path>
        </svg>
        <h1 className="text-2xl font-bold text-white tracking-wider">
          Buscador de Hub <span className="text-cyan-400">Freelancer</span>
        </h1>
      </div>
    </header>
  );
};