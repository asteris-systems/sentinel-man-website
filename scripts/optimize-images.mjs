import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const PUB = path.resolve('public');

async function optimize(file, sizes) {
  const src = path.join(PUB, file);
  const buf = await fs.readFile(src);
  const meta = await sharp(buf).metadata();
  console.log(`\n${file}: ${meta.width}x${meta.height}, ${(buf.length / 1024).toFixed(1)} KB`);
  for (const s of sizes) {
    const out = path.join(PUB, s.name);
    let pipeline = sharp(buf).resize(s.width, s.height, { fit: 'contain', background: { r: 0, g: 31, b: 63, alpha: 0 } });
    if (s.format === 'webp') {
      pipeline = pipeline.webp({ quality: s.quality ?? 90, effort: 6 });
    } else {
      pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 100, effort: 10 });
    }
    await pipeline.toFile(out);
    const sz = (await fs.stat(out)).size;
    console.log(`  → ${s.name}: ${(sz / 1024).toFixed(1)} KB`);
  }
}

await optimize('logo.png', [
  { name: 'logo-200.png', width: 200, height: 200, format: 'png' },
  { name: 'logo-200.webp', width: 200, height: 200, format: 'webp', quality: 92 },
  { name: 'favicon-32.png', width: 32, height: 32, format: 'png' },
  { name: 'favicon-16.png', width: 16, height: 16, format: 'png' },
  { name: 'apple-touch-icon.png', width: 180, height: 180, format: 'png' },
  { name: 'icon-192.png', width: 192, height: 192, format: 'png' },
  { name: 'icon-512.png', width: 512, height: 512, format: 'png' },
]);

// Recompress og-image (reduce size while keeping visual quality)
await optimize('og-image.png', [
  { name: 'og-image.png', width: 1200, height: 630, format: 'png' },
]);
