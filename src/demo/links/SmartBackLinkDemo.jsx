'use client' ;

/**
 * Demonstrates `BackLink smart` and the previous-path context that feeds it.
 *
 * Leave this page through one of the links below — the destinations carry a
 * query — then come back : the smart link's target is the page you left, query
 * included, while the plain one always points at the bare pathname.
 *
 * The second half shows the trail and `useOriginUrl` : this page is one record
 * of the Components section, and the origin link keeps pointing at the page
 * the reader came from outside it, however many sibling records were opened
 * since.
 *
 * @module demo/links/SmartBackLinkDemo
 */

import Link from 'next/link' ;

import BackLink          from '@/components/links/BackLink' ;
import useOriginUrl      from '@/contexts/previousPath/useOriginUrl' ;
import usePreviousPath   from '@/contexts/previousPath/usePreviousPath' ;
import resolveSmartHref  from '@/helpers/routes/resolveSmartHref' ;

/**
 * The page a smart link is declared to go back to.
 * @type {string}
 */
const HOME = '/components/headers' ;

/**
 * Where to go, so there is something to come back from.
 * @type {Array<{ href : string , label : string }>}
 */
const EXITS =
[
    { href : `${ HOME }?offset=40&sort=name` , label : 'Headers, page 3, sorted by name' } ,
    { href : `${ HOME }?offset=0&sort=date`  , label : 'Headers, page 1, sorted by date' } ,
    { href : '/components/tabs'                     , label : 'Tabs — another page entirely'    } ,
] ;

/**
 * The section this page is one record of — the scope `useOriginUrl` is read
 * against.
 * @type {string}
 */
const SECTION = '/components' ;

/**
 * Pages outside the section — the origins to come from.
 * @type {Array<{ href : string , label : string }>}
 */
const ORIGINS =
[
    { href : '/modules/kanban?view=compact'        , label : 'Modules › Kanban' } ,
    { href : '/modules/charts'                     , label : 'Modules › Charts' } ,
] ;

/**
 * Sibling records of the same section — skipped by the origin.
 * @type {Array<{ href : string , label : string }>}
 */
const SIBLINGS =
[
    { href : '/components/tabs'    , label : 'Components › Tabs' } ,
    { href : '/components/headers' , label : 'Components › Headers' } ,
] ;

const SmartBackLinkDemo = () =>
{
    const { previousUrl , trail } = usePreviousPath() ;

    const originUrl = useOriginUrl( SECTION ) ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">

                <h2 className="card-title text-2xl">Smart back link</h2>

                <p className="text-sm text-base-content/60">
                    Sortez par l'un des liens, puis revenez ici : le lien « smart » vise la page quittée
                    telle qu'elle était, sa requête comprise, alors que le lien simple vise toujours le
                    chemin nu.
                </p>

                <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-base-content/50">Page précédente</p>
                    <code className="text-sm">{ previousUrl ?? 'aucune — entrée directe' }</code>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-wide text-base-content/50">Sorties</p>
                    <div className="flex flex-wrap gap-3">
                        { EXITS.map( exit =>
                            <Link key={ exit.href } className="btn btn-sm btn-outline" href={ exit.href }>
                                { exit.label }
                            </Link>
                        ) }
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-mono text-base-content/50">{ `<BackLink smart href="${ HOME }" />` }</p>
                        <BackLink smart href={ HOME } label="Retour" />
                        <code className="text-xs text-base-content/60">{ resolveSmartHref( previousUrl , HOME ) }</code>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-mono text-base-content/50">{ `<BackLink href="${ HOME }" />` }</p>
                        <BackLink href={ HOME } label="Retour" />
                        <code className="text-xs text-base-content/60">{ HOME }</code>
                    </div>

                </div>

                <div className="divider my-0" />

                <h3 className="text-lg font-semibold">Origin of a record</h3>

                <p className="text-sm text-base-content/60">
                    Cette page est une fiche de la section « Components ». Entrez-y depuis une autre section, puis
                    passez par un ou deux onglets voisins avant de revenir par le menu : le lien d'origine vise
                    toujours la page d'où vous êtes entré dans la section, sa requête comprise. Chaque lien ajoute
                    une étape à la trace ; seul le bouton Retour du navigateur la raccourcit. Arrivé par la liste
                    elle-même, ou sans trace (onglet neuf, rechargement), le lien disparaît : un lien vers la liste
                    suffit alors.
                </p>

                <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-wide text-base-content/50">Origines</p>
                    <div className="flex flex-wrap gap-3">
                        { ORIGINS.map( origin =>
                            <Link key={ origin.href } className="btn btn-sm btn-outline" href={ origin.href }>
                                { origin.label }
                            </Link>
                        ) }
                    </div>
                    <p className="text-xs uppercase tracking-wide text-base-content/50">Fiches voisines</p>
                    <div className="flex flex-wrap gap-3">
                        { SIBLINGS.map( sibling =>
                            <Link key={ sibling.href } className="btn btn-sm btn-outline" href={ sibling.href }>
                                { sibling.label }
                            </Link>
                        ) }
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-base-content/50">Trace ({ trail.length })</p>
                    <code className="text-sm break-words">{ trail.length > 0 ? trail.join( '  →  ' ) : '—' }</code>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-xs font-mono text-base-content/50">{ `useOriginUrl( '${ SECTION }' )` }</p>
                    <code className="text-xs text-base-content/60">{ originUrl ?? 'null' }</code>
                    { originUrl
                        ? <BackLink href={ originUrl } label="Retour à la page d'origine" />
                        : <p className="text-sm text-base-content/50">Aucune origine hors de la section.</p>
                    }
                </div>

            </div>
        </div>
    ) ;
} ;

export default SmartBackLinkDemo ;
