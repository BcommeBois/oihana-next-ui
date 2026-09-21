'use client' ;

/**
 * Two ways a control writes to the URL, side by side.
 *
 * - `useShallowParam` for a parameter the server does not read : the address
 *   bar changes, nothing is fetched, and the history gains no entry — the
 *   value is REPLACED, so Back leaves the page rather than stepping through
 *   every sort the reader tried.
 * - `BusyNavigationProvider` + `BusySurface` for a navigation that does reload
 *   the page : one shared transition, and the data greys out for at least the
 *   provider's floor instead of flickering.
 *
 * The navigation writes `preview`, which the lab's shell is told not to scroll
 * for (`@configs/ui/dashboard.js`), so the card stays under the pointer.
 *
 * @module demo/paginations/ShallowParamDemo
 */

import { Suspense } from 'react' ;

import { useSearchParams } from 'next/navigation' ;

import Button                 from '@/components/Button' ;
import BusySurface            from '@/components/BusySurface' ;
import BusyNavigationProvider from '@/contexts/busyNavigation/provider' ;
import useBusyNavigation      from '@/contexts/busyNavigation/useBusyNavigation' ;
import Container              from '@/display/Container' ;
import useShallowParam        from '@/hooks/useShallowParam' ;

/**
 * Rows the shallow sort works on — already in memory, which is the point.
 * @type {Array<{ name: string , date: string }>}
 */
const ROWS =
[
    { name : 'Cedar'  , date : '2026-03-02' } ,
    { name : 'Alder'  , date : '2026-01-15' } ,
    { name : 'Birch'  , date : '2026-02-20' } ,
    { name : 'Douglas', date : '2025-12-01' } ,
] ;

/**
 * The shallow sort : no request, the URL still carries the choice.
 *
 * @returns {React.ReactElement}
 */
const ShallowSort = () =>
{
    const [ sort , setSort ] = useShallowParam( 'sort' , 'name' ) ;

    const rows = [ ...ROWS ].sort( ( a , b ) => a[ sort ]?.localeCompare?.( b[ sort ] ) ?? 0 ) ;

    return (
        <div className="flex flex-col gap-3">
            <div className="join">
                { [ 'name' , 'date' ].map( key => (
                    <button
                        key       = { key }
                        className = { `btn btn-sm join-item ${ sort === key ? 'btn-primary' : '' }` }
                        onClick   = { () => setSort( key ) }
                        type      = "button"
                    >
                        { key }
                    </button>
                ) ) }
            </div>
            <ul className="list-disc ps-6 text-sm">
                { rows.map( row => <li key={ row.name }>{ row.name } — { row.date }</li> ) }
            </ul>
        </div>
    ) ;
} ;

/**
 * A control that reloads the page through the shared transition.
 *
 * @returns {React.ReactElement}
 */
const PreviewStepper = () =>
{
    const { busy , navigate } = useBusyNavigation() ;

    const current = Number( useSearchParams().get( 'preview' ) ?? 0 ) ;

    return (
        <Button
            color   = "neutral"
            loading = { busy }
            onClick = { () => navigate( `?preview=${ current + 1 }` ) }
        >
            Page suivante (preview = { current + 1 })
        </Button>
    ) ;
} ;

/**
 * What the navigation reloads.
 *
 * @returns {React.ReactElement}
 */
const PreviewValue = () =>
{
    const current = useSearchParams().get( 'preview' ) ?? '0' ;

    return <p className="text-sm">Donnée affichée pour <code>preview = { current }</code>.</p> ;
} ;

const ShallowParamDemo = () => (
    <Container maxWidth="max-w-4xl">
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">

                <h2 className="card-title">Paramètre superficiel et surface occupée</h2>

                <section className="flex flex-col gap-2">
                    <h3 className="font-semibold">useShallowParam</h3>
                    <p className="text-sm text-base-content/70">
                        Le tri s&apos;écrit dans l&apos;adresse (<code>?sort=…</code>) sans aucune requête, et
                        remplace l&apos;entrée d&apos;historique : Précédent quitte la page au lieu de rejouer chaque
                        tri essayé. Rechargez : le tri choisi est conservé.
                    </p>
                    <ShallowSort />
                </section>

                <section className="flex flex-col gap-2">
                    <h3 className="font-semibold">BusyNavigationProvider + BusySurface</h3>
                    <p className="text-sm text-base-content/70">
                        La navigation passe par la transition partagée : la surface se grise au moins 0,4 s et
                        ne prend plus les clics.
                    </p>
                    <Suspense fallback={ null }>
                        <BusyNavigationProvider>
                            <PreviewStepper />
                            <BusySurface className="rounded-box border border-base-300 p-4">
                                <PreviewValue />
                            </BusySurface>
                        </BusyNavigationProvider>
                    </Suspense>
                </section>

            </div>
        </div>
    </Container>
) ;

ShallowParamDemo.displayName = 'ShallowParamDemo' ;

export default ShallowParamDemo ;
