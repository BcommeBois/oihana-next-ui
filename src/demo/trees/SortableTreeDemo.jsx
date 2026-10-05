'use client' ;

import { useRef , useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import SortableTree     from '@/components/trees/SortableTree' ;
import SortableTreeItem from '@/components/trees/SortableTreeItem' ;

import insertNode from '@/helpers/trees/insertNode' ;
import removeNode from '@/helpers/trees/removeNode' ;

import Container from '@/display/Container' ;

import { MdAdd , MdClose , MdFolder , MdInsertDriveFile , MdUnfoldLess , MdUnfoldMore } from 'react-icons/md' ;

// Ids of every node that has children (for expand-all / collapse-all).
const folderIdsOf = ( nodes ) => nodes.flatMap( n => ( n.children?.length ? [ n.id , ...folderIdsOf( n.children ) ] : [] ) ) ;

const makeCrudTree = () =>
[
    {
        id : 'crud-src' , label : 'src' , type : 'folder' , children :
        [
            { id : 'crud-comp' , label : 'components' , type : 'folder' , children : [ { id : 'crud-btn' , label : 'Button.jsx' , type : 'file' } ] } ,
            { id : 'crud-index' , label : 'index.js' , type : 'file' } ,
        ] ,
    } ,
    { id : 'crud-readme' , label : 'README.md' , type : 'file' } ,
] ;

const makeFlatTree = () =>
[
    { id : 'flat-intro'    , label : 'Introduction' } ,
    { id : 'flat-install'  , label : 'Installation' } ,
    { id : 'flat-usage'    , label : 'Usage' } ,
    { id : 'flat-api'      , label : 'API Reference' } ,
    { id : 'flat-faq'      , label : 'FAQ' } ,
] ;

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

/**
 * The props of `SortableTree`, with their type. The description of each one
 * lives in the bundle, under its own name — so a row and its sentence cannot
 * drift apart, and a missing translation is a missing key rather than a
 * silently English cell.
 *
 * @type {[ string , string ][]}
 */
const PROPS =
[
    [ 'canNest' , 'function' ] ,
    [ 'collapsed' , 'Array' ] ,
    [ 'collapsible' , 'boolean' ] ,
    [ 'defaultCollapsed' , 'Array' ] ,
    [ 'defaultItems' , 'Array' ] ,
    [ 'disabled' , 'boolean' ] ,
    [ 'getItemId' , 'function' ] ,
    [ 'handle' , 'boolean' ] ,
    [ 'indent' , 'number' ] ,
    [ 'items' , 'Array' ] ,
    [ 'maxDepth' , 'number' ] ,
    [ 'onChange' , 'function' ] ,
    [ 'onCollapsedChange' , 'function' ] ,
    [ 'renderNode' , 'function' ] ,
] ;

/**
 * @param {Object} props
 * @param {string} [props.path='demo.trees.sortableTree'] - Dot notation path to the demo locale.
 */
const SortableTreeDemo = ( { path = 'demo.trees.sortableTree' } = {} ) =>
{
    const t = useI18n( path ) ;

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

    // --------- Add / remove nodes dynamically

    const [ crudTree , setCrudTree ]           = useState( makeCrudTree ) ;
    const [ crudCollapsed , setCrudCollapsed ] = useState( [] ) ;
    const crudCounter = useRef( 1 ) ;

    const addChild = ( parentId ) =>
    {
        const n    = crudCounter.current++ ;
        const node = { id : `crud-new-${ n }` , label : `New file ${ n }` , type : 'file' } ;
        setCrudTree( current => insertNode( current , parentId , node ) ) ;
        // Reveal the insertion by expanding the target folder.
        if ( parentId != null )
        {
            setCrudCollapsed( ids => ids.filter( id => id !== parentId ) ) ;
        }
    } ;

    const addFolder = ( parentId ) =>
    {
        const n    = crudCounter.current++ ;
        const node = { id : `crud-new-${ n }` , label : `New folder ${ n }` , type : 'folder' , children : [] } ;
        setCrudTree( current => insertNode( current , parentId , node ) ) ;
        if ( parentId != null )
        {
            setCrudCollapsed( ids => ids.filter( id => id !== parentId ) ) ;
        }
    } ;

    const removeItem = ( id ) => setCrudTree( current => removeNode( current , id ) ) ;

    const renderCrudNode = ( node ) => (
        <SortableTreeItem>
            <span className="flex items-center gap-2 grow">
                { node.type === 'folder'
                    ? <MdFolder className="text-warning" size={ 18 } />
                    : <MdInsertDriveFile className="opacity-50" size={ 16 } /> }
                <span className="text-sm grow">{ node.label }</span>
                { node.type === 'folder' && (
                    <button
                        type="button"
                        aria-label={ `Add a file to ${ node.label }` }
                        className="btn btn-ghost btn-xs btn-square"
                        onClick={ () => addChild( node.id ) }
                    >
                        <MdAdd size={ 14 } />
                    </button>
                )}
                <button
                    type="button"
                    aria-label={ `Remove ${ node.label }` }
                    className="btn btn-ghost btn-xs btn-square text-error"
                    onClick={ () => removeItem( node.id ) }
                >
                    <MdClose size={ 14 } />
                </button>
            </span>
        </SortableTreeItem>
    ) ;

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

    // --------- Flat list (root level only)

    const renderFlatNode = ( node ) => (
        <SortableTreeItem>
            <span className="text-sm">{ node.label }</span>
        </SortableTreeItem>
    ) ;

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
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.basic.title }
                </h3>

                <p className="text-sm opacity-70">{ t.basic.note }</p>

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
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    { t.controlled.title }
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
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    { t.async.title }
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="sortable-tree-fail">
                        <Checkbox
                            checked  = { shouldFail }
                            color    = "error"
                            id       = "sortable-tree-fail"
                            onChange = { e => setShouldFail( e.target.checked ) }
                        />
                        <span className="text-sm">{ t.async.simulate }</span>
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
                    <pre data-prefix="5"><code>{ t.async.comment }</code></pre>
                </div>
            </div>

            <Divider />
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    { t.maxDepth.title }
                </h3>

                <p className="text-sm opacity-70">{ t.maxDepth.note }</p>

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
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.flat.title }
                </h3>

                <p className="text-sm opacity-70">{ t.flat.note }</p>

                <div className="w-full max-w-lg">
                    <SortableTree
                        maxDepth={ 0 }
                        collapsible={ false }
                        defaultItems={ makeFlatTree() }
                        renderNode={ renderFlatNode }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTree</code></pre>
                    <pre data-prefix="2"><code>    maxDepth={'{ 0 }'}</code></pre>
                    <pre data-prefix="3"><code>    collapsible={'{ false }'}</code></pre>
                    <pre data-prefix="4"><code>    defaultItems={'{ [ { id , label } , ... ] }'}</code></pre>
                    <pre data-prefix="5"><code>    renderNode={'{ node => <SortableTreeItem>{ node.label }</SortableTreeItem> }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    { t.canNest.title }
                </h3>

                <p className="text-sm opacity-70">{ t.canNest.note }</p>

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
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    { t.fold.title }
                </h3>

                <p className="text-sm opacity-70">{ t.fold.note }</p>

                <div className="flex gap-2">
                    <Button size="sm" color="ghost" icon={ MdUnfoldMore } onClick={ () => setFoldCollapsed( [] ) }>
                        { t.fold.expandAll }
                    </Button>
                    <Button size="sm" color="ghost" icon={ MdUnfoldLess } onClick={ () => setFoldCollapsed( foldFolderIds ) }>
                        { t.fold.collapseAll }
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
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    { t.frozen.title }
                </h3>

                <p className="text-sm opacity-70">{ t.frozen.note }</p>

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
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    { t.dynamic.title }
                </h3>

                <p className="text-sm opacity-70">{ t.dynamic.note }</p>

                <div className="flex gap-2 flex-wrap">
                    <Button size="sm" color="ghost" icon={ MdInsertDriveFile } onClick={ () => addChild( null ) }>
                        { t.dynamic.addFile }
                    </Button>
                    <Button size="sm" color="ghost" icon={ MdFolder } onClick={ () => addFolder( null ) }>
                        { t.dynamic.addFolder }
                    </Button>
                </div>

                <div className="w-full max-w-lg">
                    <SortableTree
                        items={ crudTree }
                        onChange={ next => setCrudTree( next ) }
                        collapsed={ crudCollapsed }
                        onCollapsedChange={ setCrudCollapsed }
                        renderNode={ renderCrudNode }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>import insertNode from 'oihana-next-ui/helpers/trees/insertNode' ;</code></pre>
                    <pre data-prefix="2"><code>import removeNode from 'oihana-next-ui/helpers/trees/removeNode' ;</code></pre>
                    <pre data-prefix="3"><code></code></pre>
                    <pre data-prefix="4"><code>{ t.dynamic.insert }</code></pre>
                    <pre data-prefix="5"><code>setTree( t =&gt; insertNode( t , folderId , newNode ) ) ;</code></pre>
                    <pre data-prefix="6"><code>{ t.dynamic.remove }</code></pre>
                    <pre data-prefix="7"><code>setTree( t =&gt; removeNode( t , nodeId ) ) ;</code></pre>
                </div>
            </div>

            <Divider />
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.reference.title }
                </h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>{ t.reference.prop }</th>
                                <th>{ t.reference.type }</th>
                                <th>{ t.reference.description }</th>
                            </tr>
                        </thead>
                        <tbody>
                            { PROPS.map( ( [ name , kind ] ) => (
                                <tr key={ name }>
                                    <td><code className="text-xs">{ name }</code></td>
                                    <td>{ kind }</td>
                                    <td>{ t.props[ name ] }</td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SortableTreeDemo ;
