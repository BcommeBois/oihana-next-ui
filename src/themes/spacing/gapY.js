import getGap , { VERTICAL } from './gap' ;

/**
 * Generates responsive vertical (row) gap class definitions.
 *
 * @param {string | number | import('../sizing/sizes').ResponsiveSize} value - Gap value or responsive object.
 * @param {Object} [options]
 * @param {boolean} [options.important=false] - Add important modifier.
 *
 * @returns {Object} Class definition object.
 *
 * @see https://tailwindcss.com/docs/gap
 *
 * @example
 * ```js
 * getGapY( 4 ) ;
 * // → { 'gap-y-4': true }
 *
 * getGapY( { xs: 2 , md: 4 } ) ;
 * // → { 'gap-y-2': true , 'md:gap-y-4': true }
 * ```
 */
export const getGapY = ( value , options = {} ) =>
    getGap( value , { ...options , direction: VERTICAL } ) ;

export default getGapY ;

/* Tailwindcss safe list
| ----XS---- | -----SM----- | -----MD----- | -----LG----- | -----XL----— | -----XXL----- |
| gap-y-px   | sm:gap-y-px  | md:gap-y-px  | lg:gap-y-px  | xl:gap-y-px  | 2xl:gap-y-px  |
| gap-y-0    | sm:gap-y-0   | md:gap-y-0   | lg:gap-y-0   | xl:gap-y-0   | 2xl:gap-y-0   |
| gap-y-0.5  | sm:gap-y-0.5 | md:gap-y-0.5 | lg:gap-y-0.5 | xl:gap-y-0.5 | 2xl:gap-y-0.5 |
| gap-y-1    | sm:gap-y-1   | md:gap-y-1   | lg:gap-y-1   | xl:gap-y-1   | 2xl:gap-y-1   |
| gap-y-1.5  | sm:gap-y-1.5 | md:gap-y-1.5 | lg:gap-y-1.5 | xl:gap-y-1.5 | 2xl:gap-y-1.5 |
| gap-y-2    | sm:gap-y-2   | md:gap-y-2   | lg:gap-y-2   | xl:gap-y-2   | 2xl:gap-y-2   |
| gap-y-2.5  | sm:gap-y-2.5 | md:gap-y-2.5 | lg:gap-y-2.5 | xl:gap-y-2.5 | 2xl:gap-y-2.5 |
| gap-y-3    | sm:gap-y-3   | md:gap-y-3   | lg:gap-y-3   | xl:gap-y-3   | 2xl:gap-y-3   |
| gap-y-3.5  | sm:gap-y-3.5 | md:gap-y-3.5 | lg:gap-y-3.5 | xl:gap-y-3.5 | 2xl:gap-y-3.5 |
| gap-y-4    | sm:gap-y-4   | md:gap-y-4   | lg:gap-y-4   | xl:gap-y-4   | 2xl:gap-y-4   |
| gap-y-5    | sm:gap-y-5   | md:gap-y-5   | lg:gap-y-5   | xl:gap-y-5   | 2xl:gap-y-5   |
| gap-y-6    | sm:gap-y-6   | md:gap-y-6   | lg:gap-y-6   | xl:gap-y-6   | 2xl:gap-y-6   |
| gap-y-7    | sm:gap-y-7   | md:gap-y-7   | lg:gap-y-7   | xl:gap-y-7   | 2xl:gap-y-7   |
| gap-y-8    | sm:gap-y-8   | md:gap-y-8   | lg:gap-y-8   | xl:gap-y-8   | 2xl:gap-y-8   |
| gap-y-9    | sm:gap-y-9   | md:gap-y-9   | lg:gap-y-9   | xl:gap-y-9   | 2xl:gap-y-9   |
| gap-y-10   | sm:gap-y-10  | md:gap-y-10  | lg:gap-y-10  | xl:gap-y-10  | 2xl:gap-y-10  |
| gap-y-11   | sm:gap-y-11  | md:gap-y-11  | lg:gap-y-11  | xl:gap-y-11  | 2xl:gap-y-11  |
| gap-y-12   | sm:gap-y-12  | md:gap-y-12  | lg:gap-y-12  | xl:gap-y-12  | 2xl:gap-y-12  |
| gap-y-14   | sm:gap-y-14  | md:gap-y-14  | lg:gap-y-14  | xl:gap-y-14  | 2xl:gap-y-14  |
| gap-y-16   | sm:gap-y-16  | md:gap-y-16  | lg:gap-y-16  | xl:gap-y-16  | 2xl:gap-y-16  |
| gap-y-20   | sm:gap-y-20  | md:gap-y-20  | lg:gap-y-20  | xl:gap-y-20  | 2xl:gap-y-20  |
| gap-y-24   | sm:gap-y-24  | md:gap-y-24  | lg:gap-y-24  | xl:gap-y-24  | 2xl:gap-y-24  |
| gap-y-28   | sm:gap-y-28  | md:gap-y-28  | lg:gap-y-28  | xl:gap-y-28  | 2xl:gap-y-28  |
| gap-y-32   | sm:gap-y-32  | md:gap-y-32  | lg:gap-y-32  | xl:gap-y-32  | 2xl:gap-y-32  |
| gap-y-36   | sm:gap-y-36  | md:gap-y-36  | lg:gap-y-36  | xl:gap-y-36  | 2xl:gap-y-36  |
| gap-y-40   | sm:gap-y-40  | md:gap-y-40  | lg:gap-y-40  | xl:gap-y-40  | 2xl:gap-y-40  |
| gap-y-44   | sm:gap-y-44  | md:gap-y-44  | lg:gap-y-44  | xl:gap-y-44  | 2xl:gap-y-44  |
| gap-y-48   | sm:gap-y-48  | md:gap-y-48  | lg:gap-y-48  | xl:gap-y-48  | 2xl:gap-y-48  |
| gap-y-52   | sm:gap-y-52  | md:gap-y-52  | lg:gap-y-52  | xl:gap-y-52  | 2xl:gap-y-52  |
| gap-y-56   | sm:gap-y-56  | md:gap-y-56  | lg:gap-y-56  | xl:gap-y-56  | 2xl:gap-y-56  |
| gap-y-60   | sm:gap-y-60  | md:gap-y-60  | lg:gap-y-60  | xl:gap-y-60  | 2xl:gap-y-60  |
| gap-y-64   | sm:gap-y-64  | md:gap-y-64  | lg:gap-y-64  | xl:gap-y-64  | 2xl:gap-y-64  |
| gap-y-72   | sm:gap-y-72  | md:gap-y-72  | lg:gap-y-72  | xl:gap-y-72  | 2xl:gap-y-72  |
| gap-y-80   | sm:gap-y-80  | md:gap-y-80  | lg:gap-y-80  | xl:gap-y-80  | 2xl:gap-y-80  |
| gap-y-96   | sm:gap-y-96  | md:gap-y-96  | lg:gap-y-96  | xl:gap-y-96  | 2xl:gap-y-96  |
*/