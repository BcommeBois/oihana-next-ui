'use client' ;

import { useMemo } from 'react' ;

import { motion } from 'motion/react' ;

/**
 * Reveal animation triggered when the element enters the viewport.
 *
 * @param {Object} props
 * @param {string} [props.as='div'] - HTML element tag name.
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} [props.className] - CSS class name.
 * @param {number} [props.delay=0] - Animation delay in seconds.
 * @param {number} [props.duration=0.6] - Animation duration in seconds.
 * @param {number} [props.y=40] - Vertical offset for entrance.
 * @param {number} [props.amount=0.3] - Viewport threshold (0-1) to trigger animation.
 * @param {boolean} [props.once=true] - Animate only once or every time it enters the viewport.
 *
 * @returns {React.ReactElement} Scroll-triggered wrapper.
 *
 * @example
 * ```jsx
 * <ScrollReveal>
 *     <Section />
 * </ScrollReveal>
 * ```
 *
 * @example
 * ```jsx
 * // Slide from the left
 * <ScrollReveal y={ 0 } x={ -60 }>
 *     <Sidebar />
 * </ScrollReveal>
 * ```
 *
 * @example
 * ```jsx
 * // Replay every time it scrolls into view
 * <ScrollReveal once={ false } amount={ 0.5 }>
 *     <Stats />
 * </ScrollReveal>
 * ```
 */
const ScrollReveal =
({
    as: Tag = 'div' ,
    children ,
    className ,
    delay    = 0 ,
    duration = 0.6 ,
    x        = 0 ,
    y        = 40 ,
    amount   = 0.3 ,
    once     = true ,
    ...rest
}) =>
{
    const MotionTag = useMemo( () => motion.create( Tag ) , [ Tag ] ) ;

    return (
        <MotionTag
            className  = { className }
            initial    = { { opacity: 0 , x , y } }
            whileInView = { { opacity: 1 , x: 0 , y: 0 } }
            viewport   = { { once , amount } }
            transition = { { delay , duration , type: 'tween' , ease: 'easeOut' } }
            { ...rest }
        >
            { children }
        </MotionTag>
    ) ;
} ;

export default ScrollReveal ;