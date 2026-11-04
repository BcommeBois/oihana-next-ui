import PreviousPathProvider from '@/contexts/previousPath/provider' ;

import LabOutbox from '@/demo/offline/LabOutbox' ;

/**
 * The showcase shell, shared by the Components, Modules and Scenarios sections.
 *
 * `PreviousPathProvider` sits here, above the pages, because it has to survive
 * the navigations it remembers — mounted inside a page it would be unmounted by
 * the very move it is there to observe. It is what `BackLink smart` reads. A
 * route group, so a move from one section to another keeps it. It keeps a
 * trail of the last twenty pages, which `useOriginUrl` reads.
 *
 * The lab's outbox sits here for the same reason : an action queued on a page
 * keeps waiting, and its banner keeps showing, on the next one.
 */
const Layout = ( { children } ) =>
(
    <PreviousPathProvider trailLimit={ 20 }>
        <LabOutbox>
            { children }
        </LabOutbox>
    </PreviousPathProvider>
) ;

export default Layout ;
