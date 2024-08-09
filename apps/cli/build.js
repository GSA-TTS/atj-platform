const esbuild = require('esbuild');

esbuild
  .build({
    bundle: true,
    entryPoints: ['./src/index.ts'],
    format: 'cjs',
    minify: true,
    outdir: './dist',
    platform: 'node',
    sourcemap: true,
    target: 'es2020',
  })
  .catch(() => process.exit(1));
