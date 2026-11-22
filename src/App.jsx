import { person, mainAction, hero, about, tools, projects, robotics, teams, closing } from './data/content';

const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

// Imagem com tamanho e versão menor para o celular; só a do hero carrega com prioridade.
const Img = ({ pic, alt, sizes, lazy = true, ...rest }) => (
  <img src={pic.src} srcSet={pic.srcSet} sizes={pic.srcSet ? sizes : undefined} width={pic.width} height={pic.height} alt={alt} loading={lazy ? 'lazy' : undefined} decoding="async" {...rest} />
);

const wide = '(min-width: 1024px) 628px, 100vw';
const external = { target: '_blank', rel: 'noopener noreferrer' };

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">Pular para o conteúdo</a>
        <a className="nav__logo" href="#top">
          <span className="mark" data-mark="ring" aria-hidden="true"></span>
          {person.name}
        </a>
        <nav className="nav__links" aria-label="Principal">
          <div className="nav__item"><a className="nav__link" href="#sobre">Sobre</a></div>
          <div className="nav__item"><a className="nav__link" href="#projetos">Projetos</a></div>
          <div className="nav__item">
            <a className="nav__link" href="#robotica">
              Robótica
              <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                <div className="menu-col span-3">
                  <p className="t-label">Provas</p>
                  <a href="#equipes">OBR<span>Quarteto Fantástico</span></a>
                  <a href="#equipes">FLL<span>Equipe Shield</span></a>
                  <a href="#equipes">FTC<span>Vanguard FTC</span></a>
                </div>
                <div className="menu-col span-3">
                  <p className="t-label">Na pista</p>
                  <a href="#robotica">Robô autônomo<span>Python no LEGO SPIKE</span></a>
                  <a href="#robotica">Campeão regional<span>OBR, Norte do Paraná</span></a>
                  <a href="#robotica">Código com a equipe<span>Testes ao lado da pista</span></a>
                </div>
              </div>
            </div>
          </div>
          <div className="nav__item"><a className="nav__link" href="#equipes">Equipes</a></div>
        </nav>
        <div className="nav__actions">
          <a className="btn btn--primary" href={person.whatsapp} {...external}>{mainAction}</a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero hero--split" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="hero__text span-5">
            <p className="hero__kicker"><span className="dot" aria-hidden="true"></span>{hero.kicker}</p>
            <h1 id="hero-h">{hero.title}</h1>
            <p className="hero__lead">{hero.lead}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href={person.whatsapp} {...external}>{mainAction}<Arrow /></a>
              <a className="btn btn--secondary" href="#projetos">Ver projetos</a>
            </div>
          </div>
          <div className="hero__media span-6 start-7">
            <Img pic={hero.photo} alt={hero.photoAlt} sizes={wide} lazy={false} style={{ '--ly-pos': '50% 30%' }} fetchPriority="high" />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="sobre" aria-labelledby="sobre-h">
      <div className="wrap grid grid--top">
        <div className="span-6">
          <div className="section-head"><h2 id="sobre-h">{about.title}</h2></div>
          <p className="t-lead">{about.text}</p>
          <ul className="ic-chip-row about__tools" aria-label="Ferramentas">
            {tools.map(tool => (
              <li key={tool.name} className="ic-chip">
                <img className={`ic ic-20${tool.ink ? ' ic-ink' : ''}`} src={tool.icon} alt="" width="20" height="20" loading="lazy" />
                {tool.name}
              </li>
            ))}
          </ul>
        </div>
        <figure className="develop span-6 start-7" data-moment="picture-develops">
          <Img pic={about.photo} alt={about.photoAlt} sizes={wide} style={{ objectPosition: '45% 50%' }} />
        </figure>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projetos" aria-labelledby="projetos-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="projetos-h">{projects.title}</h2>
          <p>{projects.lead}</p>
        </div>
        <div className="grid">
          {projects.items.map(item => (
            <a key={item.name} className="card card--row card--open span-6" href={item.href} {...(item.href.startsWith('http') ? external : { target: '_blank', rel: 'noopener' })}>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <div className="panel project__panel">
                <Img className="frame__img" pic={item.image} alt={item.imageAlt} sizes={wide} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Robotics() {
  return (
    <section className="section" id="robotica" aria-labelledby="robotica-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="robotica-h">{robotics.title}</h2>
          <p>{robotics.lead}</p>
        </div>
        <div className="grid grid--top fill" data-peek>
          <ul className="rows span-6">
            {robotics.rows.map(row => (
              <li key={row.key} data-peek-to={row.key} tabIndex={0}>
                <span className="rows__name">{row.name}</span>
                <p>{row.text}</p>
                <span className="rows__value">{row.value}</span>
              </li>
            ))}
          </ul>
          <div className="frame frame--photo frame--fill span-6 start-7">
            {robotics.rows.map((row, index) => (
              <Img key={row.key} className="frame__img" data-peek-for={row.key} pic={row.photo} alt={row.photoAlt} sizes={wide} lazy={false} hidden={index > 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Teams() {
  return (
    <section className="section" id="equipes" aria-labelledby="equipes-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="equipes-h">{teams.title}</h2>
          <p>{teams.lead}</p>
        </div>
        <div className="grid">
          {teams.items.map(team => (
            <a key={team.name} className="tile team span-4" href={team.href} {...external}>
              <div className="tile__media"><Img pic={team.logo} alt={team.logoAlt} sizes="(min-width: 1024px) 410px, 200px" /></div>
              <div className="tile__head"><h3>{team.name}</h3></div>
              <p>{team.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer closing g2m" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">{closing.title}</h2>
            <p>{closing.lead}</p>
          </div>
          <a className="btn btn--primary btn--xl" href={person.whatsapp} {...external}>{mainAction}<Arrow /></a>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-6 stack-4">
              <a className="nav__logo" href="#top">
                <span className="mark" data-mark="ring" aria-hidden="true"></span>
                {person.name}
              </a>
              <p className="footer__lede">{closing.lede}</p>
            </div>
            <div className="span-2 footer__col">
              <h3>Seções</h3>
              <ul>
                <li><a href="#sobre">Sobre</a></li>
                <li><a href="#projetos">Projetos</a></li>
                <li><a href="#robotica">Robótica</a></li>
                <li><a href="#equipes">Equipes</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Contato</h3>
              <ul>
                <li><a href={person.whatsapp} {...external}>WhatsApp</a></li>
                <li><a href={`mailto:${person.email}`}>E-mail</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Redes</h3>
              <ul>
                <li><a href={person.github} {...external}>GitHub</a></li>
                <li><a href={person.linkedin} {...external}>LinkedIn</a></li>
                <li><a href={person.instagram} {...external}>Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>&copy; {new Date().getFullYear()} {person.fullName}</span>
            <span>Marcas e logotipos pertencem aos seus donos.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ActionBar() {
  return (
    <nav className="actionbar" aria-label="Ações rápidas">
      <a className="btn btn--primary" href={person.whatsapp} {...external}>{mainAction}</a>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Projects />
        <Robotics />
        <Teams />
      </main>
      <Footer />
      <ActionBar />
    </>
  );
}
