import { GoogleGenAI, Type } from "@google/genai";
import type { ManagementSystem } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
      recommendations: {
        type: Type.ARRAY,
        description: "Uma lista de sistemas de gerenciamento recomendados.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "O nome do sistema de gerenciamento.",
            },
            description: {
              type: Type.STRING,
              description: "Uma breve descrição do sistema em 2-3 frases.",
            },
            website: {
              type: Type.STRING,
              description: "O URL do site oficial do sistema, começando com https://",
            },
            keyFeatures: {
              type: Type.ARRAY,
              description: "Uma lista de funcionalidades chave relevantes para a solicitação do usuário.",
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ["name", "description", "website", "keyFeatures"],
        },
      },
    },
    required: ["recommendations"],
  };


export const generateRecommendations = async (features: string[]): Promise<ManagementSystem[]> => {
  const prompt = `
Com base nas seguintes funcionalidades necessárias, por favor, recomende 5 sistemas de gerenciamento populares e eficazes para freelancers. Para cada sistema, forneça o nome, uma breve descrição (2-3 frases), o URL do site oficial e uma lista de suas principais funcionalidades que correspondem à seleção do usuário.

Funcionalidades Necessárias:
- ${features.join('\n- ')}

Por favor, forneça a saída no formato JSON especificado. Não inclua nenhum texto introdutório ou explicações fora da estrutura JSON. Garanta que o URL do site seja um link válido e direto para a página inicial da ferramenta.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });
    
    const jsonString = response.text;
    const parsed = JSON.parse(jsonString);

    if (parsed && parsed.recommendations) {
      return parsed.recommendations as ManagementSystem[];
    } else {
      console.error("Unexpected JSON structure:", parsed);
      return [];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch recommendations from the AI service.");
  }
};