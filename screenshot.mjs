import { execSync } from 'child_process';
import { mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || null;
const dir = join(__dirname, 'temporary screenshots');

mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter(f => f.startsWith('screenshot-'));
const num = label || (existing.length + 1);
const filename = `screenshot-${num}.png`;
const outPath = join(dir, filename);

console.log(`Navigating to ${url}`);
console.log(`Capturing screenshot into ${outPath}`);

try {
  execSync(
    `npx --yes playwright screenshot --viewport-size="1440,900" --full-page --wait-for-timeout=2000 "${url}" "${outPath}"`,
    { stdio: 'inherit', timeout: 45000 }
  );
  console.log(`Screenshot saved: ${outPath}`);
} catch (e) {
  console.error('Screenshot failed. Ensure Playwright is installed: npx playwright install chromium');
  process.exit(1);
}
