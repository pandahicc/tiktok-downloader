import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const source = fileURLToPath(new URL('../src/assets/og-default.svg', import.meta.url));
const target = fileURLToPath(new URL('../public/og/bvt-og.png', import.meta.url));

const svg = await readFile(source);
await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(target);

console.log(`Wrote ${target} (1200×630).`);
