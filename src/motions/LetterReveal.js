'use client' ;

import { motion } from 'motion/react' ;

import cn from '@/themes/helpers/cn'

/**
 * Animate text letter by letter with a staggered fade-in.
 *
 * @param {Object} props
 * @param {string} [props.as='span'] - HTML element tag name.
 * @param {string} props.text - The text to animate.
 * @param {string} [props.className] - CSS class name.
 * @param {number} [props.delay=0] - Initial delay in seconds.
 * @param {number} [props.stagger=0.03] - Delay between each letter.
 * @param {number} [props.duration=0.3] - Animation duration per letter.
 *
 * @returns {React.ReactElement} Animated text.
 *
 * @example
 * ```jsx
 * <LetterReveal as="p" text="Oihana Next UI" delay={ 0.3 } className='text-6xl font-bold' />
 * ```
 */
const LetterReveal =
({
    as: Tag = 'span' ,
    text ,
    className ,
    delay    = 0 ,
    stagger  = 0.03 ,
    duration = 0.3 ,
    ...rest
}) =>
{
    const MotionTag = motion.create( Tag ) ;
    const letters = text.split( '' ) ;

    return (
        <MotionTag
            className  = { cn( 'text-base-content block' , className ) }
            initial    = "hidden"
            animate    = "visible"
            variants   = { { visible: { transition: { staggerChildren: stagger , delayChildren: delay } } } }
            aria-label = { text }
            { ...rest }
        >
            { letters.map( ( letter , i ) => (
                <motion.span
                    key         = { i }
                    className   = "inline-block"
                    style       = { letter === ' ' ? { width: '0.25em' } : undefined }
                    variants    = { {
                        hidden  : { opacity: 0 , y: 12 , filter: 'blur(4px)' } ,
                        visible : { opacity: 1 , y: 0  , filter: 'blur(0px)' }
                    } }
                    transition  = { { duration , type: 'tween' , ease: 'easeOut' } }
                    aria-hidden = "true"
                >
                    { letter === ' ' ? '\u00A0' : letter }
                </motion.span>
            ) ) }
        </MotionTag>
    ) ;
} ;

export default LetterReveal ;