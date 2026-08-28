import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'public/images';

// Max source width per image. next/image resizes down from here, so we only
// need ~2x the largest on-screen size.
const MAX_WIDTH = {
  'hero-1.jpg': 2400,
  'hero-2.jpg': 2400,
  'hero-3.jpg': 2400,
  'contact-hero-wordmark-light.png': 1480,
  'pink_flowers_chair.png': 1024,
};
const PRODUCT_MAX = 1400;

const files = fs
  .readdirSync(DIR)
  .filter((f) => /\.(png|jpe?g)$/i.test(f));

let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(DIR, file);
  const out = path.join(DIR, file.replace(/\.(png|jpe?g)$/i, '.webp'));
  const width = MAX_WIDTH[file] ?? PRODUCT_MAX;

  const srcSize = fs.statSync(src).size;
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: '#FFFFFF' })
    .webp({ quality: 82, effort: 6 })
    .toFile(out);

  const outSize = fs.statSync(out).size;
  before += srcSize;
  after += outSize;

  const meta = await sharp(out).metadata();
  console.log(
    file.padEnd(34),
    (srcSize / 1048576).toFixed(2).padStart(6) + 'MB',
    '->',
    (outSize / 1048576).toFixed(2).padStart(6) + 'MB',
    `(${meta.width}x${meta.height})`
  );
}

console.log(
  '\nTOTAL'.padEnd(35),
  (before / 1048576).toFixed(2).padStart(6) + 'MB',
  '->',
  (after / 1048576).toFixed(2).padStart(6) + 'MB',
  `(-${(100 - (after / before) * 100).toFixed(1)}%)`
);
