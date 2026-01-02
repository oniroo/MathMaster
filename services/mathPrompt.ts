
import { Type } from "@google/genai";

export const MATH_TOPIC = '지수함수의 성질, 그래프, 방정식과 부등식';

export const MATH_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    question: { type: Type.STRING },
    choices: { type: Type.ARRAY, items: { type: Type.STRING } },
    correctAnswer: { type: Type.STRING },
    explanation: { type: Type.STRING },
    difficulty: { type: Type.STRING, enum: ["쉬움", "보통", "어려움", "킬러"] },
    source: { type: Type.STRING }
  },
  required: ["question", "correctAnswer", "explanation", "difficulty", "source"]
};

export const getMathPrompt = (topic: string) => `
  대한민국 고교 수학I '${topic}' 문제를 생성하라.
  수능 및 평가원 기출 스타일을 따르며 모든 수식은 LaTeX $...$ 형식을 사용하라.
`;
