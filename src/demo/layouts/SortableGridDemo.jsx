'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import SortableGrid     from '@/components/layouts/SortableGrid' ;
import SortableGridItem from '@/components/layouts/SortableGridItem' ;

import Container from '@/display/Container' ;

import { MdFavorite } from 'react-icons/md' ;

const SortableGridDemo = () =>
{
    // --------- Sortable photo gallery (uncontrolled)

    const photos = Array.from({ length : 8 } , ( _ , i ) => (
    {
        id    : i + 1 ,
        title : `Photo ${ i + 1 }` ,
        image : `https://i.pravatar.cc/300?u=grid-${ i + 1 }` ,
    })) ;

    // --------- Controlled sortable grid

    const [ cards , setCards ] = useState(
    [
        { id : 'a' , label : 'A' , color : 'bg-primary'   } ,
        { id : 'b' , label : 'B' , color : 'bg-secondary' } ,
        { id : 'c' , label : 'C' , color : 'bg-accent'    } ,
        { id : 'd' , label : 'D' , color : 'bg-info'      } ,
        { id : 'e' , label : 'E' , color : 'bg-success'   } ,
        { id : 'f' , label : 'F' , color : 'bg-warning'   } ,
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

            {/* Sortable Photo Gallery */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Sortable Photo Gallery (whole cards draggable, responsive columns)
                </h3>

                <SortableGrid
                    cols={ { xs : 2 , md : 3 , xl : 4 } }
                    gap={ 4 }
                    defaultItems={ photos }
                    renderItem={ photo => (
                        <SortableGridItem className="rounded-box overflow-hidden shadow-md cursor-grab active:cursor-grabbing bg-base-100">
                            <img
                                src={ photo.image }
                                alt={ photo.title }
                                draggable={ false }
                                className="w-full aspect-square object-cover select-none"
                            />
                            <div className="p-2 text-sm font-semibold text-center">
                                { photo.title }
                            </div>
                        </SortableGridItem>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableGrid</code></pre>
                    <pre data-prefix="2"><code>    cols={'{ { xs : 2 , md : 3 , xl : 4 } }'} gap={'{ 4 }'}</code></pre>
                    <pre data-prefix="3"><code>    defaultItems={'{ photos }'}</code></pre>
                    <pre data-prefix="4"><code>    renderItem={'{ photo => ('}</code></pre>
                    <pre data-prefix="5"><code>        &lt;SortableGridItem&gt;&lt;img draggable={'{ false }'} ... /&gt;&lt;/SortableGridItem&gt;</code></pre>
                    <pre data-prefix="6"><code>    {')}'}</code></pre>
                    <pre data-prefix="7"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Controlled Sortable Grid */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Controlled Sortable Grid
                </h3>

                <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-sm opacity-60">Current order :</span>
                    { cards.map( card => (
                        <Badge key={ card.id } color="neutral" size="sm">
                            { card.label }
                        </Badge>
                    ))}
                </div>

                <div className="w-full max-w-lg">
                    <SortableGrid
                        cols={ 3 }
                        gap={ 4 }
                        items={ cards }
                        onReorder={ next => setCards( next ) }
                        renderItem={ card => (
                            <SortableGridItem
                                className={ `${ card.color } text-primary-content rounded-box h-24 flex items-center justify-center text-3xl font-bold cursor-grab active:cursor-grabbing select-none` }
                            >
                                { card.label }
                            </SortableGridItem>
                        )}
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableGrid</code></pre>
                    <pre data-prefix="2"><code>    cols={'{ 3 }'} gap={'{ 4 }'}</code></pre>
                    <pre data-prefix="3"><code>    items={'{ cards }'}</code></pre>
                    <pre data-prefix="4"><code>    onReorder={'{ next => setCards( next ) }'}</code></pre>
                    <pre data-prefix="5"><code>    renderItem={'{ card => <SortableGridItem ... /> }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Overlay drag handles */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Overlay Drag Handles (cards with interactive content)
                </h3>

                <div className="w-full max-w-2xl">
                    <SortableGrid
                        cols={ 3 }
                        gap={ 4 }
                        handle
                        defaultItems={ photos.slice( 0 , 6 ) }
                        getItemId={ photo => `handle-${ photo.id }` }
                        renderItem={ photo => (
                            <SortableGridItem className="rounded-box overflow-hidden shadow-md bg-base-100">
                                <img
                                    src={ photo.image }
                                    alt={ photo.title }
                                    draggable={ false }
                                    className="w-full aspect-square object-cover select-none"
                                />
                                <div className="p-2 flex items-center justify-between">
                                    <span className="text-sm font-semibold">{ photo.title }</span>
                                    <Button size="xs" shape="square" color="ghost" icon={ MdFavorite } />
                                </div>
                            </SortableGridItem>
                        )}
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableGrid</code></pre>
                    <pre data-prefix="2"><code>    handle</code></pre>
                    <pre data-prefix="3"><code>    defaultItems={'{ photos }'}</code></pre>
                    <pre data-prefix="4"><code>    renderItem={'{ photo => <SortableGridItem>...</SortableGridItem> }'}</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                    <pre data-prefix="6"><code>{'// handle : items drag only from the overlay button (top-right corner)'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Async reorder with optimistic revert */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Async Reorder with API Call (optimistic revert on failure)
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="sortable-grid-fail">
                        <Checkbox
                            checked  = { shouldFail }
                            color    = "error"
                            id       = "sortable-grid-fail"
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
                    <SortableGrid
                        cols={ 3 }
                        gap={ 4 }
                        defaultItems={ photos.slice( 0 , 6 ) }
                        getItemId={ photo => `async-${ photo.id }` }
                        onReorder={ saveOrder }
                        renderItem={ photo => (
                            <SortableGridItem className="rounded-box overflow-hidden shadow-md bg-base-100 cursor-grab active:cursor-grabbing">
                                <img
                                    src={ photo.image }
                                    alt={ photo.title }
                                    draggable={ false }
                                    className="w-full aspect-square object-cover select-none"
                                />
                            </SortableGridItem>
                        )}
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableGrid</code></pre>
                    <pre data-prefix="2"><code>    defaultItems={'{ photos }'}</code></pre>
                    <pre data-prefix="3"><code>    onReorder={'{ ( items ) => api.saveOrder( items ) }'}</code></pre>
                    <pre data-prefix="4"><code>    renderItem={'{ photo => <SortableGridItem>...</SortableGridItem> }'}</code></pre>
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
                                <td>(item, index) =&gt; SortableGridItem element</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">handle</code></td>
                                <td>boolean</td>
                                <td>Show an overlay drag handle (default false : whole items draggable)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">getItemId</code></td>
                                <td>function</td>
                                <td>Custom accessor for item identity (defaults to item.id)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">disabled</code></td>
                                <td>boolean</td>
                                <td>Disable dragging for all items</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">cols / gap / ...</code></td>
                                <td>Grid props</td>
                                <td>Every other prop is forwarded to Grid (responsive cols, gaps, alignment, ...)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SortableGridDemo ;
