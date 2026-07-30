'use client' ;

import { useMemo , useState } from 'react' ;

import Badge      from '@/components/Badge' ;
import Button     from '@/components/Button' ;
import Card       from '@/components/Card' ;
import EmptyState from '@/components/EmptyState' ;
import Input      from '@/components/inputs/Input' ;

import Container from '@/display/Container' ;

import { sizes } from '@/themes/components/emptyState' ;

import
{
    MdAdd          as AddIcon ,
    MdFilterAltOff as ResetIcon ,
    MdInbox        as InboxIcon ,
    MdSearchOff    as NoResultIcon ,
}
from 'react-icons/md' ;

const INVOICES =
[
    'Atelier Kervadec' ,
    'Studio Marguerite' ,
    'Brasserie du Port' ,
    'Librairie Oihana' ,
    'Camping Les Pins' ,
    'Menuiserie Etchart' ,
] ;

const AnatomySection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Anatomie</h2>

        <p className="text-sm text-base-content/70">
            Quatre emplacements — <code className="badge badge-sm">icon</code>,
            <code className="badge badge-sm">title</code>,
            <code className="badge badge-sm">description</code>,
            <code className="badge badge-sm">actions</code> — tous facultatifs. L'icône est
            décorative : elle est masquée aux technologies d'assistance, puisqu'elle ne fait
            que redire le titre.
        </p>

        <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-box border border-base-300 bg-base-100">
                <EmptyState
                    icon        = { <InboxIcon /> }
                    title       = "Aucune facture"
                    description = "Les factures que tu émets apparaîtront ici, la plus récente en tête."
                    actions     = {
                        <Button color="primary">
                            <AddIcon size={ 18 } />
                            Créer une facture
                        </Button>
                    }
                />
            </div>

            <div className="rounded-box border border-base-300 bg-base-100">
                <EmptyState title="Aucune facture" />
            </div>

        </div>

        <p className="text-xs text-base-content/60">
            À droite, le strict minimum. Le titre sort en
            <code className="badge badge-sm">p</code> et non en titre de section : un état vide
            est un message de statut, pas une partie du plan du document. Un
            <code className="badge badge-sm">h2</code> par défaut polluerait la hiérarchie de
            toute page portant une liste — <code className="badge badge-sm">titleAs</code> est là
            pour les cas où l'état vide occupe réellement une région.
        </p>

    </Container>
) ;

AnatomySection.displayName = 'AnatomySection' ;

const SizeSection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Tailles</h2>

        <p className="text-sm text-base-content/70">
            L'échelle joue sur la respiration verticale et la taille de l'icône, pas sur le
            texte. Un état vide logé dans un panneau latéral ou une cellule de tableau ne peut
            pas prendre la place qu'il occuperait en pleine page.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
            { sizes.map( size =>
            (
                <div key={ size } className="rounded-box border border-base-300 bg-base-100">
                    <EmptyState
                        icon        = { <InboxIcon /> }
                        size        = { size }
                        title       = { `size="${ size }"` }
                        description = "Aucun élément pour l'instant."
                    />
                </div>
            ) ) }
        </div>

        <p className="text-sm text-base-content/70">
            Dans un conteneur contraint, <code className="badge badge-sm">sm</code> est le bon
            réglage — ici au sein d'une <code className="badge badge-sm">Card</code> :
        </p>

        <Card className="w-full max-w-sm bg-base-100 shadow-sm" title="Panier">
            <EmptyState
                size    = "sm"
                icon    = { <InboxIcon /> }
                title   = "Panier vide"
                actions = { <Button size="sm" style="outline">Voir le catalogue</Button> }
            />
        </Card>

    </Container>
) ;

SizeSection.displayName = 'SizeSection' ;

/**
 * The case that justifies `announce` : the empty state is a *consequence* of what the
 * user just typed, so it has to be spoken.
 */
const SearchSection = () =>
{
    const [ query , setQuery ] = useState( '' ) ;

    const results = useMemo( () =>
    {
        const needle = query.trim().toLowerCase() ;

        if ( needle === '' )
        {
            return INVOICES ;
        }

        return INVOICES.filter( name => name.toLowerCase().includes( needle ) ) ;
    }
    , [ query ] ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Recherche sans résultat</h2>

            <p className="text-sm text-base-content/70">
                Tape quelque chose qui ne correspond à rien — « zzz » par exemple. L'état vide
                qui apparaît porte ici <code className="badge badge-sm">announce</code>, parce
                qu'il est la <strong>conséquence</strong> d'une action : sans
                <code className="badge badge-sm">role="status"</code>, un lecteur d'écran ne dirait
                rien du tout et l'utilisateur taperait sans le moindre retour.
            </p>

            <div className="flex flex-col gap-4 rounded-box border border-base-300 bg-base-100 p-4">

                <div className="flex flex-wrap items-center gap-2">
                    <Input
                        className   = "grow"
                        placeholder = "Filtrer par client…"
                        value       = { query }
                        onChange    = { value => setQuery( value ) }
                    />
                    <Badge color={ results.length > 0 ? 'primary' : 'warning' }>
                        { results.length } résultat{ results.length > 1 ? 's' : '' }
                    </Badge>
                </div>

                { results.length > 0 ? (
                    <ul className="divide-y divide-base-300/60">
                        { results.map( name =>
                        (
                            <li key={ name } className="py-2 text-sm">{ name }</li>
                        ) ) }
                    </ul>
                ) : (
                    <EmptyState
                        announce
                        icon        = { <NoResultIcon /> }
                        title       = "Aucun résultat"
                        description = { `Rien ne correspond à « ${ query.trim() } ».` }
                        actions     = {
                            <Button style="outline" onClick={ () => setQuery( '' ) }>
                                <ResetIcon size={ 18 } />
                                Réinitialiser le filtre
                            </Button>
                        }
                    />
                ) }

            </div>

            <p className="text-xs text-base-content/60">
                Le premier état vide d'une liste qui n'a simplement encore rien — celui de la
                section « Anatomie » — n'a lui aucun <code className="badge badge-sm">announce</code> :
                l'annoncer au chargement serait du bruit, pas de l'information.
            </p>

        </Container>
    ) ;
} ;

SearchSection.displayName = 'SearchSection' ;

/**
 * Demo: `EmptyState` — the placeholder shown where content would be.
 *
 * @returns {React.JSX.Element}
 */
const EmptyStateDemo = () =>
{
    return (
        <>
            <AnatomySection />
            <SizeSection />
            <SearchSection />
        </>
    ) ;
} ;

EmptyStateDemo.displayName = 'EmptyStateDemo' ;

export default EmptyStateDemo ;
