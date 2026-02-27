/**
 * Button wrapper with optional motion animation.
 *
 * @module components/buttons/MotionButton
 *
 * @example
 * ```jsx
 * import Jump from '@/motions/Jump' ;
 *
 * // With animation
 * <MotionButton motion={Jump} color="primary" path="actions.save" />
 *
 * // With motion options
 * <MotionButton motion={Jump} motionProps={{ delay: 0.2, bounce: 0.8 }}>
 *     Save
 * </MotionButton>
 *
 * // Without animation
 * <MotionButton color="primary">Save</MotionButton>
 * ```
 */

import Button from '../Button' ;

/**
 * @param {Object} props
 * @param {React.ElementType} [props.motion] - Motion wrapper component.
 * @param {Object} [props.motionProps] - Props passed to the motion wrapper.
 * @param {Object} [props...rest] - All Button props.
 */
const MotionButton =
({
     motion: Motion ,
     motionProps ,
     ...rest
 }) =>
{
    const button = <Button { ...rest } /> ;

    if ( Motion )
    {
        return (
            <Motion { ...motionProps }>
                { button }
            </Motion>
        ) ;
    }

    return button ;
} ;

export default MotionButton ;