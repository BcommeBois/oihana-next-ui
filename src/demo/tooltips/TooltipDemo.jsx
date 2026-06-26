'use client' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Tooltip   from '@/components/Tooltip' ;

/**
 * Tooltip showcase — positions, the new start/center/end alignments, colours,
 * forced-open state and rich content.
 */
const TooltipDemo = () =>
{
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
