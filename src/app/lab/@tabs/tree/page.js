'use client' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import PathTreeDemo     from '@/demo/trees/PathTreeDemo' ;
import SortableTreeDemo from '@/demo/trees/SortableTreeDemo' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n' ;

/**
 * Trees showcase page.
 *
 * Two trees that do different jobs : `SortableTree` reorders a hierarchy by
 * drag and drop, `PathTree` reads one that exists only in dotted paths.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.tree'] - Dot notation path to the page locale.
 */
const TreePage = ( { path = 'app.lab.tree' } = {} ) =>
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

            <Container maxWidth="max-w-7xl">
                <PathTreeDemo />
            </Container>

            <Container maxWidth="max-w-6xl">
                <SortableTreeDemo />
            </Container>

        </Page>
    ) ;
} ;

export default TreePage ;
