'use client' ;

/**
 * ContactBadge — a way of reaching someone, shown as a pill that acts on
 * click, with a copy control beside it.
 *
 * The pill is a link on a URI scheme (`tel:`, `fax:`, `mailto:`) : clicking
 * it dials, faxes or opens a message. The small button next to it copies the
 * value instead, for the reader who wants to paste it elsewhere. Both are
 * offered because neither replaces the other — a number on a desktop without
 * a telephony handler is a number to copy.
 *
 * 🔑 **What is shown is not what is dialled.** The value is displayed as it
 * is stored, separators and all, because that is how a reader recognises it
 * and reads it aloud ; the `href` keeps only the digits and a leading `+`,
 * because that is what a handler can act on. An e-mail, having no such
 * notion, is used verbatim.
 *
 * 🚨 **It does not toast** — it calls `onCopy` / `onCopyError`, for the same
 * reason as {@link module:components/CopyBadge} : the wording belongs to the
 * screen.
 *
 * `disabled` keeps the pill and takes the action away : a value worth showing
 * that cannot be acted on. The copy button stays, unless `copyable` says
 * otherwise.
 *
 * @module components/ContactBadge
 *
 * @example
 * ```jsx
 * <ContactBadge type="phone"  value="01 23 45 67 89" />
 * <ContactBadge type="mobile" value="+33 6 12 34 56 78" />
 * <ContactBadge type="fax"    value="01 23 45 67 90" />
 * <ContactBadge type="email"  value="hello@example.org" />
 *
 * // Shown, but not actionable :
 * <ContactBadge type="phone" value="01 23 45 67 89" disabled />
 *
 * // Another channel entirely :
 * <ContactBadge icon={ MdSms } scheme="sms:" type="mobile" value="+33 6 12 34 56 78" />
 * ```
 */

import { MdCheck , MdContentCopy , MdEmail , MdErrorOutline , MdFax , MdPhone , MdSmartphone } from 'react-icons/md' ;

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import NO_LOCALE from '../contexts/locale/noLocale' ;
import useI18n   from '../contexts/locale/useI18n' ;

import useClipboard , { ERROR as COPY_ERROR , SUCCESS as COPY_SUCCESS } from '../hooks/useClipboard' ;

import getBadgeClassNames from '../themes/components/badge' ;
import cn                 from '../themes/helpers/cn' ;

import { BADGE_ICON_SIZE , CONTACT_I18N_PATH } from './badgeCopy' ;

import Tooltip from './Tooltip' ;

/**
 * The channels known out of the box : which glyph leads the pill, which
 * scheme the link is built on, and whether the value is a number to strip
 * down before it can be acted on.
 *
 * A channel that is not here is reached by passing `icon` and `scheme`.
 *
 * @type {Object.<string,{ Icon : React.ElementType , dialable : boolean , scheme : string }>}
 */
export const CONTACT_CHANNELS =
{
    email  : { Icon : MdEmail      , dialable : false , scheme : 'mailto:' } ,
    fax    : { Icon : MdFax        , dialable : true  , scheme : 'fax:'    } ,
    mobile : { Icon : MdSmartphone , dialable : true  , scheme : 'tel:'    } ,
    phone  : { Icon : MdPhone      , dialable : true  , scheme : 'tel:'    } ,
} ;

/**
 * @param {Object}   props
 * @param {string}   [props.className]      - Additional class names for the pill.
 * @param {import('../themes/components/badge').BadgeColorValue} [props.color='info'] - The pill's colour.
 * @param {boolean}  [props.copyable=true]  - Whether the copy button is offered.
 * @param {boolean}  [props.disabled=false] - Keeps the pill, takes the action away.
 * @param {React.ElementType} [props.icon]  - Replaces the channel's glyph.
 * @param {Function} [props.onCopy]         - Called with the value once it is on the clipboard.
 * @param {Function} [props.onCopyError]    - Called with the error and the value when the write failed.
 * @param {string}   [props.path='components.badges.contact'] - i18n path holding `actions.<type>` and `copy.tooltip`.
 * @param {string}   [props.scheme]         - Replaces the channel's URI scheme.
 * @param {import('../themes/components/badge').BadgeSize}  [props.size='sm']
 * @param {import('../themes/components/badge').BadgeStyle} [props.style] - Optional daisyUI variant ; omitted, the pill is solid.
 * @param {import('../themes/components/tooltip').TooltipAlignment} [props.tooltipAlign='start']
 * @param {import('../themes/components/tooltip').TooltipPosition}  [props.tooltipPosition='bottom']
 * @param {string}   [props.type='phone']   - The channel : `phone`, `mobile`, `fax`, `email`.
 * @param {string|number} props.value       - What is shown, acted on and copied.
 */
const ContactBadge =
({
    className ,
    color = 'info' ,
    copyable = true ,
    disabled = false ,
    icon ,
    onCopy ,
    onCopyError ,
    path = CONTACT_I18N_PATH ,
    scheme ,
    size = 'sm' ,
    style ,
    tooltipAlign = 'start' ,
    tooltipPosition = 'bottom' ,
    type = 'phone' ,
    value ,
}) =>
{
    const channel = CONTACT_CHANNELS[ type ] ?? CONTACT_CHANNELS.phone ;

    const { actions = {} , copy : copyCopy = {} } = useI18n( path , NO_LOCALE , false ) ;

    const [ state , copy ] = useClipboard( { onError : onCopyError , onSuccess : onCopy } ) ;

    const label = value == null ? '' : String( value ).trim() ;

    if ( !notEmpty( label ) ) { return null ; }

    const Icon      = icon ?? channel.Icon ;
    const actionTip = actions[ type ] ;
    const copyTip   = copyCopy.tooltip ?? 'Copy' ;
    const iconClass = cn( BADGE_ICON_SIZE[ size ] ?? BADGE_ICON_SIZE.sm , 'shrink-0' ) ;

    const target = channel.dialable ? label.replace( /[^\d+]/g , '' ) : label ;
    const href   = notEmpty( target ) ? `${ scheme ?? channel.scheme }${ target }` : null ;

    const unreachable = disabled || !href ;

    const pillClassName = getBadgeClassNames
    ({
        after :
        {
            'gap-1 font-semibold' : true ,
            'font-mono' : channel.dialable ,
            'opacity-60 cursor-default' : unreachable ,
            'cursor-pointer transition hover:brightness-95' : !unreachable ,
        } ,
        className ,
        color ,
        size ,
        style ,
    }) ;

    const pillContent =
    (
        <>
            <Icon aria-hidden="true" className={ iconClass } />
            { label }
        </>
    ) ;

    let pill ;

    if ( unreachable )
    {
        pill = <span aria-disabled="true" className={ pillClassName }>{ pillContent }</span> ;
    }
    else
    {
        // The click is stopped, not prevented : the scheme still has to run.
        const anchor =
        (
            <a
                aria-label = { actionTip ? `${ actionTip } : ${ label }` : label }
                className  = { pillClassName }
                href       = { href }
                onClick    = { event => event.stopPropagation() }
            >
                { pillContent }
            </a>
        ) ;

        pill = notEmpty( actionTip )
            ? (
                <Tooltip
                    align     = { tooltipAlign }
                    as        = "span"
                    className = "inline-flex leading-none"
                    position  = { tooltipPosition }
                    tip       = { actionTip }
                >
                    { anchor }
                </Tooltip>
              )
            : anchor ;
    }

    let copyButton = null ;

    if ( copyable )
    {
        const CopyIcon = state === COPY_SUCCESS
            ? MdCheck
            : state === COPY_ERROR
                ? MdErrorOutline
                : MdContentCopy ;

        const handleCopy = event =>
        {
            event.preventDefault() ;
            event.stopPropagation() ;
            copy( label ) ;
        } ;

        copyButton =
        (
            <Tooltip
                align     = { tooltipAlign }
                as        = "span"
                className = "inline-flex leading-none"
                position  = { tooltipPosition }
                tip       = { copyTip }
            >
                <button
                    aria-label = { `${ copyTip } : ${ label }` }
                    className  = { cn
                    (
                        'inline-flex items-center justify-center rounded p-1 cursor-pointer transition hover:bg-base-200' ,
                        state === COPY_SUCCESS ? 'text-success'
                            : state === COPY_ERROR ? 'text-error'
                                : 'text-base-content/50 hover:text-base-content' ,
                    ) }
                    onClick = { handleCopy }
                    type    = "button"
                >
                    <CopyIcon aria-hidden="true" className={ iconClass } />
                </button>
            </Tooltip>
        ) ;
    }

    return (
        <span className="inline-flex items-center gap-1">
            { pill }
            { copyButton }
        </span>
    ) ;
} ;

ContactBadge.displayName = 'ContactBadge' ;

export default ContactBadge ;
