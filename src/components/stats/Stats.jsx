'use client' ;

import Stat from './Stat' ;

import { getStatsClasses } from '../../themes/components/stat' ;

/**
 * @typedef {Object} StatItem
 * @property {string} [id] - Stable key. Falls back to the item index.
 * @property {React.ReactNode} [title] - The label.
 * @property {React.ReactNode} [value] - The number.
 * @property {React.ReactNode} [description] - Secondary line, usually a trend.
 * @property {React.ReactNode} [figure] - Icon, avatar or any node on the trailing edge.
 * @property {React.ReactNode} [actions] - Actions row.
 * @property {import('../../themes/colors/textColor').TextColorValue} [color] - Accent for the value and the figure.
 * @property {boolean} [centered] - Overrides the container's `centered`.
 */

/**
 * A band of {@link Stat} blocks.
 *
 * Data-driven through `items`, or composed from raw `<Stat>` children — the same pair of
 * shapes `Dropdown` and `Tabs` accept.
 *
 * ### Two DaisyUI behaviours to plan for
 *
 * `.stats` is an **`inline-grid`**, so it hugs its content : a KPI band meant to span the
 * page needs `className="w-full"`. And it carries **`overflow-x: auto`**, so once the
 * blocks outgrow the container they **scroll sideways rather than wrap**. On a narrow
 * screen a vertical direction usually reads better than a horizontal scroll — which is
 * what `direction={{ xs: 'vertical', lg: 'horizontal' }}` is for.
 *
 * Note also that DaisyUI sets `white-space: nowrap` on the title, value and description :
 * long labels do not wrap, they widen the block.
 *
 * @module components/stats/Stats
 *
 * @param {Object} props
 * @param {boolean} [props.centered=false] - Default alignment for every block ; an item's own `centered` wins.
 * @param {React.ReactNode} [props.children] - Raw `<Stat>` children. Used instead of `items` when provided.
 * @param {string} [props.className] - Additional class name on the container.
 * @param {import('../../themes/components/stat').StatsDirection | import('../../themes/components/stat').ResponsiveStatsDirection} [props.direction] - Layout direction, scalar or per breakpoint.
 * @param {StatItem[]} [props.items=[]] - The blocks. Ignored when `children` is provided.
 * @param {React.Ref} [props.ref] - Forwarded to the container.
 *
 * @see https://daisyui.com/components/stat
 *
 * @example Data-driven, stacked on mobile
 * ```jsx
 * <Stats
 *     className = "w-full shadow"
 *     direction = { { xs : 'vertical' , lg : 'horizontal' } }
 *     items     = {[
 *         { id : 'downloads' , title : 'Téléchargements' , value : '31 k'  , description : '1er jan. – 1er fév.' } ,
 *         { id : 'users'     , title : 'Nouveaux'        , value : '4 200' , description : '↗︎ 400 (22 %)' , color : 'success' } ,
 *     ]}
 * />
 * ```
 *
 * @example Composed
 * ```jsx
 * <Stats className="shadow">
 *     <Stat title="Solde" value="89 400 €" actions={ <Button size="xs" color="success">Alimenter</Button> } />
 * </Stats>
 * ```
 */
const Stats =
({
    centered = false ,
    children ,
    className ,
    direction ,
    items = [] ,
    ref ,
    ...rest
}) =>
{
    return (
        <div
            className = { getStatsClasses({ className , direction }) }
            ref       = { ref }
            { ...rest }
        >
            { children ?? items.map( ( item , index ) =>
            (
                <Stat
                    key         = { item?.id ?? index }
                    actions     = { item?.actions }
                    centered    = { item?.centered ?? centered }
                    color       = { item?.color }
                    description = { item?.description }
                    figure      = { item?.figure }
                    title       = { item?.title }
                    value       = { item?.value }
                />
            ) ) }
        </div>
    ) ;
} ;

Stats.displayName = 'Stats' ;

export default Stats ;
