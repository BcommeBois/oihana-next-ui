/**
 * Pre-configured refresh button with jump animation.
 *
 * @module components/buttons/RefreshButton
 *
 * @example
 * ```jsx
 * // Default
 * <RefreshButton />
 *
 * // Custom color
 * <RefreshButton color="primary" />
 *
 * // Without animation
 * <RefreshButton motion={null} />
 *
 * // Custom delay
 * <RefreshButton motionProps={{ delay: 0.5 }} />
 * ```
 */

import { MdRefresh } from 'react-icons/md' ;

import Jump from '../../motions/Jump' ;

import MotionButton from './MotionButton' ;

/**
 * @param {Object} props
 * @param {Function} [props.icon] - Icon component.
 * @param {React.ElementType} [props.motion] - Motion wrapper component.
 * @param {Object} [props.motionProps] - Props passed to the motion wrapper.
 * @param {string} [props.path] - i18n path.
 * @param {import('@/themes/components/button').ButtonColorValue} [props.color='secondary'] - Button color.
 * @param {import('@/themes/components/button').ButtonShape} [props.shape='circle'] - Button shape.
 * @param {import('@/themes/components/button').ButtonSize} [props.size='md'] - Button size.
 * @param {*} [props.rest] - Additional Button props.
 */
const RefreshButton =
({
     color       = 'secondary' ,
     icon        = MdRefresh ,
     motion      = Jump ,
     motionProps = { delay: 0.3 } ,
     path        = 'components.buttons.refresh' ,
     shape       = 'circle' ,
     size        = 'md' ,
     ...rest
 }) =>
(
    <MotionButton
        color       = { color }
        icon        = { icon }
        motion      = { motion }
        motionProps = { motionProps }
        path        = { path }
        shape       = { shape }
        size        = { size }
        { ...rest }
    />
) ;

export default RefreshButton ;