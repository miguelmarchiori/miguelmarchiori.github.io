import { useEffect, useRef } from 'react';
import './ParticleText.css';

const rgb = hex => {
  const value = String(hex).replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(value)) return null;
  return { r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16) };
};
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

export default function ParticleText({
  text = 'React Bits',
  particleSize = 2,
  density = 5,
  color = '#fff',
  highlightColor = '#8b5cf6',
  scatter = 140,
  pointerRepel = 28,
  repelRadius = 110,
  idleDrift = 0.35,
  fontSize = 'clamp(3rem,12vw,8rem)',
  fontWeight = 800,
  fontFamily = 'inherit',
  glow = false,
  fps = 30,
  className = '',
  style = {}
}) {
  const ref = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const box = ref.current;
    const c = canvas.current;
    if (!box || !c) return undefined;
    const ctx = c.getContext('2d');
    if (!ctx) return undefined;

    let parts = [];
    let raf = 0;
    let rebuildRaf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let visible = true;
    let reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    let pointer = { active: false, x: 0, y: 0 };
    let lastDraw = 0;

    const rebuild = () => {
      w = Math.floor(box.clientWidth);
      h = Math.floor(box.clientHeight);
      if (w <= 0 || h <= 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement('canvas');
      const o = off.getContext('2d');
      if (!o) return;
      const computed = getComputedStyle(box);
      const family = fontFamily === 'inherit' ? computed.fontFamily : fontFamily;
      let size = typeof fontSize === 'number' ? fontSize : 96;
      if (typeof fontSize !== 'number') {
        const probe = document.createElement('span');
        probe.textContent = 'M';
        probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;font-size:${fontSize};font-weight:${fontWeight};font-family:${family}`;
        box.appendChild(probe);
        size = parseFloat(getComputedStyle(probe).fontSize) || 96;
        probe.remove();
      }

      o.font = `${fontWeight} ${size}px ${family}`;
      let metrics = o.measureText(text);
      if (metrics.width > w * 0.96) {
        size = Math.max(18, size * (w * 0.96 / metrics.width));
        o.font = `${fontWeight} ${size}px ${family}`;
        metrics = o.measureText(text);
      }

      const pad = Math.max(10, size * 0.06);
      off.width = Math.ceil(metrics.width + pad * 2);
      off.height = Math.ceil(size * 1.3 + pad * 2);
      o.font = `${fontWeight} ${size}px ${family}`;
      o.fillStyle = '#fff';
      o.textBaseline = 'alphabetic';
      o.fillText(text, pad, pad + size);
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const targets = [];
      const step = Math.max(3, Math.floor(density));
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 40) targets.push({ x: w / 2 - off.width / 2 + x, y: h / 2 - off.height / 2 + y });
        }
      }

      const maxParticles = Math.min(1500, Math.max(320, Math.floor((w * h) / 150)));
      const stride = Math.max(1, Math.ceil(targets.length / maxParticles));
      const base = rgb(color);
      const hi = rgb(highlightColor);
      parts = targets.filter((_, i) => i % stride === 0).map((target, i) => {
        const seed = Math.abs((Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1);
        const depth = 0.5 + seed;
        const distance = reduced ? 0 : scatter * (0.35 + depth * 0.65);
        const blend = clamp(target.x / Math.max(1, w) + (seed - 0.5) * 0.2, 0, 1);
        const col = base && hi
          ? `rgb(${Math.round(base.r + (hi.r - base.r) * blend)}, ${Math.round(base.g + (hi.g - base.g) * blend)}, ${Math.round(base.b + (hi.b - base.b) * blend)})`
          : color;
        return {
          tx: target.x,
          ty: target.y,
          x: reduced ? target.x : target.x + Math.cos(i) * distance,
          y: reduced ? target.y : target.y + Math.sin(i) * distance,
          seed,
          depth,
          color: col
        };
      });
    };

    const draw = now => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (!reduced && now - lastDraw < 1000 / Math.max(1, fps)) return;
      lastDraw = now;
      ctx.clearRect(0, 0, w, h);
      ctx.shadowBlur = glow && !reduced ? particleSize * 2 : 0;
      ctx.shadowColor = highlightColor;

      for (const p of parts) {
        let x = p.tx;
        let y = p.ty;
        if (!reduced && idleDrift > 0) {
          x += Math.sin(now * 0.001 + p.seed * 10) * idleDrift * p.depth;
          y += Math.cos(now * 0.0008 + p.seed * 8) * idleDrift * p.depth;
        }
        if (pointer.active && !reduced) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < repelRadius) {
            const force = Math.pow(1 - dist / repelRadius, 2) * pointerRepel;
            x += dx / dist * force;
            y += dy / dist * force;
          }
        }
        ctx.fillStyle = p.color;
        ctx.fillRect(x - particleSize / 2, y - particleSize / 2, particleSize, particleSize);
      }
      ctx.shadowBlur = 0;
    };

    const queueRebuild = () => {
      cancelAnimationFrame(rebuildRaf);
      rebuildRaf = requestAnimationFrame(rebuild);
    };
    const move = event => {
      const rect = c.getBoundingClientRect();
      pointer.active = true;
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const leave = () => { pointer.active = false; };
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onMotion = event => { reduced = event.matches; queueRebuild(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.01 });
    observer.observe(box);
    const resize = new ResizeObserver(queueRebuild);
    resize.observe(box);
    c.addEventListener('pointermove', move, { passive: true });
    c.addEventListener('pointerleave', leave, { passive: true });
    media?.addEventListener('change', onMotion);
    rebuild();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rebuildRaf);
      observer.disconnect();
      resize.disconnect();
      c.removeEventListener('pointermove', move);
      c.removeEventListener('pointerleave', leave);
      media?.removeEventListener('change', onMotion);
    };
  }, [text, particleSize, density, color, highlightColor, scatter, pointerRepel, repelRadius, idleDrift, fontSize, fontWeight, fontFamily, glow, fps]);

  return <div ref={ref} className={`particle-text ${className}`} style={style} aria-label={text}><canvas ref={canvas} className="particle-text__canvas" /></div>;
}
