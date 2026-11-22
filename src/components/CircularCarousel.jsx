import { memo, useEffect, useMemo, useRef, useState } from 'react';
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
  const angleRef = useRef(0);
  const ringRef = useRef(null);
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);
  const drag = useRef(null);
  const count = items.length;
  const step = 360 / Math.max(count, 1);
  const radius = useMemo(() => Math.max(150, (cardWidth + gap) / (2 * Math.tan(Math.PI / Math.max(count, 3)))), [cardWidth, gap, count]);

  const applyAngle = next => {
    angleRef.current = next;
    if (ringRef.current) ringRef.current.style.transform = `translateZ(${-radius}px) rotateY(${next}deg)`;
  };

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return undefined;
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener?.('change', sync);
    return () => query.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (autoplay !== 'drift' || paused || !isVisible || reducedMotion || count < 2) return undefined;
    let frame = 0;
    let last = 0;
    const tick = now => {
      if (last) {
        const delta = Math.min((now - last) / 1000, 0.05);
        const next = angleRef.current + (direction === 'right' ? 1 : -1) * speed * delta;
        applyAngle(next);
        const index = ((Math.round(-next / step) % count) + count) % count;
        setActive(current => current === index ? current : index);
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, paused, count, direction, speed, step, isVisible, reducedMotion, radius]);

  const focusIndex = index => {
    const target = -index * step;
    const current = angleRef.current;
    const normalized = current + ((((target - current) % 360) + 540) % 360) - 180;
    applyAngle(normalized);
    setActive(index);
  };

  const onPointerDown = event => {
    if (!draggable || event.button !== 0) return;
    drag.current = { x: event.clientX, angle: angleRef.current, moved: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setPaused(true);
  };
  const onPointerMove = event => {
    if (!drag.current) return;
    const delta = event.clientX - drag.current.x;
    if (Math.abs(delta) > 3) drag.current.moved = true;
    const next = drag.current.angle + delta * 0.45;
    applyAngle(next);
    const index = ((Math.round(-next / step) % count) + count) % count;
    setActive(current => current === index ? current : index);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    const moved = drag.current.moved;
    drag.current = null;
    if (moved) applyAngle(Math.round(angleRef.current / step) * step);
    setPaused(false);
  };

  if (!count) return null;
  const current = items[active] || items[0];
  const descriptions = {
    Python: 'Uma linguagem versátil e legível, muito usada em automação, lógica de programação, análise de dados e robótica.',
    HTML5: 'Define a estrutura e o conteúdo das páginas web, organizando textos, imagens, links e componentes.',
    CSS3: 'Controla a aparência dos sites: cores, layouts, animações e adaptação para celulares e computadores.',
    PHP: 'Linguagem voltada ao desenvolvimento web no servidor, usada para criar páginas dinâmicas e conectar sistemas a bancos de dados.',
    Java: 'Linguagem orientada a objetos usada em aplicações, sistemas e programação de robôs, incluindo projetos de FTC.',
    Git: 'Ferramenta de controle de versão que registra alterações no código e facilita o trabalho em equipe.',
    GitHub: 'Plataforma para hospedar repositórios Git, colaborar em projetos e acompanhar o histórico do desenvolvimento.',
    'LEGO SPIKE': 'Plataforma de robótica educacional com hub, motores e sensores, usada para construir e programar robôs.'
  };
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
        <div ref={ringRef} className="circular-carousel__ring" style={{ transform: `translateZ(${-radius}px) rotateY(${angleRef.current}deg)` }}>
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
                  marginLeft: -cardWidth / 2,
                  marginTop: -(cardWidth / aspectRatio) / 2,
                  borderRadius: cornerRadius,
                  transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
                  '--cc-index': index
                }}
              >
                <span className="circular-carousel__logo-wrap">
                  <img src={item.src} alt={item.alt || ''} loading="lazy" decoding="async" draggable="false" />
                </span>
                {captions && <span className="circular-carousel__card-title">{item.title}</span>}
              </button>
            );
          })}
        </div>
      </div>
      <aside className="circular-carousel__details" aria-live="polite">
        <span className="circular-carousel__details-kicker">TECNOLOGIA SELECIONADA</span>
        <h3>{current.title || current.alt}</h3>
        <p>{descriptions[current.title] || current.subtitle || 'Tecnologia utilizada nos meus projetos.'}</p>
      </aside>
    </div>
  );
};

export default memo(CircularCarousel);
