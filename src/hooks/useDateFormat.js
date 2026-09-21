'use client' ;

/**
 * Dates written in the language on screen and in the application's time zone.
 *
 * The language comes from the `LangProvider` ; the time zone from the
 * application's configuration, at `intl.timeZone` (`ConfigProvider`) :
 *
 * ```js
 * { intl : { timeZone : 'Europe/Paris' } }
 * ```
 *
 * 🚨 **An application whose server and readers may sit in different zones must
 * set it** — see {@link module:helpers/date/formatDate}. Without it, dates are
 * written in the zone of the machine that renders them.
 *
 * Both contexts are read defensively : outside their providers, the hook uses
 * the global dayjs locale and the machine's zone rather than throwing.
 *
 * @module hooks/useDateFormat
 */

import { use , useMemo } from 'react' ;

import get from 'vegas-js-core/src/objects/get' ;

import ConfigContext from '../contexts/config/context' ;
import LangContext   from '../contexts/lang/context' ;

import formatDate from '../helpers/date/formatDate' ;

/**
 * Where the application's time zone is read in its config.
 * @type {string}
 */
const TIME_ZONE_PATH = 'intl.timeZone' ;

/**
 * Dates written in the language on screen and in the application's time zone.
 *
 * @returns {{
 *   formatDate : (value: *, options?: { pattern?: string, timeZone?: string }) => ?string,
 *   lang       : ?string,
 *   timeZone   : ?string
 * }}
 *
 * @example
 * ```js
 * const { formatDate } = useDateFormat() ;
 *
 * formatDate( user.created ) ;                        // '17 septembre 2026'
 * formatDate( session.lastSeen , { pattern : 'LLL' } ) ; // '17 septembre 2026 10:32'
 * ```
 */
const useDateFormat = () =>
{
    const lang     = use( LangContext )?.lang ?? null ;
    const timeZone = get( use( ConfigContext )?.config ?? {} , TIME_ZONE_PATH , null ) ;

    return useMemo( () => (
    {
        formatDate : ( value , options ) => formatDate( value , lang , { timeZone , ...options } ) ,
        lang ,
        timeZone ,
    } )
    , [ lang , timeZone ] ) ;
} ;

export default useDateFormat ;
