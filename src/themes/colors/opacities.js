/**
 * Available opacity values (0-100 in steps of 5).
 *
 * Used to generate color variants with transparency.
 *
 * @type {number[]}
 *
 * @example
 * ```js
 * import opacities from 'oihana-next-ui/themes/opacities' ;
 *
 * opacities.forEach( ( opacity ) => {
 *     console.log( `base-content/${ opacity }` ) ;
 * } ) ;
 * // → 'base-content/0', 'base-content/5', ... 'base-content/100'
 * ```
 */
const opacities =
[
    0 ,
    5 ,
    10 ,
    15 ,
    20 ,
    25 ,
    30 ,
    35 ,
    40 ,
    45 ,
    50 ,
    55 ,
    60 ,
    65 ,
    70 ,
    75 ,
    80 ,
    85 ,
    90 ,
    95 ,
    100 ,
];

export default opacities ;