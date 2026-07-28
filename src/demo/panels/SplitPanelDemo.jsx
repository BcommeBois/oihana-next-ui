'use client' ;

import { useState } from 'react' ;

import Badge      from '@/components/Badge' ;
import Button     from '@/components/Button' ;
import SplitPanel from '@/components/panels/SplitPanel' ;

import Container from '@/display/Container' ;

import useBreakpoint from '@/themes/hooks/useBreakpoint' ;

const INVOICES =
[
    { id : 'F-2043' , client : 'Atelier Kervadec'   , amount : 1240.00 , date : '12/07/2026' , status : 'paid'    } ,
    { id : 'F-2042' , client : 'Studio Marguerite'  , amount :  480.50 , date : '09/07/2026' , status : 'pending' } ,
    { id : 'F-2041' , client : 'Brasserie du Port'  , amount : 2310.90 , date : '04/07/2026' , status : 'paid'    } ,
    { id : 'F-2040' , client : 'Librairie Oihana'   , amount :  156.00 , date : '28/06/2026' , status : 'late'    } ,
    { id : 'F-2039' , client : 'Camping Les Pins'   , amount :  890.00 , date : '21/06/2026' , status : 'paid'    } ,
    { id : 'F-2038' , client : 'Ferme de Larrun'    , amount :  325.75 , date : '18/06/2026' , status : 'pending' } ,
    { id : 'F-2037' , client : 'Menuiserie Etchart' , amount : 4120.00 , date : '11/06/2026' , status : 'paid'    } ,
    { id : 'F-2036' , client : 'Café des Halles'    , amount :  210.30 , date : '05/06/2026' , status : 'late'    } ,
    { id : 'F-2035' , client : 'École Sainte-Anne'  , amount : 1875.00 , date : '30/05/2026' , status : 'paid'    } ,
    { id : 'F-2034' , client : 'Garage Idiart'      , amount :  640.00 , date : '24/05/2026' , status : 'pending' } ,
] ;

const STATUS =
{
    paid    : { label : 'Payée'    , color : 'success' } ,
    pending : { label : 'En cours' , color : 'warning' } ,
    late    : { label : 'En retard', color : 'error'   } ,
} ;

const amount = value => `${ value.toFixed( 2 ) } €` ;

/**
 * The panel content : detail of the selected invoice, or an empty state.
 */
const InvoiceDetail = ({ invoice }) =>
{
    if ( !invoice )
    {
        return (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-base-content/60">
                Sélectionne une facture dans la liste.
            </div>
        ) ;
    }

    const status = STATUS[ invoice.status ] ;

    return (
        <div className="flex flex-col gap-4 p-5">

            <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide text-base-content/50">Facture</span>
                <span className="text-2xl font-bold">{ invoice.id }</span>
            </div>

            <Badge color={ status.color }>{ status.label }</Badge>

            <dl className="flex flex-col gap-3 text-sm">

                <div className="flex flex-col">
                    <dt className="text-base-content/50">Client</dt>
                    <dd className="font-medium">{ invoice.client }</dd>
                </div>

                <div className="flex flex-col">
                    <dt className="text-base-content/50">Émise le</dt>
                    <dd className="font-medium">{ invoice.date }</dd>
                </div>

                <div className="flex flex-col">
                    <dt className="text-base-content/50">Montant</dt>
                    <dd className="text-xl font-bold">{ amount( invoice.amount ) }</dd>
                </div>

            </dl>

        </div>
    ) ;
} ;

InvoiceDetail.displayName = 'InvoiceDetail' ;

/**
 * The target use case : a list and its detail, side by side on a wide screen, the
 * detail folding into a dismissible overlay below the breakpoint.
 */
const InvoiceSection = () =>
{
    const [ align    , setAlign    ] = useState( 'end' ) ;
    const [ open     , setOpen     ] = useState( false ) ;
    const [ selected , setSelected ] = useState( null ) ;

    // Mirrors what SplitPanel does internally : above the breakpoint the panel is
    // pinned, so the "open" control has nothing left to do and is hidden.
    const isPinned = useBreakpoint( 'lg' ) ;

    const select = invoice =>
    {
        setSelected( invoice ) ;

        if ( !isPinned )
        {
            setOpen( true ) ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Liste + détail</h2>

            <p className="text-sm text-base-content/70">
                À partir de <code className="badge badge-sm">lg</code> le panneau est une colonne
                permanente et la liste se rétrécit pour lui faire de la place : on lit les deux
                en même temps. En dessous, il se replie en overlay qu'on ouvre à la demande.
                Réduis la fenêtre pour voir la bascule.
            </p>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">Côté</span>
                    { [ 'start' , 'end' ].map( value =>
                    (
                        <Button
                            key     = { value }
                            size    = "sm"
                            color   = { align === value ? 'primary' : 'neutral' }
                            style   = { align === value ? undefined : 'outline' }
                            onClick = { () => setAlign( value ) }
                        >
                            { value }
                        </Button>
                    ) ) }
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">État</span>
                    <Badge color={ isPinned ? 'success' : 'warning' }>
                        { isPinned ? 'colonne épinglée (≥ lg)' : 'overlay (< lg)' }
                    </Badge>
                    { !isPinned && <Badge color="accent">open = { String( open ) }</Badge> }
                </div>

            </div>

            <SplitPanel
                align            = { align }
                className        = "h-[30rem] rounded-box border border-base-300 overflow-hidden bg-base-100"
                contentClassName = "overflow-y-auto"
                onOpenChange     = { setOpen }
                open             = { open }
                panel            = { <InvoiceDetail invoice={ selected } /> }
                sideClassName    = "lg:h-[30rem]"
            >
                <ul className="divide-y divide-base-300/60">
                    { INVOICES.map( invoice =>
                    (
                        <li key={ invoice.id }>
                            <button
                                type      = "button"
                                className = { `flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-base-200 ${ selected?.id === invoice.id ? 'bg-base-200' : '' }` }
                                onClick   = { () => select( invoice ) }
                            >
                                <div className="flex min-w-0 flex-1 flex-col">
                                    <span className="font-medium">{ invoice.id }</span>
                                    <span className="truncate text-sm text-base-content/60">{ invoice.client }</span>
                                </div>

                                <span className="whitespace-nowrap font-semibold">{ amount( invoice.amount ) }</span>

                                <Badge color={ STATUS[ invoice.status ].color } size="sm">
                                    { STATUS[ invoice.status ].label }
                                </Badge>
                            </button>
                        </li>
                    ) ) }
                </ul>
            </SplitPanel>

            { !isPinned && (
                <Button color="primary" onClick={ () => setOpen( true ) }>
                    Ouvrir le détail
                </Button>
            ) }

        </Container>
    ) ;
} ;

InvoiceSection.displayName = 'InvoiceSection' ;

/**
 * Same component at another breakpoint — checks that the responsive `drawer-open`
 * class map resolves for something other than the default.
 */
const BreakpointSection = () =>
{
    const [ open , setOpen ] = useState( false ) ;

    const isPinned = useBreakpoint( 'md' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Autre breakpoint</h2>

            <p className="text-sm text-base-content/70">
                Le même composant avec <code className="badge badge-sm">breakpoint="md"</code> :
                il s'épingle plus tôt, à partir de 768px. Les classes responsives sont écrites
                en entier dans le composant pour rester visibles du scanner Tailwind.
            </p>

            <SplitPanel
                breakpoint       = "md"
                className        = "h-56 rounded-box border border-base-300 overflow-hidden bg-base-100"
                contentClassName = "overflow-y-auto"
                onOpenChange     = { setOpen }
                open             = { open }
                sideClassName    = "md:h-56"
                width            = "w-full sm:w-64"
                panel            = {
                    <div className="p-5 text-sm">
                        <p className="font-semibold">Panneau à 768px</p>
                        <p className="mt-2 text-base-content/60">
                            Épinglé dès <code className="badge badge-sm">md</code>.
                        </p>
                    </div>
                }
            >
                <div className="flex h-full flex-col gap-3 p-5">
                    <p className="text-sm">
                        { isPinned
                            ? 'Colonne épinglée : le contenu partage la largeur avec le panneau.'
                            : 'Sous md : le panneau est un overlay.' }
                    </p>

                    { !isPinned && (
                        <Button size="sm" color="primary" onClick={ () => setOpen( true ) }>
                            Ouvrir
                        </Button>
                    ) }
                </div>
            </SplitPanel>

        </Container>
    ) ;
} ;

BreakpointSection.displayName = 'BreakpointSection' ;

/**
 * Demo: `SplitPanel` — inline side region sharing the width with its content.
 *
 * @returns {React.JSX.Element}
 */
const SplitPanelDemo = () =>
{
    return (
        <>
            <InvoiceSection />
            <BreakpointSection />
        </>
    ) ;
} ;

SplitPanelDemo.displayName = 'SplitPanelDemo' ;

export default SplitPanelDemo ;
