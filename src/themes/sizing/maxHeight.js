import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { lazyFixedSizes , DVH , LVH , SVH , FIT , FULL , MAX , MIN , NONE , SCREEN } from './sizes' ;

/**
 * Valid max-height values.
 *
 * @type {(string|number|string)[]}
 */
export const maxHeights =
[
    ...lazyFixedSizes ,
    DVH , LVH , SVH , FIT , FULL , MAX , MIN , NONE , SCREEN ,
] ;

/**
 * Generates responsive max-height class definitions.
 *
 * @param {string|number|Object} value - Max-height value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/max-height
 *
 * @example
 * ```js
 * getMaxHeight( 'screen' ) ;
 * // → { 'max-h-screen': true }
 *
 * getMaxHeight( { xs: 'dvh' , md: '96' , lg: 'full' } ) ;
 * // → { 'max-h-dvh': true , 'md:max-h-96': true , 'lg:max-h-full': true }
 * ```
 */
const getMaxHeight = getResponsiveDefinition
(
    create( 'max-h-' ) ,
    ( value ) => maxHeights.includes( value )
) ;

export default getMaxHeight ;


/* Tailwindcss safe list
| ------ XS ----- | --------- SM ------ | --------- MD ------ | --------- LG ------ | --------- XL -----— | -------- XXL ------ |
| max-h-px        | sm:max-h-px         | md:max-h-px         | lg:max-h-px         | xl:max-h-px         | 2xl:max-h-px         |
| max-h-0         | sm:max-h-0          | md:max-h-0          | lg:max-h-0          | xl:max-h-0          | 2xl:max-h-0          |
| max-h-0.5       | sm:max-h-0.5        | md:max-h-0.5        | lg:max-h-0.5        | xl:max-h-0.5        | 2xl:max-h-0.5        |
| max-h-1         | sm:max-h-1          | md:max-h-1          | lg:max-h-1          | xl:max-h-1          | 2xl:max-h-1          |
| max-h-1.5       | sm:max-h-1.5        | md:max-h-1.5        | lg:max-h-1.5        | xl:max-h-1.5        | 2xl:max-h-1.5        |
| max-h-2         | sm:max-h-2          | md:max-h-2          | lg:max-h-2          | xl:max-h-2          | 2xl:max-h-2          |
| max-h-2.5       | sm:max-h-2.5        | md:max-h-2.5        | lg:max-h-2.5        | xl:max-h-2.5        | 2xl:max-h-2.5        |
| max-h-3         | sm:max-h-3          | md:max-h-3          | lg:max-h-3          | xl:max-h-3          | 2xl:max-h-3          |
| max-h-3.5       | sm:max-h-3.5        | md:max-h-3.5        | lg:max-h-3.5        | xl:max-h-3.5        | 2xl:max-h-3.5        |
| max-h-4         | sm:max-h-4          | md:max-h-4          | lg:max-h-4          | xl:max-h-4          | 2xl:max-h-4          |
| max-h-5         | sm:max-h-5          | md:max-h-5          | lg:max-h-5          | xl:max-h-5          | 2xl:max-h-5          |
| max-h-6         | sm:max-h-6          | md:max-h-6          | lg:max-h-6          | xl:max-h-6          | 2xl:max-h-6          |
| max-h-7         | sm:max-h-7          | md:max-h-7          | lg:max-h-7          | xl:max-h-7          | 2xl:max-h-7          |
| max-h-8         | sm:max-h-8          | md:max-h-8          | lg:max-h-8          | xl:max-h-8          | 2xl:max-h-8          |
| max-h-9         | sm:max-h-9          | md:max-h-9          | lg:max-h-9          | xl:max-h-9          | 2xl:max-h-9          |
| max-h-10        | sm:max-h-10         | md:max-h-10         | lg:max-h-10         | xl:max-h-10         | 2xl:max-h-10         |
| max-h-11        | sm:max-h-11         | md:max-h-11         | lg:max-h-11         | xl:max-h-11         | 2xl:max-h-11         |
| max-h-12        | sm:max-h-12         | md:max-h-12         | lg:max-h-12         | xl:max-h-12         | 2xl:max-h-12         |
| max-h-14        | sm:max-h-14         | md:max-h-14         | lg:max-h-14         | xl:max-h-14         | 2xl:max-h-14         |
| max-h-16        | sm:max-h-16         | md:max-h-16         | lg:max-h-16         | xl:max-h-16         | 2xl:max-h-16         |
| max-h-20        | sm:max-h-20         | md:max-h-20         | lg:max-h-20         | xl:max-h-20         | 2xl:max-h-20         |
| max-h-24        | sm:max-h-24         | md:max-h-24         | lg:max-h-24         | xl:max-h-24         | 2xl:max-h-24         |
| max-h-28        | sm:max-h-28         | md:max-h-28         | lg:max-h-28         | xl:max-h-28         | 2xl:max-h-28         |
| max-h-32        | sm:max-h-32         | md:max-h-32         | lg:max-h-32         | xl:max-h-32         | 2xl:max-h-32         |
| max-h-36        | sm:max-h-36         | md:max-h-36         | lg:max-h-36         | xl:max-h-36         | 2xl:max-h-36         |
| max-h-40        | sm:max-h-40         | md:max-h-40         | lg:max-h-40         | xl:max-h-40         | 2xl:max-h-40         |
| max-h-44        | sm:max-h-44         | md:max-h-44         | lg:max-h-44         | xl:max-h-44         | 2xl:max-h-44         |
| max-h-48        | sm:max-h-48         | md:max-h-48         | lg:max-h-48         | xl:max-h-48         | 2xl:max-h-48         |
| max-h-52        | sm:max-h-52         | md:max-h-52         | lg:max-h-52         | xl:max-h-52         | 2xl:max-h-52         |
| max-h-56        | sm:max-h-56         | md:max-h-56         | lg:max-h-56         | xl:max-h-56         | 2xl:max-h-56         |
| max-h-60        | sm:max-h-60         | md:max-h-60         | lg:max-h-60         | xl:max-h-60         | 2xl:max-h-60         |
| max-h-64        | sm:max-h-64         | md:max-h-64         | lg:max-h-64         | xl:max-h-64         | 2xl:max-h-64         |
| max-h-72        | sm:max-h-72         | md:max-h-72         | lg:max-h-72         | xl:max-h-72         | 2xl:max-h-72         |
| max-h-80        | sm:max-h-80         | md:max-h-80         | lg:max-h-80         | xl:max-h-80         | 2xl:max-h-80         |
| max-h-96        | sm:max-h-96         | md:max-h-96         | lg:max-h-96         | xl:max-h-96         | 2xl:max-h-96         |
| max-h-dvh       | sm:max-h-dvh        | md:max-h-dvh        | lg:max-h-dvh        | xl:max-h-dvh        | 2xl:max-h-dvh        |
| max-h-lvh       | sm:max-h-lvh        | md:max-h-lvh        | lg:max-h-lvh        | xl:max-h-lvh        | 2xl:max-h-lvh        |
| max-h-svh       | sm:max-h-svh        | md:max-h-svh        | lg:max-h-svh        | xl:max-h-svh        | 2xl:max-h-svh        |
| max-h-fit       | sm:max-h-fit        | md:max-h-fit        | lg:max-h-fit        | xl:max-h-fit        | 2xl:max-h-fit        |
| max-h-full      | sm:max-h-full       | md:max-h-full       | lg:max-h-full       | xl:max-h-full       | 2xl:max-h-full       |
| max-h-max       | sm:max-h-max        | md:max-h-max        | lg:max-h-max        | xl:max-h-max        | 2xl:max-h-max        |
| max-h-min       | sm:max-h-min        | md:max-h-min        | lg:max-h-min        | xl:max-h-min        | 2xl:max-h-min        |
| max-h-none      | sm:max-h-none       | md:max-h-none       | lg:max-h-none       | xl:max-h-none       | 2xl:max-h-none       |
| max-h-screen    | sm:max-h-screen     | md:max-h-screen     | lg:max-h-screen     | xl:max-h-screen     | 2xl:max-h-screen     |
*/