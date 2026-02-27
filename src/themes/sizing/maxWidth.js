import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import
{
    lazyFixedSizes ,
    FIT , FULL , MAX , MIN , NONE , PROSE ,
    SCREEN_SM , SCREEN_MD , SCREEN_LG , SCREEN_XL , SCREEN_XXL ,
    XS , SM , MD , LG , XL , XXL , XXXL , XXXXL , XXXXXL , XXXXXXL , XXXXXXXL ,
}
    from './sizes' ;

/**
 * Valid max-width values.
 *
 * @type {(string|number|string)[]}
 */
export const maxWidths =
[
    ...lazyFixedSizes ,
    FIT , FULL , MAX , MIN , NONE , PROSE ,
    SCREEN_SM , SCREEN_MD , SCREEN_LG , SCREEN_XL , SCREEN_XXL ,
    XS , SM , MD , LG , XL , XXL , XXXL , XXXXL , XXXXXL , XXXXXXL , XXXXXXXL ,
] ;

/**
 * Generates responsive max-width class definitions.
 *
 * @param {string|number|Object} value - Max-width value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/max-width
 *
 * @example
 * ```js
 * getMaxWidth( '7xl' ) ;
 * // → { 'max-w-7xl': true }
 *
 * getMaxWidth( { xs: 'full' , md: 'prose' , lg: 'screen-lg' } ) ;
 * // → { 'max-w-full': true , 'md:max-w-prose': true , 'lg:max-w-screen-lg': true }
 * ```
 */
const getMaxWidth = getResponsiveDefinition
(
    create( 'max-w-' ) ,
    ( value ) => maxWidths.includes( value )
) ;

export default getMaxWidth ;


/* Tailwindcss safe list
| ------- XS ----- | --------- SM ------ | --------- MD ------ | --------- LG ------ | --------- XL -----— | -------- XXL ------ |
| max-w-px         | sm:max-w-px         | md:max-w-px         | lg:max-w-px         | xl:max-w-px         | 2xl:max-w-px         |
| max-w-0          | sm:max-w-0          | md:max-w-0          | lg:max-w-0          | xl:max-w-0          | 2xl:max-w-0          |
| max-w-0.5        | sm:max-w-0.5        | md:max-w-0.5        | lg:max-w-0.5        | xl:max-w-0.5        | 2xl:max-w-0.5        |
| max-w-1          | sm:max-w-1          | md:max-w-1          | lg:max-w-1          | xl:max-w-1          | 2xl:max-w-1          |
| max-w-1.5        | sm:max-w-1.5        | md:max-w-1.5        | lg:max-w-1.5        | xl:max-w-1.5        | 2xl:max-w-1.5        |
| max-w-2          | sm:max-w-2          | md:max-w-2          | lg:max-w-2          | xl:max-w-2          | 2xl:max-w-2          |
| max-w-2.5        | sm:max-w-2.5        | md:max-w-2.5        | lg:max-w-2.5        | xl:max-w-2.5        | 2xl:max-w-2.5        |
| max-w-3          | sm:max-w-3          | md:max-w-3          | lg:max-w-3          | xl:max-w-3          | 2xl:max-w-3          |
| max-w-3.5        | sm:max-w-3.5        | md:max-w-3.5        | lg:max-w-3.5        | xl:max-w-3.5        | 2xl:max-w-3.5        |
| max-w-4          | sm:max-w-4          | md:max-w-4          | lg:max-w-4          | xl:max-w-4          | 2xl:max-w-4          |
| max-w-5          | sm:max-w-5          | md:max-w-5          | lg:max-w-5          | xl:max-w-5          | 2xl:max-w-5          |
| max-w-6          | sm:max-w-6          | md:max-w-6          | lg:max-w-6          | xl:max-w-6          | 2xl:max-w-6          |
| max-w-7          | sm:max-w-7          | md:max-w-7          | lg:max-w-7          | xl:max-w-7          | 2xl:max-w-7          |
| max-w-8          | sm:max-w-8          | md:max-w-8          | lg:max-w-8          | xl:max-w-8          | 2xl:max-w-8          |
| max-w-9          | sm:max-w-9          | md:max-w-9          | lg:max-w-9          | xl:max-w-9          | 2xl:max-w-9          |
| max-w-10         | sm:max-w-10         | md:max-w-10         | lg:max-w-10         | xl:max-w-10         | 2xl:max-w-10         |
| max-w-11         | sm:max-w-11         | md:max-w-11         | lg:max-w-11         | xl:max-w-11         | 2xl:max-w-11         |
| max-w-12         | sm:max-w-12         | md:max-w-12         | lg:max-w-12         | xl:max-w-12         | 2xl:max-w-12         |
| max-w-14         | sm:max-w-14         | md:max-w-14         | lg:max-w-14         | xl:max-w-14         | 2xl:max-w-14         |
| max-w-16         | sm:max-w-16         | md:max-w-16         | lg:max-w-16         | xl:max-w-16         | 2xl:max-w-16         |
| max-w-20         | sm:max-w-20         | md:max-w-20         | lg:max-w-20         | xl:max-w-20         | 2xl:max-w-20         |
| max-w-24         | sm:max-w-24         | md:max-w-24         | lg:max-w-24         | xl:max-w-24         | 2xl:max-w-24         |
| max-w-28         | sm:max-w-28         | md:max-w-28         | lg:max-w-28         | xl:max-w-28         | 2xl:max-w-28         |
| max-w-32         | sm:max-w-32         | md:max-w-32         | lg:max-w-32         | xl:max-w-32         | 2xl:max-w-32         |
| max-w-36         | sm:max-w-36         | md:max-w-36         | lg:max-w-36         | xl:max-w-36         | 2xl:max-w-36         |
| max-w-40         | sm:max-w-40         | md:max-w-40         | lg:max-w-40         | xl:max-w-40         | 2xl:max-w-40         |
| max-w-44         | sm:max-w-44         | md:max-w-44         | lg:max-w-44         | xl:max-w-44         | 2xl:max-w-44         |
| max-w-48         | sm:max-w-48         | md:max-w-48         | lg:max-w-48         | xl:max-w-48         | 2xl:max-w-48         |
| max-w-52         | sm:max-w-52         | md:max-w-52         | lg:max-w-52         | xl:max-w-52         | 2xl:max-w-52         |
| max-w-56         | sm:max-w-56         | md:max-w-56         | lg:max-w-56         | xl:max-w-56         | 2xl:max-w-56         |
| max-w-60         | sm:max-w-60         | md:max-w-60         | lg:max-w-60         | xl:max-w-60         | 2xl:max-w-60         |
| max-w-64         | sm:max-w-64         | md:max-w-64         | lg:max-w-64         | xl:max-w-64         | 2xl:max-w-64         |
| max-w-72         | sm:max-w-72         | md:max-w-72         | lg:max-w-72         | xl:max-w-72         | 2xl:max-w-72         |
| max-w-80         | sm:max-w-80         | md:max-w-80         | lg:max-w-80         | xl:max-w-80         | 2xl:max-w-80         |
| max-w-96         | sm:max-w-96         | md:max-w-96         | lg:max-w-96         | xl:max-w-96         | 2xl:max-w-96         |
| max-w-xs         | sm:max-w-xs         | md:max-w-xs         | lg:max-w-xs         | xl:max-w-xs         | 2xl:max-w-xs         |
| max-w-md         | sm:max-w-md         | md:max-w-md         | lg:max-w-md         | xl:max-w-md         | 2xl:max-w-md         |
| max-w-sm         | sm:max-w-sm         | md:max-w-sm         | lg:max-w-sm         | xl:max-w-sm         | 2xl:max-w-sm         |
| max-w-lg         | sm:max-w-lg         | md:max-w-lg         | lg:max-w-lg         | xl:max-w-lg         | 2xl:max-w-lg         |
| max-w-xl         | sm:max-w-xl         | md:max-w-xl         | lg:max-w-xl         | xl:max-w-xl         | 2xl:max-w-xl         |
| max-w-2xl        | sm:max-w-2xl        | md:max-w-2xl        | lg:max-w-2xl        | xl:max-w-2xl        | 2xl:max-w-2xl        |
| max-w-3xl        | sm:max-w-3xl        | md:max-w-3xl        | lg:max-w-3xl        | xl:max-w-3xl        | 2xl:max-w-3xl        |
| max-w-4xl        | sm:max-w-4xl        | md:max-w-4xl        | lg:max-w-4xl        | xl:max-w-4xl        | 2xl:max-w-4xl        |
| max-w-5xl        | sm:max-w-5xl        | md:max-w-5xl        | lg:max-w-5xl        | xl:max-w-5xl        | 2xl:max-w-5xl        |
| max-w-6xl        | sm:max-w-6xl        | md:max-w-6xl        | lg:max-w-6xl        | xl:max-w-6xl        | 2xl:max-w-6xl        |
| max-w-7xl        | sm:max-w-7xl        | md:max-w-7xl        | lg:max-w-7xl        | xl:max-w-7xl        | 2xl:max-w-7xl        |
| max-w-fit        | sm:max-w-fit        | md:max-w-fit        | lg:max-w-fit        | xl:max-w-fit        | 2xl:max-w-fit        |
| max-w-full       | sm:max-w-full       | md:max-w-full       | lg:max-w-full       | xl:max-w-full       | 2xl:max-w-full       |
| max-w-max        | sm:max-w-max        | md:max-w-max        | lg:max-w-max        | xl:max-w-max        | 2xl:max-w-max        |
| max-w-min        | sm:max-w-min        | md:max-w-min        | lg:max-w-min        | xl:max-w-min        | 2xl:max-w-min        |
| max-w-none       | sm:max-w-none       | md:max-w-none       | lg:max-w-none       | xl:max-w-none       | 2xl:max-w-none       |
| max-w-prose      | sm:max-w-prose      | md:max-w-prose      | lg:max-w-prose      | xl:max-w-prose      | 2xl:max-w-prose      |
| max-w-screen-lg  | sm:max-w-screen-lg  | md:max-w-screen-lg  | lg:max-w-screen-lg  | xl:max-w-screen-lg  | 2xl:max-w-screen-lg  |
| max-w-screen-md  | sm:max-w-screen-md  | md:max-w-screen-md  | lg:max-w-screen-md  | xl:max-w-screen-md  | 2xl:max-w-screen-md  |
| max-w-screen-sm  | sm:max-w-screen-sm  | md:max-w-screen-sm  | lg:max-w-screen-sm  | xl:max-w-screen-sm  | 2xl:max-w-screen-sm  |
| max-w-screen-md  | sm:max-w-screen-md  | md:max-w-screen-md  | lg:max-w-screen-md  | xl:max-w-screen-md  | 2xl:max-w-screen-md  |
| max-w-screen-xl  | sm:max-w-screen-xl  | md:max-w-screen-xl  | lg:max-w-screen-xl  | xl:max-w-screen-xl  | 2xl:max-w-screen-xl  |
| max-w-screen-2xl | sm:max-w-screen-2xl | md:max-w-screen-2xl | lg:max-w-screen-2xl | xl:max-w-screen-2xl | 2xl:max-w-screen-2xl |
*/