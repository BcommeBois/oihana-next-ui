'use client' ;

/**
 * CopyBadge — a value shown in a badge, copied to the clipboard on click.
 *
 * The icon answers : a copy glyph at rest, a check when the write went
 * through, an error glyph when it did not, back to the copy glyph a moment
 * later. The badge borrows the outcome's colour for that same moment, so the
 * answer reads without looking at the glyph.
 *
 * 🚨 **It does not toast.** It calls `onCopy` / `onCopyError` and leaves the
 * wording to the screen — a library component that pops its own toast forces
 * a `ToastProvider` on every host and picks a form of feedback nobody asked
 * for. What was copied is known here ; what to say about it is not.
 *
 * ⚠️ **The click is stopped before it travels.** A badge sitting inside a
 * card or a row that is itself a link must copy, not navigate, so the handler
 * calls `preventDefault` and `stopPropagation`.
 *
 * Renders nothing without a value : an empty badge is a hole in a row, and
 * there would be nothing to copy.
 *
 * @module components/CopyBadge
 *
 * @example
 * ```jsx
 * <CopyBadge value={ reference } />
 *
 * // Feedback owned by the screen :
 * <CopyBadge
 *     value       = { reference }
 *     onCopy      = { () => toast( 'Reference copied.' , SUCCESS ) }
 *     onCopyError = { () => toast( 'Unable to copy.' , ERROR ) }
 * />
 *
 * // Over a cover picture, where a solid badge needs a shadow to stay legible :
 * <CopyBadge value={ reference } onImage tooltipPosition="right" />
 * ```
 */

import { MdCheck , MdContentCopy , MdErrorOutline } from 'react-icons/md' ;

import NO_LOCALE from '../contexts/locale/noLocale' ;
import useI18n   from '../contexts/locale/useI18n' ;

import useClipboard , { ERROR as COPY_ERROR , SUCCESS as COPY_SUCCESS } from '../hooks/useClipboard' ;

import getBadgeClassNames from '../themes/components/badge' ;
import cn                 from '../themes/helpers/cn' ;

import { BADGE_ICON_SIZE , COPY_I18N_PATH , STATE_COLOR } from './badgeCopy' ;

import Tooltip from './Tooltip' ;

/**
 * @param {Object}   props
 * @param {string}   [props.className]     - Additional class names for the badge.
 * @param {import('../themes/components/badge').BadgeColorValue} [props.color='secondary'] - The resting colour ; the outcome's own wins for a moment after a copy.
 * @param {React.ElementType} [props.icon] - Replaces the resting copy glyph.
 * @param {Function} [props.onCopy]        - Called with the value once it is on the clipboard.
 * @param {Function} [props.onCopyError]   - Called with the error and the value when the write failed.
 * @param {boolean}  [props.onImage=false] - Adds a shadow, for a badge laid over a picture.
 * @param {string}   [props.path='components.badges.copy'] - i18n path holding a `tooltip` label.
 * @param {import('../themes/components/badge').BadgeSize}  [props.size='sm']
 * @param {import('../themes/components/badge').BadgeStyle} [props.style] - Optional daisyUI variant ; omitted, the badge is solid.
 * @param {import('../themes/components/tooltip').TooltipAlignment} [props.tooltipAlign='start']
 * @param {import('../themes/components/tooltip').TooltipPosition}  [props.tooltipPosition='bottom']
 * @param {string|number} props.value      - What is shown, and what is copied.
 */
const CopyBadge =
({
    className ,
    color = 'secondary' ,
    icon ,
    onCopy ,
    onCopyError ,
    onImage = false ,
    path = COPY_I18N_PATH ,
    size = 'sm' ,
    style ,
    tooltipAlign = 'start' ,
    tooltipPosition = 'bottom' ,
    value ,
}) =>
{
    const { tooltip = 'Copy' } = useI18n( path , NO_LOCALE , false ) ;

    const [ state , copy ] = useClipboard( { onError : onCopyError , onSuccess : onCopy } ) ;

    const text = value == null ? '' : String( value ) ;

    if ( text.length === 0 ) { return null ; }

    const Icon = state === COPY_SUCCESS
        ? MdCheck
        : state === COPY_ERROR
            ? MdErrorOutline
            : ( icon ?? MdContentCopy ) ;

    const handleClick = event =>
    {
        event.preventDefault() ;
        event.stopPropagation() ;
        copy( text ) ;
    } ;

    return (
        <Tooltip
            align     = { tooltipAlign }
            as        = "span"
            className = "inline-flex leading-none"
            position  = { tooltipPosition }
            tip       = { tooltip }
        >
            <button
                aria-label = { `${ tooltip } : ${ text }` }
                className  = { getBadgeClassNames
                ({
                    after     : { 'gap-1 cursor-pointer font-mono transition hover:brightness-95' : true } ,
                    className : cn( onImage && 'shadow-sm' , className ) ,
                    color     : STATE_COLOR[ state ] ?? color ,
                    size ,
                    style ,
                }) }
                onClick = { handleClick }
                type    = "button"
            >
                <Icon aria-hidden="true" className={ cn( BADGE_ICON_SIZE[ size ] ?? BADGE_ICON_SIZE.sm , 'shrink-0' ) } />
                { text }
            </button>
        </Tooltip>
    ) ;
} ;

CopyBadge.displayName = 'CopyBadge' ;

export default CopyBadge ;
