/**
 * Tailwind CSS modifiers (pseudo-classes + Tailwind-specific).
 *
 * @module themes/enums/modifiers
 *
 * @example
 * ```js
 * import { HOVER , DARK , MOTION_SAFE } from '@/themes/enums/modifiers' ;
 *
 * const className = `${ DARK }:bg-gray-900 ${ HOVER }:scale-105 ${ MOTION_SAFE }:transition` ;
 * // → 'dark:bg-gray-900 hover:scale-105 motion-safe:transition'
 * ```
 */

import pseudoClasses from './pseudoClasses' ;

// Re-export all pseudo-classes
export * from './pseudoClasses' ;

// Media
export const DARK      = 'dark' ;
export const PORTRAIT  = 'portrait' ;
export const LANDSCAPE = 'landscape' ;

// Direction
export const LTR = 'ltr' ;
export const RTL = 'rtl' ;

// Motion preference
export const MOTION_REDUCE = 'motion-reduce' ;
export const MOTION_SAFE   = 'motion-safe' ;

// Contrast preference
export const CONTRAST_MORE = 'contrast-more' ;
export const CONTRAST_LESS = 'contrast-less' ;

// Forced colors
export const FORCED_COLORS = 'forced-colors' ;

// Group
export const GROUP               = 'group' ;
export const GROUP_HOVER         = 'group-hover' ;
export const GROUP_FOCUS         = 'group-focus' ;
export const GROUP_FOCUS_VISIBLE = 'group-focus-visible' ;
export const GROUP_ACTIVE        = 'group-active' ;
export const GROUP_DISABLED      = 'group-disabled' ;
export const GROUP_OPEN          = 'group-open' ;

// Peer
export const PEER               = 'peer' ;
export const PEER_HOVER         = 'peer-hover' ;
export const PEER_FOCUS         = 'peer-focus' ;
export const PEER_FOCUS_VISIBLE = 'peer-focus-visible' ;
export const PEER_ACTIVE        = 'peer-active' ;
export const PEER_DISABLED      = 'peer-disabled' ;
export const PEER_CHECKED       = 'peer-checked' ;
export const PEER_INVALID       = 'peer-invalid' ;
export const PEER_OPEN          = 'peer-open' ;

// Has / Not (Tailwind v4)
export const HAS = 'has' ;
export const NOT = 'not' ;

/**
 * @typedef {import('./pseudoClasses').PseudoClass} PseudoClass
 */

/**
 * @typedef {
 *   'dark' | 'portrait' | 'landscape' |
 *   'ltr' | 'rtl' |
 *   'motion-reduce' | 'motion-safe' |
 *   'contrast-more' | 'contrast-less' |
 *   'forced-colors' |
 *   'group' | 'group-hover' | 'group-focus' | 'group-focus-visible' |
 *   'group-active' | 'group-disabled' | 'group-open' |
 *   'peer' | 'peer-hover' | 'peer-focus' | 'peer-focus-visible' |
 *   'peer-active' | 'peer-disabled' | 'peer-checked' | 'peer-invalid' | 'peer-open' |
 *   'has' | 'not'
 * } TailwindModifier
 */

/**
 * @typedef {PseudoClass | TailwindModifier} Modifier
 */

/**
 * Tailwind-specific modifiers (excluding CSS pseudo-classes).
 * @type {TailwindModifier[]}
 */
export const tailwindModifiers =
[
    // Media
    DARK ,
    PORTRAIT ,
    LANDSCAPE ,

    // Direction
    LTR ,
    RTL ,

    // Motion preference
    MOTION_REDUCE ,
    MOTION_SAFE ,

    // Contrast preference
    CONTRAST_MORE ,
    CONTRAST_LESS ,

    // Forced colors
    FORCED_COLORS ,

    // Group
    GROUP ,
    GROUP_HOVER ,
    GROUP_FOCUS ,
    GROUP_FOCUS_VISIBLE ,
    GROUP_ACTIVE ,
    GROUP_DISABLED ,
    GROUP_OPEN ,

    // Peer
    PEER ,
    PEER_HOVER ,
    PEER_FOCUS ,
    PEER_FOCUS_VISIBLE ,
    PEER_ACTIVE ,
    PEER_DISABLED ,
    PEER_CHECKED ,
    PEER_INVALID ,
    PEER_OPEN ,

    // Has / Not
    HAS ,
    NOT ,
] ;

/**
 * All available modifiers (pseudo-classes + Tailwind-specific).
 * @type {Modifier[]}
 */
const modifiers =
[
    ...pseudoClasses ,
    ...tailwindModifiers ,
] ;

export default modifiers ;