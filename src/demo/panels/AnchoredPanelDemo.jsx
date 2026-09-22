'use client' ;

/**
 * AnchoredPanelDemo — a filter bar of three criteria, each an `AnchoredPanel` :
 * a dropdown on `md`+, a sheet below.
 *
 *  - « Couleurs » — several choices, an « Effacer » / « Appliquer » footer ;
 *  - « Taille » — one choice, no footer on the dropdown (the click is the way
 *    out), a « Fermer » bar on the sheet (`sheetFooter`) ;
 *  - « Tri » — a long list scrolling inside the panel ;
 *  - « Plus » — a bare `Popover` with `autoPosition`, at the right edge : it
 *    aligns its end on the trigger.
 *
 * The bar is rendered twice : at the top of the card, where the panels open
 * downward, and after a tall gap — scroll until it sits at the bottom of the
 * screen, and they open upward. Narrow the window under `md` : they become
 * sheets.
 *
 * @module demo/panels/AnchoredPanelDemo
 */

import { useRef , useState } from 'react' ;

import AnchoredPanel from '@/components/panels/AnchoredPanel' ;
import Popover       from '@/components/Popover' ;

import cn from '@/themes/helpers/cn' ;

/**
 * The fake colours.
 * @type {string[]}
 */
const COLOURS = [ 'Rouge' , 'Orange' , 'Jaune' , 'Vert' , 'Bleu' , 'Indigo' , 'Violet' , 'Noir' , 'Blanc' ] ;

/**
 * The fake sizes.
 * @type {string[]}
 */
const SIZES = [ 'XS' , 'S' , 'M' , 'L' , 'XL' ] ;

/**
 * The fake sort orders : enough of them to scroll.
 * @type {string[]}
 */
const SORTS = Array.from( { length : 24 } , ( _ , index ) => `Ordre n° ${ index + 1 }` ) ;

/**
 * One trigger of the bar.
 *
 * @param {Object}          props
 * @param {React.Ref}       props.anchorRef
 * @param {boolean}         props.active
 * @param {React.ReactNode} props.children
 * @param {Function}        props.onClick
 */
const Trigger = ( { anchorRef , active , children , onClick } ) =>
(
    <button
        ref       = { anchorRef }
        type      = "button"
        className = { cn( 'btn btn-sm' , active ? 'btn-primary' : 'btn-outline' ) }
        onClick   = { onClick }
    >
        { children }
    </button>
) ;

/**
 * One filter bar and its four panels, with its own state.
 */
const FilterBar = () =>
{
    const coloursRef = useRef( null ) ;
    const sizeRef    = useRef( null ) ;
    const sortRef    = useRef( null ) ;
    const moreRef    = useRef( null ) ;

    const [ open    , setOpen    ] = useState( null ) ;
    const [ colours , setColours ] = useState( [] ) ;
    const [ draft   , setDraft   ] = useState( [] ) ;
    const [ size    , setSize    ] = useState( null ) ;
    const [ sort    , setSort    ] = useState( SORTS[ 0 ] ) ;

    const toggle = ( id ) => setOpen( current => ( current === id ? null : id ) ) ;
    const close  = () => setOpen( null ) ;

    const openColours = () =>
    {
        setDraft( colours ) ;
        toggle( 'colours' ) ;
    } ;

    return (
        <>
            <div className="flex flex-wrap items-center gap-2">

                <Trigger active={ colours.length > 0 } anchorRef={ coloursRef } onClick={ openColours }>
                    Couleurs{ colours.length > 0 ? ` · ${ colours.length }` : '' }
                </Trigger>

                <Trigger active={ !!size } anchorRef={ sizeRef } onClick={ () => toggle( 'size' ) }>
                    Taille{ size ? ` · ${ size }` : '' }
                </Trigger>

                <Trigger active={ false } anchorRef={ sortRef } onClick={ () => toggle( 'sort' ) }>
                    Tri · { sort }
                </Trigger>

                <span className="flex-1" />

                <Trigger active={ false } anchorRef={ moreRef } onClick={ () => toggle( 'more' ) }>
                    Plus
                </Trigger>

            </div>

            <AnchoredPanel
                anchorRef   = { coloursRef }
                isOpen      = { open === 'colours' }
                onClose     = { close }
                panelHeight = { 380 }
                title       = "Couleurs"
                footer      = { ( { size : buttonSize } ) => (
                    <>
                        <button type="button" className={ cn( 'btn btn-ghost' , buttonSize ) } onClick={ () => setDraft( [] ) }>Effacer</button>
                        <button
                            type      = "button"
                            className = { cn( 'btn btn-primary' , buttonSize ) }
                            onClick   = { () => { setColours( draft ) ; close() ; } }
                        >
                            Appliquer
                        </button>
                    </>
                ) }
            >
                <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2">
                    { COLOURS.map( colour => (
                        <label key={ colour } className="flex cursor-pointer items-center gap-2 rounded-box px-2 py-1.5 text-sm hover:bg-base-200">
                            <input
                                checked   = { draft.includes( colour ) }
                                className = "checkbox checkbox-sm"
                                type      = "checkbox"
                                onChange  = { () => setDraft( list => ( list.includes( colour ) ? list.filter( item => item !== colour ) : [ ...list , colour ] ) ) }
                            />
                            { colour }
                        </label>
                    ) ) }
                </div>
            </AnchoredPanel>

            <AnchoredPanel
                anchorRef      = { sizeRef }
                isOpen         = { open === 'size' }
                onClose        = { close }
                panelClassName = "w-48"
                panelHeight    = { 240 }
                panelWidth     = { 192 }
                title          = "Taille"
                sheetFooter    = {
                    <div className="px-4 py-3">
                        <button type="button" className="btn btn-block" onClick={ close }>Fermer</button>
                    </div>
                }
            >
                <div className="flex flex-col gap-1 p-2">
                    { [ null , ...SIZES ].map( value => (
                        <button
                            key       = { value ?? 'all' }
                            type      = "button"
                            className = { cn( 'btn btn-ghost btn-sm justify-start' , value === size && 'btn-active' ) }
                            onClick   = { () => { setSize( value ) ; close() ; } }
                        >
                            { value ?? 'Toutes' }
                        </button>
                    ) ) }
                </div>
            </AnchoredPanel>

            <AnchoredPanel
                anchorRef   = { sortRef }
                isOpen      = { open === 'sort' }
                onClose     = { close }
                panelHeight = { 360 }
                title       = "Tri"
            >
                <div className="flex max-h-80 min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2">
                    { SORTS.map( value => (
                        <button
                            key       = { value }
                            type      = "button"
                            className = { cn( 'btn btn-ghost btn-sm justify-start' , value === sort && 'btn-active' ) }
                            onClick   = { () => { setSort( value ) ; close() ; } }
                        >
                            { value }
                        </button>
                    ) ) }
                </div>
            </AnchoredPanel>

            <Popover
                autoPosition
                anchorRef      = { moreRef }
                display        = "dropdown"
                isOpen         = { open === 'more' }
                onClose        = { close }
                panelClassName = "p-2"
                panelHeight    = { 120 }
                panelWidth     = { 208 }
            >
                <ul className="menu w-52 p-0">
                    <li><button type="button" onClick={ close }>Exporter</button></li>
                    <li><button type="button" onClick={ close }>Imprimer</button></li>
                    <li><button type="button" onClick={ close }>Partager</button></li>
                </ul>
            </Popover>
        </>
    ) ;
} ;

const AnchoredPanelDemo = () =>
(
    <div className="card bg-base-200 shadow-xl">
        <div className="card-body gap-4">

            <h2 className="card-title">AnchoredPanel</h2>

            <FilterBar />

            <p className="flex h-[70vh] items-center justify-center rounded-box border border-dashed border-base-300 p-6 text-center text-sm text-base-content/60">
                Faire défiler jusqu’à ce que la barre du bas touche le bas de l’écran : ses panneaux s’ouvrent vers le haut.
            </p>

            <FilterBar />

        </div>
    </div>
) ;

AnchoredPanelDemo.displayName = 'AnchoredPanelDemo' ;

export default AnchoredPanelDemo ;
