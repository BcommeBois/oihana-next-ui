'use client' ;

import cn from '@/themes/helpers/cn' ;

import getTextColor             from '@/themes/colors/textColor' ;
import getRadialProgressClasses from '@/themes/components/radialProgress' ;

/**
 * Radial progress component for DaisyUI 5.
 *
 * @module components/RadialProgress
 * @see https://daisyui.com/components/radial-progress
 *
 * @example
 * ```jsx
 * // Simple
 * <RadialProgress value={70} />
 *
 * // With color
 * <RadialProgress value={85} color="primary" />
 *
 * // Custom size and thickness
 * <RadialProgress
 *     value={60}
 *     size="12rem"
 *     thickness="2rem"
 *     color="success"
 * />
 *
 * // With custom content
 * <RadialProgress value={75}>
 *     <div className="text-xl font-bold">75%</div>
 *     <div className="text-xs">Complete</div>
 * </RadialProgress>
 * ```
 */

/**
 * @param {Object} props
 * @param {number} [props.value=0] - Progress value (0-100)
 * @param {number} [props.max=100] - Maximum value
 * @param {string} [props.size='5rem'] - Size (CSS value: '8rem', '120px', etc.)
 * @param {string} [props.thickness] - Border thickness (CSS value, default: 10% of size)
 * @param {string} [props.color] - Text color: 'primary', 'secondary', etc.
 * @param {string} [props.bgColor] - Background color
 * @param {string} [props.borderColor] - Border color
 * @param {number} [props.borderWidth] - Border width in pixels
 * @param {boolean} [props.showValue=true] - Show percentage as children
 * @param {Function} [props.formatValue] - Format displayed value: (value, max) => string
 * @param {React.ReactNode} [props.children] - Custom content (overrides showValue)
 * @param {string} [props.className] - Additional classes
 * @param {*} [props.progressRef] - Ref for progress element
 * @param {Object} [props.progressProps] - Additional props for div element
 */
const RadialProgress = ({
    value = 0,
    max = 100,
    size = '5rem',
    thickness,
    color,
    bgColor,
    borderColor,
    borderWidth,
    showValue = true,
    formatValue,
    children,
    className,
    progressRef,
    ...progressProps
}) =>
{
    // Calculate percentage for CSS variable
    const percentage = Math.min( 100, Math.max( 0, ( value / max ) * 100 )) ;

    // Build CSS variables
    const style = {
        '--value': percentage,
        '--size': size,
        ...thickness && { '--thickness': thickness },
    } ;

    // Format display value
    const displayValue = formatValue
        ? formatValue( value, max )
        : `${Math.round( percentage )}%` ;

    const progressClasses = getRadialProgressClasses({
        className: cn
        ({
            ...!!color && getTextColor( color ),
            ...!!bgColor && { [`bg-${bgColor}`]: true },
            ...!!borderColor && borderWidth && { [`border-${borderColor}`]: true },
            ...!!borderWidth && { [`border-${borderWidth}`]: true },
        },
        className ),
    }) ;

    return (
        <div
            role          = "progressbar"
            aria-valuenow = { value }
            aria-valuemin = { 0 }
            aria-valuemax = { max }
            className     = { progressClasses }
            style         = { style }
            ref           = { progressRef }
            { ...progressProps }
        >
            { children || ( showValue ? displayValue : null ) }
        </div>
    ) ;
} ;

RadialProgress.displayName = 'RadialProgress' ;

export default RadialProgress ;