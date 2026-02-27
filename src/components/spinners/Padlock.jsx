'use client' ;

import Spinner from './Spinner' ;

import './styles/padlock.css' ;

/**
 * Padlock flashing dots animation spinner.
 * Displays a padlock with three flashing dots inside.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Padlock color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-padlock'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default padlock spinner
 * <Padlock />
 *
 * @example
 * // With custom color and size
 * <Padlock color="primary" size="sm" />
 *
 * @example
 * // Large error padlock
 * <Padlock color="error" size="lg" />
 */
const Padlock =
({
     as ,
     className ,
     color = 'base-content' ,
     size = 'md' ,
     style ,
     tag = 'spinner-padlock' ,

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

Padlock.displayName = 'Padlock' ;

export default Padlock ;