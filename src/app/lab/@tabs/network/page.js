'use client' ;

import NetworkStateDemo from '@/demo/net/NetworkStateDemo';
import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import NetworkState, { XS , LG, MD, SM, XL } from '@/components/net/NetworkState';

/**
 * NetworkState showcase page.
 *
 * @param {Object} props
 */
const NetworkStateShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full>

            <Container className="flex flex-col gap-4">

                <Container className="text-center" maxWidth="max-w-4xl">
                    <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                        NetworkState Component
                    </h1>
                </Container>

                <NetworkStateDemo />

            </Container>

        </Page>
    ) ;
} ;

export default NetworkStateShowcase ;