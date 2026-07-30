'use client' ;

import TabsDemo from '@/demo/tabs/TabsDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Tabs showcase page.
 *
 * Styles, sizes and placement, keyboard navigation, deferred mounting, and tabs
 * composed inside a `SidePanel`.
 *
 * @param {Object} props
 */
const TabsShowcase = () =>
{
    return (
        <Page className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Tabs Component
                </h1>
            </Container>

            <TabsDemo />

        </Page>
    ) ;
} ;

export default TabsShowcase ;
