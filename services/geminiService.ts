
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedPrayersResponse } from "../types";

export const generatePrayers = async (
  liturgyTitle: string,
  readingReference: string,
  readingContent: string,
  customResponse?: string,
  localContext?: string
): Promise<GeneratedPrayersResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = 'gemini-2.5-flash';

  const prompt = `
    Como um liturgista católico experiente, gere as Preces dos Fiéis (Oração Universal) para a Missa de: "${liturgyTitle}".
    Baseie-se na mensagem central desta leitura: "${readingReference} - ${readingContent}".
    
    REQUISITOS:
    1. Gere EXATAMENTE 4 preces.
    2. A resposta da assembleia deve ser ${customResponse ? `EXATAMENTE: "${customResponse}"` : 'curta e piedosa'}.
    3. ${localContext ? `A quarta prece deve focar NESTE contexto local: "${localContext}".` : 'A quarta prece deve ser pelos falecidos e pelas intenções particulares.'}
    
    Retorne APENAS um objeto JSON com:
    {
      "response": "texto da resposta",
      "prayers": ["prece 1", "prece 2", "prece 3", "prece 4"]
    }
  `;

  const result = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          response: { type: Type.STRING },
          prayers: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["response", "prayers"]
      }
    }
  });

  return JSON.parse(result.text || '{"response": "", "prayers": []}');
};
