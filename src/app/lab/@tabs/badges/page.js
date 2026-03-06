'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx';
import useI18n   from '@/contexts/locale/useI18n.js';
import BadgeDemo from '@/demo/BadgeDemo';
import Container from '@/display/Container';
import Page      from '@/display/Page' ;

/**
 * Badges showcase page.
 *
 * Displays all badges components with variations.
 *
 * @param {Object} props
 */
const BadgeShowcase = ( { path = 'app.lab.badges' } ) =>
{
    const { description , title } = useI18n( path ) ;

    return (
        <Page full className='gap-8'>

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { title }
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    { description }
                </p>
            </Container>

            <BadgeDemo />

        </Page>
    ) ;
} ;

export default BadgeShowcase ;