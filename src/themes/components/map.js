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
 *
 * ## Cluster sizes
 * - size-9 | size-11 | size-14
 *
 * ## Control corners
 * - top-2 start-2 | top-2 end-2 | bottom-2 start-2 | bottom-8 end-2
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

/**
 * How big a cluster bubble is, by how much it stands for.
 *
 * Three steps rather than a computed diameter : a size built from a count never
 * appears in the source, and Tailwind only ships what it can read. Three is also
 * as much as the eye reads reliably — a bubble whose radius tracked the count
 * exactly would say « slightly more » where the reader only needs « more ».
 *
 * @type {Array<{ upTo : number , className : string }>}
 */
const clusterSizeSteps =
[
    { upTo : 10       , className : 'size-9'  } ,
    { upTo : 100      , className : 'size-11' } ,
    { upTo : Infinity , className : 'size-14' } ,
] ;

/**
 * How many steps a cluster is graded on — the size, and the palette that
 * follows it. One figure so the two cannot drift apart.
 *
 * @type {number}
 */
export const CLUSTER_STEPS = clusterSizeSteps.length ;

/**
 * Which step a count falls in, lowest first.
 *
 * @param {number} [count=0]
 * @returns {number} An index in `[ 0 , CLUSTER_STEPS - 1 ]`.
 */
export const getMapClusterStep = ( count = 0 ) => clusterSizeSteps.findIndex( ( step ) => count < step.upTo ) ;

/**
 * A cluster bubble : the same token as a marker, one step larger, with its count.
 *
 * **`color : null` leaves the bubble uncoloured**, on purpose. A palette ramp
 * hands back hex values, not tokens, so the fill and the text that has to read
 * on it are set inline — and a token class left here would win over them, a
 * Tailwind utility beating an inline style at nothing.
 *
 * @param {Object} [props={}]
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {MapMarkerColor|null} [props.color='primary'] - Bubble color. `null` emits none.
 * @param {number} [props.count=0] - How many points it stands for.
 * @returns {string}
 */
export const getMapClusterClassNames = ({ beforeClassName , className , color = PRIMARY , count = 0 } = {}) => cn
(
    beforeClassName ,
    'flex items-center justify-center rounded-full ring-2 ring-base-100 shadow-md' ,
    'cursor-pointer font-semibold tabular-nums transition-transform hover:scale-110' ,
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-base-content' ,
    color && ( markerColorMap[ color ] ?? markerColorMap[ PRIMARY ] ) ,
    clusterSizeSteps[ getMapClusterStep( count ) ].className ,
    className ,
) ;

/**
 * @typedef {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} MapControlPosition
 */

/** Valid control corners. @type {MapControlPosition[]} */
export const positions = [ 'top-left' , 'top-right' , 'bottom-left' , 'bottom-right' ] ;

/**
 * Where a control sits.
 *
 * `bottom-right` is pushed further up than its siblings on purpose : the source
 * credit lives in that corner, and a button landing on it would cover a licence
 * condition.
 *
 * @type {Object.<MapControlPosition, string>}
 */
const positionMap =
{
    'top-left'     : 'top-2 start-2' ,
    'top-right'    : 'top-2 end-2' ,
    'bottom-left'  : 'bottom-2 start-2' ,
    'bottom-right' : 'bottom-8 end-2' ,
} ;

/**
 * A box holding our own controls, in one corner of the map.
 *
 * It wraps its children exactly, so the map stays draggable everywhere the box
 * does not actually cover — no invisible panel eating gestures in a corner.
 *
 * @param {Object} [props={}]
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {MapControlPosition} [props.position='top-left'] - Which corner.
 * @returns {string}
 */
export const getMapControlClassNames = ({ beforeClassName , className , position = 'top-left' } = {}) => cn
(
    beforeClassName ,
    'absolute z-10 flex w-fit flex-col gap-2' ,
    positionMap[ position ] ?? positionMap[ 'top-left' ] ,
    className ,
) ;

/**
 * The translucent disc that says how sure the fix is.
 *
 * Its size is set in pixels by whoever draws it — the radius is in real metres
 * and has to be recomputed at every zoom — so nothing here touches dimensions.
 *
 * @param {Object} [props={}]
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 */
export const getMapAccuracyCircleClassNames = ({ beforeClassName , className } = {}) => cn
(
    beforeClassName ,
    'pointer-events-none rounded-full bg-info/15 ring-1 ring-info/40' ,
    className ,
) ;

export default getMapClassNames ;
