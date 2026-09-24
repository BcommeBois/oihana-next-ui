/**
 * What {@link module:components/CopyBadge} and
 * {@link module:components/ContactBadge} share : where their copy label is
 * read, the colour a copy's outcome paints the badge with, and the icon size
 * that goes with each badge size.
 *
 * Both show a value and copy it, so a reader meets the same glyph, the same
 * colour and the same word in either — which only holds if the two read it
 * from one place.
 *
 * @module components/badgeCopy
 */

import { ERROR as COPY_ERROR , SUCCESS as COPY_SUCCESS } from '../hooks/useClipboard' ;

import { ERROR , SUCCESS } from '../themes/components/badge' ;

/**
 * Where the copy tooltip is read when the host names no bundle of its own.
 * @type {string}
 */
export const COPY_I18N_PATH = 'components.badges.copy' ;

/**
 * Where a contact badge reads its action labels when the host names none.
 * @type {string}
 */
export const CONTACT_I18N_PATH = 'components.badges.contact' ;

/**
 * The badge colour a copy's outcome takes over with, until the clipboard
 * state returns to `ready`. Absent from the map means « keep the resting
 * colour », which is what `ready` is.
 *
 * @type {Object.<string,string>}
 */
export const STATE_COLOR =
{
    [ COPY_SUCCESS ] : SUCCESS ,
    [ COPY_ERROR ]   : ERROR ,
} ;

/**
 * The glyph's size for each badge size.
 *
 * Whole class names, never built at runtime : Tailwind reads the source to
 * decide what to generate.
 *
 * @type {Object.<string,string>}
 */
export const BADGE_ICON_SIZE =
{
    xs : 'size-3' ,
    sm : 'size-3.5' ,
    md : 'size-4' ,
    lg : 'size-4' ,
    xl : 'size-5' ,
} ;
