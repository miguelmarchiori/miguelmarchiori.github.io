import { useEffect, useId, useRef, useState } from 'react';
import './GlassSurface.css';

const supportsSvgFilters = filterId => {
  if (typeof window === 'undefined') return false;
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  if (isSafari || isFirefox) return false;
  const probe = document.createElement('div');
  probe.style.backdropFilter = `url(#${filterId})`;
  return probe.style.backdropFilter !== '';
};

export default function GlassSurface({
  children,
  width = '100%',
  height = 'auto',
  borderRadius = 24,
  borderWidth = 0.07,
  brightness = 68,
  opacity = 0.88,
  blur = 9,
  displace = 0.8,
  backgroundOpacity = 0.34,
  saturation = 1.35,
  distortionScale = -44,
  redOffset = 0,
  greenOffset = 3,
  blueOffset = 6,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'screen',
  className = '',
  style = {}
}) {
  const id = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${id}`;
  const redGradId = `red-grad-${id}`;
  const blueGradId = `blue-grad-${id}`;
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const channels = [useRef(null), useRef(null), useRef(null)];
  const blurRef = useRef(null);
  const [svgSupported, setSvgSupported] = useState(false);

  useEffect(() => {
    setSvgSupported(supportsSvgFilters(filterId));
  }, [filterId]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const actualWidth = Math.max(1, rect.width);
      const actualHeight = Math.max(1, rect.height);
      const edge = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);
      const radius = Math.min(borderRadius, actualWidth / 2, actualHeight / 2);
      const svg = `<svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect width="100%" height="100%" fill="black"/><rect width="100%" height="100%" rx="${radius}" fill="url(#${redGradId})"/><rect width="100%" height="100%" rx="${radius}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/><rect x="${edge}" y="${edge}" width="${Math.max(0, actualWidth - edge * 2)}" height="${Math.max(0, actualHeight - edge * 2)}" rx="${Math.max(0, radius - edge)}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/></svg>`;

      imageRef.current?.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(svg)}`);
      [redOffset, greenOffset, blueOffset].forEach((offset, index) => {
        const channel = channels[index].current;
        channel?.setAttribute('scale', String(distortionScale + offset));
        channel?.setAttribute('xChannelSelector', xChannel);
        channel?.setAttribute('yChannelSelector', yChannel);
      });
      blurRef.current?.setAttribute('stdDeviation', String(displace));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [borderRadius, borderWidth, brightness, blur, displace, distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, mixBlendMode, opacity, redGradId, blueGradId]);

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={{
        ...style,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: `${borderRadius}px`,
        '--glass-frost': backgroundOpacity,
        '--glass-saturation': saturation,
        '--filter-id': `url(#${filterId})`
      }}
    >
      <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={imageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            <feDisplacementMap ref={channels[0]} in="SourceGraphic" in2="map" result="dispRed" />
            <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
            <feDisplacementMap ref={channels[1]} in="SourceGraphic" in2="map" result="dispGreen" />
            <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
            <feDisplacementMap ref={channels[2]} in="SourceGraphic" in2="map" result="dispBlue" />
            <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={blurRef} in="output" stdDeviation="0" />
          </filter>
        </defs>
      </svg>
      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
