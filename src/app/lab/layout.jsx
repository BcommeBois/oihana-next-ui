import PreviousPathProvider from '@/contexts/previousPath/provider' ;

/**
 * The lab shell.
 *
 * `PreviousPathProvider` sits here, above the pages, because it has to survive
 * the navigations it remembers — mounted inside a page it would be unmounted by
 * the very move it is there to observe. It is what `BackLink smart` reads.
 */
const Layout = ( { tabs } ) =>
(
    <PreviousPathProvider>
        { tabs }
    </PreviousPathProvider>
) ;

export default Layout ;
