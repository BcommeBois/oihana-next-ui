'use client' ;

import { useState } from 'react' ;

import CalendarChart  from '@/components/charts/CalendarChart' ;
import HeatMapChart   from '@/components/charts/HeatMapChart' ;
import TimeRangeChart from '@/components/charts/TimeRangeChart' ;
import WaffleChart    from '@/components/charts/WaffleChart' ;

import Divider from '@/components/Divider' ;

import PalettePicker from '@/demo/PalettePicker' ;
import Section       from './Section' ;

/**
 * Builds one datum per day over a span, with a deterministic value so the
 * demo does not reshuffle on every render.
 *
 * @param {string} from - First day, `YYYY-MM-DD`.
 * @param {number} days - How many days to generate.
 * @param {number} [density=0.75] - Share of days that carry a value.
 * @returns {Array<{day:string,value:number}>} The days.
 */
const makeDays = ( from , days , density = 0.75 ) =>
{
    const start = new Date( `${ from }T00:00:00` ) ;
    const out   = [] ;

    for ( let index = 0 ; index < days ; index++ )
    {
        const date = new Date( start ) ;
        date.setDate( start.getDate() + index ) ;

        // Deterministic gaps and values — no Math.random in a demo.
        if ( ( Math.sin( index * 2.7 ) + 1 ) / 2 > density )
        {
            continue ;
        }

        out.push
        ({
            day   : date.toISOString().slice( 0 , 10 ) ,
            value : Math.round( 20 + ( Math.sin( index / 3.1 ) + 1 ) * 140 ) ,
        }) ;
    }

    return out ;
} ;

const CALENDAR_DATA = makeDays( '2026-01-01' , 365 ) ;

const TIME_RANGE_DATA = makeDays( '2026-04-01' , 120 , 0.85 ) ;

const WAFFLE_DATA =
[
    { id : 'men'      , label : 'men'      , value : 32 } ,
    { id : 'women'    , label : 'women'    , value : 28 } ,
    { id : 'children' , label : 'children' , value : 11 } ,
] ;

const TARGET_DATA =
[
    { id : 'reached' , label : 'objectif atteint' , value : 42 } ,
] ;

const COUNTRIES = [ 'Japan' , 'France' , 'Norway' , 'Germany' , 'Brazil' , 'Canada' ] ;
const TRANSPORTS = [ 'Train' , 'Subway' , 'Bus' , 'Car' , 'Bike' , 'Boat' , 'Plane' ] ;

const HEATMAP_DATA = COUNTRIES.map( ( id , row ) =>
({
    id ,
    data : TRANSPORTS.map( ( x , index ) =>
    ({
        x ,
        // Deterministic pseudo-random, so the demo does not jitter on every render.
        y : Math.round( ( Math.sin( row * 1.9 + index * 2.6 ) + 1 ) * 48 ) ,
    }) ) ,
}) ) ;

/**
 * Grid charts showcase — Waffle, Calendar, TimeRange, HeatMap.
 */
const GridChartsDemo = () =>
{
    const [ palette , setPalette ] = useState( 'nivo' ) ;

    return (
        <div className="flex flex-col gap-8">

            <PalettePicker value={ palette } onChange={ setPalette } />

            <Divider />

            <Section
                title       = "Waffle"
                description = "Trois séries sur un total de 100 : les cellules restantes montrent ce qui n'est pas couvert."
            >
                <WaffleChart
                    ariaLabel = "Répartition d'une population de cent personnes en trois groupes"
                    data      = { WAFFLE_DATA }
                    total     = { 100 }
                    palette   = { palette }
                    aspect    = "1/1"
                    maxHeight = { 460 }
                />
            </Section>

            <Divider />

            <Section
                title       = "Waffle — une seule part d'un objectif"
                description = "total=100 avec une seule série à 42 : c'est là que le waffle bat le camembert, il montre ce qui manque."
            >
                <WaffleChart
                    ariaLabel     = "Progression vers un objectif, atteint à quarante-deux pour cent"
                    data          = { TARGET_DATA }
                    total         = { 100 }
                    palette       = { palette }
                    aspect        = "1/1"
                    maxHeight     = { 340 }
                    rows          = { 10 }
                    columns       = { 10 }
                    padding       = { 2 }
                    legend        = { false }
                    fillDirection = "bottom"
                />
            </Section>

            <Divider />

            <Section
                title       = "Calendar"
                description = "Une année de jours. La palette est séquentielle et non catégorielle : les cellules codent une quantité, les couleurs doivent donc être ordonnées. legend n'est pas allumée par défaut sur ce graphe ni sur TimeRange — elle l'est ici pour montrer l'échelle."
            >
                <CalendarChart
                    ariaLabel = "Activité quotidienne sur l'année 2026"
                    data      = { CALENDAR_DATA }
                    from      = "2026-01-01"
                    to        = "2026-12-31"
                    legend    = "bottom"
                    palette   = { palette }
                    height    = { 240 }
                />
            </Section>

            <Divider />

            <Section
                title       = "TimeRange"
                description = "Même grille, mais sur une période arbitraire plutôt qu'une année entière — ici quatre mois. SVG uniquement chez nivo."
            >
                <TimeRangeChart
                    ariaLabel = "Activité quotidienne d'avril à juillet 2026"
                    data      = { TIME_RANGE_DATA }
                    from      = "2026-04-01"
                    to        = "2026-07-29"
                    palette   = { palette }
                    height    = { 240 }
                />
            </Section>

            <Divider />

            <Section
                title       = "HeatMap"
                description = "Une matrice ligne × colonne. La légende est une échelle et non une liste de pastilles : une grandeur n'a pas d'entrées à nommer. Les bandes sont franches parce que le graphe range ses valeurs en seaux — un dégradé lisse dirait le contraire."
            >
                <HeatMapChart
                    ariaLabel = "Fréquentation par mode de transport et par pays"
                    data      = { HEATMAP_DATA }
                    palette   = { palette }
                    height    = { 460 }
                    xAxis     = {{ legend : 'transport' }}
                    yAxis     = {{ legend : 'pays' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "HeatMap — sans valeurs"
                description = "labels=false quand la grille devient dense : la couleur suffit et les chiffres deviennent du bruit."
            >
                <HeatMapChart
                    ariaLabel = "Fréquentation par mode de transport et par pays, sans valeurs affichées"
                    data      = { HEATMAP_DATA }
                    palette   = { palette }
                    height    = { 420 }
                    labels    = { false }
                />
            </Section>

        </div>
    ) ;
} ;

export default GridChartsDemo ;
