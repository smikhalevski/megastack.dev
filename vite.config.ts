import path from 'node:path';
import { defineConfig } from 'vite';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import { generateClassName } from './generateClassName.js';

export default defineConfig(env => {
  const assetsSrcDir = path.resolve('src/main/assets');
  const isMinified = env.mode !== 'development';

  return {
    root: './src/main',
    build: {
      minify: isMinified,
      cssMinify: isMinified ? 'lightningcss' : false,
      assetsDir: '.',
      outDir: '../../build',
      emptyOutDir: true,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          // entryFileNames: isMinified ? '[hash].js' : undefined,
          // chunkFileNames: isMinified ? '[hash].js' : undefined,
          // assetFileNames: isMinified ? '[hash].[ext]' : undefined,
          manualChunks(id) {
            if (id.startsWith(assetsSrcDir)) {
              return 'assets';
            }
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          warn(warning);
        },
      },
    },
    css: {
      modules: {
        generateScopedName(name, filename) {
          return generateClassName(name, filename, isMinified);
        },
      },
      postcss: {
        plugins: [postcssNested(), autoprefixer()],
      },
    },
    resolve: {
      preserveSymlinks: true,
    },
  };
});
