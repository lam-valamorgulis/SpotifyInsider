// import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
// import react from "@vitejs/plugin-react";
// import notifier from "vite-plugin-notifier";
// import nodeGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill';
// import { defineConfig } from 'vite';

// // https://vitejs.dev/config/
// export default defineConfig {
//   plugins: [react(), 
//             notifier()],
//   server: {
//     host: '0.0.0.0',
//   },
//   resolve: {
//     alias: {
//       /** browserify for @jbrowse/react-linear-genome-view */
//       stream: "stream-browserify",
//     },
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       // Node.js global to browser globalThis
//       define: {
//         global: "globalThis",
//       },
//       // Enable esbuild polyfill plugins
//       plugins: [
//         GlobalsPolyfills({
//           process: true,
//           buffer: true,
//         }),
//         nodeGlobalsPolyfill()
//       ],
//       define: {
//         global: 'globalThis',
//       },
//     },
//   },
// };

import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// yarn add --dev @esbuild-plugins/node-modules-polyfill
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
// You don't need to add this to deps, it's included by @esbuild-plugins/node-modules-polyfill
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
// @ts-ignore
import path from 'path';
// @ts-ignore
import svgrPlugin from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    EnvironmentPlugin(
      {
        REACT_APP_BLOCKCHAIN_BASE_URL: undefined,
        STATE: undefined,
      },
      { loadEnvFiles: true }
    ),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    ,
    react(),
    rollupNodePolyFill(),
  ],
  resolve: {
    alias: {
      // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
      // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
      // process and buffer are excluded because already managed
      // by node-globals-polyfill
      util: 'util/util',
 
      sys: 'rollup-plugin-node-polyfills/polyfills/util',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      // string_decoder: 'rollup-plugin-node-polyfills/polyfills/string-decoder', // throwing me an error
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/http',
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      constants: 'rollup-plugin-node-polyfills/polyfills/constants',
      _stream_duplex:
        'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
      _stream_passthrough:
        'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
      _stream_readable:
        'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
      _stream_writable:
        'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
      _stream_transform:
        'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
      timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      console: 'rollup-plugin-node-polyfills/polyfills/console',
      vm: 'rollup-plugin-node-polyfills/polyfills/vm',
      zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      tty: 'rollup-plugin-node-polyfills/polyfills/tty',
      domain: 'rollup-plugin-node-polyfills/polyfills/domain',
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});

