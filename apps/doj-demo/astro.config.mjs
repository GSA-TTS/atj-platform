import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',
  base: addTrailingSlash(process.env.BASEURL || ''),
  integrations: [
    react({
      include: ['src/components/react/**'],
    }),
  ],
});

function addTrailingSlash(path) {
  var lastChar = path.substr(-1);
  if (lastChar === '/') {
    return path;
  }
  return path + '/';
}
