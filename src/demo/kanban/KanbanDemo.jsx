'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import Kanban     from '@/components/kanban/Kanban' ;
import KanbanCard from '@/components/kanban/KanbanCard' ;

import Container from '@/display/Container' ;

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
