// render.mjs — fresh, written from scratch for news-image-20261121.
// Rasterises page.html (produced by build.mjs) to entry.png with the
// headless Chromium shell cached under ~/.cache/ms-playwright.
// Usage: node render.mjs [output-png-path]   (default: ./entry.png)

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] ?? join(here, 'entry.png');
const shell = join(
  process.env.HOME ?? '~',
  '.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell',
);
if (!existsSync(shell)) throw new Error(`headless shell not found at ${shell}`);
if (!existsSync(join(here, 'page.html'))) throw new Error('page.html missing — run build.mjs first');

execFileSync(shell, [
  '--headless', '--disable-gpu', '--no-sandbox',
  `--screenshot=${out}`,
  '--window-size=1024,1024',
  '--hide-scrollbars',
  `file://${join(here, 'page.html')}`,
], { stdio: 'pipe' });
console.log(`rendered ${out}`);
