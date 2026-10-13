/**
 * The PDF editing engine : `pdf-lib`, through the maintained `@cantoo/pdf-lib`.
 *
 * Kept in one module, as the reading and writing engines beside it are, so
 * the rest of the library never names the package : the optional peer is
 * imported here and only here, dynamically — 600 KB minified in the browser,
 * paid only when a document is touched. Pure JavaScript, with no DOM : the
 * helpers of `helpers/pdf/edit` run in a route handler as they do in the
 * page, and a route imports the package itself if it prefers.
 *
 * @module components/documents/engine/editor
 */

let editor = null ;

/**
 * Loads `@cantoo/pdf-lib` once : `PDFDocument`, `degrees`, `rgb`,
 * `StandardFonts` and the rest of the package.
 *
 * @returns {Promise<Object>} The module.
 */
export const loadEditor = () =>
{
    editor ??= import( '@cantoo/pdf-lib' ) ;

    return editor ;
} ;

/**
 * Loads the editing engine ahead of its first use. Says `false` where it is
 * not installed, and does nothing on the server.
 *
 * @returns {Promise<boolean>} Whether the engine is ready.
 */
export const preloadEditor = async () =>
{
    if ( typeof window === 'undefined' )
    {
        return false ;
    }

    try
    {
        await loadEditor() ;
        return true ;
    }
    catch
    {
        return false ;
    }
} ;
