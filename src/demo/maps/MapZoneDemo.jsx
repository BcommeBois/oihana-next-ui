'use client' ;

import { useState } from 'react' ;

import Alert from '@/components/Alert' ;
// biome-ignore lint/suspicious/noShadowRestrictedNames: the component is named `Map`, and this file never uses the built-in.
import Map       from '@/components/maps/Map' ;
import MapMarker from '@/components/maps/MapMarker' ;
import MapZone   from '@/components/maps/MapZone' ;

import CodeBlock from '@/components/typography/CodeBlock' ;
import Section   from '@/demo/charts/Section' ;

import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism' ;

import { CENTRE , ZONES } from './places' ;

import config from '@/@configs' ;

import parseGeoShape , { toGeoShape } from '@/helpers/geo/parseGeoShape' ;
import fromSchema from '@/helpers/geo/fromSchema' ;

const ROUND_TRIP = ZONES[ 0 ].geo ;

const MapZoneDemo = () =>
{
    const mapStyle = config?.ui?.map?.style ;

    const [ filled , setFilled ] = useState( true ) ;

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
                title       = "Trois zones, trois formes"
                description = "Un polygone tracé à la main, un rectangle, et un rayon autour d'un entrepôt. Les trois arrivent en « GeoShape », le format que ton back stocke déjà."
            >
                <div className="flex flex-wrap items-center gap-4">
                    <label className="label cursor-pointer gap-2 whitespace-nowrap">
                        <input
                            checked   = { filled }
                            className = "toggle toggle-primary"
                            onChange  = { ( event ) => setFilled( event.target.checked ) }
                            type      = "checkbox"
                        />
                        <span className="label-text">Remplir</span>
                    </label>

                    {
                        ZONES.map( ( zone ) => (
                            <span className="flex items-center gap-2 text-sm" key={ zone.name }>
                                <span className="size-3 rounded-full bg-warning" style={ zone.color.startsWith( '#' ) ? { background : zone.color } : undefined } />
                                { zone.name }
                            </span>
                        ) )
                    }
                </div>

                <Map
                    ariaLabel = "Trois zones de livraison"
                    aspect    = "16/9"
                    mapStyle  = { mapStyle }
                    maxHeight = { 560 }
                    zoom      = { 10 }
                    { ...fromSchema( CENTRE ) }
                >
                    { ZONES.map( ( zone ) => <MapZone color={ zone.color } fill={ filled } key={ zone.name } shape={ zone } /> ) }
                    <MapMarker { ...fromSchema( { latitude : 48.7489 , longitude : 2.3606 } ) } color="warning" size="sm" title="Rungis" />
                </Map>

                <p className="text-sm text-base-content/60">
                    { `Le cercle est le seul qui coûte quelque chose : « GeoShape.circle » est un centre et un rayon, et un point n'a pas d'intérieur. Il est approché par un polygone en coordonnées réelles — donc il grandit avec le zoom et survit à une rotation, là où un disque en pixels ne le ferait pas.` }
                </p>
            </Section>

            <Section
                title       = "L'aller et le retour"
                description = "« toGeoShape » écrit ce que « parseGeoShape » a lu. Sans lui, une zone pourrait être affichée mais jamais enregistrée — et l'inversion des axes se ferait dans un seul sens."
            >
                <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold uppercase text-base-content/50">Ce que le back envoie</p>
                        <CodeBlock className="text-xs!" language="json" style={ oneDark }>
                            { JSON.stringify( ROUND_TRIP , null , 2 ) }
                        </CodeBlock>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold uppercase text-base-content/50">Après un aller-retour</p>
                        <CodeBlock className="text-xs!" language="json" style={ oneDark }>
                            { JSON.stringify( toGeoShape( parseGeoShape( ROUND_TRIP ) ) , null , 2 ) }
                        </CodeBlock>
                    </div>
                </div>

                <p className="text-sm text-base-content/60">
                    { `La seule différence attendue est le premier point répété à la fin : GeoJSON exige un anneau fermé, schema.org le recommande seulement. Les décimales, elles, doivent être identiques — le bruit flottant est rogné à douze chiffres significatifs.` }
                </p>
            </Section>

        </div>
    ) ;
} ;

MapZoneDemo.displayName = 'MapZoneDemo' ;

export default MapZoneDemo ;
