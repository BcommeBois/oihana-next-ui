'use client' ;

import { useState } from 'react' ;

import BarChart  from '@/components/charts/BarChart' ;
import LineChart from '@/components/charts/LineChart' ;

import Divider from '@/components/Divider' ;
import Select  from '@/components/selects/Select' ;

import Container from '@/display/Container' ;

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

const Section = ( { children , description , title } ) => (
    <div className="flex flex-col gap-2">
        <div>
            <h3 className="text-lg font-semibold">{ title }</h3>
            { description && <p className="text-sm text-base-content/60">{ description }</p> }
        </div>
        { children }
    </div>
) ;

/**
 * Charts showcase — lot C1 (Line, Bar, StackBar).
 *
 * The palette selector is here on purpose : `brand` is the default but was
 * agreed as provisional, and comparing it against `theme` and `nivo` on real
 * data — in both light and dark — is the only way to settle it.
 */
const ChartsDemo = () =>
{
    const [ palette , setPalette ] = useState( 'brand' ) ;

    return (
        <div className="flex flex-col gap-8">

            <Container className="flex flex-wrap items-end gap-4" maxWidth="max-w-full">
                <Select
                    label    = "Palette"
                    size     = "sm"
                    value    = { palette }
                    onChange = { ( event ) => setPalette( event.target.value ) }
                >
                    <option value="brand">brand — dérivée du thème</option>
                    <option value="theme">theme — sémantiques DaisyUI</option>
                    <option value="nivo">nivo — le rendu du proto</option>
                </Select>

                <p className="text-sm text-base-content/60">
                    Basculez aussi le thème clair/sombre : les textes, axes et grilles suivent DaisyUI.
                </p>
            </Container>

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

        </div>
    ) ;
} ;

export default ChartsDemo ;
