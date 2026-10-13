/**
 * The PDF creation engine : `@react-pdf/renderer`.
 *
 * Kept in one module, as the reading engine beside it is, so the rest of the
 * library never names `@react-pdf/renderer` : the optional peer is imported
 * here and only here, dynamically — it weighs 1.4 MB minified in the browser
 * (fonts, layout, the writer), and no page should pay for it before a
 * document is generated. A route handler needs none of this : on the server
 * the application imports the package itself, and `renderToBuffer` is Node.
 *
 * 🔑 **Hyphenation is off by default.** The engine hyphenates English, with
 * Knuth's patterns, whatever the language of the text — an invoice in French
 * came out with words broken where no French reader expects a hyphen. The
 * first call decides : `loadRenderer( { hyphenate : true } )` keeps the
 * engine's own.
 *
 * @module components/documents/engine/renderer
 */

let renderer = null ;

/**
 * Loads `@react-pdf/renderer` once.
 *
 * The result is the package itself : `pdf( element )` for a blob in the
 * browser, `Font`, `StyleSheet`, and the primitives a document is written
 * with — `Document`, `Page`, `View`, `Text`, `Image`, `Link`, the `Svg`
 * family —, plus `version`.
 *
 * @param {Object} [options]
 * @param {boolean} [options.hyphenate=false] - Keep the engine's English hyphenation. Read on the first call only.
 * @returns {Promise<Object>} The `@react-pdf/renderer` module.
 */
export const loadRenderer = ( { hyphenate = false } = {} ) =>
{
    renderer ??= import( '@react-pdf/renderer' ).then( module =>
    {
        if ( !hyphenate )
        {
            module.Font.registerHyphenationCallback( word => [ word ] ) ;
        }

        return module ;
    } ) ;

    return renderer ;
} ;

/**
 * Loads the creation engine ahead of its first use, so the first document
 * is generated without waiting for 1.4 MB.
 *
 * Does nothing on the server, and says `false` where the engine is not
 * installed.
 *
 * @returns {Promise<boolean>} Whether the engine is ready.
 *
 * @example
 * ```js
 * useEffect( () => { preloadRenderer() ; } , [] ) ;
 * ```
 */
export const preloadRenderer = async () =>
{
    if ( typeof window === 'undefined' )
    {
        return false ;
    }

    try
    {
        await loadRenderer() ;
        return true ;
    }
    catch
    {
        return false ;
    }
} ;

/**
 * Generates a document in the browser, outside React : a blob, to save,
 * upload or open in a viewer.
 *
 * @param {React.ReactElement} element - A `<Document>` of `@react-pdf/renderer`.
 * @returns {Promise<Blob>} The PDF.
 *
 * @example
 * ```js
 * const blob = await renderToBlob( <Invoice order={ order } /> ) ;
 * ```
 */
export const renderToBlob = async element =>
{
    const { pdf } = await loadRenderer() ;

    return pdf( element ).toBlob() ;
} ;
