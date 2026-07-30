'use client' ;

import { useState } from 'react' ;

import Badge   from '@/components/Badge' ;
import Button  from '@/components/Button' ;
import Card    from '@/components/Card' ;
import Picture from '@/components/images/Picture' ;

import Container from '@/display/Container' ;

import cn from '@/themes/helpers/cn' ;

import { sizes , sideBreakpoints , styles } from '@/themes/components/card' ;

import { MdCheck as CheckIcon , MdPlayArrow as PlayIcon } from 'react-icons/md' ;

const BLURB = 'Une carte a une figure, un corps, et dans le corps un titre et une rangée d\'actions.' ;

/**
 * Width the figure takes once the card turns horizontal — whole literals per breakpoint,
 * for the same scanner reason as the `card-side` classes themselves.
 *
 * DaisyUI sizes a side figure from its content, so a `fill` image (which has no intrinsic
 * size) needs the figure to carry the width itself.
 */
const SIDE_FIGURE_CLASS =
{
    sm : 'w-full sm:w-56' ,
    md : 'w-full md:w-56' ,
    lg : 'w-full lg:w-56' ,
    xl : 'w-full xl:w-56' ,
} ;

/**
 * The figure of a card.
 *
 * `Card`'s `image` prop takes a **node**, not a source — which is exactly what lets
 * `Picture` slot in with its corner and center overlays. Anything else works too : a
 * plain `<img>`, a `next/image`, an SVG.
 *
 * `Picture` runs in **`fill`** mode here, and that is not incidental : in its default
 * mode it lays the image out at its intrinsic pixel size inside an `inline-block` and
 * paints a `bg-base-300` behind it, so the image ignores the card width and the leftover
 * container shows through as grey bands. `fill` makes it take the box it is given —
 * which is what a card figure is. The box itself comes from the class passed here.
 */
const CardImage = ({ alt = 'illustration' , className = 'aspect-video' , seed , ...slots }) =>
(
    <Picture
        fill
        alt              = { alt }
        className        = { cn( 'w-full' , className ) }
        loadingAnimation = "spinner"
        loadingColor     = "primary"
        loadingSize      = "md"
        objectFit        = "cover"
        src              = { `https://picsum.photos/800/600?random=${ seed }` }
        { ...slots }
    />
) ;

CardImage.displayName = 'CardImage' ;

const BasicSection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Carte de base</h2>

        <p className="text-sm text-base-content/70">
            Chaque partie est un emplacement : <code className="badge badge-sm">image</code>,
            <code className="badge badge-sm">title</code>, les enfants, puis
            <code className="badge badge-sm">actions</code>. Un emplacement dont la prop est
            vide n'est pas rendu du tout — pas de <code className="badge badge-sm">figure</code> vide
            ni de rangée d'actions fantôme.
        </p>

        <p className="text-sm text-base-content/70">
            <code className="badge badge-sm">image</code> prend un <strong>nœud</strong> et non une
            source, ce qui laisse composer librement : ici un
            <code className="badge badge-sm">Picture</code>, dont les emplacements d'angle et de
            centre posent une pastille sur la photo sans que la carte ait à s'en mêler.
        </p>

        <div className="flex flex-wrap gap-6">

            <Card
                className = "w-96 bg-base-100 shadow-sm"
                image     = {
                    <CardImage
                        alt      = "Paire de chaussures"
                        seed     = { 401 }
                        topRight = { <Badge color="secondary">NOUVEAU</Badge> }
                    />
                }
                title     = "Titre de la carte"
                actions   = { <Button color="primary">Acheter</Button> }
            >
                <p>{ BLURB }</p>
            </Card>

            <Card
                className = "w-96 bg-base-100 shadow-sm"
                title     = { <>Titre <Badge color="secondary">NOUVEAU</Badge></> }
                actions   = { <><Badge style="outline">Mode</Badge><Badge style="outline">Produits</Badge></> }
            >
                <p>Sans figure, avec des badges dans le titre et dans les actions.</p>
            </Card>

        </div>

    </Container>
) ;

BasicSection.displayName = 'BasicSection' ;

const SizeSection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Tailles &amp; styles</h2>

        <p className="text-sm text-base-content/70">
            La taille joue sur le padding du corps et la taille du titre.
            <code className="badge badge-sm">md</code> est le défaut de daisyUI.
        </p>

        <div className="flex flex-wrap items-start gap-4">
            { sizes.slice().reverse().map( size =>
            (
                <Card
                    key       = { size }
                    className = "w-64 bg-base-100 shadow-sm"
                    size      = { size }
                    title     = { `Taille ${ size }` }
                    actions   = { <Button color="primary" size="sm">Acheter</Button> }
                >
                    <p>{ BLURB }</p>
                </Card>
            ) ) }
        </div>

        <div className="flex flex-wrap items-start gap-4">

            { styles.map( style =>
            (
                <Card
                    key       = { style }
                    className = "w-64 bg-base-100"
                    style     = { style }
                    title     = { `style="${ style }"` }
                >
                    <p className="text-sm">Bordure { style === 'dash' ? 'tiretée' : 'pleine' }.</p>
                </Card>
            ) ) }

            <Card
                className = "w-64 bg-primary text-primary-content"
                title     = "Couleur libre"
                actions   = { <Button>Acheter</Button> }
            >
                <p className="text-sm">Le fond et le texte restent des utilities Tailwind.</p>
            </Card>

        </div>

    </Container>
) ;

SizeSection.displayName = 'SizeSection' ;

const FigureSection = () =>
{
    const [ breakpoint , setBreakpoint ] = useState( 'lg' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">La figure</h2>

            <p className="text-sm text-base-content/70">
                En haut par défaut, en bas via <code className="badge badge-sm">imagePosition</code>,
                en fond via <code className="badge badge-sm">imageFull</code>, ou sur le côté via
                <code className="badge badge-sm">side</code>.
            </p>

            <div className="flex flex-wrap items-start gap-6">

                <Card
                    className = "w-72 bg-base-100 shadow-sm"
                    image     = { <CardImage alt="Paysage" seed={ 402 } /> }
                    title     = "Image en haut"
                />

                <Card
                    className     = "w-72 bg-base-100 shadow-sm"
                    image         = { <CardImage alt="Terrasse de café" seed={ 403 } /> }
                    imagePosition = "bottom"
                    title         = "Image en bas"
                />

                <Card
                    className = "w-72 shadow-sm"
                    image     = { <CardImage alt="Texture" seed={ 404 } className="h-full" /> }
                    imageFull
                    title     = "Image en fond"
                    actions   = { <Button color="primary" size="sm">Acheter</Button> }
                >
                    <p>Le corps passe par-dessus la figure.</p>
                </Card>

            </div>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-40">Bascule horizontale</span>
                    { sideBreakpoints.map( value =>
                    (
                        <Button
                            key     = { value }
                            size    = "sm"
                            color   = { breakpoint === value ? 'primary' : 'neutral' }
                            style   = { breakpoint === value ? undefined : 'outline' }
                            onClick = { () => setBreakpoint( value ) }
                        >
                            { value }
                        </Button>
                    ) ) }
                </div>
                <p className="text-xs text-base-content/60">
                    <code className="badge badge-sm">{ `side="${ breakpoint }"` }</code> — verticale
                    en dessous, horizontale au-dessus. Redimensionne la fenêtre pour voir la bascule.
                    daisyUI ne fournit pas de variante <code className="badge badge-sm">2xl</code>,
                    la prop s'arrête donc à <code className="badge badge-sm">xl</code>.
                </p>
            </div>

            <Card
                className       = "bg-base-100 shadow-sm overflow-hidden"
                image           = {
                    <CardImage
                        alt       = "Pochette d'album"
                        className = "h-full min-h-48"
                        seed      = { 405 }
                        center    = {
                            <span className="btn btn-circle btn-primary">
                                <PlayIcon size={ 24 } />
                            </span>
                        }
                    />
                }
                figureClassName = { SIDE_FIGURE_CLASS[ breakpoint ] }
                side            = { breakpoint }
                title           = "Nouvel album"
                actions         = { <Button color="primary">Écouter</Button> }
            >
                <p>{ BLURB }</p>
            </Card>

        </Container>
    ) ;
} ;

FigureSection.displayName = 'FigureSection' ;

const HeadingSection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Niveau de titre</h2>

        <p className="text-sm text-base-content/70">
            daisyUI écrit son titre en <code className="badge badge-sm">h2</code> en dur. Une carte
            vivant au milieu d'un plan de document, <code className="badge badge-sm">titleAs</code>
            permet de l'accorder à la hiérarchie environnante — ici la section est déjà un
            <code className="badge badge-sm">h2</code>, donc les cartes doivent être en
            <code className="badge badge-sm">h3</code>.
        </p>

        <div className="flex flex-wrap gap-4">
            { [ 'h3' , 'h4' , 'span' ].map( tag =>
            (
                <Card
                    key       = { tag }
                    className = "w-64 bg-base-100 shadow-sm"
                    title     = { `titleAs="${ tag }"` }
                    titleAs   = { tag }
                >
                    <p className="text-sm">
                        { tag === 'span'
                            ? 'Aucun titre dans le plan — pour une carte purement décorative.'
                            : 'Le style reste identique, seule la sémantique change.' }
                    </p>
                </Card>
            ) ) }
        </div>

    </Container>
) ;

HeadingSection.displayName = 'HeadingSection' ;

const SELECTABLE_SIZES =
[
    { value : 'sm' , label : 'Taille SM' , hint : 'Disponible' } ,
    { value : 'md' , label : 'Taille MD' , hint : 'Épuisée' , disabled : true } ,
    { value : 'lg' , label : 'Taille LG' , hint : 'Stock limité' } ,
] ;

const SelectableSection = () =>
{
    const [ urgent , setUrgent ] = useState( false ) ;
    const [ size   , setSize   ] = useState( 'sm' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Cartes sélectionnables</h2>

            <p className="text-sm text-base-content/70">
                daisyUI transforme une carte en contrôle de sélection par
                <code className="badge badge-sm">:has()</code> — une case cochée allume le contour, et
                l'input est masqué par <code className="badge badge-sm">appearance: none</code>. La règle
                vise les <strong>enfants directs</strong> de la carte, d'où l'emplacement dédié
                <code className="badge badge-sm">input</code> : passé dans les enfants, il atterrirait
                dans le corps et ne serait jamais vu. La racine passe en
                <code className="badge badge-sm">label</code> pour que tout le bloc soit cliquable.
            </p>

            <p className="text-sm text-base-content/70">
                <strong>Ce qu'il faut observer :</strong> coche l'une ou l'autre, le contour de la
                carte s'allume. Attention, daisyUI trace ce contour en
                <code className="badge badge-sm">currentColor</code> — une carte dont le texte est
                clair produit donc un contour clair, invisible sur un fond clair. La carte « Urgent »
                porte pour cette raison un <code className="badge badge-sm">text-accent</code> à sa
                racine, la couleur du corps étant rétablie par
                <code className="badge badge-sm">bodyClassName</code>.
            </p>

            <div className="flex flex-wrap items-start gap-4">

                <Card
                    as            = "label"
                    className     = "bg-base-100 text-accent shadow-sm"
                    bodyClassName = "text-base-content"
                    input         = {
                        <input
                            type     = "checkbox"
                            name     = "card-urgent"
                            checked  = { urgent }
                            onChange = { event => setUrgent( event.target.checked ) }
                        />
                    }
                    title         = "Urgent"
                >
                    <p>Livraison le jour même</p>
                </Card>

                <div className="join bg-base-300 rounded-box">
                    { SELECTABLE_SIZES.map( item =>
                    (
                        <Card
                            key           = { item.value }
                            as            = "label"
                            className     = "join-item"
                            bodyClassName = { item.disabled ? 'opacity-60' : undefined }
                            input         = {
                                <input
                                    type     = "radio"
                                    name     = "card-size"
                                    value    = { item.value }
                                    disabled = { item.disabled }
                                    checked  = { size === item.value }
                                    onChange = { () => setSize( item.value ) }
                                />
                            }
                            title = { item.label }
                        >
                            <p>{ item.hint }</p>
                        </Card>
                    ) ) }
                </div>

            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Badge color={ urgent ? 'success' : 'neutral' }>
                    <CheckIcon size={ 14 } /> urgent = { String( urgent ) }
                </Badge>
                <Badge color="primary">taille = { size }</Badge>
            </div>

        </Container>
    ) ;
} ;

SelectableSection.displayName = 'SelectableSection' ;

/**
 * Demo: `Card` — the DaisyUI card shell, driven by slots.
 *
 * @returns {React.JSX.Element}
 */
const CardDemo = () =>
{
    return (
        <>
            <BasicSection />
            <SizeSection />
            <FigureSection />
            <HeadingSection />
            <SelectableSection />
        </>
    ) ;
} ;

CardDemo.displayName = 'CardDemo' ;

export default CardDemo ;
