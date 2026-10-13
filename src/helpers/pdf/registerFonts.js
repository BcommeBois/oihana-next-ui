/**
 * Registers font families with `@react-pdf/renderer`, once.
 *
 * The engine's `Font.register` has no memory : a family registered twice is
 * registered twice, and a component that registers its fonts on every render
 * — or a route handler on every request — piles them up. This remembers what
 * it registered, per `Font` object, and skips a family already known.
 *
 * Works on both sides : in the browser with the `Font` of `loadRenderer()`,
 * in a route handler with the one imported from `@react-pdf/renderer`.
 * TTF, OTF and WOFF ; **not WOFF2**, which the engine does not read.
 *
 * Without any of this a document is set in the engine's standard faces —
 * Helvetica, Times, Courier —, which carry the Latin accents and the euro
 * sign ; a face of your own is only for the look.
 *
 * @module helpers/pdf/registerFonts
 *
 * @param {Object} Font - The engine's `Font`.
 * @param {Object|Object[]} families - One family or several : `{ family , fonts : [ { src , fontWeight , fontStyle } ] }`,
 *        or `{ family , src }` for a single file. `src` is a url, or a path on the server.
 *
 * @returns {string[]} The families registered by this call — empty when all were known.
 *
 * @example
 * ```js
 * registerFonts( Font ,
 * {
 *     family : 'Inter' ,
 *     fonts  :
 *     [
 *         { src : '/fonts/Inter-Regular.ttf' } ,
 *         { src : '/fonts/Inter-Bold.ttf' , fontWeight : 700 } ,
 *     ] ,
 * } ) ;
 * ```
 */

const known = new WeakMap() ;

const registerFonts = ( Font , families ) =>
{
    if ( !Font || typeof Font.register !== 'function' )
    {
        return [] ;
    }

    if ( !known.has( Font ) )
    {
        known.set( Font , new Set() ) ;
    }

    const registered = known.get( Font ) ;

    const list = ( Array.isArray( families ) ? families : [ families ] ).filter( entry => entry?.family ) ;

    const added = [] ;

    for ( const entry of list )
    {
        if ( registered.has( entry.family ) )
        {
            continue ;
        }

        const fonts = entry.fonts ?? ( entry.src ? [ { fontStyle : entry.fontStyle , fontWeight : entry.fontWeight , src : entry.src } ] : [] ) ;

        if ( fonts.length === 0 )
        {
            continue ;
        }

        Font.register( { family : entry.family , fonts } ) ;

        registered.add( entry.family ) ;
        added.push( entry.family ) ;
    }

    return added ;
} ;

export default registerFonts ;
