# Portfólio — Miguel Marchiori

Landing page em React + Vite, otimizada para ficar mais leve mesmo usando os efeitos do React Bits.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- O projeto inclui `netlify.toml` com essa configuração.

## Onde editar as informações

A maior parte do conteúdo pessoal está em `src/data/content.js`.

A foto enviada está em `public/assets/miguel.png`.

Os placeholders dos projetos estão em `src/data/content.js` e as imagens temporárias ficam em `public/assets/projects/`.

## Informações já preenchidas

- Nome: Miguel Marchiori da Silva Correia
- Cargo: Programador Júnior
- Experiência: web design, robótica e automação
- Tecnologias: Python, HTML, CSS, PHP e Java (aprendendo)
- OBR: campeão regional do Norte do Paraná + duas participações no estadual
- FLL: participação na regional do Paraná
- FTC: equipe Vanguard FTC
- Papel: programador principal nas equipes citadas
- GitHub: https://github.com/redmpy
- LinkedIn: https://www.linkedin.com/in/miguel-marchiori-da-silva-correia-a4753442b/
- Instagram: https://instagram.com/mg_marchiori
- WhatsApp: https://wa.me/5543988337338

## Otimizações de desempenho

- GhostFibers limitado a 30 FPS e DPR 0.75 no hero.
- GhostFibers para de animar quando sai da tela.
- ParticleText limitado a ~1500 partículas e 30 FPS, além de pausar fora da viewport.
- DriftWall pausa a animação fora da viewport.
- Imagens do mural e projetos são locais e leves, sem chamadas ao Unsplash.
- O segundo GhostFibers da seção de contato foi removido e substituído por gradientes CSS.
- Blur das superfícies de vidro foi reduzido.
- Fontes externas do Google Fonts foram removidas.
- `@vitejs/plugin-react` e `vite` estão fixados em versões compatíveis.
