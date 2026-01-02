
export type Difficulty = '쉬움' | '보통' | '어려움' | '킬러';

export interface Problem {
  id: string;
  question: string;
  choices?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  source: string;
}

export interface Submission {
  problemId: string;
  userAnswer: string;
  isCorrect: boolean;
}

export interface QuizState {
  problem: Problem | null;
  history: Submission[];
  loading: boolean;
}
