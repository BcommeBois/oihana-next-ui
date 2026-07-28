'use client' ;

import SidePanelDemo  from '@/demo/panels/SidePanelDemo' ;
import SplitPanelDemo from '@/demo/panels/SplitPanelDemo' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Page      from '@/display/Page' ;

/**
 * Panels showcase page.
 *
 * `SidePanel` — off-canvas overlay (placements, widths, pinned footer, stacking).
 * `SplitPanel` — inline side region sharing the width with its content.
 *
 * @param {Object} props
 */
const PanelShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Panel Components
                </h1>
            </Container>

            <Divider>SidePanel — overlay</Divider>

            <SidePanelDemo />

            <Divider>SplitPanel — colonne</Divider>

            <SplitPanelDemo />

        </Page>
    ) ;
} ;

export default PanelShowcase ;
