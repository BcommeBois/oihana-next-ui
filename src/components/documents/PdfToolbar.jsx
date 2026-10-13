'use client' ;

/**
 * PdfToolbar — the controls of a `PdfViewer` : where the reader is, the zoom,
 * and what to do with the document.
 *
 * It reads the viewer it sits in through `usePdfViewer`, so it can be the one
 * the viewer draws itself (`toolbar="top"`), or rendered by the host anywhere
 * inside the viewer. Outside a viewer it renders nothing.
 *
 * Three groups, from the start : **page** (first, previous, a field, « of n »,
 * next, last), **zoom** (out, the factor, in, fit to width, whole page), and
 * at the end **document** (print, download, full screen). Each button is an
 * icon with its name as `title`. On a narrow screen the fit buttons and the
 * zoom factor give way : the page and the actions stay.
 *
 * @module components/documents/PdfToolbar
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes on the bar.
 * @param {boolean} [props.showDownload=true]
 * @param {boolean} [props.showFit=true] - The fit-to-width and whole-page buttons.
 * @param {boolean} [props.showFullscreen=true]
 * @param {boolean} [props.showPrint=true]
 * @param {boolean} [props.showZoom=true]
 */

import { useEffect , useState } from 'react' ;

import {
    MdCropPortrait ,
    MdDownload ,
    MdFirstPage ,
    MdFitScreen ,
    MdFullscreen ,
    MdFullscreenExit ,
    MdLastPage ,
    MdNavigateBefore ,
    MdNavigateNext ,
    MdPrint ,
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
    showPrint = true ,
    showZoom = true ,
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

    const { canZoomIn , canZoomOut , download , fit , fullscreen , goTo , labels , print , setFit , toggleFullscreen , zoom , zoomIn , zoomOut } = viewer ;

    const ready = pages > 0 ;

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
                <div className="join">
                    <Button disabled={ !ready || page <= 1 } icon={ MdFirstPage } join onClick={ () => goTo( 1 ) } shape="square" size="sm" style="ghost" title={ labels.first } />
                    <Button disabled={ !ready || page <= 1 } icon={ MdNavigateBefore } join onClick={ () => goTo( page - 1 ) } shape="square" size="sm" style="ghost" title={ labels.previous } />
                </div>

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

                <div className="join">
                    <Button disabled={ !ready || page >= pages } icon={ MdNavigateNext } join onClick={ () => goTo( page + 1 ) } shape="square" size="sm" style="ghost" title={ labels.next } />
                    <Button disabled={ !ready || page >= pages } icon={ MdLastPage } join onClick={ () => goTo( pages ) } shape="square" size="sm" style="ghost" title={ labels.last } />
                </div>
            </div>

            { showZoom && (
                <div className="flex items-center gap-1">
                    <div className="join">
                        <Button disabled={ !ready || !canZoomOut } icon={ MdZoomOut } join onClick={ zoomOut } shape="square" size="sm" style="ghost" title={ labels.zoomOut } />
                        <Button disabled={ !ready || !canZoomIn } icon={ MdZoomIn } join onClick={ zoomIn } shape="square" size="sm" style="ghost" title={ labels.zoomIn } />
                    </div>
                    <span className="hidden w-12 text-center text-sm tabular-nums text-base-content/70 sm:inline">{ format( labels.zoom ?? '{0}%' , Math.round( zoom * 100 ) ) }</span>
                    { showFit && (
                        <div className="join hidden sm:flex">
                            <Button active={ fit === 'width' } disabled={ !ready } icon={ MdFitScreen } join onClick={ () => setFit( 'width' ) } shape="square" size="sm" style={ fit === 'width' ? undefined : 'ghost' } title={ labels.fitWidth } />
                            <Button active={ fit === 'page' } disabled={ !ready } icon={ MdCropPortrait } join onClick={ () => setFit( 'page' ) } shape="square" size="sm" style={ fit === 'page' ? undefined : 'ghost' } title={ labels.fitPage } />
                        </div>
                    ) }
                </div>
            ) }

            <div className="ms-auto flex items-center gap-1">
                { showPrint && <Button disabled={ !ready } icon={ MdPrint } onClick={ print } shape="square" size="sm" style="ghost" title={ labels.print } /> }
                { showDownload && <Button disabled={ !ready } icon={ MdDownload } onClick={ download } shape="square" size="sm" style="ghost" title={ labels.download } /> }
                { showFullscreen && (
                    <Button
                        icon    = { fullscreen ? MdFullscreenExit : MdFullscreen }
                        onClick = { toggleFullscreen }
                        shape   = "square"
                        size    = "sm"
                        style   = "ghost"
                        title   = { fullscreen ? labels.exitFullscreen : labels.fullscreen }
                    />
                ) }
            </div>
        </div>
    ) ;
} ;

PdfToolbar.displayName = 'PdfToolbar' ;

export default PdfToolbar ;
