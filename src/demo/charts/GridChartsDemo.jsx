'use client' ;

import { useState } from 'react' ;

import WaffleChart from '@/components/charts/WaffleChart' ;

import Divider from '@/components/Divider' ;

import PalettePicker from './PalettePicker' ;
import Section       from './Section' ;

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

/**
 * Grid charts showcase — Waffle. Calendar joins in lot C4.
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
                    data    = { WAFFLE_DATA }
                    total   = { 100 }
                    palette = { palette }
                    height  = { 460 }
                    legend  = "right"
                />
            </Section>

            <Divider />

            <Section
                title       = "Waffle — une seule part d'un objectif"
                description = "total=100 avec une seule série à 42 : c'est là que le waffle bat le camembert, il montre ce qui manque."
            >
                <WaffleChart
                    data          = { TARGET_DATA }
                    total         = { 100 }
                    palette       = { palette }
                    height        = { 340 }
                    rows          = { 10 }
                    columns       = { 10 }
                    padding       = { 2 }
                    legend        = { false }
                    fillDirection = "bottom"
                />
            </Section>

        </div>
    ) ;
} ;

export default GridChartsDemo ;
