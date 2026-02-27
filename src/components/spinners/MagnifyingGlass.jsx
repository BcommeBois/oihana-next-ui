'use client' ;

import Spinner from './Spinner' ;

import './styles/magnifying-glass.css' ;

/**
 * Magnifying glass moving animation spinner.
 * Displays a magnifying glass that moves in a square pattern.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Magnifying glass color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-magnifying-glass'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default magnifying glass spinner
 * <MagnifyingGlass />
 *
 * @example
 * // With custom color and size
 * <MagnifyingGlass color="primary" size="sm" />
 *
 * @example
 * // Large accent magnifying glass
 * <MagnifyingGlass color="accent" size="lg" />
 */
const MagnifyingGlass =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-magnifying-glass' ,

    ref ,

    ...rest
}) =>
(
    <Spinner
        as        = { as }
        className = { className }
        color     = { color }
        ref       = { ref }
        size      = { size }
        style     = { style }
        tag       = { tag }
        { ...rest }
    />
) ;

MagnifyingGlass.displayName = 'MagnifyingGlass' ;

export default MagnifyingGlass ;