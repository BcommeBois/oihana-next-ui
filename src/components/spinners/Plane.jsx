'use client' ;

import Spinner from './Spinner' ;

import './styles/plane.css' ;

/**
 * Plane 3D rotation animation spinner.
 * Displays a square that rotates in 3D space.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Plane color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-plane'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default plane spinner
 * <Plane />
 *
 * @example
 * // With custom color and size
 * <Plane color="primary" size="sm" />
 *
 * @example
 * // Large accent plane
 * <Plane color="accent" size="lg" />
 */
const Plane =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-plane' ,

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

Plane.displayName = 'Plane' ;

export default Plane ;