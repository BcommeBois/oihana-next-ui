'use client' ;

/**
 * ItemsLayout — a collection rendered through one component, laid out as a
 * list, a grid or a masonry.
 *
 * It owns what every such list repeats : the layout itself
 * ({@link module:components/layouts/Layout}), the stagger of the entry
 * animation, the first item loaded eagerly for the largest paint, and the
 * action each row carries — a remove button, or whatever the caller puts in
 * `option`.
 *
 * 🚨 **`ItemComponent` is a component, not a `renderItem` function.** A page
 * rendered on the server names the component its rows are made of : a CLIENT
 * component reference crosses the server → client boundary, an arbitrary
 * function does not. A `renderItem` callback would forbid the very callers
 * this exists for.
 *
 * ⚠️ **`itemPropName` names the prop each item receives its own value under.**
 * `item` here ; an application whose row components already speak of something
 * else — a record, a thing, a track — says so once rather than renaming every
 * component it owns. It is a string, so it crosses the boundary too.
 *
 * @module components/layouts/ItemsLayout
 *
 * @example
 * ```jsx
 * <ItemsLayout
 *     ItemComponent = { ArticleCard }
 *     columns       = { { xs : 1 , md : 2 , xl : 3 } }
 *     display       = "grid"
 *     items         = { articles }
 *     onRemove      = { handleRemove }
 * />
 *
 * // Rows that expect `record={ … }` rather than `item={ … }`
 * <ItemsLayout ItemComponent={ Row } itemPropName="record" items={ rows } />
 * ```
 */

import Layout from './Layout' ;

import RemoveButton from '../buttons/RemoveButton' ;

import SlideDown from '../../motions/SlideDown' ;

import cn from '../../themes/helpers/cn' ;

export { displays , FLEX , GRID , MASONRY , NONE } from './Layout' ;

/**
 * The prop an item is handed under, unless the caller says otherwise.
 * @type {string}
 */
export const ITEM_PROP_NAME = 'item' ;

/**
 * The key of an item, when the caller gives no `getKey`.
 *
 * @param {Object} item
 * @returns {?string}
 */
const defaultGetKey = item => item?._key ?? item?.id ?? null ;

/**
 * @param {Object}            [props]
 * @param {string}            [props.alignContent]          - Cross-axis content alignment.
 * @param {string}            [props.alignItems]            - Cross-axis item alignment.
 * @param {boolean}           [props.animated]              - Animates each item.
 * @param {string}            [props.autoCols]              - Grid auto-columns template.
 * @param {string}            [props.className]             - Class names for the container.
 * @param {string}            [props.columnClassName]       - Class names for each masonry column.
 * @param {number|Object}     [props.columns]               - Grid columns, responsive object supported.
 * @param {boolean}           [props.deletable=true]        - Gives each item a remove button.
 * @param {'row'|'col'}       [props.direction='col']       - Flex direction.
 * @param {boolean}           [props.disabled]              - Disables every item.
 * @param {import('./Layout').LayoutDisplay} [props.display] - How the collection is laid out.
 * @param {boolean}           [props.editable=true]         - Shows the item's action.
 * @param {string}            [props.flow]                  - Grid auto-flow.
 * @param {Function}          [props.getKey]                - `( item ) => key` ; `_key` then `id` by default, the index as a last resort.
 * @param {number|Object}     [props.gap=2]                 - Gap between items.
 * @param {number|Object}     [props.gapX]                  - Horizontal gap.
 * @param {number|Object}     [props.gapY]                  - Vertical gap.
 * @param {React.ElementType} props.ItemComponent           - The component each item is rendered through.
 * @param {string}            [props.itemPropName='item']   - The prop an item is handed under.
 * @param {Object}            [props.itemProps]             - Spread onto EVERY item — context a row needs beyond its own value. Serializable values only : this crosses the server → client boundary.
 * @param {string}            [props.items]                 - The collection.
 * @param {string}            [props.justifyContent]        - Main-axis content alignment.
 * @param {string}            [props.justifyItems]          - Inline-axis item alignment.
 * @param {string}            [props.layoutKey]             - Suffix added to every key, to force a re-render.
 * @param {boolean}           [props.lazyMount]             - Defers each item's image until it is near the viewport. Ignored on the first when `priorityFirst`.
 * @param {React.ElementType} [props.MotionComponent]       - Motion wrapper handed to each item.
 * @param {number}            [props.motionDelayOffset=0.05] - Seconds between two items' entrances.
 * @param {Object}            [props.motionOptions]         - Motion props handed to each item.
 * @param {Function}          [props.onRemove]              - Called with the item behind the remove button.
 * @param {React.ReactNode}   [props.option]                - Rendered as the item's action, instead of the remove button.
 * @param {string}            [props.optionClassName]       - Class names for the option's container.
 * @param {number|Object}     [props.padding]               - Padding, all sides.
 * @param {number|Object}     [props.paddingBottom]         - Bottom padding.
 * @param {number|Object}     [props.paddingEnd]            - End padding, writing-direction aware.
 * @param {number|Object}     [props.paddingLeft]           - Left padding.
 * @param {number|Object}     [props.paddingRight]          - Right padding.
 * @param {number|Object}     [props.paddingStart]          - Start padding, writing-direction aware.
 * @param {number|Object}     [props.paddingTop]            - Top padding.
 * @param {number|Object}     [props.paddingX]              - Horizontal padding.
 * @param {number|Object}     [props.paddingY]              - Vertical padding.
 * @param {string}            [props.placeContent]          - `place-content` shorthand.
 * @param {string}            [props.placeItems]            - `place-items` shorthand.
 * @param {boolean}           [props.priorityFirst=true]    - Loads the first item's image eagerly, for the largest paint.
 * @param {number|Object}     [props.rows]                  - Grid rows.
 * @param {boolean}           [props.showTooltip]           - Shows the action's tooltip.
 * @param {string}            [props.wrap]                  - Flex wrapping.
 *
 * @returns {React.ReactElement}
 */
const ItemsLayout =
({
    alignContent ,
    alignItems ,
    animated ,
    autoCols ,
    className ,
    columnClassName ,
    columns           = { xs : 1 , md : 2 , xl : 3 , xxl : 4 } ,
    deletable         = true ,
    direction         = 'col' ,
    disabled ,
    display ,
    editable          = true ,
    flow ,
    gap               = 2 ,
    gapX ,
    gapY ,
    getKey            = defaultGetKey ,
    ItemComponent ,
    itemPropName      = ITEM_PROP_NAME ,
    itemProps ,
    items ,
    justifyContent ,
    justifyItems ,
    layoutKey ,
    lazyMount ,
    MotionComponent   = SlideDown ,
    motionDelayOffset = 0.05 ,
    motionOptions ,
    onRemove ,
    option ,
    optionClassName ,
    padding ,
    paddingBottom ,
    paddingEnd ,
    paddingLeft ,
    paddingRight ,
    paddingStart ,
    paddingTop ,
    paddingX ,
    paddingY ,
    placeContent ,
    placeItems ,
    priorityFirst     = true ,
    rows ,
    showTooltip ,
    wrap ,
}) =>
{
    // -------- The action an item carries

    const getAction = item =>
    {
        if ( option )
        {
            return (
                <div className={ cn( 'flex items-center' , optionClassName ) }>
                    { option }
                </div>
            ) ;
        }

        if ( editable && deletable )
        {
            return (
                <RemoveButton
                    color       = "ghost"
                    disabled    = { disabled }
                    motion      = { null }
                    shape       = "square"
                    showTooltip = { showTooltip }
                    size        = "sm"
                    onClick     = { () => onRemove?.( item ) }
                />
            ) ;
        }

        return null ;
    } ;

    // -------- One item

    const renderItem = ( item , index ) =>
    {
        const own = getKey?.( item ) ?? index ;
        const key = layoutKey ? `item-${ own }-${ layoutKey }` : `item-${ own }` ;

        return (
            <ItemComponent
                key             = { key }
                animated        = { animated }
                disabled        = { disabled }
                display         = { display }
                lazyMount       = { lazyMount }
                MotionComponent = { MotionComponent }
                motionOptions   = { { ...motionOptions , delay : motionDelayOffset * index } }
                priority        = { priorityFirst && index === 0 }
                right           = { getAction( item ) }
                { ...{ [ itemPropName ] : item } }
                { ...itemProps }
            />
        ) ;
    } ;

    const children = Array.isArray( items ) && items.length > 0 && ItemComponent
        ? items.map( renderItem )
        : null ;

    // -------- Render

    return (
        <Layout
            alignContent    = { alignContent }
            alignItems      = { alignItems }
            autoCols        = { autoCols }
            className       = { className }
            columnClassName = { columnClassName }
            columns         = { columns }
            direction       = { direction }
            display         = { display }
            flow            = { flow }
            gap             = { gap }
            gapX            = { gapX }
            gapY            = { gapY }
            justifyContent  = { justifyContent }
            justifyItems    = { justifyItems }
            padding         = { padding }
            paddingBottom   = { paddingBottom }
            paddingEnd      = { paddingEnd }
            paddingLeft     = { paddingLeft }
            paddingRight    = { paddingRight }
            paddingStart    = { paddingStart }
            paddingTop      = { paddingTop }
            paddingX        = { paddingX }
            paddingY        = { paddingY }
            placeContent    = { placeContent }
            placeItems      = { placeItems }
            rows            = { rows }
            wrap            = { wrap }
        >
            { children }
        </Layout>
    ) ;
} ;

ItemsLayout.displayName = 'ItemsLayout' ;

export default ItemsLayout ;
