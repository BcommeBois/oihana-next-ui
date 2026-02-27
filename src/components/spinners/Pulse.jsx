'use client' ;

import Spinner from './Spinner' ;

import './styles/pulse.css' ;

/**
 * Pulse expanding circle animation spinner.
 * Displays a circle that expands and fades out.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Pulse color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-pulse'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default pulse spinner
 * <Pulse />
 *
 * @example
 * // With custom color and size
 * <Pulse color="primary" size="sm" />
 *
 * @example
 * // Large success pulse
 * <Pulse color="success" size="lg" />
 */
const Pulse =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-pulse' ,

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

Pulse.displayName = 'Pulse' ;

export default Pulse ;