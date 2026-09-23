# Portfólio — Miguel Marchiori

Landing page em React + Vite com GhostFibers, ParticleText, GlassSurface, GlassIcons, DriftWall, BorderGlow e FluidGlass.

## Deploy no Netlify

- Build command: `npm run build`
- Publish directory: `dist`

## GitHub Pages

O site está publicado em `https://miguelmarchiori.github.io/`.
O deploy é feito pelo GitHub Actions a cada atualização da branch `main`; o build gera os arquivos para a raiz do domínio.

As versões das dependências estão fixadas para evitar alterações automáticas que possam quebrar o deploy.

### Compatibilidade importante

React e React DOM estão fixados em `19.2.0`, compatíveis com `@react-three/fiber 9.7.0`.
Vite está fixado em `8.3.0` e `@vitejs/plugin-react` em `6.1.1`.

## Rodar localmente

```bash
npm install
npm run dev
```
