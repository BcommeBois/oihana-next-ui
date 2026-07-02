'use client' ;

import cn from '../themes/helpers/cn' ;

import getSkeletonClasses from '../themes/components/skeleton' ;

/**
 * Skeleton component for DaisyUI 5.
 * A placeholder to show a loading state while content is being fetched.
 *
 * @module components/Skeleton
 * @see https://daisyui.com/components/skeleton
 *
 * @example
 * ```jsx
 * // Simple placeholder — shape/size come from utility classes
 * <Skeleton className="h-32 w-32" />
 *
 * // Circle (e.g. an avatar placeholder)
 * <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
 *
 * // Animated gradient text
 * <Skeleton text as="span">AI is thinking harder...</Skeleton>
 *
 * // As another element
 * <Skeleton as="li" className="h-4 w-28" />
 * ```
 */

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element type.
 * @param {React.ReactNode} [props.children] - Optional content (mainly used with `text`).
 * @param {string} [props.className] - Additional classes (size, shape, radius…).
 * @param {boolean} [props.text=false] - Animate the text color instead of the background (`skeleton-text`).
 */
const Skeleton =
({
    as ,
    children ,
    className ,
    text = false ,

    ...rest
}) =>
{
    const Component = as ?? 'div' ;

    const classes = getSkeletonClasses({ text , className }) ;

    return (
        <Component className={ cn( classes ) } { ...rest }>
            { children }
        </Component>
    ) ;
} ;

Skeleton.displayName = 'Skeleton' ;

export default Skeleton ;
