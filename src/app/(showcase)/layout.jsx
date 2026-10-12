import PreviousPathProvider from '@/contexts/previousPath/provider' ;

/**
 * The showcase shell, shared by the Components and Modules sections.
 *
 * `PreviousPathProvider` sits here, above the pages, because it has to survive
 * the navigations it remembers — mounted inside a page it would be unmounted by
 * the very move it is there to observe. It is what `BackLink smart` reads. A
 * route group, so a move from a component to a module keeps it.
 */
const Layout = ( { children } ) =>
(
    <PreviousPathProvider>
        { children }
    </PreviousPathProvider>
) ;

export default Layout ;
