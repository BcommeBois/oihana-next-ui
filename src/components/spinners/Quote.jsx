'use client' ;

import Spinner from './Spinner' ;

import './styles/quote.css' ;

/**
 * Quote curly braces pulsing animation spinner.
 * Displays curly braces that pulse alternately.
 * Note: This spinner uses a fixed font size (78px) that scales with the size prop.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Braces color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-quote'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default quote spinner
 * <Quote />
 *
 * @example
 * // With custom color and size
 * <Quote color="primary" size="sm" />
 *
 * @example
 * // Large accent quote
 * <Quote color="accent" size="lg" />
 */
const Quote =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-quote' ,

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

Quote.displayName = 'Quote' ;

export default Quote ;