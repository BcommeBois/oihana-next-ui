'use client' ;

/**
 * Timeline — moments on a line : the history of a parcel, the steps of a
 * project, the journal of a document — who did what, when.
 *
 * daisyUI's `timeline`, with the data in `items` or `TimelineItem` children.
 * Each entry is an icon on the line, a time on one side, a title and a
 * description on the other ; `status` colours the line up to the entry
 * (`done`, `current`) or leaves it grey (`todo`), and a reader hears the
 * status in words. Vertical by default, `horizontal` for a few steps across ;
 * `compact` puts everything on one side, which is what a phone wants, and
 * `responsive` does it below `md` only.
 *
 * A time given as an ISO string or a `Date` is written in the language on
 * screen (`useDateFormat`, `timePattern`) inside a `<time>` ; a node is
 * shown as it is.
 *
 * @module components/timeline/Timeline
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - The list's name. Defaults to the bundle's « Timeline ».
 * @param {boolean} [props.box=true] - Entries in `timeline-box` cards ; `false` for bare text, the shape of a journal.
 * @param {React.ReactNode} [props.children] - `TimelineItem`s, when `items` is not given.
 * @param {string} [props.className]
 * @param {import('../../themes/components/timeline').TimelineColor} [props.color='primary'] - The colour of done and current entries, unless an item says otherwise.
 * @param {boolean} [props.compact=false] - Everything on one side of the line.
 * @param {Function} [props.formatTime] - `( value ) => React.ReactNode`, in place of the language's own formatting.
 * @param {Array<Object>} [props.items] - `{ id , title , description , time , icon , color , status , side , start , end , href , onClick , box , className }`.
 * @param {import('../../themes/components/timeline').TimelineOrientation} [props.orientation='vertical']
 * @param {string} [props.path='components.timeline'] - i18n path the words are read from.
 * @param {boolean} [props.responsive=false] - Compact below `md`.
 * @param {'start'|'end'|'alternate'} [props.side='end'] - Where the titles go : one side, or alternating as daisyUI's examples do.
 * @param {boolean} [props.snapIcon=false] - Icons at the start of entries rather than their middle.
 * @param {string} [props.timePattern='LLL'] - The date pattern of `useDateFormat` for times given as strings or dates.
 *
 * @example
 * ```jsx
 * <Timeline
 *     items={[
 *         { id : 'ordered'   , status : 'done'    , time : '2026-10-10T09:12' , title : 'Ordered' } ,
 *         { id : 'shipped'   , status : 'done'    , time : '2026-10-11T16:40' , title : 'Shipped' } ,
 *         { id : 'delivery'  , status : 'current' , title : 'Out for delivery' } ,
 *         { id : 'delivered' , title : 'Delivered' } ,
 *     ]}
 * />
 * ```
 */

import { Children , cloneElement , isValidElement } from 'react' ;

import TimelineItem from './TimelineItem' ;

import useDateFormat from '../../hooks/useDateFormat' ;

import getTimelineClasses from '../../themes/components/timeline' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

const isDateLike = value => value instanceof Date || ( typeof value === 'string' && !Number.isNaN( Date.parse( value ) ) ) ;

const Timeline =
({
    ariaLabel ,
    box = true ,
    children ,
    className ,
    color = 'primary' ,
    compact = false ,
    formatTime ,
    items ,
    orientation = 'vertical' ,
    path = 'components.timeline' ,
    responsive = false ,
    side = 'end' ,
    snapIcon = false ,
    timePattern = 'LLL' ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const { formatDate } = useDateFormat() ;

    const clock = value =>
    {
        if ( value === undefined || value === null ) return { time : undefined , timeValue : undefined } ;
        if ( formatTime ) return { time : formatTime( value ) , timeValue : isDateLike( value ) ? new Date( value ).toISOString() : undefined } ;
        if ( isDateLike( value ) ) return { time : formatDate( value , { pattern : timePattern } ) , timeValue : new Date( value ).toISOString() } ;
        return { time : value , timeValue : undefined } ;
    } ;

    const sideOf = index => ( side === 'alternate' ? ( index % 2 === 0 ? 'start' : 'end' ) : side ) ;

    let content ;

    if ( Array.isArray( items ) )
    {
        content = items.map( ( item , index ) =>
        {
            const { id , time , ...rest } = item ?? {} ;

            return (
                <TimelineItem
                    box    = { box }
                    color  = { color }
                    first  = { index === 0 }
                    key    = { id ?? index }
                    labels = { labels }
                    last   = { index === items.length - 1 }
                    side    = { sideOf( index ) }
                    stacked = { compact }
                    { ...clock( time ) }
                    { ...rest }
                />
            ) ;
        } ) ;
    }
    else
    {
        const list = Children.toArray( children ).filter( isValidElement ) ;

        content = list.map( ( child , index ) => cloneElement( child ,
        {
            box    : child.props.box ?? box ,
            color  : child.props.color ?? color ,
            first  : index === 0 ,
            labels ,
            last   : index === list.length - 1 ,
            side    : child.props.side ?? sideOf( index ) ,
            stacked : compact ,
            ...clock( child.props.time ) ,
        } ) ) ;
    }

    return (
        <ul aria-label={ ariaLabel ?? labels.label } className={ getTimelineClasses( { className , compact , orientation , responsive , snapIcon } ) }>
            { content }
        </ul>
    ) ;
} ;

Timeline.displayName = 'Timeline' ;

export default Timeline ;
