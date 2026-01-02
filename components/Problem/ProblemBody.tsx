
import React from 'react';
import { Latex } from './Latex';
import { ProblemHeader } from './ProblemHeader';
import { ChoiceList } from './ChoiceList';
import { Problem } from '../types';

interface Props {
  problem: Problem;
  selected: string;
  onSelect: (val: string) => void;
}

export const ProblemBody: React.FC<Props> = ({ problem, selected, onSelect }) => (
  <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200 w-full max-w-2xl">
    <ProblemHeader difficulty={problem.difficulty} source={problem.source} />
    <div className="text-lg font-medium text-slate-800 mb-8">
      <Latex content={problem.question} />
    </div>
    {problem.choices && (
      <ChoiceList choices={problem.choices} selected={selected} onSelect={onSelect} />
    )}
  </div>
);
