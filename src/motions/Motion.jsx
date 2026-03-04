'use client' ;

import { motion } from 'motion/react' ;

/**
 * Generic motion wrapper for custom animations.
 *
 * Pass any motion props directly to the underlying motion.div.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {Object} [props.initial] - Initial animation state.
 * @param {Object} [props.animate] - Target animation state.
 * @param {Object} [props.exit] - Exit animation state.
 * @param {Object} [props.transition] - Transition options.
 * @param {Object} [props.whileHover] - Hover animation state.
 * @param {Object} [props.whileTap] - Tap/click animation state.
 *
 * @returns {React.ReactElement} Animated wrapper.
 *
 * @example
 * ```jsx
 * <Motion
 *     initial  = { { opacity: 0 } }
 *     animate  = { { opacity: 1 } }
 *     exit     = { { opacity: 0 } }
 * >
 *     <Card />
 * </Motion>
 * ```
 *
 * @example
 * ```jsx
 * // Hover effect
 * <Motion
 *     whileHover = { { scale: 1.05 } }
 *     whileTap   = { { scale: 0.95 } }
 * >
 *     <Button />
 * </Motion>
 * ```
 *
 * @example
 * ```jsx
 * // Complex animation
 * <Motion
 *     initial    = { { x: -100 , opacity: 0 } }
 *     animate    = { { x: 0 , opacity: 1 } }
 *     transition = { { type: 'spring' , stiffness: 100 } }
 * >
 *     <Sidebar />
 * </Motion>
 * ```
 */
const Motion = ( { children , ...rest } ) =>
{
    return (
        <motion.div { ...rest }>
            { children }
        </motion.div>
    ) ;
} ;

export default Motion ;