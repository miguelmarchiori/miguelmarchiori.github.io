import { useEffect, useRef, useState } from 'react';
import Carousel from './Carousel';
import './RoboticsShowcase.css';

const PHOTO_SECONDS = 5;
const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const PlayIcon = () => <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>;
const SoundIcon = ({ off }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M4 9.5h3.6L12 6v12l-4.4-3.5H4z" fill="currentColor" />
    {off ? <path d="M15.5 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M15.2 9.2a4 4 0 010 5.6M17.8 6.8a7.4 7.4 0 010 10.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
  </svg>
);
const PauseIcon = () => <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z" fill="currentColor" /></svg>;

function Slide({ slide, active, playing, muted, onEnded, onTime, onPick, onToggle }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = muted;
  }, [muted]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && playing) {
      // Se o navegador bloquear o início automático, a rotação segue para o próximo item.
      video.play().catch(error => { if (error?.name === 'NotAllowedError') onEnded(); });
    } else video.pause();
    if (!active) video.currentTime = 0;
  }, [active, playing]);

  const className = `rb-view__slide${active ? ' is-on' : ''}`;
  if (slide.type === 'video') {
    return (
      <div className={`${className}${slide.fit === 'contain' ? ' is-contain' : ''}`} style={slide.bg ? { background: slide.bg } : undefined} aria-hidden={!active}>
        <video ref={videoRef} src={slide.src} poster={slide.poster} muted playsInline preload="metadata" aria-label={slide.alt} onClick={onToggle} onEnded={onEnded} onTimeUpdate={event => onTime(event.currentTarget.currentTime / (event.currentTarget.duration || 1))} />
        {slide.label && <span className="rb-view__tag"><svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg> {slide.label}</span>}
      </div>
    );
  }
  if (slide.type === 'youtube') {
    return (
      <div className={className} aria-hidden={!active}>
        {active && slide.open ? (
          <iframe src={`https://www.youtube-nocookie.com/embed/${slide.id}?autoplay=1&rel=0`} title={slide.alt} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button type="button" className="rb-view__playcover" onClick={() => onPick(slide)} aria-label={`Tocar vídeo: ${slide.alt}`}>
            <img src={slide.poster} alt="" style={{ objectPosition: slide.pos }} />
            <span className="rb-view__disc"><PlayIcon /></span>
          </button>
        )}
      </div>
    );
  }
  if (slide.type === 'link') {
    return (
      <div className={className} aria-hidden={!active}>
        <a className="rb-view__playcover" href={slide.href} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1} aria-label={`${slide.label} (abre em outra aba)`}>
          <img src={slide.poster} alt="" style={{ objectPosition: slide.pos }} />
          <span className="rb-view__disc"><PlayIcon /></span>
          <span className="rb-view__tag">{slide.label}</span>
        </a>
      </div>
    );
  }
  return (
    <div className={`${className}${slide.fit === 'contain' ? ' is-contain' : ''}`} style={slide.bg ? { background: slide.bg } : undefined} aria-hidden={!active}>
      <img src={slide.src} alt={slide.alt} style={{ objectPosition: slide.pos }} loading="lazy" decoding="async" />
    </div>
  );
}

function Viewer({ team }) {
  const slides = team.slides;
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(() => prefersReducedMotion());
  const [hover, setHover] = useState(false);
  const [muted, setMuted] = useState(true);
  const [onScreen, setOnScreen] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [opened, setOpened] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    setIndex(0); setExpanded(false); setOpened(null); setVideoProgress(0);
  }, [team.id]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const count = slides.length;
  const current = slides[index];
  const watchingVideo = current?.type === 'video';
  const playing = !userPaused && (!hover || watchingVideo) && onScreen && !opened;
  const go = to => { setVideoProgress(0); setOpened(null); setIndex(((to % count) + count) % count); };
  const next = () => go(index + 1);

  return (
    <div className="rb-view" ref={rootRef} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {count > 1 && (
        <div className="rb-view__bars">
          {slides.map((slide, position) => {
            const isVideo = slide.type === 'video';
            const state = position < index ? 'is-done' : position === index ? 'is-now' : '';
            return (
              <button key={`${team.id}-${position}`} type="button" className={`rb-view__bar ${state}`} aria-label={`Ir para o item ${position + 1} de ${count}`} aria-current={position === index ? 'true' : undefined} onClick={() => go(position)}>
                <i>
                  {position === index && (
                    <b
                      key={`${team.id}-${index}`}
                      className={isVideo ? 'is-video' : `is-timed${playing ? '' : ' is-held'}`}
                      style={isVideo ? { width: `${videoProgress * 100}%` } : { animationDuration: `${PHOTO_SECONDS}s` }}
                      onAnimationEnd={isVideo ? undefined : next}
                    />
                  )}
                </i>
              </button>
            );
          })}
        </div>
      )}

      <div className="rb-view__media">
        {count === 0 ? (
          <div className="rb-view__empty" style={{ '--rb-tone': team.tone }}>
            <img src={team.logo} alt={team.logoAlt} />
            <p>As fotos e os vídeos da equipe entram aqui.</p>
          </div>
        ) : (
          slides.map((slide, position) => (
            <Slide
              key={`${team.id}-${position}`}
              slide={opened && position === index ? { ...slide, open: true } : slide}
              active={position === index}
              playing={playing}
              muted={muted}
              onToggle={() => setUserPaused(value => !value)}
              onEnded={next}
              onTime={setVideoProgress}
              onPick={() => setOpened(slide.id ?? position)}
            />
          ))
        )}
        {count > 1 && (
          <div className="rb-view__controls">
            {watchingVideo && <button type="button" onClick={() => setMuted(value => !value)} aria-label={muted ? 'Ligar o som' : 'Desligar o som'}><SoundIcon off={muted} /></button>}
            <button type="button" onClick={() => setUserPaused(value => !value)} aria-label={userPaused ? 'Tocar' : 'Pausar'}>{userPaused ? <PlayIcon /> : <PauseIcon />}</button>
            <button type="button" onClick={next} aria-label="Próximo item">›</button>
          </div>
        )}
      </div>

      <div className="rb-view__info">
        <p className="rb-view__name"><strong>{team.short}</strong> · {team.name}</p>
        <p className="rb-view__intro">{team.intro}</p>
        <button type="button" className="rb-view__more" aria-expanded={expanded} aria-controls={`rb-more-${team.id}`} onClick={() => setExpanded(value => !value)}>
          {expanded ? 'Fechar' : 'Ver como funciona e o que faço'}
        </button>
        <div id={`rb-more-${team.id}`} className="rb-view__extra" hidden={!expanded}>
          <h3>Como funciona</h3>
          <p>{team.how}</p>
          <h3>O que faço</h3>
          <p>{team.role}</p>
          {team.result && <p className="rb-view__result">{team.result}</p>}
          <div className="rb-view__links">
            {team.links.map(link => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
      {current?.type === 'link' && <span className="rb-view__sr" aria-live="polite">Vídeo no Instagram</span>}
    </div>
  );
}

export default function RoboticsShowcase({ teams, theme = 'dark', onTeamChange }) {
  const [active, setActive] = useState(0);
  const items = teams.map(team => ({ id: team.id, title: team.short, image: team.logo, alt: team.logoAlt, eyebrow: team.cardLabel, description: team.cardText }));

  useEffect(() => { onTeamChange?.(active); }, [active, onTeamChange]);

  return (
    <div className="rb-show">
      <div className="rb-show__cars">
        <Carousel
          className="robotics-experience-carousel"
          items={items}
          baseWidth={300}
          aspectRatio={0.78}
          gap={18}
          radius={24}
          effect="tilt"
          indicator="dots"
          arrows={true}
          loop={true}
          theme={theme}
          onActiveChange={setActive}
        />
      </div>
      <Viewer team={teams[active]} />
    </div>
  );
}
