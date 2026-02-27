import clsx from 'clsx'

import merge from './merge'

/**
 * Combines clsx and tailwind-merge for optimal class handling.
 *
 * - clsx: Handles conditional classes, arrays, objects
 * - tailwind-merge: Resolves Tailwind class conflicts
 *
 * @param {...(string | string[] | Record<string, boolean> | undefined | null | false)} inputs - Class values.
 * @returns {string} Merged class string without conflicts.
 *
 * @example
 * ```js
 * // Conditional classes
 * clx( 'p-4' , isActive && 'bg-primary' ) ;
 * // → 'p-4 bg-primary' (if isActive)
 *
 * // Object syntax
 * clx( 'p-4' , { 'bg-primary': isActive , 'opacity-50': isDisabled } ) ;
 * // → 'p-4 bg-primary' (if isActive && !isDisabled)
 *
 * // Conflict resolution
 * clx( 'p-4 text-sm' , 'p-2 text-lg' ) ;
 * // → 'p-2 text-lg'
 *
 * // Arrays
 * clx( [ 'flex' , 'items-center' ] , 'gap-2' ) ;
 * // → 'flex items-center gap-2'
 * ```
 */
const cn = ( ...inputs ) => merge( clsx( inputs ) ) ;

/**
 * @deprecated Use `cn` instead.
 */
export const clx = cn ;

export default cn ;