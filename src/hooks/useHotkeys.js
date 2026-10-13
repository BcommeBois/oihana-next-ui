'use client' ;

import { useEffect , useRef } from 'react' ;

import isEditableTarget from '../helpers/keyboard/isEditableTarget' ;
import matchesHotkey    from '../helpers/keyboard/matchesHotkey' ;
import parseHotkey      from '../helpers/keyboard/parseHotkey' ;

/**
 * Keys that do things : the function keys of a handheld, a trigger that
 * sends a key, « V » to confirm a line at a desk, `ctrl+s` to save.
 *
 * `map` names each hotkey as text — `'F1'`, `'ctrl+s'`, `'shift+Enter'`,
 * `'v'` — or as a `keyCode` number for a device whose trigger sends no
 * name, and gives it a handler called with the event ; what is handled is
 * `preventDefault`ed. 🔑 **A letter typed into a field stays a letter** :
 * a hotkey without `ctrl`, `alt` or `meta` is ignored while an input, a
 * textarea, a select or a contenteditable has the focus — except the
 * function keys and `Escape`, which a handheld sends whatever has the
 * focus, and which no field types.
 *
 * `scope` is a ref to an element : only keys pressed inside it are heard ;
 * without one, the document is. The latest `map` is always the one used,
 * so inline handlers cost nothing.
 *
 * @module hooks/useHotkeys
 *
 * @param {Object.<string|number,Function>} map - Hotkey → `( event ) => void`.
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true]
 * @param {boolean} [options.inFields=false] - Hear plain letters in fields too. For a screen with no text field.
 * @param {React.RefObject<HTMLElement>} [options.scope] - The element the keys are heard in.
 *
 * @example
 * ```jsx
 * useHotkeys(
 * {
 *     'F1'     : () => useLabel( 0 ) ,
 *     'v'      : () => confirm() ,
 *     'ctrl+s' : () => save() ,
 *     120      : () => trigger() ,   // a handheld's trigger, by keyCode
 * } , { enabled : step === 'lines' } ) ;
 * ```
 */
const useHotkeys = ( map , { enabled = true , inFields = false , scope } = {} ) =>
{
    const latest = useRef( map ) ;

    useEffect( () =>
    {
        latest.current = map ;
    } ) ;

    useEffect( () =>
    {
        if ( !enabled || typeof document === 'undefined' )
        {
            return undefined ;
        }

        const target = scope?.current ?? document ;

        const onKeyDown = event =>
        {
            const entries = Object.entries( latest.current ?? {} ) ;

            for ( const [ text , handler ] of entries )
            {
                const hotkey = parseHotkey( /^\d+$/.test( text ) ? Number( text ) : text ) ;

                if ( !matchesHotkey( event , hotkey ) )
                {
                    continue ;
                }

                const bare = !hotkey.ctrl && !hotkey.alt && !hotkey.meta && hotkey.keyCode === null && !/^F\d{1,2}$/.test( hotkey.key ?? '' ) && hotkey.key !== 'Escape' ;

                if ( bare && !inFields && isEditableTarget( event.target ) )
                {
                    continue ;
                }

                event.preventDefault() ;
                handler?.( event ) ;
                return ;
            }
        } ;

        target.addEventListener( 'keydown' , onKeyDown ) ;

        return () => target.removeEventListener( 'keydown' , onKeyDown ) ;
    }
    , [ enabled , inFields , scope ] ) ;
} ;

export default useHotkeys ;
