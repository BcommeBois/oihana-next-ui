/**
 * Theme toggle button (light/dark) with swap animation.
 *
 * @module components/buttons/ThemeButton
 *
 * @example
 * ```jsx
 * <ThemeButton />
 *
 * // Custom size
 * <ThemeButton size="lg" />
 *
 * // Custom color
 * <ThemeButton color="primary" />
 * ```
 */

import { useId } from 'react' ;

import { MdDarkMode , MdLightMode } from 'react-icons/md' ;

import cn from '../../themes/helpers/cn' ;

import useThemes from '../../contexts/themes' ;

import getSwapClassNames , { SWAP_ITEM , SWAP_OFF , SWAP_ON } from '../../themes/components/swap' ;

import iconSizeMap from '../../themes/sizing/iconSize' ;

import Button from '../Button' ;

/**
 * @param {Object} props
 * @param {import('../..themes/components/button').ButtonColorValue} [props.color] - Button color.
 * @param {string} [props.className] - Additional class name.
 * @param {import('../..themes/components/button').ButtonSize} [props.size='lg'] - Button size.
 * @param {*} [props.rest] - Additional Button props.
 */
const ThemeButton =
({
    shape = 'square' ,
    size  = 'md' ,
    style = 'ghost' ,
    ...rest
}) =>
{
    const id = useId() ;

    const { isDark , toggleIsDark } = useThemes() ;

    const iconSize = iconSizeMap[size] || iconSizeMap.md ;

    const swapItemClassName = cn( SWAP_ITEM , 'fill-current' , iconSize , '[&>svg]:size-full' ) ;

    return (
        <Button
            shape    = { shape }
            showIcon = { false }
            size     = { size }
            style    = { style }
            { ...rest }
        >
            <label className={ getSwapClassNames({ className: iconSize }) }>
                <input
                    id       = { id }
                    type     = "checkbox"
                    onChange  = { toggleIsDark }
                    checked  = { !isDark }
                />
                <MdLightMode className={ cn( SWAP_ON  , swapItemClassName ) } />
                <MdDarkMode  className={ cn( SWAP_OFF , swapItemClassName ) } />
            </label>
        </Button>
    ) ;
} ;

export default ThemeButton ;