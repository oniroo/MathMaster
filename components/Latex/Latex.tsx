
import React, { useEffect, useRef } from 'react';

export const Latex: React.FC<{ content: string }> = ({ content }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && (window as any).katex) {
      const html = content.replace(/\$(.*?)\$/g, (_, f) => 
        (window as any).katex.renderToString(f, { throwOnError: false })
      );
      ref.current.innerHTML = html;
    }
  }, [content]);

  return <div ref={ref} className="inline-block w-full" />;
};
