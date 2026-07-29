'use client' ;

import { useState } from 'react' ;

import PieChart       from '@/components/charts/PieChart' ;
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

/**
 * Circular charts showcase — Pie, RadialBar, Radar.
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

        </div>
    ) ;
} ;

export default CircularChartsDemo ;
