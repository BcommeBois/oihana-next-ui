'use client' ;

import Alert     from '@/components/Alert' ;
// biome-ignore lint/suspicious/noShadowRestrictedNames: the component is named `Map`, and this file never uses the built-in.
import Map       from '@/components/maps/Map' ;
import MapMarker from '@/components/maps/MapMarker' ;

import { OSM_ATTRIBUTION } from '@/components/maps/MapFrame' ;

import Section from '@/demo/charts/Section' ;

import config from '@/@configs' ;

import fromSchema from '@/helpers/geo/fromSchema' ;

import { MdLocalShipping , MdStore , MdWarehouse } from 'react-icons/md' ;

const PARIS =
{
    '@type' : 'Place' ,
    name    : 'Notre-Dame de Paris' ,
    geo     : { latitude : 48.852968 , longitude : 2.349902 } ,
} ;

/**
 * A handful of sites around Paris, typed the way the back office types them —
 * the subtype is what gives each marker its colour, with nothing chosen by hand.
 */
const SITES =
[
    { '@type' : 'Warehouse'    , name : 'Entrepôt de Rungis' , latitude : 48.7489 , longitude : 2.3606 } ,
    { '@type' : 'Warehouse'    , name : 'Entrepôt de Gennevilliers' , latitude : 48.9330 , longitude : 2.2940 } ,
    { '@type' : 'CustomerSite' , name : 'Client — Bastille' , latitude : 48.8532 , longitude : 2.3692 } ,
    { '@type' : 'CustomerSite' , name : 'Client — Montmartre' , latitude : 48.8867 , longitude : 2.3431 } ,
    { '@type' : 'CustomerSite' , name : 'Client — Bercy' , latitude : 48.8331 , longitude : 2.3866 } ,
    { '@type' : 'Office'       , name : 'Bureau — Opéra' , latitude : 48.8709 , longitude : 2.3317 } ,
] ;

/**
 * How a site type reads on a map. Written out rather than derived : a colour
 * built from a string never appears in the source, and Tailwind only ships
 * classes it can see.
 */
const BY_TYPE =
{
    CustomerSite : { color : 'primary' , Icon : MdStore } ,
    Office       : { color : 'accent'  , Icon : MdLocalShipping } ,
    Warehouse    : { color : 'error'   , Icon : MdWarehouse } ,
} ;

const ILE_DE_FRANCE = { north : 48.95 , south : 48.75 , east : 2.45 , west : 2.20 } ;

const MapDemo = () =>
{
    const mapStyle = config?.ui?.map?.style ;
    const paris    = fromSchema( PARIS ) ;

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
                title       = "Une carte, un lieu"
                description = "Le point sort de l'adaptateur et se répand tel quel : « <Map { ...fromSchema( place ) } /> »."
            >
                <Map
                    { ...paris }
                    ariaLabel = "Notre-Dame de Paris"
                    mapStyle  = { mapStyle }
                    zoom      = { 14 }
                >
                    <MapMarker { ...paris } title={ PARIS.name } />
                </Map>
            </Section>

            <Section
                title       = "Les contrôles"
                description = "« true » donne le zoom et la boussole, « false » n'en donne aucun, et un objet ajoute l'échelle ou le plein écran."
            >
                <div className="grid gap-4 lg:grid-cols-3">
                    <Map
                        { ...paris }
                        ariaLabel = "Carte sans contrôle"
                        controls  = { false }
                        height    = { 240 }
                        mapStyle  = { mapStyle }
                    />
                    <Map
                        { ...paris }
                        ariaLabel = "Carte avec les contrôles par défaut"
                        height    = { 240 }
                        mapStyle  = { mapStyle }
                    />
                    <Map
                        { ...paris }
                        ariaLabel = "Carte avec échelle et plein écran"
                        controls  = {{ fullscreen : true , scale : true }}
                        height    = { 240 }
                        mapStyle  = { mapStyle }
                    />
                </div>
                <p className="text-sm text-base-content/60">
                    { `De gauche à droite : controls={ false } · controls par défaut · controls={{ fullscreen : true , scale : true }}` }
                </p>
            </Section>

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
                    { ...fromSchema({ latitude : 48.8566 , longitude : 2.3522 }) }
                >
                    {
                        SITES.map( ( site ) =>
                        {
                            const { color , Icon } = BY_TYPE[ site[ '@type' ] ] ?? {} ;

                            return (
                                <MapMarker
                                    { ...fromSchema( site ) }
                                    color   = { color }
                                    Icon    = { Icon }
                                    key     = { site.name }
                                    onClick = { () => {} }
                                    title   = { site.name }
                                />
                            ) ;
                        })
                    }
                </Map>
            </Section>

            <Section
                title       = "Les tailles de marqueur"
                description = "Les cinq tailles de la maison, sur un même point."
            >
                <Map
                    ariaLabel = "Tailles de marqueur"
                    height    = { 280 }
                    mapStyle  = { mapStyle }
                    zoom      = { 12 }
                    { ...fromSchema({ latitude : 48.8566 , longitude : 2.3522 }) }
                >
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3300 } size="xs" color="neutral"   title="xs" />
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3450 } size="sm" color="info"      title="sm" />
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3600 } size="md" color="primary"   title="md" />
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3750 } size="lg" color="secondary" title="lg" />
                    <MapMarker latitude={ 48.8700 } longitude={ 2.3900 } size="xl" color="success"   title="xl" />
                </Map>
            </Section>

            <Section
                title       = "Le cadre"
                description = "Mêmes états que ChartFrame : squelette au chargement, état vide quand il n'y a rien à montrer. Ni l'un ni l'autre ne monte de carte."
            >
                <div className="grid gap-4 lg:grid-cols-3">
                    <Map
                        { ...paris }
                        ariaLabel = "Carte en chargement"
                        height    = { 240 }
                        loading
                        mapStyle  = { mapStyle }
                    />
                    <Map
                        ariaLabel = "Carte sans position"
                        height    = { 240 }
                        mapStyle  = { mapStyle }
                    />
                    <Map
                        { ...paris }
                        ariaLabel   = "Carte non interactive"
                        height      = { 240 }
                        interactive = { false }
                        mapStyle    = { mapStyle }
                    />
                </div>
                <p className="text-sm text-base-content/60">
                    { `De gauche à droite : loading · sans latitude ni longitude · interactive={ false } (essayez de la déplacer).` }
                </p>
            </Section>

            <Section
                title       = "La mention de source"
                description = "Le crédit vient du moteur, qui le lit dans le style et dans le TileJSON. « compact » le replie sur un bouton, un nœud le remplace, « false » l'enlève — et l'ODbL demande alors qu'il soit ailleurs sur la page."
            >
                <div className="grid gap-4 lg:grid-cols-3">
                    <Map
                        { ...paris }
                        ariaLabel   = "Mention repliée"
                        attribution = "compact"
                        height      = { 240 }
                        mapStyle    = { mapStyle }
                    />
                    <Map
                        { ...paris }
                        ariaLabel   = "Mention maison"
                        attribution = { OSM_ATTRIBUTION }
                        height      = { 240 }
                        mapStyle    = { mapStyle }
                    />
                    <Map
                        { ...paris }
                        ariaLabel   = "Sans mention"
                        attribution = { false }
                        height      = { 240 }
                        mapStyle    = { mapStyle }
                    />
                </div>
                <p className="text-sm text-base-content/60">
                    { `De gauche à droite : attribution="compact" · attribution={ OSM_ATTRIBUTION } · attribution={ false }` }
                </p>
            </Section>

            <Section
                title       = "Un cadrage plutôt qu'un centre"
                description = "« bounds » nomme ses quatre bords — north, south, east, west — pour qu'aucune vue ne dépende d'un ordre non écrit."
            >
                <Map
                    ariaLabel = "Cadrage sur Paris et sa proche couronne"
                    bounds    = { ILE_DE_FRANCE }
                    height    = { 320 }
                    mapStyle  = { mapStyle }
                />
            </Section>

        </div>
    ) ;
} ;

MapDemo.displayName = 'MapDemo' ;

export default MapDemo ;
