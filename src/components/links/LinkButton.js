'use client' ;

/**
 * Link styled as a button using DaisyUI with icon, tooltip and i18n support.
 *
 * @module components/LinkButton
 * @see https://nextjs.org/docs/app/api-reference/components/link
 * @see https://daisyui.com/components/button
 *
 * @example
 * ```jsx
 * // Simple
 * <LinkButton href="/home" path="navigation.home" />
 *
 * // With icon
 * <LinkButton href="/home" icon={MdHome} path="navigation.home" color="primary" />
 *
 * // Custom children (overrides i18n label)
 * <LinkButton href="/products" icon={MdInventory} color="success">Products</LinkButton>
 *
 * // Circle icon link
 * <LinkButton href="/search" icon={MdSearch} shape="circle" size="sm" />
 *
 * // External link
 * <LinkButton href="https://example.com" target="_blank">Visit</LinkButton>
 * ```
 */

import NextLink from 'next/link'

import IconBox from '@/components/icons/IconBox'
import Tooltip from '@/components/Tooltip'

import useActiveLink from '@/hooks/useActiveLink'
import useI18n       from '@/contexts/locale/useI18n'

import getButtonClassNames from '@/themes/components/button'

/**
 * @param {Object} props
 * @param {boolean} [props.active] - Active state.
 * @param {import('@/themes/components/button').ButtonColorValue} [props.activeColor] - Color when active.
 * @param {boolean} [props.animation=true] - Enable click animation.
 * @param {React.ReactNode} [props.children] - Link content (overrides i18n label).
 * @param {string} [props.className] - Additional class name.
 * @param {import('@/themes/components/button').ButtonColorValue} [props.color='ghost'] - Button color.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {boolean} [props.glass] - Glass effect.
 * @param {string|Object} props.href - Destination URL or route object.
 * @param {Function} [props.icon] - Icon component.
 * @param {string} [props.iconClassName] - Icon wrapper class name.
 * @param {Function} [props.onClick] - Click handler.
 * @param {string} [props.path] - i18n path for label, title and tooltip.
 * @param {React.Ref<HTMLAnchorElement>} [props.ref] - Forwarded ref.
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
 */
const LinkButton =
({
    active ,
    activeColor ,
    animation ,
    children ,
    className ,
    color = 'ghost' ,
    disabled ,
    glass ,
    href ,
    icon ,
    iconClassName ,
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

    const { isActive : isCurrentPage , handleClick } = useActiveLink( href ) ;

    const resolvedColor   = active ? activeColor : color ;
    const resolvedLabel   = children ?? i18n?.label ;
    const resolvedTitle   = title    ?? i18n?.title ;
    const resolvedTooltip = tooltip  ?? i18n?.tooltip ;

    return (
        <Tooltip
            className = { tooltipClassName }
            color     = { tooltipColor }
            position  = { tooltipPosition }
            show      = { showTooltip && !disabled && !!resolvedTooltip }
            tip       = { resolvedTooltip }
        >
            <NextLink
                aria-current = { isCurrentPage ? 'page' : undefined }
                aria-label   = { resolvedTitle }
                className    =
                {
                    getButtonClassNames
                    ({
                        active ,
                        animation ,
                        className ,
                        color     : resolvedColor ,
                        disabled ,
                        glass ,
                        shape ,
                        size ,
                        style ,
                        textColor : resolvedColor ,
                        wide ,
                    })
                }
                href     = { href }
                onClick  = { e => handleClick( e , onClick ) }
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
                { resolvedLabel }
            </NextLink>
        </Tooltip>
    ) ;
} ;

export default LinkButton ;