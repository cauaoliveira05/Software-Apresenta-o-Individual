import React from 'react';
import type { ManagementSystem } from '../types';

interface ResultsDisplayProps {
  systems: ManagementSystem[];
}

const ResultCard: React.FC<{ system: ManagementSystem }> = ({ system }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
      <h3 className="text-xl font-bold text-cyan-400 mb-2">{system.name}</h3>
      <p className="text-gray-300 mb-4 flex-grow">{system.description}</p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-200 mb-2">Principais Funcionalidades:</h4>
        <div className="flex flex-wrap gap-2">
          {system.keyFeatures.map((feature, index) => (
            <span key={index} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">
              {feature}
            </span>
          ))}
        </div>
      </div>

      <a
        href={system.website}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block bg-gray-700 hover:bg-cyan-800 text-cyan-300 font-bold py-2 px-4 rounded-md text-center transition-colors duration-300"
      >
        Visitar Site &rarr;
      </a>
    </div>
  );
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ systems }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Seus Sistemas Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system, index) => (
          <ResultCard key={index} system={system} />
        ))}
      </div>
    </div>
  );
};