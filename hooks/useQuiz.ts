
import { useState, useCallback } from 'react';
import { QuizState, Submission } from '../types';
import { fetchProblem } from '../services/gemini';
import { isCorrect } from '../utils/grader';

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>({ problem: null, history: [], loading: false });

  const load = useCallback(async () => {
    setState(s => ({ ...s, loading: true, problem: null }));
    try {
      const problem = await fetchProblem();
      setState(s => ({ ...s, problem, loading: false }));
    } catch (e) {
      setState(s => ({ ...s, loading: false }));
    }
  }, []);

  const submit = (ans: string) => {
    if (!state.problem) return null;
    const result: Submission = { 
      problemId: state.problem.id, 
      userAnswer: ans, 
      isCorrect: isCorrect(state.problem, ans) 
    };
    setState(s => ({ ...s, history: [...s.history, result] }));
    return result;
  };

  return { state, load, submit };
};
