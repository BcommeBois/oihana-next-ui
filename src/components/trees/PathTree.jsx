'use client' ;

/**
 * PathTree — a folder tree built from dotted paths, in read or in selection.
 *
 * It renders what {@link module:helpers/trees/groupByPath} returns : folders
 * that open, their direct leaves drawn by the caller's `renderItem`, and a
 * count. Give it `selectable` and each folder carries a tri-state checkbox
 * over its whole subtree.
 *
 * It is NOT {@link module:components/trees/SortableTree} : that one reorders a
 * hierarchy by drag and drop, keyed on `parentId`. This one shows a hierarchy
 * that exists only in the strings, and nothing here moves.
 *
 * ### 🚨 The disclosure is a BUTTON, and the checkbox is its sibling
 *
 * The obvious spelling is `<details>` / `<summary>`, and it is a trap as soon
 * as a checkbox is involved : a `<summary>` IS a button, so a checkbox inside
 * one is interactive content nested in interactive content — invalid, and it
 * forces a `stopPropagation` on the checkbox to stop a tick from toggling the
 * folder. The checkbox sits BESIDE the button instead, which needs no such
 * guard and leaves each control its own name.
 *
 * ### 🔑 Keyed on `path`, never on an index
 *
 * `path` is stable across a re-group, and a tree is re-grouped on every
 * keystroke of a search. React keys, open state and selection all read it.
 *
 * ### 🚨 It indents itself
 *
 * The obvious reading is that a nested `<ul>` indents on its own. It does not :
 * Tailwind's preflight strips the browser's list padding, so every level comes
 * out flush with the one above and the hierarchy is simply invisible. The three
 * screens this was gathered from did not notice because their root list carried
 * daisyUI's `menu`, which indents nested lists for them — an invisible contract
 * with an ancestor the component does not render, and one that would have made
 * `PathTree` look broken for anyone who did not know. It indents itself
 * instead, and draws a discreet guide down each level so depth can be followed
 * rather than counted.
 *
 * ⚠️ A host that DOES wrap it in daisyUI's `menu` gets both indentations. The
 * wrapper is the one to drop.
 *
 * ### What it leaves to its host
 *
 * The toolbar. « Expand all » and « collapse all » sit beside a search field
 * and whatever else a screen offers, which this component knows nothing about
 * — {@link module:hooks/usePathTreeOpenState} hands over the two functions,
 * and `components.tree` the two labels. Same for the empty state : a tree with
 * nothing to show renders nothing, and the sentence explaining why belongs to
 * whoever knows what was searched.
 *
 * @module components/trees/PathTree
 *
 * @param {Object}   props
 * @param {string}   [props.countLabel]      - Pattern of the count badge, `{0}` of `{1}`. Defaults to the bundle's `count`.
 * @param {number}   [props.depth=0]         - Depth of the nodes given, for the font of the first level. Set by the recursion.
 * @param {Set}      [props.lockedKeys]      - Keys that cannot be ticked. A folder of nothing but locked leaves is disabled.
 * @param {Array}    props.nodes             - The nodes, from `groupByPath`.
 * @param {Function} [props.onToggleGroup]   - Called with the folder's `allItems` and the new state, when its checkbox is ticked.
 * @param {Function} props.onToggleOpen      - Called with `( path , open )`.
 * @param {Set}      props.openPaths         - The paths currently open.
 * @param {string}   [props.path='components.tree'] - i18n path the labels are read from.
 * @param {Function} props.renderItem        - Draws one leaf. Receives the item.
 * @param {boolean}  [props.selectable=false] - Draw a tri-state checkbox on each folder.
 * @param {Set}      [props.selected]        - Keys currently selected, read through `getKey`.
 * @param {Function} [props.getKey]          - Reads the key of a leaf. Defaults to its `_key`, then its `id`.
 * @param {Map}      [props.totals]          - Per-path denominator of the count — the whole, when a search is showing a part. Without it the badge shows the count alone, because « 6/6 » says nothing twice.
 *
 * @example
 * ```jsx
 * const tree = useMemo( () => groupByPath( items , { getPath } ) , [ items ] ) ;
 * const { openPaths , toggle } = usePathTreeOpenState({ query , tree }) ;
 *
 * <ul>
 *     <PathTree
 *         nodes        = { tree }
 *         openPaths    = { openPaths }
 *         renderItem   = { item => <li key={ item.id }>{ item.label }</li> }
 *         onToggleOpen = { toggle }
 *     />
 * </ul>
 * ```
 */

import { MdChevronRight , MdFolder } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import Checkbox from '../checkboxes/Checkbox' ;

import cn from '../../themes/helpers/cn' ;

/**
 * Reads the key of a leaf when the caller names none.
 *
 * @param {Object} item
 * @returns {*}
 */
const defaultGetKey = ( item ) => item?._key ?? item?.id ;

/**
 * What a folder's checkbox shows, over its whole subtree.
 *
 * 🔑 **Locked leaves are out of the count entirely.** A folder of ten leaves
 * where nine are locked and the tenth is ticked reads FULL, not « one of ten »
 * — because ticking the box can only ever reach that one. Counting the locked
 * ones would leave the box forever indeterminate and the reader forever
 * wondering what is left to tick.
 *
 * @param {Array} items        - The folder's `allItems`.
 * @param {Set}   selected
 * @param {Set}   lockedKeys
 * @param {Function} getKey
 * @returns {{ checked : boolean , editableCount : number , indeterminate : boolean , selectedCount : number }}
 */
export const deriveGroupState = ( items , selected , lockedKeys , getKey = defaultGetKey ) =>
{
    const editable = ( items ?? [] ).filter( ( item ) => !lockedKeys?.has( getKey( item ) ) ) ;

    const selectedCount = editable.reduce
    (
        ( n , item ) =>
        {
            const key = getKey( item ) ;
            return key && selected?.has( key ) ? n + 1 : n ;
        } ,
        0 ,
    ) ;

    return {
        checked       : editable.length > 0 && selectedCount === editable.length ,
        editableCount : editable.length ,
        indeterminate : selectedCount > 0 && selectedCount < editable.length ,
        selectedCount ,
    } ;
} ;

const PathTree =
({
    countLabel ,
    depth      = 0 ,
    getKey     = defaultGetKey ,
    lockedKeys ,
    nodes ,
    onToggleGroup ,
    onToggleOpen ,
    openPaths ,
    path       = 'components.tree' ,
    renderItem ,
    selectable = false ,
    selected ,
    totals ,
}) =>
{
    const { count : countFromI18n } = useI18n( path , NO_LOCALE , false ) ;

    const pattern = countLabel ?? countFromI18n ?? '{0}/{1}' ;

    return ( nodes ?? [] ).map( ( node ) =>
    {
        const isOpen      = openPaths?.has( node.path ) ?? false ;
        const hasChildren = node.children?.length > 0 ;

        const state = selectable
            ? deriveGroupState( node.allItems , selected , lockedKeys , getKey )
            : null ;

        // 🚨 Without a denominator the pattern reads « 6/6 », which says nothing
        // twice. A total is only meaningful when it differs from the count —
        // when a search is filtering, and the host says what the whole was.
        const total = totals?.get( node.path ) ;

        const badge = state
            ? format( pattern , state.selectedCount , node.allItems.length )
            : ( total === undefined ? node.count : format( pattern , node.count , total ) ) ;

        return (
            <li key={ node.path }>

                <div className="flex items-center gap-2">

                    { state && (
                        <Checkbox
                            checkboxClassName = "checkbox-sm"
                            checked           = { state.checked }
                            disabled          = { state.editableCount === 0 }
                            indeterminate     = { state.indeterminate }
                            onChange          = { ( event ) => onToggleGroup?.( node.allItems , event.target.checked ) }
                        />
                    ) }

                    <button
                        aria-expanded = { isOpen }
                        className     = "flex items-center gap-2 flex-1 min-w-0"
                        type          = "button"
                        onClick       = { () => onToggleOpen?.( node.path , !isOpen ) }
                    >
                        <MdChevronRight className={ cn(
                            'size-4 text-base-content/50 shrink-0 transition-transform' ,
                            isOpen && 'rotate-90' ,
                        ) } />
                        <MdFolder className="size-4 text-base-content/60 shrink-0" />
                        <span className={ cn( 'font-mono truncate' , depth === 0 && 'font-semibold' ) }>
                            { node.key }
                        </span>
                        <span className="badge badge-ghost badge-xs tabular-nums ml-auto shrink-0">
                            { badge }
                        </span>
                    </button>

                </div>

                { isOpen && (
                    <ul className="ms-3 ps-2 border-s border-base-300">
                        { node.items?.map( renderItem ) }
                        { hasChildren && (
                            <PathTree
                                countLabel    = { pattern }
                                depth         = { depth + 1 }
                                getKey        = { getKey }
                                lockedKeys    = { lockedKeys }
                                nodes         = { node.children }
                                onToggleGroup = { onToggleGroup }
                                onToggleOpen  = { onToggleOpen }
                                openPaths     = { openPaths }
                                path          = { path }
                                renderItem    = { renderItem }
                                selectable    = { selectable }
                                selected      = { selected }
                                totals        = { totals }
                            />
                        ) }
                    </ul>
                ) }

            </li>
        ) ;
    }) ;
} ;

PathTree.displayName = 'PathTree' ;

export default PathTree ;
