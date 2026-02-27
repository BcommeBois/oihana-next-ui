'use client' ;

import Spinner from './Spinner' ;
import useThemeColors from '@/themes/hooks/useThemeColors' ;

import './styles/bear.css' ;

/**
 * Generates the content color key for a given color.
 * Handles both base colors and -content colors to ensure contrast.
 *
 * @param {string} color - The base color key
 * @returns {string} The corresponding contrasting color key
 */
const getContentColor = ( color ) =>
{
    if ( !color ) return 'base-content' ;

    if ( color.endsWith( '-content' ) )
    {
        const baseColor = color.replace( '-content' , '' ) ;
        if ( baseColor === 'base' ) return 'base-100' ;
        return baseColor ;
    }

    if ( color.startsWith( 'base-' ) ) return 'base-content' ;

    return `${color}-content` ;
} ;

/**
 * Bear animation spinner.
 * Displays a cute animated bear with moving ears and face.
 * Eye/nose/mouth colors automatically adapt to the body color for proper contrast.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Bear body color from theme (default: base-100)
 * @param {string} [props.eyeColor] - Eye/nose/mouth color (auto: uses color-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {string} [props.skinColor] - Bear skin/cheeks color from theme (default: info)
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-bear'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default bear (base-100 body, base-content eyes)
 * <Bear />
 *
 * @example
 * // Small primary bear
 * <Bear color="primary" size="sm" />
 *
 * @example
 * // Large success bear
 * <Bear color="success" size="lg" />
 */
const Bear =
({
    as ,
    className ,
    color = 'base-100' ,
    eyeColor ,
    size = 'md' ,
    skinColor = 'info' ,
    style ,
    tag = 'spinner-bear' ,

    ref ,

    ...rest
}) =>
{
    const resolvedEyeColor = eyeColor || getContentColor( color ) ;

    const colors = useThemeColors({
        bodyColor : color ,
        eyeColor  : resolvedEyeColor ,
        skinColor ,
    }) ;

    const bearStyles =
    {
        ...colors.bodyColor && { '---spinner-bear-color'       : colors.bodyColor } ,
        ...colors.eyeColor  && { '---spinner-bear-eye-color'   : colors.eyeColor } ,
        ...colors.eyeColor  && { '---spinner-bear-mouth-color' : colors.eyeColor } ,
        ...colors.eyeColor  && { '---spinner-bear-nose-color'  : colors.eyeColor } ,
        ...colors.skinColor && { '---spinner-bear-skin-color'  : colors.skinColor } ,
        ...style ,
    } ;

    return (
        <Spinner
            as        = { as }
            className = { className }
            ref       = { ref }
            size      = { size }
            style     = { bearStyles }
            tag       = { tag }
            { ...rest }
        />
    ) ;
} ;

Bear.displayName = 'Bear' ;

export default Bear ;