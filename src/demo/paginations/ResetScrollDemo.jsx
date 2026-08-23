'use client' ;

/**
 * `useResetScroll` demo — which query parameters move the page, and which do not.
 *
 * It lives on the pagination page because that is the case the hook was
 * written for : a list going to page four belongs at the top of page four.
 * The other half of the rule is what this shows beside it — a control that
 * swaps one card in place writes a parameter too, and sending the reader back
 * to the top is the one thing nobody asked for.
 *
 * 🚨 **The ignore list belongs to the shell, and this page cannot set it.**
 * `useResetScroll` is mounted by the `Drawer` — here through `Application` →
 * `Dashboard` — because the drawer owns the scroll container. Mounting a
 * second instance from a page changes nothing : the shell's copy still fires
 * and still scrolls `.drawer-content`. So `preview` is declared once, in
 * `@configs/ui/dashboard.js`, and this card only exercises it.
 *
 * @module demo/paginations/ResetScrollDemo
 */

import { Suspense } from 'react' ;

import Link from 'next/link' ;

import { useSearchParams } from 'next/navigation' ;

import Container from '@/display/Container' ;

/**
 * The parameter that swaps a card in place — ignored.
 * @type {string}
 */
const PREVIEW = 'preview' ;

/**
 * The parameter that moves the reader to another page — not ignored.
 * @type {string}
 */
const PAGE = 'page' ;

/**
 * Tall enough that the controls sit below the fold, which is the whole point :
 * a reset that happens while the page is already at the top shows nothing.
 *
 * Built as lines rather than counted in the JSX so each one is its own key —
 * a filler never reorders, but an index key is a habit worth not having.
 *
 * @type {string[]}
 */
const FILLER = Array.from( { length : 24 } , ( _ , index ) => `Ligne ${ index + 1 } — de quoi faire défiler.` ) ;

/**
 * Builds a href with one parameter set, the rest left alone.
 *
 * @param {URLSearchParams} searchParams - The current query string.
 * @param {string} key - The parameter to write.
 * @param {number|string} value - Its new value.
 * @returns {string} The href.
 */
const hrefWith = ( searchParams , key , value ) =>
{
    const next = new URLSearchParams( searchParams?.toString() ?? '' ) ;

    next.set( key , String( value ) ) ;

    return `?${ next.toString() }` ;
} ;

const Panel = () =>
{
    const searchParams = useSearchParams() ;

    const preview = searchParams.get( PREVIEW ) ?? '1' ;
    const page    = searchParams.get( PAGE ) ?? '1' ;

    const button = 'btn btn-sm' ;

    return (
        <Container className="flex flex-col gap-6" maxWidth="max-w-4xl">

            <div>
                <h3 className="text-lg font-semibold">useResetScroll — les paramètres qui ne déplacent pas la page</h3>
                <p className="text-sm text-base-content/60">
                    Descends jusqu'aux boutons, puis compare. <code>?preview=</code> est dans la liste <code>ignore</code>
                    du shell — déclarée une fois dans <code>@configs/ui/dashboard.js</code>, parce que c'est le tiroir
                    qui possède le conteneur de défilement : la page ne doit pas bouger. <code>?page=</code> n'y est pas :
                    elle doit remonter en haut. Les deux liens passent <code>scroll={ 'false' }</code>, donc ce qu'on
                    observe est bien le hook et pas Next.
                </p>
            </div>

            <div className="flex flex-col gap-1 rounded-box bg-base-200/60 p-4 text-sm">
                { FILLER.map( line => (
                    <p className="text-base-content/40" key={ line }>{ line }</p>
                ) ) }
            </div>

            <div className="flex flex-wrap items-center gap-6">

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">preview = { preview }</span>
                    <Link className={ button } href={ hrefWith( searchParams , PREVIEW , Number( preview ) + 1 ) } scroll={ false }>
                        Suivant — ignoré
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">page = { page }</span>
                    <Link className={ button } href={ hrefWith( searchParams , PAGE , Number( page ) + 1 ) } scroll={ false }>
                        Suivant — remonte
                    </Link>
                </div>

            </div>

        </Container>
    ) ;
} ;

/**
 * `useResetScroll` demo.
 *
 * `useSearchParams` opts a statically rendered page out of prerendering unless
 * it sits under a boundary, so the panel is wrapped rather than the page.
 */
const ResetScrollDemo = () => (
    <Suspense fallback={ null }>
        <Panel />
    </Suspense>
) ;

export default ResetScrollDemo ;
