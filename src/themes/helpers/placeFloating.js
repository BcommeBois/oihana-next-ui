/**
 * Where a floating bubble goes, given its trigger, the placement it was asked
 * for, and the room the page leaves.
 *
 * Pure, and deliberately so : this is the whole of what « aligns elegantly
 * depending on where you are in the page » amounts to — take the side asked
 * for, flip it only when it has no room, align on the other axis, then pull
 * back inside the window. Written as a function rather than inside a component,
 * it can be checked without a browser, which is the only way to be sure of the
 * edge cases that a screenshot never shows.
 *
 * ### A flip is a fallback, never a preference
 *
 * `position` is the side the caller wants and gets — the facing one is taken
 * only when the wanted one cannot hold the bubble, and if neither can, the
 * wanted one is kept and clamped. A placement that is silently ignored is worse
 * than one that is refused, so the side actually used comes back in
 * `direction` and the alignment actually used in `align` : what the placement
 * did is readable rather than guessed.
 *
 * Clamping is **not** a flip. The alignment asked for is always honoured, then
 * bounded by the edges of the window : a bubble half off the screen is
 * unreadable, and no alignment is worth that.
 *
 * ### The two axes
 *
 * `position` opens the bubble on one axis and `align` slides it along the
 * other, exactly as daisyUI's CSS tooltip does : on `top` / `bottom` the
 * alignment works on the inline axis (`start` flushes the left edges, `end` the
 * right ones), on `left` / `right` on the block axis (`start` flushes the top
 * edges). Same names, same values, same result — which is what lets a tooltip
 * change path without changing how it is written.
 *
 * @module themes/helpers/placeFloating
 */

import clamp from 'vegas-js-core/src/maths/clamp' ;

import { CENTER , END , START }         from '../enums/alignments' ;
import { BOTTOM , LEFT , RIGHT , TOP }  from '../enums/positions' ;

/** Room left between the bubble and its trigger. */
export const GAP = 8 ;

/** Room left between the bubble and the edges of the window. */
export const MARGIN = 8 ;

/** The tail's length along the axis it slides on — daisyUI draws it ten by four. */
export const ARROW = 10 ;

/**
 * How close to a corner the tail may sit.
 *
 * The same half-rem daisyUI keeps for its own (`--tt-tail-off`) : past it the
 * tail climbs onto the rounded corner and comes out of the bubble sideways.
 */
export const ARROW_INSET = 8 ;

/**
 * The side facing each side.
 *
 * It holds exactly the four sides, so it doubles as the test of whether a
 * `position` is one of them.
 */
const opposites =
{
    [ BOTTOM ] : TOP ,
    [ LEFT   ] : RIGHT ,
    [ RIGHT  ] : LEFT ,
    [ TOP    ] : BOTTOM ,
} ;

/** The three alignments a bubble understands — `alignments` also carries baseline and stretch. */
const aligns = [ START , CENTER , END ] ;

/**
 * Whether a side has the room the bubble needs, gap and margin included.
 *
 * @param {string} side - One of the four sides.
 * @param {DOMRect} anchor - The trigger's rect.
 * @param {{width: number, height: number}} bubble
 * @param {{width: number, height: number}} viewport
 * @returns {boolean}
 */
const fits = ( side , anchor , bubble , viewport ) =>
{
    switch ( side )
    {
        case BOTTOM : return anchor.bottom + GAP + bubble.height <= viewport.height - MARGIN ;
        case LEFT   : return anchor.left   - GAP - bubble.width  >= MARGIN ;
        case RIGHT  : return anchor.right  + GAP + bubble.width  <= viewport.width  - MARGIN ;
        default     : return anchor.top    - GAP - bubble.height >= MARGIN ;
    }
} ;

/**
 * Where the bubble starts on the axis it does not open on.
 *
 * @param {string} align - One of the three alignments.
 * @param {number} start - The trigger's near edge on that axis.
 * @param {number} size - The trigger's length on that axis.
 * @param {number} bubbleSize - The bubble's.
 * @returns {number}
 */
const alignStart = ( align , start , size , bubbleSize ) =>
{
    if ( align === START )
    {
        return start ;
    }

    if ( align === END )
    {
        return start + size - bubbleSize ;
    }

    return start + size / 2 - bubbleSize / 2 ;
} ;

/**
 * @typedef {Object} FloatingPlacement
 * @property {'start'|'center'|'end'} align - The alignment used, an unknown one having fallen back to `center`.
 * @property {number} arrow - Where the tail goes along the axis the bubble slides on, in pixels from the bubble's **left** edge for a `top` / `bottom` placement and from its **top** edge otherwise — the leading edge of a tail {@link ARROW} long, so it can be written straight into `left` / `top`. It follows the middle of the trigger when the bubble is centred on it, and sits at the aligned edge otherwise. Physical rather than logical on purpose : the bubble itself is placed in physical coordinates, and `inset-inline-start` would mirror the tail in an RTL page.
 * @property {'top'|'bottom'|'left'|'right'} direction - Which side of the trigger it landed on. Differs from the `position` asked for only when that side had no room and the facing one had.
 * @property {number} left - Viewport coordinate.
 * @property {number} top - Viewport coordinate.
 */

/**
 * @param {DOMRect} anchor - The trigger's rect, or anything carrying the same six numbers.
 * @param {{width: number, height: number}} bubble - The bubble's own, **as rendered** — estimating it puts the bubble a few pixels off and, near an edge, makes it flip the wrong way.
 * @param {{width: number, height: number}} viewport
 * @param {Object} [options]
 * @param {'start'|'center'|'end'} [options.align='center'] - Where the bubble sits along the axis it does not open on.
 * @param {'top'|'bottom'|'left'|'right'} [options.position='top'] - The side it opens on **by preference**. Above by default : a bubble under a trigger tends to cover the very thing the reader is about to click.
 * @param {boolean} [options.rtl=false] - The trigger is in a right-to-left flow, where `start` is its right edge. Block alignments — a `left` or `right` placement — are unaffected, the block axis running downwards either way.
 * @returns {FloatingPlacement}
 *
 * @example
 * placeFloating( trigger.getBoundingClientRect() , tip.getBoundingClientRect() , { width : innerWidth , height : innerHeight } )
 *
 * @example
 * // Under the trigger, flush with its right edge — and above it only if the page has no room below.
 * placeFloating( anchor , bubble , viewport , { align : 'end' , position : 'bottom' } )
 */
export const placeFloating = ( anchor , bubble , viewport , { align = CENTER , position = TOP , rtl = false } = {} ) =>
{
    const preferred = opposites[ position ] ? position : TOP ;

    const alignment = aligns.includes( align ) ? align : CENTER ;

    // The side asked for, unless it has no room and the facing one does. Written
    // in that order rather than « whichever is roomier » so that a caller who
    // asks for a side in an unhurried page always gets it, and so that a bubble
    // that fits nowhere still lands where it was sent.
    const direction = fits( preferred , anchor , bubble , viewport ) || !fits( opposites[ preferred ] , anchor , bubble , viewport )
        ? preferred
        : opposites[ preferred ] ;

    const vertical = direction === TOP || direction === BOTTOM ;

    // `start` and `end` are edges of the reading flow rather than of the screen,
    // as they are in daisyUI's own stylesheet — so on the inline axis of an RTL
    // trigger they trade places. The block axis runs downwards in both flows.
    const flowed = vertical && rtl && alignment !== CENTER
        ? ( alignment === START ? END : START )
        : alignment ;

    const main = vertical
        ? ( direction === TOP  ? anchor.top  - bubble.height - GAP : anchor.bottom + GAP )
        : ( direction === LEFT ? anchor.left - bubble.width  - GAP : anchor.right  + GAP ) ;

    const cross = vertical
        ? alignStart( flowed , anchor.left , anchor.width  , bubble.width  )
        : alignStart( flowed , anchor.top  , anchor.height , bubble.height ) ;

    const mainSize  = vertical ? bubble.height   : bubble.width ;
    const crossSize = vertical ? bubble.width    : bubble.height ;
    const mainRoom  = vertical ? viewport.height : viewport.width ;
    const crossRoom = vertical ? viewport.width  : viewport.height ;

    // Held inside the window on both axes : a no-op along the opening one
    // whenever the chosen side had room, and the honest answer when no side had
    // any. `clamp` keeps the minimum when the two bounds cross — the case of a
    // bubble larger than the window, which lands on the margin rather than
    // nowhere.
    const mainAt  = clamp( main  , MARGIN , mainRoom  - mainSize  - MARGIN ) ;
    const crossAt = clamp( cross , MARGIN , crossRoom - crossSize - MARGIN ) ;

    // **Centred, the tail follows the trigger** wherever the bubble ended up :
    // nailed to the middle of the bubble instead, it designates the bubble, and
    // as soon as one is pulled back from an edge of the window that is no longer
    // the thing it names.
    //
    // **Aligned, it sits at the edge that was aligned on**, as daisyUI puts its
    // own — an alignment says which edges are to meet, and the tail belongs to
    // that meeting. Made to aim at the middle of the trigger it would do the
    // opposite of what was asked on anything wider than the bubble : that middle
    // falls outside, and the tail is then pushed against the corner **facing**
    // the aligned edge.
    const centre = vertical
        ? anchor.left + anchor.width  / 2
        : anchor.top  + anchor.height / 2 ;

    const far = crossSize - ARROW_INSET - ARROW ;

    const arrow = clamp
    (
        flowed === START ? ARROW_INSET
            : flowed === END ? far
            : centre - crossAt - ARROW / 2 ,
        ARROW_INSET ,
        far ,
    ) ;

    return {
        align : alignment ,
        arrow ,
        direction ,
        left : vertical ? crossAt : mainAt ,
        top  : vertical ? mainAt  : crossAt ,
    } ;
} ;

export default placeFloating ;
