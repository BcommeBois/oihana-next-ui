import cn from '../helpers/cn' ;

export const AVATAR_GROUP = 'avatar-group' ;

/**
 * Generates a DaisyUI avatar-group className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The avatar-group className expression.
 *
 * @example
 * ```js
 * getAvatarGroupClassNames() ;
 * // → 'avatar-group'
 *
 * getAvatarGroupClassNames({ className: '-space-x-6' }) ;
 * // → 'avatar-group -space-x-6'
 * ```
 */
export const getAvatarGroupClassNames =
({
    after,
    before,
    beforeClassName,
    className,
}
= {} ) => cn
(
    beforeClassName,
    AVATAR_GROUP,
    {
        ...before,
        ...after,
    },
    className,
) ;

export default getAvatarGroupClassNames ;