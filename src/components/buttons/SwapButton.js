/**
 * Generic swap button component.
 *
 * @module components/buttons/SwapButton
 *
 * @example
 * ```jsx
 * import { MdVisibility , MdVisibilityOff } from 'react-icons/md' ;
 *
 * // Flip animation (default)
 * <SwapButton
 *     checked  = { isVisible }
 *     onChange  = { setIsVisible }
 *     on       = { <MdVisibility /> }
 *     off      = { <MdVisibilityOff /> }
 * />
 *
 * // Rotate animation
 * <SwapButton
 *     animation = "rotate"
 *     checked   = { isActive }
 *     onChange   = { setIsActive }
 *     on        = { <MdCheck /> }
 *     off       = { <MdClose /> }
 * />
 *
 * // No animation
 * <SwapButton
 *     animation = { null }
 *     checked   = { value }
 *     on        = { <MdLock /> }
 *     off       = { <MdLockOpen /> }
 * />
 * ```
 */

import cn from '@/themes/helpers/cn'

import getSwapClassNames , { SWAP_ITEM , SWAP_OFF , SWAP_ON } from '../../themes/components/swap'

import iconSizeMap from '../../themes/sizing/iconSize'

import Button from '../Button'

import useI18n from '../../contexts/locale/useI18n'

/**
 * Generic swap button component based on DaisyUI Swap.
 *
 * @param {object} props
 * @param {import('@/themes/components/swap').SwapAnimation | null} [props.animation='flip'] - Swap animation.
 * @param {boolean} [props.checked] - Swap checked state.
 * @param {string} [props.className] - Additional class name.
 * @param {import('@/themes/components/button').ButtonColorValue} [props.color] - Button color.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {React.ReactNode} [props.off] - Content when unchecked.
 * @param {React.ReactNode} [props.on] - Content when checked.
 * @param {Function} [props.onChange] - Toggle handler, receives current checked state.
 * @param {string} [props.path] - i18n path for label/title.
 * @param {import('@/themes/components/button').ButtonShape} [props.shape='square'] - Button shape.
 * @param {import('@/themes/components/button').ButtonSize} [props.size='md'] - Button size.
 * @param {import('@/themes/components/button').ButtonStyle} [props.style='ghost'] - Button style.
 * @param {string} [props.title] - Accessible title (overrides i18n).
 * @param {Object} props.rest - Other props passed to SwapButton
 *
 * @module components/buttons/SwapButton
 *
 * @example
 * ```jsx
 * import { MdVisibility , MdVisibilityOff } from 'react-icons/md' ;
 *
 * // Flip animation (default)
 * <SwapButton
 * checked  = { isVisible }
 * onChange  = { setIsVisible }
 * on       = { <MdVisibility /> }
 * off      = { <MdVisibilityOff /> }
 * />
 * ```
 */
const SwapButton =
({
    animation = 'flip' ,
    checked ,
    className ,
    color ,
    disabled ,
    off ,
    on ,
    onChange ,
    path ,
    shape = 'square' ,
    size = 'md' ,
    style = 'ghost' ,
    title ,

    ...rest
}) =>
{
    const i18n          = useI18n( path , {} , false ) ;
    const resolvedTitle = title ?? i18n?.title ?? i18n?.label ;

    const toggle = event =>
    {
        if ( disabled )
        {
            return ;
        }

        const newValue = event.target.checked ;

        if ( onChange )
        {
            onChange( newValue ) ;
        }
    } ;

    const iconSize = iconSizeMap[size] || iconSizeMap.md ;

    const swapItemClassName = cn( SWAP_ITEM , iconSize , '[&>svg]:size-full' ) ;

    const classNames = cn
    (
        getSwapClassNames({ animation } ) ,
        disabled && 'pointer-events-none cursor-default' ,
        className ,
    ) ;

    return (
        <Button
            as        = "label"
            className = { classNames }
            color    = { color }
            disabled = { disabled }
            shape    = { shape }
            showIcon = { false }
            size     = { size }
            style    = { style }
            { ...rest }
        >
            <input
                type       = "checkbox"
                onChange   = { toggle }
                checked    = { !!checked }
                disabled   = { disabled }
                aria-label = { resolvedTitle }
                className  = "sr-only"
            />
            <div className={ cn( SWAP_ON  , swapItemClassName ) }>{ on  }</div>
            <div className={ cn( SWAP_OFF , swapItemClassName ) }>{ off }</div>
        </Button>
    ) ;
} ;

export default SwapButton ;