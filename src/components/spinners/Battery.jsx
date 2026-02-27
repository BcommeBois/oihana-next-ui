'use client' ;

import Spinner from './Spinner' ;

import './styles/battery.css' ;

/**
 * Battery charging animation spinner.
 * Displays a battery icon with a progressive charging animation.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Battery color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-battery'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default battery spinner
 * <Battery />
 *
 * @example
 * // Small battery with custom color
 * <Battery color="primary" size="sm" />
 *
 * @example
 * // Extra large battery
 * <Battery size="xl" />
 */
const Battery =
({
    as ,
    className ,
    color ,
    size = 'md' ,
    style ,
    tag = 'spinner-battery' ,

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

Battery.displayName = 'Battery' ;

export default Battery ;