'use client' ;

/**
 * PdfToolbar — the controls of a `PdfViewer` : where the reader is, the zoom,
 * and what to do with the document.
 *
 * It reads the viewer it sits in through `usePdfViewer`, so it can be the one
 * the viewer draws itself (`toolbar="top"`), or rendered by the host anywhere
 * inside the viewer. Outside a viewer it renders nothing.
 *
 * Four groups, from the start : **page** (first, previous, a field, « of n »,
 * next, last), **zoom** (out, the factor, in, fit to width, whole page),
 * **view** (thumbnails, search, rotate) and at the end **document** (print,
 * open in a tab, download, full screen). Each button is an icon with its name
 * as `title`, and as a tooltip — below the bar when it sits on top, above it
 * when it sits at the bottom. On a narrow screen the fit buttons, the zoom
 * factor and the thumbnails give way : the page and the actions stay.
 *
 * @module components/documents/PdfToolbar
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes on the bar.
 * @param {boolean} [props.showDownload=true]
 * @param {boolean} [props.showFit=true] - The fit-to-width and whole-page buttons.
 * @param {boolean} [props.showFullscreen=true]
 * @param {boolean} [props.showOpenInTab=true] - The browser's own reader, in a tab.
 * @param {boolean} [props.showPrint=true]
 * @param {boolean} [props.showRotate=true]
 * @param {boolean} [props.showSearch=true]
 * @param {boolean} [props.showThumbnails=true]
 * @param {boolean} [props.showZoom=true]
 * @param {import('../../themes/components/tooltip').TooltipPosition} [props.tooltipPosition='bottom'] - Where the tooltips open : `'top'` for a bar at the bottom.
 * @param {boolean} [props.tooltips=true] - Show the buttons' names as tooltips. Off, the names stay for screen readers.
 */

import { useEffect , useState } from 'react' ;

import {
    MdCropPortrait ,
    MdDownload ,
    MdFirstPage ,
    MdFitScreen ,
    MdFullscreen ,
    MdFullscreenExit ,
    MdGridView ,
    MdLastPage ,
    MdNavigateBefore ,
    MdNavigateNext ,
    MdOpenInNew ,
    MdPrint ,
    MdRotate90DegreesCw ,
    MdSearch ,
    MdZoomIn ,
    MdZoomOut ,
} from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Button from '../Button' ;

import { usePdfViewer } from './context' ;

import cn from '../../themes/helpers/cn' ;

const PdfToolbar =
({
    className ,
    showDownload = true ,
    showFit = true ,
    showFullscreen = true ,
    showOpenInTab = true ,
    showPrint = true ,
    showRotate = true ,
    showSearch = true ,
    showThumbnails = true ,
    showZoom = true ,
    tooltipPosition = 'bottom' ,
    tooltips = true ,
}) =>
{
    const viewer = usePdfViewer() ;

    const page  = viewer?.page ?? 1 ;
    const pages = viewer?.pages ?? 0 ;

    // The field holds a draft while typing, and follows the reader otherwise.
    const [ draft , setDraft ] = useState( String( page ) ) ;

    useEffect( () =>
    {
        setDraft( String( page ) ) ;
    }
    , [ page ] ) ;

    if ( !viewer )
    {
        return null ;
    }

    const { canZoomIn , canZoomOut , download , fit , fullscreen , goTo , labels , openInTab , openSearch , print , printing , rotate , searchOpen , setFit , thumbnailsOpen , toggleFullscreen , toggleThumbnails , zoom , zoomIn , zoomOut } = viewer ;

    const ready = pages > 0 ;

    // One shape for every button : an icon, its name, and the name again as a tooltip.
    const Tool = ( { label , ...rest } ) => (
        <Button
            shape           = "square"
            size            = "sm"
            style           = "ghost"
            title           = { label }
            tooltip         = { tooltips ? label : undefined }
            tooltipPosition = { tooltipPosition }
            { ...rest }
        />
    ) ;

    const commit = () =>
    {
        const number = Number.parseInt( draft , 10 ) ;

        if ( Number.isFinite( number ) )
        {
            goTo( number ) ;
        }
        else
        {
            setDraft( String( page ) ) ;
        }
    } ;

    return (
        <div
            aria-label = { labels.toolbar }
            className  = { cn( 'flex flex-wrap items-center gap-x-3 gap-y-1 border-base-300 bg-base-100 px-2 py-1' , className ) }
            role       = "toolbar"
        >
            <div className="flex items-center gap-1">
                <Tool disabled={ !ready || page <= 1 } icon={ MdFirstPage } label={ labels.first } onClick={ () => goTo( 1 ) } tooltipAlign="start" />
                <Tool disabled={ !ready || page <= 1 } icon={ MdNavigateBefore } label={ labels.previous } onClick={ () => goTo( page - 1 ) } tooltipAlign="start" />

                <input
                    aria-label = { labels.page }
                    className  = "input input-sm input-bordered w-14 text-center tabular-nums"
                    disabled   = { !ready }
                    inputMode  = "numeric"
                    max        = { pages }
                    min        = { 1 }
                    onBlur     = { commit }
                    onChange   = { event => setDraft( event.target.value ) }
                    onKeyDown  = { event => { if ( event.key === 'Enter' ) { event.preventDefault() ; commit() ; } } }
                    type       = "number"
                    value      = { draft }
                />

                <span className="text-sm tabular-nums text-base-content/70">{ format( labels.of ?? 'of {0}' , pages ) }</span>

                <Tool disabled={ !ready || page >= pages } icon={ MdNavigateNext } label={ labels.next } onClick={ () => goTo( page + 1 ) } />
                <Tool disabled={ !ready || page >= pages } icon={ MdLastPage } label={ labels.last } onClick={ () => goTo( pages ) } />
            </div>

            { showZoom && (
                <div className="flex items-center gap-1">
                    <Tool disabled={ !ready || !canZoomOut } icon={ MdZoomOut } label={ labels.zoomOut } onClick={ zoomOut } />
                    <Tool disabled={ !ready || !canZoomIn } icon={ MdZoomIn } label={ labels.zoomIn } onClick={ zoomIn } />
                    <span className="hidden w-12 text-center text-sm tabular-nums text-base-content/70 sm:inline">{ format( labels.zoom ?? '{0}%' , Math.round( zoom * 100 ) ) }</span>
                    { showFit && (
                        <>
                            <Tool active={ fit === 'width' } className="hidden sm:inline-flex" disabled={ !ready } icon={ MdFitScreen } label={ labels.fitWidth } onClick={ () => setFit( 'width' ) } style={ fit === 'width' ? undefined : 'ghost' } />
                            <Tool active={ fit === 'page' } className="hidden sm:inline-flex" disabled={ !ready } icon={ MdCropPortrait } label={ labels.fitPage } onClick={ () => setFit( 'page' ) } style={ fit === 'page' ? undefined : 'ghost' } />
                        </>
                    ) }
                </div>
            ) }

            { ( showThumbnails || showSearch || showRotate ) && (
                <div className="flex items-center gap-1">
                    { showThumbnails && <Tool active={ thumbnailsOpen } className="hidden sm:inline-flex" disabled={ !ready } icon={ MdGridView } label={ labels.thumbnails } onClick={ toggleThumbnails } style={ thumbnailsOpen ? undefined : 'ghost' } /> }
                    { showSearch && <Tool active={ searchOpen } disabled={ !ready } icon={ MdSearch } label={ labels.search } onClick={ openSearch } style={ searchOpen ? undefined : 'ghost' } /> }
                    { showRotate && <Tool disabled={ !ready } icon={ MdRotate90DegreesCw } label={ labels.rotate } onClick={ rotate } /> }
                </div>
            ) }

            {/* At the end of the bar, the bubbles hang from their end edge, or the last one is cut by the window. */}
            <div className="ms-auto flex items-center gap-1">
                { showPrint && <Tool busy={ !!printing } disabled={ !ready } icon={ MdPrint } label={ labels.print } onClick={ print } tooltipAlign="end" /> }
                { showOpenInTab && <Tool disabled={ !ready } icon={ MdOpenInNew } label={ labels.openInTab } onClick={ openInTab } tooltipAlign="end" /> }
                { showDownload && <Tool disabled={ !ready } icon={ MdDownload } label={ labels.download } onClick={ download } tooltipAlign="end" /> }
                { showFullscreen && (
                    <Tool
                        icon         = { fullscreen ? MdFullscreenExit : MdFullscreen }
                        label        = { fullscreen ? labels.exitFullscreen : labels.fullscreen }
                        onClick      = { toggleFullscreen }
                        tooltipAlign = "end"
                    />
                ) }
            </div>
        </div>
    ) ;
} ;

PdfToolbar.displayName = 'PdfToolbar' ;

export default PdfToolbar ;
