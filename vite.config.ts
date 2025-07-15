import { defineConfig } from 'vite';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import { generateClassName } from './generateClassName';

export default defineConfig(env => {
  const isMinified = env.mode !== 'development';

  return {
    root: './src/main',
    build: {
      minify: isMinified,
      cssMinify: isMinified && 'lightningcss',
      assetsDir: '.',
      outDir: '../../build',
      emptyOutDir: true,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            return id.includes('node_modules') ? 'vendor' : null;
          },
        },
        // onwarn(warning, warn) {
        //   if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        //     return;
        //   }
        //   warn(warning);
        // },
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
