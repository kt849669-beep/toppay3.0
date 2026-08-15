/**
 * sitemap.xml generator.
 *
 * IMPORTANT: yahan sirf FINAL, non-redirecting URLs hi honi chahiye.
 * Pehle sitemap me /toppay-apk.html tha jo vercel.json me 301 redirect ho raha
 * tha -- isi wajah se Google "Page with redirect" mark karta tha. Wo redirects
 * ab vercel.json se hata diye gaye hain aur .html canonical hi final URL hai.
 */

const fs = require('fs');
const path = require('path');

const { domain, pages, legalPages } = require('./seo-content.cjs');

const sitemapFile = path.join(__dirname, 'public', 'sitemap.xml');

const homepage = {
  loc: `${domain}/`,
  source: path.join(__dirname, 'user-app', 'pages', 'login.html'),
  changefreq: 'daily',
  priority: '1.0',
};

const urls = [
  homepage,
  ...[...pages, ...legalPages].map((page) => ({
    loc: `${domain}/${page.filename}`,
    source: path.join(__dirname, 'public', page.filename),
    changefreq: page.changefreq || 'monthly',
    priority: page.priority || '0.6',
  })),
];

function xmlEscape(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function sourceLastModified(source) {
  return fs.statSync(source).mtime.toISOString().slice(0, 10);
}

function generateSitemap() {
  for (const entry of urls) {
    if (!fs.existsSync(entry.source)) {
      throw new Error(`Cannot generate sitemap: missing source ${entry.source}`);
    }
    if (/\/(toppay-apk|toppay-usdt)$/.test(entry.loc)) {
      throw new Error(`Sitemap must not contain redirecting URL: ${entry.loc}`);
    }
  }

  const entries = urls
    .map(
      (entry) => `  <url>
    <loc>${xmlEscape(entry.loc)}</loc>
    <lastmod>${sourceLastModified(entry.source)}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

  fs.writeFileSync(sitemapFile, sitemap, 'utf8');
  console.log(`Sitemap generated with ${urls.length} URLs at ${sitemapFile}`);
}

generateSitemap();
