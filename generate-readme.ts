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

await processRepo('smikhalevski/react-executor', '', 'react-executor-readme');
await processRepo('smikhalevski/doubter', '', 'doubter-readme');
await processRepo('smikhalevski/react-corsair', '', 'react-corsair-readme');
await processRepo('smikhalevski/roqueform', '/packages/roqueform', 'roqueform-readme');

async function processRepo(repo: string, packagePath: string, outputName: string): Promise<void> {
  console.log(`Processing ${repo}`);

  const [readmeMd, packageJSON] = await Promise.all([
    fetch(`https://raw.githubusercontent.com/${repo}/refs/heads/master/README.md`).then(response => response.text()),
    fetch(`https://raw.githubusercontent.com/${repo}/refs/heads/master${packagePath}/package.json`).then(response =>
      response.json()
    ),
  ]);

  await processReadme(readmeMd, packageJSON, `src/main/gen/${outputName}.ts`);
}

async function processReadme(readmeMd: string, packageJSON: any, outputFile: string): Promise<void> {
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

  while (htmlSource !== (htmlSource = removeBlock(htmlSource, '<!--HIDDEN-->', '<!--/HIDDEN-->'))) {}

  const blocks = {
    version: packageJSON.version,
    overviewContent: getBlockContent(htmlSource, '<!--OVERVIEW-->', '<!--/OVERVIEW-->'),
    tocContent: getBlockContent(htmlSource, '<!--TOC-->', '<!--/TOC-->'),
    articleContent: getBlockContent(htmlSource, '<!--ARTICLE-->', '<!--/ARTICLE-->'),
  };

  const blocksSource = await prettier.format('export default ' + JSON.stringify(blocks), {
    ...prettierConfig,
    parser: 'typescript',
  });

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });

  fs.writeFileSync(outputFile, blocksSource);
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
