/**
 * Arrow component for tooltips/popovers.
 *
 * @module components/Arrow
 *
 * @example
 * ```jsx
 * // Default arrow
 * <Arrow align="start" position="bottom" />
 *
 * // Colored arrows
 * <Arrow align="start" position="bottom" color="primary" />
 * <Arrow align="end" position="top" color="error" />
 * <Arrow align="start" position="bottom" color="neutral" />
 * ```
 */

import cn from '../themes/helpers/cn' ;

const arrowBaseClasses = 'absolute z-20 h-4 w-4 border-l border-t' ;

const alignMap =
{
    start : 'left-[1.2rem]' ,
    end   : 'right-[1.2rem]' ,
} ;

const positionMap =
{
    bottom : 'rotate-45 mt-0.5' ,
    top    : 'rotate-225 -mt-2' ,
} ;

const colorMap =
{
    accent    : 'bg-accent border-accent' ,
    error     : 'bg-error border-error' ,
    info      : 'bg-info border-info' ,
    neutral   : 'bg-neutral border-neutral' ,
    primary   : 'bg-primary border-primary' ,
    secondary : 'bg-secondary border-secondary' ,
    success   : 'bg-success border-success' ,
    warning   : 'bg-warning border-warning' ,
} ;

const DEFAULT_COLOR = 'bg-base-100 border-base-content/20' ;

/**
 * @param {Object} props
 * @param {'start' | 'end'} [props.align] - Horizontal alignment.
 * @param {'accent' | 'error' | 'info' | 'neutral' | 'primary' | 'secondary' | 'success' | 'warning'} [props.color] - Arrow color.
 * @param {'bottom' | 'top'} [props.position] - Arrow position.
 */
const Arrow = ({ align , color , position }) =>
(
    <div
        className =
        {
            cn( arrowBaseClasses , colorMap[color] || DEFAULT_COLOR , alignMap[align] , positionMap[position] )
        }
    />
) ;

export default Arrow ;