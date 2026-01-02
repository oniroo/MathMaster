
import React from 'react';

export const Loading = () => (
  <div className="h-64 flex flex-col items-center justify-center gap-4 text-slate-400">
    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    <span className="font-bold">문제를 가져오는 중...</span>
  </div>
);
