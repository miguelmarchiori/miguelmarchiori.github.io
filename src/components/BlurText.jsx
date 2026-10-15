import { motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const directions = {
  top: { y: 24, x: 0 },
  bottom: { y: -24, x: 0 },
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 }
};

export default function BlurText({
  text = '',
  className = '',
  animateBy = 'letters',
  direction = 'top',
  staggerFrom = 'start',
  trigger = 'load',
  delay = 55,
  stepDuration = 0.45,
  blur = 10,
  distance = 24,
  color = 'currentColor',
  fromColor,
  onAnimationComplete
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(trigger === 'load');
  const pieces = useMemo(() => {
    if (animateBy === 'words') return text.split(' ').map((value, index, all) => ({ value: index < all.length - 1 ? value + '\u00a0' : value, key: `word-${index}` }));
    return Array.from(text).map((value, index) => ({ value, key: `letter-${index}` }));
  }, [text, animateBy]);

  useEffect(() => {
    if (trigger === 'load') {
      setActive(true);
      return undefined;
    }
    if (trigger !== 'view' || !ref.current || !('IntersectionObserver' in window)) {
      setActive(trigger !== 'hover' && trigger !== 'click');
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger]);

  const from = directions[direction] || directions.top;
  const rankFor = index => staggerFrom === 'end' ? pieces.length - 1 - index : staggerFrom === 'center' ? Math.abs(index - (pieces.length - 1) / 2) : index;

  return (
    <p ref={ref} className={className} aria-label={text} style={{ color, margin: 0 }}>
      {pieces.map((piece, index) => (
        <motion.span
          key={piece.key}
          aria-hidden="true"
          initial={{ opacity: 0, filter: `blur(${blur}px)`, x: from.x ? Math.sign(from.x) * distance : 0, y: from.y ? Math.sign(from.y) * distance : 0, color: fromColor || color }}
          animate={active ? { opacity: 1, filter: 'blur(0px)', x: 0, y: 0, color } : { opacity: 0, filter: `blur(${blur}px)`, x: from.x ? Math.sign(from.x) * distance : 0, y: from.y ? Math.sign(from.y) * distance : 0, color: fromColor || color }}
          transition={{ duration: stepDuration, delay: rankFor(index) * delay / 1000, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={index === pieces.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline-block', whiteSpace: piece.value === ' ' ? 'pre' : undefined, willChange: 'transform, filter, opacity' }}
        >
          {piece.value}
        </motion.span>
      ))}
    </p>
  );
}
