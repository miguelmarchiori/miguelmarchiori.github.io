import { useRef } from 'react';
import './BorderGlow.css';

export default function BorderGlow({children,className='',edgeSensitivity=30,glowColor='190 85 72',backgroundColor='#11111a',borderRadius=28,glowRadius=40,glowIntensity=1,coneSpread=25,animated=false,colors=['#8b5cf6','#ec4899','#22d3ee'],fillOpacity=.5}){
 const ref=useRef(null);
 const move=e=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;const cx=r.width/2,cy=r.height/2;const dx=x-cx,dy=y-cy;const kx=dx?cx/Math.abs(dx):Infinity,ky=dy?cy/Math.abs(dy):Infinity;const edge=Math.min(Math.max(1/Math.min(kx,ky),0),1)*100;let angle=Math.atan2(dy,dx)*180/Math.PI+90;if(angle<0)angle+=360;el.style.setProperty('--edge',edge);el.style.setProperty('--angle',`${angle}deg`)};
 return <div ref={ref} onPointerMove={move} className={`border-glow-card ${animated?'is-animated ':''}${className}`} style={{'--radius':`${borderRadius}px`,'--glow-radius':`${glowRadius}px`,'--glow-intensity':glowIntensity,'--edge-sensitivity':edgeSensitivity,'--cone':`${coneSpread}%`,'--fill':fillOpacity,'--glow-color':`hsl(${glowColor})`,'--c1':colors[0],'--c2':colors[1],'--c3':colors[2],'--bg':backgroundColor}}><span className="edge-light"/><div className="border-glow-inner">{children}</div></div>
}
