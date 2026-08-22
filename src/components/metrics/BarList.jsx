'use client' ;

import { useEffect , useState } from 'react' ;

import { useMedia } from 'react-use' ;

import { BAR_LIST_BAR_DURATION , getBarListClasses } from '../../themes/components/barList' ;

import BarListRow from './BarListRow' ;
import EmptyState from '../EmptyState' ;
import Skeleton   from '../Skeleton' ;

/**
 * Sort orders accepted by {@link module:components/metrics/BarList}.
 * @type {string[]}
 */
export const sortOrders = [ 'ascending' , 'descending' , 'none' ] ;

const DEFAULT_SKELETON_ROWS = 5 ;

// A non-zero value always keeps a sliver of bar : without it, the smallest entry of a
// long-tailed distribution renders as nothing at all and reads as missing data.
const MIN_WIDTH = 2 ;

// The three moments of an entrance. `ZERO` is the frame the bars are pinned at nothing —
// a width has to be painted before it can be transitioned from. `GROW` is the run itself,
// and the only moment the per-row delay exists. `DONE` is the resting state, and it is
// also where a list that never reveals anything sits from the start.
const ZERO = 'zero' ;
const GROW = 'grow' ;
const DONE = 'done' ;

/**
 * A ranked list of values, each drawn as a bar as wide as its share — top pages, top
 * referrers, top error codes. The everyday shape of an analytics panel.
 *
 * **Bar widths are relative to the largest value**, not to the total, so the leader always
 * fills the row and the shape of the distribution is what one reads. Pass `max` to impose
 * the scale instead : two lists sharing a `max` become comparable, which they never are
 * when each normalises on its own leader.
 *
 * **The list is sorted for you.** `sortOrder` defaults to `'descending'`, because a bar
 * list is a ranking ; pass `'none'` to keep the order the data came in.
 *
 * **Rows can be links or buttons, never both.** See {@link module:components/metrics/BarListRow}.
 *
 * ### `reveal` — the bars grow in, one after the other
 *
 * Off by default. Turned on, every bar starts at nothing and grows to its width, each row
 * leaving `revealStagger` milliseconds after the one above it. It is the transition
 * `animated` already uses, started from zero — the two describe the same movement at two
 * different moments, and cost the same nothing.
 *
 * **When it runs** : on mount, whenever `loading` falls back to `false` — the shape of an
 * API call, and the reason no prop has to be wired for one — and whenever `revealKey`
 * changes, which is the manual replay. A change of `data` alone does **not** replay it :
 * a parent writing `data={ items.map( … ) }` builds a new array on every render, and a
 * list that restarted on identity would never stop. Rows are keyed on `key ?? name`, so
 * re-sorting an unchanged list does not replay it either.
 *
 * Ignored under `prefers-reduced-motion`, like every other animation in the library.
 *
 * @module components/metrics/BarList
 *
 * @param {Object} props
 * @param {boolean} [props.animated=false] - Ease the bars to their new widths on value changes.
 * @param {string} [props.barClassName] - Additional classes on every bar.
 * @param {string} [props.className] - Additional classes on the list.
 * @param {string} [props.color='primary'] - Default bar colour. Overridden per item by `item.color`.
 * @param {Array<{ color : string , external : boolean , href : string , icon : React.ReactNode , key : string , name : string , value : number }>} [props.data] - The rows.
 * @param {string} [props.emptyLabel='No data'] - Title of the default empty state.
 * @param {Object} [props.emptyProps] - Spread onto the default `EmptyState`. Ignored when `emptyState` replaces it.
 * @param {React.ReactNode} [props.emptyState] - Replaces the default empty state entirely.
 * @param {boolean} [props.loading=false] - Show skeleton rows instead of the data.
 * @param {number} [props.max] - Value the bars are scaled against. Defaults to the largest value.
 * @param {Function} [props.onSelect] - Row click handler : `( item ) => void`.
 * @param {React.Ref} [props.ref] - Forwarded to the list.
 * @param {boolean} [props.reveal=false] - Grow the bars in, one row after the other. See above.
 * @param {*} [props.revealKey] - Change this value to replay the entrance.
 * @param {number} [props.revealStagger=60] - Milliseconds between two rows.
 * @param {string} [props.rowClassName] - Additional classes on every row.
 * @param {boolean} [props.showPercentage=false] - Append each value's share of the total, in a muted span.
 * @param {import('../../themes/components/barList').BarListSize|Object} [props.size='md'] - Row height, scalar or per breakpoint.
 * @param {'ascending'|'descending'|'none'} [props.sortOrder='descending'] - How to order the rows.
 * @param {string} [props.valueClassName] - Additional classes on every value cell.
 * @param {Function} [props.valueFormatter] - Formats the displayed value : `( value ) => string`.
 *
 * @example Top pages
 * ```jsx
 * <BarList
 *     data={[
 *         { name : '/home'          , value : 843 } ,
 *         { name : '/documentation' , value : 384 } ,
 *         { name : '/blocks'        , value : 108 } ,
 *     ]}
 *     valueFormatter={ value => `${ value } visiteurs` }
 * />
 * ```
 *
 * @example Clickable, with icons and per-row colours
 * ```jsx
 * <BarList
 *     data     = { errors }
 *     color    = "error"
 *     onSelect = { item => router.push( `/logs?code=${ item.name }` ) }
 *     size     = "lg"
 * />
 * ```
 *
 * @example Two lists on the same scale
 * ```jsx
 * <BarList data={ thisWeek } max={ 1000 } />
 * <BarList data={ lastWeek } max={ 1000 } />
 * ```
 *
 * @example Bars growing in, replayed on demand
 * ```jsx
 * const [ replay , setReplay ] = useState( 0 ) ;
 *
 * <BarList data={ pages } loading={ isFetching } reveal revealKey={ replay } />
 * <Button onClick={ () => setReplay( count => count + 1 ) }>Replay</Button>
 * ```
 */
const BarList =
({
    animated = false ,
    barClassName ,
    className ,
    color = 'primary' ,
    data = [] ,
    emptyLabel = 'No data' ,
    emptyProps ,
    emptyState ,
    loading = false ,
    max ,
    onSelect ,
    ref ,
    reveal = false ,
    revealKey ,
    revealStagger = 60 ,
    rowClassName ,
    showPercentage = false ,
    size ,
    sortOrder = 'descending' ,
    valueClassName ,
    valueFormatter = value => String( value ) ,
    ...rest
}) =>
{
    // The prop asks, the system decides : `prefers-reduced-motion` wins here as it does in
    // every chart of the library.
    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;
    const revealing    = reveal && !reduceMotion ;

    // What identifies one entrance. A load that just finished and a new `revealKey` are the
    // two ways to ask for another ; `revealing` is in there so that turning the effect on
    // plays it rather than waiting for the next occasion.
    const pass = `${ revealKey ?? '' }|${ loading }|${ revealing }` ;

    const [ current , setCurrent ] = useState( pass ) ;
    const [ phase   , setPhase   ] = useState( revealing ? ZERO : DONE ) ;

    if ( current !== pass )
    {
        // Setting state while rendering is React's own way of deriving state from props,
        // and the only one that pins the bars back to zero **in the same commit** : an
        // effect would let the browser paint them at full width first, and the entrance
        // would start from the end.
        setCurrent( pass ) ;
        setPhase( revealing ? ZERO : DONE ) ;
    }

    useEffect( () =>
    {
        if ( phase !== ZERO || loading ) return ;

        // One frame at zero, painted, before the real widths are handed over — a transition
        // needs a value to leave.
        const frame = requestAnimationFrame( () => setPhase( GROW ) ) ;

        return () => cancelAnimationFrame( frame ) ;
    }
    , [ loading , phase ] ) ;

    useEffect( () =>
    {
        if ( phase !== GROW ) return ;

        // The delay belongs to the entrance and to nothing else : left in place, it would
        // stagger every later value change too, which is nonsense for a refresh.
        const last  = Math.max( data.length - 1 , 0 ) * revealStagger ;
        const timer = setTimeout( () => setPhase( DONE ) , last + BAR_LIST_BAR_DURATION ) ;

        return () => clearTimeout( timer ) ;
    }
    , [ data.length , phase , revealStagger ] ) ;

    if ( loading )
    {
        // The placeholders keep the row count the data will have, so the panel does not
        // jump when it lands.
        const placeholders = Array.from(
            { length : data.length || DEFAULT_SKELETON_ROWS } ,
            ( _ , index ) => `skeleton-${ index }` ,
        ) ;

        return (
            <ul aria-busy="true" className={ getBarListClasses({ className }) } ref={ ref } { ...rest }>
                { placeholders.map( id => (
                    <li className="col-span-2" key={ id }>
                        <Skeleton className="h-8 w-full" />
                    </li>
                ) ) }
            </ul>
        ) ;
    }

    if ( data.length === 0 )
    {
        return emptyState ?? <EmptyState size="sm" title={ emptyLabel } { ...emptyProps } /> ;
    }

    const rows = sortOrder === 'none'
        ? data
        : [ ...data ].sort( ( a , b ) => sortOrder === 'ascending' ? a.value - b.value : b.value - a.value ) ;

    const scale = max ?? Math.max( ...rows.map( item => item.value ) , 0 ) ;

    const total = showPercentage
        ? rows.reduce( ( sum , item ) => sum + Math.max( item.value , 0 ) , 0 )
        : 0 ;

    return (
        <ol className={ getBarListClasses({ className }) } ref={ ref } { ...rest }>

            { rows.map( ( item , index ) =>
            {
                const width = scale > 0 && item.value > 0
                    ? Math.max( ( item.value / scale ) * 100 , MIN_WIDTH )
                    : 0 ;

                const share = total > 0 ? ( Math.max( item.value , 0 ) / total ) * 100 : 0 ;

                return (
                    <BarListRow
                        animated     = { animated }
                        barClassName = { barClassName }
                        className    = { rowClassName }
                        color        = { item.color ?? color }
                        external     = { item.external }
                        href         = { item.href }
                        icon         = { item.icon }
                        key          = { item.key ?? item.name ?? `row-${ index }` }
                        name         = { item.name }
                        onSelect     = { onSelect ? () => onSelect( item ) : undefined }
                        reveal       = { phase === GROW }
                        revealDelay  = { phase === GROW ? index * revealStagger : undefined }
                        size         = { size }
                        still        = { phase === ZERO }
                        value        = {
                            <>
                                { valueFormatter( item.value ) }
                                { showPercentage ? (
                                    <span className="ml-2 text-base-content/50">{ `${ share.toFixed( 1 ) } %` }</span>
                                ) : null }
                            </>
                        }
                        valueClassName = { valueClassName }
                        width          = { phase === ZERO ? 0 : width }
                    />
                ) ;
            } ) }

        </ol>
    ) ;
} ;

BarList.displayName = 'BarList' ;

export default BarList ;
