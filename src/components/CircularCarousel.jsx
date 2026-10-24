import { useEffect, useMemo, useRef, useState } from 'react';
import './CircularCarousel.css';

const CircularCarousel = ({
  items = [],
  cardWidth = 200,
  aspectRatio = 1,
  gap = 24,
  speed = 14,
  direction = 'left',
  autoplay = 'drift',
  pauseOnHover = true,
  focusOnClick = true,
  draggable = true,
  captions = true,
  fadeColor = '#000000',
  cornerRadius = 16,
  className = ''
}) => {
  const rootRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef(null);
  const count = items.length;
  const step = 360 / Math.max(count, 1);
  const radius = useMemo(() => Math.max(150, (cardWidth + gap) / (2 * Math.tan(Math.PI / Math.max(count, 3)))), [cardWidth, gap, count]);

  useEffect(() => {
    if (autoplay !== 'drift' || paused || count < 2) return undefined;
    let frame;
    let last = 0;
    const tick = now => {
      if (last) {
        const delta = Math.min((now - last) / 1000, 0.05);
        setAngle(current => {
          const next = current + (direction === 'right' ? 1 : -1) * speed * delta;
          const index = ((Math.round(-next / step) % count) + count) % count;
          setActive(index);
          return next;
        });
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, paused, count, direction, speed, step]);

  const focusIndex = index => {
    const target = -index * step;
    const normalized = angle + ((((target - angle) % 360) + 540) % 360) - 180;
    setAngle(normalized);
    setActive(index);
  };

  const onPointerDown = event => {
    if (!draggable || event.button !== 0) return;
    drag.current = { x: event.clientX, angle, moved: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setPaused(true);
  };
  const onPointerMove = event => {
    if (!drag.current) return;
    const delta = event.clientX - drag.current.x;
    if (Math.abs(delta) > 3) drag.current.moved = true;
    const next = drag.current.angle + delta * 0.45;
    setAngle(next);
    setActive(((Math.round(-next / step) % count) + count) % count);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    const moved = drag.current.moved;
    drag.current = null;
    if (moved) setAngle(current => Math.round(current / step) * step);
    setPaused(false);
  };

  if (!count) return null;
  const current = items[active] || items[0];

  return (
    <div
      ref={rootRef}
      className={`circular-carousel ${className}`.trim()}
      style={{ '--cc-radius': `${Math.max(0, cornerRadius)}px`, '--cc-fade': fadeColor }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrossel de tecnologias"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') focusIndex((active + 1) % count);
        if (event.key === 'ArrowLeft') focusIndex((active - 1 + count) % count);
      }}
    >
      <div className="circular-carousel__scene">
        <div className="circular-carousel__ring" style={{ transform: `translateZ(${-radius}px) rotateY(${angle}deg)` }}>
          {items.map((item, index) => {
            const rotation = index * step;
            return (
              <button
                className={`circular-carousel__card ${index === active ? 'is-active' : ''}`}
                key={item.title || item.src || index}
                type="button"
                aria-label={`Mostrar ${item.title || item.alt || `tecnologia ${index + 1}`}`}
                onClick={() => {
                  if (focusOnClick) focusIndex(index);
                }}
                style={{
                  width: cardWidth,
                  height: cardWidth / aspectRatio,
                  borderRadius: cornerRadius,
                  transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
                  '--cc-index': index
                }}
              >
                <span className="circular-carousel__logo-wrap">
                  <img src={item.src} alt={item.alt || ''} loading="lazy" decoding="async" draggable="false" />
                </span>
                {captions && <span className="circular-carousel__card-title">{item.title}</span>}
                {captions && item.subtitle && <span className="circular-carousel__card-subtitle">{item.subtitle}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {captions && current && (
        <div className="circular-carousel__caption" aria-live="polite">
          <span>{current.title || current.alt}</span>
          <span className="circular-carousel__count">{String(active + 1).padStart(2, '0')} <i>/</i> {String(count).padStart(2, '0')}</span>
        </div>
      )}
    </div>
  );
};

export default CircularCarousel;
