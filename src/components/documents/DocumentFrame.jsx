'use client' ;

/**
 * DocumentFrame — the frame around a document : its content when there is
 * one, and otherwise what to say instead.
 *
 * The `ChartFrame` and `MapFrame` of the documents : four states that every
 * viewer needs and none should write twice — **loading** (a spinner and a
 * sentence), **failed** (a `RetryState` with the reason and a way back),
 * **empty** (no document at all), and **missing** (the engine is not
 * installed : the frame says so, and offers what the host gives as `actions`,
 * typically a link that opens the file in a tab, which needs no engine).
 *
 * The words are read from `components.document`, and each state takes a
 * label of its own when the screen says it differently.
 *
 * @module components/documents/DocumentFrame
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.actions] - A way out shown with the empty and missing states.
 * @param {React.ReactNode} [props.children] - The document.
 * @param {string} [props.className] - Additional classes on the frame.
 * @param {boolean} [props.empty=false] - There is no document to show.
 * @param {React.ReactNode} [props.emptyLabel] - Title of the empty state.
 * @param {?Error|boolean} [props.error=null] - The document could not be opened ; an `Error` adds its message.
 * @param {React.ReactNode} [props.errorLabel] - Title of the failed state.
 * @param {boolean} [props.loading=false] - The document is on its way.
 * @param {React.ReactNode} [props.loadingLabel] - What the loading state says.
 * @param {boolean} [props.missing=false] - The engine is not installed.
 * @param {React.ReactNode} [props.missingLabel] - Title of the missing state.
 * @param {Function} [props.onRetry] - What the failed state's button does.
 * @param {string} [props.path='components.document'] - i18n path the labels are read from.
 * @param {React.Ref} [props.ref] - Forwarded to the frame.
 */

import { MdPictureAsPdf } from 'react-icons/md' ;

import EmptyState from '../EmptyState' ;
import Loading    from '../Loading' ;
import RetryState from '../RetryState' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import cn from '../../themes/helpers/cn' ;

const DocumentFrame =
({
    actions ,
    children ,
    className ,
    empty = false ,
    emptyLabel ,
    error = null ,
    errorLabel ,
    loading = false ,
    loadingLabel ,
    missing = false ,
    missingLabel ,
    onRetry ,
    path = 'components.document' ,
    ref ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ;

    let state = null ;

    if ( missing )
    {
        state = <EmptyState actions={ actions } icon={ <MdPictureAsPdf /> } size="sm" title={ missingLabel ?? labels.missing ?? 'The document engine is not installed.' } /> ;
    }
    else if ( error )
    {
        state = (
            <RetryState
                description = { error?.message || undefined }
                onRetry     = { onRetry }
                showRetry   = { !!onRetry }
                size        = "sm"
                title       = { errorLabel ?? labels.failed ?? 'The document could not be opened.' }
            />
        ) ;
    }
    else if ( empty )
    {
        state = <EmptyState actions={ actions } icon={ <MdPictureAsPdf /> } size="sm" title={ emptyLabel ?? labels.empty ?? 'No document' } /> ;
    }
    else if ( loading )
    {
        state = (
            <div className="flex items-center justify-center gap-3 p-8 text-sm text-base-content/70" role="status">
                <Loading animation="spinner" size="sm" />
                <span>{ loadingLabel ?? labels.loading ?? 'Opening the document…' }</span>
            </div>
        ) ;
    }

    return (
        <div className={ cn( 'relative flex min-h-0 flex-col' , className ) } ref={ ref }>
            { state && <div className="flex flex-1 items-center justify-center">{ state }</div> }
            { children }
        </div>
    ) ;
} ;

DocumentFrame.displayName = 'DocumentFrame' ;

export default DocumentFrame ;
