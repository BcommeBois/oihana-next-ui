'use client' ;

import cn from '../../themes/helpers/cn' ;

import './styles/ice-cream.css' ;

/**
 * Ice cream with color-shifting animation spinner.
 * Displays a colorful ice cream cone with animated color bands.
 * Note: This spinner uses fixed colors and sizes, not themeable.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to the element
 *
 * @example
 * // Default ice cream spinner
 * <IceCream />
 *
 * @example
 * // Small ice cream
 * <IceCream size="sm" />
 *
 * @example
 * // Large ice cream
 * <IceCream size="lg" />
 */
const IceCream =
({
    as ,
    className ,
    size = 'md' ,
    style ,

    ref ,

    ...rest
}) =>
{
    const Component = as || 'div' ;

    // Map sizes to CSS classes (custom for IceCream, not using transform)
    const sizeClasses =
    {
        xs : 'spinner-ice-cream-xs' ,
        sm : 'spinner-ice-cream-sm' ,
        md : 'spinner-ice-cream-md' ,
        lg : 'spinner-ice-cream-lg' ,
        xl : 'spinner-ice-cream-xl' ,
    } ;

    const classNames = cn(
        'spinner-ice-cream' ,
        sizeClasses[ size ] ,
        className
    ) ;

    return (
        <Component
            className = { classNames }
            ref       = { ref }
            style     = { style }
            { ...rest }
        />
    ) ;
} ;

IceCream.displayName = 'IceCream' ;

export default IceCream ;