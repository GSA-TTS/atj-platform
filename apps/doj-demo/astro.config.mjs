import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  trailingSlash: 'always',
  base: addTrailingSlash(process.env.BASEURL || ''),
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    react({
      include: ['src/components/react/**'],
    }),
  ],
  server: {
    port: 4322,
  },
});

function addTrailingSlash(path) {
  var lastChar = path.substr(-1);
  if (lastChar === '/') {
    return path;
  }
  return path + '/';
}
