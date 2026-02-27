import getGap , { HORIZONTAL } from './gap' ;

/**
 * Generates responsive horizontal (column) gap class definitions.
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
 * getGapX( 4 ) ;
 * // → { 'gap-x-4': true }
 *
 * getGapX( { xs: 2 , md: 4 } ) ;
 * // → { 'gap-x-2': true , 'md:gap-x-4': true }
 * ```
 */
export const getGapX = ( value , options = {} ) =>
    getGap( value , { ...options , direction: HORIZONTAL } ) ;

export default getGapX ;

/* Tailwindcss safe list
| ----XS---- | -----SM----- | -----MD----- | -----LG----- | -----XL----— | -----XXL----- |
| gap-x-px   | sm:gap-x-px  | md:gap-x-px  | lg:gap-x-px  | xl:gap-x-px  | 2xl:gap-x-px  |
| gap-x-0    | sm:gap-x-0   | md:gap-x-0   | lg:gap-x-0   | xl:gap-x-0   | 2xl:gap-x-0   |
| gap-x-0.5  | sm:gap-x-0.5 | md:gap-x-0.5 | lg:gap-x-0.5 | xl:gap-x-0.5 | 2xl:gap-x-0.5 |
| gap-x-1    | sm:gap-x-1   | md:gap-x-1   | lg:gap-x-1   | xl:gap-x-1   | 2xl:gap-x-1   |
| gap-x-1.5  | sm:gap-x-1.5 | md:gap-x-1.5 | lg:gap-x-1.5 | xl:gap-x-1.5 | 2xl:gap-x-1.5 |
| gap-x-2    | sm:gap-x-2   | md:gap-x-2   | lg:gap-x-2   | xl:gap-x-2   | 2xl:gap-x-2   |
| gap-x-2.5  | sm:gap-x-2.5 | md:gap-x-2.5 | lg:gap-x-2.5 | xl:gap-x-2.5 | 2xl:gap-x-2.5 |
| gap-x-3    | sm:gap-x-3   | md:gap-x-3   | lg:gap-x-3   | xl:gap-x-3   | 2xl:gap-x-3   |
| gap-x-3.5  | sm:gap-x-3.5 | md:gap-x-3.5 | lg:gap-x-3.5 | xl:gap-x-3.5 | 2xl:gap-x-3.5 |
| gap-x-4    | sm:gap-x-4   | md:gap-x-4   | lg:gap-x-4   | xl:gap-x-4   | 2xl:gap-x-4   |
| gap-x-5    | sm:gap-x-5   | md:gap-x-5   | lg:gap-x-5   | xl:gap-x-5   | 2xl:gap-x-5   |
| gap-x-6    | sm:gap-x-6   | md:gap-x-6   | lg:gap-x-6   | xl:gap-x-6   | 2xl:gap-x-6   |
| gap-x-7    | sm:gap-x-7   | md:gap-x-7   | lg:gap-x-7   | xl:gap-x-7   | 2xl:gap-x-7   |
| gap-x-8    | sm:gap-x-8   | md:gap-x-8   | lg:gap-x-8   | xl:gap-x-8   | 2xl:gap-x-8   |
| gap-x-9    | sm:gap-x-9   | md:gap-x-9   | lg:gap-x-9   | xl:gap-x-9   | 2xl:gap-x-9   |
| gap-x-10   | sm:gap-x-10  | md:gap-x-10  | lg:gap-x-10  | xl:gap-x-10  | 2xl:gap-x-10  |
| gap-x-11   | sm:gap-x-11  | md:gap-x-11  | lg:gap-x-11  | xl:gap-x-11  | 2xl:gap-x-11  |
| gap-x-12   | sm:gap-x-12  | md:gap-x-12  | lg:gap-x-12  | xl:gap-x-12  | 2xl:gap-x-12  |
| gap-x-14   | sm:gap-x-14  | md:gap-x-14  | lg:gap-x-14  | xl:gap-x-14  | 2xl:gap-x-14  |
| gap-x-16   | sm:gap-x-16  | md:gap-x-16  | lg:gap-x-16  | xl:gap-x-16  | 2xl:gap-x-16  |
| gap-x-20   | sm:gap-x-20  | md:gap-x-20  | lg:gap-x-20  | xl:gap-x-20  | 2xl:gap-x-20  |
| gap-x-24   | sm:gap-x-24  | md:gap-x-24  | lg:gap-x-24  | xl:gap-x-24  | 2xl:gap-x-24  |
| gap-x-28   | sm:gap-x-28  | md:gap-x-28  | lg:gap-x-28  | xl:gap-x-28  | 2xl:gap-x-28  |
| gap-x-32   | sm:gap-x-32  | md:gap-x-32  | lg:gap-x-32  | xl:gap-x-32  | 2xl:gap-x-32  |
| gap-x-36   | sm:gap-x-36  | md:gap-x-36  | lg:gap-x-36  | xl:gap-x-36  | 2xl:gap-x-36  |
| gap-x-40   | sm:gap-x-40  | md:gap-x-40  | lg:gap-x-40  | xl:gap-x-40  | 2xl:gap-x-40  |
| gap-x-44   | sm:gap-x-44  | md:gap-x-44  | lg:gap-x-44  | xl:gap-x-44  | 2xl:gap-x-44  |
| gap-x-48   | sm:gap-x-48  | md:gap-x-48  | lg:gap-x-48  | xl:gap-x-48  | 2xl:gap-x-48  |
| gap-x-52   | sm:gap-x-52  | md:gap-x-52  | lg:gap-x-52  | xl:gap-x-52  | 2xl:gap-x-52  |
| gap-x-56   | sm:gap-x-56  | md:gap-x-56  | lg:gap-x-56  | xl:gap-x-56  | 2xl:gap-x-56  |
| gap-x-60   | sm:gap-x-60  | md:gap-x-60  | lg:gap-x-60  | xl:gap-x-60  | 2xl:gap-x-60  |
| gap-x-64   | sm:gap-x-64  | md:gap-x-64  | lg:gap-x-64  | xl:gap-x-64  | 2xl:gap-x-64  |
| gap-x-72   | sm:gap-x-72  | md:gap-x-72  | lg:gap-x-72  | xl:gap-x-72  | 2xl:gap-x-72  |
| gap-x-80   | sm:gap-x-80  | md:gap-x-80  | lg:gap-x-80  | xl:gap-x-80  | 2xl:gap-x-80  |
| gap-x-96   | sm:gap-x-96  | md:gap-x-96  | lg:gap-x-96  | xl:gap-x-96  | 2xl:gap-x-96  |
*/