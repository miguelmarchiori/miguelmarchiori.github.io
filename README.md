# Portfólio — Miguel Marchiori

Portfólio pessoal de Miguel Marchiori da Silva Correia, programador júnior e bolsista de iniciação científica na UTFPR. O site reúne sua trajetória em desenvolvimento web, robótica competitiva e automação.

**Acesse:** [miguelmarchiori.github.io](https://miguelmarchiori.github.io/)

## Sobre o portfólio

O site apresenta:

- Uma introdução pessoal com links para GitHub e contato.
- Uma seção sobre a trajetória e o interesse por tecnologia.
- Experiências em robótica nas modalidades OBR, FLL e FTC.
- Tecnologias e áreas de atuação, incluindo Python, HTML, CSS, PHP, Java, web design e automação.
- Projetos, como a pesquisa de robô LEGO SPIKE Prime para a OBR e o site Agro Pet Rodrigues.
- Opções de tema claro e escuro e layout adaptado para dispositivos móveis.

## Tecnologias

- React 19 e Vite 8
- JavaScript e CSS
- Motion
- Three.js, React Three Fiber e Drei
- OGL, Matter.js e React Icons

## Executar localmente

É necessário ter Node.js e npm instalados.

```bash
npm install
npm run dev
```

O Vite inicia o servidor local e informa o endereço para abrir no navegador.

Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

Os arquivos gerados ficam na pasta `dist/`.

## Publicação

O site é publicado no GitHub Pages. O workflow em `.github/workflows/deploy.yml` instala as dependências, executa `npm run build:pages` e publica a pasta `dist/` quando há atualização na branch `main`. Também é possível iniciar a publicação manualmente pela aba **Actions** do GitHub.

O repositório inclui configuração para Netlify em `netlify.toml`; nesse provedor, o comando de build é `npm run build` e a pasta publicada é `dist`.
