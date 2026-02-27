'use client' ;

import Spinner from './Spinner' ;

import './styles/circle-fade.css' ;

/**
 * Circle fading dots animation spinner.
 * Displays eleven dots arranged in a circle with sequential fading and scaling effect.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Dots color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-circle-fade'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default circle fade spinner
 * <CircleFade />
 *
 * @example
 * // With custom color and size
 * <CircleFade color="primary" size="sm" />
 *
 * @example
 * // Large accent circle fade
 * <CircleFade color="accent" size="lg" />
 */
const CircleFade =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-circle-fade' ,

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
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
        <div className="spinner-circle-fade-dot" />
    </Spinner>
) ;

CircleFade.displayName = 'CircleFade' ;

export default CircleFade ;