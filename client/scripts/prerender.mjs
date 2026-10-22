import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const build = resolve(root, 'build');
const index = readFileSync(resolve(build, 'index.html'), 'utf8');
const publishedStatuses = new Set(['existing', 'live']);
const tools = JSON.parse(readFileSync(resolve(root, 'src/data/tools-backlog.json'), 'utf8').replace(/^\uFEFF/, '')).filter((tool) => publishedStatuses.has(tool.status));
const siteUrl = (process.env.SITE_URL || 'https://quick-tools-mu-sable.vercel.app').replace(/\/$/, '');
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const replaceDocument = (html, { title, description, canonical, content }) => html
  .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
  .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(description)}" />`)
  .replace('</head>', `<link rel="canonical" href="${escape(canonical)}" />\n    <meta property="og:url" content="${escape(canonical)}" />\n  </head>`)
  .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
  .replace(/\s*<noscript>You need to enable JavaScript to run this app\.<\/noscript>\s*/, '\n    ');

const homeDescription = 'QuickTools is an open-source browser workbench for code, data, text, and media.';
const homeContent = `<main><h1>QuickTools</h1><p>${homeDescription}</p><ul>${tools.map((tool) => `<li><a href="${tool.path ?? `/tools/${tool.id}`}">${escape(tool.name)}</a></li>`).join('')}</ul></main>`;
writeFileSync(resolve(build, 'index.html'), replaceDocument(index, { title: 'QuickTools', description: homeDescription, canonical: siteUrl, content: homeContent }));

const docsContent = '<main><h1>QuickTools documentation</h1><p>Documentation for the published QuickTools utilities and curated free APIs.</p></main>';
writeFileSync(resolve(build, 'docs.html'), replaceDocument(index, { title: 'Docs | QuickTools', description: 'Documentation for QuickTools utilities and curated free APIs.', canonical: `${siteUrl}/docs`, content: docsContent }));
writeFileSync(resolve(build, 'kitchen-sink.html'), index.replace(/\s*<noscript>You need to enable JavaScript to run this app\.<\/noscript>\s*/, '\n    '));
mkdirSync(resolve(build, 'tools'), { recursive: true });
writeFileSync(resolve(build, 'tools', 'base64.html'), replaceDocument(index, {
  title: 'Base64 Encoder/Decoder | QuickTools',
  description: 'Encode text to Base64 or decode it back.',
  canonical: `${siteUrl}/tools/base64-encoder-decoder`,
  content: '<main><p><a href="/tools/base64-encoder-decoder">Open Base64 Encoder/Decoder</a></p></main>',
}));

for (const tool of tools) {
  const canonical = `${siteUrl}/tools/${tool.id}`;
  const title = `${tool.name} | QuickTools`;
  const content = `<main><p><a href="/">Back to tools</a></p><h1>${escape(tool.name)}</h1><p>${escape(tool.description)}</p></main>`;
  const html = replaceDocument(index, { title, description: tool.description, canonical, content });
  const output = resolve(build, 'tools', `${tool.id}.html`);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, html);
}

const urls = ['', '/docs', ...tools.map((tool) => `/tools/${tool.id}`)];
writeFileSync(resolve(build, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(resolve(build, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`Prerendered ${tools.length} tool routes.`);
