'use client' ;

import { useState } from 'react' ;

import Badge        from '@/components/Badge' ;
import Button       from '@/components/Button' ;
import ConfirmModal from '@/components/modals/ConfirmModal' ;
import SidePanel    from '@/components/panels/SidePanel' ;
import useModal     from '@/components/modals/hooks/useModal' ;

import Container from '@/display/Container' ;

import
{
    MdFilterList   as FilterIcon ,
    MdReceiptLong  as InvoiceIcon ,
    MdShoppingCart as CartIcon ,
}
from 'react-icons/md' ;

const WIDTHS =
[
    'w-full sm:w-[22rem]' ,
    'w-full sm:w-[28rem]' ,
    'w-full sm:w-[36rem]' ,
] ;

const CART_ITEMS =
[
    { id : 'a' , label : 'Café de Colombie — 1 kg'   , price : 24.90 , qty : 2 } ,
    { id : 'b' , label : 'Moulin à café manuel'      , price : 68.00 , qty : 1 } ,
    { id : 'c' , label : 'Filtres papier (x100)'     , price :  6.50 , qty : 3 } ,
    { id : 'd' , label : 'Balance de précision 0,1g' , price : 42.00 , qty : 1 } ,
    { id : 'e' , label : 'Carafe isotherme 1 L'      , price : 35.90 , qty : 1 } ,
    { id : 'f' , label : 'Bouilloire col de cygne'   , price : 79.00 , qty : 1 } ,
] ;

const price = value => `${ value.toFixed( 2 ) } €` ;

/**
 * Placement + width : the two knobs `SidePanel` adds on top of `Modal`.
 *
 * Opening the same panel at three widths is the quickest way to see whether the
 * `width` class actually wins over daisyUI's `width:auto` on `.modal-box`.
 */
const PlacementSection = () =>
{
    const [ width , setWidth ] = useState( WIDTHS[ 1 ] ) ;

    const { modalRef : endRef   , open : openEnd   } = useModal() ;
    const { modalRef : startRef , open : openStart } = useModal() ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Placement &amp; largeur</h2>

            <p className="text-sm text-base-content/70">
                Le panneau s'ancre à droite (<code className="badge badge-sm">end</code>, par défaut) ou à
                gauche (<code className="badge badge-sm">start</code>). Sous <code className="badge badge-sm">sm</code> il
                passe en plein écran — réduis la fenêtre pour le vérifier.
            </p>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">Largeur</span>
                    { WIDTHS.map( value =>
                    (
                        <Button
                            key     = { value }
                            size    = "sm"
                            color   = { width === value ? 'primary' : 'neutral' }
                            style   = { width === value ? undefined : 'outline' }
                            onClick = { () => setWidth( value ) }
                        >
                            { value.replace( 'w-full sm:' , '' ) }
                        </Button>
                    ) ) }
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">Courant</span>
                    <Badge color="primary">width = { width }</Badge>
                </div>

            </div>

            <div className="flex flex-wrap gap-2">
                <Button color="primary" onClick={ openEnd }>
                    Ouvrir à droite
                </Button>

                <Button color="secondary" onClick={ openStart }>
                    Ouvrir à gauche
                </Button>
            </div>

            <SidePanel
                ref   = { endRef }
                title = "Panneau droit"
                icon  = { <InvoiceIcon size={ 22 } /> }
                width = { width }
                agree = "Fermer"
                showDisagree = { false }
            >
                <div className="flex flex-col gap-3 py-4">
                    <p>
                        Ancré à <code className="badge badge-sm">end</code>. Les coins ne sont arrondis
                        que du côté intérieur — daisyUI s'en charge seul.
                    </p>
                    <p className="text-sm text-base-content/70">
                        Le panneau doit occuper toute la hauteur du viewport, sans bande vide en bas
                        sur mobile (<code className="badge badge-sm">h-dvh</code> et non <code className="badge badge-sm">100vh</code>).
                    </p>
                </div>
            </SidePanel>

            <SidePanel
                ref       = { startRef }
                placement = "start"
                title     = "Panneau gauche"
                icon      = { <FilterIcon size={ 22 } /> }
                width     = { width }
                agree     = "Fermer"
                showDisagree = { false }
            >
                <div className="flex flex-col gap-3 py-4">
                    <p>
                        Ancré à <code className="badge badge-sm">start</code>. Il passe au-dessus du menu
                        latéral de la démo — un <code className="badge badge-sm">&lt;dialog&gt;</code> vit
                        dans le top layer, donc aucun arbitrage de <code className="badge badge-sm">z-index</code> n'entre en jeu.
                    </p>
                </div>
            </SidePanel>

        </Container>
    ) ;
} ;

PlacementSection.displayName = 'PlacementSection' ;

/**
 * The real target use case : a cart with a pinned total, a scrollable list, and a
 * confirmation modal stacked above the panel (the inner one carries `portal`).
 */
const CartSection = () =>
{
    const [ items   , setItems   ] = useState( CART_ITEMS ) ;
    const [ pending , setPending ] = useState( null ) ;

    const { modalRef : cartRef    , open : openCart    } = useModal() ;
    const { modalRef : confirmRef , open : openConfirm } = useModal() ;

    const total = items.reduce( ( sum , item ) => sum + item.price * item.qty , 0 ) ;

    const askRemove = item =>
    {
        setPending( item ) ;
        openConfirm() ;
    } ;

    const removePending = () =>
    {
        setItems( current => current.filter( item => item.id !== pending?.id ) ) ;
        setPending( null ) ;
    } ;

    const footer = (
        <div className="flex flex-col gap-3 px-4 py-4">

            <div className="flex items-baseline justify-between">
                <span className="text-sm text-base-content/70">
                    { items.length } article{ items.length > 1 ? 's' : '' }
                </span>
                <span className="text-xl font-bold">{ price( total ) }</span>
            </div>

            <Button color="primary" disabled={ items.length === 0 }>
                Commander
            </Button>

        </div>
    ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Panier — footer épinglé + modale empilée</h2>

            <p className="text-sm text-base-content/70">
                <code className="badge badge-sm">footerNode</code> passe le panneau en colonne flex :
                entête figée, liste défilante, total collé en bas. Retirer une ligne ouvre une
                confirmation <strong>par-dessus</strong> le panneau — elle porte <code className="badge badge-sm">portal</code>,
                sans quoi le navigateur fermerait le panneau qui la contient.
            </p>

            <div className="flex flex-wrap items-center gap-2">
                <Button color="primary" onClick={ openCart }>
                    <CartIcon size={ 18 } />
                    Ouvrir le panier
                </Button>

                <Badge color="secondary">{ items.length } article{ items.length > 1 ? 's' : '' }</Badge>
                <Badge color="accent">{ price( total ) }</Badge>

                { items.length < CART_ITEMS.length && (
                    <Button size="sm" style="outline" onClick={ () => setItems( CART_ITEMS ) }>
                        Réinitialiser
                    </Button>
                ) }
            </div>

            <SidePanel
                ref        = { cartRef }
                title      = "Mon panier"
                icon       = { <CartIcon size={ 22 } /> }
                footerNode = { footer }
            >
                <ul className="flex flex-col divide-y divide-base-300/60">
                    { items.map( item =>
                    (
                        <li key={ item.id } className="flex items-center gap-3 py-3">

                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="truncate font-medium">{ item.label }</span>
                                <span className="text-sm text-base-content/60">
                                    { item.qty } × { price( item.price ) }
                                </span>
                            </div>

                            <span className="font-semibold whitespace-nowrap">
                                { price( item.price * item.qty ) }
                            </span>

                            <Button size="sm" color="error" style="ghost" onClick={ () => askRemove( item ) }>
                                Retirer
                            </Button>

                        </li>
                    ) ) }

                    { items.length === 0 && (
                        <li className="py-8 text-center text-base-content/60">
                            Panier vide — le panneau doit garder sa largeur.
                        </li>
                    ) }
                </ul>

                <ConfirmModal
                    ref     = { confirmRef }
                    portal
                    title   = "Retirer cet article ?"
                    agree   = "Retirer"
                    onAgree = { removePending }
                >
                    <p className="py-4">
                        { pending?.label } sera retiré du panier.
                    </p>
                </ConfirmModal>
            </SidePanel>

        </Container>
    ) ;
} ;

CartSection.displayName = 'CartSection' ;

/**
 * Demo: `SidePanel` — full-height off-canvas panel built on `Modal`.
 *
 * @returns {React.JSX.Element}
 */
const SidePanelDemo = () =>
{
    return (
        <>
            <PlacementSection />
            <CartSection />
        </>
    ) ;
} ;

SidePanelDemo.displayName = 'SidePanelDemo' ;

export default SidePanelDemo ;
