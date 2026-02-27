'use client' ;

import Spinner from './Spinner' ;

import './styles/bike.css' ;

/**
 * Bike with rotating wheels animation spinner.
 * Displays a bicycle with spinning wheels created using CSS gradients.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Bike color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-bike'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default bike spinner
 * <Bike />
 *
 * @example
 * // With custom color and size
 * <Bike color="primary" size="sm" />
 *
 * @example
 * // Large accent bike
 * <Bike color="accent" size="lg" />
 */
const Bike =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-bike' ,

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

Bike.displayName = 'Bike' ;

export default Bike ;