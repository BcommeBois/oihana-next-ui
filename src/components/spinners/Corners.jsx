'use client' ;

import Spinner from './Spinner' ;

import './styles/corners.css' ;

/**
 * Three L-shaped corners bouncing animation spinner.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Corners color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-corners'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 *
 * @example
 * <Corners />
 * <Corners color="primary" size="sm" />
 */
const Corners =
({
    as ,
    className,
    color = 'base-content' ,
    size = 'md' ,
    style     ,
    tag = 'spinner-corners' ,

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

Corners.displayName = 'Corners' ;

export default Corners ;