'use client' ;

/**
 * Megamenu component for DaisyUI 5.6.
 *
 * A data-driven megamenu : each item renders a trigger button + a native popover
 * holding its content. Unique HTML ids (`popovertarget` / `popover`) are derived
 * from `useId()`, so no manual id wiring is needed. Anchoring is handled by
 * DaisyUI's CSS (native popover API + CSS anchor positioning).
 *
 * Several megamenus can coexist on a page : basic ones anchor each popover to its
 * own preceding trigger (CSS anchor resolution is DOM-order based), and `wide` /
 * `full` get a unique per-instance anchor name (see below) instead of daisyUI's
 * shared `--megamenu`, so they never collide.
 *
 * ⚠️ At most **10** popovers per megamenu (DaisyUI limit). Requires a browser with
 * popover + anchor positioning support (progressive enhancement — no polyfill).
 *
 * @module components/menus/Megamenu
 * @see https://daisyui.com/components/megamenu
 *
 * @example
 * ```jsx
 * <Megamenu
 *     responsive
 *     width="wide"
 *     items={[
 *         { label: 'Services', links: [ { label: 'Enterprise', href: '#' }, { label: 'Security', href: '#' } ] },
 *         { label: 'AI',       content: <div className="p-4">Custom content</div> },
 *     ]}
 * />
 * ```
 */

import { Fragment, useId } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import getMegamenuClasses, { FULL, MEGAMENU_ACTIVE, WIDE } from '../../themes/navigation/megamenu' ;
import getMenuClasses from '../../themes/navigation/menu' ;

/**
 * DaisyUI supports at most 10 popovers inside a megamenu.
 * @type {number}
 */
export const MAX_POPOVERS = 10 ;

/**
 * @typedef {Object} MegamenuItem
 * @property {string} label - Trigger button label.
 * @property {React.ReactNode} [content] - Popover content (takes precedence over `links`).
 * @property {Array<{ label: string, href?: string }>} [links] - Convenience : renders a `menu` of links.
 */

/**
 * @param {Object} props
 * @param {string} [props.className] - Extra classes for the megamenu container.
 * @param {MegamenuItem[]} [props.items=[]] - Menu items (max 10).
 * @param {string} [props.popoverClassName] - Extra classes for each popover panel.
 * @param {React.Ref} [props.ref] - Forwarded ref on the container.
 * @param {boolean} [props.responsive=false] - Add a mobile trigger button + vertical layout on small screens.
 * @param {import('../../themes/navigation/megamenu').MegamenuSize} [props.size] - Megamenu size.
 * @param {string} [props.triggerClassName] - Extra classes for the mobile trigger button.
 * @param {string} [props.triggerLabel='Menu'] - Mobile trigger button label.
 * @param {boolean} [props.vertical=false] - Always vertical layout.
 * @param {import('../../themes/navigation/megamenu').MegamenuWidth} [props.width] - Width modifier ('wide' | 'full').
 */
const Megamenu =
({
    className ,
    items = [] ,
    popoverClassName ,
    ref ,
    responsive = false ,
    size ,
    style ,
    triggerClassName ,
    triggerLabel = 'Menu' ,
    vertical = false ,
    width ,
    ...rest
}) =>
{
    const uid = useId() ;

    // useId() can contain ':' — strip to a clean base usable as an HTML id.
    const base        = `megamenu-${ uid.replace( /[^a-z0-9]/gi , '' ) }` ;
    const containerId = base ;

    // wide / full anchor every popover to the container via a shared CSS anchor.
    // DaisyUI hard-codes `--megamenu`, which collides when several coexist ; we
    // give each instance a unique anchor name (inline style, so JIT-proof) — this
    // mirrors daisyUI's manual `[anchor-name:--megamenu-x]` pattern automatically.
    const anchored   = width === WIDE || width === FULL ;
    const anchorName = `--${ base }` ;

    const list = Array.isArray( items ) ? items.slice( 0 , MAX_POPOVERS ) : [] ;

    if ( process.env.NODE_ENV !== 'production' && Array.isArray( items ) && items.length > MAX_POPOVERS )
    {
        console.warn( `[Megamenu] DaisyUI supports at most ${ MAX_POPOVERS } popovers ; ${ items.length } provided, extra items are ignored.` ) ;
    }

    const classes = getMegamenuClasses({ className , responsive , size , vertical , width }) ;

    // The container is only a popover when responsive (the mobile trigger toggles it).
    const containerPopover = responsive ? { id : containerId , popover : 'auto' } : {} ;

    const containerStyle = anchored ? { anchorName , ...style } : style ;
    const popoverStyle   = anchored ? { positionAnchor : anchorName } : undefined ;

    const renderContent = ( item ) =>
    {
        if ( item?.content )
        {
            return item.content ;
        }

        if ( Array.isArray( item?.links ) )
        {
            return (
                <ul className={ getMenuClasses() }>
                    { item.links.map( ( link , i ) => (
                        <li key={ i }>
                            <a href={ link?.href }>{ link?.label }</a>
                        </li>
                    ) ) }
                </ul>
            ) ;
        }

        return null ;
    } ;

    return (
        <>
            { responsive && (
                <button className={ cn( 'btn sm:hidden' , triggerClassName ) } popoverTarget={ containerId }>
                    { triggerLabel }
                </button>
            )}

            <div className={ classes } ref={ ref } style={ containerStyle } { ...containerPopover } { ...rest }>
                <span className={ MEGAMENU_ACTIVE } />

                { list.map( ( item , index ) =>
                {
                    const popoverId = `${ base }-p${ index }` ;
                    return (
                        <Fragment key={ popoverId }>
                            <button popoverTarget={ popoverId }>{ item?.label }</button>
                            <div id={ popoverId } popover="auto" className={ popoverClassName } style={ popoverStyle }>
                                { renderContent( item ) }
                            </div>
                        </Fragment>
                    ) ;
                } )}
            </div>
        </>
    ) ;
} ;

Megamenu.displayName = 'Megamenu' ;

export default Megamenu ;
