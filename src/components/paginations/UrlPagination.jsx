'use client' ;

/**
 * UrlPagination — a `Pagination` whose page lives in the URL.
 *
 * The list is rendered by the server from `?offset=`, so a page change is a
 * real navigation : the tree re-runs, the rows are fetched again. That is also
 * why this control, unlike one that only rewrites the address
 * ({@link module:hooks/useShallowParam}), **sends the page back to the top on
 * purpose** — a reader asking for page 4 of a full-page list wants its first
 * row, not the bottom of page 3.
 *
 * 🚨 **`scrollToTop={ false }` for a list that is a SECTION of its page** — a
 * block of activity on a record, a paginated panel, a demo : there the reader
 * is looking at the block, and sending the whole page to the top loses it. The
 * move is then marked in place ({@link module:helpers/routes/inPlaceNavigation})
 * so the shell's own scroll reset does not undo the favour — it reads any
 * change of address as a new page.
 *
 * ⚠️ **It joins the screen's shared transition when there is one**
 * ({@link module:contexts/busyNavigation/useBusyNavigation}) : a page change
 * then greys the TABLE too, rather than only this control. The spinner beside
 * the page label stays where it is either way. Outside a provider it owns a
 * private `useTransition`, and nothing changes.
 *
 * The page counter sits on the right of the row, the controls on the left.
 *
 * ⚠️ It reads `useSearchParams`, so a statically rendered page mounting it
 * wants a `Suspense` boundary above.
 *
 * @module components/paginations/UrlPagination
 *
 * @example
 * ```jsx
 * <UrlPagination limit={ limit } offset={ offset } total={ total } />
 *
 * // Two paginated lists on one page, each with its own parameter
 * <UrlPagination limit={ 20 } offset={ aOffset } offsetParam="aOffset" total={ aTotal } />
 * <UrlPagination limit={ 20 } offset={ rOffset } offsetParam="rOffset" total={ rTotal } />
 * ```
 */

import { useTransition } from 'react' ;

import { usePathname , useRouter , useSearchParams } from 'next/navigation' ;

import Loading    from '../Loading' ;
import Pagination from './Pagination' ;

import getPaginationData from '../helpers/getPaginationData' ;

import useBusyNavigation from '../../contexts/busyNavigation/useBusyNavigation' ;
import useI18n           from '../../contexts/locale/useI18n' ;

import { markInPlace } from '../../helpers/routes/inPlaceNavigation' ;

import { SCROLL_CONTAINER_CLASS } from '../../hooks/useResetScroll' ;

import cn from '../../themes/helpers/cn' ;

/**
 * The query parameter carrying the page's offset, by default.
 * @type {string}
 */
export const PAGINATION_OFFSET_PARAM = 'offset' ;

/**
 * The query parameter carrying the page size, by default.
 * @type {string}
 */
export const PAGINATION_LIMIT_PARAM = 'limit' ;

/**
 * Where the arrows, the page jump and the counter read their labels.
 * @type {string}
 */
export const PAGINATION_I18N_PATH = 'components.pagination' ;

/**
 * @param {Object}   props
 * @param {string}   [props.activeColor='info']        - Colour of the current page's button.
 * @param {boolean}  [props.alwaysSetLimit=false]      - Write `limit` in the URL on every page change. Otherwise an existing one is merely carried over, never added.
 * @param {string}   [props.className]                 - Additional class names for the row.
 * @param {string}   [props.color='ghost']             - Colour of the other buttons.
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'|false} [props.compactBelow='md'] - Breakpoint below which the controls fold into « prev / page / next ».
 * @param {boolean}  [props.disabled]                  - Disables the controls.
 * @param {'input'|'modal'} [props.jumpMode='input']   - The page-jump control of the compact layout.
 * @param {number}   props.limit                       - Items per page.
 * @param {string}   [props.limitParam='limit']        - The query parameter carrying the page size.
 * @param {number}   props.offset                      - Current offset.
 * @param {string}   [props.offsetParam='offset']      - The query parameter carrying the offset. Override it when two paginations share one page.
 * @param {number}   [props.pageOffset=2]              - Pages shown on either side of the current one.
 * @param {string}   [props.path='components.pagination'] - i18n path of the labels.
 * @param {ScrollBehavior} [props.scrollBehavior='auto'] - How the page goes back to the top. Instant by default : a page change swaps in a shorter render while the outgoing list is still mounted, so a smooth scroll would travel over unpainted space and show a white band. `'smooth'` only where the list's height does not change.
 * @param {string}   [props.scrollClassName='drawer-content'] - Class of the scroll container sent back to the top ; the document when there is none.
 * @param {boolean}  [props.scrollToTop=true]          - Send the page back to the top on a page change. `false` for a list that is a section of a longer page.
 * @param {boolean}  [props.showLabel=true]            - Shows the « Page n / m » counter.
 * @param {boolean}  [props.showLoading=true]          - Shows a spinner while the new page is on its way.
 * @param {number}   props.total                       - Total number of items.
 *
 * @returns {React.ReactElement|null}
 */
const UrlPagination =
({
    activeColor     = 'info' ,
    alwaysSetLimit  = false ,
    className ,
    color           = 'ghost' ,
    compactBelow    = 'md' ,
    disabled ,
    jumpMode        = 'input' ,
    limit ,
    limitParam      = PAGINATION_LIMIT_PARAM ,
    offset ,
    offsetParam     = PAGINATION_OFFSET_PARAM ,
    pageOffset      = 2 ,
    path            = PAGINATION_I18N_PATH ,
    scrollBehavior  = 'auto' ,
    scrollClassName = SCROLL_CONTAINER_CLASS ,
    scrollToTop     = true ,
    showLabel       = true ,
    showLoading     = true ,
    total ,
}) =>
{
    const [ isPending , startNavigation ] = useTransition() ;

    // When the screen owns a transition, this control feeds it instead of its
    // own : ONE pending state for the page, the criteria and the search, rather
    // than three that each grey a different button.
    const { busy , navigate } = useBusyNavigation() ;

    const shared  = typeof navigate === 'function' ;
    const pending = shared ? busy : isPending ;

    const pathname     = usePathname() ;
    const router       = useRouter() ;
    const searchParams = useSearchParams() ;

    const { page : pageLabel = 'Page' } = useI18n( path ) ;

    const { currentPage , pageCount } = getPaginationData( { limit , offset , pageOffset , total } ) ;

    // -------- Navigation

    const handleChange = newOffset =>
    {
        const params = new URLSearchParams( searchParams.toString() ) ;

        // The first page leaves the address bare rather than carrying an offset
        // of zero, which says nothing.
        if ( newOffset === 0 ) { params.delete( offsetParam ) ; }
        else                   { params.set( offsetParam , String( newOffset ) ) ; }

        if ( alwaysSetLimit ) { params.set( limitParam , String( limit ) ) ; }

        const query = params.toString() ;
        const href  = query ? `${ pathname }?${ query }` : pathname ;

        if ( scrollToTop )
        {
            const scrollTarget = document.querySelector( `.${ scrollClassName }` ) ?? document.documentElement ;

            scrollTarget.scrollTo( { top : 0 , behavior : scrollBehavior } ) ;
        }
        else
        {
            // Staying put has to be said to the shell too : without the mark its
            // own reset sends the page to the top a moment later.
            markInPlace( href ) ;
        }

        if ( shared )
        {
            navigate( href ) ;
            return ;
        }

        startNavigation( () => { router.push( href , { scroll : false } ) ; } ) ;
    } ;

    const isDisabled = disabled || pending ;

    // -------- Render

    return (
        <div className={ cn( 'flex w-full items-center justify-between gap-4' , className ) }>

            <Pagination
                activeColor  = { activeColor }
                className    = "justify-start"
                color        = { color }
                compactBelow = { compactBelow }
                disabled     = { isDisabled }
                jumpMode     = { jumpMode }
                limit        = { limit }
                offset       = { offset }
                pageOffset   = { pageOffset }
                path         = { path }
                total        = { total }
                onChange     = { handleChange }
            />

            { ( showLabel || showLoading ) &&
                <div className="flex shrink-0 items-center gap-3">

                    { showLoading && pending &&
                        <Loading animation="spinner" size="sm" />
                    }

                    { showLabel &&
                        <span className="text-sm text-base-content/50 tabular-nums">
                            { `${ pageLabel } ${ currentPage } / ${ pageCount }` }
                        </span>
                    }

                </div>
            }

        </div>
    ) ;
} ;

UrlPagination.displayName = 'UrlPagination' ;

export default UrlPagination ;
