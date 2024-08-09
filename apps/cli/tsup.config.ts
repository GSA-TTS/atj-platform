import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  target: 'es2020',
  minify: true,
  sourcemap: true,
  clean: true,
  bundle: true,
});
