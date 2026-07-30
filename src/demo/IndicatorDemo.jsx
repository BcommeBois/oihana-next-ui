'use client' ;

import { useState } from 'react' ;

import Badge     from '@/components/Badge' ;
import Button    from '@/components/Button' ;
import Indicator , { IndicatorItem } from '@/components/Indicator' ;

import Container from '@/display/Container' ;

import { alignments , positions } from '@/themes/components/indicator' ;

import { MdShoppingCart as CartIcon } from 'react-icons/md' ;

const Box = ({ children = 'contenu' }) =>
(
    <div className="grid h-20 w-28 place-items-center rounded-box bg-base-300 text-sm">
        { children }
    </div>
) ;

Box.displayName = 'Box' ;

/**
 * The nine align × position combinations, so the defaults (`end` / `top`) can be
 * checked against every other corner at a glance.
 */
const PlacementSection = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Placements</h2>

            <p className="text-sm text-base-content/70">
                Trois alignements horizontaux × trois positions verticales. Le défaut est
                <code className="badge badge-sm">end</code> / <code className="badge badge-sm">top</code>,
                soit le coin haut-droit.
            </p>

            <div className="flex flex-col gap-6">
                { positions.map( position =>
                (
                    <div key={ position } className="flex flex-wrap items-center gap-8">

                        <span className="w-20 text-sm font-semibold">{ position }</span>

                        { alignments.map( align =>
                        (
                            <div key={ align } className="flex flex-col items-center gap-2">
                                <Indicator
                                    align    = { align }
                                    item     = { <Badge color="secondary">8</Badge> }
                                    position = { position }
                                >
                                    <Box />
                                </Indicator>
                                <span className="text-xs text-base-content/60">{ align }</span>
                            </div>
                        ) ) }

                    </div>
                ) ) }
            </div>

        </Container>
    ) ;
} ;

PlacementSection.displayName = 'PlacementSection' ;

/**
 * The case the lot was built for — and the one where the empty state matters.
 */
const CartSection = () =>
{
    const [ count , setCount ] = useState( 3 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Compteur de panier</h2>

            <p className="text-sm text-base-content/70">
                Descends le compteur à zéro : la pastille disparaît entièrement au lieu
                d'afficher un « 0 ». C'est le comportement d'un <code className="badge badge-sm">item</code> falsy —
                aucun <code className="badge badge-sm">indicator-item</code> n'est émis.
            </p>

            <div className="flex flex-wrap items-center gap-6">

                <div className="flex items-center gap-2">
                    <Button size="sm" style="outline" onClick={ () => setCount( n => Math.max( 0 , n - 1 ) ) }>
                        −
                    </Button>
                    <Badge color="neutral">{ count }</Badge>
                    <Button size="sm" style="outline" onClick={ () => setCount( n => n + 1 ) }>
                        +
                    </Button>
                </div>

                <Indicator item={ count > 0 && <Badge color="secondary" aria-hidden>{ count }</Badge> }>
                    <Button color="primary" aria-label={ `Panier, ${ count } article${ count > 1 ? 's' : '' }` }>
                        <CartIcon size={ 18 } />
                        Panier
                    </Button>
                </Indicator>

            </div>

            <p className="text-xs text-base-content/60">
                Montage accessible retenu ici : le bouton porte le nom complet
                (<code className="badge badge-sm">aria-label</code>) et la pastille est
                <code className="badge badge-sm">aria-hidden</code> — sans quoi un lecteur d'écran
                annoncerait « 3 » avant « Panier », le chiffre seul ne voulant rien dire.
            </p>

        </Container>
    ) ;
} ;

CartSection.displayName = 'CartSection' ;

/**
 * Several items on the same container — the reason the placement modifiers live on the
 * item rather than on the container.
 */
const MultipleSection = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Plusieurs pastilles</h2>

            <p className="text-sm text-base-content/70">
                Les modificateurs de placement portent sur l'item, donc un même conteneur
                peut en ancrer plusieurs à des coins différents. On passe alors des
                <code className="badge badge-sm">IndicatorItem</code> en enfants plutôt que la
                prop <code className="badge badge-sm">item</code>.
            </p>

            <Indicator>
                <IndicatorItem align="start">
                    <Badge color="error">!</Badge>
                </IndicatorItem>

                <IndicatorItem align="end">
                    <Badge color="info">12</Badge>
                </IndicatorItem>

                <IndicatorItem align="center" position="bottom">
                    <Badge color="success">à jour</Badge>
                </IndicatorItem>

                <div className="grid h-32 w-52 place-items-center rounded-box bg-base-300 text-sm">
                    trois pastilles
                </div>
            </Indicator>

        </Container>
    ) ;
} ;

MultipleSection.displayName = 'MultipleSection' ;

/**
 * The integration trap : the container hugs its child, so a full-width control shrinks
 * unless the width is restated.
 */
const WidthSection = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Largeur</h2>

            <p className="text-sm text-base-content/70">
                Le conteneur est <code className="badge badge-sm">inline-flex</code> en
                <code className="badge badge-sm">width: max-content</code> : il se colle à son
                enfant. Envelopper un contrôle pleine largeur le rétrécit, sauf à redonner la
                largeur au conteneur.
            </p>

            <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                    <Badge color="warning">sans largeur — le bouton se rétrécit</Badge>
                    <Indicator item={ <Badge color="secondary">3</Badge> }>
                        <Button color="primary" className="w-full">Valider</Button>
                    </Indicator>
                </div>

                <div className="flex flex-col gap-2">
                    <Badge color="success">{ `className="w-full" sur le conteneur` }</Badge>
                    <Indicator className="w-full" item={ <Badge color="secondary">3</Badge> }>
                        <Button color="primary" className="w-full">Valider</Button>
                    </Indicator>
                </div>

            </div>

        </Container>
    ) ;
} ;

WidthSection.displayName = 'WidthSection' ;

/**
 * Demo: `Indicator` — anchors a floating item on a corner of its content.
 *
 * @returns {React.JSX.Element}
 */
const IndicatorDemo = () =>
{
    return (
        <>
            <PlacementSection />
            <CartSection />
            <MultipleSection />
            <WidthSection />
        </>
    ) ;
} ;

IndicatorDemo.displayName = 'IndicatorDemo' ;

export default IndicatorDemo ;
