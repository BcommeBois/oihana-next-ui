/**
 * Pre-configured save button with jump animation.
 *
 * @module components/buttons/SaveButton
 *
 * @example
 * ```jsx
 * // Default (icon only)
 * <SaveButton />
 *
 * // With label
 * <SaveButton>Enregistrer</SaveButton>
 *
 * // Custom color
 * <SaveButton color="success" />
 *
 * // Without animation
 * <SaveButton motion={null} />
 * ```
 */

import { MdSaveAs } from 'react-icons/md' ;

import Jump from '@/motions/Jump' ;

import MotionButton from './MotionButton' ;

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Button content (overrides i18n label).
 * @param {import('@/themes/components/button').ButtonColorValue} [props.color='primary'] - Button color.
 * @param {Function} [props.icon] - Icon component.
 * @param {React.ElementType} [props.motion] - Motion wrapper component.
 * @param {Object} [props.motionProps] - Props passed to the motion wrapper.
 * @param {string} [props.path] - i18n path.
 * @param {import('@/themes/components/button').ButtonShape} [props.shape='circle'] - Button shape.
 * @param {import('@/themes/components/button').ButtonSize} [props.size='md'] - Button size.
 * @param {*} [props.rest] - Additional Button props.
 */
const SaveButton =
({
     children ,
     color  = 'primary' ,
     icon   = MdSaveAs ,
     motion = Jump ,
     path   = 'components.buttons.save' ,
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
    >
        { children }
    </MotionButton>
) ;

export default SaveButton ;