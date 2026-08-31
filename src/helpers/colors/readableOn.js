/**
 * Picks the text colour that reads on a given background.
 *
 * Needed wherever a background stops being a theme token and becomes a
 * computed value — a palette ramp, a colour carried in the data. A token comes
 * with its own `-content` pair and needs none of this ; a hex does not, and
 * guessing white because "the colour looks dark" is how a label disappears on
 * one theme and not the other.
 *
 * Black or white rather than a tinted shade : those two are what actually
 * maximise contrast against an arbitrary hue, and a mid-tone chosen to look
 * refined is a mid-tone that fails WCAG somewhere in the ramp.
 *
 * @module helpers/colors/readableOn
 */

import chroma from 'chroma-js' ;

/** @type {string} */
export const BLACK = '#000000' ;

/** @type {string} */
export const WHITE = '#ffffff' ;

/**
 * The more readable of black and white on `background`.
 *
 * @param {string} background - Any colour chroma accepts.
 * @param {Object} [options]
 * @param {string} [options.dark='#000000'] - What to return when the background is light.
 * @param {string} [options.light='#ffffff'] - What to return when the background is dark.
 * @returns {string} The readable colour, or `light` when the background cannot be parsed.
 *
 * @example
 * ```js
 * readableOn( '#f6c945' ) ; // → '#000000'
 * readableOn( '#1b3a5c' ) ; // → '#ffffff'
 * ```
 */
const readableOn = ( background , { dark = BLACK , light = WHITE } = {} ) =>
{
    try
    {
        return chroma.contrast( background , light ) >= chroma.contrast( background , dark ) ? light : dark ;
    }
    catch
    {
        return light ;
    }
} ;

export default readableOn ;
