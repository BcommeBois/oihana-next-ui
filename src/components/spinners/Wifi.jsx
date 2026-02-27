'use client' ;

import Spinner from './Spinner' ;

import './styles/wifi.css' ;

/**
 * Wifi concentric circles animation spinner.
 * Displays concentric circles that appear progressively.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Circles color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-wifi'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default wifi spinner
 * <Wifi />
 *
 * @example
 * // With custom color and size
 * <Wifi color="primary" size="sm" />
 *
 * @example
 * // Large info wifi
 * <Wifi color="info" size="lg" />
 */
const Wifi =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-wifi' ,

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

Wifi.displayName = 'Wifi' ;

export default Wifi ;