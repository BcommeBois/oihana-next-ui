/**
 * Empty state class name generators.
 *
 * A house component : DaisyUI has no empty-state primitive, so the classes below are
 * plain Tailwind built on theme tokens rather than a port of an upstream component.
 *
 * @module themes/components/emptyState
 */

import cn from '../helpers/cn' ;

import { LG , MD , SM } from '../sizing/sizes' ;

export { LG , MD , SM } from '../sizing/sizes' ;

/**
 * @typedef {'sm' | 'md' | 'lg'} EmptyStateSize
 */

/**
 * Valid empty state sizes.
 *
 * The scale is about breathing room, not about the text : an empty state inside a
 * `SidePanel` or a table cell cannot take the vertical space a full-page one does.
 *
 * @type {EmptyStateSize[]}
 */
export const sizes = [ SM , MD , LG ] ;

const rootMap =
{
    [ SM ] : 'gap-2 p-4' ,
    [ MD ] : 'gap-3 p-8' ,
    [ LG ] : 'gap-4 p-12' ,
} ;

// react-icons render at `1em` by default, so scaling the wrapper's font size scales the
// icon — and keeps working for any other node passed in its place.
const iconMap =
{
    [ SM ] : 'text-2xl' ,
    [ MD ] : 'text-4xl' ,
    [ LG ] : 'text-5xl' ,
} ;

const titleMap =
{
    [ SM ] : 'text-sm' ,
    [ MD ] : 'text-base' ,
    [ LG ] : 'text-lg' ,
} ;

export const EMPTY_STATE = 'flex flex-col items-center justify-center text-center' ;

/**
 * Generates the empty state container className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {EmptyStateSize} [props.size='md'] - Vertical breathing room.
 *
 * @returns {string} The container className expression.
 *
 * @example
 * ```js
 * getEmptyStateClasses() ;
 * // → 'flex flex-col items-center justify-center text-center gap-3 p-8'
 *
 * getEmptyStateClasses({ size: 'sm' }) ;
 * // → 'flex flex-col items-center justify-center text-center gap-2 p-4'
 * ```
 */
export const getEmptyStateClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    size = MD ,
} = {} ) => cn
(
    beforeClassName ,
    EMPTY_STATE ,
    {
        ...before ,

        ...!!rootMap[ size ] && { [ rootMap[ size ] ] : true } ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates the icon wrapper className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {EmptyStateSize} [props.size='md'] - Icon scale.
 *
 * @returns {string} The icon wrapper className expression.
 *
 * @example
 * ```js
 * getEmptyStateIconClasses({ size: 'lg' }) ;
 * // → 'text-base-content/30 text-5xl'
 * ```
 */
export const getEmptyStateIconClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    size = MD ,
} = {} ) => cn
(
    beforeClassName ,
    'text-base-content/30' ,
    {
        ...before ,

        ...!!iconMap[ size ] && { [ iconMap[ size ] ] : true } ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates the title className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {EmptyStateSize} [props.size='md'] - Title scale.
 *
 * @returns {string} The title className expression.
 *
 * @example
 * ```js
 * getEmptyStateTitleClasses() ;
 * // → 'font-semibold text-base-content text-base'
 * ```
 */
export const getEmptyStateTitleClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
    size = MD ,
} = {} ) => cn
(
    beforeClassName ,
    'font-semibold text-base-content' ,
    {
        ...before ,

        ...!!titleMap[ size ] && { [ titleMap[ size ] ] : true } ,

        ...after ,
    } ,
    className ,
) ;

/**
 * Generates the description className expression.
 *
 * `max-w-prose` keeps a long explanation from stretching across a wide container, where
 * a single centred line would become unreadable.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The description className expression.
 *
 * @example
 * ```js
 * getEmptyStateDescriptionClasses() ;
 * // → 'max-w-prose text-sm text-base-content/60'
 * ```
 */
export const getEmptyStateDescriptionClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    'max-w-prose text-sm text-base-content/60' ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

/**
 * Generates the actions row className expression.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 *
 * @returns {string} The actions row className expression.
 *
 * @example
 * ```js
 * getEmptyStateActionsClasses() ;
 * // → 'flex flex-wrap items-center justify-center gap-2 pt-1'
 * ```
 */
export const getEmptyStateActionsClasses =
({
    after ,
    before ,
    beforeClassName ,
    className ,
} = {} ) => cn
(
    beforeClassName ,
    'flex flex-wrap items-center justify-center gap-2 pt-1' ,
    {
        ...before ,
        ...after ,
    } ,
    className ,
) ;

export default getEmptyStateClasses ;
