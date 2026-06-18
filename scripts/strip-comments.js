const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXCLUDE = [
  'node_modules',
  '.git',
  'docker',
  'database',
  'dist',
  'build',
];

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.html'];

function shouldExclude(filePath) {
  return EXCLUDE.some((ex) => filePath.includes(path.sep + ex + path.sep));
}

function stripComments(content) {
  
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:\\])\/\/.*$/gm, '$1')
    .replace(/\r\n/g, '\n');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (shouldExclude(full)) continue;
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        try {
          const raw = fs.readFileSync(full, 'utf8');
          const stripped = stripComments(raw);
          if (stripped !== raw) {
            fs.writeFileSync(full, stripped, 'utf8');
            console.log('Stripped comments from', path.relative(ROOT, full));
          }
        } catch (err) {
          console.error('Failed processing', full, err.message);
        }
      }
    }
  }
}

console.log('Starting comment strip at', ROOT);
walk(ROOT);
console.log('Done.');
