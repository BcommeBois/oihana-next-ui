'use client' ;

/**
 * AvatarGroup component for DaisyUI.
 *
 * @module components/AvatarGroup
 * @see https://daisyui.com/components/avatar
 *
 * @example
 * ```jsx
 * // Simple group
 * <AvatarGroup className="-space-x-6">
 *     <Avatar innerClassName="w-12">
 *         <img src="/user1.jpg" />
 *     </Avatar>
 *     <Avatar innerClassName="w-12">
 *         <img src="/user2.jpg" />
 *     </Avatar>
 *     <Avatar innerClassName="w-12">
 *         <img src="/user3.jpg" />
 *     </Avatar>
 * </AvatarGroup>
 *
 * // With counter
 * <AvatarGroup className="-space-x-6">
 *     <Avatar innerClassName="w-12">
 *         <img src="/user1.jpg" />
 *     </Avatar>
 *     <Avatar innerClassName="w-12">
 *         <img src="/user2.jpg" />
 *     </Avatar>
 *     <Avatar placeholder innerClassName="w-12 bg-neutral text-neutral-content">
 *         <span>+99</span>
 *     </Avatar>
 * </AvatarGroup>
 * ```
 */

import getAvatarGroupClassNames from '../../themes/components/avatarGroup' ;

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - Root element type.
 * @param {string} [props.className] - Additional class name (e.g., "-space-x-6").
 * @param {React.ReactNode} props.children - Avatar components.
 */
const AvatarGroup = ({
    as,
    className,
    children,
}) =>
{
    const Component = as ?? 'div' ;

    const classNames = getAvatarGroupClassNames({ className } ) ;

    return (
        <Component className={ classNames }>
            { children }
        </Component>
    ) ;
} ;

AvatarGroup.displayName = 'AvatarGroup' ;

export default AvatarGroup ;