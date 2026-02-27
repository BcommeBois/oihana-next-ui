'use client' ;

import Spinner from './Spinner' ;

import './styles/circle.css' ;

/**
 * Circle pulsing dots animation spinner.
 * Displays eleven dots arranged in a circle with sequential pulsing effect.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Dots color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-circle'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default circle spinner
 * <Circle />
 *
 * @example
 * // With custom color and size
 * <Circle color="primary" size="sm" />
 *
 * @example
 * // Large success circle
 * <Circle color="success" size="lg" />
 */
const Circle =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-circle' ,

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
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
        <div className="spinner-circle-dot" />
    </Spinner>
) ;

Circle.displayName = 'Circle' ;

export default Circle ;