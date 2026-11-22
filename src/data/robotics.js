// Equipes de robótica: textos, fotos e vídeos.
//
// Para acrescentar uma foto, coloque o arquivo em public/assets/robotica e inclua um item em `slides`:
//   { type: 'photo', src: '/assets/robotica/arquivo.webp', alt: 'o que a foto mostra', pos: '50% 30%' }
// `pos` é o ponto da foto que fica no centro quando ela é cortada (horizontal e vertical).
//
// Para um vídeo em arquivo (mp4), coloque em public/assets/robotica e use:
//   { type: 'video', src: '/assets/robotica/arquivo.mp4', poster: '/assets/robotica/capa.webp', alt: '...' }
// Para um vídeo do YouTube:
//   { type: 'youtube', id: 'CODIGO_DO_VIDEO', poster: '/assets/robotica/capa.webp', alt: '...' }
// Para um vídeo que só existe no Instagram, o visor mostra a capa e abre o post em outra aba:
//   { type: 'link', href: 'https://www.instagram.com/p/...', poster: '/assets/robotica/capa.webp', label: 'Ver vídeo no Instagram', alt: '...' }

const foto = nome => `/assets/robotica/${nome}.webp`;

export const robotics = [
  {
    id: 'obr',
    short: 'OBR',
    name: 'Olimpíada Brasileira de Robótica',
    logo: '/assets/img/quarteto-fantastico.webp',
    logoAlt: 'Logotipo da equipe Quarteto Fantástico',
    tone: '#12315c',
    cardLabel: 'Campeão regional · Norte do Paraná',
    cardText: 'Programador principal do Quarteto Fantástico. Duas participações na etapa estadual da Olimpíada Brasileira de Robótica.',
    intro: 'Competição de robôs autônomos, com etapas regional, estadual e nacional.',
    how: 'Na categoria Resgate, cada equipe leva um robô autônomo a um percurso e ele precisa se virar sozinho: seguir a linha, reconhecer cores e desviar de obstáculos. A disputa começa na etapa regional, passa pela estadual e termina na nacional.',
    role: 'Programo o robô do Quarteto Fantástico. O código é em Python, para o LEGO SPIKE Prime, e usa controle proporcional para seguir a linha.',
    result: 'Campeões regionais no Norte do Paraná e 9º lugar na etapa estadual.',
    links: [
      { label: 'Ler a pesquisa', href: '/documento-robo-lego-spike-prime.html' },
      { label: 'Ver o Instagram da equipe', href: 'https://www.instagram.com/quartetofantastico_sesi/' }
    ],
    slides: [
      { type: 'photo', src: foto('obr-equipe-na-pista'), alt: 'Equipe de robótica sentada no chão ao lado da pista, com um integrante programando no notebook', pos: '50% 30%' },
      { type: 'photo', src: foto('obr-robo-lego-spike'), alt: 'Robô LEGO com sensores montado sobre uma mesa', pos: '50% 45%' },
      { type: 'photo', src: foto('obr-medalhas-obr'), alt: 'Três medalhas douradas da Olimpíada Brasileira de Robótica', pos: '50% 50%' },
      { type: 'photo', src: foto('obr-programando'), alt: 'Miguel de uniforme da equipe programando no notebook durante uma competição', pos: '45% 50%' }
    ]
  },
  {
    id: 'fll',
    short: 'FLL',
    name: 'FIRST LEGO League',
    logo: '/assets/img/shield.webp',
    logoAlt: 'Logotipo da equipe Shield',
    tone: '#233a5c',
    cardLabel: 'First LEGO League · Paraná',
    cardText: 'Programador principal da equipe Shield, participando da etapa regional e desenvolvendo soluções com a equipe.',
    intro: 'Competição internacional em que estudantes programam um robô de LEGO para cumprir missões.',
    how: 'A equipe monta e programa um robô de LEGO que cumpre missões num tapete, em rodadas curtas. Além do robô, apresenta um projeto de inovação, e os jurados também avaliam os valores da FIRST, como o trabalho em equipe.',
    role: 'Sou o programador principal da equipe Shield. Participamos da etapa regional do Paraná.',
    result: '',
    links: [{ label: 'Ver o Instagram da equipe', href: 'https://www.instagram.com/equip_shield/' }],
    slides: []
  },
  {
    id: 'ftc',
    short: 'FTC',
    name: 'FIRST Tech Challenge',
    logo: '/assets/img/vanguard-ftc.webp',
    logoAlt: 'Logotipo da equipe Vanguard FTC',
    tone: '#3a2466',
    cardLabel: 'Vanguard FTC',
    cardText: 'Programador principal, contribuindo com código, automação e integração dos sistemas do robô.',
    intro: 'Competição em que a equipe projeta, constrói e programa o próprio robô para partidas de duas equipes contra duas.',
    how: 'O robô tem estrutura metálica e é feito pela própria equipe. Cada partida tem uma parte autônoma e outra em que os pilotos controlam o robô. A programação é em Java ou em blocos.',
    role: 'Sou o programador principal da Vanguard FTC. Escrevo o código, a automação e a integração dos sistemas do robô.',
    result: '',
    links: [{ label: 'Ver o Instagram da equipe', href: 'https://www.instagram.com/vanguardftc_/' }],
    slides: [
      { type: 'photo', src: foto('ftc-1'), alt: 'Dois integrantes da Vanguard FTC de óculos de proteção, cada um com um controle na mão, ao lado do campo', pos: '50% 16%' },
      { type: 'photo', src: foto('ftc-2'), alt: 'Integrante da Vanguard FTC de costas, com o uniforme do nome Marchiori e o número 11', pos: '50% 43%' },
      { type: 'photo', src: foto('ftc-3'), alt: 'Integrantes da Vanguard FTC de óculos de proteção e uniforme, em pé, ao lado do campo', pos: '50% 6%' },
      { type: 'video', src: '/assets/robotica/ftc-video.mp4', poster: foto('ftc-video-capa'), fit: 'contain', label: 'Vídeo', alt: 'Vídeo de uma partida da FTC, com os robôs no campo e a plateia ao redor' }
    ]
  }
];
