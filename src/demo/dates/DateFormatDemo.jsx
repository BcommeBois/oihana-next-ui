'use client' ;

/**
 * DateFormatDemo — one instant, written in three time zones.
 *
 * The `useDateFormat` column follows the language switch of the navbar and the
 * `intl.timeZone` of the lab's configuration. The « machine » column is what a
 * date without a zone reads : it is drawn after hydration only, since on a
 * server running another zone it would differ from the browser's — the very
 * mismatch a named zone prevents.
 *
 * @module demo/dates/DateFormatDemo
 */

import useDateFormat from '@/hooks/useDateFormat' ;
import useIsHydrated from '@/hooks/useIsHydrated' ;

import formatDate from '@/helpers/date/formatDate' ;

/**
 * Instants as an API serves them, in UTC. The last two sit either side of
 * midnight in Paris, where the zone changes the DAY, not only the hour.
 * @type {string[]}
 */
const INSTANTS =
[
    '2026-09-17T08:32:00Z' ,
    '2026-12-17T08:32:00Z' ,
    '2026-09-17T21:45:00Z' ,
    '2026-09-17T22:15:00Z' ,
] ;

/**
 * Patterns shown for the first instant.
 * @type {string[]}
 */
const PATTERNS = [ 'LL' , 'LLL' , 'L' , 'DD/MM/YYYY' , 'dddd LL HH:mm' ] ;

/**
 * The pattern of the zone table.
 * @type {string}
 */
const PATTERN = 'LLL' ;

/**
 * Empty or unreadable values, all written `null`.
 * @type {Array<*>}
 */
const EMPTIES = [ null , undefined , '' , 'not a date' ] ;

const DateFormatDemo = () =>
{
    const { formatDate : write , lang , timeZone } = useDateFormat() ;

    const hydrated = useIsHydrated() ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">

                <h2 className="card-title">
                    useDateFormat — <code>{ lang ?? '—' }</code> · <code>{ timeZone ?? '—' }</code>
                </h2>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Instant (UTC)</th>
                                <th>useDateFormat</th>
                                <th>UTC</th>
                                <th className="text-base-content/65">Machine (sans fuseau)</th>
                            </tr>
                        </thead>
                        <tbody>
                            { INSTANTS.map( instant => (
                                <tr key={ instant }>
                                    <td><code>{ instant }</code></td>
                                    <td>{ write( instant , { pattern : PATTERN } ) }</td>
                                    <td>{ formatDate( instant , lang , { pattern : PATTERN , timeZone : 'UTC' } ) }</td>
                                    <td className="text-base-content/65">{ hydrated ? formatDate( instant , lang , { pattern : PATTERN } ) : null }</td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Pattern</th>
                                <th>fr</th>
                                <th>en</th>
                            </tr>
                        </thead>
                        <tbody>
                            { PATTERNS.map( pattern => (
                                <tr key={ pattern }>
                                    <td><code>{ pattern }</code></td>
                                    <td>{ formatDate( INSTANTS[ 0 ] , 'fr' , { pattern , timeZone } ) }</td>
                                    <td>{ formatDate( INSTANTS[ 0 ] , 'en' , { pattern , timeZone } ) }</td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </div>

                <p className="text-sm">
                    Valeurs vides :{ ' ' }
                    { EMPTIES.map( value => (
                        <code key={ String( value ) } className="mr-2">
                            { JSON.stringify( value ) ?? 'undefined' } → { String( write( value ) ) }
                        </code>
                    ) ) }
                </p>

            </div>
        </div>
    ) ;
} ;

DateFormatDemo.displayName = 'DateFormatDemo' ;

export default DateFormatDemo ;
