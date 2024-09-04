import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';

import { getGithubRepository } from './src/lib/github';

const githubRepository = await getGithubRepository(process.env);

console.log('******', process.env.BASEURL);
console.log('******', addTrailingSlash(process.env.BASEURL || ''));

// https://astro.build/config
export default defineConfig({
  output: 'server',
  trailingSlash: 'never',
  base: addTrailingSlash(process.env.BASEURL || ''),
  adapter: node({
    mode: 'middleware',
  }),
  integrations: [
    react({
      include: ['src/components/react/**'],
    }),
  ],
  security: {
    checkOrigin: true,
  },
  server: {
    port: 4322,
  },
  vite: {
    define: {
      'import.meta.env.GITHUB': JSON.stringify(githubRepository),
    },
  },
});

function addTrailingSlash(path) {
  var lastChar = path.substr(-1);
  if (lastChar === '/') {
    return path;
  }
  return path + '/';
}
