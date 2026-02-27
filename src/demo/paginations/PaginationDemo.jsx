'use client' ;

import { useState } from 'react' ;

import Badge      from '@/components/Badge' ;
import Button     from '@/components/Button' ;
import Divider    from '@/components/Divider' ;
import Pagination from '@/components/paginations/Pagination' ;

import Container from '@/display/Container' ;

import { MdFirstPage , MdLastPage , MdNavigateBefore , MdNavigateNext } from 'react-icons/md' ;

const PaginationDemo = () =>
{
    // --------- Basic pagination

    const [ basicOffset , setBasicOffset ] = useState( 0 ) ;
    const basicLimit = 10 ;
    const basicTotal = 100 ;

    const handleBasicChange = ( offset , page ) =>
    {
        console.log( `Basic pagination: page ${ page }, offset ${ offset }` ) ;
        setBasicOffset( offset ) ;
    } ;

    // --------- With label

    const [ labelOffset , setLabelOffset ] = useState( 0 ) ;
    const labelLimit = 12 ;
    const labelTotal = 250 ;

    const handleLabelChange = ( offset , page ) =>
    {
        console.log( `Label pagination: page ${ page }, offset ${ offset }` ) ;
        setLabelOffset( offset ) ;
    } ;

    // --------- Custom label format

    const [ customLabelOffset , setCustomLabelOffset ] = useState( 0 ) ;
    const customLabelLimit = 15 ;
    const customLabelTotal = 300 ;

    const customLabelFormat = ( currentPage , pageCount , offset , total ) =>
    {
        const start = offset + 1 ;
        const end = Math.min( offset + customLabelLimit , total ) ;
        return `${ start }–${ end } of ${ total } items` ;
    } ;

    const handleCustomLabelChange = ( offset , page ) =>
    {
        setCustomLabelOffset( offset ) ;
    } ;

    // --------- Data table example

    const [ tableOffset , setTableOffset ] = useState( 0 ) ;
    const tableLimit = 5 ;
    const tableTotal = 47 ;

    const handleTableChange = ( offset ) =>
    {
        setTableOffset( offset ) ;
    } ;

    // Generate mock data
    const generateTableData = () =>
    {
        const data = [] ;
        const start = tableOffset + 1 ;
        const end = Math.min( tableOffset + tableLimit , tableTotal ) ;

        for ( let i = start ; i <= end ; i++ )
        {
            data.push({
                id    : i ,
                name  : `Item ${ i }` ,
                status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive' ,
            }) ;
        }

        return data ;
    } ;

    const tableData = generateTableData() ;

    // --------- Sizes

    const [ sizeOffset , setSizeOffset ] = useState( 0 ) ;
    const sizeLimit = 8 ;
    const sizeTotal = 80 ;

    // --------- Colors

    const [ colorOffset , setColorOffset ] = useState( 0 ) ;
    const colorLimit = 10 ;
    const colorTotal = 100 ;

    // --------- Minimal (no first/last)

    const [ minimalOffset , setMinimalOffset ] = useState( 0 ) ;
    const minimalLimit = 10 ;
    const minimalTotal = 50 ;

    // --------- Custom icons

    const [ customIconOffset , setCustomIconOffset ] = useState( 0 ) ;
    const customIconLimit = 10 ;
    const customIconTotal = 100 ;

    // --------- Few pages (edge case)

    const [ fewPagesOffset , setFewPagesOffset ] = useState( 0 ) ;
    const fewPagesLimit = 10 ;
    const fewPagesTotal = 15 ; // Only 2 pages

    // --------- Many pages

    const [ manyPagesOffset , setManyPagesOffset ] = useState( 0 ) ;
    const manyPagesLimit = 10 ;
    const manyPagesTotal = 1000 ; // 100 pages

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Pagination Examples</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Basic Pagination
                </h3>

                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <Badge>Current Page: { Math.floor( basicOffset / basicLimit ) + 1 }</Badge>
                        <Badge color="neutral">Offset: { basicOffset }</Badge>
                    </div>

                    <Pagination
                        limit    = { basicLimit }
                        offset   = { basicOffset }
                        total    = { basicTotal }
                        onChange = { handleBasicChange }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>const [ offset, setOffset ] = useState( 0 ) ;</code></pre>
                    <pre data-prefix="2"><code></code></pre>
                    <pre data-prefix="3"><code>&lt;Pagination</code></pre>
                    <pre data-prefix="4"><code>    limit    = {'{ 10 }'}</code></pre>
                    <pre data-prefix="5"><code>    offset   = {'{ offset }'}</code></pre>
                    <pre data-prefix="6"><code>    total    = {'{ 100 }'}</code></pre>
                    <pre data-prefix="7"><code>    onChange = {'{ (offset, page) => setOffset(offset) }'}</code></pre>
                    <pre data-prefix="8"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* With Label */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    With Label
                </h3>

                <Pagination
                    limit    = { labelLimit }
                    offset   = { labelOffset }
                    total    = { labelTotal }
                    onChange = { handleLabelChange }
                    label
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Pagination</code></pre>
                    <pre data-prefix="2"><code>    limit    = {'{ 12 }'}</code></pre>
                    <pre data-prefix="3"><code>    offset   = {'{ offset }'}</code></pre>
                    <pre data-prefix="4"><code>    total    = {'{ 250 }'}</code></pre>
                    <pre data-prefix="5"><code>    onChange = {'{ handleChange }'}</code></pre>
                    <pre data-prefix="6"><code>    label    <span className="text-warning">// Show default label</span></code></pre>
                    <pre data-prefix="7"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Custom Label Format */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Custom Label Format
                </h3>

                <Pagination
                    limit       = { customLabelLimit }
                    offset      = { customLabelOffset }
                    total       = { customLabelTotal }
                    onChange    = { handleCustomLabelChange }
                    label
                    labelFormat = { customLabelFormat }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>const labelFormat = ( current, total, offset, totalItems ) =&gt; {'{'}</code></pre>
                    <pre data-prefix="2"><code>    const start = offset + 1 ;</code></pre>
                    <pre data-prefix="3"><code>    const end = Math.min( offset + limit, totalItems ) ;</code></pre>
                    <pre data-prefix="4"><code>    return `${'${start}'}–${'${end}'} of ${'${totalItems}'} items` ;</code></pre>
                    <pre data-prefix="5"><code>{'}'} ;</code></pre>
                    <pre data-prefix="6"><code></code></pre>
                    <pre data-prefix="7"><code>&lt;Pagination labelFormat={'{ labelFormat }'} label /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Data Table Example */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Pagination with Data Table
                </h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tableData.map( item => (
                                <tr key={ item.id }>
                                    <td>{ item.id }</td>
                                    <td>{ item.name }</td>
                                    <td>
                                        <Badge
                                            color={
                                                item.status === 'Active' ? 'success' :
                                                item.status === 'Pending' ? 'warning' :
                                                'neutral'
                                            }
                                            size="sm"
                                        >
                                            { item.status }
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    limit    = { tableLimit }
                    offset   = { tableOffset }
                    total    = { tableTotal }
                    onChange = { handleTableChange }
                    label
                />
            </div>

            <Divider />

            {/* Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    Different Sizes
                </h3>

                <div className="flex flex-col gap-4 items-start">
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">size="xs"</code>
                        <Pagination
                            limit    = { sizeLimit }
                            offset   = { sizeOffset }
                            total    = { sizeTotal }
                            onChange = { ( offset ) => setSizeOffset( offset ) }
                            size     = "xs"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">size="sm" (default)</code>
                        <Pagination
                            limit    = { sizeLimit }
                            offset   = { sizeOffset }
                            total    = { sizeTotal }
                            onChange = { ( offset ) => setSizeOffset( offset ) }
                            size     = "sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">size="md"</code>
                        <Pagination
                            limit    = { sizeLimit }
                            offset   = { sizeOffset }
                            total    = { sizeTotal }
                            onChange = { ( offset ) => setSizeOffset( offset ) }
                            size     = "md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">size="lg"</code>
                        <Pagination
                            limit    = { sizeLimit }
                            offset   = { sizeOffset }
                            total    = { sizeTotal }
                            onChange = { ( offset ) => setSizeOffset( offset ) }
                            size     = "lg"
                        />
                    </div>
                </div>
            </div>

            <Divider />

            {/* Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Different Colors
                </h3>

                <div className="flex flex-col gap-4">
                    <Pagination
                        limit       = { colorLimit }
                        offset      = { colorOffset }
                        total       = { colorTotal }
                        onChange    = { ( offset ) => setColorOffset( offset ) }
                        color       = "primary"
                        activeColor = "primary"
                        label       = "Primary"
                    />

                    <Pagination
                        limit       = { colorLimit }
                        offset      = { colorOffset }
                        total       = { colorTotal }
                        onChange    = { ( offset ) => setColorOffset( offset ) }
                        color       = "secondary"
                        activeColor = "secondary"
                        label       = "Secondary"
                    />

                    <Pagination
                        limit       = { colorLimit }
                        offset      = { colorOffset }
                        total       = { colorTotal }
                        onChange    = { ( offset ) => setColorOffset( offset ) }
                        color       = "accent"
                        activeColor = "accent"
                        label       = "Accent"
                    />

                    <Pagination
                        limit       = { colorLimit }
                        offset      = { colorOffset }
                        total       = { colorTotal }
                        onChange    = { ( offset ) => setColorOffset( offset ) }
                        color       = "ghost"
                        activeColor = "info"
                        label       = "Ghost + Info Active"
                    />
                </div>
            </div>

            <Divider />

            {/* Minimal (No First/Last) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    Minimal Pagination (No First/Last Buttons)
                </h3>

                <Pagination
                    limit     = { minimalLimit }
                    offset    = { minimalOffset }
                    total     = { minimalTotal }
                    onChange  = { ( offset ) => setMinimalOffset( offset ) }
                    showFirst = { false }
                    showLast  = { false }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Pagination</code></pre>
                    <pre data-prefix="2"><code>    showFirst = {'{ false }'}</code></pre>
                    <pre data-prefix="3"><code>    showLast  = {'{ false }'}</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Custom Icons */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Custom Navigation Icons
                </h3>

                <Pagination
                    limit     = { customIconLimit }
                    offset    = { customIconOffset }
                    total     = { customIconTotal }
                    onChange  = { ( offset ) => setCustomIconOffset( offset ) }
                    FirstIcon = { MdFirstPage }
                    LastIcon  = { MdLastPage }
                    NextIcon  = { MdNavigateNext }
                    PrevIcon  = { MdNavigateBefore }
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>import {'{ MdFirstPage, ... }'} from 'react-icons/md' ;</code></pre>
                    <pre data-prefix="2"><code></code></pre>
                    <pre data-prefix="3"><code>&lt;Pagination</code></pre>
                    <pre data-prefix="4"><code>    FirstIcon = {'{ MdFirstPage }'}</code></pre>
                    <pre data-prefix="5"><code>    LastIcon  = {'{ MdLastPage }'}</code></pre>
                    <pre data-prefix="6"><code>    NextIcon  = {'{ MdNavigateNext }'}</code></pre>
                    <pre data-prefix="7"><code>    PrevIcon  = {'{ MdNavigateBefore }'}</code></pre>
                    <pre data-prefix="8"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Edge Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Edge Cases
                </h3>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Few Pages (Only 2 pages)</p>
                        <Pagination
                            limit    = { fewPagesLimit }
                            offset   = { fewPagesOffset }
                            total    = { fewPagesTotal }
                            onChange = { ( offset ) => setFewPagesOffset( offset ) }
                            label
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Many Pages (100 pages total)</p>
                        <Pagination
                            limit      = { manyPagesLimit }
                            offset     = { manyPagesOffset }
                            total      = { manyPagesTotal }
                            onChange   = { ( offset ) => setManyPagesOffset( offset ) }
                            pageOffset = { 3 }
                            label
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Single Page (Hidden)</p>
                        <div className="alert alert-info">
                            <span className="text-sm">
                                Pagination with 10 items and limit=20 won't display (only 1 page)
                            </span>
                        </div>
                        <Pagination
                            limit    = { 20 }
                            offset   = { 0 }
                            total    = { 10 }
                            onChange = { () => {} }
                        />
                        <p className="text-xs text-base-content/70">
                            ↑ Nothing renders when there's only 1 page
                        </p>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Disabled State */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Disabled State
                </h3>

                <Pagination
                    limit    = { 10 }
                    offset   = { 20 }
                    total    = { 100 }
                    onChange = { () => {} }
                    disabled
                    label    = "Disabled"
                />

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Pagination disabled /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Advanced: Reset Button */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Advanced: With Reset Button
                </h3>

                <div className="flex flex-col gap-3">
                    <div className="flex gap-2 items-center">
                        <Button
                            size    = "sm"
                            color   = "ghost"
                            onClick = { () => setBasicOffset( 0 ) }
                        >
                            Reset to First Page
                        </Button>

                        <Button
                            size    = "sm"
                            color   = "ghost"
                            onClick = { () => setBasicOffset( 50 ) }
                        >
                            Jump to Page 6
                        </Button>
                    </div>

                    <Pagination
                        limit    = { basicLimit }
                        offset   = { basicOffset }
                        total    = { basicTotal }
                        onChange = { handleBasicChange }
                        label
                    />
                </div>
            </div>

            <Divider />

            {/* Horizontal Alignment */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Horizontal Alignment
                </h3>

                <div className="flex flex-col gap-6">
                    {/* Left aligned (default) */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">justify-start (default)</code>
                        <Pagination
                            limit    = { labelLimit }
                            offset   = { labelOffset }
                            total    = { labelTotal }
                            onChange = { handleLabelChange }
                            className = "justify-start"
                            label
                        />
                    </div>

                    {/* Center aligned */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">justify-center</code>
                        <Pagination
                            limit    = { labelLimit }
                            offset   = { labelOffset }
                            total    = { labelTotal }
                            onChange = { handleLabelChange }
                            className = "justify-center"
                            label
                        />
                    </div>

                    {/* Right aligned */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">justify-end</code>
                        <Pagination
                            limit    = { labelLimit }
                            offset   = { labelOffset }
                            total    = { labelTotal }
                            onChange = { handleLabelChange }
                            className = "justify-end"
                            label
                        />
                    </div>

                    {/* Center with wrapper */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Wrapper with flex justify-center</code>
                        <div className="flex justify-center">
                            <Pagination
                                limit    = { labelLimit }
                                offset   = { labelOffset }
                                total    = { labelTotal }
                                onChange = { handleLabelChange }
                            />
                        </div>
                    </div>

                    {/* Fully centered (no label on right) */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Centered without label</code>
                        <div className="flex justify-center">
                            <Pagination
                                limit    = { labelLimit }
                                offset   = { labelOffset }
                                total    = { labelTotal }
                                onChange = { handleLabelChange }
                                label    = { false }
                            />
                        </div>
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="$"><code className="text-warning">// Left aligned (default)</code></pre>
                    <pre data-prefix="1"><code>&lt;Pagination className="justify-start" /&gt;</code></pre>
                    <pre data-prefix=" "><code></code></pre>
                    <pre data-prefix="$"><code className="text-warning">// Center aligned</code></pre>
                    <pre data-prefix="2"><code>&lt;Pagination className="justify-center" /&gt;</code></pre>
                    <pre data-prefix=" "><code></code></pre>
                    <pre data-prefix="$"><code className="text-warning">// Right aligned</code></pre>
                    <pre data-prefix="3"><code>&lt;Pagination className="justify-end" /&gt;</code></pre>
                    <pre data-prefix=" "><code></code></pre>
                    <pre data-prefix="$"><code className="text-warning">// Centered in wrapper (recommended)</code></pre>
                    <pre data-prefix="4"><code>&lt;div className="flex justify-center"&gt;</code></pre>
                    <pre data-prefix="5"><code>    &lt;Pagination /&gt;</code></pre>
                    <pre data-prefix="6"><code>&lt;/div&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Label Position */}
            <div className="flex flex-col gap-8">

                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Label Position
                </h3>

                <div className="flex flex-col gap-6">
                    {/* Right (default) */}
                    <code className="badge badge-sm">labelPosition="right" (default)</code>
                    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box">
                        <Pagination
                            limit         = { labelLimit }
                            offset        = { labelOffset }
                            total         = { labelTotal }
                            onChange      = { handleLabelChange }
                            label
                            labelPosition = "right"
                        />
                    </div>

                    {/* Left */}
                    <code className="badge badge-sm">labelPosition="left"</code>
                    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box">
                        <Pagination
                            limit         = { labelLimit }
                            offset        = { labelOffset }
                            total         = { labelTotal }
                            onChange      = { handleLabelChange }
                            label
                            labelPosition = "left"
                        />
                    </div>

                    {/* Top - Center aligned */}
                    <code className="badge badge-sm">labelPosition="top" labelAlign="center"</code>
                    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box">
                        <Pagination
                            limit         = { labelLimit }
                            offset        = { labelOffset }
                            total         = { labelTotal }
                            onChange      = { handleLabelChange }
                            label
                            labelPosition = "top"
                            labelAlign    = "center"
                        />
                    </div>

                    {/* Top - Start aligned */}
                    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box">
                        <code className="badge badge-sm">labelPosition="top" labelAlign="start"</code>
                        <Pagination
                            limit         = { labelLimit }
                            offset        = { labelOffset }
                            total         = { labelTotal }
                            onChange      = { handleLabelChange }
                            label
                            labelPosition = "top"
                            labelAlign    = "start"
                        />
                    </div>

                    {/* Top - End aligned */}
                    <code className="badge badge-sm">labelPosition="top" labelAlign="end"</code>
                    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box">
                        <Pagination
                            limit         = { labelLimit }
                            offset        = { labelOffset }
                            total         = { labelTotal }
                            onChange      = { handleLabelChange }
                            label
                            labelPosition = "top"
                            labelAlign    = "end"
                        />
                    </div>

                    {/* Bottom - Center aligned */}
                    <code className="badge badge-sm">labelPosition="bottom" labelAlign="center"</code>
                    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box">
                        <Pagination
                            limit         = { labelLimit }
                            offset        = { labelOffset }
                            total         = { labelTotal }
                            onChange      = { handleLabelChange }
                            label
                            labelPosition = "bottom"
                            labelAlign    = "center"
                        />
                    </div>

                    {/* Bottom - Start aligned */}
                    <code className="badge badge-sm">labelPosition="bottom" labelAlign="start"</code>
                    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box">
                        <Pagination
                            limit         = { labelLimit }
                            offset        = { labelOffset }
                            total         = { labelTotal }
                            onChange      = { handleLabelChange }
                            label
                            labelPosition = "bottom"
                            labelAlign    = "start"
                        />
                    </div>

                    {/* Bottom - End aligned */}
                    <code className="badge badge-sm">labelPosition="bottom" labelAlign="end"</code>
                    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-box">
                        <Pagination
                            limit         = { labelLimit }
                            offset        = { labelOffset }
                            total         = { labelTotal }
                            onChange      = { handleLabelChange }
                            label
                            labelPosition = "bottom"
                            labelAlign    = "end"
                        />
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="$"><code className="text-warning">// Label on right (default)</code></pre>
                    <pre data-prefix="1"><code>&lt;Pagination label labelPosition="right" /&gt;</code></pre>
                    <pre data-prefix=" "><code></code></pre>
                    <pre data-prefix="$"><code className="text-warning">// Label on left</code></pre>
                    <pre data-prefix="2"><code>&lt;Pagination label labelPosition="left" /&gt;</code></pre>
                    <pre data-prefix=" "><code></code></pre>
                    <pre data-prefix="$"><code className="text-warning">// Label on top (centered)</code></pre>
                    <pre data-prefix="3"><code>&lt;Pagination</code></pre>
                    <pre data-prefix="4"><code>    label</code></pre>
                    <pre data-prefix="5"><code>    labelPosition = "top"</code></pre>
                    <pre data-prefix="6"><code>    labelAlign    = "center"</code></pre>
                    <pre data-prefix="7"><code>/&gt;</code></pre>
                    <pre data-prefix=" "><code></code></pre>
                    <pre data-prefix="$"><code className="text-warning">// Label on bottom (left aligned)</code></pre>
                    <pre data-prefix="8"><code>&lt;Pagination</code></pre>
                    <pre data-prefix="9"><code>    label</code></pre>
                    <pre data-prefix="10"><code>    labelPosition = "bottom"</code></pre>
                    <pre data-prefix="11"><code>    labelAlign    = "start"</code></pre>
                    <pre data-prefix="12"><code>/&gt;</code></pre>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default PaginationDemo ;