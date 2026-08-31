'use client' ;

import Alert     from '@/components/Alert' ;
import Button    from '@/components/Button' ;
// biome-ignore lint/suspicious/noShadowRestrictedNames: the component is named `Map`, and this file never uses the built-in.
import Map       from '@/components/maps/Map' ;
import MapControl from '@/components/maps/MapControl' ;
import MapMarker  from '@/components/maps/MapMarker' ;

import { MdCenterFocusStrong , MdLayers } from 'react-icons/md' ;

import Section from '@/demo/charts/Section' ;

import { CENTRE } from './places' ;

import config from '@/@configs' ;

import formatCoordinates from '@/helpers/geo/formatCoordinates' ;
import fromSchema        from '@/helpers/geo/fromSchema' ;

import useGeolocation from '@/hooks/useGeolocation' ;

/**
 * What a refusal should say. A map that does nothing when the button is
 * pressed is the worst of the three outcomes, so each one gets a sentence.
 */
const MESSAGES =
{
    refused     : `Vous avez refusé l'accès à votre position. Réautorisez-le dans les réglages du site de votre navigateur, puis rechargez.` ,
    timeout     : `Aucune position n'est revenue dans le temps imparti. Réessayez, ou activez la haute précision.` ,
    unavailable : `Votre appareil n'a pas de position à donner — pas de signal, ou aucun fournisseur disponible.` ,
    unsupported : `Ce navigateur n'a pas d'API de géolocalisation.` ,
} ;

const MapGeolocateDemo = () =>
{
    const mapStyle = config?.ui?.map?.style ;

    const { error , permissionState , position , request , stop , watching } = useGeolocation({ watch : true }) ;

    if ( !mapStyle )
    {
        return (
            <Alert level="warning">
                { `NEXT_PUBLIC_MAP_STYLE n'est pas défini. Ajoutez-le à votre .env.local — la valeur par défaut est dans .env.example — puis redémarrez le serveur de développement.` }
            </Alert>
        ) ;
    }

    return (
        <div className="flex flex-col gap-8">

            <Section
                title       = "Le bouton, et ce qu'il dessine"
                description = "« controls={{ geolocate : true }} » pose notre bouton, pas celui du moteur : un Button de la maison, aux jetons daisyUI, dans un MapControl. Le disque translucide est la marge d'erreur que le navigateur annonce, en mètres réels — il grandit et rétrécit avec le zoom."
            >
                <Map
                    ariaLabel = "Carte avec le bouton de géolocalisation"
                    controls  = {{ geolocate : true }}
                    height    = { 360 }
                    mapStyle  = { mapStyle }
                    zoom      = { 11 }
                    { ...fromSchema( CENTRE ) }
                />
            </Section>

            <Section
                title       = "Le suivi, et le coin"
                description = "« track » transforme le bouton en bascule : il suit tant qu'il est allumé. « position » choisit le coin — ici en bas à gauche, pour ne pas croiser les contrôles du moteur ni la mention de source."
            >
                <Map
                    ariaLabel = "Carte avec suivi de position"
                    controls  = {{ geolocate : { position : 'bottom-left' , track : true } }}
                    height    = { 360 }
                    mapStyle  = { mapStyle }
                    zoom      = { 11 }
                    { ...fromSchema( CENTRE ) }
                />
            </Section>

            <Section
                title       = "Un contrôle à nous, sans rapport avec la position"
                description = "« MapControl » est la primitive : une boîte dans un coin, au-dessus du canvas, dans laquelle on met ce qu'on veut. Ce qu'on y met doit être opaque — sur des tuiles, un bouton fantôme ne laisse qu'une icône flottante."
            >
                <Map
                    ariaLabel = "Carte avec un contrôle maison"
                    height    = { 320 }
                    mapStyle  = { mapStyle }
                    zoom      = { 11 }
                    { ...fromSchema( CENTRE ) }
                >
                    <MapControl position="top-left">
                        <Button color="primary" icon={ MdLayers } shape="square" size="sm" title="Calques" />
                        <Button icon={ MdCenterFocusStrong } shape="square" size="sm" title="Recadrer" />
                    </MapControl>
                </Map>
            </Section>

            <Section
                title       = "Le hook, sans carte"
                description = "« useGeolocation » vit hors de components/maps : un formulaire d'adresse veut « me localiser » sans rien afficher. Rien ne se déclenche au montage — l'autorisation n'est demandée qu'au clic."
            >
                <div className="flex flex-col gap-4 rounded-box bg-base-100 p-4">

                    <div className="flex flex-wrap items-center gap-3">
                        <Button color="primary" onClick={ request }>
                            { watching ? 'Relancer le suivi' : 'Me localiser' }
                        </Button>

                        { watching && <Button onClick={ stop } style="outline">Arrêter</Button> }

                        <span className="font-mono text-xs text-base-content/60">
                            { `permission : ${ permissionState }${ watching ? ' · suivi actif' : '' }` }
                        </span>
                    </div>

                    {
                        position && (
                            <div className="flex flex-col gap-1">
                                <p className="font-mono text-lg tabular-nums">
                                    { formatCoordinates( position ) }
                                </p>
                                <p className="text-xs text-base-content/50">
                                    { `précision ${ Math.round( position.accuracy ) } m` }
                                    { position.altitude !== null && ` · altitude ${ Math.round( position.altitude ) } m` }
                                </p>
                            </div>
                        )
                    }

                    {
                        error && (
                            <Alert level="warning" showCloseButton={ false }>
                                { MESSAGES[ error.kind ] ?? error.message }
                            </Alert>
                        )
                    }
                </div>
            </Section>

            {
                position && (
                    <Section
                        title       = "La position se répand comme n'importe quel point"
                        description = "Le hook rend « latitude » et « longitude » à plat, les mêmes noms que l'adaptateur — donc une position entre dans une carte sans rien convertir."
                    >
                        <Map
                            { ...position }
                            ariaLabel = "Votre position"
                            height    = { 320 }
                            mapStyle  = { mapStyle }
                            zoom      = { 15 }
                        >
                            <MapMarker { ...position } color="success" title="Vous êtes ici" />
                        </Map>
                    </Section>
                )
            }

        </div>
    ) ;
} ;

MapGeolocateDemo.displayName = 'MapGeolocateDemo' ;

export default MapGeolocateDemo ;
