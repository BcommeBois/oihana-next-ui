import getBorderSpacing , { VERTICAL } from './borderSpacing' ;

/**
 * Generates responsive vertical border-spacing class definitions.
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
 * getBorderSpacingY( 4 ) ;
 * // → { 'border-spacing-y-4': true }
 *
 * getBorderSpacingY( { xs: 2 , md: 4 } ) ;
 * // → { 'border-spacing-y-2': true , 'md:border-spacing-y-4': true }
 * ```
 */
export const getBorderSpacingY = ( value , options = {} ) =>
    getBorderSpacing( value , { ...options , direction: VERTICAL } ) ;

export default getBorderSpacingY ;

/* Tailwindcss safe list
|   --------XS--------  |   ---------SM---------   |   ---------MD---------   |   ---------LG---------   |   ---------XL--------—   |   ---------XXL---------   |
| border-spacing-y-px   | sm:border-spacing-y-px   | md:border-spacing-y-px   | lg:border-spacing-y-px   | xl:border-spacing-y-px   | 2xl:border-spacing-y-px   |
| border-spacing-y-0    | sm:border-spacing-y-0    | md:border-spacing-y-0    | lg:border-spacing-y-0    | xl:border-spacing-y-0    | 2xl:border-spacing-y-0    |
| border-spacing-y-0.5  | sm:border-spacing-y-0.5  | md:border-spacing-y-0.5  | lg:border-spacing-y-0.5  | xl:border-spacing-y-0.5  | 2xl:border-spacing-y-0.5  |
| border-spacing-y-1    | sm:border-spacing-y-1    | md:border-spacing-y-1    | lg:border-spacing-y-1    | xl:border-spacing-y-1    | 2xl:border-spacing-y-1    |
| border-spacing-y-1.5  | sm:border-spacing-y-1.5  | md:border-spacing-y-1.5  | lg:border-spacing-y-1.5  | xl:border-spacing-y-1.5  | 2xl:border-spacing-y-1.5  |
| border-spacing-y-2    | sm:border-spacing-y-2    | md:border-spacing-y-2    | lg:border-spacing-y-2    | xl:border-spacing-y-2    | 2xl:border-spacing-y-2    |
| border-spacing-y-2.5  | sm:border-spacing-y-2.5  | md:border-spacing-y-2.5  | lg:border-spacing-y-2.5  | xl:border-spacing-y-2.5  | 2xl:border-spacing-y-2.5  |
| border-spacing-y-3    | sm:border-spacing-y-3    | md:border-spacing-y-3    | lg:border-spacing-y-3    | xl:border-spacing-y-3    | 2xl:border-spacing-y-3    |
| border-spacing-y-3.5  | sm:border-spacing-y-3.5  | md:border-spacing-y-3.5  | lg:border-spacing-y-3.5  | xl:border-spacing-y-3.5  | 2xl:border-spacing-y-3.5  |
| border-spacing-y-4    | sm:border-spacing-y-4    | md:border-spacing-y-4    | lg:border-spacing-y-4    | xl:border-spacing-y-4    | 2xl:border-spacing-y-4    |
| border-spacing-y-5    | sm:border-spacing-y-5    | md:border-spacing-y-5    | lg:border-spacing-y-5    | xl:border-spacing-y-5    | 2xl:border-spacing-y-5    |
| border-spacing-y-6    | sm:border-spacing-y-6    | md:border-spacing-y-6    | lg:border-spacing-y-6    | xl:border-spacing-y-6    | 2xl:border-spacing-y-6    |
| border-spacing-y-7    | sm:border-spacing-y-7    | md:border-spacing-y-7    | lg:border-spacing-y-7    | xl:border-spacing-y-7    | 2xl:border-spacing-y-7    |
| border-spacing-y-8    | sm:border-spacing-y-8    | md:border-spacing-y-8    | lg:border-spacing-y-8    | xl:border-spacing-y-8    | 2xl:border-spacing-y-8    |
| border-spacing-y-9    | sm:border-spacing-y-9    | md:border-spacing-y-9    | lg:border-spacing-y-9    | xl:border-spacing-y-9    | 2xl:border-spacing-y-9    |
| border-spacing-y-10   | sm:border-spacing-y-10   | md:border-spacing-y-10   | lg:border-spacing-y-10   | xl:border-spacing-y-10   | 2xl:border-spacing-y-10   |
| border-spacing-y-11   | sm:border-spacing-y-11   | md:border-spacing-y-11   | lg:border-spacing-y-11   | xl:border-spacing-y-11   | 2xl:border-spacing-y-11   |
| border-spacing-y-12   | sm:border-spacing-y-12   | md:border-spacing-y-12   | lg:border-spacing-y-12   | xl:border-spacing-y-12   | 2xl:border-spacing-y-12   |
| border-spacing-y-14   | sm:border-spacing-y-14   | md:border-spacing-y-14   | lg:border-spacing-y-14   | xl:border-spacing-y-14   | 2xl:border-spacing-y-14   |
| border-spacing-y-16   | sm:border-spacing-y-16   | md:border-spacing-y-16   | lg:border-spacing-y-16   | xl:border-spacing-y-16   | 2xl:border-spacing-y-16   |
| border-spacing-y-20   | sm:border-spacing-y-20   | md:border-spacing-y-20   | lg:border-spacing-y-20   | xl:border-spacing-y-20   | 2xl:border-spacing-y-20   |
| border-spacing-y-24   | sm:border-spacing-y-24   | md:border-spacing-y-24   | lg:border-spacing-y-24   | xl:border-spacing-y-24   | 2xl:border-spacing-y-24   |
| border-spacing-y-28   | sm:border-spacing-y-28   | md:border-spacing-y-28   | lg:border-spacing-y-28   | xl:border-spacing-y-28   | 2xl:border-spacing-y-28   |
| border-spacing-y-32   | sm:border-spacing-y-32   | md:border-spacing-y-32   | lg:border-spacing-y-32   | xl:border-spacing-y-32   | 2xl:border-spacing-y-32   |
| border-spacing-y-36   | sm:border-spacing-y-36   | md:border-spacing-y-36   | lg:border-spacing-y-36   | xl:border-spacing-y-36   | 2xl:border-spacing-y-36   |
| border-spacing-y-40   | sm:border-spacing-y-40   | md:border-spacing-y-40   | lg:border-spacing-y-40   | xl:border-spacing-y-40   | 2xl:border-spacing-y-40   |
| border-spacing-y-44   | sm:border-spacing-y-44   | md:border-spacing-y-44   | lg:border-spacing-y-44   | xl:border-spacing-y-44   | 2xl:border-spacing-y-44   |
| border-spacing-y-48   | sm:border-spacing-y-48   | md:border-spacing-y-48   | lg:border-spacing-y-48   | xl:border-spacing-y-48   | 2xl:border-spacing-y-48   |
| border-spacing-y-52   | sm:border-spacing-y-52   | md:border-spacing-y-52   | lg:border-spacing-y-52   | xl:border-spacing-y-52   | 2xl:border-spacing-y-52   |
| border-spacing-y-56   | sm:border-spacing-y-56   | md:border-spacing-y-56   | lg:border-spacing-y-56   | xl:border-spacing-y-56   | 2xl:border-spacing-y-56   |
| border-spacing-y-60   | sm:border-spacing-y-60   | md:border-spacing-y-60   | lg:border-spacing-y-60   | xl:border-spacing-y-60   | 2xl:border-spacing-y-60   |
| border-spacing-y-64   | sm:border-spacing-y-64   | md:border-spacing-y-64   | lg:border-spacing-y-64   | xl:border-spacing-y-64   | 2xl:border-spacing-y-64   |
| border-spacing-y-72   | sm:border-spacing-y-72   | md:border-spacing-y-72   | lg:border-spacing-y-72   | xl:border-spacing-y-72   | 2xl:border-spacing-y-72   |
| border-spacing-y-80   | sm:border-spacing-y-80   | md:border-spacing-y-80   | lg:border-spacing-y-80   | xl:border-spacing-y-80   | 2xl:border-spacing-y-80   |
| border-spacing-y-96   | sm:border-spacing-y-96   | md:border-spacing-y-96   | lg:border-spacing-y-96   | xl:border-spacing-y-96   | 2xl:border-spacing-y-96   |
*/