/**
 * Parses the text of a range field into a bound : a number, or `null` for
 * « no bound ».
 *
 * An open range is written with EMPTY fields — « from 50 », « up to 200 » — so
 * empty, invalid and out-of-floor text all mean `null`. The floor decides the
 * one real question, the value AT the floor :
 *
 *  - `includeFloor : true` (default) — a price : `0` is a real bound, a free
 *    item exists, and « up to 0 » is a real question ;
 *  - `includeFloor : false` — a measure where `0` means « not filled in » :
 *    « at least 0 mm » says nothing, so it is no bound.
 *
 * @module helpers/numbers/parseBound
 *
 * @param {*}       raw                        - The field's text.
 * @param {Object}  [options]
 * @param {number}  [options.floor=0]          - The lowest meaningful value.
 * @param {boolean} [options.includeFloor=true] - Whether the floor itself is a bound.
 * @returns {?number}
 *
 * @example
 * ```js
 * parseBound( '' )                            ; // null
 * parseBound( '0' )                           ; // 0
 * parseBound( '0' , { includeFloor : false } ) ; // null
 * parseBound( '12.5' )                        ; // 12.5
 * parseBound( '-3' )                          ; // null
 * ```
 */
const parseBound = ( raw , { floor = 0 , includeFloor = true } = {} ) =>
{
    if ( raw === '' || raw == null ) { return null ; }
    const n = Number( raw ) ;
    if ( !Number.isFinite( n ) ) { return null ; }
    return ( includeFloor ? n >= floor : n > floor ) ? n : null ;
} ;

export default parseBound ;
