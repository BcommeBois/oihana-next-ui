/**
 * Theme toggle button (light/dark) with swap animation.
 *
 * Renders a checkbox-based DaisyUI swap button that toggles between
 * light and dark mode. The swap animation is disabled on first render
 * to prevent a visual flash during hydration.
 *
 * @module components/buttons/ThemeButton
 *
 * @example
 * ```jsx
 * <ThemeButton />
 * ```
 *
 * @example
 * ```jsx
 * // Custom size
 * <ThemeButton size="lg" />
 * ```
 *
 * @example
 * ```jsx
 * // Custom style
 * <ThemeButton style="outline" />
 * ```
 */

import { useEffect , useId , useState } from 'react' ;

import { MdDarkMode , MdLightMode } from 'react-icons/md' ;

import cn from '../../themes/helpers/cn' ;

import useThemes from '../../contexts/themes/useThemes' ;

import getSwapClassNames , { ROTATE , SWAP_ITEM , SWAP_OFF , SWAP_ON } from '../../themes/components/swap' ;

import iconSizeMap from '../../themes/sizing/iconSize' ;

import Button from '../Button' ;

/**
 * @param {Object}  props
 * @param {string}  [props.className] - Additional class names.
 * @param {import('../../themes/components/button').ButtonShape} [props.shape='square'] - Button shape.
 * @param {import('../../themes/components/button').ButtonSize}  [props.size='md'] - Button size.
 * @param {import('../../themes/components/button').ButtonStyle} [props.style='ghost'] - Button style.
 * @param {string}  [props.path='components.buttons.theme'] - i18n path the accessible name is read from. A swap of two icons has no text of its own.
 * @param {*}       [props.rest] - Additional props forwarded to Button.
 *
 * @returns {React.ReactElement}
 */
const ThemeButton =
({
    className ,
    path  = 'components.buttons.theme' ,
    shape = 'square' ,
    size  = 'md' ,
    style = 'ghost' ,
    ...rest
}) =>
{
    const id = useId() ;

    const { isDark , toggleIsDark } = useThemes() ;

    const [ mounted , setMounted ] = useState( false ) ;

    useEffect( () => { setMounted( true ) ; } , [] ) ;

    const iconSize = iconSizeMap[size] || iconSizeMap.md ;

    const swapClassNames = getSwapClassNames({
        animation : mounted ? ROTATE : undefined ,
        className : iconSize
    }) ;

    const swapItemClassName = cn
    (
        SWAP_ITEM ,
        'fill-current' ,
        iconSize ,
        '[&>svg]:size-full'
    ) ;

    return (
        // A sun and a moon, and no text. The name says what the control **does**
        // rather than what it will become : « switch to dark » would be wrong for
        // the frame before the theme is known, and a name that changes under a
        // focus is one a screen reader may read twice.
        <Button
            className = { className }
            path      = { path }
            shape     = { shape }
            showIcon  = { false }
            size      = { size }
            style     = { style }
            { ...rest }
        >
            <label className={ swapClassNames } >
                <input
                    id                       = { id }
                    type                     = "checkbox"
                    onChange                 = { toggleIsDark }
                    checked                  = { mounted ? isDark : false }
                    suppressHydrationWarning = { true }
                    readOnly                 = { !mounted }
                />
                <MdLightMode className={ cn( SWAP_ON  , swapItemClassName ) } />
                <MdDarkMode  className={ cn( SWAP_OFF , swapItemClassName ) } />
            </label>
        </Button>
    ) ;
} ;

export default ThemeButton ;