
import React from 'react';

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export const SubmitButton: React.FC<Props> = ({ onClick, disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-30 transition-all active:scale-95"
  >
    정답 확인
  </button>
);
