'use client' ;

import Button    from '@/components/Button' ;
import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Modal     from '@/components/modals/Modal' ;
import Tooltip   from '@/components/Tooltip' ;

import useModal from '@/components/modals/hooks/useModal' ;

/**
 * Tooltip showcase — positions, the new start/center/end alignments, colours,
 * forced-open state and rich content.
 */
const TooltipDemo = () =>
{
    const { modalRef , open } = useModal() ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Tooltip</h2>

            {/* Positions */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Positions</h3>
                <div className="flex flex-wrap items-center gap-6 p-6">
                    <Tooltip tip="Top"    position="top"><button className="btn">Top</button></Tooltip>
                    <Tooltip tip="Bottom" position="bottom"><button className="btn">Bottom</button></Tooltip>
                    <Tooltip tip="Left"   position="left"><button className="btn">Left</button></Tooltip>
                    <Tooltip tip="Right"  position="right"><button className="btn">Right</button></Tooltip>
                </div>
            </div>

            <Divider />

            {/* Alignments (new in 5.6) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Alignments (start / center / end)</h3>
                <p className="text-sm text-base-content/70">
                    Independent from the position. Shown forced-open on a wide trigger so the offset is visible.
                </p>

                <div className="flex flex-col gap-12 pt-16 pb-4">
                    <div className="flex flex-wrap gap-12">
                        <Tooltip tip="Aligned to start" position="top" align="start" color="primary" open>
                            <button className="btn w-64">top · start</button>
                        </Tooltip>
                        <Tooltip tip="Centered" position="top" align="center" color="primary" open>
                            <button className="btn w-64">top · center</button>
                        </Tooltip>
                        <Tooltip tip="Aligned to end" position="top" align="end" color="primary" open>
                            <button className="btn w-64">top · end</button>
                        </Tooltip>
                    </div>
                </div>

                <div className="flex flex-col gap-12 pb-16 pt-4">
                    <div className="flex flex-wrap gap-12">
                        <Tooltip tip="Aligned to start" position="bottom" align="start" color="secondary" open>
                            <button className="btn w-64">bottom · start</button>
                        </Tooltip>
                        <Tooltip tip="Centered" position="bottom" align="center" color="secondary" open>
                            <button className="btn w-64">bottom · center</button>
                        </Tooltip>
                        <Tooltip tip="Aligned to end" position="bottom" align="end" color="secondary" open>
                            <button className="btn w-64">bottom · end</button>
                        </Tooltip>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Alignment forwarded through a wrapper (Button) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Alignment through a wrapper — Button (hover to reveal)</h3>
                <p className="text-sm text-base-content/70">
                    The new <code>align</code> is forwarded by the wrappers via a <code>tooltipAlign</code> prop
                    (Button, LinkButton, LangDropDown, MenuLink, MenuNavigation, FlagItem, FlagMenu, InputTime).
                </p>
                <div className="flex flex-wrap gap-12 pt-4">
                    <Button className="w-64" color="primary" tooltip="Aligned to start" tooltipPosition="top" tooltipAlign="start">
                        top · start
                    </Button>
                    <Button className="w-64" color="primary" tooltip="Centered" tooltipPosition="top" tooltipAlign="center">
                        top · center
                    </Button>
                    <Button className="w-64" color="primary" tooltip="Aligned to end" tooltipPosition="top" tooltipAlign="end">
                        top · end
                    </Button>
                </div>
            </div>

            <Divider />

            {/* Colours */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Colours</h3>
                <div className="flex flex-wrap items-center gap-6 p-6">
                    { [ 'primary' , 'secondary' , 'accent' , 'info' , 'success' , 'warning' , 'error' ].map( ( color ) => (
                        <Tooltip key={ color } tip={ color } color={ color } position="top">
                            <button className="btn">{ color }</button>
                        </Tooltip>
                    ) ) }
                </div>
            </div>

            <Divider />

            {/* float — the one thing the CSS path cannot do */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">float — inside anything that scrolls</h3>
                <p className="text-sm text-base-content/70">
                    DaisyUI draws its tooltip in a pseudo-element of the trigger, so any ancestor
                    hiding its overflow cuts it off, and near an edge of the window it leaves the
                    screen rather than flipping. <code>float</code> moves the bubble into a portal
                    and places it against its trigger. The two boxes below are the same list in the
                    same overflow — hover a row in each.
                </p>

                <div className="grid gap-6 lg:grid-cols-2">
                    { [ false , true ].map( floating => (
                        <div key={ String( floating ) } className="flex flex-col gap-2">
                            <p className="font-mono text-xs uppercase text-base-content/50">
                                float = { String( floating ) }
                            </p>

                            <div className="h-40 overflow-auto rounded-box border border-base-300 bg-base-100 p-2">
                                { [ 'Auditorium' , 'Salle Bleue' , 'Atelier' , 'Réserve' , 'Studio' , 'Foyer' ].map( room => (
                                    <Tooltip
                                        key       = { room }
                                        as        = "button"
                                        className = "btn btn-ghost btn-sm w-full justify-start"
                                        color     = "primary"
                                        float     = { floating }
                                        position  = "top"
                                        tip       = { `${ room } — open 09:00 to 22:00` }
                                        type      = "button"
                                    >
                                        { room }
                                    </Tooltip>
                                ) ) }
                            </div>
                        </div>
                    ) ) }
                </div>

                <p className="text-sm text-base-content/70">
                    The floating one also opens on <strong>focus</strong> — tab into the list — and
                    never on touch, where a tap has somewhere better to go than under a bubble.
                </p>
            </div>

            <Divider />

            {/* float inside a <dialog> — the top layer beats every z-index */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">float — inside a modal</h3>
                <p className="text-sm text-base-content/70">
                    A modal <code>&lt;dialog&gt;</code> paints in the browser's <strong>top
                    layer</strong>, above everything a <code>z-index</code> can reach. A bubble
                    portaled to the body would therefore be drawn <em>under</em> the modal it
                    belongs to, so a floating tooltip whose trigger is inside an open dialog
                    portals into that dialog instead — the same reasoning <code>Popover</code>
                    already follows.
                </p>

                <div>
                    <Button color="primary" onClick={ open }>Open a modal</Button>
                </div>

                <Modal ref={ modalRef } title="Inside the top layer" agree="Close" showDisagree={ false }>
                    <div className="flex flex-wrap items-center gap-4 py-2">
                        <Tooltip float tip="Portaled into this dialog" position="top" color="primary">
                            <button className="btn" type="button">float</button>
                        </Tooltip>

                        <Tooltip tip="Drawn by the CSS path" position="top" color="primary">
                            <button className="btn" type="button">css</button>
                        </Tooltip>
                    </div>

                    <p className="text-sm text-base-content/70">
                        Both are readable here — the modal clips nothing. Put the same pair in a
                        scrolling panel inside the dialog and only the floating one survives.
                    </p>
                </Modal>
            </div>

            <Divider />

            {/* Rich content */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Rich content</h3>
                <div className="flex flex-wrap items-center gap-6 p-6">
                    <Tooltip position="top" color="neutral">
                        <button className="btn">Hover me</button>
                        <div className="tooltip-content">
                            <p className="text-sm">Rich <strong>HTML</strong> content</p>
                        </div>
                    </Tooltip>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default TooltipDemo ;
