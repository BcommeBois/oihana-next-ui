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
 * **Accessibility** — the two segments are real text, so a screen reader reads
 * them naturally. When `label` and `value` are plain strings, an accessible
 * name (`"<label>: <value>"`) is derived and, on the default `span`, a
 * `role="img"` is set so the badge is announced as a single unit ; pass your
 * own `aria-label` to override it. **Decorative icons** placed in `label` /
 * `value` should be marked `aria-hidden` (or given a `title`) by the caller —
 * e.g. `<FaGithub aria-hidden />`.
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
 * // As a link, with a decorative icon in the label
 * <LabelBadge as="a" href="https://github.com/…" label={<><FaGithub aria-hidden /> GitHub</>} value="BcommeBois/oihana-next-ui" />
 *
 * // Truncate a long value (adds a native title tooltip)
 * <LabelBadge label="repo" value="a/very/long/path/that/overflows" maxValueWidth={160} />
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
 * @param {number | string} [props.maxValueWidth] - Max width of the value segment ; enables truncation (number → px) + a native `title`.
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
    maxValueWidth ,
    size ,
    style ,
    textColor ,
    value ,
    valueClassName ,
    ...rest
}) =>
{
    const Component = as ?? 'span' ;

    const resolvedValue = value ?? children ;

    const hasLabel = label !== undefined && label !== null ;
    const hasValue = resolvedValue !== undefined && resolvedValue !== null ;

    const shellClassName = getLabelBadgeClassNames({ className , size , style }) ;

    // Derive an accessible name from string content ; on the default (non
    // interactive) span, promote it with role="img" so it is actually announced.
    const autoAriaLabel =
        typeof label === 'string' && typeof resolvedValue === 'string' ? `${label}: ${resolvedValue}`
      : typeof label === 'string'         ? label
      : typeof resolvedValue === 'string' ? resolvedValue
      : undefined ;

    const ariaLabel = rest[ 'aria-label' ] ?? autoAriaLabel ;
    const role      = rest.role ?? ( Component === 'span' && ariaLabel ? 'img' : undefined ) ;

    let leftSegment  = null ;
    let rightSegment = null ;

    if ( hasLabel )
    {
        const left = getLabelBadgeSegment({ className : labelClassName , color : labelColor , side : 'left' , size , style }) ;

        if ( labelTextColor )
        {
            left.style = { ...left.style , color : labelTextColor } ;
        }

        leftSegment = <span className={ left.className } style={ left.style }>{ label }</span> ;
    }

    if ( hasValue )
    {
        // No left divider when the value stands alone (`outline` variant).
        const right = getLabelBadgeSegment({ className : valueClassName , color , divider : hasLabel , side : 'right' , size , style }) ;

        if ( textColor )
        {
            right.style = { ...right.style , color : textColor } ;
        }

        const truncated = maxValueWidth !== undefined && maxValueWidth !== null ;

        if ( truncated )
        {
            const maxWidth = typeof maxValueWidth === 'number' ? `${maxValueWidth}px` : maxValueWidth ;
            right.style    = { ...right.style , maxWidth } ;
        }

        rightSegment = (
            <span
                className={ right.className }
                style={ right.style }
                title={ truncated && typeof resolvedValue === 'string' ? resolvedValue : undefined }
            >
                { truncated ? <span className="min-w-0 truncate">{ resolvedValue }</span> : resolvedValue }
            </span>
        ) ;
    }

    return (
        <Component className={ shellClassName } { ...rest } role={ role } aria-label={ ariaLabel }>
            { leftSegment }
            { rightSegment }
        </Component>
    ) ;
} ;

LabelBadge.displayName = 'LabelBadge' ;

export default LabelBadge ;
