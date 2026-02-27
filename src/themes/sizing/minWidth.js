import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

import { lazyFixedSizes , FIT , FULL , MAX , MIN } from './sizes' ;

/**
 * Valid min-width values.
 *
 * @type {(string|number|string)[]}
 */
export const minWidths =
[
    ...lazyFixedSizes ,
    FIT , FULL , MAX , MIN ,
] ;

/**
 * Generates responsive min-width class definitions.
 *
 * @param {string|number|Object} value - Min-width value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/min-width
 *
 * @example
 * ```js
 * getMinWidth( 'full' ) ;
 * // → { 'min-w-full': true }
 *
 * getMinWidth( { xs: '0' , md: 'fit' , lg: 'full' } ) ;
 * // → { 'min-w-0': true , 'md:min-w-fit': true , 'lg:min-w-full': true }
 * ```
 */
const getMinWidth = getResponsiveDefinition
(
    create( 'min-w-' ) ,
    ( value ) => minWidths.includes( value )
) ;

export default getMinWidth ;


/* Tailwindcss safe list
| ------- XS ----- | --------- SM ------ | --------- MD ------ | --------- LG ------ | --------- XL -----— | -------- XXL ------ |
| min-w-px         | sm:min-w-px         | md:min-w-px         | lg:min-w-px         | xl:min-w-px         | 2xl:min-w-px         |
| min-w-0          | sm:min-w-0          | md:min-w-0          | lg:min-w-0          | xl:min-w-0          | 2xl:min-w-0          |
| min-w-0.5        | sm:min-w-0.5        | md:min-w-0.5        | lg:min-w-0.5        | xl:min-w-0.5        | 2xl:min-w-0.5        |
| min-w-1          | sm:min-w-1          | md:min-w-1          | lg:min-w-1          | xl:min-w-1          | 2xl:min-w-1          |
| min-w-1.5        | sm:min-w-1.5        | md:min-w-1.5        | lg:min-w-1.5        | xl:min-w-1.5        | 2xl:min-w-1.5        |
| min-w-2          | sm:min-w-2          | md:min-w-2          | lg:min-w-2          | xl:min-w-2          | 2xl:min-w-2          |
| min-w-2.5        | sm:min-w-2.5        | md:min-w-2.5        | lg:min-w-2.5        | xl:min-w-2.5        | 2xl:min-w-2.5        |
| min-w-3          | sm:min-w-3          | md:min-w-3          | lg:min-w-3          | xl:min-w-3          | 2xl:min-w-3          |
| min-w-3.5        | sm:min-w-3.5        | md:min-w-3.5        | lg:min-w-3.5        | xl:min-w-3.5        | 2xl:min-w-3.5        |
| min-w-4          | sm:min-w-4          | md:min-w-4          | lg:min-w-4          | xl:min-w-4          | 2xl:min-w-4          |
| min-w-5          | sm:min-w-5          | md:min-w-5          | lg:min-w-5          | xl:min-w-5          | 2xl:min-w-5          |
| min-w-6          | sm:min-w-6          | md:min-w-6          | lg:min-w-6          | xl:min-w-6          | 2xl:min-w-6          |
| min-w-7          | sm:min-w-7          | md:min-w-7          | lg:min-w-7          | xl:min-w-7          | 2xl:min-w-7          |
| min-w-8          | sm:min-w-8          | md:min-w-8          | lg:min-w-8          | xl:min-w-8          | 2xl:min-w-8          |
| min-w-9          | sm:min-w-9          | md:min-w-9          | lg:min-w-9          | xl:min-w-9          | 2xl:min-w-9          |
| min-w-10         | sm:min-w-10         | md:min-w-10         | lg:min-w-10         | xl:min-w-10         | 2xl:min-w-10         |
| min-w-11         | sm:min-w-11         | md:min-w-11         | lg:min-w-11         | xl:min-w-11         | 2xl:min-w-11         |
| min-w-12         | sm:min-w-12         | md:min-w-12         | lg:min-w-12         | xl:min-w-12         | 2xl:min-w-12         |
| min-w-14         | sm:min-w-14         | md:min-w-14         | lg:min-w-14         | xl:min-w-14         | 2xl:min-w-14         |
| min-w-16         | sm:min-w-16         | md:min-w-16         | lg:min-w-16         | xl:min-w-16         | 2xl:min-w-16         |
| min-w-20         | sm:min-w-20         | md:min-w-20         | lg:min-w-20         | xl:min-w-20         | 2xl:min-w-20         |
| min-w-24         | sm:min-w-24         | md:min-w-24         | lg:min-w-24         | xl:min-w-24         | 2xl:min-w-24         |
| min-w-28         | sm:min-w-28         | md:min-w-28         | lg:min-w-28         | xl:min-w-28         | 2xl:min-w-28         |
| min-w-32         | sm:min-w-32         | md:min-w-32         | lg:min-w-32         | xl:min-w-32         | 2xl:min-w-32         |
| min-w-36         | sm:min-w-36         | md:min-w-36         | lg:min-w-36         | xl:min-w-36         | 2xl:min-w-36         |
| min-w-40         | sm:min-w-40         | md:min-w-40         | lg:min-w-40         | xl:min-w-40         | 2xl:min-w-40         |
| min-w-44         | sm:min-w-44         | md:min-w-44         | lg:min-w-44         | xl:min-w-44         | 2xl:min-w-44         |
| min-w-48         | sm:min-w-48         | md:min-w-48         | lg:min-w-48         | xl:min-w-48         | 2xl:min-w-48         |
| min-w-52         | sm:min-w-52         | md:min-w-52         | lg:min-w-52         | xl:min-w-52         | 2xl:min-w-52         |
| min-w-56         | sm:min-w-56         | md:min-w-56         | lg:min-w-56         | xl:min-w-56         | 2xl:min-w-56         |
| min-w-60         | sm:min-w-60         | md:min-w-60         | lg:min-w-60         | xl:min-w-60         | 2xl:min-w-60         |
| min-w-64         | sm:min-w-64         | md:min-w-64         | lg:min-w-64         | xl:min-w-64         | 2xl:min-w-64         |
| min-w-72         | sm:min-w-72         | md:min-w-72         | lg:min-w-72         | xl:min-w-72         | 2xl:min-w-72         |
| min-w-80         | sm:min-w-80         | md:min-w-80         | lg:min-w-80         | xl:min-w-80         | 2xl:min-w-80         |
| min-w-96         | sm:min-w-96         | md:min-w-96         | lg:min-w-96         | xl:min-w-96         | 2xl:min-w-96         |
| min-w-fit        | sm:min-w-fit        | md:min-w-fit        | lg:min-w-fit        | xl:min-w-fit        | 2xl:min-w-fit        |
| min-w-full       | sm:min-w-full       | md:min-w-full       | lg:min-w-full       | xl:min-w-full       | 2xl:min-w-full       |
| min-w-max        | sm:min-w-max        | md:min-w-max        | lg:min-w-max        | xl:min-w-max        | 2xl:min-w-max        |
| min-w-min        | sm:min-w-min        | md:min-w-min        | lg:min-w-min        | xl:min-w-min        | 2xl:min-w-min        |
*/