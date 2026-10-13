/**
 * The looks of a `CellGrid`'s cells : a light ground and a border in the
 * colour of the cell's state, readable in both themes, the text staying the
 * theme's — a token colour never goes on text.
 *
 * @module themes/components/cellGrid
 *
 * @safelist
 * - bg-primary/20 bg-secondary/20 bg-accent/20 bg-neutral/20 bg-info/20 bg-success/20 bg-warning/20 bg-error/20
 * - border-primary border-secondary border-accent border-neutral border-info border-success border-warning border-error
 * - bg-primary bg-secondary bg-accent bg-neutral bg-info bg-success bg-warning bg-error
 */

/**
 * @typedef {'primary'|'secondary'|'accent'|'neutral'|'info'|'success'|'warning'|'error'} CellColor
 */

/** The cell's ground and border, per colour. */
export const CELL_COLORS =
{
    accent    : 'bg-accent/20 border-accent' ,
    error     : 'bg-error/20 border-error' ,
    info      : 'bg-info/20 border-info' ,
    neutral   : 'bg-neutral/20 border-neutral' ,
    primary   : 'bg-primary/20 border-primary' ,
    secondary : 'bg-secondary/20 border-secondary' ,
    success   : 'bg-success/20 border-success' ,
    warning   : 'bg-warning/20 border-warning' ,
} ;

/** The legend's swatch, per colour. */
export const SWATCH_COLORS =
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

/** A cell with no state, or a state the map does not name. */
export const CELL_PLAIN = 'bg-base-200 border-base-300' ;

export const CELL_BASE     = 'absolute flex flex-col items-center justify-center overflow-hidden rounded-box border text-xs leading-tight text-base-content select-none' ;
export const CELL_SELECTED = 'ring-2 ring-primary ring-offset-2 ring-offset-base-100' ;
export const CELL_DISABLED = 'cursor-not-allowed opacity-70' ;
export const CELL_ACTIVE   = 'cursor-pointer hover:brightness-95 focus-visible:outline-2 focus-visible:outline-primary' ;
