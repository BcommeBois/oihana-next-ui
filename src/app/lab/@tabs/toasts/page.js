'use client' ;

import AlertDemo from '@/demo/AlertDemo';
import ToastDemo from '@/demo/ToastDemo';
import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

/**
 * Toast showcase page.
 *
 * Displays all toasts components with variations.
 *
 * @param {Object} props
 */
const ToastsShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Toast and Alert
                </h1>
            </Container>

            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Toast Notifications</h2>
                <ToastDemo />
            </Container>

            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Alerts</h2>
                <AlertDemo />
            </Container>

        </Page>
    ) ;
} ;

export default ToastsShowcase ;