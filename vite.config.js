/**
 * pnpm add -D esbuild-plugins-node-modules-polyfill rollup-plugin-polyfill-node
 */
import nodePolyfills from "rollup-plugin-polyfill-node";
import { defineConfig } from "vite";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import {nodeResolve} from '@rollup/plugin-node-resolve';

export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      // Enable esbuild polyfill plugins
      plugins: [nodeModulesPolyfillPlugin()],
    },
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
  plugins: [
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        'fs', // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  plugins: [react(), commonjs(), nodePolyfills()],
  resolve: {
    alias: {
        process: "process/browser",
        buffer: "buffer",
        crypto: "crypto-browserify",
        stream: "stream-browserify",
        assert: "assert",
        http: "stream-http",
        https: "https-browserify",
        os: "os-browserify",
        url: "url",
        util: "util",
    },
  },
});
