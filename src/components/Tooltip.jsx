/**
 * Tooltip component for DaisyUI.
 *
 * @module components/Tooltip
 * @see https://daisyui.com/components/tooltip
 *
 * @example
 * ```jsx
 * // Simple tooltip with data-tip
 * <Tooltip tip="Hello">
 *     <button className="btn">Hover me</button>
 * </Tooltip>
 *
 * // Colored
 * <Tooltip tip="Error details" color="error">
 *     <span>⚠️</span>
 * </Tooltip>
 *
 * // Position
 * <Tooltip tip="Info" position="left" color="info">
 *     <button className="btn">Left</button>
 * </Tooltip>
 *
 * // Force open
 * <Tooltip tip="Always visible" open color="primary">
 *     <button className="btn">Pinned</button>
 * </Tooltip>
 *
 * // Rich content with tooltip-content
 * <Tooltip>
 *     <button className="btn">Hover me</button>
 *     <div className="tooltip-content">
 *         <p className="text-sm">Rich <strong>HTML</strong> content</p>
 *     </div>
 * </Tooltip>
 *
 * // Custom element
 * <Tooltip as="span" tip="Inline tooltip">
 *     Some text
 * </Tooltip>
 * ```
 */

import getTooltipClassNames from '../themes/components/tooltip' ;

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Root element type.
 * @param {React.ReactNode} [props.children] - Tooltip trigger content.
 * @param {string} [props.className] - Additional class name.
 * @param {import('@/themes/components/tooltip').TooltipColorValue} [props.color] - Tooltip color.
 * @param {boolean} [props.open] - Force tooltip open.
 * @param {import('@/themes/components/tooltip').TooltipPosition} [props.position] - Tooltip placement.
 * @param {React.Ref} [props.ref] - Forwarded ref.
 * @param {boolean} [props.show=true] - Enable/disable tooltip. When false, renders children only.
 * @param {string} [props.tip] - Tooltip text (uses data-tip attribute).
 */
const Tooltip =
({
    as ,
    children ,
    className ,
    color ,
    open ,
    position ,
    ref ,
    show = true ,
    tip ,
    ...rest
}) =>
{
    if ( !show ) return children ;

    const Component = as || 'div' ;

    const classNames = getTooltipClassNames({ className , color , open , position }) ;

    return (
        <Component
            className = { classNames }
            ref       = { ref }
            { ...!!tip && { 'data-tip' : tip } }
            { ...rest }
        >
            { children }
        </Component>
    ) ;
} ;

export default Tooltip ;