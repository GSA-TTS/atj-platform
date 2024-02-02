import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import { getGithubRepository } from './src/lib/github';

const githubRepository = await getGithubRepository(process.env);

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',
  base: addTrailingSlash(process.env.BASEURL || ''),
  integrations: [
    react({
      include: ['src/components/react/**'],
    }),
  ],
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
