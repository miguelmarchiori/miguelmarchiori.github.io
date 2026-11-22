import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import './GhostFibers.css';

const hexToRgb = hex => {
  const value = String(hex).trim().replace(/^#/, '');
  const normalized = value.length === 3 ? value.replace(/./g, c => c + c) : value;
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!match) return [1, 1, 1];
  return match.slice(1).map(v => parseInt(v, 16) / 255);
};

const vertex = `#version 300 es
in vec2 position;
void main(){ gl_Position = vec4(position,0.0,1.0); }
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 uResolution; uniform float uTime; uniform float uSpeed; uniform float uScale;
uniform float uRotation; uniform float uRotationSpeed; uniform float uLayers; uniform float uWaveAmplitude;
uniform float uWaveFrequency; uniform float uWaveSpeed; uniform float uLayerSpeed; uniform float uTwist;
uniform float uTwistFrequency; uniform float uTwistSpeed; uniform float uLineFrequency; uniform float uLineSpacing;
uniform float uLineSharpness; uniform float uGlowFalloff; uniform float uGlowIntensity; uniform float uBrightness;
uniform float uBlueBoost; uniform float uVignette; uniform float uGrain; uniform vec3 uLineColor; uniform vec3 uGlowColor;
out vec4 fragColor;
#define MAX_LAYERS 10
mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
float hash(vec2 p){p=floor(p);return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 res=max(uResolution,vec2(1.)); vec2 uv=(2.*gl_FragCoord.xy-res)/res.y; float t=uTime*uSpeed;
 vec2 p=rot(radians(uRotation)+t*uRotationSpeed)*uv/max(uScale,.05); vec3 color=vec3(0.);
 for(int i=0;i<MAX_LAYERS;i++){float f=float(i)+1.; if(f>uLayers) break;
   p += uWaveAmplitude*sin(p.yx*f*uWaveFrequency+t*(uWaveSpeed+f*uLayerSpeed));
   float r=length(p); float a=atan(p.y,p.x); a += sin(r*uTwistFrequency-t*uTwistSpeed+f)*uTwist; p=vec2(cos(a),sin(a))*r;
   float line=abs(sin(p.x*(uLineFrequency+f*uLineSpacing)+sin(p.y*3.+t))); line=pow(max(0.,1.-line),uLineSharpness);
   color += uLineColor*line/f; float glow=exp(-uGlowFalloff*abs(sin(p.x*3.+t+f))); color += uGlowColor*glow*uGlowIntensity/(f*2.);
 }
 float center=exp(-2.2*dot(uv,uv)); float cloud=exp(-1.5*length(uv+vec2(sin(t*.3)*.25,cos(t*.25)*.18)));
 color += (uLineColor*.85567-uGlowColor*.06186)*center; color += (uLineColor*.19588+uGlowColor*.2268)*cloud;
 float vig=1.-smoothstep(.35,1.45,length(uv)); color*=mix(1.-uVignette,1.,vig); color=1.-exp(-max(color,vec3(0.))*uBrightness); color.b*=uBlueBoost;
 float noise=(hash(gl_FragCoord.xy+uTime*60.)-.5)*uGrain; fragColor=vec4(clamp(color+noise,0.,1.),1.);
}`;

export default function GhostFibers({
  lineColor = '#181020', glowColor = '#7c3aed', speed = .2, scale = 2,
  rotation = 0, rotationSpeed = .25, layers = 4, waveAmplitude = .015, waveFrequency = 3,
  waveSpeed = .15, layerSpeed = .08, twist = .1, twistFrequency = 5, twistSpeed = 1.2,
  lineFrequency = 5, lineSpacing = 2, lineSharpness = 16, glowFalloff = 10, glowIntensity = 1.6,
  brightness = 2, blueBoost = 1.25, vignette = .8, grain = .05, dpr = 1, fps = 60, paused = false, className = ''
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let renderer;
    try {
      renderer = new Renderer({ webgl: 2, antialias: false, dpr: Math.min(Math.max(dpr, .5), 1.5) });
    } catch (error) {
      el.classList.add('ghost-fibers-fallback');
      return undefined;
    }
    const gl = renderer.gl;
    if (!gl) {
      el.classList.add('ghost-fibers-fallback');
      return undefined;
    }
    const canvas = gl.canvas;
    Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block' });
    canvas.setAttribute('aria-hidden', 'true');
    el.appendChild(canvas);

    const geometry = new Triangle(gl);
    const uniforms = {
      uResolution: { value: new Float32Array([1, 1]) }, uTime: { value: 0 }, uSpeed: { value: speed }, uScale: { value: scale },
      uRotation: { value: rotation }, uRotationSpeed: { value: rotationSpeed }, uLayers: { value: Math.min(10, Math.max(1, layers)) },
      uWaveAmplitude: { value: waveAmplitude }, uWaveFrequency: { value: waveFrequency }, uWaveSpeed: { value: waveSpeed }, uLayerSpeed: { value: layerSpeed },
      uTwist: { value: twist }, uTwistFrequency: { value: twistFrequency }, uTwistSpeed: { value: twistSpeed }, uLineFrequency: { value: lineFrequency },
      uLineSpacing: { value: lineSpacing }, uLineSharpness: { value: lineSharpness }, uGlowFalloff: { value: glowFalloff }, uGlowIntensity: { value: glowIntensity },
      uBrightness: { value: brightness }, uBlueBoost: { value: blueBoost }, uVignette: { value: vignette }, uGrain: { value: grain },
      uLineColor: { value: new Float32Array(hexToRgb(lineColor)) }, uGlowColor: { value: new Float32Array(hexToRgb(glowColor)) }
    };
    let program;
    let mesh;
    try {
      program = new Program(gl, { vertex, fragment, uniforms });
      mesh = new Mesh(gl, { geometry, program });
    } catch (error) {
      el.classList.add('ghost-fibers-fallback');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return undefined;
    }
    let raf = 0, last = performance.now(), elapsed = 0, lastDraw = 0, visible = true;

    const resize = () => {
      const rect = el.getBoundingClientRect();
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height));
      uniforms.uResolution.value[0] = gl.drawingBufferWidth;
      uniforms.uResolution.value[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };
    const frame = now => {
      raf = requestAnimationFrame(frame);
      if (paused || document.hidden || !visible) return;
      const delta = Math.min(.1, (now - last) / 1000);
      last = now;
      elapsed += delta;
      if (now - lastDraw < 1000 / Math.max(1, fps)) return;
      lastDraw = now;
      uniforms.uTime.value = elapsed;
      renderer.render({ scene: mesh });
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.01 });
    resizeObserver.observe(el);
    intersectionObserver.observe(el);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (canvas.parentNode === el) el.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [dpr, paused, speed, scale, rotation, rotationSpeed, layers, waveAmplitude, waveFrequency, waveSpeed, layerSpeed, twist, twistFrequency, twistSpeed, lineFrequency, lineSpacing, lineSharpness, glowFalloff, glowIntensity, brightness, blueBoost, vignette, grain, lineColor, glowColor, fps]);

  return <div ref={ref} className={`ghost-fibers-container ${className}`} />;
}
