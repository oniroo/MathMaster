
import { GoogleGenAI } from "@google/genai";
import { Problem } from "../types";
// Fix: Corrected imports to use existing exports from prompt.ts and config.ts as TOPIC and SCHEMA were missing
import { QUIZ_SCHEMA } from "./prompt";
import { MATH_TOPIC } from "../constants/config";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProblem = async (): Promise<Problem> => {
  // Fix: Use MATH_TOPIC and QUIZ_SCHEMA instead of missing TOPIC and SCHEMA variables
  const result = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `고교 수학 '${MATH_TOPIC}' 문제를 생성하라. 수식은 LaTeX $...$ 형식을 사용하라.`,
    config: { 
      responseMimeType: "application/json", 
      responseSchema: QUIZ_SCHEMA,
      thinkingConfig: { thinkingBudget: 2000 }
    }
  });

  // Fix: Access result.text property directly as it is a getter and handle potential undefined value
  const jsonText = result.text || "{}";
  return { ...JSON.parse(jsonText), id: crypto.randomUUID() };
};
