import * as fs from 'node:fs';
import * as path from 'node:path';
import { unified } from 'unified';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeStarryNight from 'rehype-starry-night';
import rehypeGithubAlert from 'rehype-github-alert';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import prettier from 'prettier';
import * as starryNight from '@wooorm/starry-night';

const CACHE_DIR = 'node_modules/.megastack_cache';

const prettierConfig = await prettier.resolveConfig('package.json');

const tsPrettierConfig = { ...prettierConfig, parser: 'typescript' };

const repoInfos = await Promise.all([
  getRepoInfo({ repo: 'smikhalevski/react-executor', branch: 'streaming-hydration' }),
  getRepoInfo({ repo: 'smikhalevski/doubter', branch: 'master' }),
  getRepoInfo({ repo: 'smikhalevski/react-corsair', branch: 'streaming-hydration' }),
  getRepoInfo({ repo: 'smikhalevski/roqueform', branch: 'master', packagePath: '/packages/roqueform' }),
]);

for (const repoInfo of repoInfos) {
  await generateReadme('src/main/gen', repoInfo);
}

interface RepoInfoOptions {
  repo: string;
  branch: string;
  packagePath?: string;
}

interface RepoInfo {
  repo: string;
  branch: string;
  readmeMd: string;
  packageJSON: any;
}

async function getRepoInfo(options: RepoInfoOptions): Promise<RepoInfo> {
  const { repo, branch, packagePath = '' } = options;

  const cacheFile = path.join(CACHE_DIR, btoa(repo + branch) + '.json');

  if (fs.existsSync(cacheFile)) {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
  }

  const [readmeMd, packageJSON] = await Promise.all([
    fetch(`https://raw.githubusercontent.com/${repo}/refs/heads/${branch}/README.md`).then(res => res.text()),
    fetch(`https://raw.githubusercontent.com/${repo}/refs/heads/${branch}${packagePath}/package.json`).then(res =>
      res.json()
    ),
  ]);

  const repoInfo: RepoInfo = { repo, branch, readmeMd, packageJSON };

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(cacheFile, JSON.stringify(repoInfo));

  return repoInfo;
}

async function generateReadme(outDir: string, repoInfo: RepoInfo): Promise<void> {
  const { repo, packageJSON } = repoInfo;

  // Prepend repo URL to TOC
  const readmeMd = repoInfo.readmeMd.replace(
    '- [API docs',
    `- [GitHub&#8239;<sup>↗</sup>](https://github.com/${repoInfo.repo}#readme)\n- [API docs`
  );

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      properties: {
        class: 'markdown-permalink',
      },
    })
    .use(rehypeGithubAlert)
    .use(rehypeStarryNight, {
      grammars: starryNight.all,
    })
    .use(rehypeMinifyWhitespace)
    .use(rehypeStringify)
    .process(readmeMd);

  const html = deleteBlocks(prepareHTML(file.value.toString(), repoInfo), '<!--HIDDEN-->', '<!--/HIDDEN-->');

  const readme = {
    version: packageJSON.version,
    tocContent: getTextOfBlocks(html, '<!--TOC-->', '<!--/TOC-->'),
    articleContent: prepareLocalLinks(getTextOfBlocks(html, '<!--ARTICLE-->', '<!--/ARTICLE-->')),
  };

  const overview = {
    version: packageJSON.version,

    // Remove links from overview
    overviewContent: getTextOfBlocks(html, '<!--OVERVIEW-->', '<!--/OVERVIEW-->')
      .replace(/<a[^>]+>/g, '')
      .replace(/<\/a>/g, '')
      .replace(/\u202f<sup>↗<\/sup>/g, ''),
  };

  const readmeJSON = await prettier.format('export default ' + JSON.stringify(readme), tsPrettierConfig);
  const overviewJSON = await prettier.format('export default ' + JSON.stringify(overview), tsPrettierConfig);

  const repoName = repo.split('/')[1];

  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, repoName + '-readme.ts'), readmeJSON);
  fs.writeFileSync(path.join(outDir, repoName + '-overview.ts'), overviewJSON);
}

function getBlockRange(
  str: string,
  startToken: string,
  endToken: string,
  index = 0
): { startIndex: number; endIndex: number } | null {
  let startIndex;
  let endIndex;

  if (
    (startIndex = str.indexOf(startToken, index)) === -1 ||
    (endIndex = str.indexOf(endToken, startIndex + startToken.length)) === -1
  ) {
    return null;
  }

  return { startIndex, endIndex: endIndex + endToken.length };
}

function deleteBlocks(str: string, startToken: string, endToken: string): string {
  for (let range, index = 0; (range = getBlockRange(str, startToken, endToken, index)) !== null; ) {
    str = str.substring(0, range.startIndex) + str.substring(range.endIndex);
  }

  return str;
}

function getTextOfBlocks(str: string, startToken: string, endToken: string): string {
  let text = '';

  for (
    let range, index = 0;
    (range = getBlockRange(str, startToken, endToken, index)) !== null;
    index = range.endIndex
  ) {
    text += str.substring(range.startIndex + startToken.length, range.endIndex - endToken.length);
  }

  return text;
}

function prepareHTML(html: string, repoInfo: RepoInfo): string {
  // Cleanup preformatted table rendering
  html = html.replace(/<pre>[\s\n]+<table/g, '<pre><table').replace(/<\/table>[\s\n]+<\/pre>/g, '</table></pre>');

  const repoURL = `https://raw.githubusercontent.com/${repoInfo.repo}/refs/heads/${repoInfo.branch}`;

  // Convert pictures to images
  html = html.replace(
    /<picture(?:.|\n)*?\(prefers-color-scheme: dark\)(?:.|\n)*?srcset="([^"]+)"(?:.|\n)*?\(prefers-color-scheme: light\)(?:.|\n)*?srcset="([^"]+)"(?:.|\n)*?(width="([^"]+)")?(?:.|\n)*?<\/picture>/g,
    (_, darkSrc, lightSrc, width = 'auto') => {
      darkSrc = darkSrc.replace(/^./, repoURL);
      lightSrc = lightSrc.replace(/^./, repoURL);

      return `<img class="dark" src="${darkSrc}" width="${width}"><img class="light" src="${lightSrc}" width="${width}">`;
    }
  );

  return html;
}

function prepareLocalLinks(html: string): string {
  html = html.replaceAll('https://github.com/smikhalevski/react-executor#readme', '/react-executor');
  html = html.replaceAll('https://github.com/smikhalevski/doubter#readme', '/doubter');
  html = html.replaceAll('https://github.com/smikhalevski/react-corsair#readme', '/react-corsair');
  html = html.replaceAll('https://github.com/smikhalevski/roqueform#readme', '/roqueform');

  html = html.replaceAll('https://github.com/smikhalevski/react-executor#', '/react-executor#');
  html = html.replaceAll('https://github.com/smikhalevski/doubter#', '/doubter#');
  html = html.replaceAll('https://github.com/smikhalevski/react-corsair#', '/react-corsair#');
  html = html.replaceAll('https://github.com/smikhalevski/roqueform#', '/roqueform#');

  html = html.replace(/<a[^>]*href="\/.*?<\/a>/g, html => html.replace('\u202f<sup>↗</sup>', ''));

  return html;
}
