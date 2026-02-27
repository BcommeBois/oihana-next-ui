'use client' ;

import Spinner from './Spinner' ;

import './styles/flow.css' ;

/**
 * Flow pulsing dots animation spinner.
 * Displays three horizontally aligned dots that pulse sequentially.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Dots color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-flow'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default flow spinner
 * <Flow />
 *
 * @example
 * // With custom color and size
 * <Flow color="primary" size="sm" />
 *
 * @example
 * // Large accent flow
 * <Flow color="accent" size="lg" />
 */
const Flow =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-flow' ,

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
        <div className="spinner-flow-dot" />
        <div className="spinner-flow-dot" />
        <div className="spinner-flow-dot" />
    </Spinner>
) ;

Flow.displayName = 'Flow' ;

export default Flow ;