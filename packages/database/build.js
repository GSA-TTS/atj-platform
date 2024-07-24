import esbuild from 'esbuild';

esbuild
  .build({
    //bundle: true,
    entryPoints: ['./src/index.ts', './src/services/index.ts'],
    format: 'esm',
    minify: true,
    outdir: './dist',
    platform: 'node',
    sourcemap: true,
    target: 'es2020',
  })
  .catch(() => process.exit(1));
