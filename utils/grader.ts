
import { Problem } from '../types';

export const isCorrect = (problem: Problem, answer: string): boolean => {
  const user = answer.trim().toLowerCase();
  const correct = problem.correctAnswer.trim().toLowerCase();
  
  const choiceIndex = problem.choices?.findIndex(c => c === answer) + 1;
  
  return user === correct || choiceIndex === parseInt(correct);
};
