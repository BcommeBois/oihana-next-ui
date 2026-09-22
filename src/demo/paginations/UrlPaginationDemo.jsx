'use client' ;

/**
 * UrlPaginationDemo — `UrlPagination` on this very page : the page lives in the
 * address bar.
 *
 * Move through the pages : `?labOffset=` follows, the counter on the right
 * follows, and the browser's Back button walks the pages backwards — which is
 * the whole point of putting a page in the URL rather than in a state.
 *
 * Both rows carry `scrollToTop={ false }` : here the pagination is a section of
 * a longer page, and sending the whole page to the top would lose the very
 * thing being looked at. A full-page list keeps the default — page 3 then opens
 * on its first row.
 *
 * The second row shows the same control stripped of its counter and folded
 * early (`compactBelow="lg"`), on its own parameter : two paginated lists can
 * share a page as long as they do not share a name.
 *
 * @module demo/paginations/UrlPaginationDemo
 */

import { useSearchParams } from 'next/navigation' ;

import UrlPagination from '@/components/paginations/UrlPagination' ;

import Container from '@/display/Container' ;

/**
 * The parameters this demo writes — its own, so it never fights another one.
 * @type {string}
 */
const OFFSET_PARAM = 'labOffset' ;
const SECOND_PARAM = 'labSecondOffset' ;

/**
 * How many rows there are, and how many are shown at a time.
 * @type {number}
 */
const TOTAL = 137 ;
const LIMIT = 10 ;

/**
 * Reads an offset out of the address bar.
 *
 * @param {URLSearchParams} params
 * @param {string} name
 * @returns {number}
 */
const offsetOf = ( params , name ) =>
{
    const raw = Number.parseInt( params.get( name ) ?? '0' , 10 ) ;
    return Number.isFinite( raw ) && raw > 0 ? raw : 0 ;
} ;

const UrlPaginationDemo = () =>
{
    const searchParams = useSearchParams() ;

    const offset = offsetOf( searchParams , OFFSET_PARAM ) ;
    const second = offsetOf( searchParams , SECOND_PARAM ) ;

    const rows = Array.from
    (
        { length : Math.min( LIMIT , Math.max( 0 , TOTAL - offset ) ) } ,
        ( _ , index ) => offset + index + 1 ,
    ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-4xl">

            <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold">UrlPagination</h3>
                <p className="text-sm text-base-content/60">
                    La page vit dans l'adresse : elle se partage, et le bouton Précédent du navigateur la
                    remonte. Le compteur et le témoin de chargement sont à droite.
                </p>
            </div>

            <UrlPagination
                limit       = { LIMIT }
                offset      = { offset }
                offsetParam = { OFFSET_PARAM }
                scrollToTop = { false }
                total       = { TOTAL }
            />

            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                { rows.map( row =>
                    <li key={ row } className="rounded-box bg-base-100 px-3 py-2 text-center text-sm tabular-nums">
                        { row }
                    </li>
                ) }
            </ul>

            <div className="flex flex-col gap-2">
                <p className="text-xs font-mono text-base-content/50">
                    { 'compactBelow="lg" showLabel={ false } scrollToTop={ false }' }
                </p>
                <UrlPagination
                    compactBelow = "lg"
                    limit        = { LIMIT }
                    offset       = { second }
                    offsetParam  = { SECOND_PARAM }
                    scrollToTop  = { false }
                    showLabel    = { false }
                    total        = { TOTAL }
                />
            </div>

            <p className="text-xs text-base-content/40">
                🚨 Par défaut, changer de page remonte volontairement la vue en haut : une liste pleine page
                doit s'ouvrir sur sa première ligne. Ici les deux barres portent
                <span className="font-mono"> scrollToTop={ '{ false }' } </span>, parce qu'une pagination posée
                au milieu d'une page ferait perdre au lecteur ce qu'il regarde.
            </p>

        </Container>
    ) ;
} ;

export default UrlPaginationDemo ;
