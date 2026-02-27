'use client' ;

import { motion } from 'motion/react' ;

/**
 * 3D tilt effect on hover using CSS perspective.
 *
 * @param {Object} props
 * @param {string} [props.as='div'] - HTML element tag name.
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} [props.className] - CSS class name.
 * @param {number} [props.intensity=15] - Maximum tilt angle in degrees.
 * @param {number} [props.perspective=800] - CSS perspective value in pixels.
 * @param {number} [props.scale=1.05] - Scale factor on hover.
 * @param {number} [props.duration=0.3] - Transition duration in seconds.
 *
 * @returns {React.ReactElement} Tilt wrapper.
 *
 * @example
 * ```jsx
 * <Tilt>
 *     <Card />
 * </Tilt>
 * ```
 *
 * @example
 * ```jsx
 * <Tilt as="li" intensity={ 8 } scale={ 1.02 }>
 *     <Thumbnail />
 * </Tilt>
 * ```
 */
const Tilt =
({
    as: Tag = 'div' ,
    children ,
    className ,
    intensity   = 15 ,
    perspective = 800 ,
    scale       = 1.05 ,
    duration    = 0.3 ,
    ...rest
}) =>
{
    const MotionTag = motion.create( Tag ) ;

    const handleMouseMove = ( e ) =>
    {
        const rect = e.currentTarget.getBoundingClientRect() ;

        const x = ( e.clientX - rect.left ) / rect.width ;
        const y = ( e.clientY - rect.top )  / rect.height ;

        const rotateX = ( 0.5 - y ) * intensity ;
        const rotateY = ( x - 0.5 ) * intensity ;

        e.currentTarget.style.transform =
            `perspective(${ perspective }px) rotateX(${ rotateX }deg) rotateY(${ rotateY }deg) scale(${ scale })` ;
    } ;

    const handleMouseLeave = ( e ) =>
    {
        e.currentTarget.style.transform =
            `perspective(${ perspective }px) rotateX(0deg) rotateY(0deg) scale(1)` ;
    } ;

    return (
        <MotionTag
            className    = { className }
            style        = { { transformStyle: 'preserve-3d' , transition: `transform ${ duration }s ease-out` } }
            onMouseMove  = { handleMouseMove }
            onMouseLeave = { handleMouseLeave }
            { ...rest }
        >
            { children }
        </MotionTag>
    ) ;
} ;

export default Tilt ;