import { execSync } from 'child_process';

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const BASEURL = process.env.BASEURL || '/';
const GITHUB = {
  owner: process.env.OWNER || 'gsa-tts',
  repository: process.env.REPOSITORY || 'atj-platform',
  branch: process.env.BRANCH || 'main',
  commit: execSync('git rev-parse HEAD').toString().trim(),
};

const DEPLOYMENT_ID =
  process.env.NODE_ENV === 'development'
    ? 'local'
    : `${GITHUB.owner}:${GITHUB.branch}`;

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ['src/components/react/**'],
    }),
  ],
  vite: {
    define: {
      'import.meta.env.DEPLOYMENT_ID': JSON.stringify(DEPLOYMENT_ID),
      'import.meta.env.GITHUB': JSON.stringify(GITHUB),
    },
  },
});
