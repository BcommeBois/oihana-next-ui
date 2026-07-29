'use client' ;

import { useState } from 'react' ;

import PieChart       from '@/components/charts/PieChart' ;
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

/**
 * Circular charts showcase — Pie, RadialBar.
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

        </div>
    ) ;
} ;

export default CircularChartsDemo ;
