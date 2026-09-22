# Portfólio moderno para programador

Landing page em React + Vite usando os componentes enviados do React Bits/adaptações locais:

- GhostFibers — fundo WebGL do hero
- ParticleText — nome principal em partículas
- BorderGlow — cards de projetos com glow nas bordas
- GlassSurface — superfícies de vidro
- DriftWall — mural 3D para tecnologias
- FolderFloat — pasta interativa para a stack

## Rodando

```bash
npm install
npm run dev
```

## Onde editar

O conteúdo principal está em `src/data/content.js`.

Substitua os valores como `[SEU NOME]`, `[SEU CARGO / ESPECIALIDADE]`, `[PROJETO 01]` etc.

Os links sociais, e-mail, currículo, projetos, experiências e tecnologias também ficam nesse arquivo.

## Build

```bash
npm run build
```

Depois, publique a pasta `dist` em Netlify, Vercel, GitHub Pages ou outro host compatível.


### Deploy no Netlify

O projeto usa versões fixadas e compatíveis para evitar o conflito entre Vite e `@vitejs/plugin-react`:

- `vite`: `8.3.0`
- `@vitejs/plugin-react`: `6.1.1`

Configuração do Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

Não use `@vitejs/plugin-react: "latest"`, porque uma nova versão pode alterar os requisitos de peer dependency.
