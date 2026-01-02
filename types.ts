
export enum Difficulty {
  EASY = '쉬움',
  MEDIUM = '보통',
  HARD = '어려움',
  KILLER = '킬러'
}

export interface Problem {
  id: string;
  question: string;
  choices?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  sourceType: string; // e.g., "평가원 기출 변형", "수능 연계"
}

export interface UserSubmission {
  problemId: string;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface QuizState {
  currentProblem: Problem | null;
  history: UserSubmission[];
  isLoading: boolean;
  error: string | null;
}

export type ProblemResponse = Omit<Problem, 'id'>;
