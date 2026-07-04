'use client' ;

import Container  from '@/display/Container' ;
import Page       from '@/display/Page' ;
import KanbanDemo from '@/demo/kanban/KanbanDemo' ;

/**
 * Kanban showcase page.
 */
const KanbanPage = () =>
(
    <Page className="gap-8" full>
        {/* Header */}
        <Container className="text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Kanban Component
            </h1>
        </Container>

        <Container maxWidth="max-w-7xl">
            <KanbanDemo />
        </Container>
    </Page>
) ;

export default KanbanPage ;
