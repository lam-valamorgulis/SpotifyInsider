import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react";
import notifier from "vite-plugin-notifier";
import nodeGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill';

// https://vitejs.dev/config/
export default {
  plugins: [react(), 
            notifier(),
            GlobalsPolyfills({
              process: true,
              buffer: true,
              global: true,
              dir: false,
            }),
          nodeGlobalsPolyfill()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      /** browserify for @jbrowse/react-linear-genome-view */
      stream: "stream-browserify",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        GlobalsPolyfills({
          process: true,
          buffer: true,
          global: true,
          dir: false,
        }),
        nodeGlobalsPolyfill()
      ],
    },
  },
};
