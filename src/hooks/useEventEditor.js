'use client' ;

import { useCallback , useMemo , useState } from 'react' ;

import { isLinkedSpan } from '../helpers/schedule/datePairs' ;
import { resolveFields } from '../helpers/schedule/eventFields' ;
import { toSchemaPatch } from '../helpers/schedule/toSchemaPatch' ;

/** The draft keys that are not properties of the source. */
export const SPAN_KEYS = [ 'allDay' , 'end' , 'start' , 'title' ] ;

/** Where the title lives, on either shape. */
const titleProperty = ( schema ) => ( schema ? 'name' : 'title' ) ;

/**
 * Editing an event, without an interface.
 *
 * The draft, the validation and the single patch that comes out of them. It
 * knows nothing of controls, so a bespoke modal drives it exactly as the built-in
 * panel does — the third of the three levels of openness the group promises.
 *
 * ### The draft is not the event
 *
 * Nothing is written until `submit`. The event on the calendar does not move
 * while its form is being filled, and abandoning the form costs nothing — which
 * is the whole difference between an editor and a gesture.
 *
 * ### What comes out is a patch, spelled the way it was read
 *
 * Only what changed, and **under the properties the values came from** : a
 * lodging booking keeps its `checkinTime`, a house subtype keeps the name its
 * server gave it. That is what the descriptors' `property` is for, and it is why
 * a property added server-side needs nothing here.
 *
 * ### What it refuses, and why that is not a shortcoming
 *
 * **Dates that belong to a linked object** — a reservation does not own the hours
 * of the concert it points at, and rewriting them would reschedule that concert
 * for everyone who booked it. **Object values** — a `Place` put through a text
 * field comes back a string, and the `@type`, the identity and the address are
 * gone without anything looking broken. Both stay readable, and both open up
 * through a descriptor's `render`.
 *
 * @module hooks/useEventEditor
 *
 * @param {Object} [props]
 * @param {Object} [props.event] - The record being edited. Absent for a creation.
 * @param {Array|Function} [props.fields] - Descriptors, or a function of the event.
 * @param {boolean} [props.schema=false] - The source is JSON-LD.
 * @param {{start: number, end: number}} [props.range] - The span a creation starts from.
 * @param {boolean} [props.allDayEndInclusive=true] - Must match how the payload was read.
 * @param {Function} [props.onCommit] - `( patch , { event , isNew } ) => void|Promise`.
 * @param {Function} [props.validate] - `( draft ) => ({ [key]: message }) | null`, for the rules only an application knows.
 *
 * @returns {{ draft: Object, errors: Object, fields: Array, isDirty: boolean, isNew: boolean,
 *          isValid: boolean, reset: Function, setValue: Function, submit: Function }}
 *
 * @example
 * ```js
 * const editor = useEventEditor({ event , schema , onCommit : patch => updateEvent( event , patch ) }) ;
 *
 * editor.setValue( 'title' , 'Réunion' ) ;
 * editor.setValue( 'start' , Date.now() ) ;
 * editor.submit() ;
 * ```
 */
const useEventEditor = ( props = {} ) =>
{
    const {
        allDayEndInclusive = true ,
        event ,
        fields ,
        onCommit ,
        range ,
        schema = false ,
        validate ,
    } = props ;

    const isNew = !event ;

    const rows = useMemo( () => resolveFields( event ?? { source : {} } , { fields , schema }) , [ event , fields , schema ] ) ;

    /** The values the form starts from — the event as it is, or the drawn range. */
    const initial = useMemo( () =>
    {
        const values =
        {
            allDay : event?.allDay ?? false ,
            end    : event?.end ?? range?.end ?? null ,
            start  : event?.start ?? range?.start ?? null ,
            title  : event?.title ?? '' ,
        } ;

        for ( const field of rows )
        {
            values[ field.property ] = field.value ?? '' ;
        }

        return values ;
    }
    , [ event , range , rows ] ) ;

    const [ changes , setChanges ] = useState({}) ;

    /**
     * What is being edited — an event by its identity, a creation by its range.
     *
     * A creation has no id to compare, so without the range standing in for one,
     * a second range drawn further along would open on the first one's draft :
     * the title typed a moment ago, still there, in a form for something else.
     */
    const subject = event?.id ?? ( range ? `new:${ range.start }:${ range.end }` : null ) ;

    const [ edited , setEdited ] = useState( subject ) ;

    // Adjusted during the render rather than in an effect : the draft is derived
    // from what is being edited, and an effect would let one frame of the
    // previous draft through first.
    if ( subject !== edited )
    {
        setEdited( subject ) ;
        setChanges({}) ;
    }

    const draft = useMemo( () => ({ ...initial , ...changes }) , [ initial , changes ] ) ;

    /**
     * Records a change — and only a change.
     *
     * Some controls emit once as they mount, reporting the value they were
     * handed. Left alone, that would mark the form dirty before it is touched and
     * would put the field in the patch, which is how an event ends up rewritten
     * by the mere act of opening its editor.
     */
    const setValue = useCallback( ( key , value ) => setChanges( current =>
    {
        if ( Object.is( current[ key ] , value ) )
        {
            return current ;
        }

        return { ...current , [ key ] : value } ;
    } )
    , [] ) ;

    const reset = useCallback( () => setChanges({}) , [] ) ;

    /** Which rows the form may actually offer a control for. */
    const editableFields = useMemo( () => rows.map( field =>
    {
        const value = draft[ field.property ] ;

        // An object put through a plain control comes back a string — the
        // `@type`, the identity and the address gone, with nothing looking
        // broken. So it stays readable by default.
        //
        // `editable : true` on the descriptor is how that lock is lifted : it
        // says the application supplies a control of its own through
        // `renderField`, and takes responsibility for handing back a whole
        // object rather than a line of text.
        const locked = field.editable !== true
            && value !== null
            && value !== undefined
            && typeof value === 'object' ;

        return { ...field , readOnly : field.readOnly ?? locked , reason : locked ? 'object' : undefined } ;
    } )
    , [ rows , draft ] ) ;

    /** Whether the span may be written at all. */
    const spanLocked = !isNew && isLinkedSpan( event ) ;

    const errors = useMemo( () =>
    {
        const found = {} ;

        if ( draft.start !== null && draft.end !== null && draft.end <= draft.start )
        {
            found.end = 'end' ;
        }

        for ( const field of editableFields )
        {
            if ( field.required && ( draft[ field.property ] === '' || draft[ field.property ] === null || draft[ field.property ] === undefined ) )
            {
                found[ field.property ] = 'required' ;
            }
        }

        // The rules a library cannot guess — no overlap, opening hours, quotas —
        // belong to whoever knows them.
        return { ...found , ...( validate?.( draft ) ?? {} ) } ;
    }
    , [ draft , editableFields , validate ] ) ;

    const isDirty = Object.keys( changes ).length > 0 ;
    const isValid = Object.keys( errors ).length === 0 ;

    /**
     * Builds the patch and hands it over. Only what changed goes in it.
     *
     * @returns {Object|null} The patch, or `null` when there was nothing to send.
     */
    const submit = useCallback( () =>
    {
        if ( !isValid )
        {
            return null ;
        }

        const patch = {} ;

        if ( draft.title !== initial.title )
        {
            patch[ titleProperty( schema ) ] = draft.title ;
        }

        // **A creation always carries its span.** Comparing it to the initial
        // values would find nothing changed — the drawn range *is* the initial
        // value — and an object with no dates is not an event : the adapter
        // refuses it, and nothing ever appears.
        const spanChanged = isNew
            || draft.start !== initial.start
            || draft.end !== initial.end
            || draft.allDay !== initial.allDay ;

        if ( spanChanged && !spanLocked && Number.isFinite( draft.start ) && Number.isFinite( draft.end ) )
        {
            Object.assign
            (
                patch ,
                schema
                    ? toSchemaPatch
                    (
                        { allDay : draft.allDay , end : draft.end , start : draft.start } ,
                        {
                            allDayEndInclusive ,
                            endProperty   : event?.span ? event.span.endProperty : 'endDate' ,
                            startProperty : event?.span ? event.span.startProperty : 'startDate' ,
                        } ,
                    )
                    : { end : new Date( draft.end ) , start : new Date( draft.start ) } ,
            ) ;
        }

        for ( const field of editableFields )
        {
            if ( !field.readOnly && draft[ field.property ] !== initial[ field.property ] )
            {
                patch[ field.property ] = draft[ field.property ] ;
            }
        }

        if ( Object.keys( patch ).length === 0 )
        {
            return null ;
        }

        onCommit?.( patch , { event , isNew }) ;

        return patch ;
    }
    , [ allDayEndInclusive , draft , editableFields , event , initial , isNew , isValid , onCommit , schema , spanLocked ] ) ;

    return { draft , errors , fields : editableFields , isDirty , isNew , isValid , reset , setValue , spanLocked , submit } ;
} ;

export default useEventEditor ;
