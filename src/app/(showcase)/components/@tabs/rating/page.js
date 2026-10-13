'use client' ;

import RatingDemo from '@/demo/rating/RatingDemo' ;
import Container  from '@/display/Container' ;
import I18nMetas  from '@/components/i18n/I18nMetas' ;
import Page       from '@/display/Page' ;
import useI18n    from '@/contexts/locale/useI18n' ;

/**
 * Rating showcase page.
 */
const Ratings = ( { path = 'app.lab.rating' } ) =>
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

            <RatingDemo />
        </Page>
    ) ;
} ;

export default Ratings ;
