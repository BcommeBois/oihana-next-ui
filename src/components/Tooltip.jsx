/**
 * Tooltip component for DaisyUI.
 *
 * @module components/Tooltip
 * @see https://daisyui.com/components/tooltip
 *
 * ### `float` — when the CSS one cannot reach
 *
 * DaisyUI draws its tooltip in a pseudo-element of the trigger. That is what
 * makes it free, and what makes it **clipped by any ancestor hiding its
 * overflow** — a scrolling list, a table cell, a block truncating its own title
 * — and blind to the edges of the window, so near one it leaves the screen
 * rather than flipping. No prop can lift either : they are properties of where
 * the bubble lives.
 *
 * `float` moves it into a portal and positions it against its trigger, flipping
 * and clamping to whatever room the page leaves. Everything else is unchanged,
 * and **the CSS path stays the default** — it costs nothing and is right
 * wherever nothing clips it.
 *
 * The floating path also opens on **focus**, not only on hover, and never on
 * touch : there is no hovering on a touch screen, and a tap has somewhere better
 * to go than under a bubble.
 *
 * @example
 * ```jsx
 * // Inside anything that scrolls
 * <Tooltip tip="Never clipped" float color="primary">
 *     <button className="btn">Hover me</button>
 * </Tooltip>
 * ```
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

import FloatingTip from './FloatingTip' ;

/**
 * @param {Object} props
 * @param {import('../themes/components/tooltip').TooltipAlignment} [props.align] - Tooltip alignment ('start' | 'center' | 'end').
 * @param {React.ElementType} [props.as] - Root element type.
 * @param {React.ReactNode} [props.children] - Tooltip trigger content.
 * @param {string} [props.className] - Additional class name.
 * @param {import('../themes/components/tooltip').TooltipColorValue} [props.color] - Tooltip color.
 * @param {boolean} [props.open] - Force tooltip open.
 * @param {import('../themes/components/tooltip').TooltipPosition} [props.position] - Tooltip placement.
 * @param {React.Ref} [props.ref] - Forwarded ref.
 * @param {boolean} [props.show=true] - Enable/disable tooltip. When false, renders children only.
 *   A disabled trigger has to pass its state here : the bubble opens on the wrapper, and a
 *   disabled control takes no pointer events to stop the hover from reaching it.
 * @param {string} [props.tip] - Tooltip text (uses data-tip attribute).
 * @param {boolean} [props.float=false] - Draw the bubble as a **portaled element** instead of a pseudo-element. See below.
 * @param {number} [props.delay=400] - Floating only : milliseconds a pointer must dwell before it opens.
 */
const Tooltip =
({
    align ,
    as ,
    children ,
    className ,
    color ,
    delay ,
    float = false ,
    open ,
    position ,
    ref ,
    show = true ,
    tip ,
    ...rest
}) =>
{
    if ( !show ) return children ;

    if ( float )
    {
        return (
            <FloatingTip as={ as } className={ className } color={ color } delay={ delay } ref={ ref } tip={ tip } { ...rest }>
                { children }
            </FloatingTip>
        ) ;
    }

    const Component = as || 'div' ;

    const classNames = getTooltipClassNames({ align , className , color , open , position }) ;

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