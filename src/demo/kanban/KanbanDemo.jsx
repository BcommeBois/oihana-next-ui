'use client' ;

import { useState } from 'react' ;

import Avatar   from '@/components/avatars/Avatar' ;
import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import Kanban     from '@/components/kanban/Kanban' ;
import KanbanCard from '@/components/kanban/KanbanCard' ;

import Container from '@/display/Container' ;

import { MdAdd , MdClose } from 'react-icons/md' ;

const PRIORITY_COLORS =
{
    high   : 'badge-error' ,
    medium : 'badge-warning' ,
    low    : 'badge-neutral' ,
} ;

const makeBoard = ( prefix ) =>
[
    {
        id    : `${ prefix }-backlog` ,
        title : 'Backlog' ,
        items :
        [
            { id : `${ prefix }-c1` , title : 'Design the landing page' , priority : 'medium' } ,
            { id : `${ prefix }-c2` , title : 'Write the documentation' , priority : 'low'    } ,
            { id : `${ prefix }-c3` , title : 'Fix the login bug'       , priority : 'high'   } ,
            { id : `${ prefix }-c4` , title : 'Update dependencies'     , priority : 'low'    } ,
        ] ,
    } ,
    {
        id    : `${ prefix }-todo` ,
        title : 'To do' ,
        items :
        [
            { id : `${ prefix }-c5` , title : 'Refactor the theme layer' , priority : 'medium' } ,
            { id : `${ prefix }-c6` , title : 'Add keyboard shortcuts'   , priority : 'low'    } ,
        ] ,
    } ,
    {
        id    : `${ prefix }-doing` ,
        title : 'Doing' ,
        items :
        [
            { id : `${ prefix }-c7` , title : 'Kanban component' , priority : 'high' } ,
        ] ,
    } ,
    {
        id    : `${ prefix }-done` ,
        title : 'Done' ,
        items : [] ,
    } ,
] ;

const KanbanDemo = () =>
{
    // --------- Controlled board with live readout

    const [ board , setBoard ] = useState( () => makeBoard( 'ctrl' ) ) ;

    // --------- Reorderable columns

    const [ lastChange , setLastChange ] = useState( null ) ;

    // --------- Project board (rich cards)

    const projectColumns =
    [
        {
            id    : 'proj-todo' ,
            title : 'To do' ,
            items :
            [
                { id : 'p1' , title : 'Refonte de la page d\'accueil' , due : '12 Jul' , tags : [ 'ui' , 'urgent' ] , avatar : 'https://i.pravatar.cc/150?u=p1' } ,
                { id : 'p2' , title : 'Migration de la base'          , due : '18 Jul' , tags : [ 'infra' ]         , avatar : 'https://i.pravatar.cc/150?u=p2' } ,
            ] ,
        } ,
        {
            id    : 'proj-doing' ,
            title : 'Doing' ,
            items :
            [
                { id : 'p3' , title : 'Composant Kanban' , due : '5 Jul' , tags : [ 'dnd' , 'ui' ] , avatar : 'https://i.pravatar.cc/150?u=p3' } ,
            ] ,
        } ,
        {
            id    : 'proj-review' ,
            title : 'Review' ,
            items :
            [
                { id : 'p4' , title : 'Pickers dans les modales' , due : '4 Jul' , tags : [ 'fix' ] , avatar : 'https://i.pravatar.cc/150?u=p4' } ,
            ] ,
        } ,
    ] ;

    // --------- Editable board (CRUD)

    const [ crudBoard , setCrudBoard ] = useState( () => makeBoard( 'crud' ) ) ;
    const [ crudCounter , setCrudCounter ] = useState( 1 ) ;

    const addCard = ( columnId ) =>
    {
        setCrudBoard( prev => prev.map( column =>
            column.id === columnId
                ? { ...column , items : [ ...column.items , { id : `crud-new-${ crudCounter }` , title : `New task ${ crudCounter }` , priority : 'low' } ] }
                : column
        )) ;
        setCrudCounter( n => n + 1 ) ;
    } ;

    const removeCard = ( cardId ) =>
    {
        setCrudBoard( prev => prev.map( column => (
            { ...column , items : column.items.filter( card => card.id !== cardId ) }
        ))) ;
    } ;

    // --------- Async change with optimistic revert

    const [ shouldFail , setShouldFail ] = useState( false ) ;
    const [ saveStatus , setSaveStatus ] = useState( null ) ;

    const saveMove = ( _columns , { item , fromColumn , toColumn } ) =>
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
                    setSaveStatus( `saved (« ${ item.title } » : ${ fromColumn } → ${ toColumn })` ) ;
                    resolve() ;
                }
            } , 800 ) ;
        }) ;
    } ;

    // --------- Card renderer shared by the examples

    const renderCard = ( card ) => (
        <KanbanCard>
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold">{ card.title }</span>
                <span className={ `badge badge-xs ${ PRIORITY_COLORS[ card.priority ] ?? 'badge-neutral' }` }>
                    { card.priority }
                </span>
            </div>
        </KanbanCard>
    ) ;

    // --------- Render

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Basic board */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Basic Board (uncontrolled — the « Done » column starts empty)
                </h3>

                <Kanban
                    defaultColumns={ makeBoard( 'basic' ) }
                    renderCard={ renderCard }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Kanban</code></pre>
                    <pre data-prefix="2"><code>    defaultColumns={'{ [ { id , title , items : [...] } , ... ] }'}</code></pre>
                    <pre data-prefix="3"><code>    renderCard={'{ card => <KanbanCard title={ card.title } /> }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                    <pre data-prefix="5"><code>{'// cards reorder within a column and move across columns, even empty ones'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Reorderable columns */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Reorderable Columns (drag a column by its header)
                </h3>

                { lastChange && (
                    <div className="flex gap-2 items-center flex-wrap">
                        <span className="text-sm opacity-60">Last change :</span>
                        <Badge color={ lastChange.type === 'column' ? 'warning' : 'info' } size="sm">
                            { lastChange.type === 'column'
                                ? `column « ${ lastChange.column.title } » : ${ lastChange.fromIndex } → ${ lastChange.toIndex }`
                                : `card « ${ lastChange.item.title } » : ${ lastChange.fromColumn } → ${ lastChange.toColumn }`
                            }
                        </Badge>
                    </div>
                )}

                <Kanban
                    reorderableColumns
                    defaultColumns={ makeBoard( 'cols' ) }
                    onChange={ ( _next , change ) => setLastChange( change ) }
                    renderCard={ renderCard }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Kanban</code></pre>
                    <pre data-prefix="2"><code>    reorderableColumns</code></pre>
                    <pre data-prefix="3"><code>    defaultColumns={'{ columns }'}</code></pre>
                    <pre data-prefix="4"><code>    onChange={'{ ( next , change ) => ... }'}</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                    <pre data-prefix="6"><code>{'// change.type : \'card\' | \'column\' — column moves carry { column , fromIndex , toIndex }'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Project board (rich cards) */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Project Board (rich cards : assignee, due date, tags)
                </h3>

                <Kanban
                    defaultColumns={ projectColumns }
                    renderCard={ card => (
                        <KanbanCard>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold">{ card.title }</span>
                                <div className="flex gap-1 flex-wrap">
                                    { card.tags.map( tag => (
                                        <Badge key={ tag } size="xs" color="ghost">{ tag }</Badge>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <Avatar innerClassName="w-6 h-6 rounded-full">
                                        <img src={ card.avatar } alt="Assignee" draggable={ false } />
                                    </Avatar>
                                    <Badge size="xs" color="neutral">{ card.due }</Badge>
                                </div>
                            </div>
                        </KanbanCard>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>{'// renderCard composes freely with the library components'}</code></pre>
                    <pre data-prefix="2"><code>renderCard={'{ card => ('}</code></pre>
                    <pre data-prefix="3"><code>    &lt;KanbanCard&gt;&lt;Avatar ... /&gt;&lt;Badge ... /&gt;&lt;/KanbanCard&gt;</code></pre>
                    <pre data-prefix="4"><code>{')}'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Editable board (CRUD) */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    Editable Board (add / remove cards — the board lives in your state)
                </h3>

                <Kanban
                    columns={ crudBoard }
                    onChange={ next => setCrudBoard( next ) }
                    renderFooter={ column => (
                        <Button size="sm" color="ghost" icon={ MdAdd } onClick={ () => addCard( column.id ) }>
                            Add a card
                        </Button>
                    )}
                    renderCard={ card => (
                        <KanbanCard>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-semibold">{ card.title }</span>
                                <button
                                    type="button"
                                    aria-label={ `Remove ${ card.title }` }
                                    className="btn btn-ghost btn-circle btn-xs"
                                    onClick={ () => removeCard( card.id ) }
                                >
                                    <MdClose size={ 12 } />
                                </button>
                            </div>
                        </KanbanCard>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Kanban</code></pre>
                    <pre data-prefix="2"><code>    columns={'{ board }'} onChange={'{ next => setBoard( next ) }'}</code></pre>
                    <pre data-prefix="3"><code>    renderFooter={'{ column => <Button onClick={ () => addCard( column.id ) }>Add</Button> }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                    <pre data-prefix="5"><code>{'// adding / removing cards is plain setState — the board is your data'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Controlled board */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Controlled Board (live column counts)
                </h3>

                <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-sm opacity-60">Board :</span>
                    { board.map( column => (
                        <Badge key={ column.id } color="neutral" size="sm">
                            { column.title } : { column.items.length }
                        </Badge>
                    ))}
                </div>

                <Kanban
                    columns={ board }
                    onChange={ next => setBoard( next ) }
                    renderCard={ renderCard }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Kanban</code></pre>
                    <pre data-prefix="2"><code>    columns={'{ board }'}</code></pre>
                    <pre data-prefix="3"><code>    onChange={'{ ( next , change ) => setBoard( next ) }'}</code></pre>
                    <pre data-prefix="4"><code>    renderCard={'{ card => <KanbanCard ... /> }'}</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                    <pre data-prefix="6"><code>{'// change = { item , fromColumn , toColumn , fromIndex , toIndex }'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Async board */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Async Change with API Call (optimistic revert on failure)
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="kanban-fail">
                        <Checkbox
                            checked  = { shouldFail }
                            color    = "error"
                            id       = "kanban-fail"
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

                <Kanban
                    defaultColumns={ makeBoard( 'async' ) }
                    onChange={ saveMove }
                    renderCard={ renderCard }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Kanban</code></pre>
                    <pre data-prefix="2"><code>    defaultColumns={'{ columns }'}</code></pre>
                    <pre data-prefix="3"><code>    onChange={'{ ( next , change ) => api.moveCard( change ) }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                    <pre data-prefix="5"><code>{'// onChange may return a promise : a rejection restores the previous board'}</code></pre>
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
                                <td><code className="text-xs">columns / defaultColumns</code></td>
                                <td>Array</td>
                                <td>Controlled / uncontrolled columns : {'[ { id , title , items : [...] } ]'} (stable ids)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onChange</code></td>
                                <td>function</td>
                                <td>(columns, {'{ item, fromColumn, toColumn, fromIndex, toIndex }'}) =&gt; void | Promise — a rejected promise reverts the board (uncontrolled)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">renderCard</code></td>
                                <td>function</td>
                                <td>(item, column, index) =&gt; KanbanCard element</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">renderHeader / renderFooter</code></td>
                                <td>function</td>
                                <td>(column) =&gt; custom column header / footer</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">getColumnId / getItemId</code></td>
                                <td>function</td>
                                <td>Custom accessors for identity (default to column.id / item.id)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">reorderableColumns</code></td>
                                <td>boolean</td>
                                <td>Allow reordering the columns themselves by dragging their headers (change.type = 'column')</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">disabled</code></td>
                                <td>boolean</td>
                                <td>Disable dragging for all cards</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default KanbanDemo ;
