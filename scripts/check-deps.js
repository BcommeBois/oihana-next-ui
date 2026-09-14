/**
 * Checks that `package.json` declares its dependencies where they belong.
 *
 * Both rules below were broken in this repository for months without anything
 * noticing, because **neither defect is visible from here**. A library's
 * dependency blocks only misbehave inside a *consumer's* `node_modules`, which
 * is the one place this repository never looks : the lab installs everything
 * anyway, so the tree is correct locally whatever the manifest says.
 *
 * Run on its own (`bun check-deps`) or as `preversion`, so a release cannot
 * carry the defect. Unlike `cache-size`, it **exits non-zero** on failure :
 * this is a contract, not housekeeping.
 *
 * @see {@link https://docs.npmjs.com/cli/configuring-npm/package-json}
 */

import { readFileSync } from 'fs' ;

const pkg = JSON.parse( readFileSync( 'package.json' , 'utf-8' ) ) ;

const dependencies          = pkg.dependencies         ?? {} ;
const devDependencies       = pkg.devDependencies      ?? {} ;
const peerDependencies = pkg.peerDependencies     ?? {} ;
const peerMeta         = pkg.peerDependenciesMeta ?? {} ;

/**
 * The failures found, one line each.
 * @type {string[]}
 */
const failures = [] ;

/**
 * Rule 1 — nothing in both `dependencies` and `peerDependencies`.
 *
 * The duplicate is not harmless redundancy : the two blocks carry two ranges,
 * and the day they disagree with what the host application installs, the
 * package manager settles it by nesting a second copy under the library.
 */
const duplicated = Object.keys( dependencies ).filter( name => name in peerDependencies ) ;

for ( const name of duplicated )
{
    failures.push
    (
        `${ name } is in both dependencies (${ dependencies[ name ] }) and peerDependencies (${ peerDependencies[ name ] }).\n` +
        `    A peer is provided by the host application — remove it from dependencies.`
    ) ;
}

/**
 * Rule 2 — every non-optional peer is also in `devDependencies`.
 *
 * A peer the consumer must provide is a peer the lab must install, or nothing
 * here builds. The two blocks are the same decision written twice, and only
 * the second one fails loudly when it is forgotten.
 */
const missingInDev = Object.keys( peerDependencies )
                           .filter( name => peerMeta[ name ]?.optional !== true )
                           .filter( name => !( name in devDependencies ) ) ;

for ( const name of missingInDev )
{
    failures.push
    (
        `${ name } is a non-optional peerDependency (${ peerDependencies[ name ] }) but is absent from devDependencies.\n` +
        `    Peer for consumers, dev for the lab — add it.`
    ) ;
}

if ( failures.length === 0 )
{
    console.log( `✓ package.json — ${ Object.keys( dependencies ).length } dependencies, ${ Object.keys( peerDependencies ).length } peers, no overlap.` ) ;
    process.exit( 0 ) ;
}

console.error( `\n  package.json — ${ failures.length } problem${ failures.length > 1 ? 's' : '' } :\n` ) ;

for ( const failure of failures )
{
    console.error( `  ✗ ${ failure }\n` ) ;
}

process.exit( 1 ) ;
