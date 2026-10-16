import { useEffect, useState } from 'react';
import './SplitFlapText.css';

const SplitFlapText = ({
  text = '',
  flipDuration = 0.12,
  stagger = 0.045,
  tileColor = '#17243a',
  textColor = '#eef4ff',
  tileRadius = 5,
  gap = 3,
  fontSize = 'clamp(16px, 2.4vw, 30px)',
  depth = 0.5,
  className = ''
}) => {
  const [started, setStarted] = useState(false);
  const chars = Array.from(text);

  useEffect(() => {
    const timer = window.setTimeout(() => setStarted(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span
      className={`split-flap-text ${className}`}
      aria-label={text}
      style={{
        '--split-flap-tile-color': tileColor,
        '--split-flap-text-color': textColor,
        '--split-flap-radius': typeof tileRadius === 'number' ? `${tileRadius}px` : tileRadius,
        '--split-flap-gap': typeof gap === 'number' ? `${gap}px` : gap,
        '--split-flap-font-size': typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        '--split-flap-duration': `${flipDuration}s`,
        '--split-flap-depth': depth,
        '--split-flap-stagger': `${stagger}s`
      }}
    >
      <span className="split-flap-text__sr">{text}</span>
      <span className="split-flap-text__board" aria-hidden="true">
        {chars.map((char, index) => (
          <span
            key={`${index}-${char}`}
            className={`split-flap-text__tile${started ? ' is-flipping' : ''}`}
            style={{ animationDelay: `${index * stagger}s` }}
          >
            <span className="split-flap-text__half split-flap-text__half--top">{char === ' ' ? '\u00a0' : char}</span>
            <span className="split-flap-text__half split-flap-text__half--bottom">{char === ' ' ? '\u00a0' : char}</span>
            <span className="split-flap-text__flap">{char === ' ' ? '\u00a0' : char}</span>
          </span>
        ))}
      </span>
    </span>
  );
};

export default SplitFlapText;
