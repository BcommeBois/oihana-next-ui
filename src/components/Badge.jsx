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
 * ```
 */

import getBadgeClassNames from '../themes/components/badge' ;

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Root element type.
 * @param {React.ReactNode} [props.children] - Badge content.
 * @param {string} [props.className] - Additional class name.
 * @param {import('@/themes/components/badge').BadgeColorValue} [props.color] - Badge color.
 * @param {import('@/themes/components/badge').BadgeSize} [props.size] - Badge size.
 * @param {import('@/themes/components/badge').BadgeStyle} [props.style] - Badge style variant.
 */
const Badge =
({
    as ,
    children ,
    className ,
    color ,
    size ,
    style ,
}) =>
{
    const Component = as ?? 'span' ;

    const classNames = getBadgeClassNames({
        className ,
        color ,
        size ,
        style
    }) ;

    return <Component className={ classNames }>{ children }</Component> ;
} ;

Badge.displayName = 'Badge' ;

export default Badge ;