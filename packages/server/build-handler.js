import esbuild from 'esbuild';

esbuild
  .build({
    bundle: false,
    entryPoints: ['./handler.ts'],
    packages: 'external',
    format: 'esm',
    minify: false,
    outdir: './dist',
    platform: 'node',
    sourcemap: true,
    target: 'es2020',
  })
  .catch(() => process.exit(1));
