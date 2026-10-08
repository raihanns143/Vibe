import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const distPath = resolve(process.cwd(), 'dist');

try {
  const [html, assets] = await Promise.all([
    readFile(resolve(distPath, 'index.html'), 'utf8'),
    readdir(resolve(distPath, 'assets')),
  ]);
  const hasJavaScript = assets.some((file) => file.startsWith('index-') && file.endsWith('.js'));
  const hasCss = assets.some((file) => file.startsWith('index-') && file.endsWith('.css'));

  if (!html.includes('<div id="root"></div>') || !hasJavaScript || !hasCss) {
    throw new Error('The production bundle is incomplete. Run npm run build first.');
  }

  console.log('Static health check passed: production assets are present.');
} catch (error) {
  console.error(`Static health check failed: ${error.message}`);
  process.exitCode = 1;
}
