'use client' ;

import { useMeasure } from 'react-use' ;

import useMergeRefs from '../../hooks/useMergeRefs' ;

import {
    BLOCK_GAP ,
    DEFAULT_STATUS ,
    MIN_BLOCK_WIDTH ,
    getTrackerClasses ,
    getTrackerLabelsClasses ,
    getTrackerTrackClasses ,
} from '../../themes/components/tracker' ;

import MetricLegend from './MetricLegend' ;
import TrackerBlock from './TrackerBlock' ;

/**
 * Resolves a bound label, which may be given as a node or computed from what is on screen.
 *
 * @param {React.ReactNode | Function} [label] - The label, or `( visible , total ) => node`.
 * @param {number} visible - How many blocks are shown.
 * @param {number} total - How many blocks were given.
 * @returns {React.ReactNode} The label to render.
 */
const resolveLabel = ( label , visible , total ) =>
    typeof label === 'function' ? label( visible , total ) : label ;

/**
 * Turns a legend entry into what `MetricLegend` reads : here a colour is called a status.
 *
 * @param {{ color : string , status : string }} entry - The legend entry.
 * @returns {Object} The entry, with its colour resolved.
 */
const toLegendItem = ( { status , ...entry } ) => ( { ...entry , color : entry.color ?? status } ) ;

/**
 * A strip of blocks, one per observation, where the colour carries the state — ninety days
 * of uptime, the last fifty builds, a month of backups. The shape of a status page.
 *
 * **Blocks that cannot be read are dropped, not squeezed.** Ninety blocks across a phone
 * leave each one about three pixels wide : unreadable, and impossible to tap. The track
 * measures itself and keeps as many of the **most recent** blocks as fit at
 * `minBlockWidth`, so the same `data` works on a phone and on a dashboard without the
 * caller rendering the component three times behind breakpoints. `maxBlocks` caps it
 * further when the answer is known in advance.
 *
 * The measurement is of the **container**, not of the viewport, which is the difference
 * that matters : a tracker inside a narrow side panel on a wide screen gets it right,
 * where a breakpoint would not.
 *
 * **Statuses are theme tokens** (`'success'`, `'warning'`, `'error'`…), so the strip
 * follows the DaisyUI theme and needs no dark-mode variant. Any other CSS colour is
 * accepted too. This is the part Tremor leaves to the caller, who has to pass raw
 * Tailwind classes and dark-mode variants by hand for every block.
 *
 * @module components/metrics/Tracker
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes on the container.
 * @param {Array<{ key : string , label : string , status : string , tooltip : string }>} [props.data] - The blocks, oldest first.
 * @param {string} [props.defaultStatus='base-300'] - Colour of a block with no `status`.
 * @param {React.ReactNode|Function} [props.endLabel] - Right-hand bound, or `( visible , total ) => node`.
 * @param {boolean} [props.hoverEffect=false] - Fade a block on hover.
 * @param {string} [props.labelsClassName] - Additional classes on the bounds row.
 * @param {Array<{ key : string , name : React.ReactNode , status : string , tooltip : string , value : number|string }>} [props.legend] - What the colours mean, drawn under the bounds. Counts are the caller's to compute — see the example.
 * @param {string} [props.legendClassName] - Additional classes on the legend.
 * @param {Object} [props.legendProps] - Spread onto the underlying `MetricLegend` — `marker`, `orientation`, `size`.
 * @param {number} [props.maxBlocks] - Hard cap on the number of blocks shown, on top of what fits.
 * @param {number} [props.minBlockWidth=6] - Narrowest a block may get, in pixels, before one is dropped.
 * @param {React.Ref} [props.ref] - Forwarded to the container.
 * @param {import('../../themes/components/tracker').TrackerSize|Object} [props.size='md'] - Block height, scalar or per breakpoint.
 * @param {React.ReactNode|Function} [props.startLabel] - Left-hand bound, or `( visible , total ) => node`.
 * @param {React.ReactNode} [props.summary] - A line above the track — an uptime percentage, a period.
 * @param {string} [props.trackClassName] - Additional classes on the track.
 *
 * @example Ninety days of uptime
 * ```jsx
 * <Tracker
 *     data       = { days.map( day => ( { status : day.up ? 'success' : 'error' , tooltip : day.label } ) ) }
 *     startLabel = { visible => `il y a ${ visible } jours` }
 *     endLabel   = "aujourd'hui"
 *     summary    = "99,2 % de disponibilité"
 * />
 * ```
 *
 * @example Dense, non-interactive
 * ```jsx
 * <Tracker data={ builds } size="xs" maxBlocks={ 40 } />
 * ```
 *
 * @example With a legend
 * ```jsx
 * // The counts are computed here on purpose : the strip drops the blocks that do not
 * // fit, so a count the component derived would describe either the period or the
 * // screen, and never obviously which.
 * <Tracker
 *     data   = { days }
 *     legend = {[
 *         { name : 'Opérationnel' , status : 'success' , value : days.filter( day => day.status === 'success' ).length } ,
 *         { name : 'Panne'        , status : 'error'   , value : days.filter( day => day.status === 'error'   ).length } ,
 *     ]}
 * />
 * ```
 */
const Tracker =
({
    className ,
    data = [] ,
    defaultStatus = DEFAULT_STATUS ,
    endLabel ,
    hoverEffect = false ,
    labelsClassName ,
    legend ,
    legendClassName ,
    legendProps ,
    maxBlocks ,
    minBlockWidth = MIN_BLOCK_WIDTH ,
    ref ,
    size ,
    startLabel ,
    summary ,
    trackClassName ,
    ...rest
}) =>
{
    const [ measureRef , { width } ] = useMeasure() ;

    const mergedRef = useMergeRefs( measureRef , ref ) ;

    // Before the first measurement — server render, first paint — every block is shown.
    // Erring towards the full set keeps the wide case, which is the common one, correct
    // from the start ; the narrow case settles one layout pass later.
    const fitting = width > 0
        ? Math.max( Math.floor( ( width + BLOCK_GAP ) / ( minBlockWidth + BLOCK_GAP ) ) , 1 )
        : data.length ;

    const count = Math.min( fitting , maxBlocks ?? data.length , data.length ) ;

    // The tail, not the head : the recent end of a status strip is the one being read.
    const blocks = count < data.length ? data.slice( data.length - count ) : data ;

    // A block with nothing to say is decorative, and a screen reader walking ninety
    // unlabelled list items learns nothing. The bounds and the summary are real text and
    // carry the meaning in that case.
    const described = blocks.some( block => block.tooltip || block.label ) ;

    const start = resolveLabel( startLabel , blocks.length , data.length ) ;
    const end   = resolveLabel( endLabel   , blocks.length , data.length ) ;

    return (
        <div className={ getTrackerClasses({ className }) } ref={ mergedRef } { ...rest }>

            { summary ? <div className="text-sm text-base-content/70">{ summary }</div> : null }

            <ol
                aria-hidden = { described ? undefined : 'true' }
                className   = { getTrackerTrackClasses({ className : trackClassName , size }) }
            >
                { blocks.map( ( block , index ) => (
                    <TrackerBlock
                        hoverEffect = { hoverEffect }
                        key         = { block.key ?? `block-${ data.length - count + index }` }
                        label       = { block.label }
                        status      = { block.status ?? defaultStatus }
                        tooltip     = { block.tooltip }
                    />
                ) ) }
            </ol>

            { start || end ? (
                <div className={ getTrackerLabelsClasses({ className : labelsClassName }) }>
                    <span>{ start }</span>
                    <span>{ end }</span>
                </div>
            ) : null }

            { Array.isArray( legend ) ? (
                <MetricLegend
                    className = { legendClassName }
                    items     = { legend.map( toLegendItem ) }
                    { ...legendProps }
                />
            ) : null }

        </div>
    ) ;
} ;

Tracker.displayName = 'Tracker' ;

export default Tracker ;
