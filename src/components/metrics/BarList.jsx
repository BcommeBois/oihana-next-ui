'use client' ;

import { getBarListClasses } from '../../themes/components/barList' ;

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
    rowClassName ,
    showPercentage = false ,
    size ,
    sortOrder = 'descending' ,
    valueClassName ,
    valueFormatter = value => String( value ) ,
    ...rest
}) =>
{
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
                        size         = { size }
                        value        = {
                            <>
                                { valueFormatter( item.value ) }
                                { showPercentage ? (
                                    <span className="ml-2 text-base-content/50">{ `${ share.toFixed( 1 ) } %` }</span>
                                ) : null }
                            </>
                        }
                        valueClassName = { valueClassName }
                        width          = { width }
                    />
                ) ;
            } ) }

        </ol>
    ) ;
} ;

BarList.displayName = 'BarList' ;

export default BarList ;
