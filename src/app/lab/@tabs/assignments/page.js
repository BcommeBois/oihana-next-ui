'use client' ;

import AssignmentDemo from '@/demo/assignments/AssignmentDemo' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n' ;

/**
 * Assignments showcase page.
 *
 * What an entity is attached to : `AssignmentList` shows it, and
 * `AssignmentEditorModal` changes it by telling the server the difference.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.assignments'] - Dot notation path to the page locale.
 */
const AssignmentsPage = ( { path = 'app.lab.assignments' } = {} ) =>
{
    const { description , title } = useI18n( path ) ;

    return (
        <Page className="gap-8" full>

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { title }
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    { description }
                </p>
            </Container>

            <AssignmentDemo />

        </Page>
    ) ;
} ;

export default AssignmentsPage ;
