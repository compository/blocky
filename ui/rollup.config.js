import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import builtins from 'rollup-plugin-node-builtins';
import url from 'postcss-url';

const pkg = require('./package.json');

export default {
  input: `src/index.ts`,
  output: [{ dir: 'dist', format: 'es', sourcemap: true }],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash-es')
  watch: {
    include: 'src/**',
  },
  external: [
    Object.keys(pkg.dependencies).filter(key => !key.includes('grapesjs')),
  ],
  plugins: [
    replace({
      global: 'window',
      'process.env.NODE_ENV': '"production"',
      'process.env.CONDUCTOR_URL': process.env.CONDUCTOR_URL
        ? `"${process.env.CONDUCTOR_URL}"`
        : 'undefined',
    }),
    postcss({
      inject: false,
      plugins: [
        url({
          url: 'inline', // enable inline assets using base64 encoding
        }),
      ],
    }),
    postcssLit(),
    typescript({}),
    resolve({
      dedupe: ['lit-html', 'lit-element'],
    }),
    commonjs({
      include: [
        'node_modules/grapesjs/**/*',
        'node_modules/grapesjs-preset-webpage/**/*',

        'node_modules/isomorphic-ws/**/*',
        'node_modules/@msgpack/**/*',
        'node_modules/@holochain/conductor-api/**/*',
      ],
    }),
    builtins(),
  ],
};
