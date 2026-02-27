'use client' ;

import FlagMenuDemo       from '@/demo/menus/FlagMenuDemo';
import MenuNavigationDemo from '@/demo/menus/MenuNavigationDemo';
import Container          from '@/display/Container' ;
import Page               from '@/display/Page' ;

/**
 * Toasts showcase page.
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
                    Menu Components
                </h1>
            </Container>

            {/* FlagMenu Demo */}
            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">FlagMenu</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FlagMenuDemo />
                </div>
            </Container>

            {/* MenuNavigation Demo */}
            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">MenuNavigation</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <MenuNavigationDemo />
                </div>
            </Container>

        </Page>
    ) ;
} ;

export default ToastsShowcase ;