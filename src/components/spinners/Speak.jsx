'use client' ;

import Spinner from './Spinner' ;

import './styles/speak.css' ;

/**
 * Speak chat bubble animation spinner.
 * Displays a speech bubble with three flashing dots.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.backgroundColor] - Bubble background color from theme (default: base-100)
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Dots color from theme (default: error)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-speak'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default speak spinner
 * <Speak />
 *
 * @example
 * // With custom colors
 * <Speak backgroundColor="primary" color="primary-content" />
 *
 * @example
 * // Large with info colors
 * <Speak backgroundColor="info" color="info-content" size="lg" />
 */
const Speak =
({
    as ,
    backgroundColor = 'base-100' ,
    className ,
    color = 'error' ,
    size = 'md' ,
    style ,
    tag = 'spinner-speak' ,

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

Speak.displayName = 'Speak' ;

export default Speak ;