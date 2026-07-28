'use client' ;

import SidePanelDemo from '@/demo/panels/SidePanelDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * SidePanel showcase page.
 *
 * Displays the off-canvas side panel with its placements, widths, pinned footer
 * and modeless mode.
 *
 * @param {Object} props
 */
const PanelShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    SidePanel Component
                </h1>
            </Container>

            <SidePanelDemo />

        </Page>
    ) ;
} ;

export default PanelShowcase ;
