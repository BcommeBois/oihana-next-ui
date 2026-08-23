'use client' ;

import { useState } from 'react' ;

import BarChart       from '@/components/charts/BarChart' ;
import LineChart      from '@/components/charts/LineChart' ;
import MarimekkoChart from '@/components/charts/MarimekkoChart' ;

import Button     from '@/components/Button' ;
import Divider    from '@/components/Divider' ;
import EmptyState from '@/components/EmptyState' ;
import Select     from '@/components/selects/Select' ;

import { MdBarChart as NoChartIcon , MdRefresh as RefreshIcon } from 'react-icons/md' ;

import PalettePicker from '@/demo/PalettePicker' ;
import Section       from './Section' ;

// Where the legend can go. `'none'` is the picker's word for `legend={ false }`,
// which is a boolean and cannot be the value of an <option>.
const LEGEND_CHOICES =
[
    { value : 'bottom' , label : 'bottom — le défaut' } ,
    { value : 'top'    , label : 'top' } ,
    { value : 'right'  , label : 'right — en colonne à côté' } ,
    { value : 'left'   , label : 'left — en colonne à côté' } ,
    { value : 'none'   , label : 'aucune' } ,
] ;

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
    const [ loading , setLoading ] = useState( false ) ;

    const [ legendPosition , setLegendPosition ] = useState( 'bottom' ) ;

    return (
        <div className="flex flex-col gap-8">

            <PalettePicker value={ palette } onChange={ setPalette } />

            <Divider />

            <Section
                title       = "Line"
                description = "5 séries, axe catégoriel. La légende est en HTML sous le graphe, marquée d'un trait plutôt que d'une pastille : une courbe se légende par un trait. Le sélecteur essaie les quatre placements — la bibliothèque les offre tous et n'en choisit aucun à la place de l'application, y compris de façon responsive."
            >
                <Select
                    className = "max-w-xs"
                    label     = "Placement de la légende"
                    size      = "sm"
                    value     = { legendPosition }
                    onChange  = { ( event ) => setLegendPosition( event.target.value ) }
                >
                    { LEGEND_CHOICES.map( choice => (
                        <option key={ choice.value } value={ choice.value }>{ choice.label }</option>
                    ) ) }
                </Select>

                <LineChart
                    ariaLabel = "Nombre de trajets par mode de transport, pour cinq pays"
                    data      = { LINE_DATA }
                    palette   = { palette }
                    height    = { 420 }
                    legend    = { legendPosition === 'none' ? false : legendPosition }
                    xAxis     = {{ legend : 'transportation' }}
                    yAxis     = {{ legend : 'count' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Line — axe temporel"
                description = "xScale='time' : les ticks sont formatés dans la locale active (dayjs)."
            >
                <LineChart
                    ariaLabel = "Sessions quotidiennes sur les sept premiers mois de 2026"
                    data      = { TIME_DATA }
                    palette   = { palette }
                    height    = { 320 }
                    curve     = "monotoneX"
                    enableArea
                    legend    = { false }
                    xScale    = "time"
                    xAxis     = {{ legend : 'date' , tickRotation : -35 }}
                    yAxis     = {{ legend : 'sessions' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Bar"
                description = "Une seule série, sans légende — les marges se réduisent d'elles-mêmes."
            >
                <BarChart
                    ariaLabel = "Population par pays, en millions"
                    data      = { BAR_DATA }
                    indexBy   = "country"
                    palette   = { palette }
                    height    = { 340 }
                    legend    = { false }
                    xAxis     = {{ legend : 'Country' }}
                    yAxis     = {{ legend : 'Population' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "StackBar"
                description = "6 séries empilées — la limite de lisibilité de la palette 'brand'. legend={{ values : true }} imprime le total de chaque série à côté de son nom : sur un empilement c'est bien une somme, et elle est éteinte par défaut parce qu'elle ne veut pas dire la même chose d'un graphe à l'autre."
            >
                <BarChart
                    ariaLabel = "Répartition des ventes par type de plat et par pays"
                    data      = { STACK_DATA }
                    indexBy   = "country"
                    keys      = { FOODS }
                    palette   = { palette }
                    stacked
                    height    = { 460 }
                    legend    = {{ values : true }}
                    xAxis     = {{ legend : 'country' }}
                    yAxis     = {{ legend : 'food' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Bar horizontal"
                description = "layout='horizontal' — xAxis reste l'axe du bas, yAxis celui de gauche."
            >
                <BarChart
                    ariaLabel = "Population par pays, en barres horizontales"
                    data      = { BAR_DATA }
                    indexBy   = "country"
                    layout    = "horizontal"
                    palette   = { palette }
                    height    = { 320 }
                    legend    = { false }
                    xAxis     = {{ legend : 'Population' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "Marimekko"
                description = "L'épaisseur de chaque barre porte elle aussi une valeur — ici le nombre de répondants. Un empilement classique montrerait quatre barres identiques et masquerait que « Les open spaces » pèse cinq fois « Le flex office »."
            >
                <MarimekkoChart
                    ariaLabel  = "Réponses à quatre affirmations, l'épaisseur donnant le nombre de répondants"
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
                    ariaLabel  = "Réponses à quatre affirmations en pourcentages, l'épaisseur donnant le nombre de répondants"
                    data       = { SURVEY_DATA }
                    id         = "statement"
                    value      = "participants"
                    dimensions = { SURVEY_DIMENSIONS }
                    offset     = "expand"
                    palette    = { palette }
                    height     = { 420 }
                    xAxis      = {{ legend : 'répondants' }}
                />
            </Section>

            <Divider />

            <Section
                title       = "États — vide et chargement"
                description = "Gérés une fois dans ChartFrame, donc identiques sur les 14 composants. La boîte garde sa taille dans les trois états : la page ne saute pas quand les données arrivent."
            >
                <div className="flex flex-col gap-4">
                    <Button size="sm" onClick={ () => setLoading( ( value ) => !value ) }>
                        { loading ? 'Arrêter le chargement' : 'Simuler un chargement' }
                    </Button>

                    <div className="grid gap-4 md:grid-cols-2">
                        <BarChart
                            ariaLabel = "Population par pays — exemple d'état de chargement"
                            data      = { BAR_DATA }
                            indexBy   = "country"
                            palette   = { palette }
                            height    = { 260 }
                            legend    = { false }
                            loading   = { loading }
                        />

                        <BarChart
                            ariaLabel  = "Exemple d'état vide, sans aucune donnée"
                            data       = { [] }
                            indexBy    = "country"
                            palette    = { palette }
                            height     = { 260 }
                            legend     = { false }
                            loading    = { loading }
                            emptyLabel = "Aucune donnée sur la période"
                        />

                        <BarChart
                            ariaLabel  = "Exemple d'état vide enrichi, sans aucune donnée"
                            data       = { [] }
                            indexBy    = "country"
                            palette    = { palette }
                            height     = { 260 }
                            legend     = { false }
                            loading    = { loading }
                            emptyState = {
                                <EmptyState
                                    className   = "size-full"
                                    size        = "sm"
                                    icon        = { <NoChartIcon /> }
                                    title       = "Aucune donnée sur la période"
                                    description = "Élargis l'intervalle ou change de filtre."
                                    actions     = {
                                        <Button size="sm" style="outline">
                                            <RefreshIcon size={ 16 } />
                                            Réinitialiser
                                        </Button>
                                    }
                                />
                            }
                        />
                    </div>
                </div>
            </Section>

        </div>
    ) ;
} ;

export default CartesianChartsDemo ;
