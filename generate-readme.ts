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

const prettierConfig = await prettier.resolveConfig('package.json');

const tsPrettierConfig = { ...prettierConfig, parser: 'typescript' };

await Promise.all([
  processRepo({
    repo: 'smikhalevski/react-executor',
    branch: 'master',
    packagePath: '',
  }),
  processRepo({
    repo: 'smikhalevski/doubter',
    branch: 'remove-commonjs',
    packagePath: '',
  }),
  processRepo({
    repo: 'smikhalevski/react-corsair',
    branch: 'master',
    packagePath: '',
  }),
  processRepo({
    repo: 'smikhalevski/roqueform',
    branch: 'master',
    packagePath: '/packages/roqueform',
  }),
]);

async function processRepo(options: { repo: string; branch: string; packagePath: string }): Promise<void> {
  const { repo, branch, packagePath } = options;

  const [readmeMd, packageJSON] = await Promise.all([
    fetch(`https://raw.githubusercontent.com/${repo}/refs/heads/${branch}/README.md`).then(response => response.text()),
    fetch(`https://raw.githubusercontent.com/${repo}/refs/heads/${branch}${packagePath}/package.json`).then(response =>
      response.json()
    ),
  ]);

  await processReadme({
    repo,
    readmeMd,
    packageJSON,
    outDir: 'src/main/gen',
  });
}

async function processReadme(options: {
  repo: string;
  readmeMd: string;
  packageJSON: any;
  outDir: string;
}): Promise<void> {
  const { repo, packageJSON, outDir } = options;

  // Prepend repo URL to TOC
  const readmeMd = options.readmeMd.replace(
    '<!--TOC-->',
    `<!--TOC-->\n<span class="toc-icon"></span>[**GitHub**&#8239;<sup>↗</sup>](https://github.com/${options.repo}#readme)\n`
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

  let htmlSource = file.value.toString();

  // Cleanup preformatted table rendering
  htmlSource = htmlSource
    .replace(/<pre>[\s\n]+<table/g, '<pre><table')
    .replace(/<\/table>[\s\n]+<\/pre>/g, '</table></pre>');

  while (htmlSource !== (htmlSource = removeBlock(htmlSource, '<!--HIDDEN-->', '<!--/HIDDEN-->'))) {}

  const readme = {
    version: packageJSON.version,
    overviewContent: getBlockContent(htmlSource, '<!--OVERVIEW-->', '<!--/OVERVIEW-->'),
    tocContent: getBlockContent(htmlSource, '<!--TOC-->', '<!--/TOC-->'),
    articleContent: getBlockContent(htmlSource, '<!--ARTICLE-->', '<!--/ARTICLE-->'),
  };

  const overview = {
    version: packageJSON.version,

    // Remove links and pre from overview
    overviewContent: getBlockContent(htmlSource, '<!--OVERVIEW-->', '<!--/OVERVIEW-->')
      .replace(/<a[^>]+>/g, '')
      .replace(/<\/a>/g, '')
      .replace(/\u202f<sup>↗<\/sup>/g, '')
      .replace(/<pre(.|\n)*<\/pre>/, ''),
  };

  const readmeJSON = await prettier.format('export default ' + JSON.stringify(readme), tsPrettierConfig);
  const overviewJSON = await prettier.format('export default ' + JSON.stringify(overview), tsPrettierConfig);

  const repoName = repo.split('/')[1];

  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, repoName + '-readme.ts'), readmeJSON);
  fs.writeFileSync(path.join(outDir, repoName + '-overview.ts'), overviewJSON);
}

function removeBlock(str: string, a: string, b: string): string {
  const i = str.indexOf(a);

  if (i === -1) {
    return str;
  }

  const j = str.indexOf(b, i + a.length);

  if (j === -1) {
    return str;
  }

  return str.substring(0, i) + str.substring(j + b.length);
}

function getBlockContent(str: string, a: string, b: string): string {
  const i = str.indexOf(a);

  if (i === -1) {
    return '';
  }

  const j = str.indexOf(b, i + a.length);

  if (j === -1) {
    return '';
  }

  return str.substring(i + a.length, j);
}
