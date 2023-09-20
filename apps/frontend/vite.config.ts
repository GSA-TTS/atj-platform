import { execSync } from 'child_process';

import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

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

// https://vitejs.dev/config/
export default defineConfig({
  base: BASEURL,
  css: {
    preprocessorOptions: {
      scss: {
        //additionalData: `$injectedColor: orange;`,
        includePaths: [
          './node_modules/@uswds',
          './node_modules/@uswds/uswds/packages',
        ],
      },
    },
  },
  define: {
    'import.meta.env.DEPLOYMENT_ID': JSON.stringify(DEPLOYMENT_ID),
    'import.meta.env.GITHUB': JSON.stringify(GITHUB),
  },
  plugins: [react()],
  test: {
    exclude: [...configDefaults.exclude, '**/tests/**'],
  },
});
