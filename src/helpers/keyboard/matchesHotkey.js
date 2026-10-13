import { normalizeKey } from './parseHotkey' ;

/**
 * Whether a keyboard event is the hotkey : the same key, and exactly the
 * same modifiers — `ctrl+s` is not `s`, and `s` is not `ctrl+s`.
 *
 * @module helpers/keyboard/matchesHotkey
 *
 * @param {KeyboardEvent|{ altKey : boolean , ctrlKey : boolean , key : string , keyCode ?: number , metaKey : boolean , shiftKey : boolean }} event
 * @param {import('./parseHotkey').Hotkey} hotkey
 * @returns {boolean}
 */
const matchesHotkey = ( event , hotkey ) =>
{
    if ( !event || !hotkey )
    {
        return false ;
    }

    if ( !!event.altKey !== hotkey.alt || !!event.ctrlKey !== hotkey.ctrl || !!event.metaKey !== hotkey.meta || !!event.shiftKey !== hotkey.shift )
    {
        return false ;
    }

    if ( hotkey.keyCode !== null )
    {
        return event.keyCode === hotkey.keyCode ;
    }

    return normalizeKey( event.key ) === hotkey.key ;
} ;

export default matchesHotkey ;
