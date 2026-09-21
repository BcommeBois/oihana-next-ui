/**
 * Button component for DaisyUI with icon, tooltip and i18n support.
 *
 * @module components/Button
 * @see https://daisyui.com/components/button
 *
 * @example
 * ```jsx
 * // Simple
 * <Button path="actions.save" color="primary" />
 *
 * // With icon
 * <Button icon={MdSave} path="actions.save" color="primary" />
 *
 * // Custom children (overrides i18n label)
 * <Button icon={MdAdd} color="success">Add item</Button>
 *
 * // Outline with tooltip
 * <Button icon={MdDelete} path="actions.delete" color="error" style="outline" />
 *
 * // Active state with different color
 * <Button icon={MdStar} active activeColor="warning" color="neutral" title="Favourite" />
 *
 * // Disabled
 * <Button path="actions.submit" color="primary" disabled />
 *
 * // Busy while its action runs : looks disabled, ignores clicks, KEEPS the keyboard focus
 * <Button icon={MdSave} color="primary" busy={ saving } onClick={ save } tooltip="Save" />
 *
 * // Loading : busy, plus a spinner in place of the icon and an optional label
 * <Button icon={MdSave} color="primary" loading={ saving } loadingLabel="Saving…" onClick={ save }>Save</Button>
 *
 * // Circle icon button
 * // Icon only : `title` becomes the aria-label, and without it the button has no name
 * <Button icon={MdSearch} shape="circle" size="sm" title="Search" />
 *
 * // As link
 * <Button as="a" href="/home" color="primary">Home</Button>
 * ```
 */

import IconBox from './icons/IconBox' ;
import Tooltip from './Tooltip' ;

import useI18n from '../contexts/locale/useI18n' ;

import getButtonClassNames from '../themes/components/button' ;
import getLoadingClassNames , { SPINNER } from '../themes/components/loading' ;

import { LG , MD , SM , XL , XS } from '../themes/sizing/sizes' ;

/**
 * The spinner that fits each button size — one step below it, as the icon it
 * replaces is.
 * @type {Object<string,string>}
 */
const SPINNER_SIZES =
{
    [ XS ] : XS ,
    [ SM ] : XS ,
    [ MD ] : SM ,
    [ LG ] : MD ,
    [ XL ] : LG ,
} ;

/**
 * Button component for DaisyUI with icon, tooltip and i18n support.
 *
 * @param {object} props
 * @param {boolean} [props.active] - Active state.
 * @param {import('../themes/components/button').ButtonColorValue} [props.activeColor] - Color when active.
 * @param {boolean} [props.animation=true] - Enable click animation.
 * @param {React.ElementType} [props.as] - Root element type.
 * @param {React.ReactNode} [props.children] - Button content (overrides i18n label).
 * @param {string} [props.className] - Additional class name.
 * @param {import('../themes/components/button').ButtonColorValue} [props.color] - Button color.
 * @param {boolean} [props.busy=false] - Temporarily unavailable while an action runs. Rendered with `aria-disabled` and `aria-busy` instead of the native `disabled` : it looks disabled (DaisyUI styles `[aria-disabled=true]` like `:disabled`), ignores clicks and the Enter / Space activation, hides its tooltip — but stays focusable. A native `disabled` makes the browser drop the focus of the button that holds it, so a keyboard user who pressed it would land on the page. Prefer it to `disabled` for anything that is only busy.
 * @param {boolean} [props.loading=false] - The action is running AND says so : everything `busy` does (focusable, `aria-busy`, clicks and Enter / Space ignored, tooltip hidden), plus a spinner in place of the icon. Kept apart from `busy` on purpose : a round icon button that is only busy keeps its icon, where a spinner would change what it looks like.
 * @param {React.ReactNode} [props.loadingLabel] - Content shown while `loading`, in place of `children`. Omitted, the content does not change.
 * @param {boolean} [props.disabled] - Disabled state. A disabled button shows no tooltip, but keeps the tooltip wrapper : only the bubble goes out, so toggling `disabled` never swaps the element React renders — the button is not destroyed and recreated. The browser still takes the focus away from a button that becomes `disabled` : for a button that is only busy, use `busy`.
 * @param {boolean} [props.glass] - Glass effect.
 * @param {React.ReactNode} [props.icon] - Icon component.
 * @param {string} [props.iconClassName] - Icon wrapper class name.
 * @param {React.CSSProperties} [props.iconStyle] - Inline style applied to the icon wrapper.
 * @param {boolean} [props.join] - DaisyUI join-item modifier.
 * @param {Function} [props.onClick] - Click handler.
 * @param {string} [props.path] - i18n path for label, title and tooltip.
 * @param {React.Ref} [props.ref] - Forwarded ref.
 * @param {import('../themes/components/button').ButtonShape} [props.shape] - Button shape.
 * @param {boolean} [props.showIcon=true] - Show/hide icon.
 * @param {boolean} [props.showTooltip=true] - Show/hide tooltip. Unlike `disabled`, it removes the wrapper : flipping it — or a tooltip text going from empty to set — does swap the element, so keep it stable on a button that holds the focus.
 * @param {import('../themes/components/button').ButtonSize} [props.size='sm'] - Button size.
 * @param {import('../themes/components/button').ButtonStyle} [props.style] - Button style variant.
 * @param {number} [props.tabIndex] - Tab index.
 * @param {string} [props.title] - Accessible title (overrides i18n).
 * @param {string} [props.tooltip] - Tooltip text (overrides i18n).
 * @param {import('../themes/components/tooltip').TooltipAlignment} [props.tooltipAlign] - Tooltip alignment ('start' | 'center' | 'end').
 * @param {string} [props.tooltipClassName] - Tooltip class name.
 * @param {import('../themes/components/tooltip').TooltipColorValue} [props.tooltipColor] - Tooltip color.
 * @param {import('../themes/components/tooltip').TooltipPosition} [props.tooltipPosition] - Tooltip position.
 * @param {boolean} [props.wide] - Wide button modifier.
 * @param {Object} props.rest - Other props passed to Button
 */
const Button =
({
    active ,
    activeColor ,
    animation ,
    as ,
    children ,
    busy : busyProp = false ,
    className ,
    color ,
    disabled ,
    glass ,
    icon ,
    iconClassName ,
    iconStyle ,
    join ,
    loading = false ,
    loadingLabel ,
    onClick ,
    path ,
    ref ,
    shape ,
    showIcon = true ,
    showTooltip = true ,
    size ,
    style ,
    tabIndex ,
    title ,
    tooltip ,
    tooltipAlign ,
    tooltipClassName ,
    tooltipColor ,
    tooltipPosition ,
    wide ,

    ...rest
}) =>
{
    const i18n = useI18n( path , {} , false ) ;

    const resolvedTitle   = title   ?? i18n?.title ;
    const resolvedTooltip = tooltip ?? i18n?.tooltip ;
    const resolvedColor   = active ? activeColor : color ;

    const Component = as || 'button' ;

    const busy = busyProp || loading ;

    // Busy is inert for the pointer (DaisyUI puts `pointer-events: none` on
    // `[aria-disabled=true]`) but not for the keyboard : Enter and Space still
    // fire a click on a focused button, so the handler is guarded here.
    const handleClick = busy
        ? event => { event.preventDefault() ; }
        : onClick ;

    const unavailable = disabled || busy ;

    return (
        <Tooltip
            align     = { tooltipAlign }
            className = { tooltipClassName }
            color     = { tooltipColor }
            // The wrapper stays while the button is disabled or busy : `show={ false }`
            // would render the bare button, and React would destroy and recreate it on
            // every toggle. Without `data-tip` DaisyUI draws no bubble, so dropping
            // `tip` is enough to hide it.
            tip       = { unavailable ? undefined : resolvedTooltip }
            position  = { tooltipPosition }
            show      = { showTooltip && !!resolvedTooltip }
        >
            <Component
                aria-busy     = { busy || undefined }
                aria-disabled = { busy || undefined }
                aria-label    = { resolvedTitle }
                className  =
                {
                    getButtonClassNames
                    ({
                        active ,
                        animation ,
                        before : join ? { 'join-item' : true } : null ,
                        className ,
                        color : resolvedColor ,
                        disabled ,
                        glass ,
                        shape ,
                        size ,
                        style ,
                        wide ,
                    })
                }
                disabled = { disabled }
                onClick  = { handleClick }
                ref      = { ref }
                tabIndex = { tabIndex }
                { ...rest }
            >
                {
                    loading
                        ? <span aria-hidden="true" className={ getLoadingClassNames( { animation : SPINNER , size : SPINNER_SIZES[ size ] ?? XS } ) } />
                        : showIcon &&
                            <IconBox
                                className = { iconClassName }
                                disabled  = { unavailable }
                                icon      = { icon }
                                size      = { size }
                                style     = { iconStyle }
                            />
                }
                { loading && loadingLabel !== undefined ? loadingLabel : ( children ?? i18n?.label ) }
            </Component>
        </Tooltip>
    ) ;
} ;

export default Button ;