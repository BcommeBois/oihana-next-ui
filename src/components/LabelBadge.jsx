'use client' ;

/**
 * LabelBadge component.
 *
 * A two-sided badge ("shields.io" style) : a neutral label on the left and a
 * colored value on the right. It reuses the DaisyUI `.badge` shell, so radius,
 * height, spacing and font-size all follow the current theme, while the right
 * color accepts either a DaisyUI token (`primary`, `success`, …) or any custom
 * CSS color (`#7c3aed`, `oklch(…)`, …).
 *
 * @module components/LabelBadge
 *
 * @example
 * ```jsx
 * // DaisyUI color
 * <LabelBadge label="npm" value="v0.6.1" color="primary" />
 *
 * // Custom CSS color
 * <LabelBadge label="license" value="MPL-2.0" color="#BA7517" />
 *
 * // Variants + sizes
 * <LabelBadge label="build" value="passing" color="success" style="soft" />
 * <LabelBadge label="coverage" value="98%" color="info" style="outline" size="sm" />
 *
 * // As a link, with an icon in the label
 * <LabelBadge as="a" href="https://github.com/…" label={<><FaGithub /> GitHub</>} value="BcommeBois/oihana-next-ui" />
 * ```
 */

import { getLabelBadgeClassNames , getLabelBadgeSegment } from '../themes/components/labelBadge' ;

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Root element type (default `span`).
 * @param {React.ReactNode} [props.children] - Right (value) content ; alias of `value`.
 * @param {string} [props.className] - Additional class name on the shell.
 * @param {import('../themes/components/labelBadge').LabelBadgeColor | string} [props.color] - Right color : DaisyUI token or CSS color.
 * @param {React.ReactNode} [props.label] - Left (label) content.
 * @param {string} [props.labelClassName] - Additional class name on the left segment.
 * @param {import('../themes/components/labelBadge').LabelBadgeColor | string} [props.labelColor] - Left color (default `neutral`).
 * @param {string} [props.labelTextColor] - Custom CSS text color for the left segment.
 * @param {import('../themes/components/labelBadge').LabelBadgeSize} [props.size] - Badge size.
 * @param {import('../themes/components/labelBadge').LabelBadgeStyle} [props.style] - Visual variant (`solid` | `soft` | `outline`).
 * @param {string} [props.textColor] - Custom CSS text color for the right segment.
 * @param {React.ReactNode} [props.value] - Right (value) content.
 * @param {string} [props.valueClassName] - Additional class name on the right segment.
 */
const LabelBadge =
({
    as ,
    children ,
    className ,
    color ,
    label ,
    labelClassName ,
    labelColor ,
    labelTextColor ,
    size ,
    style ,
    textColor ,
    value ,
    valueClassName ,
    ...rest
}) =>
{
    const Component = as ?? 'span' ;

    const shellClassName = getLabelBadgeClassNames({ className , size , style }) ;

    const left  = getLabelBadgeSegment({ className : labelClassName , color : labelColor , side : 'left'  , size , style }) ;
    const right = getLabelBadgeSegment({ className : valueClassName , color            , side : 'right' , size , style }) ;

    if ( labelTextColor )
    {
        left.style = { ...left.style , color : labelTextColor } ;
    }

    if ( textColor )
    {
        right.style = { ...right.style , color : textColor } ;
    }

    return (
        <Component className={ shellClassName } { ...rest }>
            <span className={ left.className } style={ left.style }>{ label }</span>
            <span className={ right.className } style={ right.style }>{ value ?? children }</span>
        </Component>
    ) ;
} ;

LabelBadge.displayName = 'LabelBadge' ;

export default LabelBadge ;
