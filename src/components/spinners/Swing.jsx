'use client' ;

import Spinner from './Spinner' ;

import './styles/swing.css' ;

/**
 * Swing rotating and pulsing dots animation spinner.
 * Displays two dots (top and bottom) that pulse while the container rotates.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Dots color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-swing'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default swing spinner
 * <Swing />
 *
 * @example
 * // With custom color and size
 * <Swing color="primary" size="sm" />
 *
 * @example
 * // Large accent swing
 * <Swing color="accent" size="lg" />
 */
const Swing =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-swing' ,

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
        <div className="spinner-swing-dot" />
        <div className="spinner-swing-dot" />
    </Spinner>
) ;

Swing.displayName = 'Swing' ;

export default Swing ;