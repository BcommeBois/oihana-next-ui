'use client' ;

import Spinner from './Spinner' ;

import './styles/book.css' ;

/**
 * Book page-turning animation spinner.
 * Displays an open book with pages turning.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Book cover color from theme (default: base-300)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-book'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default book spinner
 * <Book />
 *
 * @example
 * // With custom color and size
 * <Book color="primary" size="sm" />
 *
 * @example
 * // Large accent book
 * <Book color="accent" size="lg" />
 */
const Book =
({
    as ,
    className ,
    color = 'base-300' ,
    size = 'md' ,
    style ,
    tag = 'spinner-book' ,

    ref ,

    ...rest
}) =>
(
    <Spinner
        as        = { as }
        className = { className }
        color     = { color }
        ref       = { ref }
        size      = { size }
        style     = { style }
        tag       = { tag }
        { ...rest }
    />
) ;

Book.displayName = 'Book' ;

export default Book ;