import esbuild from 'esbuild';

esbuild
  .build({
    bundle: false,
    entryPoints: ['./src/index.ts'],
    //external: ['sqlite3', 'knex'],
    packages: 'external',
    format: 'esm',
    minify: true,
    outdir: './dist',
    platform: 'node',
    sourcemap: true,
    target: 'es2020',
  })
  .catch(() => process.exit(1));
