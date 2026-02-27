'use client' ;

import Spinner from './Spinner' ;

import './styles/down.css' ;

/**
 * Down arrow bouncing animation spinner.
 * Displays a downward-pointing arrow that bounces vertically.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Arrow color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-down'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default down spinner
 * <Down />
 *
 * @example
 * // With custom color and size
 * <Down color="primary" size="sm" />
 *
 * @example
 * // Large success down arrow
 * <Down color="success" size="lg" />
 */
const Down =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-down' ,

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

Down.displayName = 'Down' ;

export default Down ;