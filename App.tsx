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

      const result = await generateRecommendations(featureNames);
      setRecommendations(result);
    } catch (e) {
      console.error(e);
      setError('Falha ao gerar recomendações. Por favor, verifique sua chave de API e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedFeatures]);

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