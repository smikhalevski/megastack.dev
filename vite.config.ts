import * as path from 'node:path';
import { defineConfig } from 'vite';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import crypto from 'crypto';
import { imagetools } from 'vite-imagetools';
import { minify } from 'html-minifier-terser';

export default defineConfig(env => {
  const assetsSrcDir = path.resolve('src/main/assets');
  const isDev = env.mode === 'development';

  return {
    root: './src/main',
    build: {
      minify: isDev ? false : 'esbuild',
      cssMinify: isDev ? false : 'lightningcss',
      assetsDir: '.',
      outDir: '../../build',
      emptyOutDir: true,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          entryFileNames: isDev ? undefined : '[hash].js',
          chunkFileNames: isDev ? undefined : '[hash].js',
          assetFileNames: isDev ? undefined : '[hash].[ext]',
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
    esbuild: {
      legalComments: 'none',
    },
    css: {
      modules: {
        generateScopedName(name, fileName) {
          return generateClassName(name, fileName, isDev);
        },
      },
      postcss: {
        plugins: [postcssNested(), autoprefixer()],
      },
    },
    resolve: {
      preserveSymlinks: true,
    },
    plugins: [
      imagetools(),
      {
        name: 'minify-html',
        transformIndexHtml: {
          order: 'post',
          handler(html) {
            if (isDev) {
              return html;
            }

            return minify(html, {
              minifyCSS: true,
              minifyJS: true,
              collapseWhitespace: true,
            });
          },
        },
      },
    ],
  };
});

const HASH_LENGTH = 4;

export function generateClassName(name: string, fileName: string, isDev: boolean): string {
  const hash = crypto
    .createHash('sha256')
    .update(name + fileName)
    .digest('base64')
    .replace(/\W/g, '');

  if (isDev) {
    return name + '_' + hash.substring(0, HASH_LENGTH);
  }

  if (hash.charCodeAt(0) < 65 /*A*/) {
    return String.fromCharCode(hash.charCodeAt(0) + 65 /*A*/ - 48 /*0*/) + hash.substring(1, HASH_LENGTH);
  }

  return hash.substring(0, HASH_LENGTH);
}
