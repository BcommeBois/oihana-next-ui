'use client' ;

/**
 * I18nText — resolves ONE locale string client-side via `useI18n`, so it
 * reacts instantly to a language switch.
 *
 * Replaces the antipattern of resolving a string once via `getServerI18n`
 * in a Server Component and passing it down as a frozen prop — that value
 * never updates when the language toggle flips the `lang` cookie client-side
 * (no navigation happens, so the Server Component never re-renders).
 *
 * Renders as plain text (a JSX child), so it can replace any string used as a React child — it can NOT be used
 * where a native HTML attribute expects a raw string at render time (e.g. an `<input placeholder>`);
 * resolve those directly with `useI18n` inside the owning Client Component instead.
 *
 * @module components/i18n/I18nText
 *
 * @param {Object}   props
 * @param {string}   props.path       - Locale bundle path (e.g. 'app.products').
 * @param {string}   props.field      - Dot-path within the resolved bundle (e.g. 'error.description').
 * @param {string}   [props.fallback] - Rendered when the field is missing (English default).
 * @param {Array}    [props.args]     - Positional values for `fastformat` interpolation ({0}, {1}, …) when the resolved string is a pattern.
 *
 * @returns {?string}
 *
 * @example
 * ```jsx
 * <I18nText path="app.products" field="title" />
 * <I18nText path="app.products" field="count" fallback="{0}–{1} / {2}" args={ [ from , to , total ] } />
 * ```
 */

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n  from '../../contexts/locale/useI18n' ;

const I18nText = ( { path , field , fallback , args } ) =>
{
    const i18n  = useI18n( path , {} ) ;
    const value = field.split( '.' ).reduce( ( acc , key ) => acc?.[ key ] , i18n ) ?? fallback ;

    if ( value === undefined || value === null ) { return null ; }

    return Array.isArray( args ) ? format( value , ...args ) : value ;
} ;

I18nText.displayName = 'I18nText' ;

export default I18nText ;
