'use client' ;

import Step from './Step' ;

import { getStepsClasses } from '../../themes/components/step' ;

/**
 * @typedef {Object} StepItem
 * @property {string} [id] - Stable key, and the value `current` can point at.
 * @property {React.ReactNode} [label] - Label content.
 * @property {import('../../themes/components/step').StepColor} [color] - Overrides the colour `current` would have resolved.
 * @property {string} [content] - Bubble content, through `data-content`.
 * @property {React.ReactNode} [icon] - Element replacing the bubble.
 * @property {string} [href] - Renders the label as a `next/link`.
 * @property {Function} [onClick] - Renders the label as a `<button>`.
 * @property {boolean} [disabled] - Disables the label control.
 * @property {string} [className] - Extra class names on the step.
 */

/**
 * A run of {@link Step} nodes — a checkout funnel, a multi-part form, any ordered
 * process.
 *
 * Data-driven through `items`, or composed from raw `<Step>` children, the same pair of
 * shapes `Dropdown`, `Tabs` and `Stats` accept.
 *
 * ### `current` does the colouring
 *
 * In raw DaisyUI you place `step-primary` by hand on every step already reached. Here
 * `current` — an index or an item `id` — drives it, through three separate colours so the
 * three states can be told apart :
 *
 * | State | Colour | Default |
 * |---|---|---|
 * | before `current` | `color` | `primary` |
 * | at `current` | `currentColor` | falls back to `color` |
 * | after `current` | `upcomingColor` | none — DaisyUI's unreached grey |
 *
 * An item's own `color` beats all three. Leaving `current` unset disables the automatic
 * colouring entirely, and each item governs itself.
 *
 * ### The connector is fixed for you
 *
 * DaisyUI tints the connector reaching a step only when the step before it carries the
 * same colour — that pairing is what draws the filled progress bar. It also means that
 * giving the current step a colour of its own drops the segment leading up to it back to
 * grey, ending the bar one step early even though that ground has been covered.
 *
 * So the connector reaching the current step is coloured with `color`, independently of
 * the bubble. The bar runs up to where the user stands, and the bubble alone marks the
 * state. A step carrying its own `color` is left entirely to DaisyUI's rule.
 *
 * ### Accessibility
 *
 * The container is an **`<ol>`**, not DaisyUI's `<ul>` : a process is ordered, and the CSS
 * only ever targets classes, so the change is free. The step at `current` carries
 * `aria-current="step"` — without it a screen reader reads a flat list of labels with no
 * idea where the user stands, and the numbered bubble is no help since CSS generates it.
 *
 * ### Layout
 *
 * `.steps` is an `inline-grid` with `overflow: auto hidden`: it hugs its content and
 * scrolls sideways rather than wrapping. Pass `className="w-full"` for a full-width run,
 * and `direction={{ xs: 'vertical', lg: 'horizontal' }}` to stack on narrow screens
 * instead of scrolling.
 *
 * @module components/steps/Steps
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Accessible name for the run of steps.
 * @param {React.ReactNode} [props.children] - Raw `<Step>` children. Used instead of `items` when provided.
 * @param {string} [props.className] - Additional class name on the container.
 * @param {import('../../themes/components/step').StepColor} [props.color='primary'] - Colour of the steps already reached.
 * @param {number|string} [props.current] - Index, or item `id`, of the step in progress. Omit to disable automatic colouring.
 * @param {import('../../themes/components/step').StepColor} [props.currentColor] - Colour of the step in progress. Defaults to `color`.
 * @param {import('../../themes/components/step').StepsDirection | import('../../themes/components/step').ResponsiveStepsDirection} [props.direction] - Layout direction, scalar or per breakpoint.
 * @param {StepItem[]} [props.items=[]] - The steps. Ignored when `children` is provided.
 * @param {React.Ref} [props.ref] - Forwarded to the container.
 * @param {import('../../themes/components/step').StepColor} [props.upcomingColor] - Colour of the steps not yet reached. Omitted leaves DaisyUI's grey.
 *
 * @see https://daisyui.com/components/steps
 *
 * @example Checkout funnel, current step told apart
 * ```jsx
 * <Steps
 *     ariaLabel    = "Tunnel de commande"
 *     color        = "success"
 *     current      = { 1 }
 *     currentColor = "primary"
 *     items        = {[
 *         { id : 'cart'    , label : 'Panier' } ,
 *         { id : 'address' , label : 'Livraison' } ,
 *         { id : 'payment' , label : 'Paiement' } ,
 *     ]}
 * />
 * ```
 */
const Steps =
({
    ariaLabel ,
    children ,
    className ,
    color = 'primary' ,
    current ,
    currentColor ,
    direction ,
    items = [] ,
    ref ,
    upcomingColor ,
    ...rest
}) =>
{
    const hasCurrent = current !== undefined && current !== null ;

    const currentIndex = !hasCurrent
        ? -1
        : typeof current === 'number'
            ? current
            : items.findIndex( item => item?.id === current ) ;

    /**
     * An item's own colour wins ; otherwise the position relative to `current` decides,
     * and with no `current` at all nothing is imposed.
     */
    const colorOf = ( item , index ) =>
    {
        if ( item?.color )
        {
            return item.color ;
        }

        if ( currentIndex < 0 )
        {
            return undefined ;
        }

        if ( index < currentIndex )
        {
            return color ;
        }

        if ( index === currentIndex )
        {
            return currentColor ?? color ;
        }

        return upcomingColor ;
    } ;

    /**
     * The segment reaching the current step is ground already covered, so it belongs to
     * the completed run rather than to the step it points at. Left untouched when the
     * item drives its own colour, and pointless on the first step, which has no connector.
     */
    const connectorOf = ( item , index ) =>
        ( !item?.color && currentIndex > 0 && index === currentIndex ) ? color : undefined ;

    return (
        <ol
            aria-label = { ariaLabel }
            className  = { getStepsClasses({ className , direction }) }
            ref        = { ref }
            { ...rest }
        >
            { children ?? items.map( ( item , index ) =>
            (
                <Step
                    key            = { item?.id ?? index }
                    className      = { item?.className }
                    color          = { colorOf( item , index ) }
                    connectorColor = { connectorOf( item , index ) }
                    content        = { item?.content }
                    current        = { index === currentIndex }
                    disabled       = { item?.disabled }
                    href           = { item?.href }
                    icon           = { item?.icon }
                    label          = { item?.label }
                    onClick        = { item?.onClick }
                />
            ) ) }
        </ol>
    ) ;
} ;

Steps.displayName = 'Steps' ;

export default Steps ;
