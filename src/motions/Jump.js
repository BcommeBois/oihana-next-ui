'use client' ;

import { motion } from 'motion/react' ;

/**
 * Jump/bounce animation wrapper with scale effect.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {number} [props.bounce=0.6] - Bounce intensity (spring only).
 * @param {number} [props.delay=0] - Animation delay in seconds.
 * @param {number} [props.duration=1] - Animation duration in seconds.
 * @param {Object} [props.finish={ opacity: 1, scale: 1 }] - Final animation state.
 * @param {Object} [props.start={ opacity: 0, scale: 0.5 }] - Initial animation state.
 * @param {string} [props.type='spring'] - Animation type ('spring' | 'tween' | 'inertia').
 * @param {number} [props.velocity=2] - Initial velocity (spring only).
 * @param {Object} [props.transition] - Additional transition options.
 *
 * @returns {React.ReactElement} Animated wrapper.
 *
 * @example
 * ```jsx
 * <Jump delay={ 0.2 }>
 *     <Avatar />
 * </Jump>
 * ```
 *
 * @example
 * ```jsx
 * // Custom scale effect
 * <Jump
 *     start  = { { opacity: 0 , scale: 0 } }
 *     finish = { { opacity: 1 , scale: 1.2 } }
 * >
 *     <Badge />
 * </Jump>
 * ```
 *
 * @example
 * ```jsx
 * // More bounce
 * <Jump bounce={ 0.8 } duration={ 1.5 }>
 *     <Notification />
 * </Jump>
 * ```
 */
const Jump =
({
   children ,
   bounce     = 0.6 ,
   delay      = 0 ,
   duration   = 1 ,
   finish     = { opacity: 1 , scale: 1 } ,
   start      = { opacity: 0 , scale: 0.5 } ,
   type       = 'spring' ,
   velocity   = 2 ,
   transition ,
   ...rest
}) =>
{
    return (
        <motion.div
            initial    = { start }
            animate    = { finish }
            transition = { { bounce , delay , duration , type , velocity , ...transition } }
            { ...rest }
        >
            { children }
        </motion.div>
    ) ;
} ;

export default Jump ;