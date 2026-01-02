
import React, { useEffect, useRef } from 'react';

export const Latex: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && (window as any).katex) {
      ref.current.innerHTML = text.replace(/\$(.*?)\$/g, (_, f) => 
        (window as any).katex.renderToString(f, { throwOnError: false })
      );
    }
  }, [text]);

  return <div ref={ref} className="leading-relaxed" />;
};
