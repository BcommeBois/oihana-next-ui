/**
 * Navbar class names generator for DaisyUI.
 *
 * @module themes/components/navbar
 * @see https://daisyui.com/components/navbar
 *
 * The navbar has three child sections:
 * - `navbar-start` — left section
 * - `navbar-center` — center section
 * - `navbar-end` — right section
 *
 * These are applied on child elements, not on the navbar itself.
 */

import applyIfDefined from '../../helpers/applyIfDefined' ;
import cn             from '../helpers/cn' ;

import getBackgroundColor from '../colors/backgroundColor' ;
import getPosition        from '../layout/position' ;
import getShadow          from '../effects/shadow' ;

export const NAVBAR        = 'navbar' ;
export const NAVBAR_START  = 'navbar-start' ;
export const NAVBAR_CENTER = 'navbar-center' ;
export const NAVBAR_END    = 'navbar-end' ;

/**
 * Generates navbar class names.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class overrides applied after all transformations.
 * @param {Object} [props.before] - Class definitions applied before all transformations.
 * @param {string} [props.beforeClassName] - CSS string prepended before all classes.
 * @param {string} [props.className] - CSS string appended after all classes.
 * @param {import('../colors/backgroundColor').BackgroundColor | import('../helpers/getPseudoClassDefinition').PseudoClassDefinition} [props.backgroundColor] - Background color.
 * @param {boolean} [props.important] - Force important modifier.
 * @param {import('../layout/position').PositionValue | import('../sizing/sizes').ResponsiveSize} [props.position] - CSS position.
 * @param {import('../filters/shadow').ShadowValue | import('../helpers/getPseudoClassDefinition').PseudoClassDefinition} [props.shadow] - Box shadow.
 *
 * @returns {string} Combined class names string.
 *
 * @example
 * ```js
 * getNavbarClassNames() ;
 * // → 'navbar'
 *
 * getNavbarClassNames( { backgroundColor: 'base-100' , shadow: 'sm' } ) ;
 * // → 'navbar bg-base-100 shadow-sm'
 *
 * getNavbarClassNames( { position: 'sticky' , className: 'top-0 z-50' } ) ;
 * // → 'navbar sticky top-0 z-50'
 *
 * getNavbarClassNames( {
 *     backgroundColor: { value: 'base-100' , hover: 'base-200' } ,
 *     shadow: { value: 'sm' , hover: 'lg' } ,
 *     position: 'sticky' ,
 *     className: 'top-0 z-50' ,
 * } ) ;
 * // → 'navbar bg-base-100 hover:bg-base-200 shadow-sm hover:shadow-lg sticky top-0 z-50'
 * ```
 */
const getNavbarClassNames =
({
     after ,
     before ,
     beforeClassName ,
     className ,
     backgroundColor ,
     important ,
     position ,
     shadow ,
 }
 = {} ) => cn
(
    beforeClassName ,
    NAVBAR ,
    {
        ...before ,

        ...applyIfDefined( getPosition       , position ) ,
        ...applyIfDefined( getBackgroundColor , backgroundColor ) ,
        ...applyIfDefined( getShadow          , { shadow } , { important } ) ,

        ...after ,
    } ,
    className ,
) ;

export default getNavbarClassNames ;