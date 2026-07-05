'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import SortableTree     from '@/components/trees/SortableTree' ;
import SortableTreeItem from '@/components/trees/SortableTreeItem' ;

import Container from '@/display/Container' ;

import { MdFolder , MdInsertDriveFile } from 'react-icons/md' ;

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
                                <td><code className="text-xs">items / defaultItems</code></td>
                                <td>Array</td>
                                <td>Controlled / uncontrolled nested tree : {'[ { id , children : [...] } ]'} (stable ids)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onChange</code></td>
                                <td>function</td>
                                <td>(tree, {'{ item, fromParent, toParent, fromIndex, toIndex }'}) =&gt; void | Promise — a rejected promise reverts the tree (uncontrolled)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">renderNode</code></td>
                                <td>function</td>
                                <td>(item, {'{ depth, collapsed, childCount }'}) =&gt; SortableTreeItem element</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">indent</code></td>
                                <td>number</td>
                                <td>Indentation width per depth level, in pixels (default 24)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">defaultCollapsed</code></td>
                                <td>Array</td>
                                <td>Ids of nodes collapsed initially</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">handle / disabled / getItemId</code></td>
                                <td>—</td>
                                <td>Same contract as the other sortable components</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SortableTreeDemo ;
