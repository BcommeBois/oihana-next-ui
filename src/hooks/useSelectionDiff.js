'use client' ;

/**
 * What a reader has changed in a selection : what to add, what to remove.
 *
 * An attachment screen never saves a selection — it saves a DIFFERENCE. The
 * server is told « attach these two, detach that one », not « here are the
 * fourteen that should end up attached », because two readers editing the same
 * entity would then overwrite each other's work wholesale.
 *
 * 🚨 **A locked key never reaches the difference.** `locked` marks the rows
 * this reader is not allowed to attach or detach — rows they can see but not
 * touch. Filtering them out of the RENDERING is not enough : a locked key that
 * finds its way into the selection, through a state inherited from a previous
 * entity, a group tick or a reload, would travel to the server as an ordinary
 * change. The guard lives here rather than at the call site precisely because
 * that is the line nobody writes again in the fourth copy.
 *
 * ⚠️ **It does not own what is selectable**, only what is selected. Which rows
 * exist, which are locked and what a group tick covers are the caller's : the
 * hook is handed keys and gives keys back.
 *
 * @module hooks/useSelectionDiff
 *
 * @param {Iterable<string>} [initial]        - The keys attached when the screen opened. The baseline the difference is measured against.
 * @param {Object}           [options]
 * @param {Set<string>}      [options.locked] - Keys this reader may not change. Kept out of `toAdd` and `toRemove`.
 *
 * @returns {{
 *   dirty      : boolean ,
 *   reset      : Function ,
 *   selected   : Set<string> ,
 *   setSelected: Function ,
 *   toAdd      : string[] ,
 *   toRemove   : string[] ,
 *   toggle     : Function ,
 *   toggleMany : Function ,
 * }} `toggle( key , next )` sets one key, `toggleMany( keys , next )` a whole group ; `next` omitted flips it.
 *
 * @example
 * ```jsx
 * const { dirty , selected , toAdd , toRemove , toggle } = useSelectionDiff( attachedKeys , { locked } ) ;
 *
 * <FormModal dirty={ dirty } onSave={ () => save( toAdd , toRemove ) }>
 *     { catalog.map( item => (
 *         <Checkbox
 *             checked  = { selected.has( item.key ) }
 *             disabled = { locked.has( item.key ) }
 *             key      = { item.key }
 *             onChange = { event => toggle( item.key , event.target.checked ) }
 *         />
 *     ) ) }
 * </FormModal>
 * ```
 */

import { useCallback , useMemo , useState } from 'react' ;

const useSelectionDiff = ( initial , { locked } = {} ) =>
{
    const initialKeys = useMemo( () => new Set( initial ?? [] ) , [ initial ] ) ;

    const [ selected , setSelected ] = useState( () => new Set( initial ?? [] ) ) ;

    const { toAdd , toRemove } = useMemo( () =>
    {
        const add    = [] ;
        const remove = [] ;

        for ( const key of selected )
        {
            if ( locked?.has( key ) )      { continue ; }
            if ( !initialKeys.has( key ) ) { add.push( key ) ; }
        }

        for ( const key of initialKeys )
        {
            if ( locked?.has( key ) )   { continue ; }
            if ( !selected.has( key ) ) { remove.push( key ) ; }
        }

        return { toAdd : add , toRemove : remove } ;
    }
    , [ initialKeys , locked , selected ] ) ;

    const toggle = useCallback( ( key , next ) =>
    {
        if ( !key || locked?.has( key ) ) { return ; }

        setSelected( ( previous ) =>
        {
            const wanted = next ?? !previous.has( key ) ;

            if ( wanted === previous.has( key ) ) { return previous ; }

            const copy = new Set( previous ) ;

            if ( wanted ) { copy.add( key ) ; }
            else          { copy.delete( key ) ; }

            return copy ;
        }) ;
    }
    , [ locked ] ) ;

    const toggleMany = useCallback( ( keys , next ) =>
    {
        setSelected( ( previous ) =>
        {
            const copy = new Set( previous ) ;

            for ( const key of ( keys ?? [] ) )
            {
                if ( !key || locked?.has( key ) ) { continue ; }
                if ( next ) { copy.add( key ) ; }
                else        { copy.delete( key ) ; }
            }

            return copy ;
        }) ;
    }
    , [ locked ] ) ;

    const reset = useCallback( () => setSelected( new Set( initialKeys ) ) , [ initialKeys ] ) ;

    return {
        dirty : toAdd.length > 0 || toRemove.length > 0 ,
        reset ,
        selected ,
        setSelected ,
        toAdd ,
        toRemove ,
        toggle ,
        toggleMany ,
    } ;
} ;

export default useSelectionDiff ;
