/**
 * Fullscreen toggle button with swap animation.
 *
 * @module components/buttons/FullscreenButton
 *
 * @example
 * ```jsx
 * <FullscreenButton />
 *
 * // Custom size
 * <FullscreenButton size="lg" />
 *
 * // Custom color
 * <FullscreenButton color="primary" />
 * ```
 */

import { useId } from 'react' ;

import { MdFullscreen , MdFullscreenExit } from 'react-icons/md' ;

import cn from '../../themes/helpers/cn' ;

import useFullscreen from '../../contexts/fullscreen' ;

import getSwapClassNames , { SWAP_ITEM , SWAP_OFF , SWAP_ON } from '../../themes/components/swap' ;

import iconSizeMap from '../../themes/sizing/iconSize' ;

import Button from '../Button' ;

/**
 * @param {Object} props
 * @param {import('../../themes/components/button').ButtonColorValue} [props.color] - Button color.
 * @param {import('../../themes/components/button').ButtonSize} [props.size='lg'] - Button size.
 * @param {*} [props.rest] - Additional Button props.
 */
const FullscreenButton =
({
    shape = 'square' ,
    size  = 'md' ,
    style = 'ghost' ,
    ...rest
}) =>
{
    const id = useId() ;

    const { isFullscreen , toggleFullscreen } = useFullscreen() ;

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
                    onChange  = { toggleFullscreen }
                    checked  = { isFullscreen }
                />
                <MdFullscreenExit className={ cn( SWAP_ON  , swapItemClassName ) } />
                <MdFullscreen     className={ cn( SWAP_OFF , swapItemClassName ) } />
            </label>
        </Button>
    ) ;
} ;

export default FullscreenButton ;