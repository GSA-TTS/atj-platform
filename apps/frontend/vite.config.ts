import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
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
  plugins: [react()],
  test: {
    exclude: [...configDefaults.exclude, '**/tests/**'],
  },
});
