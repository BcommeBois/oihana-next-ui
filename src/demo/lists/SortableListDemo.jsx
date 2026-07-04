'use client' ;

import { useState } from 'react' ;

import Avatar   from '@/components/avatars/Avatar' ;
import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import SortableList    from '@/components/lists/SortableList' ;
import SortableListRow from '@/components/lists/SortableListRow' ;

import Container from '@/display/Container' ;

import { MdFavorite , MdPlayArrow } from 'react-icons/md' ;

const SortableListDemo = () =>
{
    // --------- Basic sortable list (uncontrolled)

    const songs =
    [
        { id : 1 , title : 'Dio Lupa'         , artist : 'Remaining Reason' , image : 'https://i.pravatar.cc/150?u=31' } ,
        { id : 2 , title : 'Ellie Beilish'    , artist : 'Bears of a fever' , image : 'https://i.pravatar.cc/150?u=32' } ,
        { id : 3 , title : 'Sabrino Gardener' , artist : 'Cappuccino'       , image : 'https://i.pravatar.cc/150?u=33' } ,
        { id : 4 , title : 'Aurora Belle'     , artist : 'Northern Lights'  , image : 'https://i.pravatar.cc/150?u=34' } ,
    ] ;

    // --------- Controlled sortable list

    const [ tasks , setTasks ] = useState(
    [
        { id : 'a' , title : 'Design the landing page' , priority : 'High'   } ,
        { id : 'b' , title : 'Write the documentation' , priority : 'Medium' } ,
        { id : 'c' , title : 'Fix the login bug'       , priority : 'High'   } ,
        { id : 'd' , title : 'Update dependencies'     , priority : 'Low'    } ,
    ]) ;

    // --------- Async reorder with optimistic revert

    const [ shouldFail , setShouldFail ] = useState( false ) ;
    const [ saveStatus , setSaveStatus ] = useState( null ) ;

    const saveOrder = ( items , { from , to } ) =>
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

            {/* Basic Sortable List */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Sortable List with Drag Handles (uncontrolled)
                </h3>

                <div className="w-full max-w-lg">
                    <SortableList
                        className="bg-base-100 rounded-box shadow-md"
                        defaultItems={ songs }
                        renderItem={ song => (
                            <SortableListRow
                                avatar={
                                    <Avatar innerClassName="w-10 h-10 rounded-box">
                                        <img src={ song.image } alt={ song.title } />
                                    </Avatar>
                                }
                                title={ song.title }
                                subtitle={ song.artist }
                                actions={[
                                    <Button key="play" size="sm" shape="square" color="ghost" icon={ MdPlayArrow } /> ,
                                    <Button key="like" size="sm" shape="square" color="ghost" icon={ MdFavorite } /> ,
                                ]}
                            />
                        )}
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableList</code></pre>
                    <pre data-prefix="2"><code>    defaultItems={'{ songs }'}</code></pre>
                    <pre data-prefix="3"><code>    renderItem={'{ song => ('}</code></pre>
                    <pre data-prefix="4"><code>        &lt;SortableListRow title={'{ song.title }'} subtitle={'{ song.artist }'} /&gt;</code></pre>
                    <pre data-prefix="5"><code>    {')}'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Controlled Sortable List */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Controlled Sortable List (whole row draggable)
                </h3>

                <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-sm opacity-60">Current order :</span>
                    { tasks.map( task => (
                        <Badge key={ task.id } color="neutral" size="sm">
                            { task.id }
                        </Badge>
                    ))}
                </div>

                <div className="w-full max-w-lg">
                    <SortableList
                        className="bg-base-100 rounded-box shadow-md"
                        handle={ false }
                        items={ tasks }
                        onReorder={ next => setTasks( next ) }
                        renderItem={ task => (
                            <SortableListRow
                                title={ task.title }
                                subtitle={ `Task ${ task.id }` }
                                actions={
                                    <Badge
                                        size="sm"
                                        color={
                                            task.priority === 'High'   ? 'error'   :
                                            task.priority === 'Medium' ? 'warning' :
                                            'neutral'
                                        }
                                    >
                                        { task.priority }
                                    </Badge>
                                }
                            />
                        )}
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableList</code></pre>
                    <pre data-prefix="2"><code>    handle={'{ false }'}</code></pre>
                    <pre data-prefix="3"><code>    items={'{ tasks }'}</code></pre>
                    <pre data-prefix="4"><code>    onReorder={'{ next => setTasks( next ) }'}</code></pre>
                    <pre data-prefix="5"><code>    renderItem={'{ task => <SortableListRow ... /> }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Async reorder with optimistic revert */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Async Reorder with API Call (optimistic revert on failure)
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="sortable-demo-fail">
                        <Checkbox
                            checked  = { shouldFail }
                            color    = "error"
                            id       = "sortable-demo-fail"
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
                    <SortableList
                        className="bg-base-100 rounded-box shadow-md"
                        defaultItems={ songs }
                        getItemId={ song => `async-${ song.id }` }
                        onReorder={ saveOrder }
                        renderItem={ song => (
                            <SortableListRow
                                avatar={
                                    <Avatar innerClassName="w-10 h-10 rounded-box">
                                        <img src={ song.image } alt={ song.title } />
                                    </Avatar>
                                }
                                title={ song.title }
                                subtitle={ song.artist }
                            />
                        )}
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableList</code></pre>
                    <pre data-prefix="2"><code>    defaultItems={'{ songs }'}</code></pre>
                    <pre data-prefix="3"><code>    onReorder={'{ ( items ) => api.saveOrder( items ) }'}</code></pre>
                    <pre data-prefix="4"><code>    renderItem={'{ song => <SortableListRow ... /> }'}</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                    <pre data-prefix="6"><code>{'// onReorder may return a promise : a rejection restores the previous order'}</code></pre>
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
                                <td>Controlled / uncontrolled items (each needs a stable id)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onReorder</code></td>
                                <td>function</td>
                                <td>(items, {'{ from, to, item }'}) =&gt; void | Promise — a rejected promise reverts the order (uncontrolled)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">renderItem</code></td>
                                <td>function</td>
                                <td>(item, index) =&gt; SortableListRow element</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">handle</code></td>
                                <td>boolean</td>
                                <td>Show a drag handle on each row (default true) ; false = whole row draggable</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">getItemId</code></td>
                                <td>function</td>
                                <td>Custom accessor for item identity (defaults to item.id)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">disabled</code></td>
                                <td>boolean</td>
                                <td>Disable dragging for all rows</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SortableListDemo ;
