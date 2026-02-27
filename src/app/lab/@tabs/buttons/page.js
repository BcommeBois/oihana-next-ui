'use client' ;

import Page       from '@/display/Page' ;
import ButtonDemo from '@/demo/buttons/ButtonDemo' ;
import Container  from '@/display/Container' ;
import LinkDemo   from '@/demo/links/LinkDemo' ;

export default function ButtonsPage()
{
    return (
        <Page className="gap-8" full>
            {/* Header */}
            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Buttons and Links Components
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    Navigation links, stateful swaps and action buttons.
                </p>
            </Container>

            {/* Links Showcase */}
            <Container maxWidth="max-w-6xl">
                <LinkDemo />
            </Container>

            {/* Buttons Showcase */}
            <Container maxWidth="max-w-6xl">
                <ButtonDemo />
            </Container>
        </Page>
    ) ;
}