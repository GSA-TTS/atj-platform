import { builtinModules } from 'module';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json' assert { type: 'json' };

export default {
  input: ['src/index.ts', 'src/testing.ts'],
  output: [
    {
      dir: 'dist/esm',
      format: 'esm',
      sourcemap: true,
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
  ],
  external: (() => {
    const dependencies = Object.keys(pkg.dependencies || {});
    const devDependencies = Object.keys(pkg.devDependencies || {});
    const builtins = builtinModules;
    return [...new Set([...dependencies, ...devDependencies, ...builtins])];
  })(),
};
