'use client' ;

import { useMemo } from 'react' ;

import { motion } from 'motion/react' ;

/**
 * Wrapper that staggers the entrance animation of its children.
 *
 * @param {Object} props
 * @param {string} [props.as='div'] - HTML element tag name.
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} [props.className] - CSS class name.
 * @param {number} [props.delay=0] - Initial delay before the first child animates.
 * @param {number} [props.stagger=0.1] - Delay between each child animation.
 * @param {number} [props.duration=0.4] - Animation duration per child.
 * @param {number} [props.y=20] - Vertical offset for entrance.
 *
 * @returns {React.ReactElement} Staggered container.
 *
 * @example
 * ```jsx
 * <StaggerList as="ul" className="flex flex-col gap-4">
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *     <li>Item 3</li>
 * </StaggerList>
 * ```
 *
 * @example
 * ```jsx
 * // Grid of cards
 * <StaggerList className="grid grid-cols-3 gap-6" stagger={ 0.15 }>
 *     { cards.map( card => <Card key={ card.id } { ...card } /> ) }
 * </StaggerList>
 * ```
 */
const StaggerList =
({
    as: Tag = 'div' ,
    children ,
    className ,
    delay    = 0 ,
    stagger  = 0.1 ,
    duration = 0.4 ,
    y        = 20 ,
    ...rest
}) =>
{
    const MotionTag = useMemo( () => motion.create( Tag ) , [ Tag ] ) ;

    const containerVariants =
    {
        hidden  : {} ,
        visible : { transition: { staggerChildren: stagger , delayChildren: delay } }
    } ;

    const itemVariants =
    {
        hidden  : { opacity: 0 , y } ,
        visible : { opacity: 1 , y: 0 }
    } ;

    const itemTransition = { duration , type: 'tween' , ease: 'easeOut' } ;

    return (
        <MotionTag
            className = { className }
            initial   = "hidden"
            animate   = "visible"
            variants  = { containerVariants }
            { ...rest }
        >
            { Array.isArray( children )
                ? children.map( ( child , i ) => (
                    <motion.div
                        key        = { child?.key ?? `stagger-item-${ i }` }
                        variants   = { itemVariants }
                        transition = { itemTransition }
                    >
                        { child }
                    </motion.div>
                ) )
                : children
            }
        </MotionTag>
    ) ;
} ;

export default StaggerList ;