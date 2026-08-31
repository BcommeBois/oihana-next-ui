'use client' ;

import Alert     from '@/components/Alert' ;
// biome-ignore lint/suspicious/noShadowRestrictedNames: the component is named `Map`, and this file never uses the built-in.
import Map       from '@/components/maps/Map' ;
import MapMarker from '@/components/maps/MapMarker' ;

import { OSM_ATTRIBUTION } from '@/components/maps/MapFrame' ;

import Section from '@/demo/charts/Section' ;

import { ILE_DE_FRANCE , PARIS } from './places' ;

import config from '@/@configs' ;

import fromSchema from '@/helpers/geo/fromSchema' ;

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
