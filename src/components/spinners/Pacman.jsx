'use client' ;

import Spinner from './Spinner' ;

import './styles/pacman.css' ;

/**
 * Pacman eating animation spinner.
 * Displays Pac-Man character eating dots.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Pacman color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-pacman'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default pacman spinner
 * <Pacman />
 *
 * @example
 * // With custom color and size
 * <Pacman color="primary" size="sm" />
 *
 * @example
 * // Large warning pacman
 * <Pacman color="warning" size="lg" />
 */
const Pacman =
    ({
         as ,
         className ,
         color = 'base-content' ,
         size = 'md' ,
         style ,
         tag = 'spinner-pacman' ,

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

Pacman.displayName = 'Pacman' ;

export default Pacman ;