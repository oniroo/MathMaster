
import { GoogleGenAI, Type } from "@google/genai";
import { ProblemResponse } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  public async generateMathProblem(topic: string): Promise<ProblemResponse> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `대한민국 고등학교 수학I 과정의 '${topic}' 단원 문제를 생성해주세요. 
      수능(CSAT), 평가원 모의고사, 교육청 모의고사 스타일의 발문을 사용하세요.
      문제는 창작하되, 기존 기출 문제의 논리 구조를 반영하여 수학적 오류가 없어야 합니다.
      모든 수식은 LaTeX 형식으로 작성해주세요. (예: $y = 2^x$)`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              description: "문제 지문. 수식은 LaTeX 기호 $ $ 로 감싸주세요."
            },
            choices: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "객관식 보기 5개 (없으면 빈 배열 가능)"
            },
            correctAnswer: {
              type: Type.STRING,
              description: "정답 (객관식이면 번호 또는 내용, 주관식이면 숫자)"
            },
            explanation: {
              type: Type.STRING,
              description: "풀이 과정. 단계별로 상세히 설명하세요."
            },
            difficulty: {
              type: Type.STRING,
              enum: ["쉬움", "보통", "어려움", "킬러"]
            },
            sourceType: {
              type: Type.STRING,
              description: "문제의 출제 스타일 (예: 2024학년도 수능 15번 변형)"
            }
          },
          required: ["question", "correctAnswer", "explanation", "difficulty", "sourceType"]
        }
      }
    });

    try {
      return JSON.parse(response.text.trim());
    } catch (e) {
      throw new Error("Failed to parse math problem response");
    }
  }
}

export const geminiService = new GeminiService();
