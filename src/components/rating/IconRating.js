'use client' ;

import IconBox from '@/components/icons/IconBox' ;
import NumberRating from '@/components/rating/NumberRating' ;

/**
 * Icon Rating component - NumberRating with icon support.
 *
 * @module components/IconRating
 *
 * @example
 * ```jsx
 * import { MdStar, MdStarBorder } from 'react-icons/md' ;
 *
 * // Simple star rating
 * <IconRating
 *     icon={MdStarBorder}
 *     activeIcon={MdStar}
 *     count={5}
 *     value={rating}
 *     onChange={setRating}
 * />
 *
 * // Custom icons
 * <IconRating
 *     icon={MdFavoriteBorder}
 *     activeIcon={MdFavorite}
 *     color="neutral"
 *     activeColor="error"
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {React.ElementType} [props.icon] - Inactive icon component
 * @param {React.ElementType} [props.activeIcon] - Active icon component
 * @param {string} [props.iconClassName] - Additional classes for inactive icon
 * @param {string} [props.activeIconClassName] - Additional classes for active icon
 * @param {import('@/themes/colors/textColor').TextColor} [props.iconColor] - Inactive icon color (overrides button color)
 * @param {import('@/themes/colors/textColor').TextColor} [props.activeIconColor] - Active icon color (overrides button color)
 */
const IconRating =
({
    icon,
    activeIcon,
    iconClassName,
    activeIconClassName,
    iconColor,
    activeIconColor,
    ...numberRatingProps
}) =>
{
    // Default icons (optional - can be undefined)
    const Icon = icon ;
    const ActiveIcon = activeIcon || icon ;  // Fallback to icon if no activeIcon

    const itemContent = ( index, isActive ) =>
    {
        const CurrentIcon = isActive ? ActiveIcon : Icon ;

        if ( !CurrentIcon )
        {
            return index ;  // Fallback to number if no icons provided
        }

        return (
            <IconBox
                icon={ CurrentIcon }
                className={ isActive ? activeIconClassName : iconClassName }
                color={ isActive ? activeIconColor : iconColor }
            />
        ) ;
    } ;

    return (
        <NumberRating
            itemContent={ itemContent }
            { ...numberRatingProps }
        />
    ) ;
} ;

IconRating.displayName = 'IconRating' ;

export default IconRating ;