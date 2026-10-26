import { SiPython, SiHtml5, SiPhp, SiOpenjdk } from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa6';

export const portfolio = {
  name: 'Miguel Marchiori da Silva Correia',
  shortName: 'Miguel Marchiori',
  role: 'Programador Júnior',
  location: 'Brasil',
  availability: 'Web design · robótica · automação',
  headline: 'Transformo ideias em código, protótipos e soluções práticas.',
  bio: 'Sou programador em formação e bolsista de iniciação científica na UTFPR. Desenvolvo projetos de programação web, robótica e automação, com experiência em Python, HTML, CSS e PHP e evolução contínua em Java. Fui campeão regional do Norte do Paraná na Olimpíada Brasileira de Robótica e atuo como programador principal em equipes de competição. Programar é minha paixão.',
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

export const projects = [
  {
    name: 'Pesquisa LEGO SPIKE Prime — OBR',
    category: 'Iniciação científica',
    description: 'Documento completo da pesquisa sobre o desenvolvimento de um robô autônomo em Python com LEGO SPIKE Prime para a categoria Resgate da OBR, com imagens do robô, metodologia, resultados e descrição da máquina de estados.',
    url: '/documento-robo-lego-spike-prime.pdf',
    previewUrl: '/documento-robo-lego-spike-prime.pdf',
    type: 'pdf',
    technologies: ['Python', 'LEGO SPIKE Prime', 'OBR']
  },
  {
    name: 'Agro Pet Rodrigues',
    category: 'Desenvolvimento web',
    description: 'Site institucional para apresentar a empresa, sua identidade e seus serviços em uma presença digital clara e acessível.',
    url: 'https://agro-pet-rodrigues.vercel.app',
    technologies: ['Web Design', 'Frontend', 'Responsivo']
  }
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
