'use client' ;

import Spinner from './Spinner' ;

import './styles/mouse-wheel.css' ;

/**
 * Mouse wheel scrolling animation spinner.
 * Displays a mouse with an animated scroll wheel.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Mouse color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-mouse-wheel'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default mouse wheel spinner
 * <MouseWheel />
 *
 * @example
 * // With custom color and size
 * <MouseWheel color="primary" size="sm" />
 *
 * @example
 * // Large accent mouse wheel
 * <MouseWheel color="accent" size="lg" />
 */
const MouseWheel =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-mouse-wheel' ,

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

MouseWheel.displayName = 'MouseWheel' ;

export default MouseWheel ;