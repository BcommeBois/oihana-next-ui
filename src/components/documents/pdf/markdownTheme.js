/**
 * The look of Markdown rendered into a PDF : one object, merged over these
 * defaults by `PdfMarkdown` and `MarkdownDocument`.
 *
 * Sizes are in points. The faces are the engine's standard ones — Helvetica
 * and Courier, which every reader has and which carry the Latin accents ; a
 * family registered with `registerFonts` goes in `fontFamily`, and the
 * engine picks its bold and italic from the files given.
 *
 * @module components/documents/pdf/markdownTheme
 */

/**
 * @typedef {Object} MarkdownTheme
 * @property {string} color - The text colour.
 * @property {string} fontFamily - The body face.
 * @property {number} fontSize - The body size.
 * @property {number} lineHeight - A multiple of the size.
 * @property {number[]} headings - The six heading sizes, h1 first.
 * @property {{ color : string , marginBottom : number , marginTop : number }} heading
 * @property {{ marginBottom : number }} paragraph
 * @property {{ color : string }} link
 * @property {{ background : string , color : string , fontFamily : string , fontSize : number }} code
 * @property {{ borderColor : string , color : string }} quote
 * @property {{ color : string }} rule
 * @property {{ indent : number }} list - The width of the marker column.
 * @property {{ borderColor : string , cellPadding : number , headerBackground : string }} table
 * @property {{ marginBottom : number }} image
 */

/** @type {MarkdownTheme} */
export const DEFAULT_THEME = Object.freeze(
{
    color      : '#111827' ,
    fontFamily : 'Helvetica' ,
    fontSize   : 10 ,
    lineHeight : 1.4 ,
    headings   : [ 20 , 16 , 13 , 11.5 , 10.5 , 10 ] ,
    heading    : { color : '#111827' , marginBottom : 4 , marginTop : 10 } ,
    paragraph  : { marginBottom : 6 } ,
    link       : { color : '#1d4ed8' } ,
    code       : { background : '#f3f4f6' , color : '#111827' , fontFamily : 'Courier' , fontSize : 9 } ,
    quote      : { borderColor : '#d1d5db' , color : '#4b5563' } ,
    rule       : { color : '#d1d5db' } ,
    list       : { indent : 14 } ,
    table      : { borderColor : '#d1d5db' , cellPadding : 4 , headerBackground : '#f3f4f6' } ,
    image      : { marginBottom : 6 } ,
} ) ;

/**
 * The defaults, with a theme's values over them — one level deep, so
 * `{ code : { fontSize : 8 } }` keeps the other code settings.
 *
 * @param {?Partial<MarkdownTheme>} [theme]
 * @returns {MarkdownTheme}
 */
const mergeTheme = theme =>
{
    if ( !theme )
    {
        return DEFAULT_THEME ;
    }

    const merged = { ...DEFAULT_THEME } ;

    for ( const [ key , value ] of Object.entries( theme ) )
    {
        if ( value === undefined )
        {
            continue ;
        }

        const base = DEFAULT_THEME[ key ] ;

        merged[ key ] = base && typeof base === 'object' && !Array.isArray( base ) && value && typeof value === 'object'
                      ? { ...base , ...value }
                      : value ;
    }

    return merged ;
} ;

export default mergeTheme ;
