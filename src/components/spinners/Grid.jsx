'use client' ;

import Spinner from './Spinner' ;

import './styles/grid.css' ;

/**
 * Grid pulsing cubes animation spinner.
 * Displays nine cubes in a 3×3 grid that pulse sequentially with a wave pattern.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Cubes color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-grid'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default grid spinner
 * <Grid />
 *
 * @example
 * // With custom color and size
 * <Grid color="primary" size="sm" />
 *
 * @example
 * // Large accent grid
 * <Grid color="accent" size="lg" />
 */
const Grid =
({
     as ,
     className ,
     color = 'base-content' ,
     size = 'md' ,
     style ,
     tag = 'spinner-grid' ,

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
            <div className="spinner-grid-cube" />
            <div className="spinner-grid-cube" />
            <div className="spinner-grid-cube" />
            <div className="spinner-grid-cube" />
            <div className="spinner-grid-cube" />
            <div className="spinner-grid-cube" />
            <div className="spinner-grid-cube" />
            <div className="spinner-grid-cube" />
            <div className="spinner-grid-cube" />
        </Spinner>
    ) ;

Grid.displayName = 'Grid' ;

export default Grid ;