
import React from 'react';
import { Difficulty } from '../types';

export const ProblemHeader: React.FC<{ difficulty: Difficulty; source: string }> = ({ difficulty, source }) => (
  <div className="flex justify-between items-center mb-6 text-xs font-bold tracking-tight">
    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full uppercase">
      {difficulty}
    </span>
    <span className="text-slate-400">출처: {source}</span>
  </div>
);
