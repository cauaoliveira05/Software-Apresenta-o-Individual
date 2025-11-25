import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FeatureSelector } from './components/FeatureSelector';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { generateRecommendations } from './services/geminiService';
import type { ManagementSystem } from './types';
import { FEATURES } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [customRequirements, setCustomRequirements] = useState<string>('');
  const [recommendations, setRecommendations] = useState<ManagementSystem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleFeatureToggle = useCallback((featureId: string) => {
    setSelectedFeatures(prev => {
      const newSet = new Set(prev);
      if (newSet.has(featureId)) {
        newSet.delete(featureId);
      } else {
        newSet.add(featureId);
      }
      return newSet;
    });
  }, []);

  const handleGenerateClick = useCallback(async () => {
    if (selectedFeatures.size === 0) {
      setError('Por favor, selecione pelo menos uma funcionalidade.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const featureNames = FEATURES
        .filter(f => selectedFeatures.has(f.id))
        .map(f => f.name);

      const result = await generateRecommendations(featureNames, customRequirements);
      setRecommendations(result);
    } catch (e) {
      console.error(e);
      setError('Falha ao gerar recomendações. Por favor, verifique sua chave de API e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFeatures, customRequirements]);

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400">Encontre o Seu Hub Freelancer Perfeito</h2>
          <p className="text-lg text-gray-400 mb-8">
            Selecione as funcionalidades que você precisa, e nossa IA recomendará os melhores sistemas de gerenciamento para otimizar seu fluxo de trabalho e aumentar sua produtividade.
          </p>
        </div>

        <FeatureSelector selectedFeatures={selectedFeatures} onToggle={handleFeatureToggle} />

        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
             <label htmlFor="custom-requirements" className="block text-cyan-400 font-semibold mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Detalhes Adicionais (Opcional)
             </label>
             <textarea
                id="custom-requirements"
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                placeholder="Ex: Preciso de uma ferramenta que tenha plano gratuito, suporte a português brasileiro e integração nativa com o Slack..."
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all duration-300 resize-none h-24"
             />
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={handleGenerateClick}
            disabled={isLoading || selectedFeatures.size === 0}
            className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-cyan-500/30 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            {isLoading ? 'Gerando...' : 'Obter Recomendações'}
          </button>
        </div>

        {error && <p className="text-center text-red-400 mt-6">{error}</p>}
        
        <div className="mt-12">
          {isLoading && <Loader />}
          {recommendations.length > 0 && <ResultsDisplay systems={recommendations} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;