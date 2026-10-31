const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('../build-a-prime-number-checker-module/node_modules/playwright');

const root = path.resolve(__dirname, '..', 'site-dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  if (!/^\/[\w.-]+$/.test(requested)) { res.writeHead(404); res.end('Not found'); return; }
  const file = path.join(root, requested.slice(1));
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); res.end('Not found'); return; }
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = 'http://127.0.0.1:' + server.address().port;
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(address, { waitUntil: 'load' });
    assert.match(await page.title(), /Prime Explorer/);
    await page.locator('#candidate').fill('97');
    await page.getByRole('button', { name: 'Check number' }).click();
    assert.equal(await page.locator('#result').innerText(), '97 is prime.');
    await page.locator('#candidate').fill('100');
    await page.getByRole('button', { name: 'Check number' }).click();
    assert.equal(await page.locator('#result').innerText(), '100 is not prime.');
    await page.locator('#candidate').fill('0');
    await page.getByRole('button', { name: 'Check number' }).click();
    assert.equal(await page.locator('#result').getAttribute('data-kind'), 'composite');
    await page.setViewportSize({ width: 375, height: 720 });
    assert.equal(await page.locator('h1').innerText(), 'Prime Explorer');
    const health = await (await page.request.get(address + '/health.json')).json();
    assert.equal(health.status, 'ok');
    assert.match(health.commit, /^[0-9a-f]{40}$/);
    assert.deepEqual(errors, []);
    console.log('PASS: headless Chromium prime/composite/zero/mobile/health; no JS errors');
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
