import { lazy, Suspense, useEffect, useState } from 'react';
import GlassSurface from './components/GlassSurface';
import DriftWall from './components/DriftWall';
import FolderFloat from './components/FolderFloat';
import GlassIcons from './components/GlassIcons';
import MiguelAvatar from './components/MiguelAvatar';
const FloatingLines = lazy(() => import('./components/FloatingLines'));
const GlowCursor = lazy(() => import('./components/GlowCursor'));
import {
  SiGithub, SiInstagram, SiWhatsapp, SiPython, SiHtml5, SiPhp, SiOpenjdk
} from 'react-icons/si';
import { FaLinkedinIn, FaCss3Alt } from 'react-icons/fa6';
import { portfolio, skills, skillWall, areas, experience, projects } from './data/content';

const nav = [
  { label: 'Sobre', id: 'sobre' },
  { label: 'Atuação', id: 'atuacao' },
  { label: 'Stack', id: 'stack' },
  { label: 'Projetos', id: 'projetos' },
  { label: 'Fotos', id: 'fotos' },
  { label: 'Contato', id: 'contato' }
];
const photos = [
  { src: `${import.meta.env.BASE_URL}assets/portfolio/portfolio-1.webp`, alt: 'Equipe de robótica trabalhando na programação do robô', title: 'Programação em equipe', note: 'Robótica · trabalho de bancada' },
  { src: `${import.meta.env.BASE_URL}assets/portfolio/portfolio-2.webp`, alt: 'Miguel Marchiori em uniforme da equipe de robótica', title: 'Miguel Marchiori', note: 'Programação · robótica' },
  { src: `${import.meta.env.BASE_URL}assets/portfolio/portfolio-3.webp`, alt: 'Medalhas da Olimpíada Brasileira de Robótica', title: 'Conquistas na OBR', note: 'Olimpíada Brasileira de Robótica' },
  { src: `${import.meta.env.BASE_URL}assets/portfolio/portfolio-4.webp`, alt: 'Detalhe do robô de competição com sensores e componentes eletrônicos', title: 'Robô em desenvolvimento', note: 'Montagem · testes' }
];
export default function App() {
  const [menu, setMenu] = useState(false);
  const [effectsEnabled, setEffectsEnabled] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [activeLook, setActiveLook] = useState(0);
  const [glassesOn, setGlassesOn] = useState(true);
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [theme, setTheme] = useState(() => { try { return window.localStorage.getItem('portfolio-theme') || 'light'; } catch { return 'light'; } });
  useEffect(() => { try { window.localStorage.setItem('portfolio-theme', theme); } catch {} }, [theme]);
  const looks = [
    { name: 'Modo programador', tone: 'blue', description: 'Entre linhas de código, interfaces e ideias que viram projetos.' },
    { name: 'Modo robótica', tone: 'green', description: 'Programação principal, testes e estratégia: robótica é trabalho em equipe.' },
    { name: 'Modo criativo', tone: 'warm', description: 'Design, criatividade e tecnologia trabalhando juntos para criar algo útil.' }
  ];
  const changeLook = direction => setActiveLook(current => (current + direction + looks.length) % looks.length);
  useEffect(() => {
    const canRender = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const canShowCursor = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEffectsEnabled(canRender.matches);
    const updateCursor = () => setCursorEnabled(canShowCursor.matches);
    update();
    updateCursor();
    canRender.addEventListener?.('change', update);
    canShowCursor.addEventListener?.('change', updateCursor);
    return () => {
      canRender.removeEventListener?.('change', update);
      canShowCursor.removeEventListener?.('change', updateCursor);
    };
  }, []);
  useEffect(() => {
    if (!menu || !window.matchMedia('(max-width: 700px)').matches) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = event => { if (event.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menu]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  return (
    <div className={`app`} data-theme={theme}>
      <div className="ambient-background" aria-hidden="true">
        {effectsEnabled && <Suspense fallback={null}>
          <FloatingLines className="ambient-floating-lines" enabledWaves={['top', 'middle', 'bottom']} lineCount={[4, 7, 4]} lineDistance={[8, 6, 5]} animationSpeed={0.38} interactive bendRadius={4.5} bendStrength={-0.28} mouseDamping={0.045} parallax parallaxStrength={0.1} linesGradient={['#c9e4fb', '#c6e9df', '#d7dcf8']} mixBlendMode="normal" backgroundColor="#ffffff" lightMode />
        </Suspense>}
      </div>
      <header className="navbar">
        <GlassSurface width="100%" height="66px" borderRadius={22} backgroundOpacity={0.42} className="navbar-glass">
          <div className="navbar-inner">
            <button className="brand" onClick={() => scrollTo('top')} aria-label="Voltar ao início">
              <span>&lt;</span>{portfolio.shortName.replace(' ', '')}<span>/&gt;</span>
            </button>
            <button type="button" className="theme-toggle" onClick={() => setTheme(value => value === "light" ? "dark" : "light")} aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}>{theme === "light" ? "☾" : "☀"}</button>
            <button className={`menu-btn ${menu ? 'is-open' : ''}`} onClick={() => setMenu(!menu)} aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="primary-navigation"><i /><i /><i /></button>
          </div>
        </GlassSurface>
        {menu && <button className="nav-backdrop" onClick={() => setMenu(false)} aria-label="Fechar menu" />}
        <nav id="primary-navigation" className={menu ? 'nav-links is-open' : 'nav-links'} aria-label="Navegação principal">
          {nav.map(item => <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>)}
        </nav>
      </header>

      <main>
        <section id="top" className="hero section-shell">
          <div className="hero-effects" aria-hidden="true">
            {cursorEnabled && <Suspense fallback={null}>
              <GlowCursor className="hero-glow-cursor" color="#3298ee" secondaryColor="#42c9b0" trailLength={24} trailWidth={5} trailTaper={0.88} followSpeed={0.2} glowIntensity={1.25} glowSpread={0.9} hotspot={0.36} brightness={0.9} opacity={0.7} pulseSpeed={0.55} noiseStrength={0.015} idleFade idleTimeout={500} fadeDuration={650} blendMode="normal" maxDevicePixelRatio={1} />
            </Suspense>}
          </div>
          <div className="hero-marquee" aria-hidden="true">
            <div className="hero-marquee-track"><span>Miguel&nbsp;—&nbsp;Marchiori&nbsp;&nbsp;</span><span>Miguel&nbsp;—&nbsp;Marchiori&nbsp;&nbsp;</span></div>
          </div>
          <div className="hero-content hero-grid hero-refresh"><div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> {portfolio.availability}</div><p className="hero-kicker">OLÁ, EU SOU</p>
            <h1 className="hero-title">Miguel<span className="hero-period">.</span></h1><p className="hero-role">Programador fullstack, curioso por natureza.</p>
            <p className="hero-bio">Sou um programador Fullstack com mais de 5 linguagens de programação, tenho diversos projetos que podem ser encontrados abaixo, sou iniciação científica da UTFPR, campeão regional norte de robótica na Olimpíada Brasileira de Robótica. Programar é a minha paixão.</p>
            <div className="hero-actions"><button className="primary-btn" onClick={() => scrollTo("projetos")}>Ver meus projetos <span>↗</span></button><a className="ghost-btn" href={portfolio.github} target="_blank" rel="noreferrer"><SiGithub aria-hidden="true" /> Meu GitHub <span>↗</span></a></div>
            <div className="hero-mini-note"><span className="status-dot" /> Atualmente transformando café em código (e robôs em campeões).</div></div>
            <div className="hero-visual hero-avatar-stage"><span className="avatar-orbit orbit-one" aria-hidden="true" /><span className="avatar-orbit orbit-two" aria-hidden="true" /><div className="avatar-name">Miguel<span>.</span></div>
              <div className="avatar-display"><button type="button" className="look-arrow avatar-arrow" onClick={() => setOutfitIndex(i => (i + 2) % 3)} aria-label="Visual anterior">←</button><MiguelAvatar outfitIndex={outfitIndex} glassesOn={glassesOn} /><button type="button" className="look-arrow avatar-arrow" onClick={() => setOutfitIndex(i => (i + 1) % 3)} aria-label="Próximo visual">→</button></div>
              <div className="avatar-caption"><span className="avatar-live-dot" /> {["Modo programador", "Modo robótica", "Modo criativo"][outfitIndex]} <span>·</span> roupa {outfitIndex + 1}/3</div><button type="button" className="glasses-toggle avatar-glasses-toggle" onClick={() => setGlassesOn(value => !value)} aria-pressed={glassesOn}>{glassesOn ? "Tirar os óculos" : "Colocar os óculos"}</button></div></div>
          <div className="hero-scroll"><span /> ROLE PARA DESCOBRIR</div>
        </section>

        <section id="sobre" className="about section-shell section-pad">
          <div className="section-kicker">01 / SOBRE MIM</div>
          <div className="about-grid">
            <GlassSurface width="100%" height="100%" borderRadius={28} backgroundOpacity={0.5}>
              <div className="about-intro-card">
                <h2>Código, robótica e automação com uma pegada de <em>produto.</em></h2>
                <p>{portfolio.bio}</p>
                <div className="stats">
                  {portfolio.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
                </div>
                <div className="contact-mini">
                  <span>{portfolio.phone}</span>
                  <a href={portfolio.whatsapp} target="_blank" rel="noreferrer">falar comigo no WhatsApp ↗</a>
                </div>
              </div>
            </GlassSurface>
            <GlassSurface width="100%" height="100%" borderRadius={28} backgroundOpacity={0.42}>
              <div className="about-card">
                <div className="terminal-top"><span /><span /><span /></div>
                <div className="terminal-code">
                  <p><span>const</span> miguel = {'{'}</p>
                  <p>&nbsp;&nbsp;foco: <b>"web + robótica"</b>,</p>
                  <p>&nbsp;&nbsp;linguagens: [<b>"Python"</b>, <b>"HTML"</b>, <b>"CSS"</b>, <b>"PHP"</b>],</p>
                  <p>&nbsp;&nbsp;java: <b>"aprendendo"</b>,</p>
                  <p>&nbsp;&nbsp;competição: <b>"OBR / FLL / FTC"</b>,</p>
                  <p>&nbsp;&nbsp;papel: <b>"programador principal"</b></p>
                  <p>{'}'};</p>
                </div>
                <div className="terminal-note">// construindo, testando, competindo.</div>
              </div>
            </GlassSurface>
          </div>
        </section>

        <section id="atuacao" className="experience section-shell section-pad">
          <div className="section-kicker">02 / NA PRÁTICA</div>
          <div className="section-heading experience-heading">
            <h2>Código em campo,<br /><em>feito em equipe.</em></h2>
            <p>Robótica competitiva é onde junto programação, estratégia e prototipagem. Estas são as equipes e modalidades que fazem parte da minha trajetória.</p>
          </div>
          <div className="experience-grid">
            {experience.map((item, index) => (
              <article className="experience-item" key={item.company}>
                <div className="experience-meta"><span>0{index + 1}</span><span>{item.period}</span></div>
                <div className="experience-mark" aria-hidden="true">{item.period.split(' · ')[0]}</div>
                <h3>{item.role}</h3>
                <p className="experience-team">{item.company}</p>
                <p className="experience-description">{item.description}</p>
                <span className="experience-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="stack-section section-shell section-pad">
          <div className="section-kicker">03 / STACK</div>
          <GlassSurface width="100%" height="auto" borderRadius={24} backgroundOpacity={0.025} className="section-heading-glass">
            <div className="section-heading compact">
              <h2>As tecnologias que estão<br /><em>na minha bancada.</em></h2>
              <p>Linguagens e ferramentas que uso para criar para a web, automatizar tarefas e competir em robótica.</p>
            </div>
          </GlassSurface>
          <GlassSurface width="100%" height={500} borderRadius={30} backgroundOpacity={0.48}>
            <div className="wall-wrap">
              <DriftWall items={skillWall} columns={5} tileWidth={168} tileHeight={110} gap={12} speed={25} grayscale={false} dim={0.42} lift={48} />
              <div className="wall-center"><span>TECNOLOGIAS</span><strong>ideias → código</strong></div>
            </div>
          </GlassSurface>
          <GlassSurface width="100%" height="auto" borderRadius={24} backgroundOpacity={0.44} className="language-icons-surface">
            <div className="language-icons-wrap">
              <div>
                <small>LOGOS DA STACK</small>
                <p>Ferramentas que uso para criar para a web e competir em robótica.</p>
              </div>
              <GlassIcons
                className="language-icons"
                items={[
                  { icon: <SiPython />, color: '#3776AB', label: 'Python' },
                  { icon: <SiHtml5 />, color: '#E34F26', label: 'HTML5' },
                  { icon: <FaCss3Alt />, color: '#1572B6', label: 'CSS3' },
                  { icon: <SiPhp />, color: '#777BB4', label: 'PHP' },
                  { icon: <SiOpenjdk />, color: '#E76F00', label: 'Java' }
                ]}
              />
            </div>
          </GlassSurface>
          <div className="stack-bottom">
            <FolderFloat
              items={areas}
              label="ÁREAS"
              sublabel={`${areas.length} frentes`}
              trigger="click"
              physics={false}
              drift={0}
              folderColor="#dce8f6"
              frontColor="#c5d9f0"
              paperColor="#fffdf9"
              itemColor="#fffdf9"
              itemTextColor="#364c68"
              labelColor="#304560"
              width={200}
              height={148}
            />
            <GlassSurface width="100%" height="auto" borderRadius={22} backgroundOpacity={0.46} className="stack-copy-surface">
              <div className="stack-copy">
                <p>Minha base hoje está em programação web, automação e robótica. Java entra como a próxima linguagem em evolução.</p>
                <div className="skill-list">{skills.map(skill => <span key={skill.label}>{skill.label}</span>)}</div>
              </div>
            </GlassSurface>
          </div>
        </section>

        <section id="projetos" className="projects-section section-shell section-pad">
          <div className="section-kicker">04 / PROJETOS</div>
          <div className="section-heading">
            <h2>Projetos que<br /><em>ganham vida.</em></h2>
            <p>Trabalhos de desenvolvimento web que transformam necessidades reais em experiências digitais.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.name}>
                <div className="project-preview project-preview-agropet" aria-hidden="true">
                  <span className="project-window-dot" /><span className="project-window-dot" /><span className="project-window-dot" />
                  <div className="project-preview-content"><span>AGRO PET</span><strong>RODRIGUES</strong><small>AGROPECUÁRIA · PET SHOP</small><div className="project-preview-lines"><i /><i /><i /></div></div>
                </div>
                <div className="project-card-body">
                  <div className="project-meta"><span>{project.category.toUpperCase()}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
                  <a className="project-link" href={project.url} target="_blank" rel="noreferrer">Visitar site <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="fotos" className="photo-gallery section-shell section-pad">
          <div className="section-kicker">04 / NOS BASTIDORES</div>
          <div className="section-heading">
            <h2>Ideias que saem<br /><em>da tela.</em></h2>
            <p>Um pouco dos bastidores, das equipes e das conquistas na robótica.</p>
          </div>
          <div className="photo-grid">
            {photos.map((photo, index) => (
              <figure className={`photo-card photo-card-${index + 1}`} key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                <figcaption><span>{photo.note}</span><strong>{photo.title}</strong></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="contato" className="contact section-shell section-pad">
          <GlassSurface width="100%" height="auto" borderRadius={32} backgroundOpacity={0.5} className="contact-box">
            <div className="contact-glow" />
            <div className="contact-content">
              <div className="section-kicker">05 / CONTATO</div>
              <h2>Vamos transformar<br /><em>ideias em código.</em></h2>
              <p>Para projetos, oportunidades, robótica ou colaboração, o caminho mais rápido é pelo WhatsApp.</p>
              <div className="contact-actions">
                <a className="email-link" href={`mailto:${portfolio.email}`}>{portfolio.email} <span>↗</span></a>
                <a className="phone-link" href={portfolio.whatsapp} target="_blank" rel="noreferrer">WhatsApp · {portfolio.phone} ↗</a>
              </div>
              <GlassSurface width="100%" height="auto" borderRadius={22} backgroundOpacity={0.42} className="contact-social-surface">
                <div className="contact-social-content">
                  <span className="contact-social-label">ENCONTRE-ME</span>
                  <GlassIcons
                    className="contact-icons"
                    items={[
                      { icon: <SiGithub />, color: '#6574d8', label: 'GitHub', href: portfolio.github },
                      { icon: <FaLinkedinIn />, color: '#0a66c2', label: 'LinkedIn', href: portfolio.linkedin },
                      { icon: <SiInstagram />, color: '#e4405f', label: 'Instagram', href: portfolio.instagram }
                    ]}
                  />
                </div>
              </GlassSurface>
            </div>
          </GlassSurface>
        </section>
      </main>

      <footer><span>© {new Date().getFullYear()} {portfolio.shortName}</span><span>feito para web + robótica</span></footer>
    </div>
  );
}
