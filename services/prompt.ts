
import { Type } from "@google/genai";
import { MATH_TOPIC, PROBLEM_SCHEMA_PROPERTIES } from "../constants/config";

export const QUIZ_SCHEMA = {
  type: Type.OBJECT,
  properties: PROBLEM_SCHEMA_PROPERTIES,
  required: ["question", "correctAnswer", "explanation", "difficulty", "source"]
};

export const getSystemPrompt = () => `
  대한민국 고교 수학I '${MATH_TOPIC}' 문제를 생성하라. 
  수능/평가원 기출 스타일을 따르며 모든 수식은 LaTeX $...$ 형식을 사용하라.
`;
