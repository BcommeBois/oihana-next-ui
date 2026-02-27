/**
 * Icon wrapper component with size, color and disabled support.
 *
 * @module components/IconBox
 *
 * @example
 * ```jsx
 * import { MdSearch } from 'react-icons/md' ;
 *
 * // Simple
 * <IconBox icon={MdSearch} />
 *
 * // With size and color
 * <IconBox icon={MdSearch} size="lg" color="primary" />
 *
 * // Disabled
 * <IconBox icon={MdSearch} disabled />
 *
 * // Custom element as icon
 * <IconBox><MyCustomSvg /></IconBox>
 *
 * // Join item (for DaisyUI join groups)
 * <IconBox icon={MdSearch} join />
 * ```
 */

import cn from '@/themes/helpers/cn' ;

import getTextColor      from '@/themes/colors/textColor' ;
import buttonIconSizeMap from '@/themes/sizing/buttonIconSize' ;

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Custom icon content (takes priority over icon prop).
 * @param {string} [props.className] - Additional class name.
 * @param {import('@/themes/colors/textColor').TextColor} [props.color] - Icon color.
 * @param {boolean} [props.disabled] - Reduced opacity.
 * @param {string} [props.disabledClassName='opacity-60'] - Custom disabled class.
 * @param {React.ReactNode} [props.icon] - Icon component to render.
 * @param {boolean} [props.join] - DaisyUI join-item modifier.
 * @param {'xs' | 'sm' | 'md' | 'lg'} [props.size] - Icon container size.
 * @param {string} [props.title] - Accessible title passed to the icon.
 */
const IconBox =
({
    children ,
    className ,
    color ,
    disabled ,
    disabledClassName = 'opacity-60' ,
    icon: Icon ,
    join ,
    size ,
    title ,
}) =>
{
    if ( children )
    {
        return children ;
    }

    if ( !Icon )
    {
        return null ;
    }

    return (
        <div
            className = { cn
            (
                'flex items-center justify-center [&>svg]:size-full' ,
                buttonIconSizeMap[size] || buttonIconSizeMap.md ,
                {
                    'join-item'            : join ,
                    [disabledClassName]    : disabled ,
                    ...!!color && getTextColor( color ) ,
                } ,
                className ,
            )}
        >
            <Icon title={ title } />
        </div>
    ) ;
} ;

export default IconBox ;