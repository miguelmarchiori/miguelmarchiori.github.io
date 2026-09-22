import './GlassSurface.css';
export default function GlassSurface({children,width='100%',height='auto',borderRadius=24,backgroundOpacity=.04,saturation=1.2,brightness=50,opacity=.9,className='',style={}}){
 return <div className={`glass-surface ${className}`} style={{width,height,borderRadius,'--glass-frost':backgroundOpacity,'--glass-saturation':saturation,'--glass-bright':`${brightness}%`,'--glass-opacity':opacity,...style}}><div className="glass-surface__content">{children}</div></div>
}
