'use client' ;

/**
 * PdfSearch — the field that finds words in a document : what the reader
 * typed, how many times it occurs, and the previous / next occurrence.
 *
 * Drawn by `PdfViewer` under its toolbar when the search is open ; it reads
 * and drives the viewer through `usePdfViewer`, and renders nothing outside
 * one. The matching and the highlighting are the viewer's — this is the
 * field, its counter and its two arrows.
 *
 * @module components/documents/PdfSearch
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes on the bar.
 */

import { useEffect , useRef } from 'react' ;

import { MdClose , MdKeyboardArrowDown , MdKeyboardArrowUp } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Button from '../Button' ;

import { usePdfViewer } from './context' ;

import cn from '../../themes/helpers/cn' ;

const PdfSearch = ( { className } ) =>
{
    const viewer = usePdfViewer() ;

    const field = useRef( null ) ;

    useEffect( () => { field.current?.focus() ; } , [] ) ;

    if ( !viewer )
    {
        return null ;
    }

    const { closeSearch , labels , matchIndex , matches , nextMatch , previousMatch , query , setQuery } = viewer ;

    const total = matches.length ;

    const counter = query
        ? ( total > 0 ? format( labels.searchCount ?? '{0} of {1}' , matchIndex + 1 , total ) : ( labels.searchNone ?? 'No match' ) )
        : '' ;

    const onKeyDown = event =>
    {
        if ( event.key === 'Enter' )
        {
            event.preventDefault() ;
            if ( event.shiftKey ) previousMatch() ; else nextMatch() ;
        }
        else if ( event.key === 'Escape' )
        {
            event.preventDefault() ;
            event.stopPropagation() ;
            closeSearch() ;
        }
    } ;

    return (
        <search className={ cn( 'flex flex-wrap items-center gap-2 border-b border-base-300 bg-base-100 px-2 py-1' , className ) }>
            <input
                aria-label  = { labels.search }
                className   = "input input-sm input-bordered w-48 max-w-full"
                onChange    = { event => setQuery( event.target.value ) }
                onKeyDown   = { onKeyDown }
                placeholder = { labels.searchPlaceholder }
                ref         = { field }
                type        = "search"
                value       = { query }
            />
            <span aria-live="polite" className="min-w-16 text-sm tabular-nums text-base-content/70">{ counter }</span>
            <div className="join">
                <Button disabled={ total === 0 } icon={ MdKeyboardArrowUp } join onClick={ previousMatch } shape="square" size="sm" style="ghost" title={ labels.searchPrevious } />
                <Button disabled={ total === 0 } icon={ MdKeyboardArrowDown } join onClick={ nextMatch } shape="square" size="sm" style="ghost" title={ labels.searchNext } />
            </div>
            <Button className="ms-auto" icon={ MdClose } onClick={ closeSearch } shape="square" size="sm" style="ghost" title={ labels.searchClose } />
        </search>
    ) ;
} ;

PdfSearch.displayName = 'PdfSearch' ;

export default PdfSearch ;
