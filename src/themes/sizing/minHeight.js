import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { lazyFixedSizes , DVH , LVH , SVH , FIT , FULL , MAX , MIN , NONE , SCREEN } from './sizes' ;

/**
 * Valid min-height values.
 *
 * @type {(string|number|string)[]}
 */
export const minHeights =
[
    ...lazyFixedSizes ,
    DVH , LVH , SVH , FIT , FULL , MAX , MIN , NONE , SCREEN ,
] ;

/**
 * Generates responsive min-height class definitions.
 *
 * @param {string|number|Object} value - Min-height value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/min-height
 *
 * @example
 * ```js
 * getMinHeight( 'dvh' ) ;
 * // → { 'min-h-dvh': true }
 *
 * getMinHeight( { xs: 'screen' , md: '96' , lg: 'full' } ) ;
 * // → { 'min-h-screen': true , 'md:min-h-96': true , 'lg:min-h-full': true }
 * ```
 */
const getMinHeight = getResponsiveDefinition
(
    create( 'min-h-' ) ,
    ( value ) => minHeights.includes( value )
) ;

export default getMinHeight ;


/* Tailwindcss safe list
| ------ XS ----- | --------- SM ------ | --------- MD ------ | --------- LG ------ | --------- XL -----— | -------- XXL ------ |
| min-h-px        | sm:min-h-px         | md:min-h-px         | lg:min-h-px         | xl:min-h-px         | 2xl:min-h-px         |
| min-h-0         | sm:min-h-0          | md:min-h-0          | lg:min-h-0          | xl:min-h-0          | 2xl:min-h-0          |
| min-h-0.5       | sm:min-h-0.5        | md:min-h-0.5        | lg:min-h-0.5        | xl:min-h-0.5        | 2xl:min-h-0.5        |
| min-h-1         | sm:min-h-1          | md:min-h-1          | lg:min-h-1          | xl:min-h-1          | 2xl:min-h-1          |
| min-h-1.5       | sm:min-h-1.5        | md:min-h-1.5        | lg:min-h-1.5        | xl:min-h-1.5        | 2xl:min-h-1.5        |
| min-h-2         | sm:min-h-2          | md:min-h-2          | lg:min-h-2          | xl:min-h-2          | 2xl:min-h-2          |
| min-h-2.5       | sm:min-h-2.5        | md:min-h-2.5        | lg:min-h-2.5        | xl:min-h-2.5        | 2xl:min-h-2.5        |
| min-h-3         | sm:min-h-3          | md:min-h-3          | lg:min-h-3          | xl:min-h-3          | 2xl:min-h-3          |
| min-h-3.5       | sm:min-h-3.5        | md:min-h-3.5        | lg:min-h-3.5        | xl:min-h-3.5        | 2xl:min-h-3.5        |
| min-h-4         | sm:min-h-4          | md:min-h-4          | lg:min-h-4          | xl:min-h-4          | 2xl:min-h-4          |
| min-h-5         | sm:min-h-5          | md:min-h-5          | lg:min-h-5          | xl:min-h-5          | 2xl:min-h-5          |
| min-h-6         | sm:min-h-6          | md:min-h-6          | lg:min-h-6          | xl:min-h-6          | 2xl:min-h-6          |
| min-h-7         | sm:min-h-7          | md:min-h-7          | lg:min-h-7          | xl:min-h-7          | 2xl:min-h-7          |
| min-h-8         | sm:min-h-8          | md:min-h-8          | lg:min-h-8          | xl:min-h-8          | 2xl:min-h-8          |
| min-h-9         | sm:min-h-9          | md:min-h-9          | lg:min-h-9          | xl:min-h-9          | 2xl:min-h-9          |
| min-h-10        | sm:min-h-10         | md:min-h-10         | lg:min-h-10         | xl:min-h-10         | 2xl:min-h-10         |
| min-h-11        | sm:min-h-11         | md:min-h-11         | lg:min-h-11         | xl:min-h-11         | 2xl:min-h-11         |
| min-h-12        | sm:min-h-12         | md:min-h-12         | lg:min-h-12         | xl:min-h-12         | 2xl:min-h-12         |
| min-h-14        | sm:min-h-14         | md:min-h-14         | lg:min-h-14         | xl:min-h-14         | 2xl:min-h-14         |
| min-h-16        | sm:min-h-16         | md:min-h-16         | lg:min-h-16         | xl:min-h-16         | 2xl:min-h-16         |
| min-h-20        | sm:min-h-20         | md:min-h-20         | lg:min-h-20         | xl:min-h-20         | 2xl:min-h-20         |
| min-h-24        | sm:min-h-24         | md:min-h-24         | lg:min-h-24         | xl:min-h-24         | 2xl:min-h-24         |
| min-h-28        | sm:min-h-28         | md:min-h-28         | lg:min-h-28         | xl:min-h-28         | 2xl:min-h-28         |
| min-h-32        | sm:min-h-32         | md:min-h-32         | lg:min-h-32         | xl:min-h-32         | 2xl:min-h-32         |
| min-h-36        | sm:min-h-36         | md:min-h-36         | lg:min-h-36         | xl:min-h-36         | 2xl:min-h-36         |
| min-h-40        | sm:min-h-40         | md:min-h-40         | lg:min-h-40         | xl:min-h-40         | 2xl:min-h-40         |
| min-h-44        | sm:min-h-44         | md:min-h-44         | lg:min-h-44         | xl:min-h-44         | 2xl:min-h-44         |
| min-h-48        | sm:min-h-48         | md:min-h-48         | lg:min-h-48         | xl:min-h-48         | 2xl:min-h-48         |
| min-h-52        | sm:min-h-52         | md:min-h-52         | lg:min-h-52         | xl:min-h-52         | 2xl:min-h-52         |
| min-h-56        | sm:min-h-56         | md:min-h-56         | lg:min-h-56         | xl:min-h-56         | 2xl:min-h-56         |
| min-h-60        | sm:min-h-60         | md:min-h-60         | lg:min-h-60         | xl:min-h-60         | 2xl:min-h-60         |
| min-h-64        | sm:min-h-64         | md:min-h-64         | lg:min-h-64         | xl:min-h-64         | 2xl:min-h-64         |
| min-h-72        | sm:min-h-72         | md:min-h-72         | lg:min-h-72         | xl:min-h-72         | 2xl:min-h-72         |
| min-h-80        | sm:min-h-80         | md:min-h-80         | lg:min-h-80         | xl:min-h-80         | 2xl:min-h-80         |
| min-h-96        | sm:min-h-96         | md:min-h-96         | lg:min-h-96         | xl:min-h-96         | 2xl:min-h-96         |
| min-h-dvh       | sm:min-h-dvh        | md:min-h-dvh        | lg:min-h-dvh        | xl:min-h-dvh        | 2xl:min-h-dvh        |
| min-h-lvh       | sm:min-h-lvh        | md:min-h-lvh        | lg:min-h-lvh        | xl:min-h-lvh        | 2xl:min-h-lvh        |
| min-h-svh       | sm:min-h-svh        | md:min-h-svh        | lg:min-h-svh        | xl:min-h-svh        | 2xl:min-h-svh        |
| min-h-fit       | sm:min-h-fit        | md:min-h-fit        | lg:min-h-fit        | xl:min-h-fit        | 2xl:min-h-fit        |
| min-h-full      | sm:min-h-full       | md:min-h-full       | lg:min-h-full       | xl:min-h-full       | 2xl:min-h-full       |
| min-h-max       | sm:min-h-max        | md:min-h-max        | lg:min-h-max        | xl:min-h-max        | 2xl:min-h-max        |
| min-h-min       | sm:min-h-min        | md:min-h-min        | lg:min-h-min        | xl:min-h-min        | 2xl:min-h-min        |
| min-h-none      | sm:min-h-none       | md:min-h-none       | lg:min-h-none       | xl:min-h-none       | 2xl:min-h-none       |
| min-h-screen    | sm:min-h-screen     | md:min-h-screen     | lg:min-h-screen     | xl:min-h-screen     | 2xl:min-h-screen     |
*/