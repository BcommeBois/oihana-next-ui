'use client' ;

import { useState } from 'react' ;

import Badge     from '@/components/Badge' ;
import Button    from '@/components/Button' ;
import SidePanel from '@/components/panels/SidePanel' ;
import Tabs      from '@/components/tabs/Tabs' ;
import useModal  from '@/components/modals/hooks/useModal' ;

import Container from '@/display/Container' ;

import { placements , sizes , styles } from '@/themes/components/tab' ;

import
{
    MdHistory      as HistoryIcon ,
    MdPayments     as PaymentIcon ,
    MdReceiptLong  as InvoiceIcon ,
}
from 'react-icons/md' ;

const LOREM =
{
    detail  : 'Facture F-2043 — Atelier Kervadec, 1240,00 € TTC, émise le 12/07/2026.' ,
    history : 'Créée le 12/07, envoyée le 13/07, relancée le 25/07.' ,
    payment : 'Virement de 620,00 € reçu le 20/07. Solde restant : 620,00 €.' ,
} ;

const INVOICE_ITEMS =
[
    { id : 'detail'  , label : 'Détail'     , icon : <InvoiceIcon size={ 16 } /> , content : <p className="p-4">{ LOREM.detail }</p>  } ,
    { id : 'history' , label : 'Historique' , icon : <HistoryIcon size={ 16 } /> , content : <p className="p-4">{ LOREM.history }</p> } ,
    { id : 'payment' , label : 'Paiements'  , icon : <PaymentIcon size={ 16 } /> , content : <p className="p-4">{ LOREM.payment }</p> } ,
] ;

/**
 * The four visual styles, side by side — `lift` is the one whose panel border has to
 * connect back to the active tab, so it is the one to eyeball.
 */
const StyleSection = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Styles</h2>

            <p className="text-sm text-base-content/70">
                Le style nu (sans modificateur) et les trois de daisyUI 5 :
                <code className="badge badge-sm">box</code>,
                <code className="badge badge-sm">border</code>,
                <code className="badge badge-sm">lift</code>.
            </p>

            <div className="flex flex-col gap-8">
                { [ undefined , ...styles ].map( value =>
                (
                    <div key={ value ?? 'plain' } className="flex flex-col gap-2">
                        <Badge color="neutral">{ value ? `style="${ value }"` : 'sans style' }</Badge>
                        <Tabs
                            ariaLabel = { `Facture — style ${ value ?? 'nu' }` }
                            items     = { INVOICE_ITEMS }
                            style     = { value }
                        />
                    </div>
                ) ) }
            </div>

        </Container>
    ) ;
} ;

StyleSection.displayName = 'StyleSection' ;

/**
 * Sizes and placement. `bottom` is a pure CSS reorder — the DOM order never changes.
 */
const SizeSection = () =>
{
    const [ size      , setSize      ] = useState( 'md' ) ;
    const [ placement , setPlacement ] = useState( 'top' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Tailles &amp; position</h2>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">Taille</span>
                    { sizes.map( value =>
                    (
                        <Button
                            key     = { value }
                            size    = "sm"
                            color   = { size === value ? 'primary' : 'neutral' }
                            style   = { size === value ? undefined : 'outline' }
                            onClick = { () => setSize( value ) }
                        >
                            { value }
                        </Button>
                    ) ) }
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">Position</span>
                    { placements.map( value =>
                    (
                        <Button
                            key     = { value }
                            size    = "sm"
                            color   = { placement === value ? 'primary' : 'neutral' }
                            style   = { placement === value ? undefined : 'outline' }
                            onClick = { () => setPlacement( value ) }
                        >
                            { value }
                        </Button>
                    ) ) }
                </div>

            </div>

            <Tabs
                ariaLabel = "Facture — tailles et position"
                items     = { INVOICE_ITEMS }
                placement = { placement }
                size      = { size }
                style     = "lift"
            />

            <p className="text-xs text-base-content/60">
                La taille accepte aussi un objet par breakpoint, par exemple
                <code className="badge badge-sm">{ `size={{ xs: 'sm', lg: 'lg' }}` }</code>.
            </p>

        </Container>
    ) ;
} ;

SizeSection.displayName = 'SizeSection' ;

/**
 * Keyboard behaviour and the disabled state — the part that cannot be checked by
 * looking at the page, only by using it.
 */
const KeyboardSection = () =>
{
    const [ activation , setActivation ] = useState( 'automatic' ) ;

    const items =
    [
        { id : 'un'     , label : 'Un'     , content : <p className="p-4">Premier panneau.</p> } ,
        { id : 'deux'   , label : 'Deux'   , content : <p className="p-4">Deuxième panneau.</p> } ,
        { id : 'bloque' , label : 'Bloqué' , content : <p className="p-4">Inatteignable.</p> , disabled : true } ,
        { id : 'trois'  , label : 'Trois'  , content : <p className="p-4">Troisième panneau — les flèches sautent l'onglet bloqué.</p> } ,
    ] ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Clavier &amp; état désactivé</h2>

            <p className="text-sm text-base-content/70">
                Donne le focus à un onglet puis navigue aux flèches gauche / droite, avec
                bouclage, plus <code className="badge badge-sm">Home</code> et
                <code className="badge badge-sm">End</code>. L'onglet désactivé est sauté.
                Seul l'onglet sélectionné est dans l'ordre de tabulation.
            </p>

            <div className="flex flex-wrap items-center gap-2 p-4 rounded-box bg-base-100">
                <span className="text-sm font-semibold w-24">Activation</span>
                { [ 'automatic' , 'manual' ].map( value =>
                (
                    <Button
                        key     = { value }
                        size    = "sm"
                        color   = { activation === value ? 'primary' : 'neutral' }
                        style   = { activation === value ? undefined : 'outline' }
                        onClick = { () => setActivation( value ) }
                    >
                        { value }
                    </Button>
                ) ) }
            </div>

            <Tabs
                activation = { activation }
                ariaLabel  = "Démonstration clavier"
                items      = { items }
                style      = "border"
            />

            <p className="text-xs text-base-content/60">
                En <code className="badge badge-sm">automatic</code> la flèche sélectionne
                directement. En <code className="badge badge-sm">manual</code> elle ne fait que
                déplacer le focus — il faut <code className="badge badge-sm">Entrée</code> ou
                <code className="badge badge-sm">Espace</code> pour sélectionner.
            </p>

        </Container>
    ) ;
} ;

KeyboardSection.displayName = 'KeyboardSection' ;

let mountSequence = 0 ;

/**
 * Shows in which order its panel was first rendered — the only way to see `lazy` work.
 */
const MountStamp = ({ name }) =>
{
    const [ order ] = useState( () => ++mountSequence ) ;

    return (
        <div className="p-4">
            <Badge color="accent">{ name } — rendu n° { order }</Badge>
        </div>
    ) ;
} ;

MountStamp.displayName = 'MountStamp' ;

/**
 * `lazy` defers a panel's children until its tab has been selected once.
 */
const LazySection = () =>
{
    const [ lazy  , setLazy  ] = useState( false ) ;
    const [ nonce , setNonce ] = useState( 0 ) ;

    const items =
    [
        { id : 'a' , label : 'Panneau A' , content : <MountStamp name="A" /> } ,
        { id : 'b' , label : 'Panneau B' , content : <MountStamp name="B" /> } ,
        { id : 'c' , label : 'Panneau C' , content : <MountStamp name="C" /> } ,
    ] ;

    const reset = () =>
    {
        mountSequence = 0 ;
        setNonce( n => n + 1 ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Montage différé</h2>

            <p className="text-sm text-base-content/70">
                Par défaut tous les panneaux sont montés et daisyUI masque les inactifs —
                c'est ce qui préserve l'état d'un formulaire quand on change d'onglet. Avec
                <code className="badge badge-sm">lazy</code>, le contenu d'un panneau n'est
                monté qu'à sa première sélection, puis il y reste.
            </p>

            <div className="flex flex-wrap items-center gap-2 p-4 rounded-box bg-base-100">
                <Button
                    size    = "sm"
                    color   = { lazy ? 'primary' : 'neutral' }
                    style   = { lazy ? undefined : 'outline' }
                    onClick = { () => { setLazy( !lazy ) ; reset() ; } }
                >
                    lazy = { String( lazy ) }
                </Button>

                <Button size="sm" style="outline" onClick={ reset }>
                    Réinitialiser les compteurs
                </Button>
            </div>

            <Tabs
                ariaLabel = "Montage différé"
                items     = { items }
                key       = { `${ lazy }-${ nonce }` }
                lazy      = { lazy }
                style     = "box"
            />

            <p className="text-xs text-base-content/60">
                Avec <code className="badge badge-sm">lazy = false</code> les trois numéros
                existent d'entrée. Avec <code className="badge badge-sm">lazy = true</code>,
                seul le panneau visité porte un numéro, attribué au moment de la visite.
            </p>

        </Container>
    ) ;
} ;

LazySection.displayName = 'LazySection' ;

/**
 * The composition the lot was built for : tabs inside an overlay panel.
 */
const InPanelSection = () =>
{
    const { modalRef , open } = useModal() ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Dans un SidePanel</h2>

            <p className="text-sm text-base-content/70">
                Le cas qui a motivé le lot : un panneau de détail dont le contenu se répartit
                en onglets. Les flèches doivent fonctionner à l'intérieur du panneau, et
                <code className="badge badge-sm">Escape</code> doit fermer le panneau, pas
                perturber les onglets.
            </p>

            <Button color="primary" onClick={ open }>
                <InvoiceIcon size={ 18 } />
                Ouvrir la facture
            </Button>

            <SidePanel
                ref          = { modalRef }
                title        = "Facture F-2043"
                icon         = { <InvoiceIcon size={ 22 } /> }
                agree        = "Fermer"
                showDisagree = { false }
            >
                <Tabs
                    ariaLabel = "Sections de la facture"
                    items     = { INVOICE_ITEMS }
                    size      = "sm"
                    style     = "border"
                />
            </SidePanel>

        </Container>
    ) ;
} ;

InPanelSection.displayName = 'InPanelSection' ;

/**
 * Demo: `Tabs` — accessible tabs on DaisyUI's `tabs`.
 *
 * @returns {React.JSX.Element}
 */
const TabsDemo = () =>
{
    return (
        <>
            <StyleSection />
            <SizeSection />
            <KeyboardSection />
            <LazySection />
            <InPanelSection />
        </>
    ) ;
} ;

TabsDemo.displayName = 'TabsDemo' ;

export default TabsDemo ;
