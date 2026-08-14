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
export const SCHEDULER_AGENDA_TIME = 'w-full shrink-0 ps-1 text-start @md:w-16 @md:ps-0 @md:pt-1 @md:text-end font-mono text-xs tabular-nums text-base-content/60' ;

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
export const SCHEDULER_EVENT_PAST = 'opacity-60' ;

/** A cancelled event : struck through, the way a blackout day is in the calendar. */
export const SCHEDULER_EVENT_CANCELLED = 'line-through' ;

/** A postponed event : still there, no longer firm. */
export const SCHEDULER_EVENT_POSTPONED = 'border-dashed' ;

/** Said of an event whose span runs past the day it is drawn in. */
export const SCHEDULER_EVENT_CONTINUES = 'text-base-content/50' ;

/**
 * DaisyUI tokens an event can be tinted with.
 *
 * Each entry is a whole literal — a background tint, the inline-start rule and
 * the text, kept together so the three can never disagree. Anything else goes
 * through an inline style : `color-mix` builds the tint from the given color, so
 * a hex or an `oklch()` behaves like a token.
 *
 * @safelist bg-primary/10 border-s-primary text-primary
 * @safelist bg-secondary/10 border-s-secondary text-secondary
 * @safelist bg-accent/10 border-s-accent text-accent
 * @safelist bg-info/10 border-s-info text-info
 * @safelist bg-success/10 border-s-success text-success
 * @safelist bg-warning/10 border-s-warning text-warning
 * @safelist bg-error/10 border-s-error text-error
 * @safelist bg-neutral/10 border-s-neutral text-neutral
 */
export const colorMap =
{
    primary   : 'bg-primary/10 border-s-primary text-primary' ,
    secondary : 'bg-secondary/10 border-s-secondary text-secondary' ,
    accent    : 'bg-accent/10 border-s-accent text-accent' ,
    info      : 'bg-info/10 border-s-info text-info' ,
    success   : 'bg-success/10 border-s-success text-success' ,
    warning   : 'bg-warning/10 border-s-warning text-warning' ,
    error     : 'bg-error/10 border-s-error text-error' ,
    neutral   : 'bg-neutral/10 border-s-neutral text-neutral' ,
} ;

/** The tokens {@link colorMap} covers. */
export const colors = Object.keys( colorMap ) ;

/** Used when an event names no color of its own. */
export const DEFAULT_EVENT_COLOR = 'bg-base-100 border-s-base-content/30' ;

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
 * @param {boolean} [props.past] - The event is over.
 * @param {string} [props.status] - One of the statuses of a normalized record.
 * @returns {{ className: string, style: Object|undefined }}
 *
 * @example
 * const { className , style } = getSchedulerEventClasses({ color : 'primary' , status : 'cancelled' }) ;
 */
export const getSchedulerEventClasses = ({ after , before , beforeClassName , className , color , past , status } = {} ) =>
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
                ...after ,
            } ,
            className ,
        ) ,
        style ,
    } ;
} ;

export default getSchedulerClasses ;
