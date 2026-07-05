'use client' ;

import { cloneElement , useCallback , useMemo , useRef , useState } from 'react' ;

import { DragDropProvider } from '@dnd-kit/react' ;

import useSortableTree from '../../hooks/useSortableTree' ;

import useValue from '../../hooks/useValue' ;

import { arrayMove } from '../../hooks/useSortableList' ;

import {
    buildTree ,
    flattenTree ,
    getProjection ,
    removeChildrenOf ,
} from '../../helpers/treeUtils' ;

import { getTreeClasses , getTreeDropIndicatorClasses } from '../../themes/components/tree' ;

const DEFAULT_INDENT = 24 ;

/**
 * SortableTree component.
 * A multi-level list whose nodes can be **reordered among siblings** and
 * **reparented** (indent / outdent) by drag and drop. The horizontal position
 * of the pointer during the drag determines the target depth ; the dragged
 * subtree collapses and follows its parent (which also prevents dropping a
 * node into its own descendants).
 *
 * The whole tree is **one value** : a nested array `[ { id , children : [...] } ]`.
 * Works controlled (`items` + `onChange`) or uncontrolled (`defaultItems`) ; a
 * move produces a single `onChange( nextTree , change )` with
 * `change = { item , fromParent , toParent , fromIndex , toIndex }`, and in
 * uncontrolled mode a rejected promise restores the previous tree (optimistic).
 *
 * Nodes are declared through `renderNode( item , { depth , collapsed , childCount } )`
 * returning a `SortableTreeItem` (`id` / `index` / `depth` / `indent` /
 * `collapsed` / `childCount` / `onToggle` / `handle` / `disabled` injected).
 * Nodes need a **stable unique id** (`item.id` by default, customizable via
 * `getItemId`).
 *
 * @module components/trees/SortableTree
 *
 * @example
 * ```jsx
 * <SortableTree
 *     defaultItems={ [ { id : 'a' , label : 'A' , children : [ { id : 'a1' , label : 'A1' } ] } ] }
 *     onChange={ ( next , change ) => api.save( next ) }
 *     renderNode={ ( node ) => <SortableTreeItem>{ node.label }</SortableTreeItem> }
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {(draggedItem: *, parentItem: *|null) => boolean} [props.canNest] - Whether a node may become a child of a given parent (null = top level) ; when it rejects the projected parent, the drop walks up to the nearest valid ancestor
 * @param {string} [props.className] - Additional classes for the container
 * @param {Array<string|number>} [props.collapsed] - Controlled set of collapsed node ids
 * @param {boolean} [props.collapsible=true] - Allow expanding/collapsing nodes (when false, no chevrons, all nodes stay expanded)
 * @param {Array<string|number>} [props.defaultCollapsed] - Ids of nodes collapsed initially (uncontrolled)
 * @param {Array} [props.defaultItems] - The initial tree for uncontrolled mode
 * @param {boolean} [props.disabled=false] - Disable dragging for all nodes
 * @param {(item: *) => (string|number)} [props.getItemId] - Accessor for the unique identifier of a node (defaults to `item.id`)
 * @param {boolean} [props.handle=true] - Show a drag handle on each row (when false, whole rows are draggable)
 * @param {number} [props.indent=24] - Indentation width per depth level, in pixels
 * @param {Array} [props.items] - The controlled tree from props
 * @param {number} [props.maxDepth] - Maximum nesting depth (accounts for the dragged subtree height)
 * @param {(tree: Array, change: Object) => (void|Promise)} [props.onChange] - Callback invoked with the updated tree
 * @param {(collapsed: Array<string|number>) => void} [props.onCollapsedChange] - Callback invoked with the new collapsed ids
 * @param {(item: *, meta: { depth: number, collapsed: boolean, childCount: number }) => React.ReactElement} props.renderNode - Renders a SortableTreeItem for a node
 */
const SortableTree =
({
    canNest ,
    className ,
    collapsed ,
    collapsible = true ,
    defaultCollapsed ,
    defaultItems ,
    disabled = false ,
    getItemId ,
    handle = true ,
    indent = DEFAULT_INDENT ,
    items ,
    maxDepth ,
    onChange ,
    onCollapsedChange ,
    renderNode ,
    ...rest
}) =>
{
    const { tree , moveNode } = useSortableTree({ defaultItems , items , onChange }) ;

    const getIdRef = useCallback( item => ( getItemId ? getItemId( item ) : ( item?.id ?? item ) ) , [ getItemId ] ) ;

    const accessors = useMemo( () => ( {
        getId       : getIdRef ,
        getChildren : item => item?.children ?? [] ,
    } ) , [ getIdRef ] ) ;

    const [ collapsedList , setCollapsedList ] = useValue( defaultCollapsed ?? [] , collapsed , onCollapsedChange ) ;
    const collapsedIds = useMemo( () => ( collapsible ? new Set( collapsedList ) : new Set() ) , [ collapsedList , collapsible ] ) ;

    const [ activeId   , setActiveId ]   = useState( null ) ;
    const [ overId     , setOverId ]     = useState( null ) ;
    const [ offsetLeft , setOffsetLeft ] = useState( 0 ) ;
    const offsetLeftRef = useRef( 0 ) ;

    const flattened = useMemo( () => flattenTree( tree , accessors ) , [ tree , accessors ] ) ;

    const visible = useMemo( () =>
    {
        const hiddenParents = [ ...collapsedIds , ...( activeId != null ? [ activeId ] : [] ) ] ;
        return removeChildrenOf( flattened , hiddenParents ) ;
    } , [ flattened , collapsedIds , activeId ] ) ;

    // Height of the dragged subtree, so a folder dropped near the limit doesn't push its children past maxDepth.
    const activeSubtreeHeight = useMemo( () =>
    {
        if ( activeId == null )
        {
            return 0 ;
        }
        const startIndex = flattened.findIndex( entry => entry.id === activeId ) ;
        if ( startIndex === -1 )
        {
            return 0 ;
        }
        const baseDepth = flattened[ startIndex ].depth ;
        let deepest = baseDepth ;
        for ( let i = startIndex + 1 ; i < flattened.length && flattened[ i ].depth > baseDepth ; i++ )
        {
            deepest = Math.max( deepest , flattened[ i ].depth ) ;
        }
        return deepest - baseDepth ;
    } , [ flattened , activeId ] ) ;

    const projectionOptions = {
        canNest ,
        maxDepth : typeof maxDepth === 'number' ? Math.max( 0 , maxDepth - activeSubtreeHeight ) : undefined ,
    } ;

    const projected = activeId != null
        ? getProjection( visible , activeId , overId ?? activeId , offsetLeft , indent , projectionOptions )
        : null ;

    const toggle = ( id ) =>
    {
        if ( !collapsible )
        {
            return ;
        }
        const next = new Set( collapsedIds ) ;
        next.has( id ) ? next.delete( id ) : next.add( id ) ;
        setCollapsedList( [ ...next ] ) ;
    } ;

    const resetDragState = () =>
    {
        setActiveId( null ) ;
        setOverId( null ) ;
        setOffsetLeft( 0 ) ;
        offsetLeftRef.current = 0 ;
    } ;

    const onDragStart = ( event ) =>
    {
        setActiveId( event?.operation?.source?.id ?? null ) ;
    } ;

    const onDragMove = ( event ) =>
    {
        // The event's operation is a plain snapshot : Position's `.delta` getter is
        // stripped, so we read the applied `transform` (cumulative from drag start).
        const x = event?.operation?.transform?.x ?? 0 ;
        offsetLeftRef.current = x ;
        setOffsetLeft( x ) ;
    } ;

    const onDragOver = ( event ) =>
    {
        setOverId( event?.operation?.target?.id ?? null ) ;
    } ;

    const onDragEnd = ( event ) =>
    {
        const source = event?.operation?.source ;
        const target = event?.operation?.target ;

        // A purely horizontal drag may leave `target` unset : fall back to the active node.
        const overNodeId = target?.id ?? source?.id ;

        const projection = source
            ? getProjection( visible , source.id , overNodeId , offsetLeftRef.current , indent , projectionOptions )
            : null ;

        resetDragState() ;

        if ( event?.canceled || !source || !projection || projection.allowed === false )
        {
            return ;
        }

        const full        = flattenTree( tree , accessors ) ;
        const overIndex   = full.findIndex( entry => entry.id === overNodeId ) ;
        const activeIndex = full.findIndex( entry => entry.id === source.id ) ;

        if ( overIndex === -1 || activeIndex === -1 )
        {
            return ;
        }

        const moved = full[ activeIndex ] ;

        if ( projection.parentId === moved.parentId && overIndex === activeIndex )
        {
            return ;
        }

        const updated = full.map( ( entry , i ) =>
            i === activeIndex
                ? { ...entry , depth : projection.depth , parentId : projection.parentId }
                : entry
        ) ;

        const sorted   = arrayMove( updated , activeIndex , overIndex ) ;
        const nextTree = buildTree( sorted , { setChildren : ( item , children ) => ( { ...item , children } ) } ) ;

        const toIndex = sorted
            .filter( entry => entry.parentId === projection.parentId )
            .findIndex( entry => entry.id === source.id ) ;

        moveNode( nextTree ,
        {
            item       : moved.item ,
            fromParent : moved.parentId ,
            toParent   : projection.parentId ,
            fromIndex  : moved.index ,
            toIndex ,
        }) ;
    } ;

    const overNodeId       = overId ?? activeId ;
    const overVisibleIndex = visible.findIndex( entry => entry.id === overNodeId ) ;
    const showIndicator    = activeId != null && projected != null && overVisibleIndex !== -1 ;
    const indicatorAfter   = visible.findIndex( entry => entry.id === activeId ) < overVisibleIndex ;

    const dropIndicator = showIndicator ? (
        <div
            key        = "tree-drop-indicator"
            aria-hidden = "true"
            className  = { getTreeDropIndicatorClasses({ denied : projected.allowed === false }) }
            style      = {{ marginInlineStart : projected.depth * indent }}
        />
    ) : null ;

    return (
        <DragDropProvider
            onDragStart = { onDragStart }
            onDragMove  = { onDragMove }
            onDragOver  = { onDragOver }
            onDragEnd   = { onDragEnd }
        >
            <div className={ getTreeClasses({ className }) } { ...rest }>
                { visible.map( ( entry , index ) =>
                {
                    const displayDepth = entry.id === activeId && projected ? projected.depth : entry.depth ;
                    const isCollapsed  = collapsedIds.has( entry.id ) ;

                    const element = typeof renderNode === 'function'
                        ? renderNode( entry.item , { depth : displayDepth , collapsed : isCollapsed , childCount : entry.childCount } )
                        : null ;

                    if ( !element )
                    {
                        return null ;
                    }

                    const row = cloneElement( element ,
                    {
                        key         : entry.id ,
                        id          : entry.id ,
                        index ,
                        depth       : displayDepth ,
                        indent ,
                        collapsed   : isCollapsed ,
                        collapsible ,
                        childCount  : entry.childCount ,
                        onToggle    : () => toggle( entry.id ) ,
                        disabled    : element.props.disabled ?? disabled ,
                        handle      : element.props.handle   ?? handle ,
                    }) ;

                    if ( showIndicator && entry.id === overNodeId )
                    {
                        return indicatorAfter ? [ row , dropIndicator ] : [ dropIndicator , row ] ;
                    }

                    return row ;
                })}
            </div>
        </DragDropProvider>
    ) ;
} ;

SortableTree.displayName = 'SortableTree' ;

export default SortableTree ;
