'use client' ;

import { useState } from 'react' ;

import Avatar   from '@/components/avatars/Avatar' ;
import Badge    from '@/components/Badge' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import SortableTable    from '@/components/layouts/SortableTable' ;
import SortableTableRow from '@/components/layouts/SortableTableRow' ;

import Container from '@/display/Container' ;

const makePeople = ( prefix , count = 5 ) =>
    Array.from( { length : count } , ( _ , i ) => (
    {
        id    : `${ prefix }-${ i + 1 }` ,
        name  : [ 'Cy Ganderton' , 'Hart Hagerty' , 'Brice Swyre' , 'Marjy Ferencz' , 'Yancy Tear' , 'Irma Vasilik' , 'Icarus Gnosis' , 'Sylvia Plummer' ][ i % 8 ] ,
        job   : [ 'Quality Control' , 'Desktop Support' , 'Tax Accountant' , 'Insurance Broker' , 'Sales Manager' , 'Designer' , 'Developer' , 'Writer' ][ i % 8 ] ,
        color : [ 'Blue' , 'Purple' , 'Red' , 'Green' , 'Yellow' , 'Teal' , 'Orange' , 'Pink' ][ i % 8 ] ,
        image : `https://i.pravatar.cc/150?u=table-${ prefix }-${ i }` ,
    })) ;

const SortableTableDemo = () =>
{
    // --------- Controlled table

    const [ rows , setRows ] = useState( () => makePeople( 'ctrl' ) ) ;

    // --------- Async reorder with optimistic revert

    const [ shouldFail , setShouldFail ] = useState( false ) ;
    const [ saveStatus , setSaveStatus ] = useState( null ) ;

    const saveOrder = ( _items , { from , to } ) =>
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
                    setSaveStatus( `saved (moved from ${ from + 1 } to ${ to + 1 })` ) ;
                    resolve() ;
                }
            } , 800 ) ;
        }) ;
    } ;

    // --------- Render

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Basic sortable table */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Sortable Table with Drag Handles (uncontrolled)
                </h3>

                <SortableTable
                    className="bg-base-100"
                    head={ [ 'Name' , 'Job' , 'Favorite Color' ] }
                    defaultItems={ makePeople( 'basic' ) }
                    renderRow={ person => (
                        <SortableTableRow>
                            <td>
                                <div className="flex items-center gap-3">
                                    <Avatar innerClassName="w-8 h-8 rounded-full">
                                        <img src={ person.image } alt={ person.name } draggable={ false } />
                                    </Avatar>
                                    <span className="font-semibold">{ person.name }</span>
                                </div>
                            </td>
                            <td>{ person.job }</td>
                            <td>{ person.color }</td>
                        </SortableTableRow>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTable</code></pre>
                    <pre data-prefix="2"><code>    head={'{ [ \'Name\' , \'Job\' , \'Favorite Color\' ] }'}</code></pre>
                    <pre data-prefix="3"><code>    defaultItems={'{ people }'}</code></pre>
                    <pre data-prefix="4"><code>    renderRow={'{ person => ('}</code></pre>
                    <pre data-prefix="5"><code>        &lt;SortableTableRow&gt;&lt;td&gt;...&lt;/td&gt;&lt;/SortableTableRow&gt;</code></pre>
                    <pre data-prefix="6"><code>    {')}'}</code></pre>
                    <pre data-prefix="7"><code>/&gt;</code></pre>
                    <pre data-prefix="8"><code>{'// the empty handle-column <th> is prepended automatically'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Whole-row dragging, controlled */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Whole-Row Dragging (controlled, zebra)
                </h3>

                <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-sm opacity-60">Current order :</span>
                    <span className="text-sm font-mono">
                        { rows.map( row => row.id.replace( 'ctrl-' , '' ) ).join( ' , ' ) }
                    </span>
                </div>

                <SortableTable
                    className="bg-base-100"
                    zebra
                    handle={ false }
                    head={ [ '#' , 'Name' , 'Job' ] }
                    items={ rows }
                    onReorder={ next => setRows( next ) }
                    renderRow={ ( person , index ) => (
                        <SortableTableRow className="cursor-grab active:cursor-grabbing select-none">
                            <td className="font-bold opacity-40">{ index + 1 }</td>
                            <td>{ person.name }</td>
                            <td>{ person.job }</td>
                        </SortableTableRow>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTable</code></pre>
                    <pre data-prefix="2"><code>    zebra handle={'{ false }'}</code></pre>
                    <pre data-prefix="3"><code>    items={'{ rows }'} onReorder={'{ next => setRows( next ) }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                    <pre data-prefix="5"><code>{'// zebra stripes follow DOM positions : they reassign after a drop'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Pinned rows */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Sticky Header (pinRows + vertical scroll)
                </h3>

                <SortableTable
                    className="bg-base-100"
                    pinRows
                    containerClassName="max-h-72 overflow-y-auto rounded-box"
                    head={ [ 'Name' , 'Job' , 'Favorite Color' ] }
                    defaultItems={ makePeople( 'pin' , 12 ) }
                    getItemId={ person => person.id }
                    renderRow={ person => (
                        <SortableTableRow>
                            <td>{ person.name }</td>
                            <td>{ person.job }</td>
                            <td>{ person.color }</td>
                        </SortableTableRow>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTable</code></pre>
                    <pre data-prefix="2"><code>    pinRows</code></pre>
                    <pre data-prefix="3"><code>    containerClassName="max-h-72 overflow-y-auto"</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                    <pre data-prefix="5"><code>{'// the header stays sticky while rows scroll and reorder underneath'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Async reorder with optimistic revert */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Async Reorder with API Call (optimistic revert on failure)
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="sortable-table-fail">
                        <Checkbox
                            checked  = { shouldFail }
                            color    = "error"
                            id       = "sortable-table-fail"
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

                <SortableTable
                    className="bg-base-100"
                    head={ [ 'Name' , 'Job' ] }
                    defaultItems={ makePeople( 'async' , 4 ) }
                    onReorder={ saveOrder }
                    renderRow={ person => (
                        <SortableTableRow>
                            <td>{ person.name }</td>
                            <td>{ person.job }</td>
                        </SortableTableRow>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableTable</code></pre>
                    <pre data-prefix="2"><code>    defaultItems={'{ people }'}</code></pre>
                    <pre data-prefix="3"><code>    onReorder={'{ ( items ) => api.saveOrder( items ) }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                    <pre data-prefix="5"><code>{'// onReorder may return a promise : a rejection restores the previous order'}</code></pre>
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
                                <td>Controlled / uncontrolled rows (each needs a stable id)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onReorder</code></td>
                                <td>function</td>
                                <td>(items, {'{ from, to, item }'}) =&gt; void | Promise — a rejected promise reverts the order (uncontrolled)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">renderRow</code></td>
                                <td>function</td>
                                <td>(item, index) =&gt; SortableTableRow element (children = the td cells)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">head / foot</code></td>
                                <td>Array</td>
                                <td>Header / footer cells, one entry per column (the handle column th is added automatically)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">handle</code></td>
                                <td>boolean</td>
                                <td>Show a drag-handle cell (default true) ; false = whole rows draggable</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">getItemId / disabled</code></td>
                                <td>—</td>
                                <td>Same contract as the other sortable components</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">zebra / pinRows / size / ...</code></td>
                                <td>Table props</td>
                                <td>Every other prop is forwarded to Table</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SortableTableDemo ;
