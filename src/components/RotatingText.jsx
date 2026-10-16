import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import './RotatingText.css';

const effects = {
  slide: { initial: { y: '100%', opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: '-100%', opacity: 0 } },
  flip: { initial: { rotateX: -90, opacity: 0 }, animate: { rotateX: 0, opacity: 1 }, exit: { rotateX: 90, opacity: 0 } },
  blur: { initial: { y: '35%', opacity: 0, filter: 'blur(8px)' }, animate: { y: 0, opacity: 1, filter: 'blur(0px)' }, exit: { y: '-35%', opacity: 0, filter: 'blur(8px)' } },
  scale: { initial: { scale: 0.7, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.7, opacity: 0 } },
  drop: { initial: { y: '-110%', opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: '110%', opacity: 0 } }
};

export default function RotatingText({
  texts = [],
  effect = 'slide',
  direction = 'up',
  highlight = false,
  highlightColor = '#a855f7',
  rotationInterval = 2000,
  staggerDuration = 0.025,
  staggerFrom = 'last',
  loop = true,
  auto = true,
  pauseOnHover = false,
  mainClassName = '',
  splitLevelClassName = '',
  elementLevelClassName = '',
  onNext
}) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const current = texts[index] ?? '';
  const preset = effects[effect] || effects.slide;
  const enter = { ...preset.initial };
  const leave = { ...preset.exit };
  if (effect !== 'drop' && direction === 'down') {
    if ('y' in enter) enter.y = typeof enter.y === 'string' ? (enter.y.startsWith('-') ? enter.y.slice(1) : '-' + enter.y) : -enter.y;
    if ('y' in leave) leave.y = typeof leave.y === 'string' ? (leave.y.startsWith('-') ? leave.y.slice(1) : '-' + leave.y) : -leave.y;
    if ('rotateX' in enter) enter.rotateX *= -1;
    if ('rotateX' in leave) leave.rotateX *= -1;
  }

  useEffect(() => {
    if (!auto || hovered || texts.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex(previous => {
        const next = previous < texts.length - 1 ? previous + 1 : loop ? 0 : previous;
        if (next !== previous) onNext?.(next);
        return next;
      });
    }, rotationInterval);
    return () => window.clearInterval(timer);
  }, [auto, hovered, loop, onNext, rotationInterval, texts.length]);

  const letters = Array.from(current);
  const textColor = highlight ? (['#fff', '#ffffff'].includes(highlightColor.toLowerCase()) ? '#111827' : '#ffffff') : 'inherit';

  return (
    <MotionConfig reducedMotion="user">
      <span
        className={`text-rotate-wrap ${highlight ? 'text-rotate-highlight' : ''} ${mainClassName}`}
        style={highlight ? { backgroundColor: highlightColor, color: textColor } : undefined}
        onMouseEnter={() => pauseOnHover && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={current}
      >
        <span className="text-rotate-sr-only">{current}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span className="text-rotate" key={index} aria-hidden="true">
            {letters.map((letter, letterIndex) => {
              const delayIndex = staggerFrom === 'first'
                ? letterIndex
                : staggerFrom === 'center'
                  ? Math.abs(Math.floor(letters.length / 2) - letterIndex)
                  : letters.length - 1 - letterIndex;
              return (
                <motion.span
                  key={`${index}-${letterIndex}`}
                  className={`text-rotate-element ${elementLevelClassName}`}
                  initial={reduceMotion ? false : enter}
                  animate={preset.animate}
                  exit={reduceMotion ? undefined : leave}
                  transition={{ type: effect === 'flip' ? 'tween' : 'spring', duration: effect === 'flip' ? 0.45 : 0.48, damping: 24, stiffness: 280, delay: reduceMotion ? 0 : delayIndex * staggerDuration }}
                >
                  {letter === ' ' ? '\u00a0' : letter}
                </motion.span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </span>
    </MotionConfig>
  );
}
