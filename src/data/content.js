// Todo o texto e todos os links do portfólio ficam aqui.
// Para trocar uma foto, coloque o arquivo em public/assets/fotos e mude o caminho abaixo.

// Uma imagem com tamanho natural; acima de 520px de largura ganha uma versão de 480px para o celular.
const pic = (src, width, height) => ({
  src,
  width,
  height,
  srcSet: width > 520 ? `${src.replace('.webp', '-480.webp')} 480w, ${src} ${width}w` : undefined
});

export const person = {
  name: 'Miguel Marchiori',
  fullName: 'Miguel Marchiori da Silva Correia',
  email: 'marchioritimoteo@gmail.com',
  whatsapp: 'https://wa.me/5543988337338',
  github: 'https://github.com/miguelmarchiori',
  linkedin: 'https://www.linkedin.com/in/miguel-marchiori-da-silva-correia-a4753442b/',
  instagram: 'https://instagram.com/mg_marchiori'
};

export const mainAction = 'Falar no WhatsApp';

export const hero = {
  kicker: 'Bolsista de iniciação científica na UTFPR',
  title: 'Programador full stack de sites e robôs',
  lead: 'Faço sites em HTML, CSS e PHP e programo robôs em Python. Campeão regional da OBR no Norte do Paraná e programador principal em 3 equipes.',
  photo: pic('/assets/fotos/miguel-equipe.webp', 820, 778),
  photoAlt: 'Miguel sorrindo de uniforme da equipe, mostrando quatro dedos'
};

export const about = {
  title: 'Sobre mim',
  text: 'Tenho interesse por tecnologia desde cedo e gosto de ver ideias saírem do papel, num site, num código ou num robô. A robótica me ensinou a trabalhar em equipe e a resolver problemas sob pressão. Hoje estudo Java e web design e quero cursar engenharia da computação.',
  photo: pic('/assets/fotos/miguel-programando.webp', 1000, 1501),
  photoAlt: 'Miguel de uniforme da equipe programando no notebook durante uma competição'
};

export const tools = [
  { name: 'Python', icon: '/assets/icons/python.svg' },
  { name: 'HTML5', icon: '/assets/icons/html-5.svg' },
  { name: 'CSS', icon: '/assets/icons/css.svg' },
  { name: 'PHP', icon: '/assets/icons/php.svg' },
  { name: 'Java', icon: '/assets/icons/java.svg' },
  { name: 'Git', icon: '/assets/icons/git-icon.svg' },
  { name: 'GitHub', icon: '/assets/icons/github.svg', ink: true }
];

export const projects = {
  title: 'Projetos',
  lead: 'Uma pesquisa de iniciação científica e um site para um cliente real.',
  items: [
    {
      name: 'Robô autônomo em Python',
      text: 'Pesquisa com LEGO SPIKE Prime para a categoria Resgate da OBR, com sete meses de desenvolvimento.',
      image: pic('/assets/projetos-img/pesquisa-lego-spike.webp', 1280, 768),
      imageAlt: 'Primeira página do documento da pesquisa, com o resumo do trabalho',
      href: '/documento-robo-lego-spike-prime.html',
      action: 'Ler a pesquisa'
    },
    {
      name: 'Site da Agro Pet Rodrigues',
      text: 'Site institucional de uma loja em Apucarana, com serviços, avaliações e contato pelo WhatsApp.',
      image: pic('/assets/projetos-img/agro-pet-rodrigues.webp', 1280, 768),
      imageAlt: 'Página inicial do site da Agro Pet Rodrigues',
      href: 'https://agro-pet-rodrigues.vercel.app',
      action: 'Visitar o site'
    }
  ]
};

export const robotics = {
  title: 'Robótica de competição',
  lead: 'Código, sensores e testes até o robô funcionar na pista.',
  rows: [
    {
      key: 'robo',
      name: 'Robô autônomo',
      text: 'Python no LEGO SPIKE Prime, com seguidor de linha e sensores de cor.',
      value: 'Python',
      photo: pic('/assets/fotos/robo-lego-spike.webp', 480, 640),
      photoAlt: 'Robô LEGO com sensores, montado sobre uma mesa na quadra da competição'
    },
    {
      key: 'titulo',
      name: 'Campeão regional',
      text: 'Norte do Paraná na OBR, com o nono lugar na etapa estadual.',
      value: 'OBR',
      photo: pic('/assets/fotos/medalhas-obr.webp', 480, 640),
      photoAlt: 'Três medalhas douradas da Olimpíada Brasileira de Robótica'
    },
    {
      key: 'equipe',
      name: 'Código com a equipe',
      text: 'Testes e ajustes ao lado da pista, com o notebook aberto.',
      value: 'Equipe',
      photo: pic('/assets/fotos/equipe-na-pista.webp', 799, 1200),
      photoAlt: 'Integrantes de uma equipe de robótica sentados no chão, um deles programando no notebook'
    }
  ]
};

export const teams = {
  title: 'Equipes',
  lead: 'Programador principal em 3 equipes de competição.',
  items: [
    {
      name: 'Quarteto Fantástico',
      text: 'OBR. Campeão regional do Norte do Paraná e duas vezes na etapa estadual.',
      logo: pic('/assets/equipes/quarteto-fantastico.webp', 960, 960),
      logoAlt: 'Logotipo da equipe Quarteto Fantástico',
      href: 'https://www.instagram.com/quartetofantastico_sesi/'
    },
    {
      name: 'Shield',
      text: 'FIRST LEGO League. Etapa regional do Paraná, com as soluções da equipe.',
      logo: pic('/assets/equipes/shield.webp', 320, 320),
      logoAlt: 'Logotipo da equipe Shield',
      href: 'https://www.instagram.com/equip_shield/'
    },
    {
      name: 'Vanguard FTC',
      text: 'FIRST Tech Challenge. Código, automação e integração dos sistemas do robô.',
      logo: pic('/assets/equipes/vanguard-ftc.webp', 960, 960),
      logoAlt: 'Logotipo da equipe Vanguard FTC',
      href: 'https://www.instagram.com/vanguardftc_/'
    }
  ]
};

export const closing = {
  title: 'Fale comigo sobre um projeto',
  lead: 'Respondo pelo WhatsApp ou por e-mail.',
  lede: 'Programador full stack de sites e robôs.'
};
