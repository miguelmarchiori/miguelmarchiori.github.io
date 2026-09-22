import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import './FolderFloat.css';

const { Engine, Bodies, Body, Composite } = Matter;

export default function FolderFloat({items=['Frontend','Backend','UI / UX','APIs'],label='STACK',sublabel='',trigger='hover',physics=true,drift=.5,folderColor='#262633',frontColor='#39394a',paperColor='#f7f7f7',itemColor='#f7f7f7',itemTextColor='#14141a',labelColor='#fff',width=230,height=160,radius=18,className=''}){
 const [open,setOpen]=useState(false);const root=useRef(null);const pills=useRef([]);const world=useRef(null);
 const list=items.map(x=>typeof x==='string'?{label:x,value:x}:x);
 useEffect(()=>{if(!open||!physics)return;const rootEl=root.current;if(!rootEl)return;const engine=Engine.create({gravity:{x:0,y:0}});engine.enableSleeping=false;const rect=rootEl.getBoundingClientRect();const bodies=list.map((_,i)=>Bodies.rectangle((i%3)*82-80,-20-Math.floor(i/3)*48,Math.min(150,90+list[i].label.length*5),32,{frictionAir:.04,restitution:.6}));Composite.add(engine.world,bodies);let raf=0,last=performance.now();const zone={left:-160,right:160,top:-170,bottom:10};const tick=now=>{const dt=Math.min(30,now-last);last=now;const t=now*.001;bodies.forEach((b,i)=>{if(drift)Body.applyForce(b,b.position,{x:Math.sin(t*.9+i)*.00003*drift,y:Math.cos(t*1.2+i*1.7)*.00003*drift});Body.setPosition(b,{x:Math.min(zone.right,Math.max(zone.left,b.position.x)),y:Math.min(zone.bottom,Math.max(zone.top,b.position.y))});const el=pills.current[i];if(el){el.style.transform=`translate(${b.position.x}px,${b.position.y}px) rotate(${b.angle*57.3}deg)`}});Engine.update(engine,dt);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);world.current=engine;return()=>{cancelAnimationFrame(raf);Composite.clear(engine.world,false,true);Engine.clear(engine);world.current=null}},[open,physics,drift,list.length]);
 const toggle=()=>setOpen(v=>!v);
 return <div ref={root} className={`folder-float ${open?'is-open':''} ${className}`} style={{'--ff-w':`${width}px`,'--ff-h':`${height}px`,'--ff-r':`${radius}px`,'--ff-back':folderColor,'--ff-front':frontColor,'--ff-paper':paperColor,'--ff-item':itemColor,'--ff-ink':itemTextColor,'--ff-label':labelColor}} onPointerEnter={trigger==='hover'?()=>setOpen(true):undefined} onPointerLeave={trigger==='hover'?()=>setOpen(false):undefined}>
   <div className="folder-float__cloud">{list.map((item,i)=><button ref={el=>pills.current[i]=el} className="folder-float__item" key={i} onClick={()=>setOpen(false)}>{item.label}</button>)}</div>
   <div className="folder-float__folder"><span className="folder-float__back"/><span className="folder-float__paper"/><div className="folder-float__front"><strong>{label}</strong><small>{sublabel||`${list.length} tecnologias`}</small></div><button className="folder-float__trigger" onClick={toggle} aria-label={label}/></div>
 </div>
}
