'use client' ;

import I18nMetas     from '@/components/i18n/I18nMetas.jsx';
import useI18n       from '@/contexts/locale/useI18n.js';
import Container     from '@/display/Container';
import Divider       from '@/components/Divider' ;
import GeoSchemaDemo from '@/demo/maps/GeoSchemaDemo';
import MapDemo       from '@/demo/maps/MapDemo';
import Page          from '@/display/Page' ;

/**
 * Maps showcase page.
 *
 * @param {Object} props
 */
const MapsShowcase = ( { path = 'app.lab.maps' } ) =>
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
                <h2 className="text-2xl font-bold">Cartes</h2>
                <MapDemo />
            </Container>

            <Divider />

            <Container className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">L'adaptateur schema.org</h2>
                <p className="text-base-content/60">
                    Aucune carte ici : ce que les helpers <code>geo</code> tirent d'une charge utile, en clair.
                </p>
                <GeoSchemaDemo />
            </Container>

        </Page>
    ) ;
} ;

export default MapsShowcase ;
