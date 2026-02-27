/**
 * Size utilities for Tailwind CSS.
 *
 * @module themes/sizing/sizes
 */

import getResponsiveDefinition , { create } from '../helpers/getResponsiveDefinition' ;

// Semantic sizes (component-level)
export const BASE  = 'base' ;
export const BLOCK = 'block' ;
export const LG    = 'lg' ;
export const MD    = 'md' ;
export const SM    = 'sm' ;
export const XS    = 'xs' ;
export const WIDE  = 'wide' ;

// Extended sizes
export const XL         = 'xl' ;
export const XXL        = '2xl' ;
export const XXXL       = '3xl' ;
export const XXXXL      = '4xl' ;
export const XXXXXL     = '5xl' ;
export const XXXXXXL    = '6xl' ;
export const XXXXXXXL   = '7xl' ;
export const XXXXXXXXL  = '8xl' ;
export const XXXXXXXXXL = '9xl' ;

// Special values
export const AUTO = 'auto' ;
export const FIT  = 'fit' ;
export const FULL = 'full' ;
export const MAX  = 'max' ;
export const MIN  = 'min' ;

// Viewport units
export const DVH    = 'dvh' ;
export const LVH    = 'lvh' ;
export const SVH    = 'svh' ;
export const SCREEN = 'screen' ;

// Screen breakpoint sizes
export const SCREEN_SM  = 'screen-sm' ;
export const SCREEN_MD  = 'screen-md' ;
export const SCREEN_LG  = 'screen-lg' ;
export const SCREEN_XL  = 'screen-xl' ;
export const SCREEN_XXL = 'screen-2xl' ;

// Other
export const NONE  = 'none' ;
export const PROSE = 'prose' ;

/**
 * Semantic sizes for components.
 * @type {string[]}
 */
export const sizes = [ BASE , BLOCK , LG , MD , SM , XS , WIDE ] ;

/**
 * Extended sizes (XL to 9XL).
 * @type {string[]}
 */
export const extendedSizes =
[
    XL , XXL , XXXL , XXXXL , XXXXXL ,
    XXXXXXL , XXXXXXXL , XXXXXXXXL , XXXXXXXXXL ,
] ;

/**
 * Fixed spacing values (Tailwind spacing scale).
 * @type {string[]}
 */
export const fixedSizes =
[
    'px' ,
    '0' , '0.5' , '1' , '1.5' , '2' , '2.5' , '3' , '3.5' , '4' ,
    '5' , '6' , '7' , '8' , '9' , '10' , '11' , '12' , '14' , '16' ,
    '20' , '24' , '28' , '32' , '36' , '40' , '44' , '48' ,
    '52' , '56' , '60' , '64' , '72' , '80' , '96' ,
] ;

/**
 * Percentage/fraction sizes.
 * @type {string[]}
 */
export const percentageSizes =
[
    FULL ,
    '1/2' ,
    '1/3' , '2/3' ,
    '1/4' , '2/4' , '3/4' ,
    '1/5' , '2/5' , '3/5' , '4/5' ,
    '1/6' , '2/6' , '3/6' , '4/6' , '5/6' ,
    '1/12' , '2/12' , '3/12' , '4/12' , '5/12' , '6/12' ,
    '7/12' , '8/12' , '9/12' , '10/12' , '11/12' ,
] ;

/**
 * Viewport sizes.
 * @type {string[]}
 */
export const viewportSizes =
[
    DVH ,
    LVH ,
    SVH ,
    SCREEN ,
    SCREEN_SM ,
    SCREEN_MD ,
    SCREEN_LG ,
    SCREEN_XL ,
    SCREEN_XXL ,
] ;

/**
 * Special size values.
 * @type {string[]}
 */
export const specialSizes = [ AUTO , FIT , MAX , MIN ] ;

/**
 * Fixed sizes with numeric equivalents (for lazy validation).
 * @type {(string | number)[]}
 */
export const lazyFixedSizes =
[
    ...fixedSizes ,
    0 , 0.5 , 1 , 1.5 , 2 , 2.5 , 3 , 3.5 , 4 ,
    5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 14 , 16 ,
    20 , 24 , 28 , 32 , 36 , 40 , 44 , 48 ,
    52 , 56 , 60 , 64 , 72 , 80 , 96 ,
] ;

/**
 * @typedef {'px' | '0' | '0.5' | '1' | '1.5' | '2' | '2.5' | '3' | '3.5' | '4' |
 *   '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '16' |
 *   '20' | '24' | '28' | '32' | '36' | '40' | '44' | '48' |
 *   '52' | '56' | '60' | '64' | '72' | '80' | '96'} StringSpacing
 *
 * @typedef {0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 |
 *   5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 |
 *   20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 |
 *   52 | 56 | 60 | 64 | 72 | 80 | 96} NumberSpacing
 *
 * @typedef {StringSpacing | NumberSpacing} FixedSize
 *
 * @typedef {'full' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' |
 *   '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '2/6' | '3/6' | '4/6' | '5/6' |
 *   '1/12' | '2/12' | '3/12' | '4/12' | '5/12' | '6/12' |
 *   '7/12' | '8/12' | '9/12' | '10/12' | '11/12'} PercentageSize
 *
 * @typedef {'auto' | 'fit' | 'max' | 'min' | 'none'} SpecialSize
 *
 * @typedef {'dvh' | 'lvh' | 'svh' | 'screen' |
 *   'screen-sm' | 'screen-md' | 'screen-lg' | 'screen-xl' | 'screen-2xl'} ViewportSize
 *
 * @typedef {'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'} ExtendedSize
 *
 * @typedef {FixedSize | PercentageSize | SpecialSize | ViewportSize | ExtendedSize} SimpleSize
 *
 * @typedef {Object} ResponsiveSize
 * @property {SimpleSize} [xs]
 * @property {SimpleSize} [sm]
 * @property {SimpleSize} [md]
 * @property {SimpleSize} [lg]
 * @property {SimpleSize} [xl]
 * @property {SimpleSize} [xxl]
 *
 * @typedef {SimpleSize | ResponsiveSize} Size
 */

/**
 * All valid size values.
 * @type {(string | number)[]}
 */
export const allSizes =
[
    ...extendedSizes ,
    ...lazyFixedSizes ,
    ...percentageSizes ,
    ...viewportSizes ,
    ...specialSizes ,
    NONE ,
    PROSE ,
] ;

/**
 * Creates a responsive size class definition.
 *
 * @param {Size | ResponsiveSize} value - Size value or responsive object.
 * @returns {Object} Class definition object.
 *
 * @example
 * ```js
 * getSize( '4' ) ;
 * // → { 'size-4': true }
 *
 * getSize( { xs: 'full' , md: '1/2' , lg: '1/3' } ) ;
 * // → { 'size-full': true , 'md:size-1/2': true , 'lg:size-1/3': true }
 * ```
 */
export const getSize = getResponsiveDefinition(
    create( 'size-' ) ,
    ( value ) => allSizes.includes( value )
) ;

export default getSize ;

/* Tailwindcss safe list
| ---- XS --- | ----- SM ---- | ----- MD ---- | ----- LG ---- | ----- XL ---— | ----- XXL ---- |
| size-auto   | sm:size-auto  | md:size-auto  | lg:size-auto  | xl:size-auto  | 2xl:size-auto  |
| size-fit    | sm:size-fit   | md:size-fit   | lg:size-fit   | xl:size-fit   | 2xl:size-fit   |
| size-full   | sm:size-full  | md:size-full  | lg:size-full  | xl:size-full  | 2xl:size-full  |
| size-max    | sm:size-max   | md:size-max   | lg:size-max   | xl:size-max   | 2xl:size-max   |
| size-min    | sm:size-min   | md:size-min   | lg:size-min   | xl:size-min   | 2xl:size-min   |
| size-px     | sm:size-px    | md:size-px    | lg:size-px    | xl:size-px    | 2xl:size-px    |
| size-0      | sm:size-0     | md:size-0     | lg:size-0     | xl:size-0     | 2xl:size-0     |
| size-0.5    | sm:size-0.5   | md:size-0.5   | lg:size-0.5   | xl:size-0.5   | 2xl:size-0.5   |
| size-1      | sm:size-1     | md:size-1     | lg:size-1     | xl:size-1     | 2xl:size-1     |
| size-1.5    | sm:size-1.5   | md:size-1.5   | lg:size-1.5   | xl:size-1.5   | 2xl:size-1.5   |
| size-2      | sm:size-2     | md:size-2     | lg:size-2     | xl:size-2     | 2xl:size-2     |
| size-2.5    | sm:size-2.5   | md:size-2.5   | lg:size-2.5   | xl:size-2.5   | 2xl:size-2.5   |
| size-3      | sm:size-3     | md:size-3     | lg:size-3     | xl:size-3     | 2xl:size-3     |
| size-3.5    | sm:size-3.5   | md:size-3.5   | lg:size-3.5   | xl:size-3.5   | 2xl:size-3.5   |
| size-4      | sm:size-4     | md:size-4     | lg:size-4     | xl:size-4     | 2xl:size-4     |
| size-5      | sm:size-5     | md:size-5     | lg:size-5     | xl:size-5     | 2xl:size-5     |
| size-6      | sm:size-6     | md:size-6     | lg:size-6     | xl:size-6     | 2xl:size-6     |
| size-7      | sm:size-7     | md:size-7     | lg:size-7     | xl:size-7     | 2xl:size-7     |
| size-8      | sm:size-8     | md:size-8     | lg:size-8     | xl:size-8     | 2xl:size-8     |
| size-9      | sm:size-9     | md:size-9     | lg:size-9     | xl:size-9     | 2xl:size-9     |
| size-10     | sm:size-10    | md:size-10    | lg:size-10    | xl:size-10    | 2xl:size-10    |
| size-11     | sm:size-11    | md:size-11    | lg:size-11    | xl:size-11    | 2xl:size-11    |
| size-12     | sm:size-12    | md:size-12    | lg:size-12    | xl:size-12    | 2xl:size-12    |
| size-14     | sm:size-14    | md:size-14    | lg:size-14    | xl:size-14    | 2xl:size-14    |
| size-16     | sm:size-16    | md:size-16    | lg:size-16    | xl:size-16    | 2xl:size-16    |
| size-20     | sm:size-20    | md:size-20    | lg:size-20    | xl:size-20    | 2xl:size-20    |
| size-24     | sm:size-24    | md:size-24    | lg:size-24    | xl:size-24    | 2xl:size-24    |
| size-28     | sm:size-28    | md:size-28    | lg:size-28    | xl:size-28    | 2xl:size-28    |
| size-32     | sm:size-32    | md:size-32    | lg:size-32    | xl:size-32    | 2xl:size-32    |
| size-36     | sm:size-36    | md:size-36    | lg:size-36    | xl:size-36    | 2xl:size-36    |
| size-40     | sm:size-40    | md:size-40    | lg:size-40    | xl:size-40    | 2xl:size-40    |
| size-44     | sm:size-44    | md:size-44    | lg:size-44    | xl:size-44    | 2xl:size-44    |
| size-48     | sm:size-48    | md:size-48    | lg:size-48    | xl:size-48    | 2xl:size-48    |
| size-52     | sm:size-52    | md:size-52    | lg:size-52    | xl:size-52    | 2xl:size-52    |
| size-56     | sm:size-56    | md:size-56    | lg:size-56    | xl:size-56    | 2xl:size-56    |
| size-60     | sm:size-60    | md:size-60    | lg:size-60    | xl:size-60    | 2xl:size-60    |
| size-64     | sm:size-64    | md:size-64    | lg:size-64    | xl:size-64    | 2xl:size-64    |
| size-72     | sm:size-72    | md:size-72    | lg:size-72    | xl:size-72    | 2xl:size-72    |
| size-80     | sm:size-80    | md:size-80    | lg:size-80    | xl:size-80    | 2xl:size-80    |
| size-96     | sm:size-96    | md:size-96    | lg:size-96    | xl:size-96    | 2xl:size-96    |
| size-1/2    | sm:size-1/2   | md:size-1/2   | lg:size-1/2   | xl:size-1/2   | 2xl:size-1/2   |
| size-1/3    | sm:size-1/3   | md:size-1/3   | lg:size-1/3   | xl:size-1/3   | 2xl:size-1/3   |
| size-2/3    | sm:size-2/3   | md:size-2/3   | lg:size-2/3   | xl:size-2/3   | 2xl:size-2/3   |
| size-1/4    | sm:size-1/4   | md:size-1/4   | lg:size-1/4   | xl:size-1/4   | 2xl:size-1/4   |
| size-2/4    | sm:size-2/4   | md:size-2/4   | lg:size-2/4   | xl:size-2/4   | 2xl:size-2/4   |
| size-3/4    | sm:size-3/4   | md:size-3/4   | lg:size-3/4   | xl:size-3/4   | 2xl:size-3/4   |
| size-1/5    | sm:size-1/5   | md:size-1/5   | lg:size-1/5   | xl:size-1/5   | 2xl:size-1/5   |
| size-2/5    | sm:size-2/5   | md:size-2/5   | lg:size-2/5   | xl:size-2/5   | 2xl:size-2/5   |
| size-3/5    | sm:size-3/5   | md:size-3/5   | lg:size-3/5   | xl:size-3/5   | 2xl:size-3/5   |
| size-4/5    | sm:size-4/5   | md:size-4/5   | lg:size-4/5   | xl:size-4/5   | 2xl:size-4/5   |
| size-1/6    | sm:size-1/6   | md:size-1/6   | lg:size-1/6   | xl:size-1/6   | 2xl:size-1/6   |
| size-2/6    | sm:size-2/6   | md:size-2/6   | lg:size-2/6   | xl:size-2/6   | 2xl:size-2/6   |
| size-3/6    | sm:size-3/6   | md:size-3/6   | lg:size-3/6   | xl:size-3/6   | 2xl:size-3/6   |
| size-4/6    | sm:size-4/6   | md:size-4/6   | lg:size-4/6   | xl:size-4/6   | 2xl:size-4/6   |
| size-5/6    | sm:size-5/6   | md:size-5/6   | lg:size-5/6   | xl:size-5/6   | 2xl:size-5/6   |
| size-1/12   | sm:size-1/12  | md:size-1/12  | lg:size-1/12  | xl:size-1/12  | 2xl:size-1/12  |
| size-2/12   | sm:size-2/12  | md:size-2/12  | lg:size-2/12  | xl:size-2/12  | 2xl:size-2/12  |
| size-3/12   | sm:size-3/12  | md:size-3/12  | lg:size-3/12  | xl:size-3/12  | 2xl:size-3/12  |
| size-4/12   | sm:size-4/12  | md:size-4/12  | lg:size-4/12  | xl:size-4/12  | 2xl:size-4/12  |
| size-5/12   | sm:size-5/12  | md:size-5/12  | lg:size-5/12  | xl:size-5/12  | 2xl:size-5/12  |
| size-6/12   | sm:size-6/12  | md:size-6/12  | lg:size-6/12  | xl:size-6/12  | 2xl:size-6/12  |
| size-7/12   | sm:size-7/12  | md:size-7/12  | lg:size-7/12  | xl:size-7/12  | 2xl:size-7/12  |
| size-8/12   | sm:size-8/12  | md:size-8/12  | lg:size-8/12  | xl:size-8/12  | 2xl:size-8/12  |
| size-9/12   | sm:size-9/12  | md:size-9/12  | lg:size-9/12  | xl:size-9/12  | 2xl:size-9/12  |
| size-10/12  | sm:size-10/12 | md:size-10/12 | lg:size-10/12 | xl:size-10/12 | 2xl:size-10/12 |
| size-11/12  | sm:size-11/12 | md:size-11/12 | lg:size-11/12 | xl:size-11/12 | 2xl:size-11/12 |
*/