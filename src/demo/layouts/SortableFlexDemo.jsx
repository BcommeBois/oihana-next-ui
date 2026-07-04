'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Divider  from '@/components/Divider' ;

import SortableFlex     from '@/components/layouts/SortableFlex' ;
import SortableFlexItem from '@/components/layouts/SortableFlexItem' ;

import Container from '@/display/Container' ;

import { MdClose } from 'react-icons/md' ;

const SortableFlexDemo = () =>
{
    // --------- Reorderable tags (uncontrolled)

    const tags =
    [
        { id : 'react'    , label : 'React'      } ,
        { id : 'next'     , label : 'Next.js'    } ,
        { id : 'tailwind' , label : 'Tailwind'   } ,
        { id : 'daisyui'  , label : 'daisyUI'    } ,
        { id : 'motion'   , label : 'Motion'     } ,
        { id : 'biome'    , label : 'Biome'      } ,
        { id : 'bun'      , label : 'Bun'        } ,
    ] ;

    // --------- Controlled priority pills

    const [ steps , setSteps ] = useState(
    [
        { id : 'audit'  , label : 'Audit'    , color : 'badge-primary'   } ,
        { id : 'code'   , label : 'Code'     , color : 'badge-secondary' } ,
        { id : 'test'   , label : 'Test'     , color : 'badge-accent'    } ,
        { id : 'commit' , label : 'Commit'   , color : 'badge-info'      } ,
        { id : 'push'   , label : 'Push'     , color : 'badge-success'   } ,
    ]) ;

    // --------- Removable chips with inline handles

    const [ skills , setSkills ] = useState(
    [
        { id : 'js'   , label : 'JavaScript' } ,
        { id : 'ts'   , label : 'TypeScript' } ,
        { id : 'css'  , label : 'CSS'        } ,
        { id : 'a11y' , label : 'A11y'       } ,
        { id : 'i18n' , label : 'I18n'       } ,
    ]) ;

    const removeSkill = ( skillId ) =>
    {
        setSkills( prev => prev.filter( skill => skill.id !== skillId ) ) ;
    } ;

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

            {/* Reorderable tags */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Reorderable Tags (whole chips draggable, wrapping row)
                </h3>

                <SortableFlex
                    gap={ 2 }
                    wrap="wrap"
                    defaultItems={ tags }
                    renderItem={ tag => (
                        <SortableFlexItem className="badge badge-lg badge-outline bg-base-100 cursor-grab active:cursor-grabbing select-none">
                            { tag.label }
                        </SortableFlexItem>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableFlex</code></pre>
                    <pre data-prefix="2"><code>    gap={'{ 2 }'} wrap="wrap"</code></pre>
                    <pre data-prefix="3"><code>    defaultItems={'{ tags }'}</code></pre>
                    <pre data-prefix="4"><code>    renderItem={'{ tag => ('}</code></pre>
                    <pre data-prefix="5"><code>        &lt;SortableFlexItem className="badge badge-lg"&gt;{'{ tag.label }'}&lt;/SortableFlexItem&gt;</code></pre>
                    <pre data-prefix="6"><code>    {')}'}</code></pre>
                    <pre data-prefix="7"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Controlled priority pills */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Controlled Pills (workflow steps)
                </h3>

                <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-sm opacity-60">Current order :</span>
                    <span className="text-sm font-mono">
                        { steps.map( step => step.label ).join( ' → ' ) }
                    </span>
                </div>

                <SortableFlex
                    gap={ 2 }
                    items={ steps }
                    onReorder={ next => setSteps( next ) }
                    renderItem={ ( step , index ) => (
                        <SortableFlexItem
                            className={ `badge badge-lg ${ step.color } gap-1 cursor-grab active:cursor-grabbing select-none` }
                        >
                            <span className="font-bold">{ index + 1 }.</span>
                            { step.label }
                        </SortableFlexItem>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableFlex</code></pre>
                    <pre data-prefix="2"><code>    gap={'{ 2 }'}</code></pre>
                    <pre data-prefix="3"><code>    items={'{ steps }'}</code></pre>
                    <pre data-prefix="4"><code>    onReorder={'{ next => setSteps( next ) }'}</code></pre>
                    <pre data-prefix="5"><code>    renderItem={'{ ( step , index ) => <SortableFlexItem ... /> }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Vertical sortable flex */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Vertical Direction (simple stacked items)
                </h3>

                <div className="w-full max-w-sm">
                    <SortableFlex
                        direction="col"
                        gap={ 2 }
                        defaultItems={ tags }
                        getItemId={ tag => `vertical-${ tag.id }` }
                        renderItem={ ( tag , index ) => (
                            <SortableFlexItem className="flex items-center gap-3 bg-base-100 rounded-box px-4 py-3 shadow-sm cursor-grab active:cursor-grabbing select-none">
                                <span className="text-sm font-bold opacity-40 tabular-nums">{ index + 1 }</span>
                                <span className="font-semibold">{ tag.label }</span>
                            </SortableFlexItem>
                        )}
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableFlex</code></pre>
                    <pre data-prefix="2"><code>    direction="col"</code></pre>
                    <pre data-prefix="3"><code>    gap={'{ 2 }'}</code></pre>
                    <pre data-prefix="4"><code>    defaultItems={'{ items }'}</code></pre>
                    <pre data-prefix="5"><code>    renderItem={'{ ( item , index ) => <SortableFlexItem>...</SortableFlexItem> }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                    <pre data-prefix="7"><code>{'// direction="col" : a lightweight vertical sortable, without the List markup'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Removable chips with inline handles */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Inline Drag Handles (chips with a remove button)
                </h3>

                <SortableFlex
                    gap={ 2 }
                    wrap="wrap"
                    handle
                    items={ skills }
                    onReorder={ next => setSkills( next ) }
                    renderItem={ skill => (
                        <SortableFlexItem className="flex items-center gap-1 bg-base-100 rounded-full pl-1 pr-2 py-1 shadow-sm select-none">
                            <span className="text-sm">{ skill.label }</span>
                            <button
                                type="button"
                                aria-label={ `Remove ${ skill.label }` }
                                className="btn btn-ghost btn-circle btn-xs"
                                onClick={ () => removeSkill( skill.id ) }
                            >
                                <MdClose size={ 12 } />
                            </button>
                        </SortableFlexItem>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableFlex</code></pre>
                    <pre data-prefix="2"><code>    handle</code></pre>
                    <pre data-prefix="3"><code>    items={'{ skills }'}</code></pre>
                    <pre data-prefix="4"><code>    onReorder={'{ next => setSkills( next ) }'}</code></pre>
                    <pre data-prefix="5"><code>    renderItem={'{ skill => <SortableFlexItem>...</SortableFlexItem> }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                    <pre data-prefix="7"><code>{'// handle : chips drag only from the inline handle, the remove button stays clickable'}</code></pre>
                </div>
            </div>

            <Divider />

            {/* Async reorder with optimistic revert */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Async Reorder with API Call (optimistic revert on failure)
                </h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <label className="flex gap-2 items-center cursor-pointer" htmlFor="sortable-flex-fail">
                        <Checkbox
                            checked  = { shouldFail }
                            color    = "error"
                            id       = "sortable-flex-fail"
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

                <SortableFlex
                    gap={ 2 }
                    wrap="wrap"
                    defaultItems={ tags }
                    getItemId={ tag => `async-${ tag.id }` }
                    onReorder={ saveOrder }
                    renderItem={ tag => (
                        <SortableFlexItem className="badge badge-lg badge-neutral cursor-grab active:cursor-grabbing select-none">
                            { tag.label }
                        </SortableFlexItem>
                    )}
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;SortableFlex</code></pre>
                    <pre data-prefix="2"><code>    defaultItems={'{ tags }'}</code></pre>
                    <pre data-prefix="3"><code>    onReorder={'{ ( items ) => api.saveOrder( items ) }'}</code></pre>
                    <pre data-prefix="4"><code>    renderItem={'{ tag => <SortableFlexItem>...</SortableFlexItem> }'}</code></pre>
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
                                <td>(item, index) =&gt; SortableFlexItem element</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">handle</code></td>
                                <td>boolean</td>
                                <td>Show an inline drag handle (default false : whole items draggable)</td>
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
                                <td><code className="text-xs">direction / wrap / gap / ...</code></td>
                                <td>Flex props</td>
                                <td>Every other prop is forwarded to Flex (direction, wrapping, gaps, alignment, ...)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SortableFlexDemo ;
