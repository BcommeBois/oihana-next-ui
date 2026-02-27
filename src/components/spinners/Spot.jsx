'use client' ;

import Spinner from './Spinner' ;

import './styles/spot.css' ;

/**
 * Spot location marker bouncing animation spinner.
 * Displays a map pin marker that bounces with a shadow.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Marker color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-spot'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default spot spinner
 * <Spot />
 *
 * @example
 * // With custom color and size
 * <Spot color="primary" size="sm" />
 *
 * @example
 * // Large error marker
 * <Spot color="error" size="lg" />
 */
const Spot =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-spot' ,

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

Spot.displayName = 'Spot' ;

export default Spot ;