'use client' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { getSchedulerChipClasses } from '../../themes/components/scheduler' ;

/**
 * An event in its compact form : one line, coloured, truncated.
 *
 * The shared chip of every view that places events rather than listing them — a
 * month cell today, the all-day band of the time grid and the rows of the
 * resource timeline later. Keeping it one component is what makes the same event
 * read as the same object seen from three distances.
 *
 * A chip cut at the edge of a week row loses its corner and its rule on that
 * side, so a bar crossing a Sunday reads as one span over two rows and not as two
 * events.
 *
 * @module components/scheduler/SchedulerEvent
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes for the chip.
 * @param {boolean} [props.continuesAfter=false] - The event runs past the row it is drawn in.
 * @param {boolean} [props.continuesBefore=false] - The event started before that row.
 * @param {import('../../helpers/schedule/normalizeEvent').ScheduleEvent} props.event - The record to draw.
 * @param {(event: Object) => void} [props.onSelect] - Called with the record when the chip is activated.
 * @param {'sm'|'md'} [props.size='sm'] - `sm` for a month cell, `md` for a list — the day popover, where the cell's size is simply too small to read.
 * @param {boolean} [props.showTime=true] - Prefix the title with the start time. Ignored for an all-day event, and by a bar continuing from the previous row — where the time shown would not be the one the event starts at.
 */
const SchedulerEvent =
({
    className ,
    continuesAfter = false ,
    continuesBefore = false ,
    event ,
    onSelect ,
    size = 'sm' ,
    showTime = true ,
    ...rest
}) =>
{
    if ( !event )
    {
        return null ;
    }

    const { className : chipClassName , style } = getSchedulerChipClasses
    ({
        className ,
        color  : event.color ,
        continuesAfter ,
        continuesBefore ,
        past   : event.end <= Date.now() ,
        size ,
        status : event.status ,
    }) ;

    const withTime = showTime && !event.allDay && !continuesBefore ;

    const content = (
        <>
            { withTime && (
                <span className="shrink-0 font-mono text-[0.9em] tabular-nums opacity-80">
                    { dayjs( event.start ).format( 'HH:mm' ) }
                </span>
            ) }
            <span className="truncate">{ event.title }</span>
        </>
    ) ;

    // A chip that does nothing should not answer to a keyboard or announce itself
    // as a control — only the ones a view made interactive become buttons.
    if ( !onSelect )
    {
        return (
            <span className={ chipClassName } style={ style } { ...rest }>
                { content }
            </span>
        ) ;
    }

    return (
        <button
            type      = "button"
            className = { chipClassName }
            style     = { style }
            onClick   = { () => onSelect( event ) }
            { ...rest }
        >
            { content }
        </button>
    ) ;
} ;

SchedulerEvent.displayName = 'SchedulerEvent' ;

export default SchedulerEvent ;
