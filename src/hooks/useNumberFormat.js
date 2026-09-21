'use client' ;

/**
 * The number formatters, bound to the language on screen.
 *
 * The locale comes from the current language (`LangProvider`) turned into a
 * locale by the application's `intl.locales` table (`ConfigProvider`) — see
 * {@link module:helpers/numbers/resolveLocale}. Changing the language
 * re-renders with the new locale ; the formatters themselves are cached.
 *
 * Both contexts are read defensively : outside their providers, the hook falls
 * back to {@link module:helpers/numbers/defaultLocale} rather than throwing — a
 * number is no reason to require a provider.
 *
 * @module hooks/useNumberFormat
 */

import { use , useMemo } from 'react' ;

import get from 'vegas-js-core/src/objects/get' ;

import ConfigContext from '../contexts/config/context' ;
import LangContext   from '../contexts/lang/context' ;

import formatCompact from '../helpers/numbers/formatCompact' ;
import formatNumber  from '../helpers/numbers/formatNumber' ;
import formatPercent from '../helpers/numbers/formatPercent' ;
import resolveLocale from '../helpers/numbers/resolveLocale' ;

/**
 * Where the application's language → locale table is read in its config.
 * @type {string}
 */
const LOCALES_PATH = 'intl.locales' ;

/**
 * The number formatters, bound to the language on screen.
 *
 * @returns {{
 *   locale        : string,
 *   formatCompact : (value: *, options?: Object) => string,
 *   formatNumber  : (value: *, options?: Intl.NumberFormatOptions) => string,
 *   formatPercent : (value: *, options?: Object) => string
 * }}
 *
 * @example
 * ```js
 * const { formatCompact , formatNumber , formatPercent } = useNumberFormat() ;
 *
 * formatNumber( 1234.5 , { style : 'currency' , currency : 'EUR' } ) ; // '1 234,50 €'
 * formatPercent( ratio , { maximumFractionDigits : 0 , smallBelow : 0.1 } ) ;
 * formatCompact( total , { currency : 'EUR' } ) ;
 * ```
 */
const useNumberFormat = () =>
{
    const lang    = use( LangContext )?.lang ;
    const locales = get( use( ConfigContext )?.config ?? {} , LOCALES_PATH , null ) ;

    const locale = resolveLocale( lang , locales ) ;

    return useMemo( () => (
    {
        formatCompact : ( value , options ) => formatCompact( value , locale , options ) ,
        formatNumber  : ( value , options ) => formatNumber( value , locale , options ) ,
        formatPercent : ( value , options ) => formatPercent( value , locale , options ) ,
        locale ,
    } )
    , [ locale ] ) ;
} ;

export default useNumberFormat ;
