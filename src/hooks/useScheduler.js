import { useMemo } from 'react' ;

import useValue from './useValue' ;

import usePalette from './usePalette' ;

import { assignColors }   from '../helpers/schedule/assignColors' ;
import { fromSchemaList } from '../helpers/schedule/fromSchema' ;
import { normalizeEvent , resolveResourceId } from '../helpers/schedule/normalizeEvent' ;
import { readSchedules }  from '../helpers/schedule/expandSchedule' ;
import { toSchemaPatch }  from '../helpers/schedule/toSchemaPatch' ;

import { AGENDA , getViewWindow , stepViewDate } from '../helpers/schedule/getViewWindow' ;

/**
 * State of a scheduler : the events, the view, and the date being looked at.
 *
 * The three are independent and each is controlled or uncontrolled on its own,
 * so an application can own the events while letting the component keep the
 * navigation, which is the common case.
 *
 * **The events are the consumer's own objects, never the normalized records.**
 * `onChange` hands back an array of the same shape that was passed in — JSON-LD
 * stays JSON-LD — and the normalized records are a read-only projection the views
 * consume. A component that handed back its own internal shape would force every
 * application to convert twice.
 *
 * Moves apply optimistically in uncontrolled mode : a rejected promise returned
 * by `onChange` restores the previous state. Same contract as `useKanban`.
 *
 * @param {Object} [props]
 * @param {Array}    [props.defaultEvents]  - Initial events for uncontrolled mode.
 * @param {Array}    [props.events]         - Controlled events.
 * @param {Function} [props.onChange]       - `( nextEvents , change ) => void|Promise`.
 * @param {boolean}  [props.schema=false]   - Read the events as schema.org JSON-LD.
 * @param {Function} [props.getEventId]     - Reads an event's identity.
 * @param {Function} [props.getResourceId]  - Reads the timeline row an event belongs to.
 * @param {Function} [props.getColor]       - Reads an event's display color.
 * @param {boolean}  [props.allDayEndInclusive=true] - A bare `Date` end covers its own day.
 * @param {number}   [props.defaultDuration] - Length of an event stating neither end nor duration.
 * @param {string}   [props.defaultView='agenda'] - Initial view for uncontrolled mode.
 * @param {string}   [props.view]           - Controlled view.
 * @param {Function} [props.onViewChange]   - Called with the new view.
 * @param {Date}     [props.defaultDate]    - Initial anchor for uncontrolled mode.
 * @param {Date}     [props.date]           - Controlled anchor.
 * @param {Function} [props.onDateChange]   - Called with the new anchor.
 * @param {number}   [props.days=7]         - Length of the agenda window.
 * @param {number|string} [props.weekStartsOn] - Force the first day of week ; defaults to the locale.
 *
 * @returns {Object} `{ sources , events , window , view , setView , date , setDate ,
 *          today , previous , next , canMove , moveEvent , resizeEvent , updateEvent ,
 *          addEvent , removeEvent , isControlled }`
 *
 * @example
 * ```js
 * const { events , window , previous , next , moveEvent } = useScheduler(
 * {
 *     schema     : true ,
 *     events     : reservations ,
 *     getEventId : source => source._key ,
 *     onChange   : ( next , change ) => api.save( change ) ,
 * }) ;
 * ```
 *
 * @remarks
 * The normalized records are recomputed whenever the events, the window or an
 * accessor changes. Accessors declared inline change identity on every render ;
 * with a large payload, hoist them with `useCallback`.
 */
const useScheduler = ( props = {} ) =>
{
    const {
        defaultEvents ,
        events : eventsFromProps ,
        onChange ,

        schema = false ,
        getEventId ,
        getResourceId ,
        getColor ,
        palette ,
        getColorKey ,
        colorKeys ,
        allDayEndInclusive = true ,
        defaultDuration ,

        defaultView = AGENDA ,
        view : viewFromProps ,
        onViewChange ,

        defaultDate ,
        date : dateFromProps ,
        onDateChange ,

        days = 7 ,
        weekStartsOn ,
    } = props ;

    const [ sources , setSources , isControlled ] = useValue( defaultEvents ?? [] , eventsFromProps ) ;
    const [ view , setView ] = useValue( defaultView , viewFromProps , onViewChange ) ;
    const [ date , setDate ] = useValue( defaultDate ?? new Date() , dateFromProps , onDateChange ) ;

    const window = useMemo
    (
        () => getViewWindow( view , date , { days , weekStartsOn } ) ,
        [ view , date , days , weekStartsOn ] ,
    ) ;

    // ---- palette
    //
    // What decides a colour is a business property — a room, a round — so the
    // accessor reads the *source*, not the normalized record. Without one, the
    // resource is the obvious intent and the default.
    const readColorKey = useMemo
    (
        () => getColorKey ?? ( source => resolveResourceId( getResourceId ? getResourceId( source ) : source?.location ) ) ,
        [ getColorKey , getResourceId ] ,
    ) ;

    const keys = useMemo( () =>
    {
        if ( !palette )
        {
            return [] ;
        }
        if ( Array.isArray( colorKeys ) )
        {
            return colorKeys ;
        }
        return ( Array.isArray( sources ) ? sources : [] ).map( readColorKey ) ;
    }
    , [ palette , colorKeys , sources , readColorKey ] ) ;

    const paletteColors = usePalette({ palette : palette || undefined , count : Math.max( 1 , new Set( keys ).size ) }) ;

    const colorByKey = useMemo
    (
        () => ( palette ? assignColors( keys , paletteColors , { sort : !Array.isArray( colorKeys ) } ) : new Map() ) ,
        [ palette , keys , paletteColors , colorKeys ] ,
    ) ;

    // The source's own colour always wins : the data said so, and a palette is
    // only there to answer for what the data left unsaid.
    const resolveColor = useMemo( () => ( source ) =>
    {
        const own = getColor ? getColor( source ) : source?.color ;

        if ( own )
        {
            return own ;
        }
        if ( colorByKey.size === 0 )
        {
            return null ;
        }

        const key = readColorKey( source ) ;
        return key === null || key === undefined ? null : ( colorByKey.get( String( key ) ) ?? null ) ;
    }
    , [ getColor , colorByKey , readColorKey ] ) ;

    const events = useMemo( () =>
    {
        const list = schema
            ? fromSchemaList( sources , { window , allDayEndInclusive , defaultDuration , getEventId , getResourceId , getColor : resolveColor } )
            : ( Array.isArray( sources ) ? sources : [] )
                .map( ( source , index ) => normalizeEvent( source , { allDayEndInclusive , defaultDuration , getEventId , getResourceId , index } ) )
                .filter( Boolean )
                // `normalizeEvent` reads `color` off the object ; the palette answers
                // for the ones that named none, exactly as it does on the schema path.
                .map( event => ( event.color ? event : { ...event , color : resolveColor( event.source ) } ) ) ;

        // A dated event is read whatever the window ; only a recurring rule is
        // expanded within it. Clipping here keeps both paths saying the same thing.
        return list
            .filter( event => event.end > window.start && event.start < window.end )
            .sort( ( a , b ) => a.start - b.start || a.end - b.end ) ;
    }
    , [ sources , window , schema , allDayEndInclusive , defaultDuration , getEventId , getResourceId , resolveColor ] ) ;

    // ---- navigation

    const today    = () => setDate( new Date() ) ;
    const previous = () => setDate( stepViewDate( view , date , -1 , { days } ) ) ;
    const next     = () => setDate( stepViewDate( view , date ,  1 , { days } ) ) ;

    // ---- mutations

    /** Accepts a normalized record or an id, and returns the record. */
    const resolve = ( target ) => ( typeof target === 'object' && target !== null ? target : events.find( event => event.id === target ) ) ;

    /**
     * Applies a patch to one source and reports it, optimistically.
     *
     * @param {Object} event - The normalized record being changed.
     * @param {Object} patch - What to merge into its source.
     * @param {Object} change - The rest of the change descriptor.
     */
    const commit = ( event , patch , change ) =>
    {
        const previousSources = Array.isArray( sources ) ? sources : [] ;
        const index           = previousSources.indexOf( event.source ) ;

        if ( index === -1 )
        {
            return ;
        }

        const nextSources    = [ ...previousSources ] ;
        nextSources[ index ] = { ...event.source , ...patch } ;

        report( previousSources , nextSources , { ...change , event , source : event.source , patch } ) ;
    } ;

    const report = ( previousSources , nextSources , change ) =>
    {
        if ( !isControlled )
        {
            setSources( nextSources ) ;
        }

        if ( typeof onChange === 'function' )
        {
            const result = onChange( nextSources , change ) ;

            if ( !isControlled && result && typeof result.catch === 'function' )
            {
                result.catch( () => setSources( previousSources ) ) ;
            }
        }
    } ;

    /**
     * Writes a new span back into a source, in the spelling it came in.
     *
     * `resourceId` is only written in plain mode : in schema mode nothing says
     * which property named the resource — an accessor read it — so inverting that
     * is the application's call, and the change descriptor carries the value for it.
     */
    const spanPatch = ( event , { start , end } ) => schema
        ? toSchemaPatch({ start , end , allDay : event.allDay } , { allDayEndInclusive })
        : { start : new Date( start ) , end : new Date( end ) } ;

    /**
     * Refuses to rewrite a recurring rule through one of its occurrences.
     *
     * Moving a single occurrence of a series is the « this one or all the
     * following » problem, which belongs to the RRULE tier and is deliberately out
     * of scope. Writing the patch anyway would silently move **every** occurrence.
     */
    const isOccurrence = ( event ) => readSchedules( event?.source ).length > 0 ;

    const guard = ( event , action ) =>
    {
        if ( !event )
        {
            return false ;
        }

        if ( isOccurrence( event ) )
        {
            if ( process.env.NODE_ENV === 'development' )
            {
                console.warn( `useScheduler: ${ action } was refused on "${ event.id }" — it is one occurrence of a recurring rule, and writing to it would move the whole series.` ) ;
            }
            return false ;
        }

        return true ;
    } ;

    /**
     * Whether a gesture on this event would be accepted.
     *
     * A view asks **before** offering the gesture, because a drag that quietly
     * does nothing when released is worse than one that was never offered : the
     * reader is left thinking the move was saved.
     *
     * @param {Object|string} target - The record, or its id.
     * @returns {boolean}
     */
    const canMove = ( target ) =>
    {
        const event = resolve( target ) ;

        return !!event && !isOccurrence( event ) ;
    } ;

    const span = ( event ) => ({ start : event.start , end : event.end , resourceId : event.resourceId }) ;

    /**
     * Moves an event, keeping its length unless a new end is given.
     *
     * @param {Object|string} target - The record, or its id.
     * @param {Object} to - `{ start , end , resourceId }` ; `end` defaults to `start` plus the current length.
     */
    const moveEvent = ( target , to = {} ) =>
    {
        const event = resolve( target ) ;

        if ( !guard( event , 'moveEvent' ) )
        {
            return ;
        }

        const start = to.start ?? event.start ;
        const end   = to.end ?? start + ( event.end - event.start ) ;

        commit( event , spanPatch( event , { start , end } ) ,
        {
            type : 'move' ,
            from : span( event ) ,
            to   : { start , end , resourceId : to.resourceId ?? event.resourceId } ,
        }) ;
    } ;

    /**
     * Changes one edge of an event, or both.
     *
     * @param {Object|string} target - The record, or its id.
     * @param {Object} to - `{ start , end }` ; whichever is omitted keeps its value.
     */
    const resizeEvent = ( target , to = {} ) =>
    {
        const event = resolve( target ) ;

        if ( !guard( event , 'resizeEvent' ) )
        {
            return ;
        }

        const start = to.start ?? event.start ;
        const end   = to.end ?? event.end ;

        if ( end <= start )
        {
            return ;
        }

        commit( event , spanPatch( event , { start , end } ) ,
        {
            type : 'resize' ,
            from : span( event ) ,
            to   : { start , end , resourceId : event.resourceId } ,
        }) ;
    } ;

    /**
     * Merges arbitrary properties into an event's source — what an editor commits.
     *
     * The properties are the **source's own**, so a house subtype's property is
     * written under the name it has server-side and nothing here needs to know it.
     *
     * @param {Object|string} target - The record, or its id.
     * @param {Object} patch - Properties to merge.
     */
    const updateEvent = ( target , patch ) =>
    {
        const event = resolve( target ) ;

        if ( !event || !patch )
        {
            return ;
        }

        commit( event , patch , { type : 'update' , from : span( event ) , to : span( event ) }) ;
    } ;

    /**
     * Appends a new event, in the consumer's own shape.
     *
     * @param {Object} source - The object to add, spelled the way the payload is.
     */
    const addEvent = ( source ) =>
    {
        if ( source === null || typeof source !== 'object' )
        {
            return ;
        }

        const previousSources = Array.isArray( sources ) ? sources : [] ;
        const nextSources     = [ ...previousSources , source ] ;

        report( previousSources , nextSources , { type : 'create' , event : null , source , patch : source }) ;
    } ;

    /**
     * Removes an event.
     *
     * @param {Object|string} target - The record, or its id.
     */
    const removeEvent = ( target ) =>
    {
        const event = resolve( target ) ;

        if ( !event )
        {
            return ;
        }

        const previousSources = Array.isArray( sources ) ? sources : [] ;
        const index           = previousSources.indexOf( event.source ) ;

        if ( index === -1 )
        {
            return ;
        }

        const nextSources = previousSources.filter( ( _ , position ) => position !== index ) ;

        report( previousSources , nextSources , { type : 'delete' , event , source : event.source , from : span( event ) , to : null }) ;
    } ;

    return {
        sources ,
        events ,
        window ,
        view ,
        setView ,
        date ,
        setDate ,
        today ,
        previous ,
        next ,
        canMove ,
        moveEvent ,
        resizeEvent ,
        updateEvent ,
        addEvent ,
        removeEvent ,
        isControlled ,
    } ;
} ;

export default useScheduler ;
