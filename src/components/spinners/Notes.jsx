'use client' ;

import Spinner from './Spinner' ;

import './styles/notes.css' ;

/**
 * Notes writing animation spinner.
 * Displays a notepad with lines being written progressively.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.backgroundColor] - Notepad background color from theme (default: base-100)
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color] - Text lines color from theme (default: base-content)
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Spinner size
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-notes'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default notes spinner
 * <Notes />
 *
 * @example
 * // With custom colors
 * <Notes backgroundColor="primary" color="primary-content" />
 *
 * @example
 * // Large with accent colors
 * <Notes backgroundColor="accent" color="accent-content" size="lg" />
 */
const Notes =
    ({
         as ,
         backgroundColor = 'base-100' ,
         className ,
         color = 'base-content' ,
         size = 'md' ,
         style ,
         tag = 'spinner-notes' ,

         ref ,

         ...rest
     }) =>
        (
            <Spinner
                as              = { as }
                backgroundColor = { backgroundColor }
                className       = { className }
                color           = { color }
                ref             = { ref }
                size            = { size }
                style           = { style }
                tag             = { tag }
                { ...rest }
            />
        ) ;

Notes.displayName = 'Notes' ;

export default Notes ;