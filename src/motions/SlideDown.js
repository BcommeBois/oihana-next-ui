'use client' ;

import { motion } from 'motion/react' ;

/**
 * Slide down animation wrapper.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {number} [props.bounce=0.25] - Bounce intensity (spring only).
 * @param {number} [props.delay=0.5] - Animation delay in seconds.
 * @param {number} [props.duration=0.5] - Animation duration in seconds.
 * @param {number} [props.finish=0] - Final Y position.
 * @param {number} [props.start=100] - Initial Y position (positive = from top).
 * @param {string} [props.type='spring'] - Animation type ('spring' | 'tween' | 'inertia').
 *
 * @returns {React.ReactElement} Animated wrapper.
 *
 * @example
 * ```jsx
 * <SlideDown delay={ 0.2 }>
 *     <Dropdown />
 * </SlideDown>
 * ```
 *
 * @example
 * ```jsx
 * // Longer slide
 * <SlideDown start={ 200 } duration={ 0.8 }>
 *     <Menu />
 * </SlideDown>
 * ```
 */
const SlideDown =
({
    children ,
    bounce   = 0.25 ,
    delay    = 0.5 ,
    duration = 0.5 ,
    finish   = 0 ,
    start    = 100 ,
    type     = 'spring' ,
    ...rest
}) =>
{
    return (
        <motion.div
            initial    = { { opacity: 0 , y: start } }
            animate    = { { opacity: 1 , y: finish } }
            transition = { { bounce , delay , duration , type } }
            { ...rest }
        >
            { children }
        </motion.div>
    ) ;
} ;

export default SlideDown ;