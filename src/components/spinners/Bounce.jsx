'use client' ;

import Spinner from './Spinner' ;

import './styles/bounce.css' ;

/**
 * Bounce pulsing circles animation spinner.
 * Displays two overlapping circles that scale in and out.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Bounce circles color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-bounce'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default bounce spinner
 * <Bounce />
 *
 * @example
 * // With custom color and size
 * <Bounce color="primary" size="sm" />
 *
 * @example
 * // Large success bounce
 * <Bounce color="success" size="lg" />
 */
const Bounce =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-bounce' ,

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
    >
        <div className="spinner-bounce-dot" />
        <div className="spinner-bounce-dot" />
    </Spinner>
) ;

Bounce.displayName = 'Bounce' ;

export default Bounce ;