import { existsSync, readFileSync, statSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const siteConfig = JSON.parse(
  await readFile(path.join(ROOT, 'site.config.json'), 'utf8'),
);
const BASE = siteConfig.url.replace(/\/$/, '');
const STORE_URL =
  'https://chromewebstore.google.com/detail/bvt-batch-video-downloade/kgnhdajpegmmcekmmkofhgjojddajphe';
const SUPPORT_EMAIL = 'pandahi.cc@gmail.com';
const EXPECTED_SITEMAP_URLS = 19;

function readEnvFile() {
  const envPath = path.join(ROOT, '.env');
  if (!existsSync(envPath)) return {};
  const text = readFileSync(envPath, 'utf8');
  const result = {};
  for (const line of text.split('\n')) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (match && !match[2].startsWith('#')) {
      result[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return result;
}

const dotenv = readEnvFile();
const DEFAULT_GA_ID = 'G-KR510SG28B';
const GA_ID =
  process.env.PUBLIC_GA_MEASUREMENT_ID ??
  dotenv.PUBLIC_GA_MEASUREMENT_ID ??
  DEFAULT_GA_ID;
const GA_ENABLED = GA_ID.trim() !== '';

const errors = [];
const warnings = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function relUrl(file) {
  const relative = path.relative(DIST, file).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) {
    return `/${relative.slice(0, -'index.html'.length)}`;
  }
  return `/${relative}`;
}

function metaContent(html, key, value) {
  const tagRe = new RegExp(`<meta[^>]+${key}=["']${value}["'][^>]*>`, 'i');
  const tag = tagRe.exec(html);
  if (!tag) return null;
  const doubleQuoted = /content="([^"]*)"/i.exec(tag[0]);
  if (doubleQuoted) return doubleQuoted[1];
  const singleQuoted = /content='([^']*)'/i.exec(tag[0]);
  return singleQuoted ? singleQuoted[1] : null;
}

function linkHref(html, rel) {
  const tagRe = new RegExp(`<link[^>]+rel=["']${rel}["'][^>]*>`, 'i');
  const tag = tagRe.exec(html);
  if (!tag) return null;
  const href = /href=["']([^"']*)["']/i.exec(tag[0]);
  return href ? href[1] : null;
}

function resolveLocal(urlPath) {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return null;
  const local = path.join(DIST, clean.replace(/^\//, ''));
  if (existsSync(local) && statSync(local).isFile()) return local;
  const asDir = path.join(local, 'index.html');
  if (existsSync(asDir)) return asDir;
  const asHtml = `${local}.html`;
  if (existsSync(asHtml)) return asHtml;
  return null;
}

const htmlFiles = (await walk(DIST)).filter((file) => file.endsWith('.html'));
const htmlCache = new Map();
for (const file of htmlFiles) {
  htmlCache.set(file, await readFile(file, 'utf8'));
}

const seenTitles = new Map();
const seenDescriptions = new Map();
const sitemapPaths = new Set();

for (const file of htmlFiles) {
  const html = htmlCache.get(file);
  const page = relUrl(file);
  const is404 = page === '/404.html';

  if (!/<html[^>]+lang=["']en["']/i.test(html)) {
    errors.push(`${page}: missing <html lang="en">`);
  }

  const titleMatch = /<title>([^<]*)<\/title>/i.exec(html);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title || title.length < 10) {
    errors.push(`${page}: missing or too-short <title>`);
  } else if (title.length > 80) {
    errors.push(`${page}: title is ${title.length} chars (max 80)`);
  } else {
    if (!/BVT/i.test(title)) {
      errors.push(`${page}: title does not contain the BVT brand`);
    }
    if (/TokGrid/i.test(title)) {
      errors.push(`${page}: title contains a different product brand`);
    }
    if (seenTitles.has(title)) {
      errors.push(`${page}: duplicate title (also ${seenTitles.get(title)})`);
    } else {
      seenTitles.set(title, page);
    }
  }

  const description = metaContent(html, 'name', 'description');
  if (!description) {
    errors.push(`${page}: missing meta description`);
  } else if (description.length < 50 || description.length > 200) {
    errors.push(`${page}: description is ${description.length} chars (expected 50-200)`);
  } else if (seenDescriptions.has(description)) {
    errors.push(`${page}: duplicate description (also ${seenDescriptions.get(description)})`);
  } else {
    seenDescriptions.set(description, page);
  }

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) {
    errors.push(`${page}: expected exactly one <h1>, found ${h1Count}`);
  }
  const h1 = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  if (h1 && /TokGrid/i.test(h1[1])) {
    errors.push(`${page}: H1 contains a different product brand`);
  }

  if (!is404) {
    const canonical = linkHref(html, 'canonical');
    if (!canonical) {
      errors.push(`${page}: missing canonical`);
    } else if (!canonical.startsWith(BASE)) {
      errors.push(`${page}: canonical does not use ${BASE}`);
    } else {
      const expected = page === '/' ? `${BASE}/` : `${BASE}${page}`;
      if (canonical !== expected) {
        errors.push(`${page}: canonical ${canonical} does not match ${expected}`);
      }
    }
    sitemapPaths.add(page);
  } else if (!/name=["']robots["'][^>]+noindex/i.test(html)) {
    errors.push(`${page}: 404 page must be noindex`);
  }

  const ogTitle = metaContent(html, 'property', 'og:title');
  const ogDescription = metaContent(html, 'property', 'og:description');
  const ogImage = metaContent(html, 'property', 'og:image');
  const ogUrl = metaContent(html, 'property', 'og:url');
  const twitterCard = metaContent(html, 'name', 'twitter:card');
  if (!ogTitle || !ogDescription || !ogImage || !twitterCard) {
    errors.push(`${page}: incomplete Open Graph/Twitter metadata`);
  }
  if (ogImage && !ogImage.startsWith(`${BASE}/`)) {
    errors.push(`${page}: og:image is not absolute on ${BASE}`);
  }
  if (!is404 && ogUrl && !ogUrl.startsWith(BASE)) {
    errors.push(`${page}: og:url is not absolute on ${BASE}`);
  }

  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRe.exec(html)) !== null) {
    const attrs = scriptMatch[1];
    const body = scriptMatch[2];
    if (/application\/ld\+json/i.test(attrs)) {
      try {
        JSON.parse(body.trim());
      } catch {
        errors.push(`${page}: invalid JSON-LD`);
      }
      continue;
    }
    if (
      GA_ENABLED &&
      (/googletagmanager\.com/i.test(attrs) || /\bgtag\(/.test(body))
    ) {
      continue;
    }
    errors.push(`${page}: unexpected client script`);
  }

  if (GA_ENABLED) {
    if (!html.includes(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)) {
      errors.push(`${page}: missing GA4 loader for ${GA_ID}`);
    }
    if (!/gtag\(["']config["']/.test(html)) {
      errors.push(`${page}: missing gtag config call`);
    }
  }

  if (/(\bTODO\b|lorem ipsum)/i.test(html)) {
    errors.push(`${page}: contains a TODO or lorem ipsum marker`);
  }

  if (/(?:US\$|€|£|\$)\s?\d/.test(html)) {
    errors.push(`${page}: currency amount detected; the site must not display prices`);
  }

  if (
    (page === '/support/' || page === '/privacy/') &&
    !html.includes(SUPPORT_EMAIL)
  ) {
    errors.push(`${page}: missing support email`);
  }

  const hrefRe = /href=["']([^"']+)["']/gi;
  let hrefMatch;
  const seenLinks = new Set();
  while ((hrefMatch = hrefRe.exec(html)) !== null) {
    const href = hrefMatch[1];
    if (!href || seenLinks.has(href)) continue;
    seenLinks.add(href);

    if (href.startsWith(STORE_URL)) {
      let parsed;
      try {
        parsed = new URL(href.replace(/&amp;/g, '&'));
      } catch {
        errors.push(`${page}: invalid store URL ${href}`);
        continue;
      }
      if (
        parsed.searchParams.get('utm_source') !== 'bvtdownloader.app' ||
        parsed.searchParams.get('utm_medium') !== 'website' ||
        !parsed.searchParams.get('utm_campaign')
      ) {
        errors.push(`${page}: store URL is missing the expected UTM parameters`);
      }
    }

    if (
      href.startsWith('#') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('data:') ||
      href.startsWith('javascript:') ||
      href.startsWith('//')
    ) {
      continue;
    }

    const target = resolveLocal(href);
    if (!target) {
      errors.push(`${page}: broken internal link ${href}`);
      continue;
    }
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      const hash = href.slice(hashIndex + 1);
      if (hash) {
        const targetHtml =
          htmlCache.get(target) ?? (await readFile(target, 'utf8'));
        const idRe = new RegExp(
          `id=["']${hash.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`,
        );
        if (!idRe.test(targetHtml)) {
          errors.push(`${page}: missing anchor #${hash} in ${href}`);
        }
      }
    }
  }

  const srcRe = /src=["']([^"']+)["']/gi;
  let srcMatch;
  const seenSrc = new Set();
  while ((srcMatch = srcRe.exec(html)) !== null) {
    const src = srcMatch[1];
    if (!src || seenSrc.has(src)) continue;
    seenSrc.add(src);
    if (
      src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('data:') ||
      src.startsWith('//')
    ) {
      continue;
    }
    if (!resolveLocal(src)) {
      errors.push(`${page}: missing asset ${src}`);
    }
  }
}

const sitemapPath = path.join(DIST, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  errors.push('dist/sitemap.xml is missing');
} else {
  const sitemap = await readFile(sitemapPath, 'utf8');
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  if (locs.length !== EXPECTED_SITEMAP_URLS) {
    errors.push(
      `sitemap has ${locs.length} URLs; expected ${EXPECTED_SITEMAP_URLS}`,
    );
  }
  const sitemapLocPaths = new Set();
  for (const loc of locs) {
    if (!loc.startsWith(BASE)) {
      errors.push(`sitemap URL is outside ${BASE}: ${loc}`);
      continue;
    }
    const localPath = loc.slice(BASE.length) || '/';
    sitemapLocPaths.add(localPath);
    if (!resolveLocal(localPath)) {
      errors.push(`sitemap URL has no built page: ${loc}`);
    }
  }
  if (locs.some((loc) => loc.includes('/404'))) {
    errors.push('sitemap must not include the 404 page');
  }
  for (const page of sitemapPaths) {
    if (!sitemapLocPaths.has(page)) {
      errors.push(`built page ${page} is missing from the sitemap`);
    }
  }
}

const robotsPath = path.join(DIST, 'robots.txt');
if (!existsSync(robotsPath)) {
  errors.push('dist/robots.txt is missing');
} else {
  const robots = await readFile(robotsPath, 'utf8');
  if (!robots.includes(`Sitemap: ${BASE}/sitemap.xml`)) {
    errors.push('robots.txt does not point to the sitemap');
  }
}

const screenshotFiles = [
  ['single-download.webp', 1280, 800],
  ['explore-list.webp', 1280, 800],
  ['search-list.webp', 1280, 800],
  ['creator-profile.webp', 1280, 800],
  ['creator-panel.webp', 1280, 800],
];
for (const [name, width, height] of screenshotFiles) {
  const file = path.join(ROOT, 'public', 'images', 'screenshots', name);
  if (!existsSync(file)) {
    errors.push(`missing screenshot ${name}`);
    continue;
  }
  const meta = await sharp(file).metadata();
  if (meta.width !== width || meta.height !== height) {
    errors.push(
      `${name} is ${meta.width}×${meta.height}; expected ${width}×${height}`,
    );
  }
}

const ogPath = path.join(ROOT, 'public', 'og', 'bvt-og.png');
if (!existsSync(ogPath)) {
  errors.push('missing public/og/bvt-og.png');
} else {
  const meta = await sharp(ogPath).metadata();
  if (meta.width !== 1200 || meta.height !== 630) {
    errors.push(`OG image is ${meta.width}×${meta.height}; expected 1200×630`);
  }
}

for (const icon of ['bvt-icon-32.png', 'bvt-icon-128.png', 'apple-touch-icon.png']) {
  if (!existsSync(path.join(ROOT, 'public', 'images', 'brand', icon))) {
    errors.push(`missing brand icon ${icon}`);
  }
}

if (!existsSync(path.join(DIST, 'site.webmanifest'))) {
  errors.push('dist/site.webmanifest is missing');
}

if (errors.length > 0) {
  console.error(`Site check failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Site check passed: ${htmlFiles.length} HTML pages, ${EXPECTED_SITEMAP_URLS} sitemap URLs.`,
  );
  if (GA_ENABLED) {
    console.log(`GA4 is enabled for this build (${GA_ID}); GA scripts were allowed.`);
  } else {
    console.log('GA4 is disabled for this build; no client scripts were allowed.');
  }
  if (warnings.length > 0) {
    for (const warning of warnings) console.warn(`  warning: ${warning}`);
  }
}
