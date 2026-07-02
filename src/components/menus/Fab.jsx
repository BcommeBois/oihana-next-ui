'use client' ;

import { cloneElement } from 'react' ;

/**
 * FAB (Floating Action Button) / Speed Dial component for DaisyUI 5.
 *
 * A floating button that sticks to a corner of the screen (`position: 'fixed'`
 * by default). Focusing or hovering it reveals its action buttons (the speed
 * dial) in a vertical stack or, with `flower`, a quarter-circle arc. The whole
 * open/close behaviour is CSS-driven — there is no JS state.
 *
 * The trigger is rendered as a focusable `<div tabindex="0" role="button">`
 * (not a `<button>`) to work around a long-standing Safari focus bug, matching
 * daisyUI's recommendation.
 *
 * Data-driven via `actions` (the common case) or fully composable via
 * `children` (which then replace the auto-rendered trigger + actions).
 *
 * @module components/menus/Fab
 * @see https://daisyui.com/components/fab
 *
 * @example
 * ```jsx
 * // Vertical speed dial
 * <Fab
 *     label="F"
 *     color="primary"
 *     actions={[
 *         { id: 'a', text: 'A', label: 'Label A' } ,
 *         { id: 'b', text: 'B', label: 'Label B' } ,
 *     ]}
 * />
 *
 * // With icons + a main-action button
 * <Fab
 *     icon={ MdAdd }
 *     color="secondary"
 *     mainAction={{ icon: MdEdit, color: 'primary' }}
 *     actions={[
 *         { id: 'cam',  icon: MdCamera } ,
 *         { id: 'mic',  icon: MdMic } ,
 *     ]}
 * />
 *
 * // Flower (quarter circle) — labels become tooltips
 * <Fab
 *     label="F"
 *     color="info"
 *     flower
 *     actions={[
 *         { id: 'a', text: 'A', label: 'Label A', tooltipPosition: 'left' } ,
 *         { id: 'b', text: 'B', label: 'Label B' } ,
 *     ]}
 * />
 *
 * // Single FAB (no speed dial)
 * <Fab label="F" color="primary" />
 *
 * // Composable (full control)
 * <Fab>
 *     <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary">F</div>
 *     <button className="btn btn-lg btn-circle">A</button>
 * </Fab>
 * ```
 */

import Button from '../Button' ;

import getFabClasses , { FAB_CLOSE , FAB_MAIN_ACTION } from '../../themes/components/fab' ;

/**
 * @typedef {Object} FabAction
 * @property {string} [id] - Stable React key.
 * @property {import('../../themes/components/button').ButtonColorValue} [color] - Button color.
 * @property {boolean} [circle=true] - Render as a circle button (set false for a rectangle button).
 * @property {React.ReactNode} [icon] - Icon component (button content).
 * @property {React.ReactNode} [label] - Side label shown next to the button (vertical mode); used as the tooltip in `flower` mode when no `tooltip` is given.
 * @property {Function} [onClick] - Click handler.
 * @property {React.ReactNode} [text] - Inline button content (e.g. a letter).
 * @property {string} [tooltip] - Tooltip text (mostly for `flower` mode).
 * @property {import('../../themes/components/tooltip').TooltipPosition} [tooltipPosition] - Tooltip placement.
 */

/**
 * @typedef {Object} FabSlot
 * @property {import('../../themes/components/button').ButtonColorValue} [color] - Button color.
 * @property {React.ReactNode} [icon] - Icon component (button content).
 * @property {React.ReactNode} [label] - Side label (vertical mode only).
 * @property {Function} [onClick] - Click handler.
 * @property {React.ReactNode} [text] - Inline button content.
 */

/**
 * @param {Object} props
 * @param {FabAction[]} [props.actions] - Speed-dial action buttons (ignored when `children` is set).
 * @param {string} [props.actionClassName] - Extra classes applied to each action button.
 * @param {React.ReactNode} [props.children] - Composable content (replaces the auto-rendered trigger + actions).
 * @param {string} [props.className] - Extra classes for the FAB container.
 * @param {FabSlot} [props.closeButton] - Optional close button shown open (mutually exclusive with `mainAction`).
 * @param {import('../../themes/components/button').ButtonColorValue} [props.color] - Trigger color.
 * @param {boolean} [props.flower=false] - Open in a quarter-circle arc (`fab-flower`, up to 4 actions).
 * @param {React.ReactNode} [props.icon] - Trigger icon.
 * @param {React.ReactNode} [props.label] - Trigger inline content (e.g. a letter).
 * @param {FabSlot} [props.mainAction] - Optional main-action button shown open (mutually exclusive with `closeButton`).
 * @param {import('../../themes/layout/position').PositionValue} [props.position] - CSS position (default 'fixed'; use 'absolute' / 'relative' to embed).
 * @param {import('../../themes/components/button').ButtonSize} [props.size='lg'] - Size applied to the trigger and every action button.
 * @returns {React.JSX.Element}
 */
const Fab =
({
    actions ,
    actionClassName ,
    children ,
    className ,
    closeButton ,
    color ,
    flower = false ,
    icon ,
    label ,
    mainAction ,
    position ,
    size = 'lg' ,

    ...rest
}) =>
{
    const classes = getFabClasses({ className , flower , position } ) ;

    // Composable escape hatch — the caller controls the whole structure.
    if ( children )
    {
        return (
            <div className={ classes } { ...rest }>
                { children }
            </div>
        ) ;
    }

    // --------- Renders the close / main-action slot (shown when the FAB opens)

    const renderSlot = ( slot , slotClass ) =>
    {
        if ( !slot ) return null ;

        const slotButton = (
            <Button
                color = { slot.color }
                icon  = { slot.icon }
                shape = "circle"
                size  = { size }
                onClick = { slot.onClick }
                className = { flower ? slotClass : undefined }
            >
                { slot.text }
            </Button>
        ) ;

        // In flower mode the class sits on the button itself (no side label).
        if ( flower )
        {
            return slotButton ;
        }

        // In vertical mode the class wraps the button + its optional side label.
        return (
            <div className={ slotClass }>
                { slot.label }
                { slotButton }
            </div>
        ) ;
    } ;

    // --------- Renders a single speed-dial action

    const renderAction = ( action = {} , index ) =>
    {
        const {
            id ,
            circle = true ,
            color : actionColor ,
            icon  : actionIcon ,
            label : actionLabel ,
            onClick ,
            text ,
            tooltip ,
            tooltipPosition ,
        } = action ;

        const key = id ?? `action-${ index }` ;

        const actionButton = (
            <Button
                className       = { actionClassName }
                color           = { actionColor }
                icon            = { actionIcon }
                shape           = { circle ? 'circle' : undefined }
                size            = { size }
                onClick         = { onClick }
                tooltip         = { flower ? ( tooltip ?? actionLabel ) : tooltip }
                tooltipPosition = { tooltipPosition }
            >
                { text }
            </Button>
        ) ;

        // Vertical mode with a side label → wrap the label + button.
        if ( !flower && actionLabel )
        {
            return (
                <div key={ key }>
                    { actionLabel }
                    { actionButton }
                </div>
            ) ;
        }

        // Direct child — clone only to attach the React key.
        return cloneElement( actionButton , { key } ) ;
    } ;

    return (
        <div className={ classes } { ...rest }>

            {/* Trigger — a focusable div (Safari focus-bug workaround) */}
            {/* biome-ignore lint/a11y/useSemanticElements: daisyUI requires a div[tabindex][role=button] here, not a <button>, to work around a Safari focus bug */}
            <Button
                as       = "div"
                role     = "button"
                tabIndex = { 0 }
                color    = { color }
                icon     = { icon }
                shape    = "circle"
                size     = { size }
            >
                { label }
            </Button>

            {/* Close / main action (mutually exclusive) — shown when open */}
            { renderSlot( closeButton , FAB_CLOSE ) }
            { !closeButton && renderSlot( mainAction , FAB_MAIN_ACTION ) }

            {/* Speed-dial actions */}
            { Array.isArray( actions ) && actions.map( renderAction ) }

        </div>
    ) ;
} ;

Fab.displayName = 'Fab' ;

export default Fab ;
