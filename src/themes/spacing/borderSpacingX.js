import getBorderSpacing , { HORIZONTAL } from './borderSpacing' ;

/**
 * Generates responsive horizontal border-spacing class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Spacing value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/border-spacing
 *
 * @example
 * ```js
 * getBorderSpacingX( 4 ) ;
 * // → { 'border-spacing-x-4': true }
 *
 * getBorderSpacingX( { xs: 2 , md: 4 } ) ;
 * // → { 'border-spacing-x-2': true , 'md:border-spacing-x-4': true }
 * ```
 */
const getBorderSpacingX = ( value , options = {}  ) =>
    getBorderSpacing( value , { ...options , direction: HORIZONTAL } ) ;

export default getBorderSpacingX ;

/* Tailwindcss safe list
|   --------XS--------  |   ---------SM---------   |   ---------MD---------   |   ---------LG---------   |   ---------XL--------—   |   ---------XXL---------   |
| border-spacing-x-px   | sm:border-spacing-x-px   | md:border-spacing-x-px   | lg:border-spacing-x-px   | xl:border-spacing-x-px   | 2xl:border-spacing-x-px   |
| border-spacing-x-0    | sm:border-spacing-x-0    | md:border-spacing-x-0    | lg:border-spacing-x-0    | xl:border-spacing-x-0    | 2xl:border-spacing-x-0    |
| border-spacing-x-0.5  | sm:border-spacing-x-0.5  | md:border-spacing-x-0.5  | lg:border-spacing-x-0.5  | xl:border-spacing-x-0.5  | 2xl:border-spacing-x-0.5  |
| border-spacing-x-1    | sm:border-spacing-x-1    | md:border-spacing-x-1    | lg:border-spacing-x-1    | xl:border-spacing-x-1    | 2xl:border-spacing-x-1    |
| border-spacing-x-1.5  | sm:border-spacing-x-1.5  | md:border-spacing-x-1.5  | lg:border-spacing-x-1.5  | xl:border-spacing-x-1.5  | 2xl:border-spacing-x-1.5  |
| border-spacing-x-2    | sm:border-spacing-x-2    | md:border-spacing-x-2    | lg:border-spacing-x-2    | xl:border-spacing-x-2    | 2xl:border-spacing-x-2    |
| border-spacing-x-2.5  | sm:border-spacing-x-2.5  | md:border-spacing-x-2.5  | lg:border-spacing-x-2.5  | xl:border-spacing-x-2.5  | 2xl:border-spacing-x-2.5  |
| border-spacing-x-3    | sm:border-spacing-x-3    | md:border-spacing-x-3    | lg:border-spacing-x-3    | xl:border-spacing-x-3    | 2xl:border-spacing-x-3    |
| border-spacing-x-3.5  | sm:border-spacing-x-3.5  | md:border-spacing-x-3.5  | lg:border-spacing-x-3.5  | xl:border-spacing-x-3.5  | 2xl:border-spacing-x-3.5  |
| border-spacing-x-4    | sm:border-spacing-x-4    | md:border-spacing-x-4    | lg:border-spacing-x-4    | xl:border-spacing-x-4    | 2xl:border-spacing-x-4    |
| border-spacing-x-5    | sm:border-spacing-x-5    | md:border-spacing-x-5    | lg:border-spacing-x-5    | xl:border-spacing-x-5    | 2xl:border-spacing-x-5    |
| border-spacing-x-6    | sm:border-spacing-x-6    | md:border-spacing-x-6    | lg:border-spacing-x-6    | xl:border-spacing-x-6    | 2xl:border-spacing-x-6    |
| border-spacing-x-7    | sm:border-spacing-x-7    | md:border-spacing-x-7    | lg:border-spacing-x-7    | xl:border-spacing-x-7    | 2xl:border-spacing-x-7    |
| border-spacing-x-8    | sm:border-spacing-x-8    | md:border-spacing-x-8    | lg:border-spacing-x-8    | xl:border-spacing-x-8    | 2xl:border-spacing-x-8    |
| border-spacing-x-9    | sm:border-spacing-x-9    | md:border-spacing-x-9    | lg:border-spacing-x-9    | xl:border-spacing-x-9    | 2xl:border-spacing-x-9    |
| border-spacing-x-10   | sm:border-spacing-x-10   | md:border-spacing-x-10   | lg:border-spacing-x-10   | xl:border-spacing-x-10   | 2xl:border-spacing-x-10   |
| border-spacing-x-11   | sm:border-spacing-x-11   | md:border-spacing-x-11   | lg:border-spacing-x-11   | xl:border-spacing-x-11   | 2xl:border-spacing-x-11   |
| border-spacing-x-12   | sm:border-spacing-x-12   | md:border-spacing-x-12   | lg:border-spacing-x-12   | xl:border-spacing-x-12   | 2xl:border-spacing-x-12   |
| border-spacing-x-14   | sm:border-spacing-x-14   | md:border-spacing-x-14   | lg:border-spacing-x-14   | xl:border-spacing-x-14   | 2xl:border-spacing-x-14   |
| border-spacing-x-16   | sm:border-spacing-x-16   | md:border-spacing-x-16   | lg:border-spacing-x-16   | xl:border-spacing-x-16   | 2xl:border-spacing-x-16   |
| border-spacing-x-20   | sm:border-spacing-x-20   | md:border-spacing-x-20   | lg:border-spacing-x-20   | xl:border-spacing-x-20   | 2xl:border-spacing-x-20   |
| border-spacing-x-24   | sm:border-spacing-x-24   | md:border-spacing-x-24   | lg:border-spacing-x-24   | xl:border-spacing-x-24   | 2xl:border-spacing-x-24   |
| border-spacing-x-28   | sm:border-spacing-x-28   | md:border-spacing-x-28   | lg:border-spacing-x-28   | xl:border-spacing-x-28   | 2xl:border-spacing-x-28   |
| border-spacing-x-32   | sm:border-spacing-x-32   | md:border-spacing-x-32   | lg:border-spacing-x-32   | xl:border-spacing-x-32   | 2xl:border-spacing-x-32   |
| border-spacing-x-36   | sm:border-spacing-x-36   | md:border-spacing-x-36   | lg:border-spacing-x-36   | xl:border-spacing-x-36   | 2xl:border-spacing-x-36   |
| border-spacing-x-40   | sm:border-spacing-x-40   | md:border-spacing-x-40   | lg:border-spacing-x-40   | xl:border-spacing-x-40   | 2xl:border-spacing-x-40   |
| border-spacing-x-44   | sm:border-spacing-x-44   | md:border-spacing-x-44   | lg:border-spacing-x-44   | xl:border-spacing-x-44   | 2xl:border-spacing-x-44   |
| border-spacing-x-48   | sm:border-spacing-x-48   | md:border-spacing-x-48   | lg:border-spacing-x-48   | xl:border-spacing-x-48   | 2xl:border-spacing-x-48   |
| border-spacing-x-52   | sm:border-spacing-x-52   | md:border-spacing-x-52   | lg:border-spacing-x-52   | xl:border-spacing-x-52   | 2xl:border-spacing-x-52   |
| border-spacing-x-56   | sm:border-spacing-x-56   | md:border-spacing-x-56   | lg:border-spacing-x-56   | xl:border-spacing-x-56   | 2xl:border-spacing-x-56   |
| border-spacing-x-60   | sm:border-spacing-x-60   | md:border-spacing-x-60   | lg:border-spacing-x-60   | xl:border-spacing-x-60   | 2xl:border-spacing-x-60   |
| border-spacing-x-64   | sm:border-spacing-x-64   | md:border-spacing-x-64   | lg:border-spacing-x-64   | xl:border-spacing-x-64   | 2xl:border-spacing-x-64   |
| border-spacing-x-72   | sm:border-spacing-x-72   | md:border-spacing-x-72   | lg:border-spacing-x-72   | xl:border-spacing-x-72   | 2xl:border-spacing-x-72   |
| border-spacing-x-80   | sm:border-spacing-x-80   | md:border-spacing-x-80   | lg:border-spacing-x-80   | xl:border-spacing-x-80   | 2xl:border-spacing-x-80   |
| border-spacing-x-96   | sm:border-spacing-x-96   | md:border-spacing-x-96   | lg:border-spacing-x-96   | xl:border-spacing-x-96   | 2xl:border-spacing-x-96   |
*/