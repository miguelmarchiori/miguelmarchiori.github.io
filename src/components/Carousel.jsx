import { useState } from 'react';
import './Carousel.css';

const wrap = (index, count) => ((index % count) + count) % count;

export default function Carousel({
  items = [],
  baseWidth = 340,
  aspectRatio = 1.15,
  gap = 18,
  radius = 22,
  effect = 'tilt',
  indicator = 'dots',
  arrows = true,
  loop = true,
  initialIndex = 0,
  theme = 'dark',
  className = '',
  style
}) {
  const [active, setActive] = useState(() => Math.max(0, Math.min(initialIndex, items.length - 1)));
  const [dragStart, setDragStart] = useState(null);
  const cardWidth = typeof baseWidth === 'number' ? baseWidth : (parseFloat(baseWidth) || 340);
  if (!items.length) return null;

  const go = direction => {
    setActive(current => {
      const next = current + direction;
      return loop ? wrap(next, items.length) : Math.max(0, Math.min(next, items.length - 1));
    });
  };
  const distanceFrom = index => {
    let distance = index - active;
    if (loop && items.length > 1) {
      if (distance > items.length / 2) distance -= items.length;
      if (distance < -items.length / 2) distance += items.length;
    }
    return distance;
  };

  return (
    <div
      className={`rb-carousel rb-carousel--${theme} rb-carousel--${effect} ${className}`}
      style={{ '--rb-card-width': typeof baseWidth === 'number' ? `${baseWidth}px` : baseWidth, '--rb-card-height-ratio': 1 / aspectRatio, '--rb-gap': `${gap}px`, '--rb-radius': `${radius}px`, ...style }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Experiências em robótica"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') go(-1);
        if (event.key === 'ArrowRight') go(1);
      }}
    >
      <div
        className="rb-carousel__stage"
        onPointerDown={event => setDragStart({ x: event.clientX, y: event.clientY })}
        onPointerUp={event => {
          if (dragStart && Math.abs(event.clientX - dragStart.x) > 45 && Math.abs(event.clientX - dragStart.x) > Math.abs(event.clientY - dragStart.y)) {
            go(event.clientX < dragStart.x ? 1 : -1);
          }
          setDragStart(null);
        }}
        onPointerCancel={() => setDragStart(null)}
      >
        {items.map((item, index) => {
          const distance = distanceFrom(index);
          const visible = Math.abs(distance) <= 1;
          return (
            <button
              type="button"
              className={`rb-carousel__slide rb-carousel__slide--${String(item.id ?? '').toLowerCase()}${index === active ? ' is-active' : ''}`}
              key={item.id ?? item.title ?? index}
              aria-label={`Mostrar ${item.title}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => setActive(index)}
              style={{
                '--rb-distance': distance,
                '--rb-order': 10 - Math.abs(distance),
                '--rb-card-radius': `${radius}px`,
                zIndex: 10 - Math.abs(distance),
                opacity: visible ? (Math.abs(distance) === 0 ? 1 : 0.56) : 0,
                visibility: visible ? 'visible' : 'hidden',
                pointerEvents: visible ? 'auto' : 'none',
                transform: `translateX(calc(-50% + ${distance * (cardWidth * .68 + gap)}px)) scale(${distance === 0 ? 1 : .86}) rotateY(${effect === 'tilt' ? distance * -13 : 0}deg)`
              }}
            >
              <span className="rb-carousel__image-wrap">
                {item.image && <img src={item.image} alt={item.alt ?? ''} loading="lazy" decoding="async" draggable="false" />}
                <span className="rb-carousel__scrim" />
              </span>
              <span className="rb-carousel__content">
                {item.eyebrow && <span className="rb-carousel__eyebrow">{item.eyebrow}</span>}
                <span className="rb-carousel__title">{item.title}</span>
                {item.description && <span className="rb-carousel__description">{item.description}</span>}
              </span>
              <span className="rb-carousel__rim" />
            </button>
          );
        })}
      </div>
      {(arrows || indicator !== 'none') && (
        <div className="rb-carousel__controls">
          {arrows && <button className="rb-carousel__arrow" type="button" aria-label="Anterior" onClick={() => go(-1)}>‹</button>}
          {indicator === 'dots' && <div className="rb-carousel__dots">
            {items.map((item, index) => <button key={item.id ?? item.title ?? index} type="button" className={`rb-carousel__dot${index === active ? ' is-active' : ''}`} aria-label={`Ir para ${item.title}`} aria-current={index === active ? 'true' : undefined} onClick={() => setActive(index)} />)}
          </div>}
          {arrows && <button className="rb-carousel__arrow" type="button" aria-label="Próximo" onClick={() => go(1)}>›</button>}
        </div>
      )}
    </div>
  );
}
