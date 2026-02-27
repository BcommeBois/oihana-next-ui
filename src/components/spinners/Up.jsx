'use client' ;

import Spinner from './Spinner' ;

import './styles/up.css' ;

/**
 * Up arrow bouncing animation spinner.
 * Displays an upward-pointing arrow that bounces vertically.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Arrow color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-up'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default up spinner
 * <Up />
 *
 * @example
 * // With custom color and size
 * <Up color="primary" size="sm" />
 *
 * @example
 * // Large success up arrow
 * <Up color="success" size="lg" />
 */
const Up =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-up' ,

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

Up.displayName = 'Up' ;

export default Up ;