
import React, { useState, useEffect } from 'react';
import { useQuiz } from './hooks/useQuiz';
import { AppHeader } from './components/layout/Header';
import { Card } from './components/quiz/Card';
import { Result } from './components/quiz/Result';
import { Loading } from './components/ui/Loading';
import { Submission } from './types';

const App = () => {
  const { state, load, submit } = useQuiz();
  const [pick, setPick] = useState('');
  const [result, setResult] = useState<Submission | null>(null);

  useEffect(() => { load(); }, [load]);

  const handleNext = () => { setResult(null); setPick(''); load(); };

  if (state.loading) return <div className="h-screen flex items-center justify-center"><Loading /></div>;
  if (!state.problem) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 sm:p-12">
      <AppHeader />
      <div className="max-w-xl w-full">
        <Card problem={state.problem} pick={pick} onPick={setPick} />
        <button onClick={() => setResult(submit(pick))} disabled={!pick}
          className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 disabled:opacity-30 transition-all active:scale-95">
          정답 제출하기
        </button>
      </div>
      {result && <Result problem={state.problem} data={result} onNext={handleNext} />}
    </div>
  );
};

export default App;
