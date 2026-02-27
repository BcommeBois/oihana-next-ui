'use client' ;

import Spinner from './Spinner' ;

import './styles/four-squares.css' ;

/**
 * Four squares moving animation spinner.
 * Displays four squares that move in a complex pattern using box-shadows.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Squares color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-four-squares'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default four squares spinner
 * <FourSquares />
 *
 * @example
 * // With custom color and size
 * <FourSquares color="primary" size="sm" />
 *
 * @example
 * // Large accent four squares
 * <FourSquares color="accent" size="lg" />
 */
const FourSquares =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-four-squares' ,

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

FourSquares.displayName = 'FourSquares' ;

export default FourSquares ;