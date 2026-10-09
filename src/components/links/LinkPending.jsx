'use client' ;

/**
 * LinkPending — what a link shows of its own navigation while it is pending :
 * a spinner in place of its children, the icon as a rule.
 *
 * It sits INSIDE a `next/link` and reads `useLinkStatus` — Next's own
 * account of that link's click, `pending` from the click to the first render
 * of the destination. Outside a link the status is idle, and the children
 * stand as they are.
 *
 * ⚠️ **How long it shows is Next's to decide, not ours.** The destination's
 * first render is its `loading.js` fallback when it has one — prefetched in
 * production — so on a well-covered route the spinner lives milliseconds.
 * It earns its keep on routes without a loading boundary, and in development,
 * where nothing is prefetched. Opt-in everywhere for that reason
 * (`pendingIndicator` on `Link`, `MenuLink`, `LinkTabs`, the navigation menu).
 *
 * @module components/links/LinkPending
 */

import { useLinkStatus } from 'next/link' ;

import Loading from '../Loading' ;

import { SPINNER } from '../../themes/components/loading' ;

/**
 * @param {Object}          [props]
 * @param {import('../../themes/components/loading').LoadingAnimation} [props.animation='spinner'] - The `Loading` animation drawn while pending : `spinner`, `ring`, `dots`, `bars`, `ball`, `infinity`.
 * @param {React.ReactNode} [props.children]  - What stands while the link is idle — the icon. Nothing : the indicator appears beside the label.
 * @param {string}          [props.className] - Classes for the indicator.
 * @param {import('../../themes/colors/textColor').TextColor} [props.color] - The indicator's colour ; left out, `primary`, as `Loading` does.
 * @param {import('../../themes/components/loading').LoadingSize} [props.size='xs'] - The indicator's size.
 *
 * @example
 * ```jsx
 * <NextLink href="/reports">
 *     <LinkPending><ReportIcon /></LinkPending>
 *     Reports
 * </NextLink>
 * ```
 */
/**
 * What a `pendingIndicator` prop hands to the indicator : `true` for the
 * defaults, or an object of `LinkPending` props — `{ animation : 'dots' }`.
 *
 * @param {boolean|Object} value
 * @returns {Object} The props, empty for `true`.
 *
 * @example
 * ```jsx
 * <LinkPending { ...pendingOptions( pendingIndicator ) }>{ icon }</LinkPending>
 * ```
 */
export const pendingOptions = ( value ) => ( value && typeof value === 'object' ) ? value : {} ;

const LinkPending = ( { animation = SPINNER , children , className , color , size = 'xs' } ) =>
{
    const { pending } = useLinkStatus() ;

    if ( pending )
    {
        return <Loading animation={ animation } className={ className } color={ color } size={ size } /> ;
    }

    return children ?? null ;
} ;

LinkPending.displayName = 'LinkPending' ;

export default LinkPending ;
