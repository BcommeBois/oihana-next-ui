'use client' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Page      from '@/display/Page' ;

import ColorDemo from '@/demo/colors/ColorDemo' ;

/**
 * Color picker showcase page (lab/colors).
 */
const Colors = () =>
(
    <Page className="gap-8" maxWidth="max-w-7xl">

        <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Color Components
            </h1>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                A hex input that opens our own color picker (InputColor), the standalone
                ColorPicker panel, and the ColorIndicator swatch.
            </p>
        </Container>

        <Divider />

        <ColorDemo />

    </Page>
) ;

export default Colors ;
