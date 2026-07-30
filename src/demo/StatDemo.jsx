'use client' ;

import { useState } from 'react' ;

import Badge  from '@/components/Badge' ;
import Button from '@/components/Button' ;
import Stat   from '@/components/stats/Stat' ;
import Stats  from '@/components/stats/Stats' ;

import Container from '@/display/Container' ;

import { directions } from '@/themes/components/stat' ;

import
{
    MdBolt          as BoltIcon ,
    MdDownload      as DownloadIcon ,
    MdFavorite      as LikeIcon ,
    MdPersonAdd     as UserIcon ,
    MdTrendingDown  as DownIcon ,
    MdTrendingUp    as UpIcon ,
}
from 'react-icons/md' ;

/** A short, curated palette — the full text-colour map is far too long for a row of buttons. */
const PALETTE = [ 'primary' , 'secondary' , 'accent' , 'success' , 'warning' , 'error' ] ;

const ColorRow = ({ label , onChange , value }) =>
(
    <div className="flex flex-wrap items-center gap-2">
        <span className="w-28 text-sm font-semibold">{ label }</span>

        <Button
            size    = "sm"
            color   = { value ? 'neutral' : 'primary' }
            style   = { value ? 'outline' : undefined }
            onClick = { () => onChange( undefined ) }
        >
            aucune
        </Button>

        { PALETTE.map( item =>
        (
            <Button
                key     = { item }
                size    = "sm"
                color   = { value === item ? 'primary' : 'neutral' }
                style   = { value === item ? undefined : 'outline' }
                onClick = { () => onChange( item ) }
            >
                { item }
            </Button>
        ) ) }
    </div>
) ;

ColorRow.displayName = 'ColorRow' ;

const BasicSection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Bandeau de base</h2>

        <p className="text-sm text-base-content/70">
            Cinq emplacements par bloc — <code className="badge badge-sm">title</code>,
            <code className="badge badge-sm">value</code>,
            <code className="badge badge-sm">description</code>,
            <code className="badge badge-sm">figure</code>,
            <code className="badge badge-sm">actions</code> — tous facultatifs. Le trait pointillé
            entre les blocs vient de daisyUI, pas de nous.
        </p>

        <Stats className="shadow">
            <Stat
                title       = "Pages vues"
                value       = "89 400"
                description = "21 % de plus que le mois dernier"
            />
        </Stats>

        <Stats
            className = "shadow"
            items     = {[
                {
                    id          : 'likes' ,
                    color       : 'primary' ,
                    figure      : <LikeIcon className="size-8" /> ,
                    title       : 'Mentions' ,
                    value       : '25,6 k' ,
                    description : '21 % de plus que le mois dernier' ,
                } ,
                {
                    id          : 'views' ,
                    color       : 'secondary' ,
                    figure      : <BoltIcon className="size-8" /> ,
                    title       : 'Pages vues' ,
                    value       : '2,6 M' ,
                    description : '21 % de plus que le mois dernier' ,
                } ,
                {
                    id          : 'downloads' ,
                    figure      : <DownloadIcon className="size-8" /> ,
                    title       : 'Téléchargements' ,
                    value       : '31 k' ,
                    description : '1er janv. – 1er févr.' ,
                } ,
            ]}
        />

        <p className="text-xs text-base-content/60">
            La figure est rendue <strong>en dernier dans le DOM</strong> même si elle s'affiche à
            droite : daisyUI place chaque partie par <code className="badge badge-sm">grid-column</code>,
            jamais par l'ordre des sources. Un lecteur d'écran annonce donc « Mentions, 25,6 k » et
            non l'inverse. Elle est aussi <code className="badge badge-sm">aria-hidden</code> par
            défaut — une icône à côté d'un nombre déjà étiqueté n'apporte rien.
        </p>

    </Container>
) ;

BasicSection.displayName = 'BasicSection' ;

const ColorSection = () =>
{
    const [ color            , setColor            ] = useState( 'primary' ) ;
    const [ valueColor       , setValueColor       ] = useState( undefined ) ;
    const [ descriptionColor , setDescriptionColor ] = useState( 'success' ) ;
    const [ figureColor      , setFigureColor      ] = useState( undefined ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Couleurs</h2>

            <p className="text-sm text-base-content/70">
                daisyUI n'expose aucun modificateur de couleur sur les parties : ses exemples y
                posent de simples utilities, et teintent souvent la valeur et la description
                différemment. Chaque partie a donc sa propre couleur, et
                <code className="badge badge-sm">color</code> sert d'accent commun à la valeur et à
                la figure — les couleurs par partie l'emportent sur lui.
            </p>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">
                <ColorRow label="color"       value={ color }            onChange={ setColor } />
                <ColorRow label="value"       value={ valueColor }       onChange={ setValueColor } />
                <ColorRow label="description" value={ descriptionColor } onChange={ setDescriptionColor } />
                <ColorRow label="figure"      value={ figureColor }      onChange={ setFigureColor } />
            </div>

            <Stats className="shadow">
                <Stat
                    color            = { color }
                    descriptionColor = { descriptionColor }
                    figureColor      = { figureColor }
                    valueColor       = { valueColor }
                    figure           = { <UpIcon className="size-8" /> }
                    title            = "Chiffre d'affaires"
                    value            = "128 400 €"
                    description      = "↗︎ 12 400 (10 %)"
                />
            </Stats>

            <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge color="neutral">color = { String( color ) }</Badge>
                <Badge color="neutral">valueColor = { String( valueColor ) }</Badge>
                <Badge color="neutral">descriptionColor = { String( descriptionColor ) }</Badge>
                <Badge color="neutral">figureColor = { String( figureColor ) }</Badge>
            </div>

            <p className="text-xs text-base-content/60">
                Mets <code className="badge badge-sm">value</code> sur une couleur : elle doit
                l'emporter sur <code className="badge badge-sm">color</code> tout en laissant la
                figure sur l'accent.
            </p>

        </Container>
    ) ;
} ;

ColorSection.displayName = 'ColorSection' ;

const DIRECTION_ITEMS =
[
    { id : 'downloads' , title : 'Téléchargements' , value : '31 k'  , description : '1er janv. – 1er févr.' } ,
    { id : 'users'     , title : 'Nouveaux'        , value : '4 200' , description : '↗︎ 400 (22 %)' , color : 'success' , figure : <UserIcon className="size-8" /> } ,
    { id : 'churn'     , title : 'Désinscriptions' , value : '1 200' , description : '↘︎ 90 (14 %)'  , color : 'error'   , figure : <DownIcon className="size-8" /> } ,
] ;

const DirectionSection = () =>
{
    const [ direction , setDirection ] = useState( 'horizontal' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Direction</h2>

            <div className="flex flex-wrap items-center gap-2 p-4 rounded-box bg-base-100">
                <span className="w-28 text-sm font-semibold">direction</span>
                { directions.map( value =>
                (
                    <Button
                        key     = { value }
                        size    = "sm"
                        color   = { direction === value ? 'primary' : 'neutral' }
                        style   = { direction === value ? undefined : 'outline' }
                        onClick = { () => setDirection( value ) }
                    >
                        { value }
                    </Button>
                ) ) }
            </div>

            <Stats className="shadow" direction={ direction } items={ DIRECTION_ITEMS } />

            <h3 className="text-xl font-bold">Responsive</h3>

            <p className="text-sm text-base-content/70">
                La direction accepte aussi un objet par breakpoint, via le même helper que les
                tailles de <code className="badge badge-sm">Tabs</code> :
                <code className="badge badge-sm">{ `direction={{ xs: 'vertical', lg: 'horizontal' }}` }</code>.
                Empilé sur mobile, en ligne à partir de <code className="badge badge-sm">lg</code>.
            </p>

            <Stats
                className = "w-full shadow"
                direction = { { xs : 'vertical' , lg : 'horizontal' } }
                items     = { DIRECTION_ITEMS }
            />

            <h3 className="text-xl font-bold">Débordement horizontal</h3>

            <p className="text-sm text-base-content/70">
                Le point à trancher : <code className="badge badge-sm">.stats</code> porte
                <code className="badge badge-sm">overflow-x: auto</code>, donc au-delà de la largeur
                disponible les blocs <strong>défilent latéralement</strong> au lieu de passer à la
                ligne. Le conteneur ci-dessous est volontairement étroit — fais défiler à
                l'horizontale à l'intérieur.
            </p>

            <div className="max-w-md rounded-box border border-dashed border-base-300 p-2">
                <Stats className="shadow" items={ DIRECTION_ITEMS } />
            </div>

            <p className="text-xs text-base-content/60">
                C'est le comportement daisyUI, conservé tel quel pour l'instant.
            </p>

        </Container>
    ) ;
} ;

DirectionSection.displayName = 'DirectionSection' ;

const ExtrasSection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Centrage &amp; actions</h2>

        <p className="text-sm text-base-content/70">
            <code className="badge badge-sm">centered</code> se pose sur le conteneur pour tous les
            blocs, ou sur un bloc pour l'emporter localement.
            <code className="badge badge-sm">actions</code> accueille les boutons.
        </p>

        <Stats centered className="w-full shadow" items={ DIRECTION_ITEMS } />

        <Stats className="border border-base-300 bg-base-100">
            <Stat
                title   = "Solde du compte"
                value   = "89 400 €"
                actions = { <Button size="xs" color="success">Alimenter</Button> }
            />
            <Stat
                title   = "Solde courant"
                value   = "89 400 €"
                actions = {
                    <>
                        <Button size="xs">Retirer</Button>
                        <Button size="xs">Déposer</Button>
                    </>
                }
            />
        </Stats>

    </Container>
) ;

ExtrasSection.displayName = 'ExtrasSection' ;

/**
 * Demo: `Stats` / `Stat` — KPI blocks on DaisyUI's `stats`.
 *
 * @returns {React.JSX.Element}
 */
const StatDemo = () =>
{
    return (
        <>
            <BasicSection />
            <ColorSection />
            <DirectionSection />
            <ExtrasSection />
        </>
    ) ;
} ;

StatDemo.displayName = 'StatDemo' ;

export default StatDemo ;
