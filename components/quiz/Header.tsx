
import React from 'react';
import { Difficulty } from '../../types';

export const Header: React.FC<{ level: Difficulty; source: string }> = ({ level, source }) => (
  <div className="flex justify-between items-center mb-6">
    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black">
      {level}
    </span>
    <span className="text-xs text-slate-400 font-medium">출처: {source}</span>
  </div>
);
