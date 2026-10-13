/**
 * Reads a hotkey written as text — `'ctrl+s'`, `'F1'`, `'shift+Enter'`,
 * `'meta+k'` — into what a keyboard event is compared to.
 *
 * Modifiers are `ctrl`, `alt`, `shift`, `meta` (`cmd` and `command` read as
 * `meta`, `option` as `alt`), in any order, joined by `+`. The key is the
 * event's `key`, case kept for named keys (`'Enter'`, `'Escape'`,
 * `'ArrowDown'`, `'F1'`), lowercased for a character. A number is a
 * `keyCode`, for a device whose trigger sends no name.
 *
 * @module helpers/keyboard/parseHotkey
 *
 * @typedef {Object} Hotkey
 * @property {boolean} alt
 * @property {boolean} ctrl
 * @property {?string} key - The `event.key` expected ; `null` when `keyCode` is used.
 * @property {?number} keyCode
 * @property {boolean} meta
 * @property {boolean} shift
 *
 * @param {string|number} text
 * @returns {Hotkey}
 *
 * @example
 * ```js
 * parseHotkey( 'ctrl+shift+S' ) ; // → { ctrl : true , shift : true , alt : false , meta : false , key : 's' , keyCode : null }
 * parseHotkey( 120 ) ;            // → { …, key : null , keyCode : 120 }
 * ```
 */

const MODIFIERS = { alt : 'alt' , cmd : 'meta' , command : 'meta' , control : 'ctrl' , ctrl : 'ctrl' , meta : 'meta' , option : 'alt' , shift : 'shift' } ;

/** The key as it is compared : named keys keep their case, a character loses it. */
export const normalizeKey = key =>
{
    const value = String( key ?? '' ) ;

    if ( value === ' ' || value.toLowerCase() === 'space' ) return ' ' ;
    if ( value.toLowerCase() === 'esc' ) return 'Escape' ;

    return value.length === 1 ? value.toLowerCase() : value ;
} ;

const parseHotkey = text =>
{
    const hotkey = { alt : false , ctrl : false , key : null , keyCode : null , meta : false , shift : false } ;

    if ( typeof text === 'number' )
    {
        hotkey.keyCode = text ;
        return hotkey ;
    }

    const parts = String( text ?? '' ).split( '+' ).map( part => part.trim() ).filter( Boolean ) ;

    for ( const part of parts )
    {
        const modifier = MODIFIERS[ part.toLowerCase() ] ;

        if ( modifier && parts.length > 1 )
        {
            hotkey[ modifier ] = true ;
        }
        else
        {
            hotkey.key = normalizeKey( part ) ;
        }
    }

    return hotkey ;
} ;

export default parseHotkey ;
