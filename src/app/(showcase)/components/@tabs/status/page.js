'use client' ;

import Container  from '@/display/Container' ;
import Page       from '@/display/Page' ;
import StatusDemo from '@/demo/StatusDemo';

/**
 * Toast Status page.
 *
 * Displays all status components with variations.
 *
 * @param {Object} props
 */
const StatusShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>


            <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                        Status Components
                    </h1>
                </div>
                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    Status is a really small icon (with an optional label) to visually show the current status of an element, like online, offline, error, etc.
                </p>
            </Container>

            <StatusDemo />

        </Page>
    ) ;
} ;

export default StatusShowcase ;