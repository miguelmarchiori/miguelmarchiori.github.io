import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Component, useEffect, useMemo, useRef, useState } from 'react';

function LiquidObject({ color = '#12070a' }) {
  const ref = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const handleMove = event => {
      pointerRef.current = {
        x: (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1,
        y: -((event.clientY / Math.max(1, window.innerHeight)) * 2 - 1)
      };
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { x, y } = pointerRef.current;
    target.set(x * viewport.width * 0.18, y * viewport.height * 0.12, 0);
    ref.current.position.lerp(target, 1 - Math.exp(-delta * 4));
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.24;
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, x * 0.22, 0.06);
  });

  return (
    <mesh ref={ref} scale={[4.4, 4.4, 4.4]} rotation={[0.35, 0.2, -0.1]}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshTransmissionMaterial
        backside
        samples={2}
        resolution={256}
        transmission={1}
        thickness={1.8}
        roughness={0.05}
        ior={1.16}
        chromaticAberration={0.035}
        anisotropy={0.06}
        distortion={0.12}
        distortionScale={0.35}
        temporalDistortion={0.1}
        color={color}
      />
    </mesh>
  );
}

class FluidGlassBoundary extends Component {
  state = { crashed: false };
  static getDerivedStateFromError() { return { crashed: true }; }
  componentDidCatch() {}
  render() { return this.state.crashed ? null : this.props.children; }
}

export default function FluidGlass({ className = '', backgroundColor = '#07070b' }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 820 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(window.innerWidth > 820 && !reduce.matches);
    sync();
    window.addEventListener('resize', sync, { passive: true });
    reduce.addEventListener?.('change', sync);
    return () => {
      window.removeEventListener('resize', sync);
      reduce.removeEventListener?.('change', sync);
    };
  }, []);

  if (!enabled) return null;

  return (
    <FluidGlassBoundary>
      <div className={`fluid-glass ${className}`} aria-hidden="true" style={{ '--fluid-bg': backgroundColor }}>
        <Canvas
          dpr={[1, 1.25]}
          frameloop="always"
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 12], fov: 32 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.45} />
          <pointLight position={[4, 3, 6]} intensity={26} color="#ff3048" distance={16} />
          <pointLight position={[-4, -2, 4]} intensity={10} color="#8a0e1b" distance={14} />
          <LiquidObject />
        </Canvas>
      </div>
    </FluidGlassBoundary>
  );
}
