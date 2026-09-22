import { useState } from 'react';
import GhostFibers from './components/GhostFibers';
import ParticleText from './components/ParticleText';
import BorderGlow from './components/BorderGlow';
import GlassSurface from './components/GlassSurface';
import DriftWall from './components/DriftWall';
import FolderFloat from './components/FolderFloat';
import GlassIcons from './components/GlassIcons';
import FluidGlass from './components/FluidGlass';
import {
  SiGithub, SiInstagram, SiWhatsapp, SiPython, SiHtml5, SiPhp, SiOpenjdk, SiGit
} from 'react-icons/si';
import { FaLinkedinIn, FaCss3Alt } from 'react-icons/fa6';
import { portfolio, skills, skillWall, areas, projects, experience } from './data/content';

const nav = ['Sobre', 'Projetos', 'Stack', 'Experiência', 'Contato'];
const techIcons = { Python: SiPython, HTML: SiHtml5, CSS: FaCss3Alt, PHP: SiPhp, Java: SiOpenjdk, Git: SiGit, 'Git / GitHub': SiGithub };
const CodeIcon = ({ children }) => {
  const Icon = techIcons[children];
  return <span className="code-chip">{Icon && <Icon aria-hidden="true" />}<span>{children}</span></span>;
};

export default function App() {
  const [menu, setMenu] = useState(false);
  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenu(false);
  };

  return (
    <div className="app">
      <header className="navbar">
        <GlassSurface width="100%" height="76px" borderRadius={0} backgroundOpacity={0.035} className="navbar-glass">
          <div className="navbar-inner">
            <button className="brand" onClick={() => scrollTo('top')} aria-label="Voltar ao início">
              <span>&lt;</span>{portfolio.shortName.replace(' ', '')}<span>/&gt;</span>
            </button>
            <nav className={menu ? 'nav-links is-open' : 'nav-links'}>
              {nav.map(item => <button key={item} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>)}
            </nav>
            <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Abrir menu"><i /><i /><i /></button>
          </div>
        </GlassSurface>
      </header>

      <main>
        <section id="top" className="hero section-shell">
          <GhostFibers
            lineColor="#4b0b14"
            glowColor="#e11d2e"
            speed={0.12}
            scale={2.2}
            rotationSpeed={0.08}
            layers={3}
            waveAmplitude={0.014}
            glowIntensity={1.25}
            brightness={1.35}
            blueBoost={1.15}
            vignette={0.9}
            grain={0.012}
            dpr={0.75}
            fps={30}
          />
          <FluidGlass className="hero-fluid-glass" backgroundColor="#07070b" />
          <div className="hero-overlay" />
          <div className="hero-content hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> {portfolio.availability}</div>
              <div className="particle-name">
                <ParticleText
                  text={portfolio.shortName}
                  color="#ffffff"
                  highlightColor="#ff3346"
                  particleSize={1.25}
                  density={8}
                  scatter={80}
                  pointerRepel={18}
                  repelRadius={92}
                  idleDrift={0.18}
                  fontSize="clamp(2.6rem, 6.5vw, 5.9rem)"
                  fontWeight={900}
                  glow={false}
                  fps={24}
                />
                <h1 className="hero-title">Miguel <span>Marchiori</span></h1>
              </div>
              <p className="hero-role">{portfolio.role}</p>
              <p className="hero-headline">{portfolio.headline}</p>
              <p className="hero-bio">{portfolio.bio}</p>
              <div className="hero-actions">
                <button className="primary-btn" onClick={() => scrollTo('projetos')}>Ver projetos <span>↗</span></button>
                <a className="ghost-btn" href={portfolio.whatsapp} target="_blank" rel="noreferrer"><SiWhatsapp aria-hidden="true" /> WhatsApp <span>↗</span></a>
              </div>
              <GlassSurface width="100%" height="auto" borderRadius={20} backgroundOpacity={0.035} className="social-surface-wrap">
                <div className="featured-socials" aria-label="Redes sociais e portfólio">
                  <a className="featured-social" href={portfolio.github} target="_blank" rel="noreferrer">
                    <span className="social-mark"><SiGithub /></span>
                    <span className="social-copy"><small>GitHub</small><strong>@redmpy</strong></span>
                    <span className="social-arrow">↗</span>
                  </a>
                  <a className="featured-social" href={portfolio.linkedin} target="_blank" rel="noreferrer">
                    <span className="social-mark"><FaLinkedinIn /></span>
                    <span className="social-copy"><small>LinkedIn</small><strong>Miguel Marchiori</strong></span>
                    <span className="social-arrow">↗</span>
                  </a>
                  <a className="featured-social" href={portfolio.instagram} target="_blank" rel="noreferrer">
                    <span className="social-mark"><SiInstagram /></span>
                    <span className="social-copy"><small>Instagram</small><strong>@mg_marchiori</strong></span>
                    <span className="social-arrow">↗</span>
                  </a>
                </div>
              </GlassSurface>
              <GlassSurface width="100%" height="auto" borderRadius={18} backgroundOpacity={0.028} className="hero-tech-surface">
                <div className="hero-techs" aria-label="Principais linguagens">
                  {[['Python', SiPython], ['HTML', SiHtml5], ['CSS', FaCss3Alt], ['PHP', SiPhp], ['Java', SiOpenjdk]].map(([label, Icon]) => (
                    <span key={label} className="hero-tech"><Icon aria-hidden="true" /><b>{label}</b></span>
                  ))}
                </div>
              </GlassSurface>
            </div>

            <div className="hero-visual">
              <GlassSurface width="100%" height="100%" borderRadius={28} backgroundOpacity={0.025} className="portrait-card">
                <div className="portrait-wrap">
                  <div className="portrait-glow" />
                  <img src="/assets/miguel.png" alt="Miguel Marchiori" className="portrait" />
                  <div className="portrait-badge badge-one"><strong>OBR</strong><span>Campeão regional</span></div>
                  <div className="portrait-badge badge-two"><strong>PROGRAMADOR</strong><span>principal nas equipes</span></div>
                </div>
              </GlassSurface>
            </div>
          </div>
          <div className="hero-scroll"><span /> SCROLL</div>
        </section>

        <section id="sobre" className="about section-shell section-pad">
          <div className="section-kicker">01 / SOBRE MIM</div>
          <div className="about-grid">
            <GlassSurface width="100%" height="100%" borderRadius={28} backgroundOpacity={0.03}>
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
            <GlassSurface width="100%" height="100%" borderRadius={28} backgroundOpacity={0.035}>
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

        <section id="projetos" className="projects section-shell section-pad">
          <div className="section-kicker">02 / PROJETOS</div>
          <GlassSurface width="100%" height="auto" borderRadius={24} backgroundOpacity={0.025} className="section-heading-glass">
            <div className="section-heading">
              <h2>Projetos que vão virar<br /><em>cases reais.</em></h2>
              <p>Os quatro cards estão prontos para receber seus projetos, links, imagens e resultados. Me mande os projetos e eu troco tudo.</p>
            </div>
          </GlassSurface>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <BorderGlow key={project.title} className="project-card" colors={index % 2 ? ['#7f1d1d', '#e11d2e', '#ff6b75'] : ['#991b1b', '#ef233c', '#ff8b95']} glowColor="0 85 62" glowIntensity={0.85} borderRadius={24}>
                <GlassSurface width="100%" height="100%" borderRadius={23} backgroundOpacity={0.04} className="project-glass">
                  <a href={project.link} className="project-link">
                  <div className="project-image"><img src={project.image} alt="" loading="lazy" decoding="async" /></div>
                  <div className="project-info">
                    <div className="project-index">0{index + 1}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="stack-row">{project.stack.map(tech => <CodeIcon key={tech}>{tech}</CodeIcon>)}</div>
                  </div>
                    <span className="project-arrow">↗</span>
                  </a>
                </GlassSurface>
              </BorderGlow>
            ))}
          </div>
        </section>

        <section id="stack" className="stack-section section-shell section-pad">
          <div className="section-kicker">03 / STACK</div>
          <GlassSurface width="100%" height="auto" borderRadius={24} backgroundOpacity={0.025} className="section-heading-glass">
            <div className="section-heading compact">
              <h2>As tecnologias que estão<br /><em>na minha bancada.</em></h2>
              <p>Agora cada tecnologia aparece com seu logo oficial, mantendo o visual líquido e interativo.</p>
            </div>
          </GlassSurface>
          <GlassSurface width="100%" height={500} borderRadius={30} backgroundOpacity={0.02}>
            <div className="wall-wrap">
              <DriftWall items={skillWall} columns={5} tileWidth={168} tileHeight={110} gap={12} speed={25} grayscale={false} dim={0.42} lift={48} />
              <div className="wall-center"><span>TECNOLOGIAS</span><strong>ideias → código</strong></div>
            </div>
          </GlassSurface>
          <GlassSurface width="100%" height="auto" borderRadius={24} backgroundOpacity={0.03} className="language-icons-surface">
            <div className="language-icons-wrap">
              <div>
                <small>LOGOS DA STACK</small>
                <p>As principais linguagens do portfólio, agora com seus ícones.</p>
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
              folderColor="#45070d"
              frontColor="#7f1020"
              paperColor="#fff5f5"
              itemColor="#f7f7f7"
              itemTextColor="#151015"
              labelColor="#fff"
            />
            <GlassSurface width="100%" height="auto" borderRadius={22} backgroundOpacity={0.04} className="stack-copy-surface">
              <div className="stack-copy">
                <p>Minha base hoje está em programação web, automação e robótica. Java entra como a próxima linguagem em evolução.</p>
                <div className="skill-list">{skills.map(skill => <span key={skill.label}>{skill.label}</span>)}</div>
              </div>
            </GlassSurface>
          </div>
        </section>

        <section id="experiência" className="experience section-shell section-pad">
          <div className="section-kicker">04 / EXPERIÊNCIA</div>
          <div className="timeline">
            {experience.map((item, index) => (
              <GlassSurface key={index} width="100%" height="auto" borderRadius={20} backgroundOpacity={0.035}>
                <article className="exp-card">
                  <div className="exp-period">{item.period}</div>
                  <div><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.description}</p></div>
                </article>
              </GlassSurface>
            ))}
          </div>
        </section>

        <section id="contato" className="contact section-shell section-pad">
          <GlassSurface width="100%" height="auto" borderRadius={32} backgroundOpacity={0.045} className="contact-box">
            <div className="contact-glow" />
            <div className="contact-content">
              <div className="section-kicker">05 / CONTATO</div>
              <h2>Vamos transformar<br /><em>ideias em código.</em></h2>
              <p>Para projetos, oportunidades, robótica ou colaboração, o caminho mais rápido é pelo WhatsApp.</p>
              <div className="contact-actions">
                <a className="email-link" href={portfolio.whatsapp} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
                <a className="phone-link" href={`tel:${portfolio.phone.replace(/[^0-9+]/g, '')}`}>{portfolio.phone}</a>
              </div>
              <GlassSurface width="100%" height="auto" borderRadius={22} backgroundOpacity={0.028} className="contact-social-surface">
                <div className="contact-social-content">
                  <span className="contact-social-label">ENCONTRE-ME</span>
                  <GlassIcons
                    className="contact-icons"
                    items={[
                      { icon: <SiGithub />, color: 'darkred', label: 'GitHub', href: portfolio.github },
                      { icon: <FaLinkedinIn />, color: 'red', label: 'LinkedIn', href: portfolio.linkedin },
                      { icon: <SiInstagram />, color: 'crimson', label: 'Instagram', href: portfolio.instagram }
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
