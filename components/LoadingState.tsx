
import React from 'react';

export const LoadingState = () => (
  <div className="h-screen flex flex-col items-center justify-center gap-4 text-slate-400">
    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    <p className="font-bold animate-pulse">수학 문제를 생성하는 중...</p>
  </div>
);
