import cn from '../helpers/cn' ;

// Indicators

export const OFFLINE = 'offline' ;
export const ONLINE  = 'online' ;

/**
 * @typedef {'offline' | 'online'} AvatarIndicator
 */

export const indicators = [ OFFLINE , ONLINE ] ;

const indicatorMap =
{
    [ OFFLINE ] : 'avatar-offline' ,
    [ ONLINE  ] : 'avatar-online' ,
} ;

export const AVATAR       = 'avatar' ;
export const AVATAR_GROUP = 'avatar-group' ;

/**
 * Generates a DaisyUI avatar className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {AvatarIndicator} [props.indicator] - Online/offline indicator.
 * @param {boolean} [props.placeholder] - Show letter placeholder.
 *
 * @returns {string} The avatar className expression.
 */
export const getAvatarClassNames = ({
    after,
    before,
    beforeClassName,
    className,
    indicator,
    placeholder,
} = {} ) => cn(
    beforeClassName,
    AVATAR,
    {
        ...before,

        ...!!indicatorMap[indicator] && { [ indicatorMap[indicator] ] : true } ,
        ...placeholder === true      && { 'avatar-placeholder'      : true } ,

        ...after,
    },
    className,
) ;

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

export default getAvatarClassNames ;