/**
 * Pre-configured copy button with jump animation.
 *
 * @module components/buttons/CopyButton
 *
 * @example
 * ```jsx
 * // Default
 * <CopyButton />
 *
 * // Custom color
 * <CopyButton color="primary" />
 *
 * // Without animation
 * <CopyButton motion={null} />
 * ```
 */

import { MdContentCopy } from 'react-icons/md' ;

import Jump from '../../motions/Jump' ;

import MotionButton from './MotionButton' ;

/**
 * @param {Object} props
 * @param {import('../../themes/components/button').ButtonColorValue} [props.color] - Button color.
 * * @param {Function} [props.icon] - Icon component.
 * @param {React.ElementType} [props.motion] - Motion wrapper component.
 * @param {Object} [props.motionProps] - Props passed to the motion wrapper.
 * @param {string} [props.path] - i18n path.
 * @param {import('../../themes/components/button').ButtonShape} [props.shape='circle'] - Button shape.
 * @param {import('../../themes/components/button').ButtonSize} [props.size='md'] - Button size.
 * @param {import('../../themes/components/button').ButtonStyle} [props.style='ghost'] - Button style.
 * @param {*} [props.rest] - Additional Button props.
 */
const CopyButton =
({
    icon = MdContentCopy ,
    motion = Jump ,
    path = 'components.buttons.copy' ,
    shape= 'circle' ,
    size = 'md' ,
    style = 'ghost' ,
    ...rest
}) =>
(
    <MotionButton
        icon   = { icon }
        motion = { motion }
        path   = { path }
        shape  = { shape }
        size   = { size }
        style  = { style }
        { ...rest }
    />
) ;

export default CopyButton ;