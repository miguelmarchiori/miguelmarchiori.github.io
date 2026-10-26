import { useEffect, useState } from 'react';
import GlassSurface from './components/GlassSurface';
import TechText from './components/TechText';
import BlurText from './components/BlurText';
import SplitFlapText from './components/SplitFlapText';
import RotatingText from './components/RotatingText';
import Carousel from './components/Carousel';
import DriftWall from './components/DriftWall';
import CircularCarousel from './components/CircularCarousel';
import FolderFloat from './components/FolderFloat';
import GlassIcons from './components/GlassIcons';
import PatternWaves from './components/PatternWaves';
import {
  SiGithub, SiInstagram, SiWhatsapp, SiPython, SiHtml5, SiPhp, SiOpenjdk
} from 'react-icons/si';
import { FaLinkedinIn, FaCss3Alt } from 'react-icons/fa6';
import { portfolio, skills, skillWall, areas, projects } from './data/content';

const nav = [
  { label: 'Sobre', id: 'sobre' },
  { label: 'Robótica', id: 'atuacao' },
  { label: 'Stack', id: 'stack' },
  { label: 'Projetos', id: 'projetos' },
  { label: 'Contato', id: 'contato' }
];
const photos = [
  { src: 'https://i.imgur.com/fVpfF0K.png', alt: 'Miguel Marchiori em uniforme da equipe de robótica', title: 'Miguel Marchiori', note: 'Programação · robótica' },
  { src: 'https://i.imgur.com/FNGeJbu.png', alt: 'Miguel Marchiori — segunda foto', title: 'Miguel Marchiori', note: 'Programação · robótica' },
  { src: 'https://i.imgur.com/grpiCo0.png', alt: 'Miguel Marchiori — terceira foto', title: 'Miguel Marchiori', note: 'Programação · robótica' }
];
export default function App() {
  const [menu, setMenu] = useState(false);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
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

        </section>

        <section id="sobre" className="about section-shell section-pad">
          <div className="section-kicker">01 / SOBRE MIM</div>
          <div className="about-grid about-story-grid">
            <div className="about-story-copy">
              <h2 className="about-story-title"><SplitFlapText text="COMO COMECEI!" tileColor="#17243a" textColor="#f8fafc" fontSize="clamp(16px, 2.4vw, 30px)" gap={3} tileRadius={5} flipDuration={0.12} stagger={0.045} depth={0.35} /></h2>
              <p>Eu sou o Miguel, tenho interesse por tecnologia desde cedo e gosto de ver as ideias saírem do papel, seja num site, num código ou num robô. A robótica me levou ao título de campeão regional da OBR e me ensinou a trabalhar em equipe, liderar e resolver problemas sob pressão. Hoje estudo mais sobre programação e web design, quero transformar essa paixão em carreira na engenharia da computação.</p>
            </div>
            <div className="about-story-photo">
              <img src="https://i.imgur.com/GLGKpVZ.jpeg" alt="Miguel Marchiori" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        <section id="atuacao" className="experience section-shell section-pad">
          <div className="section-kicker">02 / NA PRÁTICA</div>
          <div className="section-heading experience-heading">
            <h2 className="robotics-rotating-title"><span className="robotics-title-prefix">Robótica:</span><RotatingText texts={['FTC', 'OBR', 'FLL']} effect="flip" direction="up" highlight={true} highlightColor="#1672e8" staggerFrom="last" staggerDuration={0.018} rotationInterval={2400} pauseOnHover={true} /></h2>
            <p>Robótica competitiva é onde junto programação, estratégia e prototipagem. Estas são as equipes e modalidades que fazem parte da minha trajetória.</p>
          </div>
          <Carousel
            className="robotics-experience-carousel"
            items={[
              {
                id: 'obr',
                title: 'OBR',
                image: 'https://i.imgur.com/fnA157h.png',
                href: 'https://www.instagram.com/quartetofantastico_sesi/',
                eyebrow: 'CAMPEÃO REGIONAL · NORTE DO PARANÁ',
                description: 'Programador principal do Quarteto Fantástico. Duas participações na etapa estadual da Olimpíada Brasileira de Robótica.',

              },
              {
                id: 'fll',
                title: 'FLL',
                image: 'https://i.imgur.com/GOuvQD6.png',
                href: 'https://www.instagram.com/equip_shield/',
                eyebrow: 'FIRST LEGO LEAGUE · PARANÁ',
                description: 'Programador principal da equipe Shield, participando da etapa regional e desenvolvendo soluções com a equipe.',

              },
              {
                id: 'ftc',
                title: 'FTC',
                image: 'https://i.imgur.com/avRl8ae.jpeg',
                href: 'https://www.instagram.com/vanguardftc_/',
                eyebrow: 'VANGUARD FTC',
                description: 'Programador principal, contribuindo com código, automação e integração dos sistemas do robô.',

              }
            ]}
            baseWidth={390}
            aspectRatio={1.12}
            gap={20}
            radius={24}
            effect="tilt"
            indicator="dots"
            arrows={true}
            loop={true}
            theme={theme}
          />
        </section>

        <section id="stack" className="stack-section section-shell section-pad">
          <div className="section-kicker">03 / STACK</div>
          <div className="stack-carousel-heading">
            <h2>Minhas <em>línguas de programação.</em></h2>
            <p>Linguagens que eu tenho no meu arsenal e pra que uso cada uma</p>
          </div>
          <div className="stack-circular-stage">
            <CircularCarousel
              items={[
                { src: 'https://cdn.simpleicons.org/Python/3776AB', alt: 'Logo Python', title: 'Python', subtitle: 'Programação e automação' },
                { src: 'https://cdn.simpleicons.org/HTML5/E34F26', alt: 'Logo HTML5', title: 'HTML5', subtitle: 'Estrutura web' },
                { src: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1920px-CSS3_logo_and_wordmark.svg.png', alt: 'Logo CSS3', title: 'CSS3', subtitle: 'Estilo e interfaces' },
                { src: 'https://cdn.simpleicons.org/PHP/777BB4', alt: 'Logo PHP', title: 'PHP', subtitle: 'Desenvolvimento web' },
                { src: 'https://cdn.simpleicons.org/OpenJDK/E76F00', alt: 'Logo Java', title: 'Java', subtitle: 'Em aprendizado' },
                { src: 'https://cdn.simpleicons.org/Git/F05032', alt: 'Logo Git', title: 'Git', subtitle: 'Controle de versão' },
                { src: 'https://cdn.simpleicons.org/GitHub/181717', alt: 'Logo GitHub', title: 'GitHub', subtitle: 'Projetos e repositórios' },
              ]}
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
          <div className="section-kicker">04 / PROJETOS</div>
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
              const isPdf = project.type === 'pdf' || /\.pdf(?:$|[?#])/i.test(project.previewUrl || project.url || '');
              const previewUrl = project.previewUrl || project.url;
              return (
                <article className="project-detail">
                  <div className="project-detail-topbar">
                    <div className="project-detail-dots" aria-hidden="true"><i /><i /><i /></div>
                    <span>{isPdf || isDocument ? 'PRÉVIA DO DOCUMENTO' : 'PRÉVIA DO PROJETO'}</span>
                    <span className="project-detail-number">{String(selectedProjectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                  </div>
                  <div className={`project-live-preview ${isPdf || isDocument ? 'is-document' : ''}`}>
                    {project.previewImage ? (
                      <img src={project.previewImage} alt={`Prévia de ${project.name}`} loading="lazy" />
                    ) : isPdf ? (
                      <iframe src={previewUrl} title={`Prévia do documento ${project.name}`} loading="lazy" />
                    ) : (
                      <iframe src={previewUrl} title={`Prévia do site ${project.name}`} loading="lazy" tabIndex={-1} />
                    )}
                    <a className="project-preview-open" href={project.url} target="_blank" rel="noreferrer">Abrir projeto <span>↗</span></a>
                  </div>
                  <div className="project-detail-body">
                    <div className="project-meta"><span>{project.category.toUpperCase()}</span><span>{project.technologies.join(' · ')}</span></div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a className="project-link" href={project.url} target="_blank" rel="noreferrer">{isPdf ? 'Abrir PDF' : isDocument ? 'Abrir documento' : 'Visitar site'} <span>↗</span></a>
                  </div>
                </article>
              );
            })()}
          </div>
        </section>



        <section id="contato" className="contact section-shell section-pad">
          <GlassSurface width="100%" height="auto" borderRadius={32} backgroundOpacity={0.5} className="contact-box">
            <div className="contact-glow" />
            <div className="contact-content">
              <div className="section-kicker">05 / CONTATO</div>
              <h2>Vamos fazer um projeto juntos!</h2>
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

      <footer><span>© {new Date().getFullYear()} {portfolio.shortName}</span></footer>
    </div>
  );
}
