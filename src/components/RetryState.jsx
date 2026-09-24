'use client' ;

/**
 * RetryState — what a block shows when what it had to read could not be read.
 *
 * 🔑 **A failure and an absence are different sentences, and this is the one
 * that keeps them apart.** Served as an empty list, a failed read says « there
 * is nothing here » — a statement about the subject, invented out of a network
 * problem. A block that failed says so instead, and offers the only useful
 * next move : ask again.
 *
 * Without `onRetry` it re-runs the server components at the SAME url, inside a
 * transition : the page keeps every piece of url state it was carrying — the
 * year being read, the filters, the page — and the button stays busy until the
 * new render lands. A screen that fetches its own data passes `onRetry`
 * instead.
 *
 * It is an {@link module:components/EmptyState} underneath, announced as a
 * live status so a reader who is not looking at that corner is told.
 *
 * @module components/RetryState
 *
 * @example
 * ```jsx
 * // Server components : the refresh is the retry.
 * { failed && <RetryState path="app.dashboard" /> }
 *
 * // A screen that fetches for itself.
 * <RetryState onRetry={ reload } title="Could not load the report" />
 * ```
 */

import { useTransition } from 'react' ;

import { useRouter } from 'next/navigation' ;

import { MdCloudOff } from 'react-icons/md' ;

import NO_LOCALE from '../contexts/locale/noLocale' ;
import useI18n   from '../contexts/locale/useI18n' ;

import RefreshButton from './buttons/RefreshButton' ;
import EmptyState    from './EmptyState' ;

/**
 * Where the block reads its two sentences when the host names no bundle.
 * @type {string}
 */
export const RETRY_I18N_PATH = 'components.retry' ;

/**
 * @param {Object}   props
 * @param {React.ReactNode} [props.children]    - Free content, between the description and the button.
 * @param {string}   [props.className]          - Additional class names for the block.
 * @param {React.ReactNode} [props.description] - The explanation. Read from the bundle when absent.
 * @param {React.ReactNode} [props.icon]        - Replaces the default glyph.
 * @param {Function} [props.onRetry]            - What the button does. Without it, the page is refreshed.
 * @param {string}   [props.path='components.retry'] - i18n path holding `description` and `title`. The button names itself from `components.buttons.refresh`.
 * @param {boolean}  [props.showRetry=true]     - Whether the button is offered at all — a failure nobody can act on still has to be said.
 * @param {import('../themes/components/emptyState').EmptyStateSize} [props.size='lg']
 * @param {React.ReactNode} [props.title]       - The message. Read from the bundle when absent.
 */
const RetryState =
({
    children ,
    className ,
    description ,
    icon ,
    onRetry ,
    path = RETRY_I18N_PATH ,
    showRetry = true ,
    size = 'lg' ,
    title ,
}) =>
{
    const copy = useI18n( path , NO_LOCALE , false ) ;

    const router = useRouter() ;

    const [ busy , start ] = useTransition() ;

    const retry = () => start( () =>
    {
        if ( onRetry ) { onRetry() ; return ; }
        router.refresh() ;
    } ) ;

    return (
        <EmptyState
            actions = { showRetry && (
                <RefreshButton
                    busy    = { busy }
                    color   = "ghost"
                    onClick = { retry }
                    size    = "sm"
                />
            ) }
            announce
            className   = { className }
            description = { description ?? copy.description ?? 'What this block needed could not be read.' }
            icon        = { icon ?? <MdCloudOff /> }
            size        = { size }
            title       = { title ?? copy.title ?? 'Unavailable' }
        >
            { children }
        </EmptyState>
    ) ;
} ;

RetryState.displayName = 'RetryState' ;

export default RetryState ;
