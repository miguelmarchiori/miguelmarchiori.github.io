import { useEffect, useState } from 'react';
import GlassSurface from './components/GlassSurface';
import TechText from './components/TechText';
import BlurText from './components/BlurText';
import DriftWall from './components/DriftWall';
import FolderFloat from './components/FolderFloat';
import GlassIcons from './components/GlassIcons';
import PatternWaves from './components/PatternWaves';
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
  { src: 'https://i.imgur.com/fVpfF0K.png', alt: 'Miguel Marchiori em uniforme da equipe de robótica', title: 'Miguel Marchiori', note: 'Programação · robótica' },
  { src: 'https://i.imgur.com/FNGeJbu.png', alt: 'Miguel Marchiori — segunda foto', title: 'Miguel Marchiori', note: 'Programação · robótica' },
  { src: 'https://i.imgur.com/grpiCo0.png', alt: 'Miguel Marchiori — terceira foto', title: 'Miguel Marchiori', note: 'Programação · robótica' }
];
export default function App() {
  const [menu, setMenu] = useState(false);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(1);
  const [theme, setTheme] = useState(() => { try { return window.localStorage.getItem('portfolio-theme-v2') || 'dark'; } catch { return 'dark'; } });
  useEffect(() => { try { window.localStorage.setItem('portfolio-theme-v2', theme); } catch {} }, [theme]);
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
        <PatternWaves
          className="site-pattern-waves"
          color={theme === 'dark' ? '#8abaff' : '#477db8'}
          spacing={11}
          opacity={theme === 'dark' ? 0.58 : 0.52}
          speed={0.24}
          depth={0.9}
          backgroundColor="rgba(0, 0, 0, 0)"
          preset="silk"
          pattern="dot"
          wave="silk"
          interactive={true}
          intro={true}
        />
      </div>
      <header className="navbar">
        <GlassSurface width="100%" height="66px" borderRadius={22} backgroundOpacity={0.42} className="navbar-glass">
          <div className="navbar-inner">
            <button className="brand" onClick={() => scrollTo('top')} aria-label="Voltar ao início">
              <span>&lt;</span>{portfolio.shortName.replace(' ', '')}<span>/&gt;</span>
            </button>
            <label className="theme-switch" aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}>
              <input className="theme-switch__checkbox" type="checkbox" checked={theme === "dark"} onChange={event => setTheme(event.target.checked ? "dark" : "light")} aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"} />
              <div className="theme-switch__container" aria-hidden="true">
                <div className="theme-switch__circle-container">
                  <div className="theme-switch__sun-moon-container">
                    <div className="theme-switch__moon">
                      <div className="theme-switch__spot" />
                      <div className="theme-switch__spot" />
                      <div className="theme-switch__spot" />
                    </div>
                  </div>
                </div>
                <div className="theme-switch__clouds" />
                <svg className="theme-switch__stars-container" viewBox="0 0 54 24" fill="none" aria-hidden="true">
                  <path d="M8 1l1.8 5.2L15 8l-5.2 1.8L8 15l-1.8-5.2L1 8l5.2-1.8L8 1Z" fill="currentColor"/>
                  <path d="M28 8l1.2 3.4L33 12.5l-3.8 1.2L28 17l-1.2-3.3L23 12.5l3.8-1.1L28 8Z" fill="currentColor"/>
                  <path d="M43 2l1.1 3.1L47 6l-2.9 1L43 10l-1-3-3-1 3-1 1-3Z" fill="currentColor"/>
                </svg>
              </div>
            </label>
            <button className={`menu-btn ${menu ? 'is-open' : ''}`} onClick={() => setMenu(!menu)} aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="primary-navigation"><i /><i /><i /></button>
          </div>
        </GlassSurface>
        {menu && <button className="nav-backdrop" onClick={() => setMenu(false)} aria-label="Fechar menu" />}
        <nav id="primary-navigation" className={menu ? 'nav-links is-open' : 'nav-links'} aria-label="Navegação principal">
          {nav.map(item => <button key={item.id} onClick={() => scrollTo(item.id)}>{item.label}</button>)}
          <div className="mobile-theme-row">
            <span>{theme === "dark" ? "Modo escuro" : "Modo claro"}</span>
            <label className="theme-switch theme-switch--mobile" aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}>
              <input className="theme-switch__checkbox" type="checkbox" checked={theme === "dark"} onChange={event => setTheme(event.target.checked ? "dark" : "light")} aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"} />
              <div className="theme-switch__container" aria-hidden="true">
                <div className="theme-switch__circle-container"><div className="theme-switch__sun-moon-container"><div className="theme-switch__moon"><div className="theme-switch__spot" /><div className="theme-switch__spot" /><div className="theme-switch__spot" /></div></div></div>
                <div className="theme-switch__clouds" />
                <svg className="theme-switch__stars-container" viewBox="0 0 54 24" fill="none" aria-hidden="true"><path d="M8 1l1.8 5.2L15 8l-5.2 1.8L8 15l-1.8-5.2L1 8l5.2-1.8L8 1Z" fill="currentColor"/><path d="M28 8l1.2 3.4L33 12.5l-3.8 1.2L28 17l-1.2-3.3L23 12.5l3.8-1.1L28 8Z" fill="currentColor"/><path d="M43 2l1.1 3.1L47 6l-2.9 1L43 10l-1-3-3-1 3-1 1-3Z" fill="currentColor"/></svg>
              </div>
            </label>
          </div>
        </nav>
      </header>

      <main>
        <section id="top" className="hero section-shell">
          <div className="hero-content hero-grid hero-refresh"><div className="hero-copy">
            <p className="hero-kicker">OLÁ, EU SOU</p>
            <div className="hero-tech-name"><div className="hero-tech-line hero-tech-line-miguel"><BlurText text="MIGUEL" className="hero-blur-name" animateBy="letters" effect="blur" direction="top" staggerFrom="start" trigger="load" delay={75} stepDuration={0.55} blur={10} distance={28} /></div><div className="hero-tech-line"><TechText text="MARCHIORI" fontFamily="Michroma" fontWeight={800} fontSize={190} letterSpacing={-0.055} color="currentColor" accentColor="#1672e8" align="left" reveal="letter" specks={12} labels={false} draggable={false} clickKick intro="type" introDuration={1.4} guides={false} /></div></div><p className="hero-role">Programador Fullstack</p>
            <p className="hero-bio">Sou programador full stack e bolsista de iniciação científica na UTFPR. Desenvolvo projetos de programação web, robótica e automação. Fui campeão regional do Norte do Paraná na Olimpíada Brasileira de Robótica. Programar é minha paixão.</p>
            <div className="hero-actions"><button className="primary-btn" onClick={() => scrollTo("projetos")}>Ver meus projetos <span>↗</span></button><a className="ghost-btn" href={portfolio.github} target="_blank" rel="noreferrer"><SiGithub aria-hidden="true" /> Meu GitHub <span>↗</span></a></div>
            </div>
            <div className="hero-visual hero-avatar-stage hero-photo-stage">
              <span className="avatar-orbit orbit-one" aria-hidden="true" />
              <span className="avatar-orbit orbit-two" aria-hidden="true" />
              <button className="hero-photo-arrow hero-photo-arrow--left cursor-pointer duration-200 hover:scale-125 active:scale-100" type="button" title="Foto anterior" aria-label="Mostrar foto anterior" onClick={() => setHeroPhotoIndex(index => (index - 1 + photos.length) % photos.length)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300" aria-hidden="true"><path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19" /></svg>
              </button>
              <img key={photos[heroPhotoIndex].src} className="hero-profile-photo" src={photos[heroPhotoIndex].src} alt={photos[heroPhotoIndex].alt} loading="eager" fetchPriority="high" decoding="async" />
              <button className="hero-photo-arrow hero-photo-arrow--right cursor-pointer duration-200 hover:scale-125 active:scale-100" type="button" title="Próxima foto" aria-label="Mostrar próxima foto" onClick={() => setHeroPhotoIndex(index => (index + 1) % photos.length)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-blue-300" aria-hidden="true"><path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19" /></svg>
              </button>
            </div>
          </div>
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
                size={66} gap={22} columns={5} roundness={0.28} plate="tilt" hover="press" labels="always" theme={theme === "dark" ? "dark" : "light"}
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
                    size={58} gap={22} columns={3} roundness={0.3} plate="tilt" hover="press" labels="always" theme={theme === "dark" ? "dark" : "light"}
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
