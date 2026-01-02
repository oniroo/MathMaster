
import React from 'react';
import { Latex } from '../ui/Latex';

export const Choices: React.FC<{ list: string[]; active: string; onPick: (v: string) => void }> = ({ list, active, onPick }) => (
  <div className="space-y-3">
    {list.map((item, i) => (
      <button key={i} onClick={() => onPick(item)}
        className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
          active === item ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:bg-slate-50'
        }`}>
        <span className="font-bold mr-3">{i + 1}.</span>
        <Latex text={item} />
      </button>
    ))}
  </div>
);
