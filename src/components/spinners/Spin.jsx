'use client' ;

import Spinner from './Spinner' ;

import './styles/spin.css' ;

/**
 * Spin classic rotating circle animation spinner.
 * Displays a rotating circle with a colored segment (classic spinner).
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.backgroundColor] - Border background color from theme (default: base-100)
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Active segment color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-spin'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default spin spinner
 * <Spin />
 *
 * @example
 * // With custom colors
 * <Spin backgroundColor="primary" color="primary-content" />
 *
 * @example
 * // Large with accent colors
 * <Spin backgroundColor="accent" color="accent-content" size="lg" />
 */
const Spin =
({
    as ,
    backgroundColor = 'base-100' ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-spin' ,

    ref ,

    ...rest
}) =>
(
    <Spinner
        as              = { as }
        backgroundColor = { backgroundColor }
        className       = { className }
        color           = { color }
        ref             = { ref }
        size            = { size }
        style           = { style }
        tag             = { tag }
        { ...rest }
    />
) ;

Spin.displayName = 'Spin' ;

export default Spin ;