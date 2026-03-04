'use client' ;

import { motion } from 'motion/react' ;

/**
 * Slide right animation wrapper.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {number} [props.bounce=0.25] - Bounce intensity (spring only).
 * @param {number} [props.delay=0] - Animation delay in seconds.
 * @param {number} [props.duration=0.5] - Animation duration in seconds.
 * @param {number} [props.finish=0] - Final X position.
 * @param {number} [props.start=120] - Initial X position (positive = from right).
 * @param {string} [props.type='spring'] - Animation type ('spring' | 'tween' | 'inertia').
 *
 * @returns {React.ReactElement} Animated wrapper.
 *
 * @example
 * ```jsx
 * <SlideRight delay={ 0.2 }>
 *     <Drawer />
 * </SlideRight>
 * ```
 *
 * @example
 * ```jsx
 * // Longer slide
 * <SlideRight start={ 200 } duration={ 0.8 }>
 *     <Panel />
 * </SlideRight>
 * ```
 */
const SlideRight =
({
    children ,
    bounce   = 0.25 ,
    delay    = 0 ,
    duration = 0.5 ,
    finish   = 0 ,
    start    = 120 ,
    type     = 'spring' ,
    ...rest
}) =>
{
    return (
        <motion.div
            initial    = { { opacity: 0 , x: start } }
            animate    = { { opacity: 1 , x: finish } }
            transition = { { bounce , delay , duration , type } }
            { ...rest }
        >
            { children }
        </motion.div>
    ) ;
} ;

export default SlideRight ;