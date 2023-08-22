/**
 * pnpm add -D esbuild-plugins-node-modules-polyfill rollup-plugin-polyfill-node
 */
import nodePolyfills from "rollup-plugin-polyfill-node";
import { defineConfig } from "vite";
import { nodeModulesPolyfillPlugin } from "esbuild-plugins-node-modules-polyfill";
import {nodeResolve} from '@rollup/plugin-node-resolve';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

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
  rollup({
    entry: 'main.js',
    plugins: [
      nodePolyfills( /* options */ )
    ]
  }),
  plugins: [react(), commonjs(), nodePolyfills({
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
    }),],
  resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		}
	},
	build: {
		rollupOptions: {
			plugins: [inject({ Buffer: ['Buffer', 'Buffer'] })],
		},
	},

  
});
