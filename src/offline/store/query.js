/**
 * Searching the reserve, offline : a text, filters, a sort and a page over the
 * records of a kind, in memory. Not a copy of the server's query language — a
 * simpler search, on what the device holds, that a screen announces as such.
 */

const OPERATORS = [ 'gt' , 'gte' , 'in' , 'lt' , 'lte' , 'ne' ] ;

/**
 * A text made comparable : accents and case removed, « Éléonore » and
 * « eleonore » alike.
 *
 * @param {*} value
 * @returns {string}
 */
export const normalizeText = value => String( value ?? '' )
    .normalize( 'NFD' )
    .replace( /[̀-ͯ]/g , '' )
    .toLowerCase() ;

/**
 * Reads a dotted path : `address.city`.
 *
 * @param {Object} object
 * @param {string} path
 * @returns {*}
 */
export const getPath = ( object , path ) => path.split( '.' ).reduce( ( value , key ) => value?.[ key ] , object ) ;

/**
 * The text fields of a record, when the kind declared none : its top-level strings.
 *
 * @param {Object} value
 * @returns {string[]}
 */
const textFields = value => Object.keys( value ?? {} ).filter( key => typeof value[ key ] === 'string' ) ;

/**
 * Whether every word of a search is found in one of the fields.
 *
 * @param {Object} value
 * @param {string[]} words - Normalized.
 * @param {string[]} [fields]
 * @returns {boolean}
 */
export const matchesText = ( value , words , fields ) =>
{
    if ( !words.length )
    {
        return true ;
    }
    const haystack = ( fields ?? textFields( value ) ).map( field => normalizeText( getPath( value , field ) ) ).join( ' ' ) ;
    return words.every( word => haystack.includes( word ) ) ;
} ;

const isOperators = condition =>
    condition !== null && typeof condition === 'object' && !Array.isArray( condition ) && !( condition instanceof Date )
    && Object.keys( condition ).length > 0 && Object.keys( condition ).every( key => OPERATORS.includes( key ) ) ;

const equals = ( actual , expected ) => Array.isArray( actual ) ? actual.includes( expected ) : actual === expected ;

/**
 * Whether a value meets one condition : a value (equality ; an array value
 * contains it), a list (any of them ; an empty list is no filter), or
 * operators `{ gt , gte , lt , lte , ne , in }`. `undefined` is no filter.
 *
 * @param {*} actual
 * @param {*} condition
 * @returns {boolean}
 */
export const matchesCondition = ( actual , condition ) =>
{
    if ( condition === undefined )
    {
        return true ;
    }

    if ( Array.isArray( condition ) )
    {
        return condition.length === 0 || condition.some( expected => equals( actual , expected ) ) ;
    }

    if ( isOperators( condition ) )
    {
        return Object.entries( condition ).every( ( [ operator , expected ] ) =>
        {
            switch ( operator )
            {
                case 'gt'  : return actual !== null && actual !== undefined && actual > expected ;
                case 'gte' : return actual !== null && actual !== undefined && actual >= expected ;
                case 'lt'  : return actual !== null && actual !== undefined && actual < expected ;
                case 'lte' : return actual !== null && actual !== undefined && actual <= expected ;
                case 'ne'  : return !equals( actual , expected ) ;
                case 'in'  : return matchesCondition( actual , expected ) ;
                default    : return true ;
            }
        }) ;
    }

    return equals( actual , condition ) ;
} ;

/**
 * Whether a record meets every condition of `where`, by dotted path.
 *
 * @param {Object} value
 * @param {Object} [where]
 * @returns {boolean}
 */
export const matchesWhere = ( value , where ) =>
    Object.entries( where ?? {} ).every( ( [ path , condition ] ) => matchesCondition( getPath( value , path ) , condition ) ) ;

/**
 * Normalizes a sort : `'name'`, `'-name'` (descending), `{ field , direction }`, or a list of them.
 *
 * @param {*} sort
 * @returns {Array<{ field : string , direction : number }>}
 */
export const toSortKeys = sort =>
    ( Array.isArray( sort ) ? sort : sort ? [ sort ] : [] ).map( key =>
    {
        if ( typeof key === 'string' )
        {
            return key.startsWith( '-' ) ? { direction : -1 , field : key.slice( 1 ) } : { direction : 1 , field : key } ;
        }
        return { direction : key.direction === 'desc' || key.direction === -1 ? -1 : 1 , field : key.field } ;
    }) ;

/**
 * A comparator over several keys : numbers and dates by value, texts in the
 * order of the language (« A-2 » before « A-10 »), missing values last.
 *
 * @param {*} sort
 * @param {string} [locale]
 * @returns {Function}
 */
export const compareBy = ( sort , locale ) =>
{
    const keys     = toSortKeys( sort ) ;
    const collator = new Intl.Collator( locale , { numeric : true , sensitivity : 'base' } ) ;

    return ( a , b ) =>
    {
        for ( const { direction , field } of keys )
        {
            const x = getPath( a , field ) ;
            const y = getPath( b , field ) ;

            const missingX = x === null || x === undefined ;
            const missingY = y === null || y === undefined ;

            if ( missingX || missingY )
            {
                if ( missingX !== missingY )
                {
                    return missingX ? 1 : -1 ;
                }
                continue ;
            }

            const order = typeof x === 'string' && typeof y === 'string'
                ? collator.compare( x , y )
                : ( x < y ? -1 : x > y ? 1 : 0 ) ;

            if ( order !== 0 )
            {
                return order * direction ;
            }
        }
        return 0 ;
    } ;
} ;

/**
 * Searches records : the text in the declared fields (all words found), the
 * filters, the sort, then a page. `total` counts the matches before the page.
 *
 * @param {Object[]} values
 * @param {Object} [request]
 * @param {string} [request.text] - Words, all to be found.
 * @param {Object} [request.where] - Conditions by dotted path.
 * @param {*} [request.sort] - `'field'`, `'-field'`, `{ field , direction }`, or a list.
 * @param {number} [request.limit] - The page size ; all by default.
 * @param {number} [request.offset=0]
 * @param {Object} [description] - From `describe` : `{ text : fields , sort }`.
 * @param {string} [locale] - For the order of texts.
 * @returns {{ items : Object[] , total : number }}
 *
 * @example
 * runQuery( parcels , { text : 'chene h2' , where : { state : [ 'intact' , 'opened' ] , volume : { gte : 1 } } , sort : '-receivedAt' , limit : 20 } ) ;
 */
export const runQuery = ( values , { limit , offset = 0 , sort , text , where } = {} , description = {} , locale ) =>
{
    const words = normalizeText( text ).split( /\s+/ ).filter( Boolean ) ;

    const found = values.filter( value => matchesText( value , words , description.text ) && matchesWhere( value , where ) ) ;

    const order = sort ?? description.sort ;

    if ( order )
    {
        found.sort( compareBy( order , locale ) ) ;
    }

    const start = Math.max( 0 , offset ) ;

    return {
        items : limit === undefined ? found.slice( start ) : found.slice( start , start + limit ) ,
        total : found.length ,
    } ;
} ;
