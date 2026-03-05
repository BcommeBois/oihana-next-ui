import { existsSync, readFileSync, writeFileSync } from 'node:fs' ;
import { join } from 'node:path' ;
import { fileURLToPath } from 'node:url' ;

const __dirname = fileURLToPath( new URL( '.' , import.meta.url ) ) ;

const SRC_DIRS = [
    'components',
    'contexts',
    'display',
    'helpers',
    'hooks',
    'motions',
    'themes'
];

const exports = {
    "./package.json": "./package.json",
    "./README.md": "./README.md",
    "./LICENSE": "./LICENSE",
    "./version": "./src/version.js"
};

for (const dir of SRC_DIRS) {
    const dirPath = join(__dirname, '../src', dir);

    if (existsSync(dirPath)) {
        exports[`./${dir}/*`] = `./src/${dir}/*`;
    }
}

const pkgPath = join(__dirname, '../package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.exports = exports;

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✓ Exports simplifiés générés.`);