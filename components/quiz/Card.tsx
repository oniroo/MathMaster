
import React from 'react';
import { Problem } from '../../types';
import { Header } from './Header';
import { Choices } from './Choices';
import { Latex } from '../ui/Latex';

interface Props { problem: Problem; pick: string; onPick: (v: string) => void; }

export const Card: React.FC<Props> = ({ problem, pick, onPick }) => (
  <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
    <Header level={problem.difficulty} source={problem.source} />
    <div className="text-xl font-bold mb-8 text-slate-800">
      <Latex text={problem.question} />
    </div>
    {problem.choices && <Choices list={problem.choices} active={pick} onPick={onPick} />}
  </div>
);
