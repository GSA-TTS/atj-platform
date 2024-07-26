import esbuild from 'esbuild';

esbuild
  .build({
    bundle: true,
    entryPoints: ['./src/handler.ts'],
    format: 'esm',
    minify: true,
    outdir: './dist',
    packages: 'external',
    platform: 'node',
    sourcemap: true,
    target: 'esnext',
    tsconfig: './tsconfig.build.json',
  })
  .catch(() => process.exit(1));
