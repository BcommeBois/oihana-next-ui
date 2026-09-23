'use client' ;

/**
 * ItemsLayoutDemo — one collection, three readings, and the card that goes
 * with them.
 *
 * Switch the display : the same items become a list of rows, a grid of cards
 * or a masonry, and `LinkCard` changes shape with them — the thumbnail moves
 * from the left of a row to the top of a card. The last item is
 * `navigable={ false }` : it is shown, it is not opened.
 *
 * The remove button is the one `ItemsLayout` gives each item ; « Restore »
 * puts the collection back.
 *
 * @module demo/layouts/ItemsLayoutDemo
 */

import { useState } from 'react' ;

import DisplayDropDown from '@/components/dropDowns/DisplayDropDown' ;
import ItemsLayout     from '@/components/layouts/ItemsLayout' ;
import LinkCard        from '@/components/links/LinkCard' ;

import Container from '@/display/Container' ;

/**
 * The collection — an imaginary gallery.
 * @type {Object[]}
 */
const ITEMS =
[
    { id : 'aurora'   , title : 'Aurore boréale'       , accent : '#6366f1' , seed : 401 } ,
    { id : 'dune'     , title : 'Dune au crépuscule'   , accent : '#f59e0b' , seed : 402 } ,
    { id : 'alley'    , title : 'Ruelle sous la pluie' , accent : '#0ea5e9' , seed : 403 } ,
    { id : 'bridge'   , title : 'Pont de fer'          , accent : '#64748b' , seed : 404 } ,
    { id : 'forest'   , title : 'Forêt de brume'       , accent : '#22c55e' , seed : 405 } ,
    { id : 'beacon'   , title : 'Phare au matin'       , locked : true      , seed : 406 } ,
] ;

/**
 * One item of the gallery.
 *
 * It receives its value under `item`, and everything `ItemsLayout` hands every
 * row : the display, the motion, the action, the loading hints.
 *
 * @param {Object} props
 * @param {Object} props.item
 */
const GalleryCard = ( { item , ...rest } ) =>
(
    <LinkCard
        { ...rest }
        accentColor = { item.accent }
        after       = {
            <span className="text-xs text-base-content/50">
                { item.locked ? 'Hors de portée' : '1920 × 1080' }
            </span>
        }
        href        = { `/lab/layout#${ item.id }` }
        imageUrl    = { `https://picsum.photos/480/360?random=${ item.seed }` }
        navigable   = { !item.locked }
        title       = { item.title }
    />
) ;

const ItemsLayoutDemo = () =>
{
    const [ display , setDisplay ] = useState( 'grid' ) ;
    const [ items , setItems ]     = useState( ITEMS ) ;

    const remove = item => setItems( current => current.filter( entry => entry.id !== item.id ) ) ;

    return (
        <Container className="flex flex-col gap-6 rounded-box bg-base-200/60 p-8" maxWidth="max-w-5xl">

            <div className="flex flex-wrap items-center justify-between gap-4">

                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl font-bold">ItemsLayout + LinkCard</h3>
                    <p className="text-sm text-base-content/60">
                        Une collection, un composant de ligne, trois dispositions. Le dernier élément
                        n'est pas navigable : même carte, sans lien ni survol.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="badge badge-neutral font-mono text-xs">{ display }</span>
                    <DisplayDropDown autoPosition value={ display } onChange={ setDisplay } />
                </div>

            </div>

            <ItemsLayout
                ItemComponent = { GalleryCard }
                columns       = { { xs : 1 , md : 2 , xl : 3 } }
                display       = { display }
                gap           = { 3 }
                items         = { items }
                onRemove      = { remove }
            />

            { items.length < ITEMS.length &&
                <button className="btn btn-sm btn-outline self-start" type="button" onClick={ () => setItems( ITEMS ) }>
                    Tout remettre
                </button>
            }

            <p className="text-xs text-base-content/40">
                🔑 <span className="font-mono">ItemComponent</span> est un composant, pas une fonction de
                rendu : une page rendue côté serveur peut nommer le composant de ses lignes, elle ne peut pas
                lui passer une fonction. <span className="font-mono">itemPropName</span> dit sous quel nom
                chaque ligne reçoit sa valeur — ici le défaut, <span className="font-mono">item</span>.
            </p>

        </Container>
    ) ;
} ;

export default ItemsLayoutDemo ;
