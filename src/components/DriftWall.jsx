import { useEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

export default function DriftWall({ items = [], columns = 5, tileWidth = 180, tileHeight = 110, gap = 14, tilt = 13, turn = -11, perspective = 1100, depth = 120, speed = 26, lift = 45, fade = .55, dim = .45, grayscale = false, overlayColor = '#06060b', className = '' }) {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef(null);
  const cols = useMemo(() => Array.from({ length: columns }, (_, c) => items.filter((_, i) => i % columns === c)), [items, columns]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`drift-wall drift-wall-scope ${visible ? 'is-visible' : 'is-idle'} ${className}`}
      style={{ '--dw-w': `${tileWidth}px`, '--dw-h': `${tileHeight}px`, '--dw-gap': `${gap}px`, '--dw-tilt': `${tilt}deg`, '--dw-turn': `${turn}deg`, '--dw-perspective': `${perspective}px`, '--dw-speed': `${speed}s`, '--dw-depth': `${depth}px`, '--dw-dim': dim, '--dw-overlay': overlayColor, '--dw-gray': grayscale ? 1 : 0, '--dw-lift': `${lift}px`, '--dw-fade': fade }}
    >
      <div className="drift-wall__plane">
        {cols.map((col, c) => (
          <div className="drift-wall__col" key={c}>
            {[0, 1].map(copy => (
              <div className="drift-wall__track" key={copy}>
                {col.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div className="drift-wall__tile" key={`${copy}-${index}`}>
                      <div className="drift-wall__inner" style={{ '--dw-accent': item.accent || '#ff3346' }}>
                        {Icon ? (
                          <span className="drift-wall__icon" aria-hidden="true"><Icon /></span>
                        ) : (
                          <img src={item.image} alt={item.title || ''} loading="lazy" decoding="async" />
                        )}
                        <span className="drift-wall__overlay" />
                        <b>{item.title}</b>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
