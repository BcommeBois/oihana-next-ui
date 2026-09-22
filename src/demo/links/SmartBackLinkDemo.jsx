'use client' ;

/**
 * Demonstrates `BackLink smart` and the previous-path context that feeds it.
 *
 * Leave this page through one of the links below — the destinations carry a
 * query — then come back : the smart link's target is the page you left, query
 * included, while the plain one always points at the bare pathname.
 *
 * @module demo/links/SmartBackLinkDemo
 */

import Link from 'next/link' ;

import BackLink          from '@/components/links/BackLink' ;
import usePreviousPath   from '@/contexts/previousPath/usePreviousPath' ;
import resolveSmartHref  from '@/helpers/routes/resolveSmartHref' ;

/**
 * The page a smart link is declared to go back to.
 * @type {string}
 */
const HOME = '/lab/headers' ;

/**
 * Where to go, so there is something to come back from.
 * @type {Array<{ href : string , label : string }>}
 */
const EXITS =
[
    { href : `${ HOME }?offset=40&sort=name` , label : 'Headers, page 3, sorted by name' } ,
    { href : `${ HOME }?offset=0&sort=date`  , label : 'Headers, page 1, sorted by date' } ,
    { href : '/lab/tabs'                     , label : 'Tabs — another page entirely'    } ,
] ;

const SmartBackLinkDemo = () =>
{
    const { previousUrl } = usePreviousPath() ;

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

            </div>
        </div>
    ) ;
} ;

export default SmartBackLinkDemo ;
