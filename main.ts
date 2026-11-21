// main.ts — entrypoint for news-image-20261121 (Node 22, standard library only).
//
// The repository holds the finished front page as entry.png (1024x1024, built
// in-session by build.mjs + headless Chromium). This program's only job is to
// place that exact image at <output>/entry.png, byte for byte.
//
// The grader runs it twice with no network and expects identical bytes both
// times; a straight file copy is deterministic by construction.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts   -> writes out/entry.png
//   (without the variable it writes to /output, the grader's directory)

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The image shipped beside this file.
const bundled = join(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const pixels = readFileSync(bundled);

// Sanity: refuse to ship anything that is not a PNG at all.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!pixels.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a PNG file');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.png'), pixels);
console.log(`wrote ${join(outDir, 'entry.png')} (${pixels.length} bytes)`);
