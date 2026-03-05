import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Liste mise à jour selon ton ls -d src/*/
const SRC_DIRS = [
    'components',
    'contexts',
    'display',
    'helpers',
    'hooks',
    'motions',
    'themes',
    '@assets',
    '@configs',
    '@locale'
];

const exports = {
    "./package.json": "./package.json"
};

for ( const dir of SRC_DIRS )
{
    const dirPath = join(__dirname, '../src', dir);

    if ( existsSync( dirPath ) )
    {
        exports[`./${dir}/*.css`] = `./src/${dir}/*.css`;
        exports[`./${dir}/*.js`] = `./src/${dir}/*.js`;
        exports[`./${dir}/*.jsx`] = `./src/${dir}/*.jsx`;
        exports[`./${dir}/*.mjs`] = `./src/${dir}/*.mjs`;

        // Le wildcard général pour les imports sans extension
        exports[`./${dir}/*`] = `./src/${dir}/*`;
    }
}

if (existsSync(join(__dirname, '../src/index.js'))) {
    exports["."] = "./src/index.js";
}

const pkgPath = join(__dirname, '../package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

pkg.exports = exports;

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✓ Generated ${Object.keys(exports).length} export mapping categories (pointing to /src).`);