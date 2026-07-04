'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import SortableGridItem from '@/components/layouts/SortableGridItem' ;
import SortableMasonry  from '@/components/layouts/SortableMasonry' ;

import Container from '@/display/Container' ;

import { MdLock } from 'react-icons/md' ;

const HEIGHTS =
[ 'h-24' , 'h-40' , 'h-28' , 'h-52' , 'h-32' , 'h-44' , 'h-24' , 'h-36' , 'h-48' , 'h-28' ] ;

const COLORS =
[ 'bg-primary' , 'bg-secondary' , 'bg-accent' , 'bg-info' , 'bg-success' , 'bg-warning' ] ;

const makeCards = ( prefix , count = 10 ) =>
    Array.from( { length : count } , ( _ , i ) => (
    {
        id     : `${ prefix }-${ i + 1 }` ,
        label  : `${ i + 1 }` ,
        height : HEIGHTS[ i % HEIGHTS.length ] ,
        color  : COLORS[ i % COLORS.length ] ,
    })) ;

const SortableMasonryDemo = () =>
{
    // --------- Controlled masonry

    const [ cards , setCards ] = useState( () => makeCards( 'ctrl' , 8 ) ) ;

    // --------- Disabled : global toggle + per-item locks

    const [ dragDisabled , setDragDisabled ] = useState( false ) ;

    const lockedCards = makeCards( 'locked' , 6 ).map( ( card , i ) => (
        { ...card , locked : i === 1 || i === 4 }
    )) ;

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

    // --------- Card renderer shared by the examples

    const renderCard = ( card ) => (
        <SortableGridItem
            className={ `${ card.color } ${ card.height } rounded-box flex items-center justify-center text-3xl font-bold text-primary-content cursor-grab active:cursor-grabbing select-none` }
        >
            { card.label }
        </SortableGridItem>
    ) ;

    // --------- Render

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Basic sortable masonry */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Sortable Masonry (variable heights, drag across columns)
                </h3>

                <p className="text-sm opacity-70">
                    The flat order is the concatenation of the columns (top to bottom, left to right).
                    After a drop the list is evenly redistributed — an item close to a column boundary
                    may shift to the neighbouring column : the invariant is the <b>order</b>, not the column.
                </p>

                <SortableMasonry
                    columns={ { xs : 2 , md : 3 } }
                    gap={ 4 }
                    defaultItems={ makeCards( 'basic' ) }
                    renderItem={ renderCard }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableMasonry</code></pre>
                    <pre data-prefix="2"><code>    columns={'{ { xs : 2 , md : 3 } }'} gap={'{ 4 }'}</code></pre>
                    <pre data-prefix="3"><code>    defaultItems={'{ cards }'}</code></pre>
                    <pre data-prefix="4"><code>    renderItem={'{ card => <SortableGridItem>...</SortableGridItem> }'}</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Controlled sortable masonry */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Controlled Masonry (live flat order)
                </h3>

                <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-sm opacity-60">Flat order :</span>
                    <span className="text-sm font-mono">
                        { cards.map( card => card.label ).join( ' , ' ) }
                    </span>
                </div>

                <SortableMasonry
                    columns={ { xs : 2 , md : 4 } }
                    gap={ 4 }
                    items={ cards }
                    onReorder={ next => setCards( next ) }
                    renderItem={ renderCard }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableMasonry</code></pre>
                    <pre data-prefix="2"><code>    items={'{ cards }'}</code></pre>
                    <pre data-prefix="3"><code>    onReorder={'{ next => setCards( next ) }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Disabled : global + per-item */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Disabled Dragging (global toggle + per-item locks)
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="sortable-masonry-disabled">
                        <Checkbox
                            checked  = { dragDisabled }
                            color    = "warning"
                            id       = "sortable-masonry-disabled"
                            onChange = { e => setDragDisabled( e.target.checked ) }
                        />
                        <span className="text-sm">Disable all dragging</span>
                    </label>

                    <span className="text-sm opacity-60">The 🔒 cards are always locked (per-item disabled).</span>
                </div>

                <SortableMasonry
                    columns={ { xs : 2 , md : 3 } }
                    gap={ 4 }
                    disabled={ dragDisabled }
                    defaultItems={ lockedCards }
                    renderItem={ card => (
                        <SortableGridItem
                            disabled={ card.locked ? true : undefined }
                            className={ `${ card.color } ${ card.height } rounded-box flex items-center justify-center gap-2 text-3xl font-bold text-primary-content select-none ${ card.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing' }` }
                        >
                            { card.label }
                            { card.locked && <MdLock size={ 22 } /> }
                        </SortableGridItem>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableMasonry</code></pre>
                    <pre data-prefix="2"><code>    disabled={'{ saving }'}  {'// container level : freezes every item'}</code></pre>
                    <pre data-prefix="3"><code>    renderItem={'{ card => ('}</code></pre>
                    <pre data-prefix="4"><code>        &lt;SortableGridItem disabled={'{ card.locked }'}&gt;  {'// item level : explicit value wins'}</code></pre>
                    <pre data-prefix="5"><code>    {')}'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                    <pre data-prefix="7"><code>{'// note : a disabled item cannot be grabbed, but it is not pinned —'}</code></pre>
                    <pre data-prefix="8"><code>{'// it still shifts when its neighbours are reordered'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Async reorder with optimistic revert */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Async Reorder with API Call (optimistic revert on failure)
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="sortable-masonry-fail">
                        <Checkbox
                            checked  = { shouldFail }
                            color    = "error"
                            id       = "sortable-masonry-fail"
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

                <SortableMasonry
                    columns={ { xs : 2 , md : 3 } }
                    gap={ 4 }
                    defaultItems={ makeCards( 'async' , 6 ) }
                    onReorder={ saveOrder }
                    renderItem={ renderCard }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableMasonry</code></pre>
                    <pre data-prefix="2"><code>    defaultItems={'{ cards }'}</code></pre>
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
                                <td>Controlled / uncontrolled flat list (each item needs a stable id)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onReorder</code></td>
                                <td>function</td>
                                <td>(items, {'{ from, to, item }'}) =&gt; void | Promise — flat indexes ; a rejected promise reverts the order (uncontrolled)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">renderItem</code></td>
                                <td>function</td>
                                <td>(item, indexInColumn) =&gt; SortableGridItem element</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">columns</code></td>
                                <td>number | object</td>
                                <td>Column count or responsive object {'{ xs, sm, md, lg, xl, xxl }'} (sequential distribution)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">handle</code></td>
                                <td>boolean</td>
                                <td>Show an overlay drag handle (default false : whole items draggable)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">getItemId / disabled / gap / ...</code></td>
                                <td>—</td>
                                <td>Same contract as SortableGrid ; other props forwarded to the Grid container</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SortableMasonryDemo ;
