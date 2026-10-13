/**
 * Timeline class name generator for daisyUI 5.
 *
 * A timeline is a list of moments on a line : each entry an icon on the
 * line, something before it and something after. daisyUI lays it out in
 * CSS alone ; this names the classes.
 *
 * @module themes/components/timeline
 * @see https://daisyui.com/components/timeline
 *
 * @safelist
 * - timeline timeline-vertical timeline-horizontal timeline-compact timeline-snap-icon
 * - max-md:timeline-compact
 * - timeline-start timeline-middle timeline-end timeline-box
 * - bg-primary bg-secondary bg-accent bg-neutral bg-info bg-success bg-warning bg-error
 * - text-primary text-secondary text-accent text-neutral text-info text-success text-warning text-error
 * - ring-primary ring-secondary ring-accent ring-neutral ring-info ring-success ring-warning ring-error
 */

import cn from '../helpers/cn' ;

export const TIMELINE            = 'timeline' ;
export const TIMELINE_VERTICAL   = 'timeline-vertical' ;
export const TIMELINE_HORIZONTAL = 'timeline-horizontal' ;
export const TIMELINE_COMPACT    = 'timeline-compact' ;
export const TIMELINE_SNAP_ICON  = 'timeline-snap-icon' ;
export const TIMELINE_START      = 'timeline-start' ;
export const TIMELINE_MIDDLE     = 'timeline-middle' ;
export const TIMELINE_END        = 'timeline-end' ;
export const TIMELINE_BOX        = 'timeline-box' ;

/**
 * @typedef {'vertical'|'horizontal'} TimelineOrientation
 * @typedef {'done'|'current'|'todo'} TimelineStatus
 * @typedef {'primary'|'secondary'|'accent'|'neutral'|'info'|'success'|'warning'|'error'} TimelineColor
 */

/** The line segment and the icon of an entry that is done or current, per colour. */
export const LINE_COLORS =
{
    accent    : 'bg-accent' ,
    error     : 'bg-error' ,
    info      : 'bg-info' ,
    neutral   : 'bg-neutral' ,
    primary   : 'bg-primary' ,
    secondary : 'bg-secondary' ,
    success   : 'bg-success' ,
    warning   : 'bg-warning' ,
} ;

export const ICON_COLORS =
{
    accent    : 'text-accent' ,
    error     : 'text-error' ,
    info      : 'text-info' ,
    neutral   : 'text-neutral' ,
    primary   : 'text-primary' ,
    secondary : 'text-secondary' ,
    success   : 'text-success' ,
    warning   : 'text-warning' ,
} ;

export const RING_COLORS =
{
    accent    : 'ring-accent' ,
    error     : 'ring-error' ,
    info      : 'ring-info' ,
    neutral   : 'ring-neutral' ,
    primary   : 'ring-primary' ,
    secondary : 'ring-secondary' ,
    success   : 'ring-success' ,
    warning   : 'ring-warning' ,
} ;

/**
 * The classes of the list.
 *
 * @param {Object} [props]
 * @param {string} [props.className]
 * @param {boolean} [props.compact=false] - Everything on one side of the line.
 * @param {TimelineOrientation} [props.orientation='vertical']
 * @param {boolean} [props.responsive=false] - Compact below `md`, two sides above.
 * @param {boolean} [props.snapIcon=false] - The icon snaps to the start of the entry rather than its middle.
 * @returns {string}
 */
export const getTimelineClasses = ( { className , compact = false , orientation = 'vertical' , responsive = false , snapIcon = false } = {} ) => cn(
    TIMELINE ,
    orientation === 'horizontal' ? TIMELINE_HORIZONTAL : TIMELINE_VERTICAL ,
    compact && TIMELINE_COMPACT ,
    responsive && !compact && 'max-md:timeline-compact' ,
    snapIcon && TIMELINE_SNAP_ICON ,
    className ,
) ;

export default getTimelineClasses ;
