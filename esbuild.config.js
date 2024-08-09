module.exports = {
  target: 'esnext',
  format: 'esm',
  bundle: true,
  minify: true,
  external: [],
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
  },
  outdir: 'dist',
};
