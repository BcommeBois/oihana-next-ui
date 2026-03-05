import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Dossiers à scanner dans /src
const SRC_DIRS = [
    'components',
    'context', // Attention: ton package.json disait 'context', ton script disait 'contexts'
    'display',
    'helpers',
    'hooks',
    'motions',
    'themes',
];

const exports = {};

for (const dir of SRC_DIRS) {
    const dirPath = join(__dirname, '../src', dir);

    if (existsSync(dirPath))
    {
        exports[`./${dir}/*`]     = `./src/${dir}/*`;
        exports[`./${dir}/*.css`] = `./src/${dir}/*.css`;
    }
}

if (existsSync(join(__dirname, '../src/index.js'))) {
    exports["."] = "./src/index.js";
}

const pkgPath = join(__dirname, '../package.json');
const pkg     = JSON.parse(readFileSync(pkgPath, 'utf8'));

pkg.exports = exports;

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✓ Generated ${Object.keys(exports).length} export mapping categories (pointing to /src).`);