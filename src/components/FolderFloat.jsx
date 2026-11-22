import { useEffect, useMemo, useRef, useState } from 'react';
import './FolderFloat.css';

export default function FolderFloat({
  items = ['Frontend', 'Backend', 'UI / UX', 'APIs'],
  label = 'STACK',
  sublabel = '',
  trigger = 'hover',
  physics = true,
  drift = 0.5,
  folderColor = '#dce8f6',
  frontColor = '#c5d9f0',
  paperColor = '#fffdf9',
  itemColor = '#fffdf9',
  itemTextColor = '#364c68',
  labelColor = '#304560',
  width = 230,
  height = 160,
  radius = 18,
  className = ''
}) {
  const [open, setOpen] = useState(false);
  const pills = useRef([]);
  const list = useMemo(() => items.map(item => typeof item === 'string' ? { label: item, value: item } : item), [items]);

  useEffect(() => {
    if (!open || !physics || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let cancelled = false;
    let animationFrame = 0;
    let cleanupEngine = () => {};

    const startPhysics = async () => {
      try {
        const module = await import('matter-js');
        if (cancelled) return;
        const Matter = module.default ?? module;
        const { Engine, Bodies, Body, Composite } = Matter;
        const engine = Engine.create({ gravity: { x: 0, y: 0 } });
        engine.enableSleeping = false;
        const bodies = list.map((item, index) => Bodies.rectangle(
          (index % 3) * 82 - 80,
          -20 - Math.floor(index / 3) * 48,
          Math.min(150, 90 + item.label.length * 5),
          32,
          { frictionAir: 0.04, restitution: 0.6 }
        ));
        Composite.add(engine.world, bodies);

        let last = performance.now();
        const zone = { left: -160, right: 160, top: -170, bottom: 10 };
        const tick = now => {
          if (cancelled) return;
          const delta = Math.min(30, now - last);
          last = now;
          const time = now * 0.001;
          bodies.forEach((body, index) => {
            if (drift) Body.applyForce(body, body.position, {
              x: Math.sin(time * 0.9 + index) * 0.00003 * drift,
              y: Math.cos(time * 1.2 + index * 1.7) * 0.00003 * drift
            });
            Body.setPosition(body, {
              x: Math.min(zone.right, Math.max(zone.left, body.position.x)),
              y: Math.min(zone.bottom, Math.max(zone.top, body.position.y))
            });
            const element = pills.current[index];
            if (element) element.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle * 57.3}deg)`;
          });
          Engine.update(engine, delta);
          animationFrame = requestAnimationFrame(tick);
        };

        cleanupEngine = () => {
          cancelAnimationFrame(animationFrame);
          Composite.clear(engine.world, false, true);
          Engine.clear(engine);
        };
        animationFrame = requestAnimationFrame(tick);
      } catch {
        // The folder remains usable without the optional physics effect.
      }
    };

    startPhysics();
    return () => {
      cancelled = true;
      cleanupEngine();
    };
  }, [open, physics, drift, list]);

  const toggle = () => setOpen(value => !value);
  const style = {
    '--ff-w': `${width}px`,
    '--ff-h': `${height}px`,
    '--ff-r': `${radius}px`,
    '--ff-back': folderColor,
    '--ff-front': frontColor,
    '--ff-paper': paperColor,
    '--ff-item': itemColor,
    '--ff-ink': itemTextColor,
    '--ff-label': labelColor
  };

  return (
    <div
      className={`folder-float ${open ? 'is-open' : ''} ${className}`}
      style={style}
      onPointerEnter={trigger === 'hover' ? () => setOpen(true) : undefined}
      onPointerLeave={trigger === 'hover' ? () => setOpen(false) : undefined}
    >
      <div className="folder-float__cloud">
        {list.map((item, index) => (
          <button
            ref={element => { pills.current[index] = element; }}
            className="folder-float__item"
            key={item.value || item.label || index}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="folder-float__folder">
        <span className="folder-float__back" />
        <span className="folder-float__paper" />
        <div className="folder-float__front">
          <strong>{label}</strong>
          <small>{sublabel || `${list.length} tecnologias`}</small>
        </div>
        <button
          className="folder-float__trigger"
          onClick={toggle}
          aria-label={label}
          aria-expanded={open}
        />
      </div>
    </div>
  );
}
