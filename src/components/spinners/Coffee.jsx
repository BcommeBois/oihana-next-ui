'use client' ;

import Spinner from './Spinner' ;

import './styles/coffee.css' ;

/**
 * Coffee cup with steam animation spinner.
 * Displays a coffee cup with animated rising steam.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Coffee cup color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-coffee'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default coffee spinner
 * <Coffee />
 *
 * @example
 * // With custom color and size
 * <Coffee color="primary" size="sm" />
 *
 * @example
 * // Large accent coffee
 * <Coffee color="accent" size="lg" />
 */
const Coffee =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-coffee' ,

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

Coffee.displayName = 'Coffee' ;

export default Coffee ;