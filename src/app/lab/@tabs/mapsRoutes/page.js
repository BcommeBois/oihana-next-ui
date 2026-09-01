'use client' ;

import I18nMetas    from '@/components/i18n/I18nMetas.jsx';
import useI18n      from '@/contexts/locale/useI18n.js';
import Container    from '@/display/Container';
import MapRouteDemo from '@/demo/maps/MapRouteDemo';
import Page         from '@/display/Page' ;

/**
 * Delivery routes showcase page.
 *
 * @param {Object} props
 */
const MapsRoutesShowcase = ( { path = 'app.lab.mapsRoutes' } ) =>
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

            <Container className="flex flex-col gap-4">
                <MapRouteDemo />
            </Container>

        </Page>
    ) ;
} ;

export default MapsRoutesShowcase ;
