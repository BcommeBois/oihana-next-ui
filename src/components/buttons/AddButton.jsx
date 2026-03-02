/**
 * Pre-configured add button with jump animation.
 *
 * @module components/buttons/AddButton
 *
 * @example
 * ```jsx
 * // Default
 * <AddButton />
 *
 * // Custom color
 * <AddButton color="success" />
 *
 * // Without animation
 * <AddButton motion={null} />
 *
 * // Custom motion delay
 * <AddButton motionProps={{ delay: 0.3 }} />
 * ```
 */

import { MdAdd } from 'react-icons/md' ;

import Jump from '../../motions/Jump' ;

import MotionButton from './MotionButton' ;

/**
 * @param {Object} props - All MotionButton/Button props.
 */
const AddButton =
({
     color  = 'primary' ,
     icon   = MdAdd ,
     motion = Jump ,
     path   = 'components.buttons.add' ,
     shape  = 'circle',
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

export default AddButton ;