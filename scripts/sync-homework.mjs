import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'docs', 'homework');
const publicRoot = path.join(root, 'public', 'homework');
const generatedFile = path.join(root, 'src', 'data', 'homework.generated.ts');

const monthNames = new Map([
  ['jan', 'Jan'], ['feb', 'Feb'], ['mar', 'Mar'], ['apr', 'Apr'],
  ['may', 'May'], ['jun', 'Jun'], ['jul', 'Jul'], ['aug', 'Aug'],
  ['sep', 'Sept'], ['oct', 'Oct'], ['nov', 'Nov'], ['dec', 'Dec'],
]);

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function displayTitle(fileName) {
  return path
    .basename(fileName, path.extname(fileName))
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function webRelativeHtmlPath(relativePath) {
  const extension = path.extname(relativePath);
  return (relativePath.slice(0, -extension.length) + '.html').split(path.sep).join('/');
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function createCodePage(title, source) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <style>
      body { margin: 0; padding: 32px; background: #0f172a; color: #e2e8f0; font-family: Consolas, Monaco, monospace; }
      pre { max-width: 960px; margin: 0 auto; padding: 24px; overflow-x: auto; border: 1px solid #334155; border-radius: 8px; background: #111827; line-height: 1.7; white-space: pre-wrap; }
    </style>
  </head>
  <body>
    <pre>${escapeHtml(source)}</pre>
  </body>
</html>
`;
}

function createNotebookPage(title, notebook) {
  const cells = notebook.cells ?? [];
  const cellHtml = cells.map((cell) => {
    const source = Array.isArray(cell.source) ? cell.source.join('') : (cell.source ?? '');
    const sourceHtml = escapeHtml(source);

    if (cell.cell_type === 'markdown') {
      return `<section class="markdown">${sourceHtml}</section>`;
    }

    const outputs = (cell.outputs ?? []).map((output) => {
      if (typeof output.text === 'string') return escapeHtml(output.text);
      if (Array.isArray(output.text)) return escapeHtml(output.text.join(''));
      if (typeof output.data?.['text/plain'] === 'string') return escapeHtml(output.data['text/plain']);
      if (Array.isArray(output.data?.['text/plain'])) return escapeHtml(output.data['text/plain'].join(''));
      return '';
    }).filter(Boolean).join('\n');

    return `<section class="cell">
      <div class="label">Code</div>
      <pre class="code">${sourceHtml}</pre>
      ${outputs ? `<div class="label">Output</div><pre class="output">${outputs}</pre>` : ''}
    </section>`;
  }).join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body { margin: 0; padding: 32px 16px; background: #0f172a; color: #e2e8f0; font-family: Inter, system-ui, sans-serif; }
      main { max-width: 960px; margin: 0 auto; }
      h1 { margin: 0 0 24px; font-size: 28px; }
      .cell { margin: 16px 0; overflow: hidden; border: 1px solid #334155; border-radius: 8px; background: #111827; }
      .label { padding: 8px 12px; color: #94a3b8; border-bottom: 1px solid #334155; font-size: 12px; font-weight: 700; text-transform: uppercase; }
      pre { margin: 0; padding: 16px; overflow-x: auto; font-family: Consolas, Monaco, monospace; line-height: 1.6; white-space: pre-wrap; }
      .output { color: #bbf7d0; background: #0b1220; }
      .markdown { margin: 16px 0; padding: 16px; white-space: pre-wrap; border-left: 3px solid #38bdf8; }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(title)}</h1>
      ${cellHtml}
    </main>
  </body>
</html>
`;
}

function getDate(folderName) {
  const match = folderName.match(/^(\d{1,2})-([a-z]+)-(\d{4})$/i);
  if (!match || !monthNames.has(match[2].toLowerCase())) return null;
  const [, day, month, year] = match;
  const monthNumber = String([...monthNames.keys()].indexOf(month.toLowerCase()) + 1).padStart(2, '0');
  return {
    day: `${Number(day)}-${month.toLowerCase()}-${year}`,
    label: `${Number(day)} ${monthNames.get(month.toLowerCase())} ${year}`,
    iso: `${year}-${monthNumber}-${String(day).padStart(2, '0')}`,
  };
}

async function collectFiles(directory, relativeDirectory = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(absolutePath, relativePath));
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

async function createEntries(files) {
  const entries = [];
  const fileSet = new Set(files);
  for (const relativePath of files.sort()) {
    const parts = relativePath.split(path.sep);
    const date = parts.length >= 3 ? getDate(parts[1]) : null;
    if (!date) continue;

    const subject = parts[0];
    const fileName = parts.at(-1);
    const extension = path.extname(fileName).slice(1);
    const baseName = path.basename(fileName, path.extname(fileName));
    const webPath = relativePath.split(path.sep).join('/');
    const isCodeFile = ['py', 'sql'].includes(extension.toLowerCase());
    const htmlRelativePath = relativePath.slice(0, -extension.length) + 'html';
    const hasExistingHtmlPage = fileSet.has(htmlRelativePath);
    const hasNotebookPreview = extension.toLowerCase() === 'ipynb';

    if (isCodeFile) {
      const source = await readFile(path.join(sourceRoot, relativePath), 'utf8');
      const htmlPath = path.join(publicRoot, relativePath.slice(0, -extension.length) + 'html');
      await writeFile(htmlPath, createCodePage(fileName, source));
      if (hasExistingHtmlPage) continue;
    }

    if (hasNotebookPreview) {
      const source = await readFile(path.join(sourceRoot, relativePath), 'utf8');
      const notebook = JSON.parse(source);
      const htmlPath = path.join(publicRoot, relativePath.slice(0, -extension.length) + 'html');
      await writeFile(htmlPath, createNotebookPage(displayTitle(fileName), notebook));
    }

    const isDirectHomeworkFile = ['ipynb'].includes(extension.toLowerCase());

    if (isCodeFile || (!isDirectHomeworkFile && extension.toLowerCase() !== 'html')) continue;

    const sourceFile = ['py', 'sql']
      .map((sourceExtension) => `${relativePath.slice(0, -extension.length)}${sourceExtension}`)
      .find((sourcePath) => fileSet.has(sourcePath));
    const sourceWebPath = sourceFile ? sourceFile.split(path.sep).join('/') : webPath;

    entries.push({
      subject,
      date,
      title: displayTitle(fileName),
      slug: slugify(`${baseName}-${extension}`),
      live: hasNotebookPreview
        ? `/homework/${webRelativeHtmlPath(relativePath)}`
        : `/homework/${webPath}`,
      github: `https://github.com/ankitkumartiwari-web/homework-tka/blob/main/docs/homework/${sourceWebPath}`,
    });
  }
  return entries;
}

function render(entries) {
  const subjects = new Map();
  for (const entry of entries) {
    const days = subjects.get(entry.subject) ?? new Map();
    const homeworks = days.get(entry.date.day) ?? [];
    homeworks.push(entry);
    days.set(entry.date.day, homeworks);
    subjects.set(entry.subject, days);
  }

  const value = [...subjects.entries()].map(([subject, days]) => ({
    subject,
    days: [...days.values()].map((homeworks) => ({
      day: homeworks[0].date.day,
      label: homeworks[0].date.label,
      homeworks: homeworks.map((entry, index) => ({
        id: 1000 + index,
        title: entry.title,
        slug: entry.slug,
        date: entry.date.iso,
        description: `Homework file ${entry.title} for ${entry.date.label}.`,
        live: entry.live,
        ...(entry.showLive === false ? { showLive: false } : {}),
        github: entry.github,
      })),
    })),
  }));

  return `import type { Subject } from './homework';\n\nexport const generatedHomework: Subject[] = ${JSON.stringify(value, null, 2)};\n`;
}

await mkdir(publicRoot, { recursive: true });
await cp(sourceRoot, publicRoot, { recursive: true });
const files = await collectFiles(sourceRoot);
await writeFile(generatedFile, render(await createEntries(files)));
