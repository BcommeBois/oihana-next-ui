'use client' ;

import CollapsePersistenceDemo from '@/demo/menus/CollapsePersistenceDemo';
import DropdownDemo            from '@/demo/menus/DropdownDemo';
import FlagMenuDemo            from '@/demo/menus/FlagMenuDemo';
import MenuNavigationDemo      from '@/demo/menus/MenuNavigationDemo';
import MenuTitleDemo           from '@/demo/menus/MenuTitleDemo';
import PagedMenuDemo           from '@/demo/menus/PagedMenuDemo';
import Container               from '@/display/Container' ;
import Page                    from '@/display/Page' ;

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

            {/* Menu title (sections) Demo */}
            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Menu sections (menu-title)</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <MenuTitleDemo />
                </div>
            </Container>

            {/* Generic Dropdown Demo */}
            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Dropdown (menu-in-a-dropdown)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DropdownDemo />
                </div>
            </Container>

            {/* Paged menu (drill-down) Demo */}
            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Paged menu (menu-paged)</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <PagedMenuDemo />
                </div>
            </Container>

            {/* Collapse persistence Demo */}
            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Collapse persistence</h2>
                <p className="opacity-70">
                    NavigationProvider — defaultMode and storageKey props.
                </p>
                <CollapsePersistenceDemo />
            </Container>

        </Page>
    ) ;
} ;

export default ToastsShowcase ;