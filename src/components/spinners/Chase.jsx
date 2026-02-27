'use client' ;

import Spinner from './Spinner' ;

import './styles/chase.css' ;

/**
 * Chase rotating dots animation spinner.
 * Displays six dots rotating in a circle with pulsing effect.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Dots color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-chase'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default chase spinner
 * <Chase />
 *
 * @example
 * // With custom color and size
 * <Chase color="primary" size="sm" />
 *
 * @example
 * // Large accent chase
 * <Chase color="accent" size="lg" />
 */
const Chase =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-chase' ,

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
        <div className="spinner-chase-dot" />
        <div className="spinner-chase-dot" />
        <div className="spinner-chase-dot" />
        <div className="spinner-chase-dot" />
        <div className="spinner-chase-dot" />
        <div className="spinner-chase-dot" />
    </Spinner>
) ;

Chase.displayName = 'Chase' ;

export default Chase ;