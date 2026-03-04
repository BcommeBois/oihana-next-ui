'use client' ;

import { motion } from 'motion/react' ;

/**
 * Fade in animation wrapper.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {number} [props.bounce=0.25] - Bounce intensity (spring only).
 * @param {number} [props.delay=0] - Animation delay in seconds.
 * @param {number} [props.duration=1] - Animation duration in seconds.
 * @param {number} [props.finish=1] - Final opacity.
 * @param {number} [props.start=0] - Initial opacity.
 * @param {string} [props.type='spring'] - Animation type ('spring' | 'tween' | 'inertia').
 * @param {number} [props.velocity=2] - Initial velocity (spring only).
 * @param {Object} [props.transition] - Additional transition options.
 *
 * @returns {React.ReactElement} Animated wrapper.
 *
 * @example
 * ```jsx
 * <FadeIn delay={ 0.2 }>
 *     <Card />
 * </FadeIn>
 * ```
 *
 * @example
 * ```jsx
 * // Slow fade with tween
 * <FadeIn type="tween" duration={ 2 } delay={ 0.5 }>
 *     <Hero />
 * </FadeIn>
 * ```
 *
 * @example
 * ```jsx
 * // Custom transition
 * <FadeIn transition={ { ease: 'easeOut' } }>
 *     <Modal />
 * </FadeIn>
 * ```
 */
const FadeIn =
({
    children ,
   bounce     = 0.25 ,
   delay      = 0 ,
   duration   = 1 ,
   finish     = 1 ,
   start      = 0 ,
   type       = 'spring' ,
   velocity   = 2 ,
   transition ,
   ...rest
}) =>
{
    return (
        <motion.div
            initial    = { { opacity: start } }
            animate    = { { opacity: finish } }
            transition = { { bounce , delay , duration , type , velocity , ...transition } }
            { ...rest }
        >
            { children }
        </motion.div>
    ) ;
} ;

export default FadeIn ;