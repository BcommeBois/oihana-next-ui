'use client' ;

import { useState } from 'react' ;

import BarChart       from '@/components/charts/BarChart' ;
import LineChart      from '@/components/charts/LineChart' ;
import MarimekkoChart from '@/components/charts/MarimekkoChart' ;

import Divider from '@/components/Divider' ;

import PalettePicker from './PalettePicker' ;
import Section       from './Section' ;

const TRANSPORT = [ 'plane' , 'helicopter' , 'boat' , 'train' , 'subway' , 'bus' , 'car' , 'moto' , 'bicycle' ] ;

const makeSeries = ( id , seed ) =>
({
    id ,
    data : TRANSPORT.map( ( x , index ) =>
    ({
        x ,
        // Deterministic pseudo-random, so the demo does not jitter on every render.
        y : Math.round( 120 + ( Math.sin( seed * 3.7 + index * 1.9 ) + 1 ) * 380 ) ,
    }) ) ,
}) ;

const LINE_DATA =
[
    makeSeries( 'norway'  , 1 ) ,
    makeSeries( 'germany' , 2 ) ,
    makeSeries( 'us'      , 3 ) ,
    makeSeries( 'france'  , 4 ) ,
    makeSeries( 'japan'   , 5 ) ,
] ;

const TIME_DATA =
[
    {
        id   : 'sessions' ,
        data : Array.from( { length : 24 } , ( _ , index ) =>
        ({
            x : `2026-0${ 1 + Math.floor( index / 12 ) }-${ String( ( index % 12 ) * 2 + 1 ).padStart( 2 , '0' ) }` ,
            y : Math.round( 200 + Math.sin( index / 2 ) * 120 ) ,
        }) ) ,
    } ,
] ;

const BAR_DATA =
[
    { country : 'USA'     , population : 480 } ,
    { country : 'China'   , population : 355 } ,
    { country : 'Japan'   , population : 230 } ,
    { country : 'Germany' , population : 145 } ,
] ;

const FOODS = [ 'hot dog' , 'burger' , 'sandwich' , 'kebab' , 'fries' , 'donut' ] ;

const STACK_DATA = [ 'FR' , 'EN' , 'IT' , 'ES' , 'DE' , 'ND' , 'BE' ].map( ( country , row ) =>
{
    const entry = { country } ;

    FOODS.forEach( ( food , index ) =>
    {
        entry[ food ] = Math.round( 30 + ( Math.sin( row * 2.3 + index * 1.7 ) + 1 ) * 90 ) ;
    } ) ;

    return entry ;
} ) ;

// Cohorts of very different sizes on purpose : that difference is what the
// bar thickness carries, and what a plain stacked bar would hide.
const SURVEY_DATA =
[
    { statement : 'Le télétravail'   , participants : 480 , pour : 312 , contre :  98 , neutre :  70 } ,
    { statement : 'La semaine de 4j' , participants : 260 , pour : 201 , contre :  34 , neutre :  25 } ,
    { statement : 'Le flex office'   , participants : 120 , pour :  38 , contre :  61 , neutre :  21 } ,
    { statement : 'Les open spaces'  , participants : 640 , pour : 190 , contre : 372 , neutre :  78 } ,
] ;

const SURVEY_DIMENSIONS =
[
    { id : 'pour'   , value : 'pour'   } ,
    { id : 'neutre' , value : 'neutre' } ,
    { id : 'contre' , value : 'contre' } ,
] ;

/**
 * Cartesian charts showcase — Line, Bar, StackBar, Marimekko.
 */
const CartesianChartsDemo = () =>
{
    const [ palette , setPalette ] = useState( 'nivo' ) ;

    return (
        <div className="flex flex-col gap-8">

            <PalettePicker value={ palette } onChange={ setPalette } />

            <Divider />

            <Section
                title       = "Line"
                description = "5 séries, axe catégoriel, légende à droite."
            >
                <LineChart
                    data    = { LINE_DATA }
                    palette = { palette }
                    height  = { 420 }
                    legend  = "right"
                    xAxis   = {{ legend : 'transportation' }}
                    yAxis   = {{ legend : 'count' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Line — axe temporel"
                description = "xScale='time' : les ticks sont formatés dans la locale active (dayjs)."
            >
                <LineChart
                    data       = { TIME_DATA }
                    palette    = { palette }
                    height     = { 320 }
                    curve      = "monotoneX"
                    enableArea
                    legend     = { false }
                    xScale     = "time"
                    xAxis      = {{ legend : 'date' , tickRotation : -35 }}
                    yAxis      = {{ legend : 'sessions' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Bar"
                description = "Une seule série, sans légende — les marges se réduisent d'elles-mêmes."
            >
                <BarChart
                    data    = { BAR_DATA }
                    indexBy = "country"
                    palette = { palette }
                    height  = { 340 }
                    legend  = { false }
                    xAxis   = {{ legend : 'Country' }}
                    yAxis   = {{ legend : 'Population' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "StackBar"
                description = "6 séries empilées — la limite de lisibilité de la palette 'brand'."
            >
                <BarChart
                    data    = { STACK_DATA }
                    indexBy = "country"
                    keys    = { FOODS }
                    palette = { palette }
                    stacked
                    height  = { 460 }
                    legend  = "right"
                    xAxis   = {{ legend : 'country' }}
                    yAxis   = {{ legend : 'food' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Bar horizontal"
                description = "layout='horizontal' — xAxis reste l'axe du bas, yAxis celui de gauche."
            >
                <BarChart
                    data    = { BAR_DATA }
                    indexBy = "country"
                    layout  = "horizontal"
                    palette = { palette }
                    height  = { 320 }
                    legend  = { false }
                    xAxis   = {{ legend : 'Population' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Marimekko"
                description = "L'épaisseur de chaque barre porte elle aussi une valeur — ici le nombre de répondants. Un empilement classique montrerait quatre barres identiques et masquerait que « Les open spaces » pèse cinq fois « Le flex office »."
            >
                <MarimekkoChart
                    data       = { SURVEY_DATA }
                    id         = "statement"
                    value      = "participants"
                    dimensions = { SURVEY_DIMENSIONS }
                    palette    = { palette }
                    height     = { 460 }
                    xAxis      = {{ legend : 'répondants' }}
                    yAxis      = {{ legend : 'réponses' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Marimekko — offset='expand'"
                description = "Toutes les barres ramenées à la même longueur : les empilements deviennent des pourcentages, l'épaisseur garde le poids absolu."
            >
                <MarimekkoChart
                    data       = { SURVEY_DATA }
                    id         = "statement"
                    value      = "participants"
                    dimensions = { SURVEY_DIMENSIONS }
                    offset     = "expand"
                    palette    = { palette }
                    height     = { 420 }
                    legend     = "right"
                    xAxis      = {{ legend : 'répondants' }}
                />
            </Section>

        </div>
    ) ;
} ;

export default CartesianChartsDemo ;
