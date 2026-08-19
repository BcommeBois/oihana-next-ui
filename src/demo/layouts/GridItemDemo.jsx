'use client' ;

import Card     from '@/components/Card' ;
import Grid     from '@/components/layouts/Grid' ;
import GridItem from '@/components/layouts/GridItem' ;

const Box = ({ children , className = '' }) => (
    <div className={ `bg-secondary/20 border-2 border-secondary rounded-lg p-4 text-center font-semibold flex items-center justify-center ${className}` }>
        { children }
    </div>
) ;

const GridItemDemo = () =>
(
    <div className="flex flex-col gap-8">

        {/* Spans */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Spans</h2>
                <p className="opacity-70 mb-4">
                    How far a cell reaches. <code className="text-xs">colSpan</code> takes 1–12, <code className="text-xs">full</code> or <code className="text-xs">auto</code> ;
                    <code className="text-xs"> rowSpan</code> takes 1–6, <code className="text-xs">full</code> or <code className="text-xs">auto</code>.
                </p>
                <Grid className="bg-base-300 rounded-lg p-4" cols={4} gap={3}>
                    <GridItem colSpan={2} rowSpan={2}>
                        <Box className="h-full">colSpan 2<br />rowSpan 2</Box>
                    </GridItem>
                    <GridItem colSpan={2}><Box>colSpan 2</Box></GridItem>
                    <GridItem><Box>1</Box></GridItem>
                    <GridItem><Box>1</Box></GridItem>
                    <GridItem colSpan="full"><Box className="bg-accent/20 border-accent">colSpan &quot;full&quot;</Box></GridItem>
                </Grid>
            </div>
        </div>

        {/* Explicit placement */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Explicit placement</h2>
                <p className="opacity-70 mb-4">
                    Where a cell starts. <code className="text-xs">colStart</code> counts <em>grid lines</em>, not columns —
                    a 12 column grid has 13 of them, and the 13th is what pins a cell to the right edge.
                </p>

                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">A sidebar pinned to the last three columns</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={12} gap={3}>
                            <GridItem colSpan={9}><Box>Main — colSpan 9</Box></GridItem>
                            <GridItem colStart={10} colSpan={3}><Box className="bg-info/20 border-info">Sidebar — colStart 10</Box></GridItem>
                        </Grid>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Two cells on the same lines overlap</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={4} gap={3} rows={2}>
                            <GridItem colStart={1} rowStart={1} colSpan={3} rowSpan={2}>
                                <Box className="h-full">colStart 1 · rowStart 1 · 3×2</Box>
                            </GridItem>
                            <GridItem colStart={3} rowStart={2} colSpan={2} zIndex={10} className="translate-y-2">
                                <Box className="bg-warning/30 border-warning shadow-lg">colStart 3 · rowStart 2 · zIndex 10</Box>
                            </GridItem>
                        </Grid>
                    </div>
                </div>

                <div className="alert alert-warning mt-4" role="note">
                    <span>
                        <strong>Reading order.</strong> <code className="text-xs">colStart</code> / <code className="text-xs">rowStart</code> — and
                        <code className="text-xs"> flow=&quot;dense&quot;</code> below — move a cell on screen without moving it in the DOM.
                        The DOM is what a screen reader reads and what the tab key follows. Reorder the children when you can,
                        and place them only when you cannot.
                    </span>
                </div>
            </div>
        </div>

        {/* Responsive */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Responsive</h2>
                <p className="opacity-70 mb-4">
                    Every placement property takes a scalar <em>or</em> a breakpoint object.
                    Narrow the window : the hero gives up its span and everything stacks.
                </p>
                <Grid className="bg-base-300 rounded-lg p-4" cols={{ xs : 1 , sm : 2 , lg : 4 }} gap={3}>
                    <GridItem colSpan={{ xs : 1 , sm : 2 }} rowSpan={{ lg : 2 }}>
                        <Box className="h-full bg-primary/20 border-primary">
                            colSpan {'{ xs: 1, sm: 2 }'}<br />rowSpan {'{ lg: 2 }'}
                        </Box>
                    </GridItem>
                    <GridItem colSpan={{ lg : 2 }}><Box>colSpan {'{ lg: 2 }'}</Box></GridItem>
                    <GridItem><Box>1</Box></GridItem>
                    <GridItem><Box>1</Box></GridItem>
                    <GridItem colSpan={{ sm : 2 , lg : 1 }}><Box>colSpan {'{ sm: 2, lg: 1 }'}</Box></GridItem>
                </Grid>
            </div>
        </div>

        {/* Dense */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Holes, and <code className="text-lg">flow=&quot;dense&quot;</code></h2>
                <p className="opacity-70 mb-4">
                    The same six cells twice. A cell too wide for the room left on a line pushes to the next one and leaves a hole ;
                    <code className="text-xs"> dense</code> sends a later, narrower cell back to fill it — which is also what makes the
                    visual order stop matching the DOM order.
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Default flow — the hole stays</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={3} gap={3}>
                            <GridItem colSpan={2}><Box>1 — span 2</Box></GridItem>
                            <GridItem><Box>2</Box></GridItem>
                            <GridItem colSpan={3}><Box>3 — span 3</Box></GridItem>
                            <GridItem colSpan={2}><Box>4 — span 2</Box></GridItem>
                            <GridItem><Box>5</Box></GridItem>
                            <GridItem><Box>6</Box></GridItem>
                        </Grid>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">flow=&quot;dense&quot; — cell 6 backfills</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={3} flow="dense" gap={3}>
                            <GridItem colSpan={2}><Box>1 — span 2</Box></GridItem>
                            <GridItem><Box>2</Box></GridItem>
                            <GridItem colSpan={3}><Box>3 — span 3</Box></GridItem>
                            <GridItem colSpan={2}><Box>4 — span 2</Box></GridItem>
                            <GridItem><Box>5</Box></GridItem>
                            <GridItem><Box className="bg-success/30 border-success">6</Box></GridItem>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

        {/* Cell alignment */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Cell alignment</h2>
                <p className="opacity-70 mb-4">
                    <code className="text-xs">alignSelf</code>, <code className="text-xs">justifySelf</code> and <code className="text-xs">placeSelf</code>
                    override, for one cell, what the container aligns for all of them. The generator has carried them since the beginning ;
                    until now no component could reach them.
                </p>
                <Grid className="bg-base-300 rounded-lg p-4 min-h-52" cols={4} gap={3} rows={1}>
                    <GridItem alignSelf="start"><Box className="h-16">alignSelf start</Box></GridItem>
                    <GridItem alignSelf="center"><Box className="h-16">alignSelf center</Box></GridItem>
                    <GridItem alignSelf="end"><Box className="h-16">alignSelf end</Box></GridItem>
                    <GridItem justifySelf="center" alignSelf="center"><Box className="h-16 w-28">justifySelf center</Box></GridItem>
                </Grid>
            </div>
        </div>

        {/* Bento */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">A bento, without a bento component</h2>
                <p className="opacity-70 mb-4">
                    <code className="text-xs">as</code> takes a component, not just a tag : the cell <em>is</em> the card, its props
                    travel through <code className="text-xs">rest</code>. There is nothing left for a <code className="text-xs">BentoCard</code> to do.
                </p>
                <Grid cols={{ xs : 1 , md : 4 }} flow="dense" gap={4}>
                    <GridItem
                        as        = { Card }
                        className = "bg-primary/10 shadow-sm"
                        colSpan   = {{ md : 2 }}
                        rowSpan   = {{ md : 2 }}
                        title     = "Featured"
                    >
                        <p>Two columns, two rows. The cell carries the placement, the card carries the shell.</p>
                    </GridItem>

                    <GridItem as={ Card } className="bg-base-100 shadow-sm" colSpan={{ md : 2 }} title="Wide">
                        <p>Two columns.</p>
                    </GridItem>

                    <GridItem as={ Card } className="bg-base-100 shadow-sm" title="One">
                        <p>A single cell.</p>
                    </GridItem>

                    <GridItem as={ Card } className="bg-base-100 shadow-sm" title="Two">
                        <p>Another one.</p>
                    </GridItem>

                    <GridItem as={ Card } className="bg-accent/10 shadow-sm" colSpan="full" title="Footer">
                        <p>The whole width, whatever the column count is.</p>
                    </GridItem>
                </Grid>
            </div>
        </div>

        {/* Container queries */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Container queries</h2>
                <p className="opacity-70 mb-4">
                    Spans answer to the viewport ; a cell&apos;s content answers to the cell. Both cells below sit at the same viewport
                    width and at two very different widths of their own — <code className="text-xs">container</code> is what lets their
                    content tell the difference, in <code className="text-xs">@md:</code> rather than <code className="text-xs">md:</code>.
                    Off by default.
                </p>
                <Grid className="bg-base-300 rounded-lg p-4" cols={4} gap={3}>
                    <GridItem colSpan={3} container>
                        <div className="flex flex-col @md:flex-row gap-3 bg-base-100 rounded-lg p-4">
                            <div className="bg-info/20 border-2 border-info rounded p-3 flex-1">Row past @md</div>
                            <div className="bg-info/20 border-2 border-info rounded p-3 flex-1">because the cell is wide</div>
                        </div>
                    </GridItem>
                    <GridItem container>
                        <div className="flex flex-col @md:flex-row gap-3 bg-base-100 rounded-lg p-4">
                            <div className="bg-warning/20 border-2 border-warning rounded p-3 flex-1">Still stacked</div>
                            <div className="bg-warning/20 border-2 border-warning rounded p-3 flex-1">same viewport, narrow cell</div>
                        </div>
                    </GridItem>
                </Grid>
            </div>
        </div>

        {/* Surface */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Shadow &amp; background pattern, per cell</h2>
                <p className="opacity-70 mb-4">
                    A container carries these two for all of its children at once. On a cell they say something else :
                    <em> this tile</em> is raised, <em>that one</em> is textured. It is what turns a flat bento into one
                    with a lead tile — and the lift on hover costs a <code className="text-xs">{'{ value , hover }'}</code> object,
                    not a class written by hand.
                </p>
                <p className="opacity-70 mb-4">
                    The tint a pattern needs is scoped to the pseudo-element it is painted on, so the two textured
                    cells below hold ordinary, readable text without stating a colour of their own.
                </p>
                <Grid className="bg-base-300 rounded-lg p-4" cols={4} gap={4}>
                    <GridItem
                        className = "bg-base-100 rounded-lg p-4 h-32 transition-shadow"
                        colSpan   = {2}
                        rowSpan   = {2}
                        shadow    = { { value : 'md' , hover : '2xl' } }
                    >
                        <span className="font-semibold">lead tile</span>
                        <span className="block text-xs opacity-70">shadow md, 2xl on hover</span>
                    </GridItem>
                    <GridItem
                        backgroundPattern = "topography"
                        className         = "bg-base-100 rounded-lg p-4"
                        colSpan           = {2}
                    >
                        <span className="text-xs">backgroundPattern topography</span>
                    </GridItem>
                    <GridItem
                        backgroundPattern = { { pattern : 'hexagons' , baseColor : 'primary' } }
                        className         = "bg-base-100 rounded-lg p-4"
                        shadow            = "sm"
                    >
                        <span className="text-xs">hexagons, primary</span>
                    </GridItem>
                    <GridItem className="bg-base-100 rounded-lg p-4" shadow="xl">
                        <span className="text-xs">shadow xl</span>
                    </GridItem>
                </Grid>
                <p className="text-sm opacity-70 mt-4">
                    Both properties come from <code className="text-xs">getLayoutClassNames</code>, so a cell reaches them
                    on exactly the terms a <code className="text-xs">Grid</code> or a <code className="text-xs">Flex</code> does.
                </p>
            </div>
        </div>

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
                            <td><code className="text-xs">alignSelf</code></td>
                            <td>string | object</td>
                            <td>Align this cell along the block axis, overriding the container</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">as</code></td>
                            <td>ElementType</td>
                            <td>Element or component to render (default div) — takes Card, Grid, anything</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">colSpan</code></td>
                            <td>1–12 | full | auto | object</td>
                            <td>Columns the cell covers</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">colStart</code></td>
                            <td>1–13 | auto | object</td>
                            <td>Grid line the cell starts at (13 lines for 12 columns)</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">container</code></td>
                            <td>boolean</td>
                            <td>Turn the cell into a container query context (default false)</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">justifySelf</code></td>
                            <td>string | object</td>
                            <td>Justify this cell along the inline axis</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">placeSelf</code></td>
                            <td>string | object</td>
                            <td>align + justify shorthand</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">rowSpan</code></td>
                            <td>1–6 | full | auto | object</td>
                            <td>Rows the cell covers</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">rowStart</code></td>
                            <td>1–7 | auto | object</td>
                            <td>Grid line the cell starts at</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">padding* / margin*</code></td>
                            <td>number | string | object</td>
                            <td>The usual spacing set, RTL aware through Start / End</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">width / height / min* / max* / size</code></td>
                            <td>number | string | object</td>
                            <td>Sizing utilities</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">backgroundColor / borderColor / borderRadius</code></td>
                            <td>string</td>
                            <td>Surface utilities</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">backgroundPattern</code></td>
                            <td>string | object</td>
                            <td>Pattern name, or <code className="text-xs">{'{ pattern , baseColor , color , withColor }'}</code></td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">shadow</code></td>
                            <td>string | true | object</td>
                            <td>Box shadow depth — accepts <code className="text-xs">{'{ value , hover }'}</code> like every pseudo-class property</td>
                        </tr>
                        <tr>
                            <td><code className="text-xs">overflow / position / zIndex</code></td>
                            <td>string | number</td>
                            <td>Stacking and clipping</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="text-sm opacity-70">
                Every property marked <em>object</em> takes a breakpoint object — <code className="text-xs">{'{ xs, sm, md, lg, xl, xxl }'}</code> — as well as a scalar.
            </p>
        </div>

    </div>
) ;

export default GridItemDemo ;
