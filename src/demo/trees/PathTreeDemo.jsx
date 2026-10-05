'use client' ;

/**
 * Demo : `PathTree`, in read and in selection, over a list whose hierarchy
 * exists only in its dotted paths.
 *
 * The dataset carries the two decisions worth seeing rather than reading : a
 * path deeper than the cap, whose tail is rejoined, and an item with no path
 * at all, which lands in the orphan folder instead of dropping out.
 *
 * @module demo/trees/PathTreeDemo
 */

import { useMemo , useState } from 'react' ;

import { MdLock } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Badge       from '@/components/Badge' ;
import Checkbox    from '@/components/checkboxes/Checkbox' ;
import Button      from '@/components/Button' ;
import InputSearch from '@/components/inputs/InputSearch' ;
import PathTree    from '@/components/trees/PathTree' ;

import groupByPath          from '@/helpers/trees/groupByPath' ;
import usePathTreeOpenState from '@/hooks/usePathTreeOpenState' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;

/**
 * Settings keys, flat. **Nothing here says who its parent is** : the hierarchy
 * is read out of the key itself, which is the whole point.
 *
 * Several folders hold BOTH their own leaves and sub-folders, because that is
 * where a tree gets interesting — and where an unindented one becomes
 * unreadable. The last two keys are deliberate : one goes past the cap of four
 * levels, the other has no dot at all and belongs nowhere.
 *
 * @type {string[]}
 */
const KEYS =
[
    'app.display.theme' ,
    'app.display.density' ,
    'app.display.fontSize' ,
    'app.display.sidebar.width' ,
    'app.display.sidebar.collapsed' ,
    'app.display.table.rowHeight' ,
    'app.display.table.striped' ,
    'app.display.table.stickyHeader' ,
    'app.network.timeout' ,
    'app.network.baseUrl' ,
    'app.network.retry.count' ,
    'app.network.retry.backoff' ,
    'app.network.retry.jitter' ,
    'app.network.cache.ttl' ,
    'app.network.cache.maxEntries' ,
    'storage.cache.maxSize' ,
    'storage.cache.ttl' ,
    'storage.quota.soft' ,
    'storage.quota.hard' ,
    'a.b.c.d.e.f.value' ,
    'nowhere' ,
] ;

/**
 * One item per key : the key is its identity, the last segment is what shows,
 * and everything before is the path the tree is built from.
 *
 * @type {{ key : string , label : string , path : string }[]}
 */
const ITEMS = KEYS.map( ( key ) =>
{
    const segments = key.split( '.' ) ;

    return {
        key ,
        label : segments.at( -1 ) ,
        path  : segments.slice( 0 , -1 ).join( '.' ) ,
    } ;
}) ;

/**
 * The rows a reader cannot untick, to show what a lock does to the count.
 *
 * One sits beside two editable siblings, the other is one of a pair — so a
 * folder reads FULL with a locked row left unticked in it, which is the point.
 *
 * @type {string[]}
 */
const LOCKED = [ 'app.display.theme' , 'storage.cache.ttl' ] ;

/**
 * One card : a title, a sentence, and the tree.
 */
const Case = ({ children , subtitle , title }) =>
(
    <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">
        <h3 className="font-semibold">{ title }</h3>
        <p className="text-sm text-base-content/70">{ subtitle }</p>
        { children }
    </div>
) ;

Case.displayName = 'Case' ;

/**
 * @param {Object} props
 * @param {string} [props.path='demo.trees.pathTree'] - Dot notation path to the demo locale.
 * @returns {React.JSX.Element}
 */
const PathTreeDemo = ( { path = 'demo.trees.pathTree' } = {} ) =>
{
    const t = useI18n( path ) ;

    const [ query    , setQuery    ] = useState( '' ) ;
    const [ selected , setSelected ] = useState( () => new Set( [ 'app.display.density' , 'app.network.timeout' ] ) ) ;

    const locked = useMemo( () => new Set( LOCKED ) , [] ) ;

    const filtered = useMemo( () =>
    {
        const needle = query.trim().toLowerCase() ;

        if ( !needle ) { return ITEMS ; }

        return ITEMS.filter( ( item ) => item.key.toLowerCase().includes( needle ) ) ;
    }
    , [ query ] ) ;

    const tree = useMemo( () => groupByPath( filtered , { getPath : ( item ) => item.path } ) , [ filtered ] ) ;

    const read   = usePathTreeOpenState({ query , tree }) ;
    const select = usePathTreeOpenState({ query , tree }) ;

    const toggleGroup = ( items , next ) =>
    {
        setSelected( ( previous ) =>
        {
            const copy = new Set( previous ) ;

            for ( const item of items )
            {
                if ( locked.has( item.key ) ) { continue ; }
                if ( next ) { copy.add( item.key ) ; }
                else        { copy.delete( item.key ) ; }
            }

            return copy ;
        }) ;
    } ;

    const toggleLeaf = ( item , next ) =>
    {
        setSelected( ( previous ) =>
        {
            const copy = new Set( previous ) ;
            if ( next ) { copy.add( item.key ) ; }
            else        { copy.delete( item.key ) ; }
            return copy ;
        }) ;
    } ;

    const leafLabel = ( item ) => (
        <>
            <span className="font-mono">{ item.label }</span>
            { locked.has( item.key ) && (
                <span className="inline-flex items-center gap-1 text-xs text-base-content/50">
                    <MdLock className="size-3" />
                    { t.select.locked }
                </span>
            ) }
        </>
    ) ;

    const renderLeaf = ( item ) => (
        <li className="flex items-center gap-2 ps-1 py-0.5 text-sm" key={ item.key }>
            { leafLabel( item ) }
        </li>
    ) ;

    // The selectable card draws its own leaves : without a checkbox on each
    // one, nothing can be ticked below a folder, and the tri-state of the
    // folders above has nothing to be a state OF.
    const renderSelectableLeaf = ( item ) => (
        <li className="flex items-center gap-2 py-0.5 text-sm" key={ item.key }>
            <Checkbox
                checkboxClassName = "checkbox-xs"
                checked           = { selected.has( item.key ) }
                disabled          = { locked.has( item.key ) }
                onChange          = { ( event ) => toggleLeaf( item , event.target.checked ) }
            />
            { leafLabel( item ) }
        </li>
    ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <p className="text-sm text-base-content/70">{ t.description }</p>

            <InputSearch
                className   = "w-full max-w-md"
                label       = { t.search }
                placeholder = { t.placeholder }
                value       = { query }
                onChange    = { ( value ) => setQuery( value ) }
            />

            <div className="grid gap-4 lg:grid-cols-2">

                <Case subtitle={ t.read.subtitle } title={ t.read.title }>
                    <div className="flex flex-wrap gap-2">
                        <Button size="sm" style="outline" onClick={ read.expandAll }>{ t.expandAll }</Button>
                        <Button size="sm" style="outline" onClick={ read.collapseAll }>{ t.collapseAll }</Button>
                    </div>
                    { tree.length === 0
                        ? <p className="text-sm text-base-content/50 italic">{ t.empty }</p>
                        : (
                            <ul>
                                <PathTree
                                    nodes        = { tree }
                                    openPaths    = { read.openPaths }
                                    renderItem   = { renderLeaf }
                                    onToggleOpen = { read.toggle }
                                />
                            </ul>
                        )
                    }
                </Case>

                <Case subtitle={ t.select.subtitle } title={ t.select.title }>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button size="sm" style="outline" onClick={ select.expandAll }>{ t.expandAll }</Button>
                        <Button size="sm" style="outline" onClick={ select.collapseAll }>{ t.collapseAll }</Button>
                        <Button size="sm" style="ghost" onClick={ () => setSelected( new Set() ) }>
                            { t.select.clear }
                        </Button>
                        <Badge color="primary" style="soft">
                            { format( t.select.selected , selected.size ) }
                        </Badge>
                    </div>
                    { tree.length === 0
                        ? <p className="text-sm text-base-content/50 italic">{ t.empty }</p>
                        : (
                            <ul>
                                <PathTree
                                    getKey        = { ( item ) => item.key }
                                    lockedKeys    = { locked }
                                    nodes         = { tree }
                                    openPaths     = { select.openPaths }
                                    renderItem    = { renderSelectableLeaf }
                                    selectable
                                    selected      = { selected }
                                    onToggleGroup = { toggleGroup }
                                    onToggleOpen  = { select.toggle }
                                />
                            </ul>
                        )
                    }
                </Case>

            </div>

            <div className="flex flex-col gap-2 text-xs text-base-content/60 leading-relaxed">
                <p className="font-semibold text-base-content/80">{ t.notes.title }</p>
                <p>{ t.notes.depth }</p>
                <p>{ t.notes.orphan }</p>
            </div>

        </Container>
    ) ;
} ;

PathTreeDemo.displayName = 'PathTreeDemo' ;

export default PathTreeDemo ;
