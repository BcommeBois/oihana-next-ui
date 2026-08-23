'use client' ;

import { useState } from 'react' ;

import ChordChart     from '@/components/charts/ChordChart' ;
import PieChart       from '@/components/charts/PieChart' ;
import PolarBarChart  from '@/components/charts/PolarBarChart' ;
import RadarChart     from '@/components/charts/RadarChart' ;
import RadialBarChart from '@/components/charts/RadialBarChart' ;

import Divider from '@/components/Divider' ;

import PalettePicker from '@/demo/PalettePicker' ;
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

const BUDGET_KEYS = [ 'Loyer' , 'Courses' , 'Transport' , 'Épargne' , 'Divers' ] ;

// Twelve months around the circle : a cyclical index is exactly what a polar
// layout reads better than a straight line, December sitting next to January.
const BUDGET_DATA =
[
    { mois : 'Janv' , Loyer :  64 , Courses : 109 , Transport :  34 , Épargne : 141 , Divers :  16 } ,
    { mois : 'Févr' , Loyer :  20 , Courses : 123 , Transport :  94 , Épargne : 198 , Divers :  43 } ,
    { mois : 'Mars' , Loyer : 169 , Courses : 130 , Transport :   8 , Épargne : 198 , Divers :   5 } ,
    { mois : 'Avr'  , Loyer : 156 , Courses : 108 , Transport :  94 , Épargne :  25 , Divers : 166 } ,
    { mois : 'Mai'  , Loyer : 137 , Courses :  36 , Transport :  37 , Épargne :   7 , Divers : 189 } ,
    { mois : 'Juin' , Loyer :  10 , Courses :  52 , Transport : 105 , Épargne :  92 , Divers :  24 } ,
    { mois : 'Juil' , Loyer :  50 , Courses : 128 , Transport :  42 , Épargne : 194 , Divers :  16 } ,
    { mois : 'Août' , Loyer : 170 , Courses :  64 , Transport : 127 , Épargne : 117 , Divers : 168 } ,
    { mois : 'Sept' , Loyer : 120 , Courses :  84 , Transport : 158 , Épargne :  42 , Divers : 181 } ,
    { mois : 'Oct'  , Loyer : 188 , Courses : 152 , Transport :  93 , Épargne : 136 , Divers : 187 } ,
    { mois : 'Nov'  , Loyer :  44 , Courses : 199 , Transport :  75 , Épargne :  64 , Divers : 131 } ,
    { mois : 'Déc'  , Loyer :   9 , Courses : 116 , Transport :  56 , Épargne : 115 , Divers :  43 } ,
] ;

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
                    ariaLabel = "Répartition des lignes de code par langage"
                    className = "max-w-2xl mx-auto"
                    data      = { PIE_DATA }
                    palette   = { palette }
                    height    = { 600 }
                />
            </Section>

            <Divider />

            <Section
                title       = "Pie — camembert plein, sans labels liés"
                description = "innerRadius=0 et arcLinkLabels=false : la marge se libère et le cercle grandit."
            >
                <PieChart
                    ariaLabel     = "Répartition des lignes de code par langage, en camembert plein"
                    className     = "max-w-3xl mx-auto"
                    data          = { PIE_DATA }
                    palette       = { palette }
                    height        = { 480 }
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
                    ariaLabel = "Ventes par catégorie de produit et par canal de distribution"
                    className = "max-w-2xl mx-auto"
                    data      = { RADIAL_DATA }
                    palette   = { palette }
                    height    = { 560 }
                />
            </Section>

            <Divider />

            <Section
                title       = "Radar"
                description = "Compare des profils sur les mêmes dimensions. SVG uniquement chez nivo ; le survol montre toute la branche d'un coup."
            >
                <RadarChart
                    ariaLabel = "Profil gustatif de trois vins sur cinq dimensions"
                    className = "max-w-2xl mx-auto"
                    data      = { RADAR_DATA }
                    indexBy   = "taste"
                    keys      = { WINES }
                    palette   = { palette }
                    height    = { 560 }
                />
            </Section>

            <Divider />

            <Section
                title       = "Radar — grille anguleuse"
                description = "gridShape='linear' : la grille suit le polygone au lieu d'être circulaire."
            >
                <RadarChart
                    ariaLabel = "Profil gustatif de trois vins, grille anguleuse"
                    className = "max-w-3xl mx-auto"
                    data      = { RADAR_DATA }
                    indexBy   = "taste"
                    keys      = { WINES }
                    palette   = { palette }
                    height    = { 520 }
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
                    ariaLabel = "Flux d'échanges entre cinq personnes"
                    className = "max-w-2xl mx-auto"
                    data      = { CHORD_DATA }
                    keys      = { CHORD_KEYS }
                    palette   = { palette }
                    height    = { 620 }
                />
            </Section>

            <Divider />

            <Section
                title       = "PolarBar"
                description = "Mêmes données qu'un BarChart (keys + indexBy), mais enroulées autour d'un cercle. Un budget mensuel : douze mois cycliques, où décembre voisine janvier — ce qu'une ligne droite ne montre pas. À ne pas confondre avec RadialBar, qui dessine un anneau par série. arcLabels imprime la valeur dans l'arc, dans sa propre couleur assombrie et sur un halo clair ; arcLabelsSkipRadius laisse les bandes trop fines en dehors du dessin, où le chiffre serait illisible."
            >
                <PolarBarChart
                    ariaLabel   = "Budget mensuel réparti en cinq postes de dépense, sur douze mois"
                    arcLabels   = { true }
                    className   = "max-w-2xl mx-auto"
                    data        = { BUDGET_DATA }
                    indexBy     = "mois"
                    keys        = { BUDGET_KEYS }
                    nivoProps   = {{ arcLabelsSkipRadius : 14 }}
                    palette     = { palette }
                    height      = { 640 }
                    innerRadius = { 0.25 }
                    valueSteps  = { 5 }
                    valueFormat = ">-.0f"
                />
            </Section>

            <Divider />

            <Section
                title       = "PolarBar — demi-cercle"
                description = "startAngle / endAngle ouvrent l'arc. L'axe radial suit : son angle est ramené dans l'arc dessiné, sans quoi ses graduations flotteraient dans le vide."
            >
                <PolarBarChart
                    ariaLabel   = "Budget mensuel en demi-cercle, cinq postes de dépense"
                    className   = "max-w-4xl mx-auto"
                    data        = { BUDGET_DATA }
                    indexBy     = "mois"
                    keys        = { BUDGET_KEYS }
                    palette     = { palette }
                    height      = { 520 }
                    startAngle  = { -90 }
                    endAngle    = { 90 }
                    innerRadius = { 0.2 }
                    valueSteps  = { 4 }
                    radialAxis  = {{ ticksPosition : 'before' }}
                    legend      = "right"
                />
            </Section>

        </div>
    ) ;
} ;

export default CircularChartsDemo ;
