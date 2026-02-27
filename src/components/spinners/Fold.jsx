'use client' ;

import Spinner from './Spinner' ;

import './styles/fold.css' ;

/**
 * Fold 3D cubes animation spinner.
 * Displays four cubes in a grid that fold with a 3D perspective effect.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Cubes color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-fold'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default fold spinner
 * <Fold />
 *
 * @example
 * // With custom color and size
 * <Fold color="primary" size="sm" />
 *
 * @example
 * // Large accent fold
 * <Fold color="accent" size="lg" />
 */
const Fold =
({
    as ,
    className ,
    color = 'base-content' ,
    size = 'md' ,
    style ,
    tag = 'spinner-fold' ,

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
        <div className="spinner-fold-cube" />
        <div className="spinner-fold-cube" />
        <div className="spinner-fold-cube" />
        <div className="spinner-fold-cube" />
    </Spinner>
) ;

Fold.displayName = 'Fold' ;

export default Fold ;