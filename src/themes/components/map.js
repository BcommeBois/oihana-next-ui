/**
 * Map class name generators.
 *
 * The engine draws the tiles ; everything the reader recognises as *this*
 * library — the marker, the frame it sits in — is ordinary DOM styled from the
 * theme tokens, which is the whole reason the markers are not a vector layer.
 *
 * @module themes/components/map
 *
 * @safelist
 * ## Marker colors
 * - bg-accent text-accent-content | bg-error text-error-content
 * - bg-info text-info-content | bg-neutral text-neutral-content
 * - bg-primary text-primary-content | bg-secondary text-secondary-content
 * - bg-success text-success-content | bg-warning text-warning-content
 *
 * ## Marker sizes
 * - size-5 | size-6 | size-8 | size-10 | size-12
 */

import cn from '../helpers/cn' ;

import {
    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,
} from '../colors' ;

import { LG , MD , SM , XL , XS } from '../sizing/sizes' ;

/**
 * @typedef {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} MapMarkerColor
 * @typedef {'xs' | 'sm' | 'md' | 'lg' | 'xl'} MapMarkerSize
 */

export { ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING } from '../colors' ;

/**
 * Valid marker colors.
 * @type {MapMarkerColor[]}
 */
export const colors = [ ACCENT , ERROR , INFO , NEUTRAL , PRIMARY , SECONDARY , SUCCESS , WARNING ] ;

/**
 * Valid marker sizes.
 * @type {MapMarkerSize[]}
 */
export const sizes = [ XS , SM , MD , LG , XL ] ;

/**
 * Marker color classes — the fill and the text that has to stay legible on it.
 * @type {Object.<MapMarkerColor, string>}
 */
const markerColorMap =
{
    [ ACCENT    ] : 'bg-accent text-accent-content' ,
    [ ERROR     ] : 'bg-error text-error-content' ,
    [ INFO      ] : 'bg-info text-info-content' ,
    [ NEUTRAL   ] : 'bg-neutral text-neutral-content' ,
    [ PRIMARY   ] : 'bg-primary text-primary-content' ,
    [ SECONDARY ] : 'bg-secondary text-secondary-content' ,
    [ SUCCESS   ] : 'bg-success text-success-content' ,
    [ WARNING   ] : 'bg-warning text-warning-content' ,
} ;

/**
 * Marker sizes.
 * @type {Object.<MapMarkerSize, string>}
 */
const markerSizeMap =
{
    [ XS ] : 'size-5' ,
    [ SM ] : 'size-6' ,
    [ MD ] : 'size-8' ,
    [ LG ] : 'size-10' ,
    [ XL ] : 'size-12' ,
} ;

/**
 * The map box itself.
 *
 * `isolate` is not decoration : the engine stacks its own canvas and controls,
 * and without a stacking context of its own a marker's ring bleeds over a
 * sticky header two components away.
 *
 * @param {Object} [props={}]
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 */
export const getMapClassNames = ({ beforeClassName , className } = {}) => cn
(
    beforeClassName ,
    'relative isolate w-full overflow-hidden rounded-box' ,
    className ,
) ;

/**
 * A DOM marker : a round token that reads on any tile background.
 *
 * The ring is what separates it from the map underneath — a flat colour on
 * aerial imagery or on a dense city block disappears, and a border in the
 * base color follows the theme where a white one only works in light mode.
 *
 * @param {Object} [props={}]
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {MapMarkerColor} [props.color='primary'] - Marker color.
 * @param {boolean} [props.interactive] - Add the cursor and hover affordances of a clickable marker.
 * @param {MapMarkerSize} [props.size='md'] - Marker size.
 * @returns {string}
 *
 * @example
 * ```js
 * getMapMarkerClassNames({ color : 'error' , size : 'lg' , interactive : true }) ;
 * ```
 */
export const getMapMarkerClassNames = ({ beforeClassName , className , color = PRIMARY , interactive , size = MD } = {}) => cn
(
    beforeClassName ,
    'flex items-center justify-center rounded-full ring-2 ring-base-100 shadow-md' ,
    markerColorMap[ color ] ?? markerColorMap[ PRIMARY ] ,
    markerSizeMap[ size ] ?? markerSizeMap[ MD ] ,
    interactive && 'cursor-pointer transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content' ,
    className ,
) ;

export default getMapClassNames ;
