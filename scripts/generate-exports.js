import { readdirSync, readFileSync, statSync, writeFileSync} from 'fs' ;
import { join , relative } from 'path' ;

const SRC_DIRS = [ 'components', 'contexts', 'display', 'helpers', 'hooks', 'motions', 'themes' ] ;

function scanDir(dir)
{
    const results = [] ;

    for (const entry of readdirSync(dir))
    {
        const full = join(dir, entry) ;
        const stat = statSync(full) ;

        if (stat.isDirectory())
        {
            results.push(...scanDir(full)) ;
        }
        else if (/\.(js|jsx|mjs|css)$/.test(entry))
        {
            results.push(full) ;
        }
    }

    return results ;
}

const exports = {} ;

for (const dir of SRC_DIRS)
{
    for (const file of scanDir(`src/${dir}`))
    {
        const rel   = relative('src', file).replaceAll('\\', '/') ;
        const isCss = file.endsWith('.css') ;

        // CSS : clé avec extension, valeur avec extension
        // JS/JSX/MJS : clé sans extension, valeur avec extension
        const key   = isCss
            ? './' + rel
            : './' + rel.replace(/\.(js|jsx|mjs)$/, '') ;

        exports[key] = './src/' + rel ;
    }
}

const pkg = JSON.parse(readFileSync('package.json', 'utf-8')) ;

pkg.exports = exports ;

writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n') ;

console.log(`✓ Generated ${Object.keys(exports).length} export entries`) ;