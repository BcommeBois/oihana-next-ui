'use client' ;

import { useId } from 'react' ;

import cn from '@/themes/helpers/cn' ;

import Button          from '@/components/Button' ;
import Typography      from '@/components/typography/Typography' ;
import PaginationRange from './PaginationRange' ;

import getPaginationData from '@/components/helpers/getPaginationData' ;

import useI18n from '@/contexts/locale/useI18n' ;

import {
    MdChevronLeft  as DefaultLeftIcon ,
    MdChevronRight as DefaultRightIcon ,
    MdFirstPage    as DefaultFirstPageIcon ,
    MdLastPage     as DefaultLastPageIcon ,
}
from "react-icons/md";

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
    const labelId = useId() ;

    // --------- i18n

    const {
        ariaLabel        : ariaLabelFromI18n    = 'Pagination navigation' ,
        currentPage      : currentPageFromI18n  = 'Current page' ,
        first            : firstLabel           = 'First' ,
        goToFirstPage    : goToFirstPageLabel   = 'Go to first page' ,
        goToLastPage     : goToLastPageLabel    = 'Go to last page' ,
        goToNextPage     : goToNextPageLabel    = 'Go to next page' ,
        goToPage         : goToPageLabel        = 'Go to page' ,
        goToPreviousPage : goToPreviousPageLabel= 'Go to previous page' ,
        last             : lastLabel            = 'Last' ,
        next             : nextLabel            = 'Next' ,
        page             : pageLabel            = 'Page' ,
        previous         : prevLabel            = 'Previous' ,
    }
    = useI18n( path ) ;

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
        <PaginationRange
            aria-label = { `${ pageLabel }s 2 to ${ minPage - 1 }` }
            disabled   = { disabled }
        />
    ) ;

    const maxRange = showMaxRange && maxPage < pageCount - 1 && (
        <PaginationRange
            aria-label = { `${ pageLabel }s ${ maxPage + 1 } to ${ pageCount - 1 }` }
            disabled   = { disabled }
        />
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

    // --------- Label

    const defaultLabelText = `${ pageLabel } ${ currentPage } of ${ pageCount }` ;

    const labelText = labelFormat
        ? labelFormat( currentPage , pageCount , offset , total )
        : typeof label === 'string'
            ? label
            : defaultLabelText ;

    // Label alignment classes for top/bottom positions
    const labelAlignClasses =
    {
        start  : 'self-start' ,
        center : 'self-center' ,
        end    : 'self-end' ,
    } ;

    const labelElement = label && (
        <Typography
            aria-live = "polite"
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

    // --------- Pagination buttons group

    const paginationGroup = (
        <div
            aria-describedby = { label ? labelId : undefined }
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
        'flex gap-4' ,
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
            { labelPosition === 'top' && labelElement }
            { paginationGroup }
            { labelPosition !== 'top' && labelElement }
        </nav>
    ) ;
} ;

Pagination.displayName = 'Pagination' ;

export default Pagination ;