/**
 * Scheduler class name generators.
 *
 * Shared by the shell, its toolbar and every view : the agenda now, the month
 * grid, the time grid and the resource timeline later. What an event looks like
 * is decided in one place, so a chip in a month cell and a row in an agenda read
 * as the same object seen from two distances.
 *
 * @module themes/components/scheduler
 */

import cn from '../helpers/cn' ;

/** Root of the component. */
export const SCHEDULER = 'flex flex-col gap-3 w-full' ;

/** Navigation and view switching, above the view. */
export const SCHEDULER_TOOLBAR = 'flex flex-wrap items-center gap-2' ;

/** The label naming the span being looked at. */
export const SCHEDULER_PERIOD = 'text-lg font-semibold first-letter:uppercase' ;

/**
 * The agenda, as a column of day groups.
 *
 * It declares a **container**, and its rows answer to that rather than to the
 * viewport. The width that matters to an agenda is its own : the same component
 * sits full-width on a phone, in a 360-pixel panel beside a desktop layout, and
 * in a narrow sidebar — and all three want the same treatment for the same
 * reason. A viewport breakpoint would give the phone the right one and the other
 * two the wrong one.
 */
export const SCHEDULER_AGENDA = '@container flex flex-col gap-4' ;

/** One day of the agenda. */
export const SCHEDULER_AGENDA_DAY = 'flex flex-col gap-2' ;

/**
 * The date heading a day group.
 *
 * It carries its own bottom margin rather than leaning on the group's gap : a
 * date needs more air under it than two rows need between them, otherwise the
 * heading reads as belonging to the first event rather than to all of them.
 */
export const SCHEDULER_AGENDA_DAY_HEADER = 'flex items-baseline gap-2 mb-1 text-sm font-semibold first-letter:uppercase' ;

/** Today's heading, so the eye finds it without counting. */
export const SCHEDULER_AGENDA_DAY_TODAY = 'text-primary' ;

/**
 * One row : the time beside the event, or above it.
 *
 * Given room across, the times sit in a fixed gutter — that is what lets the eye
 * run down a column of start times without reading anything else. Narrow, that
 * gutter is not affordable : sixty-four pixels of it plus the gap is a sixth of a
 * phone, and what pays for it is the title, the one thing the row exists to show.
 * So below `@md` the time moves onto its own line above the card. It costs a line
 * and buys back the whole width.
 */
export const SCHEDULER_AGENDA_ROW = 'flex flex-col gap-0.5 @md:flex-row @md:items-stretch @md:gap-3' ;

/**
 * The time : a full-width line when the agenda is narrow, a fixed right-aligned
 * gutter once it is wide enough to spare one.
 *
 * The two bounds read as `18:00 – 20:00` on one line when stacked, and split in
 * two when the gutter is all there is — see the break in `SchedulerAgenda`, which
 * is toggled by the same container query.
 */
export const SCHEDULER_AGENDA_TIME = 'w-full shrink-0 ps-1 text-start @md:w-16 @md:ps-0 @md:pt-1 @md:text-end font-mono text-xs tabular-nums text-base-content/70' ;

/**
 * An event, as a card in a list.
 *
 * `rounded-field` rather than `rounded-box` : the theme gives three radii, and the
 * one for boxes is meant for a card or a modal. An event is closer to a field —
 * it is what buttons, inputs and tabs use, and what `Calendar` already gives its
 * day cells. Either way the value comes from the theme, so a rounder theme rounds
 * these too.
 */
export const SCHEDULER_EVENT = 'flex-1 min-w-0 rounded-field border border-base-300 border-s-4 px-3 py-2' ;

/** The same event, once it is over. */
export const SCHEDULER_EVENT_PAST = 'opacity-75' ;

/** A cancelled event : struck through, the way a blackout day is in the calendar. */
export const SCHEDULER_EVENT_CANCELLED = 'line-through' ;

/** A postponed event : still there, no longer firm. */
export const SCHEDULER_EVENT_POSTPONED = 'border-dashed' ;

/** Said of an event whose span runs past the day it is drawn in. */
export const SCHEDULER_EVENT_CONTINUES = 'text-base-content/60' ;

/**
 * The month grid.
 *
 * A container, like the agenda : seven columns need roughly 90 pixels each before
 * a title is worth printing, and below that the cells show density instead. What
 * decides is the grid's own width, never the window's.
 */
export const SCHEDULER_MONTH = '@container flex flex-col' ;

/** The weekday header row. */
export const SCHEDULER_MONTH_WEEKDAYS = 'grid grid-cols-7 border-b border-base-300' ;

/** One weekday name. */
export const SCHEDULER_MONTH_WEEKDAY = 'truncate px-1 py-1.5 text-center text-xs font-semibold uppercase text-base-content/70' ;

/** One week row. */
export const SCHEDULER_MONTH_WEEK = 'grid grid-cols-7' ;

/** One day cell. */
export const SCHEDULER_MONTH_CELL = 'flex min-h-14 flex-col gap-0.5 border-b border-e border-base-300 p-1 text-start @2xl:min-h-24' ;

/** A cell of the previous or next month — present for the grid's sake, not for its own. */
export const SCHEDULER_MONTH_CELL_OUTSIDE = 'bg-base-200/70' ;

/** The cell the reader is most likely looking for. */
export const SCHEDULER_MONTH_CELL_TODAY = 'bg-primary/10' ;

/** The day number. */
export const SCHEDULER_MONTH_DAYNUM = 'px-0.5 text-xs font-medium tabular-nums text-base-content/80' ;

/** Today's number, marked the way the calendar marks it. */
export const SCHEDULER_MONTH_DAYNUM_TODAY = 'inline-flex size-5 items-center justify-center rounded-full bg-primary font-semibold text-primary-content' ;

/** The number of a day outside the month. */
export const SCHEDULER_MONTH_DAYNUM_OUTSIDE = 'text-base-content/50' ;

/**
 * Height of one rail, in pixels : the chip's `leading-5` plus the `gap-y-0.5`
 * between two of them.
 *
 * It is a number rather than a class because the cells have to **reserve** the
 * space the rails take — the rails are an overlay, and a layout that lets them
 * float over the day numbers is the classic way a month grid ends up unreadable.
 * Kept next to the classes it is derived from, so the two move together.
 */
export const MONTH_RAIL_HEIGHT = 22 ;

/** Height reserved above the rails for the day number. */
export const MONTH_HEADER_HEIGHT = 24 ;

/** The rails, laid over the seven columns of a week. */
export const SCHEDULER_MONTH_RAILS = 'pointer-events-none absolute inset-x-0 top-6 grid grid-cols-7 gap-y-0.5 px-1' ;

/** « +2 more ». */
export const SCHEDULER_MONTH_MORE = 'w-full truncate rounded-field px-1 text-start text-xs font-medium text-base-content/70 hover:bg-base-300' ;

/** The dots standing in for the chips when the grid is too narrow to name anything. */
export const SCHEDULER_MONTH_DOTS = 'flex flex-wrap gap-0.5 px-0.5 @2xl:hidden' ;

/** One dot. */
export const SCHEDULER_MONTH_DOT = 'size-1.5 rounded-full' ;

/** An event as a chip : one line, in a cell, sized by its span. */
export const SCHEDULER_EVENT_CHIP = 'pointer-events-auto flex min-w-0 items-center rounded-field border-s-2' ;

/**
 * The two sizes a chip comes in.
 *
 * `sm` is calibrated for a month cell, where the rail height is fixed and every
 * pixel is contested. `md` is for a list — the day popover, and the editor later —
 * where the same text at the cell's size is simply too small to read, especially
 * on the phone where that list takes the whole screen.
 */
export const chipSizeMap =
{
    sm : 'gap-1 px-1 text-xs leading-5' ,
    md : 'gap-2 px-2 py-1 text-sm leading-6' ,
} ;

/** The sizes {@link chipSizeMap} covers. */
export const chipSizes = Object.keys( chipSizeMap ) ;

/** A chip whose event started before the row it is drawn in. */
export const SCHEDULER_EVENT_CHIP_FROM = 'rounded-s-none border-s-0' ;

/** A chip whose event runs past the row it is drawn in. */
export const SCHEDULER_EVENT_CHIP_TO = 'rounded-e-none' ;

/**
 * The time grid — one column per day, hours down the side.
 *
 * A container again : seven columns of events need width, and what decides is
 * the grid's own. Below it the columns keep a floor and the area scrolls
 * sideways, because squeezing seven days into a phone does not make a week
 * readable — it makes it wrong.
 */
export const SCHEDULER_TIMEGRID = '@container flex flex-col overflow-hidden rounded-box border border-base-300' ;

/** The row naming the days, above everything and outside the scroll. */
export const SCHEDULER_TIMEGRID_HEAD = 'flex border-b border-base-300 bg-base-100' ;

/** The all-day band, between the day names and the hours. */
export const SCHEDULER_TIMEGRID_ALLDAY = 'flex border-b border-base-300 bg-base-100' ;

/** The scrolling part : the hours. */
export const SCHEDULER_TIMEGRID_BODY = 'flex overflow-y-auto overflow-x-auto' ;

/** The hour gutter, on the inline-start edge of every row. */
export const SCHEDULER_TIMEGRID_GUTTER = 'relative w-14 shrink-0 border-e border-base-300 bg-base-100' ;

/** One hour label, hung on its own line. */
export const SCHEDULER_TIMEGRID_HOUR = 'absolute end-1 -translate-y-1/2 font-mono text-xs tabular-nums text-base-content/70' ;

/** The columns, side by side. */
export const SCHEDULER_TIMEGRID_COLUMNS = 'relative flex flex-1' ;

/** One day column. */
export const SCHEDULER_TIMEGRID_COLUMN = 'relative min-w-24 flex-1 border-e border-base-200 last:border-e-0' ;

/** A column standing for a day off. */
export const SCHEDULER_TIMEGRID_COLUMN_WEEKEND = 'bg-base-200/40' ;

/** A line at the hour. */
export const SCHEDULER_TIMEGRID_LINE = 'pointer-events-none absolute inset-x-0 border-t border-base-300' ;

/** A line at the half hour — present, and quieter. */
export const SCHEDULER_TIMEGRID_LINE_HALF = 'pointer-events-none absolute inset-x-0 border-t border-base-200' ;

/** The day name and number, above a column. */
export const SCHEDULER_TIMEGRID_DAY = 'flex min-w-24 flex-1 flex-col items-center border-e border-base-200 py-1 last:border-e-0' ;

/** The weekday, above its number. */
export const SCHEDULER_TIMEGRID_DAY_NAME = 'text-xs font-medium uppercase text-base-content/70' ;

/** The day number. */
export const SCHEDULER_TIMEGRID_DAY_NUMBER = 'text-base font-semibold tabular-nums' ;

/** Today's number, marked as it is everywhere else. */
export const SCHEDULER_TIMEGRID_DAY_TODAY = 'inline-flex size-7 items-center justify-center rounded-full bg-primary text-primary-content' ;

/**
 * An event, placed on the axis.
 *
 * Carries neither padding nor leading : both belong to the block's *mode*, and
 * a mode class is appended after this one so it wins the cascade.
 */
export const SCHEDULER_TIMEGRID_EVENT = 'absolute overflow-hidden rounded-field border-s-4 px-1.5 text-xs' ;

/**
 * Height, in pixels, a card needs before its title and its span can sit on two
 * lines : two lines of `text-xs` at `leading-tight` plus the padding.
 *
 * Below it the card goes to one line, because **a card too short for what it
 * prints does not overflow — it cuts a line of text in half**, which is how a
 * half-hour slot at the default zoom ends up unreadable. The threshold is in
 * pixels rather than in minutes on purpose : what decides is the room there is,
 * and the same half hour is comfortable at 96 px an hour.
 */
export const TIMEGRID_STACKED_HEIGHT = 34 ;

/** A card with the room for its title over its span. */
export const SCHEDULER_TIMEGRID_EVENT_STACKED = 'py-0.5 leading-tight' ;

/**
 * A card that has room for one line : the title, and the start time after it.
 *
 * The line is **centred** rather than hung from the top. A stacked card fills its
 * own height, so where its text starts is where the event starts ; a single line
 * in a card twice its height only looks dropped in.
 */
export const SCHEDULER_TIMEGRID_EVENT_COMPACT = 'flex items-center py-0 leading-none' ;

/** The line itself, inside a compact card : the two texts share a baseline. */
export const SCHEDULER_TIMEGRID_EVENT_LINE = 'flex w-full min-w-0 items-baseline gap-1' ;

/**
 * An event that answers to a drag.
 *
 * Deliberately **without** `touch-none` : a finger has to be able to scroll the
 * grid, and a surface that refuses to scroll wherever an event happens to sit
 * makes a busy day unreachable. The scroll is refused later, once the long press
 * has said this is a drag — see {@link module:hooks/usePointerDrag}.
 */
export const SCHEDULER_TIMEGRID_EVENT_MOVABLE = 'cursor-grab select-none' ;

/** The block left behind at the position a drag started from. */
export const SCHEDULER_TIMEGRID_EVENT_GHOST = 'opacity-40' ;

/** The block following the pointer : above everything, and never a target itself. */
export const SCHEDULER_TIMEGRID_EVENT_DRAGGING = 'pointer-events-none z-30 cursor-grabbing shadow-lg ring-2 ring-base-content/20' ;

/** The line saying where now is. */
export const SCHEDULER_NOW = 'pointer-events-none absolute inset-x-0 z-20 border-t-2 border-error' ;

/** The dot anchoring that line to the inline-start edge. */
export const SCHEDULER_NOW_DOT = 'absolute -start-1 -top-1.5 size-2.5 rounded-full bg-error' ;

/**
 * DaisyUI tokens an event can be tinted with.
 *
 * **The text is never the token's colour.** A theme only guarantees a contrast
 * within its own pairs : `base-content` reads on the `base-*` surfaces, and
 * `<token>-content` reads on `<token>`. Nothing promises that `text-warning` is
 * legible on a wash of `warning` — and it is not, in either theme, which is how a
 * calendar ends up with events one has to squint at.
 *
 * So the hue lives where it cannot hurt : a 20 % wash for the fill and the
 * inline-start rule at full strength, which is what actually carries the colour
 * at a glance. The label stays `base-content`, on a surface still close enough to
 * `base-100` for that to hold.
 *
 * Each entry is a whole literal, so the three parts can never disagree and the
 * scanner always sees them.
 *
 * @safelist bg-primary/20 border-s-primary
 * @safelist bg-secondary/20 border-s-secondary
 * @safelist bg-accent/20 border-s-accent
 * @safelist bg-info/20 border-s-info
 * @safelist bg-success/20 border-s-success
 * @safelist bg-warning/20 border-s-warning
 * @safelist bg-error/20 border-s-error
 * @safelist bg-neutral/20 border-s-neutral
 */
export const colorMap =
{
    primary   : 'bg-primary/20 border-s-primary text-base-content' ,
    secondary : 'bg-secondary/20 border-s-secondary text-base-content' ,
    accent    : 'bg-accent/20 border-s-accent text-base-content' ,
    info      : 'bg-info/20 border-s-info text-base-content' ,
    success   : 'bg-success/20 border-s-success text-base-content' ,
    warning   : 'bg-warning/20 border-s-warning text-base-content' ,
    error     : 'bg-error/20 border-s-error text-base-content' ,
    neutral   : 'bg-neutral/20 border-s-neutral text-base-content' ,
} ;

/** The tokens {@link colorMap} covers. */
export const colors = Object.keys( colorMap ) ;

/** Used when an event names no color of its own — visible on a `base-100` surface. */
export const DEFAULT_EVENT_COLOR = 'bg-base-200 border-s-base-content/40 text-base-content' ;

/**
 * Resolves an event color into classes, or into an inline style when it is not a
 * DaisyUI token.
 *
 * @param {string} [color] - A token from {@link colors}, or any CSS color.
 * @returns {{ definition: Object, style: Object|undefined }}
 *
 * @example
 * resolveEventColor( 'primary' )
 * // → { definition : { 'bg-primary/10 border-s-primary text-primary' : true } , style : undefined }
 *
 * resolveEventColor( '#7B1E3A' )
 * // → { definition : {} , style : { backgroundColor : 'color-mix(…)' , … } }
 */
export const resolveEventColor = ( color ) =>
{
    if ( !color )
    {
        return { definition : { [ DEFAULT_EVENT_COLOR ] : true } , style : undefined } ;
    }

    if ( color in colorMap )
    {
        return { definition : { [ colorMap[ color ] ] : true } , style : undefined } ;
    }

    return {
        definition : {} ,
        style :
        {
            backgroundColor        : `color-mix(in oklab, ${ color } 12%, transparent)` ,
            borderInlineStartColor : color ,
            color ,
        } ,
    } ;
} ;

/**
 * Generates the className for the scheduler root.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 */
export const getSchedulerClasses = ({ after , before , beforeClassName , className } = {} ) =>
    cn( beforeClassName , SCHEDULER , { ...before , ...after } , className ) ;

/**
 * Generates the className for the toolbar.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 */
export const getSchedulerToolbarClasses = ({ className } = {} ) => cn( SCHEDULER_TOOLBAR , className ) ;

/**
 * Generates the className for the agenda view.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 */
export const getAgendaClasses = ({ className } = {} ) => cn( SCHEDULER_AGENDA , className ) ;

/**
 * Generates the className for a day group of the agenda.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 */
export const getAgendaDayClasses = ({ className } = {} ) => cn( SCHEDULER_AGENDA_DAY , className ) ;

/**
 * Generates the className for the heading of a day group.
 *
 * @param {Object} [props]
 * @param {boolean} [props.today] - The group is today's.
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 */
export const getAgendaDayHeaderClasses = ({ today , className } = {} ) => cn
(
    SCHEDULER_AGENDA_DAY_HEADER ,
    { ...today && { [ SCHEDULER_AGENDA_DAY_TODAY ] : true } } ,
    className ,
) ;

/**
 * Generates the className for one row of the agenda.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @returns {string}
 */
export const getAgendaRowClasses = ({ className } = {} ) => cn( SCHEDULER_AGENDA_ROW , className ) ;

/**
 * Generates the className of an event card, and the inline style a free color needs.
 *
 * @param {Object} [props]
 * @param {Object} [props.after] - Class definitions to append.
 * @param {Object} [props.before] - Class definitions to prepend.
 * @param {string} [props.beforeClassName] - ClassName to prepend.
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - A token from {@link colors}, or any CSS color.
 * @param {boolean} [props.dragging] - The card is the one following the pointer.
 * @param {boolean} [props.ghost] - The card is the trace left where a drag began.
 * @param {boolean} [props.movable] - The card answers to a drag.
 * @param {boolean} [props.past] - The event is over.
 * @param {string} [props.status] - One of the statuses of a normalized record.
 * @returns {{ className: string, style: Object|undefined }}
 *
 * @example
 * const { className , style } = getSchedulerEventClasses({ color : 'primary' , status : 'cancelled' }) ;
 */
export const getSchedulerEventClasses = ({ after , before , beforeClassName , className , color , dragging , ghost , movable , past , status } = {} ) =>
{
    const { definition , style } = resolveEventColor( color ) ;

    return {
        className : cn
        (
            beforeClassName ,
            SCHEDULER_EVENT ,
            {
                ...before ,
                ...definition ,
                ...past && { [ SCHEDULER_EVENT_PAST ] : true } ,
                ...status === 'cancelled' && { [ SCHEDULER_EVENT_CANCELLED ] : true } ,
                ...status === 'postponed' && { [ SCHEDULER_EVENT_POSTPONED ] : true } ,
                ...movable && { [ SCHEDULER_TIMEGRID_EVENT_MOVABLE ] : true } ,
                ...ghost && { [ SCHEDULER_TIMEGRID_EVENT_GHOST ] : true } ,
                ...dragging && { [ SCHEDULER_TIMEGRID_EVENT_DRAGGING ] : true } ,
                ...after ,
            } ,
            className ,
        ) ,
        style ,
    } ;
} ;

/**
 * Generates the className of an event chip, and the inline style a free color needs.
 *
 * The chip is the compact form of an event — a month cell, an all-day band, a
 * timeline row. It shares its colour resolution with the card, so the same event
 * reads as the same object whether it is a row in an agenda or a bar in a grid.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @param {string} [props.color] - A token from {@link colors}, or any CSS color.
 * @param {boolean} [props.continuesBefore] - The event started before this row.
 * @param {boolean} [props.continuesAfter] - The event runs past this row.
 * @param {boolean} [props.past] - The event is over.
 * @param {'sm'|'md'} [props.size='sm'] - `sm` for a month cell, `md` for a list.
 * @param {string} [props.status] - One of the statuses of a normalized record.
 * @returns {{ className: string, style: Object|undefined }}
 */
export const getSchedulerChipClasses = ({ className , color , continuesBefore , continuesAfter , past , size = 'sm' , status } = {} ) =>
{
    const { definition , style } = resolveEventColor( color ) ;

    return {
        className : cn
        (
            SCHEDULER_EVENT_CHIP ,
            chipSizeMap[ size ] ?? chipSizeMap.sm ,
            {
                ...definition ,
                // A bar cut at a row edge loses the corner and the rule on that side,
                // so the eye reads one span across two rows rather than two events.
                ...continuesBefore && { [ SCHEDULER_EVENT_CHIP_FROM ] : true } ,
                ...continuesAfter && { [ SCHEDULER_EVENT_CHIP_TO ] : true } ,
                ...past && { [ SCHEDULER_EVENT_PAST ] : true } ,
                ...status === 'cancelled' && { [ SCHEDULER_EVENT_CANCELLED ] : true } ,
                ...status === 'postponed' && { [ SCHEDULER_EVENT_POSTPONED ] : true } ,
            } ,
            className ,
        ) ,
        style ,
    } ;
} ;

/**
 * Generates the className of a month day cell.
 *
 * @param {Object} [props]
 * @param {string} [props.className] - ClassName to append.
 * @param {boolean} [props.outside] - The day belongs to a neighbouring month.
 * @param {boolean} [props.today] - The day is today.
 * @returns {string}
 */
export const getMonthCellClasses = ({ className , outside , today } = {} ) => cn
(
    SCHEDULER_MONTH_CELL ,
    {
        ...outside && { [ SCHEDULER_MONTH_CELL_OUTSIDE ] : true } ,
        ...today && { [ SCHEDULER_MONTH_CELL_TODAY ] : true } ,
    } ,
    className ,
) ;

/**
 * Generates the className of a month day number.
 *
 * @param {Object} [props]
 * @param {boolean} [props.outside] - The day belongs to a neighbouring month.
 * @param {boolean} [props.today] - The day is today.
 * @returns {string}
 */
export const getMonthDayNumberClasses = ({ outside , today } = {} ) => cn
(
    SCHEDULER_MONTH_DAYNUM ,
    {
        ...today && { [ SCHEDULER_MONTH_DAYNUM_TODAY ] : true } ,
        ...outside && !today && { [ SCHEDULER_MONTH_DAYNUM_OUTSIDE ] : true } ,
    } ,
) ;

export default getSchedulerClasses ;
