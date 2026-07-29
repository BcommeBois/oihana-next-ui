'use client' ;

import { useState } from 'react' ;

import ChordChart     from '@/components/charts/ChordChart' ;
import PieChart       from '@/components/charts/PieChart' ;
import PolarBarChart  from '@/components/charts/PolarBarChart' ;
import RadarChart     from '@/components/charts/RadarChart' ;
import RadialBarChart from '@/components/charts/RadialBarChart' ;

import Divider from '@/components/Divider' ;

import PalettePicker from './PalettePicker' ;
import Section       from './Section' ;

const PIE_DATA =
[
    { id : 'python' , label : 'python' , value : 339 } ,
    { id : 'css'    , label : 'css'    , value :  53 } ,
    { id : 'sass'   , label : 'sass'   , value : 525 } ,
    { id : 'php'    , label : 'php'    , value :  61 } ,
    { id : 'erlang' , label : 'erlang' , value : 223 } ,
] ;

const RADIAL_DATA = [ 'Supermarket' , 'Combini' , 'Online' ].map( ( id , row ) =>
({
    id ,
    data : [ 'vegetables' , 'fruits' , 'meat' ].map( ( x , index ) =>
    ({
        x ,
        // Deterministic pseudo-random, so the demo does not jitter on every render.
        y : Math.round( 30 + ( Math.sin( row * 2.1 + index * 1.3 ) + 1 ) * 35 ) ,
    }) ) ,
}) ) ;

const WINES = [ 'chardonay' , 'carmenere' , 'syrah' ] ;

const RADAR_DATA = [ 'fruity' , 'bitter' , 'heavy' , 'strong' , 'sunny' ].map( ( taste , row ) =>
{
    const entry = { taste } ;

    WINES.forEach( ( wine , index ) =>
    {
        // Deterministic pseudo-random, so the demo does not jitter on every render.
        entry[ wine ] = Math.round( 30 + ( Math.sin( row * 1.7 + index * 2.4 ) + 1 ) * 35 ) ;
    } ) ;

    return entry ;
} ) ;

const CHORD_KEYS = [ 'John' , 'Raoul' , 'Jane' , 'Marcel' , 'Ibrahim' ] ;

// Square and symmetric — data[i][j] is the flow from keys[i] to keys[j].
const CHORD_DATA = CHORD_KEYS.map( ( _ , row ) =>
    CHORD_KEYS.map( ( __ , column ) =>
        row === column ? 0 : Math.round( 10 + ( Math.sin( ( row + 1 ) * ( column + 1 ) * 1.7 ) + 1 ) * 60 ) ,
    ) ,
) ;

const DIRECTIONS = [ 'N' , 'NE' , 'E' , 'SE' , 'S' , 'SO' , 'O' , 'NO' ] ;
const SEASONS    = [ 'hiver' , 'été' ] ;

const POLAR_DATA = DIRECTIONS.map( ( direction , row ) =>
{
    const entry = { direction } ;

    SEASONS.forEach( ( season , index ) =>
    {
        // Deterministic pseudo-random, so the demo does not jitter on every render.
        entry[ season ] = Math.round( 8 + ( Math.sin( row * 1.4 + index * 2.9 ) + 1 ) * 22 ) ;
    } ) ;

    return entry ;
} ) ;

/**
 * Circular charts showcase — Pie, RadialBar, Radar, Chord, PolarBar.
 */
const CircularChartsDemo = () =>
{
    const [ palette , setPalette ] = useState( 'nivo' ) ;

    return (
        <div className="flex flex-col gap-8">

            <PalettePicker value={ palette } onChange={ setPalette } />

            <Divider />

            <Section
                title       = "Pie"
                description = "Donut par défaut (innerRadius 0.5), avec les labels liés à l'extérieur."
            >
                <PieChart
                    data    = { PIE_DATA }
                    palette = { palette }
                    height  = { 480 }
                />
            </Section>

            <Divider />

            <Section
                title       = "Pie — camembert plein, sans labels liés"
                description = "innerRadius=0 et arcLinkLabels=false : la marge se libère et le cercle grandit."
            >
                <PieChart
                    data          = { PIE_DATA }
                    palette       = { palette }
                    height        = { 380 }
                    innerRadius   = { 0 }
                    arcLinkLabels = { false }
                    legend        = "right"
                />
            </Section>

            <Divider />

            <Section
                title       = "RadialBar"
                description = "Un anneau par série, coloré par catégorie. SVG uniquement chez nivo."
            >
                <RadialBarChart
                    data    = { RADIAL_DATA }
                    palette = { palette }
                    height  = { 440 }
                />
            </Section>

            <Divider />

            <Section
                title       = "Radar"
                description = "Compare des profils sur les mêmes dimensions. SVG uniquement chez nivo ; le survol montre toute la branche d'un coup."
            >
                <RadarChart
                    data    = { RADAR_DATA }
                    indexBy = "taste"
                    keys    = { WINES }
                    palette = { palette }
                    height  = { 460 }
                />
            </Section>

            <Divider />

            <Section
                title       = "Radar — grille anguleuse"
                description = "gridShape='linear' : la grille suit le polygone au lieu d'être circulaire."
            >
                <RadarChart
                    data      = { RADAR_DATA }
                    indexBy   = "taste"
                    keys      = { WINES }
                    palette   = { palette }
                    height    = { 420 }
                    gridShape = "linear"
                    legend    = "right"
                />
            </Section>

            <Divider />

            <Section
                title       = "Chord"
                description = "Des flux entre entités, pas des valeurs par entité. data est une matrice carrée : data[i][j] est le flux de keys[i] vers keys[j]. Survolez un arc pour un total, un ruban pour un flux dans les deux sens."
            >
                <ChordChart
                    data    = { CHORD_DATA }
                    keys    = { CHORD_KEYS }
                    palette = { palette }
                    height  = { 520 }
                />
            </Section>

            <Divider />

            <Section
                title       = "PolarBar"
                description = "Mêmes données qu'un BarChart (keys + indexBy), mais enroulées autour d'un cercle — la rose des vents. À ne pas confondre avec RadialBar, qui dessine un anneau par série."
            >
                <PolarBarChart
                    data    = { POLAR_DATA }
                    indexBy = "direction"
                    keys    = { SEASONS }
                    palette = { palette }
                    height  = { 480 }
                />
            </Section>

        </div>
    ) ;
} ;

export default CircularChartsDemo ;
