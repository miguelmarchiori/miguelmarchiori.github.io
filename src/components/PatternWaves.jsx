import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './PatternWaves.css';

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform float uSpacing;
uniform float uOpacity;
uniform float uSpeed;
uniform float uDepth;
out vec4 outColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
  float t = uTime * uSpeed;
  float waveA = sin(p.x * 5.0 + p.y * 2.8 + t) * 0.055;
  float waveB = sin(p.x * 2.2 - p.y * 5.0 - t * 0.72) * 0.045;
  float waveC = sin((p.x + p.y) * 4.0 + t * 0.45) * 0.025;
  float h = (waveA + waveB + waveC) * uDepth;
  vec2 grid = gl_FragCoord.xy / uSpacing;
  vec2 cell = fract(grid) - 0.5;
  float displacement = h * 28.0;
  cell.y += displacement / uSpacing;
  float radius = 0.20 + 0.22 * (0.5 + 0.5 * sin(h * 25.0));
  float dotShape = 1.0 - smoothstep(radius - 0.07, radius + 0.07, length(cell));
  float highlight = clamp(0.42 + h * 5.5 + cos(p.x * 4.0 + t) * 0.12, 0.12, 0.9);
  float edgeFade = smoothstep(0.0, 0.18, uv.x) * (1.0 - smoothstep(0.82, 1.0, uv.x));
  edgeFade *= smoothstep(0.0, 0.12, uv.y) * (1.0 - smoothstep(0.86, 1.0, uv.y));
  float alpha = dotShape * highlight * uOpacity * edgeFade;
  outColor = vec4(uColor, alpha);
}
`;

export default function PatternWaves({
  color = '#7199cb',
  spacing = 10,
  opacity = 0.28,
  speed = 0.28,
  depth = 1,
  className = '',
  style
}) {
  const host = useRef(null);

  useEffect(() => {
    const container = host.current;
    if (!container) return undefined;
    let renderer;
    let frame = 0;
    let alive = true;
    let width = 1;
    let height = 1;
    let startTime = performance.now();

    try {
      renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) });
    } catch {
      return undefined;
    }
    const gl = renderer.gl;
    if (!renderer.isWebgl2) {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return undefined;
    }
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'display:block;width:100%;height:100%;';
    container.appendChild(canvas);

    const parseHex = value => {
      const match = /^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(value);
      return match ? match.slice(1).map(part => parseInt(part, 16) / 255) : [0.44, 0.6, 0.8];
    };
    const uniforms = {
      uResolution: { value: [1, 1] },
      uTime: { value: 0 },
      uColor: { value: parseHex(color) },
      uSpacing: { value: spacing },
      uOpacity: { value: opacity },
      uSpeed: { value: speed },
      uDepth: { value: depth }
    };
    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, { vertex, fragment, uniforms, transparent: true, depthTest: false, depthWrite: false })
    });

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height);
      uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const draw = now => {
      if (!alive) return;
      uniforms.uTime.value = (now - startTime) / 1000;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(draw);
    };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) frame = requestAnimationFrame(draw);
    else renderer.render({ scene: mesh });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    };
  }, [color, spacing, opacity, speed, depth]);

  return <div ref={host} className={`pattern-waves ${className}`.trim()} style={style} aria-hidden="true" />;
}
