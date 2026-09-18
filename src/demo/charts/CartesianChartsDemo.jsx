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

import useLang from '@/contexts/lang/useLang' ;

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

// Amounts with decimals and seven digits : the case the tooltip used to show raw
// (`1234567.89`) whenever no format was given.
const MONTHS = [ 'jan' , 'feb' , 'mar' , 'apr' , 'may' , 'jun' , 'jul' , 'aug' , 'sep' , 'oct' , 'nov' , 'dec' ] ;

const REVENUE_DATA = [ 2025 , 2026 ].map( ( year , seed ) =>
({
    id   : String( year ) ,
    data : MONTHS.map( ( x , index ) =>
    ({
        x ,
        y : Math.round( ( 900_000 + ( Math.sin( seed * 2.1 + index * 0.8 ) + 1 ) * 350_000 ) * 100 ) / 100 + 0.89 ,
    }) ) ,
}) ) ;

const QUARTER_DATA =
[
    { quarter : 'Q1' , revenue : 3_412_587.42 } ,
    { quarter : 'Q2' , revenue : 3_987_104.19 } ,
    { quarter : 'Q3' , revenue : 2_756_930.07 } ,
    { quarter : 'Q4' , revenue : 4_120_655.73 } ,
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

    const { lang } = useLang() ;

    const formatEuro = ( value ) => new Intl.NumberFormat( lang , { style : 'currency' , currency : 'EUR' } ).format( value ) ;

    // The axis stays compact (`1,05 M`) : seven raw digits do not fit the left margin,
    // and the exact figure is the tooltip's job. Two fraction digits, because the
    // ticks step by 50 k — with one, 1 050 000 and 1 100 000 both read `1,1 M`.
    const formatCompact = ( value ) => new Intl.NumberFormat( lang , { notation : 'compact' , maximumFractionDigits : 2 } ).format( value ) ;

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
                title       = "Infobulle formatée — Line et Bar"
                description = "Sans format, l'infobulle écrit la valeur comme un nombre de la langue active (1 234 567,89 en français) au lieu du 1234567.89 brut de nivo. yFormat / valueFormat acceptent une chaîne d3-format ou une fonction : ici un montant en euros, pendant que l'axe garde une écriture compacte."
            >
                <div className="grid gap-6 lg:grid-cols-2">
                    <LineChart
                        ariaLabel = "Chiffre d'affaires mensuel, sans yFormat"
                        curve     = "monotoneX"
                        data      = { REVENUE_DATA }
                        height    = { 300 }
                        palette   = { palette }
                        xAxis     = {{ legend : 'sans yFormat' }}
                        yAxis     = {{ format : formatCompact }}
                    />
                    <LineChart
                        ariaLabel = "Chiffre d'affaires mensuel, avec yFormat en fonction"
                        curve     = "monotoneX"
                        data      = { REVENUE_DATA }
                        height    = { 300 }
                        palette   = { palette }
                        xAxis     = {{ legend : 'yFormat = { value => euros }' }}
                        yAxis     = {{ format : formatCompact }}
                        yFormat   = { formatEuro }
                    />
                    <BarChart
                        ariaLabel = "Chiffre d'affaires par trimestre, sans valueFormat"
                        data      = { QUARTER_DATA }
                        height    = { 300 }
                        indexBy   = "quarter"
                        keys      = { [ 'revenue' ] }
                        legend    = { false }
                        palette   = { palette }
                        xAxis     = {{ legend : 'sans valueFormat' }}
                        yAxis     = {{ format : formatCompact }}
                    />
                    <BarChart
                        ariaLabel   = "Chiffre d'affaires par trimestre, avec valueFormat en fonction"
                        data        = { QUARTER_DATA }
                        height      = { 300 }
                        indexBy     = "quarter"
                        keys        = { [ 'revenue' ] }
                        legend      = { false }
                        palette     = { palette }
                        valueFormat = { formatEuro }
                        xAxis       = {{ legend : 'valueFormat = { value => euros }' }}
                        yAxis       = {{ format : formatCompact }}
                    />
                </div>
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

            <Divider />

            <Section
                title       = "Infobulles — placement"
                description = "La bulle se place elle-même : au-dessus du curseur tant que la fenêtre le permet, en dessous sinon, et toujours ramenée à l'intérieur de l'écran. Survole le dernier point à droite d'une courbe, puis un point tout en haut d'un graphe."
            >
                <div className="flex flex-col gap-4 sm:flex-row">

                    <div className="min-w-0 flex-1">
                        <LineChart
                            ariaLabel = "Sessions quotidiennes, pour éprouver le placement de l'infobulle au bord droit"
                            data      = { TIME_DATA }
                            palette   = { palette }
                            height    = { 260 }
                            curve     = "monotoneX"
                            legend    = { false }
                            xScale    = "time"
                            xAxis     = {{ tickRotation : -35 }}
                        />
                    </div>

                    <div className="min-w-0 flex-1 overflow-hidden rounded-box border border-base-300 p-3">
                        <p className="mb-2 text-xs text-base-content/60">
                            Dans une carte qui coupe ce qui dépasse — <code>overflow-hidden</code> — la bulle en sort quand même.
                        </p>

                        <BarChart
                            ariaLabel = "Population par pays, dans une carte qui coupe ce qui dépasse"
                            data      = { BAR_DATA }
                            indexBy   = "country"
                            palette   = { palette }
                            height    = { 200 }
                            legend    = { false }
                        />
                    </div>

                </div>
            </Section>

        </div>
    ) ;
} ;

export default CartesianChartsDemo ;
