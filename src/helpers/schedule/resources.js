/**
 * The rows of a timeline : what they are, in which order, and what they are called.
 *
 * An event says **which** resource it belongs to — through `getResourceId`, since
 * no schema.org property means « resource ». It never says what the resources
 * *are*, and a planner needs three things a list of events cannot supply :
 *
 * - **the order** — rooms are not arranged at random, and a grid that reorders
 *   itself as bookings come and go is a grid nobody can read twice ;
 * - **the empty ones** — a room free all day is an answer, not an absence, and
 *   deriving rows from events makes exactly that answer disappear ;
 * - **the names** — `salle-bleue` is an identifier, `Salle Bleue` is a room.
 *
 * Hence a declared list, and a derivation only as a fallback : useful for a first
 * look at a payload, never right for a plan.
 *
 * @module helpers/schedule/resources
 */

/** The row an event with no resource of its own falls into. */
export const UNASSIGNED = '__unassigned__' ;

/**
 * Reads the identity of a declared resource, whatever shape it arrived in.
 *
 * @param {*} resource - A string, or an object naming itself.
 * @returns {string|null}
 */
export const readResourceKey = ( resource ) =>
{
    if ( resource === null || resource === undefined )
    {
        return null ;
    }

    if ( typeof resource !== 'object' )
    {
        return String( resource ) ;
    }

    const key = resource._key ?? resource.identifier ?? resource.id ?? resource.url ?? null ;

    return key === null || key === undefined || key === '' ? null : String( key ) ;
} ;

/**
 * @typedef {Object} SchedulerResource
 * @property {string} id     - What an event's `resourceId` is matched against.
 * @property {string} name   - What the row is called.
 * @property {*}      source - The object it was declared as, untouched.
 */

/**
 * Resolves the rows a timeline draws.
 *
 * @param {Object} [options]
 * @param {Array} [options.resources] - The declared list. Strings or objects.
 * @param {Array} [options.events] - Normalized records, used only when nothing was declared.
 * @param {Function} [options.getResourceName] - Reads a row's label off its source.
 * @param {boolean} [options.showUnassigned=true] - Keep a row for the events belonging to none.
 * @param {string} [options.unassignedLabel] - What that row is called.
 * @returns {Array<SchedulerResource>}
 *
 * @example
 * resolveResources({ resources : rooms })
 * // → [ { id : 'auditorium' , name : 'Auditorium' , source : {…} } , … ]
 *
 * // Nothing declared : the rows are whatever the events mention, in first-seen order.
 * resolveResources({ events })
 */
export const resolveResources = ( options = {} ) =>
{
    const {
        events = [] ,
        getResourceName ,
        resources ,
        showUnassigned = true ,
        unassignedLabel = '—' ,
    } = options ;

    const list = [] ;
    const seen = new Set() ;

    const push = ( id , source ) =>
    {
        if ( id === null || seen.has( id ) )
        {
            return ;
        }

        seen.add( id ) ;

        const named = getResourceName ? getResourceName( source ) : null ;

        list.push
        ({
            id ,
            name : named ?? ( typeof source === 'object' && source !== null ? ( source.name ?? source.alternateName ?? id ) : id ) ,
            source ,
        }) ;
    } ;

    if ( Array.isArray( resources ) )
    {
        for ( const resource of resources )
        {
            push( readResourceKey( resource ) , resource ) ;
        }
    }
    else
    {
        // Derived : first seen, first placed. It is the only order available, and
        // it is why this is a fallback rather than the way.
        for ( const event of events )
        {
            if ( event?.resourceId !== null && event?.resourceId !== undefined )
            {
                push( String( event.resourceId ) , event.resourceId ) ;
            }
        }
    }

    // An event whose resource was never declared would otherwise be drawn
    // nowhere — which is how a booking silently disappears from a plan.
    const orphan = events.some( event => event?.resourceId === null || event?.resourceId === undefined || !seen.has( String( event.resourceId ) ) ) ;

    if ( showUnassigned && orphan )
    {
        list.push({ id : UNASSIGNED , name : unassignedLabel , source : null }) ;
    }

    return list ;
} ;

/**
 * Groups events by the row they belong to.
 *
 * @param {Array} events - Normalized records.
 * @param {Array<SchedulerResource>} resources - The rows, in order.
 * @returns {Map<string, Array>} One entry per row, in the rows' own order.
 *
 * @example
 * const byRow = groupByResource( events , rows ) ;
 * byRow.get( 'auditorium' ) // the bookings of that room
 */
export const groupByResource = ( events , resources ) =>
{
    const groups = new Map( resources.map( resource => [ resource.id , [] ] ) ) ;

    for ( const event of events ?? [] )
    {
        const id = event?.resourceId === null || event?.resourceId === undefined ? null : String( event.resourceId ) ;

        const row = id !== null && groups.has( id ) ? id : UNASSIGNED ;

        groups.get( row )?.push( event ) ;
    }

    return groups ;
} ;

export default resolveResources ;
