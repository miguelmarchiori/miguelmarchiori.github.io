import { SiPython, SiHtml5, SiPhp, SiOpenjdk } from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa6';

export const portfolio = {
  name: 'Miguel Marchiori da Silva Correia',
  shortName: 'Miguel Marchiori',
  role: 'Programador Júnior',
  location: 'Brasil',
  availability: 'Web design · robótica · automação',
  headline: 'Transformo ideias em código, protótipos e soluções práticas.',
  bio: 'Programador júnior com experiência em web design, robótica e automação. Trabalho principalmente com Python, HTML, CSS e PHP, enquanto sigo evoluindo em Java. Também atuo como programador principal em equipes de competição de robótica.',
  email: 'marchioritimoteo@gmail.com',
  github: 'https://github.com/miguelmarchiori',
  linkedin: 'https://www.linkedin.com/in/miguel-marchiori-da-silva-correia-a4753442b/',
  instagram: 'https://instagram.com/mg_marchiori',
  whatsapp: 'https://wa.me/5543988337338',
  phone: '+55 (43) 98833-7338',
  cv: 'https://www.linkedin.com/in/miguel-marchiori-da-silva-correia-a4753442b/',
  stats: [
    { value: '03', label: 'modalidades de robótica' },
    { value: '01', label: 'campeonato regional OBR' },
    { value: '05+', label: 'linguagens / tecnologias' }
  ]
};

export const skills = [
  { label: 'Python', value: 'Programação' },
  { label: 'HTML', value: 'Web' },
  { label: 'CSS', value: 'Web' },
  { label: 'PHP', value: 'Web' },
  { label: 'Java', value: 'Aprendendo' },
  { label: 'Web Design', value: 'Design' },
  { label: 'Robótica', value: 'Competição' },
  { label: 'Automação', value: 'Projetos' },
  { label: 'Git / GitHub', value: 'Ferramentas' }
];

export const skillWall = [
  { title: 'Python', icon: SiPython, accent: '#3776AB' },
  { title: 'HTML5', icon: SiHtml5, accent: '#E34F26' },
  { title: 'CSS3', icon: FaCss3Alt, accent: '#1572B6' },
  { title: 'PHP', icon: SiPhp, accent: '#777BB4' },
  { title: 'Java', icon: SiOpenjdk, accent: '#E76F00' }
];

export const areas = [
  'Web Design',
  'Robótica',
  'Automação',
  'Programação',
  'Projetos de competição'
];

export const experience = [
  {
    period: 'OBR · REGIONAL',
    role: 'Programador principal · Quarteto Fantástico',
    company: '@quartetofantastico_sesi',
    description: 'Campeão regional do Norte do Paraná e duas participações na etapa estadual da Olimpíada Brasileira de Robótica.'
  },
  {
    period: 'FLL · REGIONAL',
    role: 'Programador principal · Shield',
    company: '@equip_shield · First LEGO League Paraná',
    description: 'Participação na etapa regional do Paraná, atuando na programação e no desenvolvimento das soluções da equipe.'
  },
  {
    period: 'FTC · EQUIPE',
    role: 'Programador principal · Vanguard FTC',
    company: '@vanguardftc_',
    description: 'Atuação como programador principal na equipe, contribuindo com código, automação e integração dos sistemas do robô.'
  }
];
