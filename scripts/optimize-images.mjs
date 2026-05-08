import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const PUB = path.resolve('public');

async function fromSource(srcPath, sizes, opts = {}) {
  const buf = await fs.readFile(srcPath);
  const meta = await sharp(buf).metadata();
  console.log(`\n${path.basename(srcPath)}: ${meta.format} ${meta.width ?? '?'}×${meta.height ?? '?'}, ${(buf.length / 1024).toFixed(1)} KB`);
  for (const s of sizes) {
    const out = path.join(PUB, s.name);
    let pipeline = sharp(buf, { density: opts.density ?? 384 })
      .resize(s.width, s.height, {
        fit: 'contain',
        background: opts.bg ?? { r: 0, g: 0, b: 0, alpha: 0 },
      });
    if (s.format === 'webp') {
      pipeline = pipeline.webp({ quality: s.quality ?? 92, effort: 6 });
    } else {
      pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 100, effort: 10 });
    }
    await pipeline.toFile(out);
    const sz = (await fs.stat(out)).size;
    console.log(`  → ${s.name}: ${(sz / 1024).toFixed(1)} KB`);
  }
}

// Master PNG from SVG (used for OG embedding etc.)
await fromSource(path.join(PUB, 'logo.svg'), [
  { name: 'logo.png',           width: 1024, height: 1024, format: 'png' },
  { name: 'logo-200.png',       width: 200,  height: 200,  format: 'png' },
  { name: 'logo-200.webp',      width: 200,  height: 200,  format: 'webp', quality: 92 },
  { name: 'favicon-32.png',     width: 32,   height: 32,   format: 'png' },
  { name: 'favicon-16.png',     width: 16,   height: 16,   format: 'png' },
  { name: 'apple-touch-icon.png', width: 180, height: 180, format: 'png' },
  { name: 'icon-192.png',       width: 192,  height: 192,  format: 'png' },
  { name: 'icon-512.png',       width: 512,  height: 512,  format: 'png' },
]);

// OG image — recompress in place
const ogPath = path.join(PUB, 'og-image.png');
try {
  await fs.access(ogPath);
  await fromSource(ogPath, [
    { name: 'og-image.png', width: 1200, height: 630, format: 'png' },
  ]);
} catch {}
