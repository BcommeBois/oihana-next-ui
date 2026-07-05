'use client' ;

import { cloneElement , useCallback , useMemo , useRef , useState } from 'react' ;

import { DragDropProvider } from '@dnd-kit/react' ;

import useSortableTree from '../../hooks/useSortableTree' ;

import { arrayMove } from '../../hooks/useSortableList' ;

import {
    buildTree ,
    flattenTree ,
    getProjection ,
    removeChildrenOf ,
} from '../../helpers/treeUtils' ;

import { getTreeClasses } from '../../themes/components/tree' ;

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
 * @param {string} [props.className] - Additional classes for the container
 * @param {Array<string|number>} [props.defaultCollapsed] - Ids of nodes collapsed initially
 * @param {Array} [props.defaultItems] - The initial tree for uncontrolled mode
 * @param {boolean} [props.disabled=false] - Disable dragging for all nodes
 * @param {(item: *) => (string|number)} [props.getItemId] - Accessor for the unique identifier of a node (defaults to `item.id`)
 * @param {boolean} [props.handle=true] - Show a drag handle on each row (when false, whole rows are draggable)
 * @param {number} [props.indent=24] - Indentation width per depth level, in pixels
 * @param {Array} [props.items] - The controlled tree from props
 * @param {(tree: Array, change: Object) => (void|Promise)} [props.onChange] - Callback invoked with the updated tree
 * @param {(item: *, meta: { depth: number, collapsed: boolean, childCount: number }) => React.ReactElement} props.renderNode - Renders a SortableTreeItem for a node
 */
const SortableTree =
({
    className ,
    defaultCollapsed ,
    defaultItems ,
    disabled = false ,
    getItemId ,
    handle = true ,
    indent = DEFAULT_INDENT ,
    items ,
    onChange ,
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

    const [ collapsedIds , setCollapsedIds ] = useState( () => new Set( defaultCollapsed ?? [] ) ) ;

    const [ activeId   , setActiveId ]   = useState( null ) ;
    const [ overId     , setOverId ]     = useState( null ) ;
    const [ offsetLeft , setOffsetLeft ] = useState( 0 ) ;
    const offsetLeftRef = useRef( 0 ) ;

    const flattened = useMemo( () => flattenTree( tree , accessors ) , [ tree , accessors ] ) ;

    const visible = useMemo( () =>
    {
        const collapsedList = [ ...collapsedIds , ...( activeId != null ? [ activeId ] : [] ) ] ;
        return removeChildrenOf( flattened , collapsedList ) ;
    } , [ flattened , collapsedIds , activeId ] ) ;

    const projected = activeId != null
        ? getProjection( visible , activeId , overId ?? activeId , offsetLeft , indent )
        : null ;

    const toggle = ( id ) =>
    {
        setCollapsedIds( previous =>
        {
            const next = new Set( previous ) ;
            next.has( id ) ? next.delete( id ) : next.add( id ) ;
            return next ;
        }) ;
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
            ? getProjection( visible , source.id , overNodeId , offsetLeftRef.current , indent )
            : null ;

        resetDragState() ;

        if ( event?.canceled || !source || !projection )
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
                    const collapsed    = collapsedIds.has( entry.id ) ;

                    const element = typeof renderNode === 'function'
                        ? renderNode( entry.item , { depth : displayDepth , collapsed , childCount : entry.childCount } )
                        : null ;

                    if ( !element )
                    {
                        return null ;
                    }

                    return cloneElement( element ,
                    {
                        key        : entry.id ,
                        id         : entry.id ,
                        index ,
                        depth      : displayDepth ,
                        indent ,
                        collapsed ,
                        childCount : entry.childCount ,
                        onToggle   : () => toggle( entry.id ) ,
                        disabled   : element.props.disabled ?? disabled ,
                        handle     : element.props.handle   ?? handle ,
                    }) ;
                })}
            </div>
        </DragDropProvider>
    ) ;
} ;

SortableTree.displayName = 'SortableTree' ;

export default SortableTree ;
