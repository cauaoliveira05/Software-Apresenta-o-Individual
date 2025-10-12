
import React from 'react';
import type { Feature } from '../types';
import { FEATURES } from '../constants';

interface FeatureSelectorProps {
  selectedFeatures: Set<string>;
  onToggle: (featureId: string) => void;
}

const FeatureCard: React.FC<{ feature: Feature; isSelected: boolean; onToggle: (id: string) => void; }> = ({ feature, isSelected, onToggle }) => {
  const baseClasses = "relative p-5 rounded-lg border-2 text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1";
  const selectedClasses = "bg-cyan-900/50 border-cyan-400 shadow-lg shadow-cyan-500/20";
  const unselectedClasses = "bg-gray-800 border-gray-700 hover:border-cyan-500";
  
  return (
    <div className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`} onClick={() => onToggle(feature.id)}>
      <div className={`mx-auto mb-3 h-10 w-10 flex items-center justify-center rounded-full ${isSelected ? 'text-cyan-300' : 'text-gray-400'}`}>
        {feature.icon}
      </div>
      <h3 className="font-semibold text-white text-md">{feature.name}</h3>
      <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
      {isSelected && (
        <div className="absolute top-2 right-2 h-5 w-5 bg-cyan-400 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
        </div>
      )}
    </div>
  );
};


export const FeatureSelector: React.FC<FeatureSelectorProps> = ({ selectedFeatures, onToggle }) => {
  return (
    <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {FEATURES.map(feature => (
                <FeatureCard 
                    key={feature.id}
                    feature={feature}
                    isSelected={selectedFeatures.has(feature.id)}
                    onToggle={onToggle}
                />
            ))}
        </div>
    </div>
  );
};
