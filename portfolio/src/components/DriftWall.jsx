import { useMemo } from 'react';
import './DriftWall.css';
export default function DriftWall({items=[],columns=5,tileWidth=180,tileHeight=110,gap=14,tilt=13,turn=-11,perspective=1100,depth=120,speed=26,direction='up',variance=.4,parallax=.55,lift=45,fade=.55,dim=.45,grayscale=true,overlayColor='#06060b',className=''}){
 const cols=useMemo(()=>Array.from({length:columns},(_,c)=>items.filter((_,i)=>i%columns===c)),[items,columns]);
 return <div className={`drift-wall ${className}`} style={{'--dw-w':`${tileWidth}px`,'--dw-h':`${tileHeight}px`,'--dw-gap':`${gap}px`,'--dw-tilt':`${tilt}deg`,'--dw-turn':`${turn}deg`,'--dw-perspective':`${perspective}px`,'--dw-speed':`${speed}s`,'--dw-depth':`${depth}px`,'--dw-dim':dim,'--dw-overlay':overlayColor,'--dw-gray':grayscale?1:0,'--dw-lift':`${lift}px`,'--dw-fade':fade}}><div className="drift-wall__plane">{cols.map((col,c)=><div className="drift-wall__col" key={c}>{[0,1].map(copy=><div className="drift-wall__track" key={copy}>{col.map((item,i)=><div className="drift-wall__tile" key={`${copy}-${i}`}><div className="drift-wall__inner"><img src={item.image} alt={item.title||''}/><span/></div></div>)}</div>)}</div>)}</div></div>
}
