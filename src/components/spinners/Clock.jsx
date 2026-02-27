'use client' ;

import Spinner from './Spinner' ;

import './styles/clock.css' ;

/**
 * Clock rotating hand animation spinner.
 * Displays a circular clock face with a rotating hand.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Clock hand and border color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-clock'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default clock spinner
 * <Clock />
 *
 * @example
 * // With custom color and size
 * <Clock color="primary" size="sm" />
 *
 * @example
 * // Large accent clock
 * <Clock color="accent" size="lg" />
 */
const Clock =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-clock' ,

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

Clock.displayName = 'Clock' ;

export default Clock ;