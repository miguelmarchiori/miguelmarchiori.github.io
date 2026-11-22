import { useEffect, useState } from 'react';
import GlassSurface from './components/GlassSurface';
import TechText from './components/TechText';
import BlurText from './components/BlurText';
import SplitFlapText from './components/SplitFlapText';
import RoboticsShowcase from './components/RoboticsShowcase';
import { robotics } from './data/robotics';
import CircularCarousel from './components/CircularCarousel';
import PatternWaves from './components/PatternWaves';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { portfolio, projects } from './data/content';

const nav = [
  { label: 'Sobre', id: 'sobre' },
  { label: 'Robótica', id: 'atuacao' },
  { label: 'Stack', id: 'stack' },
  { label: 'Projetos', id: 'projetos' },
  { label: 'Contato', id: 'contato' }
];
const photos = [
  { src: '/assets/img/miguel-1.webp', alt: 'Miguel Marchiori sorrindo, de camiseta preta', title: 'Miguel Marchiori', note: 'Programação · robótica' },
  { src: '/assets/img/miguel-2.webp', alt: 'Miguel Marchiori sorrindo, de camisa verde', title: 'Miguel Marchiori', note: 'Programação · robótica' },
  { src: '/assets/img/miguel-3.webp', alt: 'Miguel Marchiori sorrindo, de uniforme da equipe de robótica', title: 'Miguel Marchiori', note: 'Programação · robótica' }
];
const technologyItems = [
  { src: '/assets/tech/python.svg', alt: 'Logo Python', title: 'Python', subtitle: 'Programação e automação' },
  { src: '/assets/tech/html5.svg', alt: 'Logo HTML5', title: 'HTML5', subtitle: 'Estrutura web' },
  { src: '/assets/tech/css3.svg', alt: 'Logo CSS3', title: 'CSS3', subtitle: 'Estilo e interfaces' },
  { src: '/assets/tech/php.svg', alt: 'Logo PHP', title: 'PHP', subtitle: 'Desenvolvimento web' },
  { src: '/assets/tech/java.svg', alt: 'Logo Java', title: 'Java', subtitle: 'Em aprendizado' },
  { src: '/assets/tech/git.svg', alt: 'Logo Git', title: 'Git', subtitle: 'Controle de versão' },
  { src: '/assets/tech/github.svg', alt: 'Logo GitHub', title: 'GitHub', subtitle: 'Projetos e repositórios' }
];

export default function App() {
  const [menu, setMenu] = useState(false);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [roboticsTeam, setRoboticsTeam] = useState(0);
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

  // Botão fixo de WhatsApp no celular: aparece depois que o botão do início sai da tela
  // e some quando a seção de contato já mostra a mesma ação.
  const [barOn, setBarOn] = useState(false);
  useEffect(() => {
    const heroButton = document.querySelector('.hero-actions .primary-btn');
    const contact = document.getElementById('contato');
    if (!heroButton || !contact || !('IntersectionObserver' in window)) return undefined;
    const seen = { hero: true, contact: false };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === heroButton) seen.hero = entry.isIntersecting;
        else seen.contact = entry.isIntersecting;
      });
      setBarOn(!seen.hero && !seen.contact);
    }, { threshold: 0.15 });
    observer.observe(heroButton);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  return (
    <div className={`app`} data-theme={theme}>
      <div className="ambient-background" aria-hidden="true">
        <PatternWaves
          className="site-pattern-waves"
          color={theme === 'dark' ? '#8abaff' : '#2a62a8'}
          spacing={11}
          opacity={theme === 'dark' ? 0.58 : 0.52}
          speed={0}
          depth={0.9}
          backgroundColor="rgba(0, 0, 0, 0)"
          preset="silk"
          pattern="dot"
          wave="silk"
          interactive={false}
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
          <a className="primary-btn sheet-cta" href={portfolio.whatsapp} target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>Falar no WhatsApp</a>
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
            <div className="hero-tech-name"><div className="hero-tech-line hero-tech-line-miguel"><BlurText text="MIGUEL" className="hero-blur-name" animateBy="letters" effect="blur" direction="top" staggerFrom="start" trigger="load" delay={75} stepDuration={0.55} blur={10} distance={28} /></div><div className="hero-tech-line"><TechText text="MARCHIORI" fontFamily="Michroma" fontWeight={800} fontSize={190} letterSpacing={-0.055} color={theme === 'dark' ? '#eef4ff' : '#17243a'} accentColor="#1672e8" align="left" reveal="letter" specks={12} labels={false} draggable={false} clickKick intro="type" introDuration={1.4} guides={false} /></div></div><p className="hero-role">Programador Fullstack</p>
            <p className="hero-bio">Sou programador full stack e bolsista de iniciação científica na UTFPR. Desenvolvo projetos de programação web, robótica e automação. Fui campeão regional do Norte do Paraná na Olimpíada Brasileira de Robótica. Programar é minha paixão.</p>
            <div className="hero-actions"><button className="primary-btn" onClick={() => scrollTo("projetos")}>Ver meus projetos</button><a className="ghost-btn" href={portfolio.github} target="_blank" rel="noreferrer"><SiGithub aria-hidden="true" /> Meu GitHub</a></div>
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

        </section>

        <section id="sobre" className="about section-shell section-pad">
          <div className="about-grid about-story-grid">
            <div className="about-story-copy">
              <h2 className="about-story-title"><SplitFlapText text="COMO COMECEI!" tileColor="#17243a" textColor="#f8fafc" fontSize="clamp(16px, 2.4vw, 30px)" gap={3} tileRadius={5} flipDuration={0.12} stagger={0.045} depth={0.35} /></h2>
              <p>Eu sou o Miguel, tenho interesse por tecnologia desde cedo e gosto de ver as ideias saírem do papel, seja num site, num código ou num robô. A robótica me levou ao título de campeão regional da OBR e me ensinou a trabalhar em equipe, liderar e resolver problemas sob pressão. Hoje estudo mais sobre programação e web design, quero transformar essa paixão em carreira na engenharia da computação.</p>
            </div>
            <div className="about-story-photo">
              <img src="/assets/img/miguel-programando.webp" alt="Miguel Marchiori de uniforme da equipe programando no notebook durante uma competição" width="1000" height="1501" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        <section id="atuacao" className="experience section-shell section-pad">
          <div className="section-heading experience-heading">
            <h2 className="robotics-rotating-title"><span className="robotics-title-prefix">Robótica:</span><span className="robotics-pill" key={robotics[roboticsTeam].id}>{robotics[roboticsTeam].short}</span></h2>
            <p>Robótica competitiva é onde junto programação, estratégia e prototipagem. Estas são as equipes e modalidades que fazem parte da minha trajetória.</p>
          </div>
          <RoboticsShowcase teams={robotics} theme={theme} onTeamChange={setRoboticsTeam} />
        </section>

        <section id="stack" className="stack-section section-shell section-pad">
          <div className="stack-carousel-heading">
            <h2>Minhas <em>línguas de programação.</em></h2>
            <p>Linguagens que eu tenho no meu arsenal e pra que uso cada uma</p>
          </div>
          <div className="stack-circular-stage">
            <CircularCarousel
              items={technologyItems}
              preset="cylinder"
              intro="rise"
              cardWidth={218}
              aspectRatio={1}
              gap={22}
              autoplay="drift"
              speed={14}
              direction="left"
              draggable={true}
              momentum={0.6}
              snap={true}
              pauseOnHover={true}
              focusOnClick={true}
              parallax={0.18}
              stretch={0.25}
              depthFade={0.42}
              fadeColor={theme === 'dark' ? '#080d16' : '#ffffff'}
              cornerRadius={20}
              captions={true}
            />
          </div>
        </section>

        <section id="projetos" className="projects-section section-shell section-pad">
          <div className="section-heading">
            <h2>Projetos que<br /><em>eu fiz.</em></h2>
            <p>Explore os projetos e veja uma prévia do resultado antes de abrir cada um.</p>
          </div>
          <div className={`projects-showcase ${selectedProjectIndex !== null ? 'has-selection' : 'is-collapsed'}`} aria-label="Projetos do portfólio">
            <div className="projects-list" role="listbox" aria-label="Lista de projetos">
              {projects.map((project, index) => (
                <button
                  className={`projects-list-item ${selectedProjectIndex === index ? 'is-selected' : ''}`}
                  key={project.name}
                  type="button"
                  role="option"
                  aria-selected={selectedProjectIndex === index}
                  onClick={() => setSelectedProjectIndex(current => current === index ? null : index)}
                >
                  <span className="projects-list-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="projects-list-copy">
                    <strong>{project.name}</strong>
                    <small>{project.category}</small>
                  </span>
                  <span className="projects-list-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            {selectedProjectIndex !== null && projects[selectedProjectIndex] && (() => {
              const project = projects[selectedProjectIndex];
              const isDocument = project.type === 'document';
              const isRepo = project.type === 'repo';
              const isPdf = project.type === 'pdf' || /\.pdf(?:$|[?#])/i.test(project.previewUrl || project.url || '');
              const previewUrl = project.previewUrl || project.url;
              return (
                <article className="project-detail">
                  <div className="project-detail-topbar">
                    <div className="project-detail-dots" aria-hidden="true"><i /><i /><i /></div>
                    <span>{isPdf || isDocument ? 'PRÉVIA DO DOCUMENTO' : isRepo ? 'REPOSITÓRIO' : 'PRÉVIA DO PROJETO'}</span>
                    <span className="project-detail-number">{String(selectedProjectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                  </div>
                  <div className={`project-live-preview ${isPdf || isDocument ? 'is-document' : ''} ${isRepo ? 'is-repo' : ''}`}>
                    {project.previewImage ? (
                      <img src={project.previewImage} alt={`Prévia de ${project.name}`} loading="lazy" />
                    ) : isRepo ? (
                      <div className="project-repo-preview">
                        <p className="project-repo-path">{project.url.replace('https://github.com/', '')}</p>
                        <ul>
                          {project.files.map(file => <li key={file.name}><code>{file.name}</code><span>{file.note}</span></li>)}
                        </ul>
                      </div>
                    ) : isPdf ? (
                      <iframe src={previewUrl} title={`Prévia do documento ${project.name}`} loading="lazy" />
                    ) : (
                      <iframe src={previewUrl} title={`Prévia do site ${project.name}`} loading="lazy" tabIndex={0} />
                    )}
                    <a className="project-preview-open" href={project.url} target="_blank" rel="noreferrer">{isPdf ? "Abrir PDF" : isDocument ? "Abrir documento" : isRepo ? "Abrir no GitHub" : "Abrir projeto"} <span>↗</span></a>
                  </div>
                  <div className="project-detail-body">
                    <div className="project-meta"><span>{project.category.toUpperCase()}</span><span>{project.technologies.join(' · ')}</span></div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-links">
                      <a className="project-link" href={project.url} target="_blank" rel="noreferrer">{isPdf ? 'Abrir PDF' : isDocument ? 'Abrir documento' : isRepo ? 'Ver no GitHub' : 'Visitar site'} <span>↗</span></a>
                      {project.repoUrl && <a className="project-link" href={project.repoUrl} target="_blank" rel="noreferrer">Ver o código no GitHub <span>↗</span></a>}
                    </div>
                  </div>
                </article>
              );
            })()}
          </div>
        </section>



        <section id="contato" className="contact section-shell section-pad">
          <div className="contact-open">
            <h2>Vamos fazer um projeto juntos!</h2>
            <p>Para projetos, oportunidades, robótica ou colaboração, o caminho mais rápido é pelo WhatsApp.</p>
            <div className="contact-actions">
              <a className="primary-btn contact-btn" href={portfolio.whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
              <a className="ghost-btn contact-btn" href={`mailto:${portfolio.email}`}>Enviar e-mail</a>
            </div>
            <ul className="contact-links" aria-label="Redes sociais">
              <li><a href={portfolio.github} target="_blank" rel="noreferrer"><SiGithub aria-hidden="true" /> GitHub</a></li>
              <li><a href={portfolio.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn aria-hidden="true" /> LinkedIn</a></li>
              <li><a href={portfolio.instagram} target="_blank" rel="noreferrer"><SiInstagram aria-hidden="true" /> Instagram</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer><span>© {new Date().getFullYear()} {portfolio.shortName}</span></footer>
      <nav className={`actionbar${barOn && !menu ? ' is-visible' : ''}`} aria-label="Ações rápidas" inert={!(barOn && !menu)}>
        <a className="primary-btn" href={portfolio.whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      </nav>
    </div>
  );
}
