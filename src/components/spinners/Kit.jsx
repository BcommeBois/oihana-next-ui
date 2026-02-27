'use client' ;

import Spinner from './Spinner' ;

import './styles/kit.css' ;

/**
 * Kit horizontal progress bar animation spinner.
 * Displays a moving bar that slides horizontally back and forth.
 * Note: This spinner takes the full width of its container.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Bar color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size (affects container)
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-kit'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default kit spinner (takes full width)
 * <Kit />
 *
 * @example
 * // With custom color
 * <Kit color="primary" />
 *
 * @example
 * // With container width
 * <div style={{ width: '200px' }}>
 *     <Kit color="success" />
 * </div>
 */
const Kit =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-kit' ,

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

Kit.displayName = 'Kit' ;

export default Kit ;