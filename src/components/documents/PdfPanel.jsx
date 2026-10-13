'use client' ;

/**
 * PdfPanel — a document in a side panel : the viewer anchored to the end of
 * the screen on a desktop, covering the whole screen on a phone.
 *
 * The shape of a document opened from a list — an invoice from its row, a
 * delivery note from an order — where the list stays in sight behind the
 * panel on a desktop, and the phone gives the document the whole screen.
 * A preset over `SidePanel` : it opens and closes as every modal does, with
 * `useModal`'s `modalRef`, and takes every prop of `PdfViewer`.
 *
 * The title is the one given, else the title the document carries, else
 * `fileName`. `footerNode` pins the application's actions under the viewer —
 * « Credit note », « Duplicate », « Send » — the way the panel of an
 * accounting tool does.
 *
 * @module components/documents/PdfPanel
 *
 * @example
 * ```jsx
 * const { modalRef , open } = useModal() ;
 * const viewer = useRef( null ) ;
 *
 * <Button onClick={ open }>Open the invoice</Button>
 *
 * <PdfPanel
 *     fileName   = "facture-2026-0042.pdf"
 *     footerNode = { <Button onClick={ () => viewer.current?.download() }>Download</Button> }
 *     ref        = { modalRef }
 *     source     = { { url , headers : { Authorization } } }
 *     viewerRef  = { viewer }
 * />
 * ```
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Rendered inside the viewer, over the pages (a toolbar of the host's own).
 * @param {string} [props.className] - Classes on the panel.
 * @param {React.ReactNode} [props.footerNode] - Pinned under the viewer : the application's actions. It brings its own padding, as every `footerNode` does — `ModalFooter`, or a `div` with `px-4 py-3`.
 * @param {string} [props.fullScreenBreakpoint='sm'] - Below this breakpoint the panel covers the whole screen.
 * @param {'start'|'end'} [props.placement='end'] - The edge the panel is anchored to.
 * @param {React.Ref} [props.ref] - The dialog — `modalRef` from `useModal`.
 * @param {React.ReactNode} [props.title] - The panel's title. Defaults to the document's own, then `fileName`.
 * @param {string} [props.viewerClassName] - Classes on the viewer.
 * @param {React.Ref} [props.viewerRef] - The viewer's handle : `goTo`, `download`, `print`…
 * @param {string} [props.width='w-full sm:w-[36rem] lg:w-[48rem]'] - Tailwind width of the panel on a desktop.
 * @param {Object} [props.viewerProps] - Every other prop goes to {@link module:components/documents/PdfViewer} : `source`, `fileName`, `fit`, `toolbar`, `onLoad`…
 */

import { useState } from 'react' ;

import SidePanel from '../panels/SidePanel' ;
import PdfViewer from './PdfViewer' ;

import cn from '../../themes/helpers/cn' ;

const PdfPanel =
({
    children ,
    className ,
    footerNode ,
    fullScreenBreakpoint = 'sm' ,
    placement = 'end' ,
    ref ,
    title ,
    viewerClassName ,
    viewerRef ,
    width = 'w-full sm:w-[36rem] lg:w-[48rem]' ,
    ...viewerProps
}) =>
{
    const [ documentTitle , setDocumentTitle ] = useState( null ) ;

    const onLoad = detail =>
    {
        setDocumentTitle( detail.title ) ;
        viewerProps.onLoad?.( detail ) ;
    } ;

    const hasFooter = footerNode !== undefined && footerNode !== null ;

    return (
        <SidePanel
            className            = { className }
            contentClassName     = "flex min-h-0 flex-1 flex-col p-0"
            footerNode           = { hasFooter ? footerNode : undefined }
            fullScreenBreakpoint = { fullScreenBreakpoint }
            placement            = { placement }
            ref                  = { ref }
            // The standard footer has nothing to agree to ; the viewer's toolbar is the panel's.
            showFooter           = { hasFooter ? undefined : false }
            title                = { title ?? documentTitle ?? viewerProps.fileName ?? null }
            width                = { width }
        >
            <PdfViewer
                { ...viewerProps }
                className = { cn( 'min-h-0 flex-1' , viewerClassName ) }
                onLoad    = { onLoad }
                ref       = { viewerRef }
            >
                { children }
            </PdfViewer>
        </SidePanel>
    ) ;
} ;

PdfPanel.displayName = 'PdfPanel' ;

export default PdfPanel ;
