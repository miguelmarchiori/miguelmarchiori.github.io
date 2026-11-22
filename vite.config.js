import { createServer, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// A página é escrita em React (src/App.jsx + src/data/content.js), mas o site publicado
// é HTML puro: o React roda só no build e troca <!--app--> do index.html pelo markup pronto.
function prerender() {
  let ssr;
  const load = async () => {
    ssr ??= await createServer({
      configFile: false,
      appType: 'custom',
      logLevel: 'silent',
      server: { middlewareMode: true, hmr: false },
      optimizeDeps: { noDiscovery: true },
      plugins: [react()]
    });
    return ssr.ssrLoadModule('/src/App.jsx');
  };
  return {
    name: 'prerender-app',
    async transformIndexHtml(html) {
      const { default: App } = await load();
      return html.replace('<!--app-->', renderToStaticMarkup(createElement(App)));
    },
    handleHotUpdate({ file, server }) {
      if (!file.includes('/src/')) return;
      ssr?.moduleGraph.invalidateAll();
      server.ws.send({ type: 'full-reload' });
      return [];
    },
    async closeBundle() {
      await ssr?.close();
      ssr = undefined;
    }
  };
}

export default defineConfig({
  plugins: [prerender()],
  build: { modulePreload: { polyfill: false } }
});
