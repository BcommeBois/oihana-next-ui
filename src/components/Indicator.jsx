'use client' ;

import
{
    getIndicatorClasses ,
    getIndicatorItemClasses ,
}
from '../themes/components/indicator' ;

/**
 * A single floating item anchored on an {@link Indicator} corner.
 *
 * Exported for the multi-item case : `Indicator`'s `item` prop covers one badge, which
 * is the common shape, but several `IndicatorItem` children can sit at different corners
 * of the same container.
 *
 * @param {Object} props
 * @param {import('../themes/components/indicator').IndicatorAlign} [props.align='end'] - Horizontal alignment.
 * @param {React.ReactNode} [props.children] - The floating content.
 * @param {string} [props.className] - Additional class name.
 * @param {import('../themes/components/indicator').IndicatorPosition} [props.position='top'] - Vertical position.
 * @param {React.Ref} [props.ref] - Forwarded ref.
 *
 * @example
 * ```jsx
 * <Indicator>
 *     <IndicatorItem align="start"><Badge color="error">!</Badge></IndicatorItem>
 *     <IndicatorItem align="end" position="bottom"><Badge color="success">OK</Badge></IndicatorItem>
 *     <div className="grid h-32 w-32 place-items-center bg-base-300">contenu</div>
 * </Indicator>
 * ```
 */
export const IndicatorItem =
({
    align ,
    children ,
    className ,
    position ,
    ref ,
    ...rest
}) =>
{
    return (
        <span
            className = { getIndicatorItemClasses({ align , className , position }) }
            ref       = { ref }
            { ...rest }
        >
            { children }
        </span>
    ) ;
} ;

IndicatorItem.displayName = 'IndicatorItem' ;

/**
 * Anchors a floating item — a counter, a status dot, a "new" flag — on a corner of
 * whatever it wraps.
 *
 * `Indicator` is the positioning mechanism, not the content : the item itself is any
 * node you pass, typically a `Badge` or a `Status`.
 *
 * A falsy `item` renders no `indicator-item` at all, so a cart at zero simply shows no
 * pill rather than a "0" — `item={ count > 0 && <Badge>{ count }</Badge> }` is the
 * intended shape.
 *
 * ### Width
 *
 * DaisyUI makes the container `inline-flex` with `width: max-content`, so it hugs its
 * child. Wrapping a full-width control shrinks it : restate the width on the container
 * (`className="w-full"`) when that matters.
 *
 * ### Accessibility
 *
 * The item is rendered **before** the anchored content, so a screen reader announces
 * "3, Cart" rather than "Cart, 3". A bare number out of context is meaningless, so pick
 * one of the two correct shapes :
 *
 * ```jsx
 * // 1. The control carries the whole accessible name, the pill is decorative
 * <Indicator item={ <Badge aria-hidden>{ count }</Badge> }>
 *     <Button aria-label={ `Panier, ${ count } articles` }>Panier</Button>
 * </Indicator>
 *
 * // 2. The pill names itself
 * <Indicator item={ <Badge aria-label={ `${ count } articles` }>{ count }</Badge> }>
 *     <Button>Panier</Button>
 * </Indicator>
 * ```
 *
 * Note that the pill is wrapped in the `indicator-item` element rather than becoming it,
 * so any node can be used as an item without having to merge class names into it.
 *
 * @module components/Indicator
 *
 * @param {Object} props
 * @param {import('../themes/components/indicator').IndicatorAlign} [props.align='end'] - Horizontal alignment of `item`.
 * @param {React.ReactNode} [props.children] - The anchored content.
 * @param {string} [props.className] - Additional class name on the container.
 * @param {React.ReactNode} [props.item] - The floating item. Falsy renders nothing.
 * @param {string} [props.itemClassName] - Additional class name on the floating item.
 * @param {import('../themes/components/indicator').IndicatorPosition} [props.position='top'] - Vertical position of `item`.
 * @param {React.Ref} [props.ref] - Forwarded ref.
 *
 * @see https://daisyui.com/components/indicator
 *
 * @example Cart counter
 * ```jsx
 * <Indicator item={ count > 0 && <Badge color="secondary">{ count }</Badge> }>
 *     <Button onClick={ openCart }>Panier</Button>
 * </Indicator>
 * ```
 *
 * @example Status dot at the bottom of an avatar
 * ```jsx
 * <Indicator item={ <Status color="success" /> } position="bottom">
 *     <Avatar src="/me.png" />
 * </Indicator>
 * ```
 */
const Indicator =
({
    align ,
    children ,
    className ,
    item ,
    itemClassName ,
    position ,
    ref ,
    ...rest
}) =>
{
    return (
        <div
            className = { getIndicatorClasses({ className }) }
            ref       = { ref }
            { ...rest }
        >
            { item ? (
                <IndicatorItem align={ align } className={ itemClassName } position={ position }>
                    { item }
                </IndicatorItem>
            ) : null }

            { children }
        </div>
    ) ;
} ;

Indicator.displayName = 'Indicator' ;

export default Indicator ;
