'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import SortableTree     from '@/components/trees/SortableTree' ;
import SortableTreeItem from '@/components/trees/SortableTreeItem' ;

import Container from '@/display/Container' ;

import { MdFolder , MdInsertDriveFile , MdUnfoldLess , MdUnfoldMore } from 'react-icons/md' ;

// Ids of every node that has children (for expand-all / collapse-all).
const folderIdsOf = ( nodes ) => nodes.flatMap( n => ( n.children?.length ? [ n.id , ...folderIdsOf( n.children ) ] : [] ) ) ;

const makeTree = ( prefix ) =>
[
    {
        id    : `${ prefix }-src` ,
        label : 'src' ,
        children :
        [
            {
                id    : `${ prefix }-components` ,
                label : 'components' ,
                children :
                [
                    { id : `${ prefix }-button` , label : 'Button.jsx' } ,
                    { id : `${ prefix }-input`  , label : 'Input.jsx'  } ,
                ] ,
            } ,
            {
                id    : `${ prefix }-hooks` ,
                label : 'hooks' ,
                children :
                [
                    { id : `${ prefix }-usevalue` , label : 'useValue.js' } ,
                ] ,
            } ,
            { id : `${ prefix }-index` , label : 'index.js' } ,
        ] ,
    } ,
    {
        id    : `${ prefix }-public` ,
        label : 'public' ,
        children :
        [
            { id : `${ prefix }-logo` , label : 'logo.svg' } ,
        ] ,
    } ,
    { id : `${ prefix }-readme` , label : 'README.md' } ,
] ;

const SortableTreeDemo = () =>
{
    // --------- Typed tree (folders vs files) for the canNest example

    const typedTree =
    [
        {
            id : 't-src' , label : 'src' , type : 'folder' , children :
            [
                { id : 't-app' , label : 'app' , type : 'folder' , children : [ { id : 't-page' , label : 'page.jsx' , type : 'file' } ] } ,
                { id : 't-utils' , label : 'utils.js' , type : 'file' } ,
            ] ,
        } ,
        { id : 't-readme' , label : 'README.md' , type : 'file' } ,
    ] ;

    const canNestInFolders = ( _item , parent ) => parent === null || parent.type === 'folder' ;

    const renderTypedNode = ( node ) => (
        <SortableTreeItem>
            <span className="flex items-center gap-2">
                { node.type === 'folder'
                    ? <MdFolder className="text-warning" size={ 18 } />
                    : <MdInsertDriveFile className="opacity-50" size={ 16 } /> }
                <span className="text-sm">{ node.label }</span>
            </span>
        </SortableTreeItem>
    ) ;

    // --------- Expand all / collapse all (controlled collapse)

    const [ foldTree ] = useState( () => makeTree( 'fold' ) ) ;
    const foldFolderIds = folderIdsOf( foldTree ) ;
    const [ foldCollapsed , setFoldCollapsed ] = useState( [] ) ;

    // --------- Frozen tree (no drag, no collapse)

    const [ frozenTree ] = useState( () => makeTree( 'frozen' ) ) ;

    // --------- Controlled tree with live JSON preview

    const [ tree , setTree ] = useState( () => makeTree( 'ctrl' ) ) ;

    const summarize = ( nodes ) => nodes.map( node =>
        node.children?.length ? { [ node.label ] : summarize( node.children ) } : node.label
    ) ;

    // --------- Async change with optimistic revert

    const [ shouldFail , setShouldFail ] = useState( false ) ;
    const [ saveStatus , setSaveStatus ] = useState( null ) ;

    const saveMove = ( _tree , { item , toParent } ) =>
    {
        setSaveStatus( 'saving' ) ;

        return new Promise( ( resolve , reject ) =>
        {
            setTimeout( () =>
            {
                if ( shouldFail )
                {
                    setSaveStatus( 'reverted' ) ;
                    reject( new Error( 'API error' ) ) ;
                }
                else
                {
                    setSaveStatus( `saved (« ${ item.label } » → parent ${ toParent ?? 'root' })` ) ;
                    resolve() ;
                }
            } , 800 ) ;
        }) ;
    } ;

    // --------- Node renderer shared by the examples

    const renderNode = ( node , { childCount } ) => (
        <SortableTreeItem>
            <span className="flex items-center gap-2">
                { childCount > 0
                    ? <MdFolder className="text-warning" size={ 18 } />
                    : <MdInsertDriveFile className="opacity-50" size={ 16 } /> }
                <span className="text-sm">{ node.label }</span>
            </span>
        </SortableTreeItem>
    ) ;

    // --------- Render

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Basic tree */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Sortable Tree (drag vertically to reorder, horizontally to indent / outdent)
                </h3>

                <p className="text-sm opacity-70">
                    Drag a row up or down to reorder among siblings, and left or right to change its depth :
                    the pointer's horizontal position projects the target parent. Dragging a folder moves its
                    whole subtree (collapsed during the drag), so a node can never be dropped into its own children.
                </p>

                <div className="w-full max-w-lg">
                    <SortableTree
                        defaultItems={ makeTree( 'basic' ) }
                        renderNode={ renderNode }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTree</code></pre>
                    <pre data-prefix="2"><code>    defaultItems={'{ [ { id , label , children : [...] } ] }'}</code></pre>
                    <pre data-prefix="3"><code>    renderNode={'{ node => <SortableTreeItem>{ node.label }</SortableTreeItem> }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Controlled tree */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Controlled Tree (live structure)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    <SortableTree
                        items={ tree }
                        onChange={ next => setTree( next ) }
                        renderNode={ renderNode }
                    />

                    <pre className="text-xs bg-base-300/50 rounded-box p-3 overflow-x-auto">
                        { JSON.stringify( summarize( tree ) , null , 2 ) }
                    </pre>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTree</code></pre>
                    <pre data-prefix="2"><code>    items={'{ tree }'}</code></pre>
                    <pre data-prefix="3"><code>    onChange={'{ ( next , change ) => setTree( next ) }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                    <pre data-prefix="5"><code>{'// change = { item , fromParent , toParent , fromIndex , toIndex }'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Async change */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Async Change with API Call (optimistic revert on failure)
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="sortable-tree-fail">
                        <Checkbox
                            checked  = { shouldFail }
                            color    = "error"
                            id       = "sortable-tree-fail"
                            onChange = { e => setShouldFail( e.target.checked ) }
                        />
                        <span className="text-sm">Simulate API failure</span>
                    </label>

                    { saveStatus && (
                        <Badge color={ saveStatus === 'saving' ? 'warning' : saveStatus === 'reverted' ? 'error' : 'success' }>
                            { saveStatus }
                        </Badge>
                    )}
                </div>

                <div className="w-full max-w-lg">
                    <SortableTree
                        defaultItems={ makeTree( 'async' ) }
                        onChange={ saveMove }
                        renderNode={ renderNode }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTree</code></pre>
                    <pre data-prefix="2"><code>    defaultItems={'{ tree }'}</code></pre>
                    <pre data-prefix="3"><code>    onChange={'{ ( next , change ) => api.save( next ) }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                    <pre data-prefix="5"><code>{'// onChange may return a promise : a rejection restores the previous tree'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Max depth */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Max Depth (maxDepth = 2) + drop indicator
                </h3>

                <p className="text-sm opacity-70">
                    Nesting is capped at 2 levels : dragging a row deeper snaps back to the limit.
                    The blue line is the drop indicator — it shows the exact insertion point and, by its
                    indentation, the depth the node will land at. A folder counts its own subtree against the limit.
                </p>

                <div className="w-full max-w-lg">
                    <SortableTree
                        maxDepth={ 2 }
                        defaultItems={ makeTree( 'depth' ) }
                        renderNode={ renderNode }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTree maxDepth={'{ 2 }'} defaultItems={'{ tree }'} renderNode={'{ ... }'} /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* canNest : folders only */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Nesting Rule (canNest — only folders accept children)
                </h3>

                <p className="text-sm opacity-70">
                    Files can be reordered but never receive children : dragging a node under a file walks the
                    drop up to the file's own level (its parent folder). The drop indicator turns red when no valid
                    parent exists at a position.
                </p>

                <div className="w-full max-w-lg">
                    <SortableTree
                        canNest={ canNestInFolders }
                        defaultItems={ typedTree }
                        renderNode={ renderTypedNode }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTree</code></pre>
                    <pre data-prefix="2"><code>    canNest={'{ ( item , parent ) => !parent || parent.type === \'folder\' }'}</code></pre>
                    <pre data-prefix="3"><code>    defaultItems={'{ tree }'}</code></pre>
                    <pre data-prefix="4"><code>    renderNode={'{ ... }'}</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Expand all / collapse all */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    Expand All / Collapse All (controlled collapse)
                </h3>

                <p className="text-sm opacity-70">
                    The collapsed state is controlled via <code className="text-xs">collapsed</code> +{' '}
                    <code className="text-xs">onCollapsedChange</code>, so the parent can drive it — here two buttons
                    set it to every folder id (collapse all) or to an empty list (expand all).
                </p>

                <div className="flex gap-2">
                    <Button size="sm" color="ghost" icon={ MdUnfoldMore } onClick={ () => setFoldCollapsed( [] ) }>
                        Expand all
                    </Button>
                    <Button size="sm" color="ghost" icon={ MdUnfoldLess } onClick={ () => setFoldCollapsed( foldFolderIds ) }>
                        Collapse all
                    </Button>
                </div>

                <div className="w-full max-w-lg">
                    <SortableTree
                        collapsed={ foldCollapsed }
                        onCollapsedChange={ setFoldCollapsed }
                        defaultItems={ foldTree }
                        renderNode={ renderNode }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTree</code></pre>
                    <pre data-prefix="2"><code>    collapsed={'{ collapsedIds }'}</code></pre>
                    <pre data-prefix="3"><code>    onCollapsedChange={'{ setCollapsedIds }'}</code></pre>
                    <pre data-prefix="4"><code>    defaultItems={'{ tree }'} renderNode={'{ ... }'}</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Frozen tree */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    Frozen Tree (disabled + collapsible = false)
                </h3>

                <p className="text-sm opacity-70">
                    <code className="text-xs">disabled</code> stops all dragging and{' '}
                    <code className="text-xs">collapsible={'{ false }'}</code> removes the chevrons and keeps every
                    node expanded — a read-only, fully static tree.
                </p>

                <div className="w-full max-w-lg">
                    <SortableTree
                        disabled
                        collapsible={ false }
                        defaultItems={ frozenTree }
                        renderNode={ renderNode }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTree disabled collapsible={'{ false }'} defaultItems={'{ tree }'} renderNode={'{ ... }'} /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Props Reference */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Props Reference
                </h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Prop</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code className="text-xs">canNest</code></td>
                                <td>function</td>
                                <td>(draggedItem, parentItem | null) =&gt; boolean — <code className="text-xs">null</code> = top level ; a rejected parent makes the drop walk up to the nearest valid ancestor (red indicator if none)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">collapsed</code></td>
                                <td>Array</td>
                                <td>Controlled list of collapsed node ids ; pair with <code className="text-xs">onCollapsedChange</code></td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">collapsible</code></td>
                                <td>boolean</td>
                                <td>Allow expanding/collapsing (default <code className="text-xs">true</code>) ; <code className="text-xs">false</code> hides the chevrons and keeps every node expanded</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">defaultCollapsed</code></td>
                                <td>Array</td>
                                <td>Ids of nodes collapsed initially (uncontrolled collapse)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">defaultItems</code></td>
                                <td>Array</td>
                                <td>Uncontrolled initial tree (the component owns and updates it)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">disabled</code></td>
                                <td>boolean</td>
                                <td>Disable dragging for every node (default <code className="text-xs">false</code>) ; the tree can still be expanded/collapsed</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">getItemId</code></td>
                                <td>function</td>
                                <td>(item) =&gt; string | number — unique id accessor (defaults to <code className="text-xs">item.id</code>)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">handle</code></td>
                                <td>boolean</td>
                                <td>Show a drag handle on each row (default <code className="text-xs">true</code>) ; <code className="text-xs">false</code> makes the whole row draggable</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">indent</code></td>
                                <td>number</td>
                                <td>Indentation width per depth level, in pixels (default 24)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">items</code></td>
                                <td>Array</td>
                                <td>Controlled nested tree {'[ { id , children : [...] } ]'} ; pair with <code className="text-xs">onChange</code></td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">maxDepth</code></td>
                                <td>number</td>
                                <td>Maximum nesting depth ; a dragged folder counts its own subtree height against it</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onChange</code></td>
                                <td>function</td>
                                <td>(tree, {'{ item, fromParent, toParent, fromIndex, toIndex }'}) =&gt; void | Promise — a rejected promise reverts the tree (uncontrolled)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onCollapsedChange</code></td>
                                <td>function</td>
                                <td>(collapsedIds) =&gt; void — called with the new collapsed ids on each toggle</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">renderNode</code></td>
                                <td>function</td>
                                <td>(item, {'{ depth, collapsed, childCount }'}) =&gt; a SortableTreeItem element (required)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SortableTreeDemo ;
