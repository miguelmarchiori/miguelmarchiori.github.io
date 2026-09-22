import { useState } from 'react';
import GhostFibers from './components/GhostFibers';
import ParticleText from './components/ParticleText';
import BorderGlow from './components/BorderGlow';
import GlassSurface from './components/GlassSurface';
import DriftWall from './components/DriftWall';
import FolderFloat from './components/FolderFloat';
import { portfolio, skills, projects, experience } from './data/content';

const nav = ['Sobre','Projetos','Stack','Experiência','Contato'];

const CodeIcon=({children})=><span className="code-chip">{children}</span>;

export default function App(){
 const [menu,setMenu]=useState(false);
 const scrollTo=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)};
 const wallItems=skills.map((s,i)=>({title:s.label,image:[
   'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=500&q=75',
   'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=75',
   'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=75',
   'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=75'
 ][i%4]}));
 return <div className="app">
   <header className="navbar">
    <button className="brand" onClick={()=>scrollTo('top')}><span>{'<'}</span>{portfolio.name.split(' ')[0] || '[DEV]'}<span>{'/>'}</span></button>
    <nav className={menu?'nav-links is-open':'nav-links'}>{nav.map(x=><button key={x} onClick={()=>scrollTo(x.toLowerCase())}>{x}</button>)}</nav>
    <button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Menu"><i/><i/><i/></button>
   </header>

   <main>
    <section id="top" className="hero section-shell">
      <GhostFibers lineColor="#24163d" glowColor="#7c3aed" speed={.16} scale={2.1} rotationSpeed={.13} layers={5} waveAmplitude={.02} glowIntensity={1.8} brightness={1.65} blueBoost={1.4} vignette={.86} grain={.025}/>
      <div className="hero-overlay"/>
      <div className="hero-content">
       <div className="eyebrow"><span className="status-dot"/> {portfolio.availability}</div>
       <div className="particle-name"><ParticleText text={portfolio.name} color="#f4f4f5" highlightColor="#a78bfa" particleSize={2} density={4} scatter={150} pointerRepel={44} repelRadius={125} fontSize="clamp(3.4rem, 12vw, 8.8rem)" fontWeight={900}/></div>
       <p className="hero-role">{portfolio.role}</p>
       <p className="hero-headline">{portfolio.headline}</p>
       <div className="hero-actions"><button className="primary-btn" onClick={()=>scrollTo('projetos')}>Ver projetos <span>↗</span></button><a className="ghost-btn" href={`mailto:${portfolio.email}`}>Entrar em contato</a></div>
       <div className="hero-meta"><span>{portfolio.location}</span><span>•</span><span>JavaScript · React · Node · [MAIS]</span></div>
      </div>
      <div className="hero-scroll"><span/> SCROLL</div>
    </section>

    <section id="sobre" className="about section-shell section-pad">
      <div className="section-kicker">01 / SOBRE</div>
      <div className="about-grid">
       <div><h2>Construo interfaces que parecem <em>produto</em>, não template.</h2><p>{portfolio.bio}</p><div className="stats">{portfolio.stats.map(s=><div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div></div>
       <GlassSurface width="100%" height="100%" borderRadius={28} backgroundOpacity={.05}><div className="about-card"><div className="terminal-top"><span/><span/><span/></div><div className="terminal-code"><p><span>const</span> developer = {'{'}</p><p>&nbsp;&nbsp;nome: <b>"{portfolio.name}"</b>,</p><p>&nbsp;&nbsp;foco: <b>"{portfolio.role}"</b>,</p><p>&nbsp;&nbsp;stack: [<b>"React"</b>, <b>"Node"</b>, <b>"TypeScript"</b>],</p><p>&nbsp;&nbsp;modo: <b>"always building"</b></p><p>{'}'};</p></div></div></GlassSurface>
      </div>
    </section>

    <section id="projetos" className="projects section-shell section-pad">
      <div className="section-kicker">02 / PROJETOS</div><div className="section-heading"><h2>Alguns trabalhos que<br/><em>eu colocaria aqui.</em></h2><p>Substitua os cards pelos seus projetos reais, destacando contexto, stack e resultado.</p></div>
      <div className="projects-grid">{projects.map((p,i)=><BorderGlow key={p.title} className="project-card" colors={i%2?['#22d3ee','#8b5cf6','#ec4899']:['#a78bfa','#ec4899','#22d3ee']} glowColor="190 85 72" glowIntensity={1.1} borderRadius={24}><a href={p.link} className="project-link"><div className="project-image"><img src={p.image} alt=""/></div><div className="project-info"><div className="project-index">0{i+1}</div><h3>{p.title}</h3><p>{p.description}</p><div className="stack-row">{p.stack.map(t=><CodeIcon key={t}>{t}</CodeIcon>)}</div></div><span className="project-arrow">↗</span></a></BorderGlow>)}</div>
    </section>

    <section id="stack" className="stack-section section-shell section-pad"><div className="section-kicker">03 / STACK</div><div className="section-heading compact"><h2>Tecnologias que fazem parte do<br/><em>meu repertório.</em></h2></div><GlassSurface width="100%" height={520} borderRadius={30} backgroundOpacity={.02}><div className="wall-wrap"><DriftWall items={wallItems} columns={5} tileWidth={160} tileHeight={105} gap={10} speed={30} grayscale dim={.36} lift={55}/><div className="wall-center"><span>PROGRAMO</span><strong>ideias → código</strong></div></div></GlassSurface><div className="stack-bottom"><FolderFloat items={skills.slice(0,7).map(s=>s.label)} label="MINHA STACK" sublabel={`${skills.length} tecnologias`} trigger="click" physics drift={.7}/><div className="stack-copy"><p>Não precisa colocar tudo aqui. Deixe só as tecnologias que realmente representam seu trabalho.</p><div className="skill-list">{skills.slice(0,8).map(s=><span key={s.label}>{s.label}</span>)}</div></div></div></section>

    <section id="experiência" className="experience section-shell section-pad"><div className="section-kicker">04 / EXPERIÊNCIA</div><div className="timeline">{experience.map((e,i)=><GlassSurface key={i} width="100%" height="auto" borderRadius={20} backgroundOpacity={.035}><article className="exp-card"><div className="exp-period">{e.period}</div><div><h3>{e.role}</h3><h4>{e.company}</h4><p>{e.description}</p></div></article></GlassSurface>)}</div></section>

    <section id="contato" className="contact section-shell section-pad"><div className="contact-box"><GhostFibers lineColor="#251739" glowColor="#ec4899" speed={.11} scale={2.7} rotationSpeed={.08} layers={4} brightness={1.4} glowIntensity={1.4}/><div className="contact-content"><div className="section-kicker">05 / CONTATO</div><h2>Tem uma ideia? Vamos<br/><em>transformar em produto.</em></h2><p>Substitua este bloco por uma mensagem curta convidando recrutadores, clientes ou parceiros a entrar em contato.</p><a className="email-link" href={`mailto:${portfolio.email}`}>{portfolio.email}<span>↗</span></a><div className="socials"><a href={portfolio.github}>GitHub</a><a href={portfolio.linkedin}>LinkedIn</a><a href={portfolio.instagram}>Instagram</a><a href={portfolio.cv}>Currículo</a></div></div></div></section>
   </main>
   <footer><span>© {new Date().getFullYear()} {portfolio.name}</span><span>feito com React + WebGL</span></footer>
 </div>
}
