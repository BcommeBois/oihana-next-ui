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
 * <Button icon={MdStar} active activeColor="warning" color="neutral" />
 *
 * // Disabled
 * <Button path="actions.submit" color="primary" disabled />
 *
 * // Circle icon button
 * <Button icon={MdSearch} shape="circle" size="sm" />
 *
 * // As link
 * <Button as="a" href="/home" color="primary">Home</Button>
 * ```
 */

import IconBox from './icons/IconBox' ;
import Tooltip from './Tooltip' ;

import useI18n from '../contexts/locale/useI18n' ;

import getButtonClassNames from '../themes/components/button' ;

/**
 * Button component for DaisyUI with icon, tooltip and i18n support.
 *
 * @param {object} props
 * @param {boolean} [props.active] - Active state.
 * @param {import('@/themes/components/button').ButtonColorValue} [props.activeColor] - Color when active.
 * @param {boolean} [props.animation=true] - Enable click animation.
 * @param {React.ElementType} [props.as] - Root element type.
 * @param {React.ReactNode} [props.children] - Button content (overrides i18n label).
 * @param {string} [props.className] - Additional class name.
 * @param {import('@/themes/components/button').ButtonColorValue} [props.color] - Button color.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {boolean} [props.glass] - Glass effect.
 * @param {React.ReactNode} [props.icon] - Icon component.
 * @param {string} [props.iconClassName] - Icon wrapper class name.
 * @param {boolean} [props.join] - DaisyUI join-item modifier.
 * @param {Function} [props.onClick] - Click handler.
 * @param {string} [props.path] - i18n path for label, title and tooltip.
 * @param {React.Ref} [props.ref] - Forwarded ref.
 * @param {import('@/themes/components/button').ButtonShape} [props.shape] - Button shape.
 * @param {boolean} [props.showIcon=true] - Show/hide icon.
 * @param {boolean} [props.showTooltip=true] - Show/hide tooltip.
 * @param {import('@/themes/components/button').ButtonSize} [props.size='sm'] - Button size.
 * @param {import('@/themes/components/button').ButtonStyle} [props.style] - Button style variant.
 * @param {number} [props.tabIndex] - Tab index.
 * @param {string} [props.title] - Accessible title (overrides i18n).
 * @param {string} [props.tooltip] - Tooltip text (overrides i18n).
 * @param {string} [props.tooltipClassName] - Tooltip class name.
 * @param {import('@/themes/components/tooltip').TooltipColorValue} [props.tooltipColor] - Tooltip color.
 * @param {import('@/themes/components/tooltip').TooltipPosition} [props.tooltipPosition] - Tooltip position.
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
    className ,
    color ,
    disabled ,
    glass ,
    icon ,
    iconClassName ,
    join ,
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

    return (
        <Tooltip
            className = { tooltipClassName }
            color     = { tooltipColor }
            tip       = { resolvedTooltip }
            position  = { tooltipPosition }
            show      = { showTooltip && !disabled && !!resolvedTooltip }
        >
            <Component
                aria-label = { resolvedTitle }
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
                onClick  = { onClick }
                ref      = { ref }
                tabIndex = { tabIndex }
                { ...rest }
            >
                {
                    showIcon &&
                    <IconBox
                        className = { iconClassName }
                        disabled  = { disabled }
                        icon      = { icon }
                        size      = { size }
                    />
                }
                { children ?? i18n?.label }
            </Component>
        </Tooltip>
    ) ;
} ;

export default Button ;