/**
 * Tailwind Merge with conflict resolution.
 *
 * Handles class conflicts for Tailwind CSS utilities.
 *
 * @param {...string} classes - CSS classes to merge.
 * @returns {string} Merged class string without conflicts.
 *
 * @example
 * ```js
 * merge( 'text-shadow-sm' , 'text-shadow-lg' ) ;
 * // → 'text-shadow-lg'
 *
 * merge( 'p-4' , 'p-2' , 'text-shadow' ) ;
 * // → 'p-2 text-shadow'
 * ```
 */
export { twMerge as default } from 'tailwind-merge' ;