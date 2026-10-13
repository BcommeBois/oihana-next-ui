/**
 * Whether a key pressed on this element would type into it : an input, a
 * textarea, a select, anything `contenteditable` — where a hotkey made of
 * a letter must stay a letter.
 *
 * @module helpers/keyboard/isEditableTarget
 *
 * @param {?EventTarget} target
 * @returns {boolean}
 */
const isEditableTarget = target =>
{
    if ( !target || typeof target !== 'object' )
    {
        return false ;
    }

    const tag = String( target.tagName ?? '' ).toLowerCase() ;

    if ( tag === 'textarea' || tag === 'select' )
    {
        return true ;
    }

    if ( tag === 'input' )
    {
        const type = String( target.type ?? 'text' ).toLowerCase() ;
        return ![ 'button' , 'checkbox' , 'color' , 'file' , 'hidden' , 'image' , 'radio' , 'range' , 'reset' , 'submit' ].includes( type ) ;
    }

    return target.isContentEditable === true ;
} ;

export default isEditableTarget ;
