'use client' ;

/**
 * Avatar component for DaisyUI.
 *
 * @module components/Avatar
 * @see https://daisyui.com/components/avatar
 *
 * @example
 * ```jsx
 * // Simple avatar with image
 * <Avatar innerClassName="w-24 rounded-full">
 *     <Image src="/photo.jpg" alt="User" width={96} height={96} />
 * </Avatar>
 *
 * // Online indicator
 * <Avatar indicator="online" innerClassName="w-16 rounded-full">
 *     <Image src="/photo.jpg" alt="User" width={64} height={64} />
 * </Avatar>
 *
 * // Placeholder with initials
 * <Avatar placeholder innerClassName="w-12 rounded-full bg-neutral text-neutral-content">
 *     <span>JD</span>
 * </Avatar>
 *
 * // With custom wrapper classes
 * <Avatar className="mx-4" innerClassName="w-24 rounded-xl">
 *     <Image src="/photo.jpg" alt="User" width={96} height={96} />
 * </Avatar>
 * ```
 */

import getAvatarClassNames from '../../themes/components/avatar' ;

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - Root element type.
 * @param {string} [props.className] - Wrapper class name (applied to avatar container).
 * @param {string} [props.innerClassName] - Inner wrapper class name (size, shape, etc.).
 * @param {React.ReactNode} [props.children] - Avatar content (image, placeholder text, etc.).
 * @param {import('@/themes/components/avatar').AvatarIndicator} [props.indicator] - Online/offline indicator.
 * @param {boolean} [props.placeholder] - Show letter placeholder.
 */
const Avatar =
({
    as,
    className,
    innerClassName,
    children,
    indicator,
    placeholder,
}) =>
{
    const Component = as ?? 'div' ;

    const wrapperClasses = getAvatarClassNames({
        className,
        indicator,
        placeholder,
    }) ;

    return (
        <Component className={ wrapperClasses }>
            <div className={ innerClassName }>
                { children }
            </div>
        </Component>
    ) ;
} ;

Avatar.displayName = 'Avatar' ;

export default Avatar ;