'use client' ;

import { useState } from 'react' ;

import Alert  from '@/components/Alert' ;
import Button from '@/components/Button' ;
// biome-ignore lint/suspicious/noShadowRestrictedNames: the component is named `Map`, and this file never uses the built-in.
import Map      from '@/components/maps/Map' ;
import MapRoute from '@/components/maps/MapRoute' ;

import Section from '@/demo/charts/Section' ;

import { CENTRE , NORTH_PATH , ROUTES } from './places' ;

import config from '@/@configs' ;

import fromSchema from '@/helpers/geo/fromSchema' ;

const [ NORTH , SOUTH ] = ROUTES ;

const MapRouteDemo = () =>
{
    const mapStyle = config?.ui?.map?.style ;

    const [ selected , setSelected ] = useState( null ) ;
    const [ withPath , setWithPath ] = useState( false ) ;

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
                title       = "Une tournée, dans son ordre"
                description = "Les arrêts arrivent en désordre et portent leur rang. Le composant trie, numérote, et cadre la carte sur l'ensemble — une tournée déborde presque toujours de la vue initiale."
            >
                <div className="flex flex-wrap items-center gap-3">
                    <label className="label cursor-pointer gap-2 whitespace-nowrap">
                        <input
                            checked   = { withPath }
                            className = "toggle toggle-primary"
                            onChange  = { ( event ) => setWithPath( event.target.checked ) }
                            type      = "checkbox"
                        />
                        <span className="label-text">Avec le tracé routier</span>
                    </label>

                    <p className="text-sm text-base-content/60">
                        { selected ? `Arrêt choisi : ${ selected }` : `Cliquez un arrêt.` }
                    </p>
                </div>

                <Map
                    ariaLabel = { NORTH.name }
                    aspect    = "16/9"
                    mapStyle  = { mapStyle }
                    maxHeight = { 520 }
                    zoom      = { 11 }
                    { ...fromSchema( CENTRE ) }
                >
                    <MapRoute
                        color    = { NORTH.color }
                        geometry = { withPath ? NORTH_PATH : undefined }
                        onSelect = { ( item , _ , rank ) => setSelected( `${ rank } — ${ item.name }` ) }
                        stops    = { NORTH.stops }
                    />
                </Map>

                <p className="text-sm text-base-content/60">
                    { `Éteint, les arrêts sont reliés par des segments droits en pointillés : c'est un ordre de passage, pas une route. Allumé, le tracé fourni est dessiné plein — parce que celui-là est une route. Le composant n'a rien calculé dans les deux cas.` }
                </p>
            </Section>

            <Section
                title       = "Deux tournées, deux couleurs venues de la donnée"
                description = "« DeliveryRouteTerm » compose HasColor : la couleur est déjà dans la charge utile, en hexadécimal. Elle traverse jusqu'à la ligne et jusqu'au fond des pastilles, dont le texte est calculé par contraste."
            >
                <Map
                    ariaLabel = "Deux tournées"
                    aspect    = "16/9"
                    mapStyle  = { mapStyle }
                    maxHeight = { 560 }
                    zoom      = { 10 }
                    { ...fromSchema( CENTRE ) }
                >
                    <MapRoute color={ NORTH.color } fit stops={ NORTH.stops } />
                    <MapRoute color={ SOUTH.color } fit={ false } stops={ SOUTH.stops } />
                </Map>

                <div className="flex flex-wrap gap-4">
                    {
                        ROUTES.map( ( route ) => (
                            <span className="flex items-center gap-2 text-sm" key={ route.name }>
                                <span
                                    className = "size-3 rounded-full"
                                    style     = {{ background : route.color }}
                                />
                                { `${ route.name } · ${ route.stops.length } arrêts` }
                            </span>
                        ) )
                    }
                </div>

                <p className="text-sm text-base-content/60">
                    { `Une seule des deux cadre la carte : deux « fit » sur la même carte se disputeraient la vue, et la dernière montée gagnerait.` }
                </p>
            </Section>

            <Section
                title       = "Sans les numéros"
                description = "« showOrder={ false } » rend les icônes ordinaires. Utile quand l'ordre n'est pas l'information — une zone desservie plutôt qu'un circuit."
            >
                <Map
                    ariaLabel = "Tournée sans numéros"
                    height    = { 360 }
                    mapStyle  = { mapStyle }
                    zoom      = { 11 }
                    { ...fromSchema( CENTRE ) }
                >
                    <MapRoute color="secondary" showOrder={ false } stops={ SOUTH.stops } />
                </Map>

                <Button onClick={ () => setSelected( null ) } size="sm" style="outline">
                    Réinitialiser la sélection
                </Button>
            </Section>

        </div>
    ) ;
} ;

MapRouteDemo.displayName = 'MapRouteDemo' ;

export default MapRouteDemo ;
