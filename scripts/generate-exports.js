import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const SRC_DIRS = [
    'components',
    'contexts',
    'display',
    'helpers',
    'hooks',
    'motions',
    'themes',
];

const VALID_EXTENSIONS = ['.js', '.jsx', '.mjs', '.css'];
const WILDCARD_DEPTH = 2; // Profondeur max pour les wildcards (ex: */*)

const scanDir = (dir, currentDepth = 0) => {
    const exports = {};
    const entries = readdirSync(dir);

    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        const relPath = relative(join(__dirname, '../src'), fullPath).replaceAll(sep, '/');

        if (stat.isDirectory()) {
            // Ajouter une wildcard si on est dans la limite de profondeur
            if (currentDepth < WILDCARD_DEPTH) {
                const wildcardKey = `./${relPath}/*`;
                const wildcardValue = `./dist/${relPath}/*.js`;
                exports[wildcardKey] = wildcardValue;
            }
            // Scanner récursivement
            Object.assign(exports, scanDir(fullPath, currentDepth + 1));
        } else if (VALID_EXTENSIONS.some(ext => entry.endsWith(ext))) {
            let key = `./${relPath}`;
            let value = `./dist/${relPath}`;

            // Pour les JS/JSX/MJS, on retire l'extension dans la clé
            if (entry.endsWith('.js') || entry.endsWith('.jsx') || entry.endsWith('.mjs')) {
                key = key.replace(/\.(js|jsx|mjs)$/, '');
            }

            // Ajouter uniquement les chemins profonds ou les CSS/MJS
            if (currentDepth >= WILDCARD_DEPTH || entry.endsWith('.css') || entry.endsWith('.mjs')) {
                exports[key] = value;
            }
        }
    }

    return exports;
};

const exports = {};

// Ajouter les wildcards pour les dossiers racine et les CSS globaux
for (const dir of SRC_DIRS) {
    const dirPath = join(__dirname, '../src', dir);
    if (existsSync(dirPath)) {
        // Wildcard pour le dossier racine (ex: ./components/*)
        exports[`./${dir}/*`] = `./dist/${dir}/*.js`;
        // Wildcard pour les CSS (tous niveaux)
        exports[`./${dir}/**/*.css`] = `./dist/${dir}/**/*.css`;
        // Scanner pour les sous-dossiers et fichiers spécifiques
        Object.assign(exports, scanDir(dirPath));
    }
}

// Lire et mettre à jour package.json
const pkgPath = join(__dirname, '../package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.exports = exports;

writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✓ Generated ${Object.keys(exports).length} export entries.`);
