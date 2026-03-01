'use client' ;

import cn from '../../themes/helpers/cn' ;

import getCSSVariables from '../../themes/helpers/getCSSVariables' ;
import useThemeColors  from '../../themes/hooks/useThemeColors' ;

import './styles/sizes.css' ;

const VARIABLES =
[
    'color' ,
    'backgroundColor' ,
    'borderColor'
] ;

/**
 * Size variants for spinners.
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} SpinnerSize
 */
export const XS = 'xs' ;
export const SM = 'sm' ;
export const MD = 'md' ;
export const LG = 'lg' ;
export const XL = 'xl' ;

export const sizes = [ XS , SM , MD , LG , XL ] ;

const sizeMap =
{
    [ XS ] : 'spinner-xs' ,
    [ SM ] : 'spinner-sm' ,
    [ MD ] : 'spinner-md' ,
    [ LG ] : 'spinner-lg' ,
    [ XL ] : 'spinner-xl' ,
} ;

/**
 * Base Spinner component for creating custom CSS-based loaders.
 * Provides a flexible foundation with theme color integration and CSS variable system.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.backgroundColor] - Background color from theme
 * @param {string} [props.borderColor] - Border color from theme
 * @param {React.ReactNode} [props.children] - Child elements
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Primary color from theme
 * @param {SpinnerSize} [props.size='md'] - Spinner size (xs, sm, md, lg, xl)
 * @param {Object} [props.style] - Inline styles to merge with CSS variables
 * @param {string} [props.tag='spinner'] - Base class name and CSS variable prefix
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to the element
 *
 * @example
 * // Basic spinner with theme color
 * <Spinner color="primary" tag="my-spinner" />
 *
 * @example
 * // Small spinner
 * <Spinner color="primary" size="sm" tag="my-spinner" />
 *
 * @example
 * // Custom spinner with multiple colors
 * <Spinner
 *     backgroundColor="base-200"
 *     borderColor="primary"
 *     color="secondary"
 *     size="lg"
 *     tag="custom-spinner"
 * />
 */
const Spinner =
({
    as ,
    backgroundColor ,
    borderColor ,
    children ,
    className ,
    color ,
    size = MD ,
    style ,
    tag = 'spinner' ,

    ref ,

    ...rest
}) =>
{
    const Component = as || 'div' ;

    // --------- Theme colors resolution

    const colorDefinitions = { backgroundColor , borderColor , color } ;
    const colors           = useThemeColors( colorDefinitions ) ;

    // --------- CSS variables generation

    const cssVariables = getCSSVariables(
        colors ,
        VARIABLES ,
        { prefix: `---${tag}-` }
    ) ;

    // --------- Merged styles

    const mergedStyles = { ...cssVariables , ...style } ;

    // --------- Class names with size variant

    const classNames = cn
    (
        tag ,
        sizeMap[ size ] ,
        className
    ) ;

    // --------- Render

    return (
        <Component
            className = { classNames }
            ref       = { ref }
            style     = { mergedStyles }
            { ...rest }
        >
            { children }
        </Component>
    ) ;
} ;

Spinner.displayName = 'Spinner' ;

export default Spinner ;