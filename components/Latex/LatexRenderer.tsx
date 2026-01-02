
import React, { useEffect, useRef } from 'react';

interface LatexRendererProps {
  content: string;
  className?: string;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ content, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && (window as any).renderMathInElement) {
      // Logic for auto-render if available, otherwise manual:
      const parts = content.split(/(\$.*?\$)/g);
      containerRef.current.innerHTML = '';
      
      parts.forEach(part => {
        const span = document.createElement('span');
        if (part.startsWith('$') && part.endsWith('$')) {
          const formula = part.slice(1, -1);
          try {
            (window as any).katex.render(formula, span, { throwOnError: false });
          } catch (e) {
            span.textContent = part;
          }
        } else {
          span.textContent = part;
        }
        containerRef.current?.appendChild(span);
      });
    } else if (containerRef.current && (window as any).katex) {
        // Fallback for simple direct string rendering
        const html = content.replace(/\$(.*?)\$/g, (match, formula) => {
            try {
                return (window as any).katex.renderToString(formula, { throwOnError: false });
            } catch {
                return match;
            }
        });
        containerRef.current.innerHTML = html;
    }
  }, [content]);

  return <div ref={containerRef} className={`leading-relaxed ${className}`} />;
};

export default LatexRenderer;
