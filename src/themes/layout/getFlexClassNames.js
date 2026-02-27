/**
 * Flex class names generator for Tailwind CSS.
 *
 * @module themes/layout/getFlexClassNames
 */

import cn from '@/themes/helpers/cn' ;

import applyIfDefined from '@/helpers/applyIfDefined' ;

import getFlexDirection from './flexDirection' ;
import getFlexGrow      from './flexGrow' ;
import getFlexShrink    from './flexShrink' ;
import getFlexWrap      from './flexWrap' ;

import getLayoutClassNames from './getLayoutClassNames' ;

/**
 * @typedef {import('./getLayoutClassNames').LayoutClassNamesProps & {
 *   direction?: import('./flexDirection').FlexDirectionValue,
 *   grow?: number | string | boolean,
 *   shrink?: number | string | boolean,
 *   wrap?: import('./flexWrap').FlexWrapValue,
 * }} FlexClassNamesProps
 */

/**
 * Generates flex container class names.
 *
 * Extends {@link getLayoutClassNames} with flex-specific properties.
 *
 * @param {FlexClassNamesProps} [props]
 * @returns {string} Combined class names string.
 *
 * @see https://tailwindcss.com/docs/flex
 *
 * @example
 * ```js
 * getFlexClassNames( { direction: 'row' , alignItems: 'center' , gap: 4 } ) ;
 * // → 'flex flex-row items-center gap-4'
 *
 * getFlexClassNames( { direction: { xs: 'col' , lg: 'row' } , justifyContent: 'between' } ) ;
 * // → 'flex flex-col lg:flex-row justify-between'
 *
 * getFlexClassNames( { borderWidth: true , borderColor: 'base-300' , borderRadius: 'lg' } ) ;
 * // → 'flex border border-base-300 rounded-lg'
 * ```
 */
export const getFlexClassNames =
({
    direction ,
    grow ,
    shrink ,
    wrap ,

    ...layoutProps
}
= {} ) => cn
(
    'flex' ,
    {
        ...applyIfDefined( getFlexDirection , direction ) ,
        ...applyIfDefined( getFlexWrap      , wrap      ) ,
        ...applyIfDefined( getFlexGrow      , grow      ) ,
        ...applyIfDefined( getFlexShrink    , shrink    ) ,
    } ,
    getLayoutClassNames( layoutProps ) ,
) ;

export default getFlexClassNames ;