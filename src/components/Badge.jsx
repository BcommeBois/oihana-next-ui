'use client' ;

/**
 * Badge component for DaisyUI.
 *
 * @module components/Badge
 * @see https://daisyui.com/components/badge
 *
 * @example
 * ```jsx
 * // Colors
 * <Badge color="primary">Primary</Badge>
 * <Badge color="success">Active</Badge>
 *
 * // Styles
 * <Badge color="error" style="outline">Outline</Badge>
 * <Badge color="success" style="soft">Soft</Badge>
 * <Badge style="ghost">Ghost</Badge>
 *
 * // Sizes
 * <Badge color="primary" size="xs">XS</Badge>
 * <Badge color="primary" size="xl">XL</Badge>
 *
 * // Combined
 * <Badge color="error" style="soft" size="sm">3 errors</Badge>
 *
 * // Custom element
 * <Badge as="a" href="/new" color="info" style="outline">What's new</Badge>
 *
 * // Empty dot indicator
 * <Badge color="success" size="xs" />
 *
 * // Any CSS colour, as a wash rather than a fill
 * <Badge color={ term.color }>{ term.label }</Badge>
 * <Badge color={ term.color } tint={ false }>{ term.label }</Badge>
 * ```
 */

import getBadgeClassNames , { colors , EDGE_ALPHA } from '../themes/components/badge' ;

import withAlpha from '../helpers/colors/withAlpha' ;

/**
 * ### 🔑 A colour from the palette, or a colour from a record
 *
 * `color` takes one of the eight daisyUI names — and then daisyUI paints the
 * pill — or **any CSS colour**, which becomes a WASH behind the label and a
 * stronger line around it, through `withAlpha`.
 *
 * 🔑 **A free colour tints the badge, it does not fill it.** A pill filled with
 * a colour out of a record needs its ink recomputed for contrast, twice over,
 * once per theme — and nothing guarantees what an administrator typed. A wash
 * carries the same information and leaves the label readable everywhere.
 * Gathered from an application where three places did this by appending two
 * hex digits to the colour, which only ever worked for a six-digit hex.
 *
 * `tint={ false }` drops the wash and leaves an ordinary plate : the form a
 * dense list wants, where the colour is already carried by a mark beside the
 * label. A number in place of `true` sets how much of the colour washes it.
 *
 * ⚠️ **`style` is the daisyUI VARIANT here**, not an inline style — the name
 * was taken long before this. Inline styles reach the element through the
 * tint, or through `className`.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Root element type.
 * @param {React.ReactNode} [props.children] - Badge content.
 * @param {string} [props.className] - Additional class name.
 * @param {import('../themes/components/badge').BadgeColorValue} [props.color] - One of the eight daisyUI names, or any CSS colour.
 * @param {import('../themes/components/badge').BadgeSize} [props.size] - Badge size.
 * @param {import('../themes/components/badge').BadgeStyle} [props.style] - Badge style VARIANT ('soft', 'outline', 'dash', 'ghost').
 * @param {boolean|number} [props.tint=true] - For a free colour only : wash the plate with it, `false` for none, a number from 0 to 1 for how much.
 */
const Badge =
({
    as ,
    children ,
    className ,
    color ,
    size ,
    style ,
    tint = true ,

    ...rest
}) =>
{
    const Component = as ?? 'span' ;

    const free = Boolean( color ) && !colors.includes( color ) ;

    const classNames = getBadgeClassNames({
        className ,
        color : free ? undefined : color ,
        size ,
        style
    }) ;

    const tinted = free && tint !== false
        ? {
            backgroundColor : withAlpha( color , tint === true ? null : tint ) ,
            borderColor     : withAlpha( color , EDGE_ALPHA ) ,
        }
        : undefined ;

    return <Component className={ classNames } style={ tinted } { ...rest }>{ children }</Component> ;
} ;

Badge.displayName = 'Badge' ;

export default Badge ;