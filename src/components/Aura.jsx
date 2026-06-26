'use client' ;

/**
 * Aura component for DaisyUI 5.6.
 *
 * Wraps any content with a border light effect. By default the aura is always
 * animating ; set `trigger="hover"` to only reveal and animate it on hover.
 *
 * The light effect is built on `currentColor`, so in `hover` mode the wrapper
 * colour is forced transparent at rest. Make sure the wrapped content sets its
 * own text colour (e.g. a `card` with `text-base-content`) so it stays visible.
 *
 * @module components/Aura
 * @see https://daisyui.com/components/aura
 *
 * @example
 * ```jsx
 * // Always-on rainbow aura around a card
 * <Aura variant="rainbow">
 *     <div className="card bg-base-100"><div className="card-body">Hi</div></div>
 * </Aura>
 *
 * // Reveal on hover only, custom colour and duration
 * <Aura trigger="hover" color="primary" duration={2000}>
 *     <button className="btn">Hover me</button>
 * </Aura>
 *
 * // Custom colour + background tint (daisyUI custom-colour example)
 * <Aura color="warning" background="warning">
 *     <div className="card bg-base-100 text-base-content"><div className="card-body">Hi</div></div>
 * </Aura>
 * ```
 */

import cn from '../themes/helpers/cn' ;

import getAuraClasses, { ALWAYS, HOVER } from '../themes/effects/aura' ;

import getTextColor       from '../themes/colors/textColor' ;
import getBackgroundColor from '../themes/colors/backgroundColor' ;
import { TRANSPARENT }    from '../themes/colors/tailwindcss' ;

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - Root element type.
 * @param {string} [props.background] - Background tint colour constant (→ `bg-*`).
 * @param {React.ReactNode} [props.children] - Wrapped content.
 * @param {string} [props.className] - Additional class name.
 * @param {string} [props.color] - Light colour constant (→ `text-*`).
 * @param {number} [props.duration] - Animation duration in milliseconds.
 * @param {React.Ref} [props.ref] - Forwarded ref.
 * @param {import('../themes/effects/aura').AuraSize} [props.size='md'] - Aura size.
 * @param {import('../themes/effects/aura').AuraTrigger} [props.trigger='always'] - 'always' or 'hover'.
 * @param {import('../themes/effects/aura').AuraVariant} [props.variant] - Aura style variant.
 */
const Aura =
({
    as ,
    background ,
    children ,
    className ,
    color ,
    duration ,
    ref ,
    size ,
    style ,
    trigger = ALWAYS ,
    variant ,
    ...rest
}) =>
{
    const Component = as || 'div' ;

    // Resolve the light colour class (e.g. 'text-primary') from the constant.
    const colorClass = color ? Object.keys( getTextColor( color ) )[ 0 ] : null ;

    // In `hover` mode the wrapper colour is transparent at rest and restored on
    // hover, so the aura (built on currentColor) only shows while hovered.
    const colorClasses = trigger === HOVER
        ? cn(
            getTextColor( TRANSPARENT ) ,
            colorClass ? `hover:${ colorClass }` : 'hover:text-inherit' ,
        )
        : colorClass ;

    const classNames = cn
    (
        getAuraClasses({ size , trigger , variant }) ,
        colorClasses ,
        background && getBackgroundColor( background ) ,
        className ,
    ) ;

    // Duration drives the DaisyUI aura animation through the `--tw-duration` CSS
    // variable. Setting it inline is JIT-proof (a `duration-[Nms]` class built at
    // runtime would never be emitted by Tailwind).
    const mergedStyle = duration != null
        ? { '--tw-duration' : `${ duration }ms` , ...style }
        : style ;

    return (
        <Component className={ classNames } ref={ ref } style={ mergedStyle } { ...rest }>
            { children }
        </Component>
    ) ;
} ;

Aura.displayName = 'Aura' ;

export default Aura ;
