
import React from 'react';
import { Latex } from './Latex';

interface Props {
  choices: string[];
  selected: string;
  onSelect: (val: string) => void;
}

export const ChoiceList: React.FC<Props> = ({ choices, selected, onSelect }) => (
  <div className="grid gap-3">
    {choices.map((choice, i) => (
      <button
        key={i}
        onClick={() => onSelect(choice)}
        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
          selected === choice ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-slate-100 hover:bg-slate-50'
        }`}
      >
        <span className="font-bold mr-3 text-slate-400">{i + 1}.</span>
        <Latex content={choice} />
      </button>
    ))}
  </div>
);
