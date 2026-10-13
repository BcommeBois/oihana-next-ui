'use client' ;

/**
 * PdfPreview — a document of `@react-pdf/renderer`, generated in the browser
 * and shown in the library's own viewer : the live preview of an invoice as
 * its form is filled.
 *
 * The engine's own `PDFViewer` is an `<iframe>`, which shows one page on an
 * iPhone and downloads the file on Android ; this hands the generated blob to
 * `PdfViewer`, the same everywhere. While the first document is generated the
 * frame says so ; while a later one is, the previous stays on screen with a
 * thin bar above it. A generation that fails shows the failed state, with a
 * retry.
 *
 * ⚠️ `document` is compared by identity, as `usePdfDocument` says : build it
 * with `useMemo` on its data, or let the React Compiler do it.
 *
 * @module components/documents/PdfPreview
 *
 * @param {Object} props
 * @param {string} [props.className] - Classes on the root. Set the height here : the preview fills its box.
 * @param {number} [props.delay=300] - Milliseconds waited after a change before generating.
 * @param {?React.ReactElement} props.document - The `<Document>` to render.
 * @param {boolean} [props.enabled=true] - Off, nothing is generated.
 * @param {Function} [props.onError] - `( error ) => void` when a generation fails.
 * @param {Function} [props.onGenerated] - `( { blob , url } ) => void` after each generation — the blob to upload.
 * @param {string} [props.path='components.document'] - i18n path the labels are read from.
 * @param {React.Ref} [props.viewerRef] - The viewer's handle : `download`, `print`, `goTo`…
 * @param {Object} [props.viewerProps] - Every other prop goes to {@link module:components/documents/PdfViewer} : `fileName`, `toolbar`, `toolbarProps`, `fit`…
 *
 * @example
 * ```jsx
 * const document = useMemo( () => <Invoice order={ order } /> , [ order ] ) ;
 *
 * <PdfPreview className="h-[70vh]" document={ document } fileName="facture.pdf" />
 * ```
 */

import { useEffect } from 'react' ;

import DocumentFrame from './DocumentFrame' ;
import PdfViewer     from './PdfViewer' ;

import usePdfDocument from '../../hooks/usePdfDocument' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import cn from '../../themes/helpers/cn' ;

const PdfPreview =
({
    className ,
    delay ,
    document : element ,
    enabled = true ,
    onError ,
    onGenerated ,
    path = 'components.document' ,
    viewerRef ,
    ...viewerProps
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const { blob , error , loading , regenerate , url } = usePdfDocument( element , { delay , enabled } ) ;

    useEffect( () =>
    {
        if ( blob )
        {
            onGenerated?.( { blob , url } ) ;
        }
    }
    , [ blob , onGenerated , url ] ) ;

    useEffect( () =>
    {
        if ( error )
        {
            onError?.( error ) ;
        }
    }
    , [ error , onError ] ) ;

    if ( !blob && ( loading || error ) )
    {
        return (
            <DocumentFrame
                className    = { className }
                error        = { error }
                errorLabel   = { labels.generateFailed }
                loading      = { loading }
                loadingLabel = { labels.generating }
                onRetry      = { regenerate }
                path         = { path }
            />
        ) ;
    }

    return (
        <div className={ cn( 'relative flex min-h-0 flex-col' , className ) }>
            <PdfViewer className="min-h-0 flex-1" path={ path } ref={ viewerRef } source={ blob } { ...viewerProps } />
            { loading && <progress aria-label={ labels.generating } className="progress progress-primary absolute inset-x-0 top-0 h-1" /> }
        </div>
    ) ;
} ;

PdfPreview.displayName = 'PdfPreview' ;

export default PdfPreview ;
