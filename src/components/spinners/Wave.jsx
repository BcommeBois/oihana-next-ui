'use client' ;

import Spinner from './Spinner' ;

import './styles/wave.css' ;

/**
 * Wave bars animation spinner.
 * Displays five vertical bars that animate in a wave pattern.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Bars color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-wave'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default wave spinner
 * <Wave />
 *
 * @example
 * // With custom color and size
 * <Wave color="primary" size="sm" />
 *
 * @example
 * // Large success wave
 * <Wave color="success" size="lg" />
 */
const Wave =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-wave' ,

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
        <div className="spinner-wave-rect" />
        <div className="spinner-wave-rect" />
        <div className="spinner-wave-rect" />
        <div className="spinner-wave-rect" />
        <div className="spinner-wave-rect" />
    </Spinner>
) ;

Wave.displayName = 'Wave' ;

export default Wave ;