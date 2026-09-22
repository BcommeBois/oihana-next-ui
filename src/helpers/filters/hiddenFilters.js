/**
 * Filter-visibility preferences — which criteria a filter bar shows.
 *
 * A bar that has grown to six or eight criteria wraps two or three times on a
 * phone, and a reader who always filters on the same two carries buttons they
 * never open. `FilterSettingsButton` lets them tick what they want to see ;
 * everything is ticked by default, and the choice is remembered — as a list of
 * HIDDEN ids, so a criterion added later shows up by itself.
 *
 * Pure module — no React : read by a server render (which must hide a
 * criterion at render time, not after hydration) and by the client control
 * alike.
 *
 * @module helpers/filters/hiddenFilters
 */

/**
 * How many criteria a bar must OFFER before the control exists.
 *
 * Four, and the number is computed rather than chosen : the control **takes a
 * slot in the row itself**, so hiding a single criterion gains nothing — two
 * buttons become one button plus the control. The gain starts at the second
 * hidden one, hence four offered. It matches the visual break too : three
 * buttons fit one phone line, the fourth makes it wrap.
 *
 * 🚨 Counted on the OFFERED criteria, never on the visible ones — see
 * {@link resolveVisibleFilters}.
 *
 * @type {number}
 */
export const HIDDEN_FILTERS_MIN_OPTIONS = 4 ;

/**
 * Separator of the persisted id list.
 * @type {string}
 */
export const HIDDEN_FILTERS_SEPARATOR = ',' ;

/**
 * Upper bound on how many ids the list carries — far above any real bar, and
 * what keeps a crafted cookie from growing without end.
 * @type {number}
 */
export const HIDDEN_FILTERS_MAX_IDS = 40 ;

/**
 * Shape of an accepted criterion id : a plain identifier.
 * @type {RegExp}
 */
const ID = /^[A-Za-z0-9._-]{1,40}$/ ;

/**
 * Parses a persisted id list into clean, de-duplicated ids. Never throws — a
 * corrupted cookie must not break a server render.
 *
 * @param {string} [raw]
 * @returns {string[]}
 *
 * @example
 * ```js
 * parseHiddenFilters( 'colour, size,colour,<script>' ) ; // [ 'colour' , 'size' ]
 * ```
 */
export const parseHiddenFilters = ( raw ) =>
{
    if ( !raw || typeof raw !== 'string' ) { return [] ; }

    const ids = [] ;

    for ( const part of raw.split( HIDDEN_FILTERS_SEPARATOR ) )
    {
        const id = part.trim() ;

        if ( ID.test( id ) && !ids.includes( id ) )
        {
            ids.push( id ) ;

            if ( ids.length >= HIDDEN_FILTERS_MAX_IDS ) { break ; }
        }
    }

    return ids ;
} ;

/**
 * Serialises hidden ids back into a stored value. Returns `''` when nothing is
 * hidden — the signal to expire the cookie rather than store an empty list.
 *
 * @param {string[]} [ids]
 * @returns {string}
 */
export const serializeHiddenFilters = ( ids ) =>
    Array.isArray( ids ) ? ids.filter( Boolean ).join( HIDDEN_FILTERS_SEPARATOR ) : '' ;

/**
 * Whether the settings control exists at all on a bar offering `offeredCount`
 * criteria.
 *
 * @param {number} offeredCount
 * @param {number} [min=HIDDEN_FILTERS_MIN_OPTIONS]
 * @returns {boolean}
 */
export const isFilterSettingsOffered = ( offeredCount , min = HIDDEN_FILTERS_MIN_OPTIONS ) =>
    ( offeredCount ?? 0 ) >= min ;

/**
 * The criteria a bar actually shows, from what it offers, what the preference
 * hides, and what is currently applied.
 *
 * Two rules, both there to make a silent failure impossible :
 *
 *  - **Below the threshold the preference is ignored entirely.** Otherwise a
 *    reader who had hidden two of five criteria, and whose bar later drops to
 *    three — a permission lost, a criterion no longer served — would keep a
 *    hidden criterion with no control left to bring it back. Ignoring the
 *    preference heals itself : the day the criterion returns, so does the
 *    control, and the preference applies again ;
 *
 *  - **an ACTIVE criterion is always visible**, whatever the preference. A
 *    shared link carrying a hidden criterion still narrows the list, and hiding
 *    its control would leave a list shortened by something invisible. Its box
 *    is NOT re-ticked for that : a colleague's link has no business editing my
 *    settings. Clearing the filter sends it back into hiding.
 *
 * @param {Object}   args
 * @param {string[]} args.offered  - Every criterion id the bar offers, in display order.
 * @param {string[]} [args.hidden] - The persisted hidden ids.
 * @param {string[]} [args.active] - The criterion ids currently applied.
 * @param {number}   [args.min=HIDDEN_FILTERS_MIN_OPTIONS] - The threshold of `isFilterSettingsOffered`.
 * @returns {string[]} The visible ids, in the offered order.
 *
 * @example
 * ```js
 * resolveVisibleFilters( { offered : [ 'a' , 'b' , 'c' , 'd' ] , hidden : [ 'b' ] , active : [] } ) ;
 * // → [ 'a' , 'c' , 'd' ]
 *
 * // Below the threshold : the preference does not apply.
 * resolveVisibleFilters( { offered : [ 'a' , 'b' , 'c' ] , hidden : [ 'b' ] } ) ;
 * // → [ 'a' , 'b' , 'c' ]
 *
 * // Hidden but applied : shown anyway.
 * resolveVisibleFilters( { offered : [ 'a' , 'b' , 'c' , 'd' ] , hidden : [ 'b' ] , active : [ 'b' ] } ) ;
 * // → [ 'a' , 'b' , 'c' , 'd' ]
 * ```
 */
export const resolveVisibleFilters = ( { offered , hidden , active , min = HIDDEN_FILTERS_MIN_OPTIONS } = {} ) =>
{
    const ids = Array.isArray( offered ) ? offered : [] ;

    if ( !isFilterSettingsOffered( ids.length , min ) )
    {
        return ids ;
    }

    const hiddenIds = Array.isArray( hidden ) ? hidden : [] ;
    const activeIds = Array.isArray( active ) ? active : [] ;

    return ids.filter( id => !hiddenIds.includes( id ) || activeIds.includes( id ) ) ;
} ;
