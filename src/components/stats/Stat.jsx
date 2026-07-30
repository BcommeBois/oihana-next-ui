'use client' ;

import
{
    getStatActionsClasses ,
    getStatClasses ,
    getStatDescClasses ,
    getStatFigureClasses ,
    getStatTitleClasses ,
    getStatValueClasses ,
}
from '../../themes/components/stat' ;

/**
 * One KPI block : a label, a number, an optional trend line, an optional figure and an
 * optional actions row.
 *
 * ### Reading order
 *
 * The figure is rendered **last** in the DOM even though it shows on the trailing edge :
 * DaisyUI places every part with an explicit `grid-column` / `grid-row`, never by source
 * order, so the visual layout is identical either way. Putting the label first means a
 * screen reader announces "Total sales, 89,400" instead of leading with a bare number —
 * which is what DaisyUI's own third example does.
 *
 * The figure is `aria-hidden` by default, since an icon next to a labelled number adds
 * nothing. Set `figureDecorative={ false }` when it actually carries information — an
 * avatar saying *whose* stat this is, for instance.
 *
 * ### Colours
 *
 * `color` tints the value and the figure together, which is the usual accent. Every part
 * also takes its own colour (`titleColor`, `valueColor`, `descriptionColor`,
 * `figureColor`) and those win over `color`, because DaisyUI's examples routinely tint the
 * value and the description differently.
 *
 * @module components/stats/Stat
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.actions] - Actions row, typically small buttons.
 * @param {string} [props.actionsClassName] - Additional class name on the actions row.
 * @param {boolean} [props.centered=false] - Centres the parts (`place-items-center`).
 * @param {string} [props.className] - Additional class name on the block.
 * @param {import('../../themes/colors/textColor').TextColorValue} [props.color] - Accent applied to the value and the figure.
 * @param {React.ReactNode} [props.description] - Secondary line, usually a trend.
 * @param {string} [props.descriptionClassName] - Additional class name on the description.
 * @param {import('../../themes/colors/textColor').TextColorValue} [props.descriptionColor] - Description colour.
 * @param {React.ReactNode} [props.figure] - Icon, avatar or any node shown on the trailing edge.
 * @param {string} [props.figureClassName] - Additional class name on the figure.
 * @param {import('../../themes/colors/textColor').TextColorValue} [props.figureColor] - Figure colour ; falls back to `color`.
 * @param {boolean} [props.figureDecorative=true] - Hide the figure from assistive technology.
 * @param {React.Ref} [props.ref] - Forwarded to the block.
 * @param {React.ReactNode} [props.title] - The label.
 * @param {string} [props.titleClassName] - Additional class name on the title.
 * @param {import('../../themes/colors/textColor').TextColorValue} [props.titleColor] - Title colour.
 * @param {React.ReactNode} [props.value] - The number.
 * @param {string} [props.valueClassName] - Additional class name on the value.
 * @param {import('../../themes/colors/textColor').TextColorValue} [props.valueColor] - Value colour ; falls back to `color`.
 *
 * @see https://daisyui.com/components/stat
 *
 * @example
 * ```jsx
 * <Stat
 *     color       = "primary"
 *     figure      = { <LikeIcon /> }
 *     title       = "Total des mentions"
 *     value       = "25,6 k"
 *     description = "21 % de plus que le mois dernier"
 * />
 * ```
 */
const Stat =
({
    actions ,
    actionsClassName ,
    centered = false ,
    className ,
    color ,
    description ,
    descriptionClassName ,
    descriptionColor ,
    figure ,
    figureClassName ,
    figureColor ,
    figureDecorative = true ,
    ref ,
    title ,
    titleClassName ,
    titleColor ,
    value ,
    valueClassName ,
    valueColor ,
    ...rest
}) =>
{
    return (
        <div
            className = { getStatClasses({ centered , className }) }
            ref       = { ref }
            { ...rest }
        >

            { title ? (
                <div className={ getStatTitleClasses({ className : titleClassName , color : titleColor }) }>
                    { title }
                </div>
            ) : null }

            { value !== undefined && value !== null ? (
                <div className={ getStatValueClasses({ className : valueClassName , color : valueColor ?? color }) }>
                    { value }
                </div>
            ) : null }

            { description ? (
                <div className={ getStatDescClasses({ className : descriptionClassName , color : descriptionColor }) }>
                    { description }
                </div>
            ) : null }

            { actions ? (
                <div className={ getStatActionsClasses({ className : actionsClassName }) }>
                    { actions }
                </div>
            ) : null }

            { figure ? (
                <div
                    aria-hidden = { figureDecorative ? 'true' : undefined }
                    className   = { getStatFigureClasses({ className : figureClassName , color : figureColor ?? color }) }
                >
                    { figure }
                </div>
            ) : null }

        </div>
    ) ;
} ;

Stat.displayName = 'Stat' ;

export default Stat ;
