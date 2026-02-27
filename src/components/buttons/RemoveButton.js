/**
 * Pre-configured remove/delete button with jump animation.
 *
 * @module components/buttons/RemoveButton
 *
 * @example
 * ```jsx
 * // Default
 * <RemoveButton />
 *
 * // Custom color
 * <RemoveButton color="error" />
 *
 * // Without animation
 * <RemoveButton motion={null} />
 *
 * // Custom delay
 * <RemoveButton motionProps={{ delay: 0.3 }} />
 * ```
 */

import { MdDelete } from 'react-icons/md' ;

import Jump from '@/motions/Jump' ;

import MotionButton from './MotionButton' ;

/**
 * @param {Object} props
 * @param {import('@/themes/components/button').ButtonColorValue} [props.color='primary'] - Button color.
 * @param {Function} [props.icon] - Icon component.
 * @param {React.ElementType} [props.motion] - Motion wrapper component.
 * @param {Object} [props.motionProps] - Props passed to the motion wrapper.
 * @param {string} [props.path] - i18n path.
 * @param {import('@/themes/components/button').ButtonShape} [props.shape='circle'] - Button shape.
 * @param {import('@/themes/components/button').ButtonSize} [props.size='md'] - Button size.
 * @param {*} [props.rest] - Additional Button props.
 */
const RemoveButton =
({
    color  = 'primary' ,
    icon   = MdDelete ,
    motion = Jump ,
    path   = 'components.buttons.remove' ,
    shape  = 'circle' ,
    size   = 'md' ,
    ...rest
}) =>
(
    <MotionButton
        color  = { color }
        icon   = { icon }
        motion = { motion }
        path   = { path }
        shape  = { shape }
        size   = { size }
        { ...rest }
    />
) ;

export default RemoveButton ;