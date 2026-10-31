const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'site-dist');
const source = path.join(root, 'docs', 'prime-explorer');
const core = path.join(root, 'build-a-prime-number-checker-module', 'prime-core.js');
const files = [
  [path.join(source, 'index.html'), 'index.html'],
  [path.join(source, 'style.css'), 'style.css'],
  [path.join(source, 'app.js'), 'app.js'],
  [core, 'prime-core.js'],
];
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const [from, to] of files) {
  if (!fs.statSync(from).isFile()) throw new Error('Expected regular file: ' + from);
  fs.copyFileSync(from, path.join(out, to));
}
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
fs.writeFileSync(path.join(out, 'health.json'), JSON.stringify({
  status: 'ok', project: 'prime-explorer', commit: sha
}, null, 2) + '\n');
console.log('Built site-dist/ with source commit ' + sha);
