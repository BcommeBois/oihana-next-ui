'use client' ;

import { useMemo , useState } from 'react' ;

import Alert     from '@/components/Alert' ;
// biome-ignore lint/suspicious/noShadowRestrictedNames: the component is named `Map`, and this file never uses the built-in.
import Map        from '@/components/maps/Map' ;
import MapMarker  from '@/components/maps/MapMarker' ;
import MapMarkers from '@/components/maps/MapMarkers' ;

import Section from '@/demo/charts/Section' ;

import { BY_TYPE , CENTRE , SITES , makeCrowd } from './places' ;

import config from '@/@configs' ;

import fromSchema from '@/helpers/geo/fromSchema' ;

const MapMarkersDemo = () =>
{
    const mapStyle = config?.ui?.map?.style ;

    const [ clustered , setClustered ] = useState( true ) ;
    const [ palette   , setPalette   ] = useState( '' ) ;
    const [ selected  , setSelected  ] = useState( null ) ;

    const crowd = useMemo( () => makeCrowd( 240 ) , [] ) ;

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
                title       = "Les marqueurs suivent le type du lieu"
                description = "Couleur et icône viennent du sous-type que le back envoie déjà — Warehouse, CustomerSite, Office — et non d'un choix fait à la main dans la vue."
            >
                <Map
                    ariaLabel = "Six sites autour de Paris"
                    aspect    = "16/9"
                    mapStyle  = { mapStyle }
                    maxHeight = { 520 }
                    zoom      = { 10.5 }
                    { ...fromSchema( CENTRE ) }
                >
                    {
                        SITES.map( ( site ) => (
                            <MapMarker
                                { ...fromSchema( site ) }
                                key   = { site.name }
                                title = { site.name }
                                { ...BY_TYPE[ site[ '@type' ] ] }
                            />
                        ))
                    }
                </Map>
            </Section>

            <Section
                title       = "Les tailles de marqueur"
                description = "Les cinq tailles de la maison, sur une même latitude."
            >
                <Map
                    ariaLabel = "Tailles de marqueur"
                    height    = { 280 }
                    mapStyle  = { mapStyle }
                    zoom      = { 12 }
                    { ...fromSchema( CENTRE ) }
                >
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3300 } size="xs" color="neutral"   title="xs" />
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3450 } size="sm" color="info"      title="sm" />
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3600 } size="md" color="primary"   title="md" />
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3750 } size="lg" color="secondary" title="lg" />
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3900 } size="xl" color="success"   title="xl" />
                </Map>
            </Section>

            <Section
                title       = "Une collection, et son regroupement"
                description = "240 sites répartis autour de trois foyers. « MapMarkers » reçoit les charges utiles brutes et appelle l'adaptateur lui-même."
            >
                <div className="flex flex-wrap items-center gap-4">
                    <label className="label cursor-pointer gap-2">
                        <input
                            checked   = { clustered }
                            className = "toggle toggle-primary"
                            onChange  = { ( event ) => setClustered( event.target.checked ) }
                            type      = "checkbox"
                        />
                        <span className="label-text">Regrouper</span>
                    </label>

                    <label className="label cursor-pointer gap-2 whitespace-nowrap">
                        <span className="label-text">Palette des niveaux</span>
                        <select
                            className = "select select-sm select-bordered"
                            onChange  = { ( event ) => setPalette( event.target.value ) }
                            value     = { palette }
                        >
                            <option value="">Aucune — jeton uniforme</option>
                            <option value="brand">brand</option>
                            <option value="theme">theme</option>
                            <option value="nivo">nivo</option>
                        </select>
                    </label>

                    <p className="text-sm text-base-content/60">
                        {
                            selected
                                ? `Sélectionné : ${ selected }`
                                : `Cliquez une bulle pour l'ouvrir, un marqueur pour le sélectionner.`
                        }
                    </p>
                </div>

                <Map
                    ariaLabel = "240 sites autour de Paris"
                    aspect    = "16/9"
                    mapStyle  = { mapStyle }
                    maxHeight = { 560 }
                    zoom      = { 9.5 }
                    { ...fromSchema( CENTRE ) }
                >
                    <MapMarkers
                        cluster        = { clustered }
                        clusterLabel   = { ( count ) => `${ count } sites, zoomer` }
                        clusterPalette = { palette || undefined }
                        items          = { crowd }
                        markerProps    = { ( site ) => ({ ...BY_TYPE[ site[ '@type' ] ] , size : 'sm' , title : site.name }) }
                        onSelect       = { ( site ) => setSelected( site.name ) }
                    />
                </Map>

                <p className="text-sm text-base-content/60">
                    { `Éteint, les 240 marqueurs sont dessinés d'un coup — c'est la limite du rendu DOM, et elle se voit. Allumé, le regroupement suit le zoom.` }
                </p>
                <p className="text-sm text-base-content/60">
                    { `Sans palette, toutes les bulles portent le même jeton et seule la taille dit « plus ». Avec, la rampe est séquentielle : trois teintes pour trois paliers, donc une bulle plus grosse n'est jamais plus pâle. Le texte est calculé par contraste — une rampe rend des hex, pas des jetons, et un hex n'a pas de « -content » sur lequel s'appuyer.` }
                </p>
            </Section>

            <Section
                title       = "Ce que le regroupement ne fait pas"
                description = "Les mêmes six sites qu'en haut, passés par MapMarkers sans « cluster » : la collection sert aussi quand il n'y a rien à regrouper."
            >
                <Map
                    ariaLabel = "Six sites, sans regroupement"
                    height    = { 320 }
                    mapStyle  = { mapStyle }
                    zoom      = { 10.5 }
                    { ...fromSchema( CENTRE ) }
                >
                    <MapMarkers
                        items       = { SITES }
                        markerProps = { ( site ) => ({ ...BY_TYPE[ site[ '@type' ] ] , title : site.name }) }
                    />
                </Map>
            </Section>

        </div>
    ) ;
} ;

MapMarkersDemo.displayName = 'MapMarkersDemo' ;

export default MapMarkersDemo ;
