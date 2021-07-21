import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { emptyDirectories } from 'rollup-plugin-app-utils';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
const useServe = process.env.ROLLUP_SERVE === 'true';
const port = process.env.ROLLUP_PORT || 8000;
const output = useServe ? '.serve' : 'dist';

export default [
  {
    input: 'src/index.js',
    plugins: [
      emptyDirectories(output),
      resolve({ jsnext: true, preferBuiltins: true, browser: true }),
      commonjs(),
      json(),
      babel({ babelHelpers: 'bundled', presets: ['@babel/env'] }),
      terser(),
    ].concat(useServe ? [serve({ host: 'localhost', port: port, contentBase: [output] })] : []),
    output: {
      name: 'JawgJSLoader',
      file: `${output}/jawg-js-loader.js`,
      sourcemap: useServe,
      format: 'umd',
    },
  },
];
