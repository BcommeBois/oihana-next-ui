import cn from '../../../themes/helpers/cn' ;

/**
 * The draggable handle shown on the saturation square and the hue / alpha tracks.
 *
 * @module components/colors/picker/Pointer
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes.
 * @param {number} [props.top=0.5] - Vertical position, 0–1.
 * @param {number} [props.left=0.5] - Horizontal position, 0–1.
 */
const Pointer = ({ className , top = 0.5 , left = 0.5 }) =>
(
    <div
        className = { cn(
            'color-pointer pointer-events-none absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-transparent shadow-[0_0_0_1.5px_rgba(0,0,0,0.25)] transition-transform' ,
            className
        )}
        style = { { top : `${ top * 100 }%` , left : `${ left * 100 }%` } }
    />
) ;

Pointer.displayName = 'Pointer' ;

export default Pointer ;
