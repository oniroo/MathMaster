
import { GoogleGenAI } from "@google/genai";
import { Problem } from "../types";
import { QUIZ_SCHEMA, getSystemPrompt } from "./prompt";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchProblem = async (): Promise<Problem> => {
  const result = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: getSystemPrompt(),
    config: { 
      responseMimeType: "application/json", 
      responseSchema: QUIZ_SCHEMA,
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });

  return { ...JSON.parse(result.text), id: crypto.randomUUID() };
};
