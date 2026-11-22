# Portfólio — Miguel Marchiori

Portfólio pessoal de Miguel Marchiori da Silva Correia, programador full stack e bolsista de iniciação científica na UTFPR.

**Acesse:** [miguelmarchiori.github.io](https://miguelmarchiori.github.io/)

## O que tem no site

- **Hero:** quem é, o que faz e o botão para falar no WhatsApp.
- **Sobre mim:** a história, as ferramentas (Python, HTML, CSS, PHP, Java, Git, GitHub) e uma foto que aparece como revelação ao rolar.
- **Projetos:** a pesquisa com LEGO SPIKE Prime e o site da Agro Pet Rodrigues, com capturas de tela.
- **Robótica de competição:** o robô, o título regional da OBR e o trabalho com a equipe. As fotos trocam conforme a linha escolhida.
- **Equipes:** Quarteto Fantástico (OBR), Shield (FLL) e Vanguard FTC, com link para o Instagram de cada uma.
- **Contato:** WhatsApp, e-mail, GitHub, LinkedIn e Instagram.

O design segue a skill `design-taste-frontend` (pasta `.claude/skills/`): uma tela por seção, grade única, fotos reais, sem efeitos de fundo. O tema é claro, com o azul do portfólio anterior.

## Como o projeto funciona

O texto e os links ficam em `src/data/content.js`. `src/App.jsx` monta a página em React, mas só durante o build: o Vite troca `<!--app-->` do `index.html` pelo HTML pronto, então o site publicado é HTML puro, sem o React no navegador. Menu, animações de hover e a revelação da foto vêm dos scripts em `public/assets/` (parte da skill, não edite esses arquivos).

```
index.html            cabeçalho, cores e fontes da página
src/App.jsx           as seções
src/data/content.js   textos, links e caminhos das imagens
src/styles.css        o pouco de CSS que é só desta página
vite.config.js        plugin que gera o HTML no build
public/assets/        fotos, logotipos, capturas e arquivos da skill
```

Para trocar uma foto, coloque o arquivo em `public/assets/fotos/` e mude o caminho em `content.js`. Fotos acima de 520px de largura precisam de uma cópia `nome-480.webp` com 480px, usada no celular.

## Executar localmente

É necessário ter Node.js e npm instalados.

```bash
npm install
npm run dev
```

Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

Os arquivos gerados ficam na pasta `dist/`.

## Publicação

O site é publicado no GitHub Pages. O workflow em `.github/workflows/deploy.yml` instala as dependências, executa `npm run build:pages` e publica a pasta `dist/` quando há atualização na branch `main`. Também é possível iniciar a publicação manualmente pela aba **Actions** do GitHub.
