'use client' ;

import { useMemo } from 'react' ;

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
 * @param {Function} [props.onMouseMove] - Pointer move handler, called after the tilt is applied.
 * @param {Function} [props.onMouseLeave] - Pointer leave handler, called after the tilt is reset.
 * @param {Object} [props.style] - Inline styles, merged over the perspective and transition the
 *        effect needs — pass one and the tilt keeps working.
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

    // Out of `rest` : the spread below would override them, and they are the effect.
    onMouseMove  : onMouseMoveFromProps ,
    onMouseLeave : onMouseLeaveFromProps ,
    style ,

    ...rest
}) =>
{
    const MotionTag = useMemo( () => motion.create( Tag ) , [ Tag ] ) ;

    const handleMouseMove = ( e ) =>
    {
        const rect = e.currentTarget.getBoundingClientRect() ;

        const x = ( e.clientX - rect.left ) / rect.width ;
        const y = ( e.clientY - rect.top )  / rect.height ;

        const rotateX = ( 0.5 - y ) * intensity ;
        const rotateY = ( x - 0.5 ) * intensity ;

        e.currentTarget.style.transform =
            `perspective(${ perspective }px) rotateX(${ rotateX }deg) rotateY(${ rotateY }deg) scale(${ scale })` ;

        onMouseMoveFromProps?.( e ) ;
    } ;

    const handleMouseLeave = ( e ) =>
    {
        e.currentTarget.style.transform =
            `perspective(${ perspective }px) rotateX(0deg) rotateY(0deg) scale(1)` ;

        onMouseLeaveFromProps?.( e ) ;
    } ;

    return (
        <MotionTag
            className    = { className }
            style        = { { transformStyle: 'preserve-3d' , transition: `transform ${ duration }s ease-out` , ...style } }
            onMouseMove  = { handleMouseMove }
            onMouseLeave = { handleMouseLeave }
            { ...rest }
        >
            { children }
        </MotionTag>
    ) ;
} ;

export default Tilt ;