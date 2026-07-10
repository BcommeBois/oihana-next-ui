'use client' ;

import { useEffect , useId , useRef , useState } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import useBreakpoint from '../../themes/hooks/useBreakpoint' ;

import Button          from '../Button' ;
import PaginationRange from './PaginationRange' ;
import Popover , { RESPONSIVE } from '../Popover' ;
import Typography      from '../typography/Typography' ;

import getPaginationData from '../helpers/getPaginationData' ;

import useI18n from '../../contexts/locale/useI18n' ;

import {
    MdChevronLeft  as DefaultLeftIcon ,
    MdChevronRight as DefaultRightIcon ,
    MdFirstPage    as DefaultFirstPageIcon ,
    MdLastPage     as DefaultLastPageIcon ,
    MdUnfoldMore   as DefaultJumpIcon ,
}
from "react-icons/md" ;

/**
 * Pagination component using DaisyUI 5 join pattern.
 *
 * @module components/pagination/Pagination
 *
 * @example
 * ```jsx
 * // Basic usage
 * <Pagination
 *     limit={12}
 *     offset={24}
 *     total={100}
 *     onChange={(offset, page) => console.log('Page', page)}
 * />
 *
 * // With label on top (centered)
 * <Pagination
 *     limit={10}
 *     offset={0}
 *     total={250}
 *     label
 *     labelPosition="top"
 *     onChange={(offset) => loadData(offset)}
 * />
 *
 * // Label on bottom (left aligned)
 * <Pagination
 *     limit={20}
 *     offset={40}
 *     total={200}
 *     label
 *     labelPosition="bottom"
 *     labelAlign="start"
 *     onChange={(offset) => navigate(`/items?page=${offset}`)}
 * />
 *
 * // Compact below the md breakpoint, with a "go to page" modal on mobile
 * <Pagination
 *     limit={48}
 *     offset={0}
 *     total={10269}
 *     compactBelow="md"
 *     jumpMode="modal"
 *     onChange={(offset) => loadData(offset)}
 * />
 * ```
 */

/**
 * @typedef {Object} PaginationProps
 *
 * @prop {number} limit - Items per page
 * @prop {number} offset - Current offset (0-based)
 * @prop {number} total - Total number of items
 * @prop {Function} onChange - Callback: (offset, page, paginationData) => void
 *
 * @prop {number} [pageOffset=2] - Number of pages to show before/after current
 *
 * @prop {string} [activeColor='primary'] - Active page button color
 * @prop {string} [className] - Container classes
 * @prop {string} [color='ghost'] - Button color
 * @prop {boolean} [disabled=false] - Disable all buttons
 * @prop {string} [size='sm'] - Button size
 *
 * @prop {boolean} [compact=false] - Force the compact layout (prev / page control / next)
 * @prop {'sm'|'md'|'lg'|'xl'|'2xl'|false} [compactBelow=false] - Auto-switch to compact below this breakpoint (false disables the responsive switch)
 * @prop {'input'|'modal'} [jumpMode='input'] - Page jump control in compact mode: inline number input, or a Popover (dropdown on desktop, bottom-sheet on mobile)
 *
 * @prop {boolean} [showRange=false] - Show an item-range summary (« 1–48 of 10269 ») as the label instead of « Page X of Y »
 * @prop {number[]} [pageSizes] - When provided, render an items-per-page `<select>`
 * @prop {Function} [onLimitChange] - Callback when the page size changes: (limit, paginationData) => void
 *
 * @prop {boolean|string} [label=false] - Show label (true for default, string for custom)
 * @prop {'start'|'center'|'end'} [labelAlign='center'] - Label alignment when position is top/bottom
 * @prop {string} [labelClassName] - Label classes
 * @prop {Function} [labelFormat] - Custom label formatter: (currentPage, pageCount, offset, total) => string
 * @prop {'left'|'right'|'top'|'bottom'} [labelPosition='right'] - Label position relative to pagination
 * @prop {string} [path='components.pagination'] - i18n path
 *
 * @prop {boolean} [showFirst=true] - Show first page button
 * @prop {boolean} [showLast=true] - Show last page button
 * @prop {boolean} [showNext=true] - Show next page button
 * @prop {boolean} [showPrev=true] - Show previous page button
 *
 * @prop {React.ComponentType} [FirstIcon] - Custom first icon
 * @prop {React.ComponentType} [LastIcon] - Custom last icon
 * @prop {React.ComponentType} [NextIcon] - Custom next icon
 * @prop {React.ComponentType} [PrevIcon] - Custom previous icon
 */

/**
 * Pagination component.
 *
 * @param {PaginationProps} props
 * @returns {JSX.Element|null}
 */
const Pagination =
({
    limit ,
    offset ,
    total ,
    onChange ,

    pageOffset = 2 ,

    activeColor = 'primary' ,
    className ,
    color = 'ghost' ,
    disabled = false ,
    size = 'sm' ,

    compact = false ,
    compactBelow = false ,
    jumpMode = 'input' ,

    onLimitChange ,
    pageSizes ,
    showRange = false ,

    label = false ,
    labelAlign = 'center' ,
    labelClassName ,
    labelFormat ,
    labelPosition = 'right' ,
    path = 'components.pagination' ,

    showFirst = true ,
    showLast = true ,
    showNext = true ,
    showPrev = true ,

    FirstIcon= DefaultFirstPageIcon ,
    LastIcon = DefaultLastPageIcon ,
    NextIcon = DefaultRightIcon ,
    PrevIcon = DefaultLeftIcon ,
}) =>
{
    const labelId     = useId() ;
    const jumpFieldId = useId() ;

    // --------- i18n

    const {
        ariaLabel        : ariaLabelFromI18n    = 'Pagination navigation' ,
        cancel           : cancelLabel          = 'Cancel' ,
        currentPage      : currentPageFromI18n  = 'Current page' ,
        first            : firstLabel           = 'First' ,
        go               : goLabel              = 'Go' ,
        goToFirstPage    : goToFirstPageLabel   = 'Go to first page' ,
        goToLastPage     : goToLastPageLabel    = 'Go to last page' ,
        goToNextPage     : goToNextPageLabel    = 'Go to next page' ,
        goToPage         : goToPageLabel        = 'Go to page' ,
        goToPreviousPage : goToPreviousPageLabel= 'Go to previous page' ,
        last             : lastLabel            = 'Last' ,
        next             : nextLabel            = 'Next' ,
        of               : ofLabel              = 'of' ,
        page             : pageLabel            = 'Page' ,
        pageNumber       : pageNumberLabel      = 'Page number' ,
        perPage          : perPageLabel         = 'Per page' ,
        previous         : prevLabel            = 'Previous' ,
    }
    = useI18n( path ) ;

    // --------- Compact mode (opt-in)

    const compactBreakpoint = compactBelow || 'md' ;
    const isAtBreakpoint    = useBreakpoint( compactBreakpoint ) ;
    const isCompact         = compact || ( !!compactBelow && ! isAtBreakpoint ) ;

    const jumpTriggerRef = useRef( null ) ;
    const jumpInputRef   = useRef( null ) ;

    const [ jumpOpen , setJumpOpen ] = useState( false ) ;

    // Focus (and select) the page field when the jump dialog opens.
    useEffect( () =>
    {
        if ( jumpOpen )
        {
            jumpInputRef.current?.focus() ;
            jumpInputRef.current?.select?.() ;
        }
    }
    , [ jumpOpen ] ) ;

    // --------- Calculate pagination data

    const paginationData = getPaginationData({ offset , limit , total , pageOffset }) ;

    const {
        currentPage ,
        pageCount ,
        minPage ,
        maxPage ,
        hasNext ,
        hasPrev ,
        nextOffset ,
        prevOffset ,
        firstOffset ,
        lastOffset ,
    }
    = paginationData ;

    // --------- Don't render if not enough pages

    if ( pageCount <= 1 )
    {
        return null ;
    }

    // --------- Click handlers

    const handlePageClick = ( targetOffset , targetPage ) => () =>
    {
        if ( onChange && ! disabled )
        {
            onChange( targetOffset , targetPage , paginationData ) ;
        }
    } ;

    // --------- Jump to an arbitrary page (compact mode)

    const goToPage = ( targetPage ) =>
    {
        const clamped      = Math.min( Math.max( 1 , targetPage ) , pageCount ) ;
        const targetOffset = ( clamped - 1 ) * limit ;

        if ( onChange && ! disabled )
        {
            onChange( targetOffset , clamped , paginationData ) ;
        }
    } ;

    const commitJump = () =>
    {
        const value = parseInt( jumpInputRef.current?.value , 10 ) ;

        if ( ! Number.isNaN( value ) )
        {
            goToPage( value ) ;
        }
    } ;

    const closeJump = () => setJumpOpen( false ) ;

    const applyJump = () =>
    {
        commitJump() ;
        closeJump() ;
    } ;

    const handleInlineJumpKeyDown = ( event ) =>
    {
        if ( event.key === 'Enter' )
        {
            commitJump() ;
            event.currentTarget.blur() ;
        }
    } ;

    const handleModalJumpKeyDown = ( event ) =>
    {
        if ( event.key === 'Enter' )
        {
            event.preventDefault() ;
            applyJump() ;
        }
    } ;

    // --------- Generate page buttons

    const pageButtons = [] ;

    for ( let page = minPage ; page <= maxPage ; page++ )
    {
        const pageOffset = ( page - 1 ) * limit ;
        const isCurrentPage = page === currentPage ;

        pageButtons.push(
            <Button
                key         = { `page-${ page }` }
                active      = { isCurrentPage }
                activeColor = { activeColor }
                aria-current= { isCurrentPage ? 'page' : undefined }
                aria-label  = { `${ isCurrentPage ? currentPageFromI18n : goToPageLabel } ${ page }` }
                color       = { color }
                disabled    = { disabled }
                join
                onClick     = { handlePageClick( pageOffset , page ) }
                size        = { size }
            >
                { page }
            </Button>
        ) ;
    }

    // --------- Navigation buttons

    const firstButton = showFirst && hasPrev && (
        <Button
            aria-label = { goToFirstPageLabel }
            color      = { color }
            disabled   = { disabled }
            icon       = { FirstIcon }
            join
            onClick    = { handlePageClick( firstOffset , 1 ) }
            size       = { size }
            tooltip    = { firstLabel }
        />
    ) ;

    const prevButton = showPrev && hasPrev && (
        <Button
            aria-label = { goToPreviousPageLabel }
            color      = { color }
            disabled   = { disabled }
            icon       = { PrevIcon }
            join
            onClick    = { handlePageClick( prevOffset , currentPage - 1 ) }
            size       = { size }
            tooltip    = { prevLabel }
        />
    ) ;

    const nextButton = showNext && hasNext && (
        <Button
            aria-label = { goToNextPageLabel }
            color      = { color }
            disabled   = { disabled }
            icon       = { NextIcon }
            join
            onClick    = { handlePageClick( nextOffset , currentPage + 1 ) }
            size       = { size }
            tooltip    = { nextLabel }
        />
    ) ;

    const lastButton = showLast && hasNext && (
        <Button
            aria-label = { goToLastPageLabel }
            color      = { color }
            disabled   = { disabled }
            icon       = { LastIcon }
            join
            onClick    = { handlePageClick( lastOffset , pageCount ) }
            size       = { size }
            tooltip    = { lastLabel }
        />
    ) ;

    // --------- Range indicators

    const showMinRange = minPage > 1 ;
    const showMaxRange = maxPage < pageCount ;

    const minRangeButton = showMinRange && (
        <Button
            activeColor = { activeColor }
            aria-label  = { `${ goToPageLabel } 1` }
            color       = { color }
            disabled    = { disabled }
            join
            onClick     = { handlePageClick( firstOffset , 1 ) }
            size        = { size }
        >
            1
        </Button>
    ) ;

    const minRange = showMinRange && minPage > 2 && (
        <PaginationRange disabled={ disabled } />
    ) ;

    const maxRange = showMaxRange && maxPage < pageCount - 1 && (
        <PaginationRange disabled={ disabled } />
    ) ;

    const maxRangeButton = showMaxRange && (
        <Button
            activeColor = { activeColor }
            aria-label  = { `${ goToPageLabel } ${ pageCount }` }
            color       = { color }
            disabled    = { disabled }
            join
            onClick     = { handlePageClick( lastOffset , pageCount ) }
            size        = { size }
        >
            { pageCount }
        </Button>
    ) ;

    // --------- Label / range summary

    const rangeStart = offset + 1 ;
    const rangeEnd   = Math.min( offset + limit , total ) ;
    const rangeText  = `${ rangeStart }–${ rangeEnd } ${ ofLabel } ${ total }` ;

    const defaultLabelText = `${ pageLabel } ${ currentPage } ${ ofLabel } ${ pageCount }` ;

    const labelText = labelFormat
        ? labelFormat( currentPage , pageCount , offset , total )
        : showRange
            ? rangeText
            : typeof label === 'string'
                ? label
                : defaultLabelText ;

    // `showRange` shows the label even when `label` was not explicitly passed.
    const showLabelElement = !!label || showRange ;

    // Label alignment classes for top/bottom positions
    const labelAlignClasses =
    {
        start  : 'self-start' ,
        center : 'self-center' ,
        end    : 'self-end' ,
    } ;

    // The visible label is purely visual : announcements go through the single
    // sr-only live region below (so page changes are announced consistently in
    // every mode — compact / no-label included — without double-speaking).
    const labelElement = showLabelElement && (
        <Typography
            as        = "div"
            className = { cn(
                'text-sm text-base-content/70' ,
                ( labelPosition === 'top' || labelPosition === 'bottom' ) && labelAlignClasses[ labelAlign ] ,
                labelClassName
            )}
            id        = { labelId }
        >
            { labelText }
        </Typography>
    ) ;

    // Single source of spoken page-change announcements, present in every layout.
    const liveRegion = (
        <span aria-atomic="true" aria-live="polite" className="sr-only">
            { `${ pageLabel } ${ currentPage } ${ ofLabel } ${ pageCount }` }
        </span>
    ) ;

    // --------- Items-per-page selector (opt-in)

    const hasPageSizes = Array.isArray( pageSizes ) && pageSizes.length > 0 ;

    const handleLimitChange = ( event ) =>
    {
        const nextLimit = parseInt( event.target.value , 10 ) ;

        if ( ! disabled && ! Number.isNaN( nextLimit ) )
        {
            onLimitChange?.( nextLimit , paginationData ) ;
        }
    } ;

    const pageSizeControl = hasPageSizes && (
        <label className="flex items-center gap-2 whitespace-nowrap text-sm text-base-content/70">
            { perPageLabel }
            <select
                className = { cn( 'select w-auto' , `select-${ size }` ) }
                disabled  = { disabled }
                onChange  = { handleLimitChange }
                value     = { limit }
            >
                { pageSizes.map( ( n ) => (
                    <option key={ n } value={ n }>{ n }</option>
                ) ) }
            </select>
        </label>
    ) ;

    // --------- Compact layout (prev / page control / next)

    if ( isCompact )
    {
        const compactPrev = (
            <Button
                aria-label = { goToPreviousPageLabel }
                color      = { color }
                disabled   = { disabled || ! hasPrev }
                icon       = { PrevIcon }
                onClick    = { handlePageClick( prevOffset , currentPage - 1 ) }
                size       = { size }
                tooltip    = { prevLabel }
            />
        ) ;

        const compactNext = (
            <Button
                aria-label = { goToNextPageLabel }
                color      = { color }
                disabled   = { disabled || ! hasNext }
                icon       = { NextIcon }
                onClick    = { handlePageClick( nextOffset , currentPage + 1 ) }
                size       = { size }
                tooltip    = { nextLabel }
            />
        ) ;

        // Inline number input : type a page, Enter / blur commits (clamped 1..pageCount).
        const inlineJump = (
            <div className="flex items-center gap-1.5">
                <input
                    ref          = { jumpInputRef }
                    aria-label   = { pageNumberLabel }
                    className    = { cn( 'input w-14 text-center' , `input-${ size }` ) }
                    defaultValue = { currentPage }
                    disabled     = { disabled }
                    inputMode    = "numeric"
                    key          = { currentPage }
                    max          = { pageCount }
                    min          = { 1 }
                    onBlur       = { commitJump }
                    onKeyDown    = { handleInlineJumpKeyDown }
                    type         = "number"
                />
                <span className="whitespace-nowrap text-sm text-base-content/70">
                    { ofLabel } { pageCount }
                </span>
            </div>
        ) ;

        // Trigger + Popover (dropdown on desktop, bottom-sheet on mobile).
        const modalJump = (
            <>
                <button
                    ref           = { jumpTriggerRef }
                    aria-haspopup = "dialog"
                    aria-label    = { goToPageLabel }
                    className     = { cn( 'btn btn-ghost gap-1 whitespace-nowrap' , `btn-${ size }` ) }
                    disabled      = { disabled }
                    onClick       = { () => setJumpOpen( true ) }
                    type          = "button"
                >
                    { pageLabel } { currentPage } { ofLabel } { pageCount }
                    <DefaultJumpIcon aria-hidden="true" className="opacity-60" />
                </button>

                <Popover
                    anchorRef   = { jumpTriggerRef }
                    applyLabel  = { goLabel }
                    cancelLabel = { cancelLabel }
                    display     = { RESPONSIVE }
                    isOpen      = { jumpOpen }
                    onApply     = { applyJump }
                    onCancel    = { closeJump }
                    onClose     = { closeJump }
                    showFooter
                >
                    <div className="flex flex-col gap-2 p-1">
                        <label className="text-sm font-medium" htmlFor={ jumpFieldId }>
                            { goToPageLabel }
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                ref          = { jumpInputRef }
                                aria-label   = { pageNumberLabel }
                                className    = "input input-sm w-24"
                                defaultValue = { currentPage }
                                id           = { jumpFieldId }
                                inputMode    = "numeric"
                                key          = { `${ currentPage }-${ jumpOpen }` }
                                max          = { pageCount }
                                min          = { 1 }
                                onKeyDown    = { handleModalJumpKeyDown }
                                type         = "number"
                            />
                            <span className="whitespace-nowrap text-sm text-base-content/70">
                                { ofLabel } { pageCount }
                            </span>
                        </div>
                    </div>
                </Popover>
            </>
        ) ;

        const controlsRow = (
            <div className="flex items-center justify-center gap-2">
                { compactPrev }
                { jumpMode === 'modal' ? modalJump : inlineJump }
                { compactNext }
            </div>
        ) ;

        // When a range summary and / or a page-size selector are enabled, stack a
        // top row (summary — selector) above the controls, so nothing fights the
        // controls for horizontal space on a narrow screen.
        if ( showRange || hasPageSizes )
        {
            return (
                <nav
                    aria-label = { ariaLabelFromI18n }
                    className  = { cn( 'flex w-full min-w-0 max-w-full flex-col gap-2' , className ) }
                >
                    { liveRegion }
                    <div className="flex items-center justify-between gap-3">
                        { showRange
                            ? <span className="text-sm text-base-content/70">{ rangeText }</span>
                            : <span /> }
                        { pageSizeControl }
                    </div>
                    { controlsRow }
                </nav>
            ) ;
        }

        return (
            <nav
                aria-label = { ariaLabelFromI18n }
                className  = { cn( 'flex w-full min-w-0 max-w-full items-center justify-center gap-2' , className ) }
            >
                { liveRegion }
                { controlsRow }
            </nav>
        ) ;
    }

    // --------- Pagination buttons group

    const paginationGroup = (
        <div
            aria-describedby = { showLabelElement ? labelId : undefined }
            className        = "join"
            role             = "group"
        >
            { firstButton }
            { prevButton }
            { minRangeButton }
            { minRange }
            { pageButtons }
            { maxRange }
            { maxRangeButton }
            { nextButton }
            { lastButton }
        </div>
    ) ;

    // --------- Container classes based on label position

    const containerClasses = cn(
        'flex w-full min-w-0 max-w-full gap-4' ,
        {
            // Horizontal layouts (label left/right)
            'flex-row flex-wrap items-center justify-between' : labelPosition === 'right' ,
            'flex-row-reverse flex-wrap items-center justify-between' : labelPosition === 'left' ,

            // Vertical layouts (label top/bottom)
            'flex-col items-center' : labelPosition === 'top' || labelPosition === 'bottom' ,
        } ,
        className
    ) ;

    // --------- Render with different layouts based on label position

    return (
        <nav
            aria-label = { ariaLabelFromI18n }
            className  = { containerClasses }
        >
            { liveRegion }
            { labelPosition === 'top' && labelElement }
            { paginationGroup }
            { labelPosition !== 'top' && labelElement }
            { pageSizeControl }
        </nav>
    ) ;
} ;

Pagination.displayName = 'Pagination' ;

export default Pagination ;