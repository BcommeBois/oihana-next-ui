'use client' ;

import { useMemo } from 'react' ;

import { motion } from 'motion/react' ;

import cn from '../themes/helpers/cn'

/**
 * Animate text word by word with a staggered fade-in.
 *
 * @param {Object} props
 * @param {string} [props.as='span'] - HTML element tag name.
 * @param {string} props.text - The text to animate.
 * @param {string} [props.className] - CSS class name.
 * @param {number} [props.delay=0] - Initial delay in seconds.
 * @param {number} [props.stagger=0.08] - Delay between each word.
 *
 * @returns {React.ReactElement} Animated text.
 *
 * @example
 * ```jsx
 * <WordReveal as="p" text="Bienvenue sur notre plateforme" className='text-lg' />
 * ```
 */
const WordReveal =
({
    as: Tag = 'span' ,
    text ,
    className ,
    delay   = 0 ,
    stagger = 0.08 ,
    ...rest
}) =>
{
    const MotionTag = useMemo( () => motion.create( Tag ) , [ Tag ] ) ;
    const words = text.split( ' ' ) ;

    return (
        <MotionTag
            className  = { cn( 'text-base-content block' , className ) }
            initial   = "hidden"
            animate   = "visible"
            variants  = { { visible: { transition: { staggerChildren: stagger , delayChildren: delay } } } }
            { ...rest }
        >
            { words.map( ( word , i ) => (
                <motion.span
                    key        = { `word-reveal-${ i }` }
                    className  = "inline-block mr-[0.25em]"
                    variants   = { {
                        hidden  : { opacity: 0 , y: 20 , filter: 'blur(4px)' } ,
                        visible : { opacity: 1 , y: 0  , filter: 'blur(0px)' }
                    } }
                    transition = { { duration: 0.4 , type: 'tween' , ease: 'easeOut' } }
                >
                    { word }
                </motion.span>
            ) ) }
        </MotionTag>
    ) ;
} ;

export default WordReveal ;