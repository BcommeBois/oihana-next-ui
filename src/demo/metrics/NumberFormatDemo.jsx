'use client' ;

/**
 * NumberFormatDemo — `useNumberFormat` on the language on screen, and the three
 * helpers side by side on a few locales.
 *
 * The first table follows the language switch of the navbar : `fr` gives
 * `fr-FR`, `en` gives `en-GB`, through the `intl.locales` table of the lab's
 * configuration. The second one is independent of it.
 *
 * Every compact number is drawn after hydration only : its abbreviations are
 * engine data, and in `en-GB` Node and the browser do not write them the same
 * way (see {@link module:helpers/numbers/formatCompact}).
 *
 * @module demo/metrics/NumberFormatDemo
 */

import useIsHydrated   from '@/hooks/useIsHydrated' ;
import useNumberFormat from '@/hooks/useNumberFormat' ;

import formatCompact from '@/helpers/numbers/formatCompact' ;
import formatNumber  from '@/helpers/numbers/formatNumber' ;
import formatPercent from '@/helpers/numbers/formatPercent' ;

/**
 * The options every ratio of the demo is formatted with : whole percentages,
 * two decimals under 10 %.
 * @type {Object}
 */
const SHARE = { maximumFractionDigits : 0 , smallBelow : 0.1 } ;

/**
 * Ratios, including negative ones : a `ratio < 0.1` test gave every one of
 * them two decimals.
 * @type {number[]}
 */
const RATIOS = [ 0.254 , 0.0042 , -0.042 , -0.1234 , -0.5678 , 0 ] ;

/**
 * Amounts from a few euros to tens of millions.
 * @type {number[]}
 */
const AMOUNTS = [ 12.5 , 168000 , 163174.19 , 85011246.93 ] ;

/**
 * Locales compared in the second table.
 * @type {string[]}
 */
const LOCALES = [ 'fr-FR' , 'en-GB' , 'en-US' , 'de-DE' ] ;

/**
 * What the removed pattern printed : two decimals whenever `ratio < 0.1`,
 * negative ratios included.
 *
 * @param {number} ratio
 * @param {string} locale
 * @returns {string}
 */
const before = ( ratio , locale ) => new Intl.NumberFormat( locale ,
    { style : 'percent' , maximumFractionDigits : ratio < 0.1 ? 2 : 0 } ).format( ratio ) ;

const NumberFormatDemo = () =>
{
    const { formatCompact : compact , formatNumber : number , formatPercent : percent , locale } = useNumberFormat() ;

    const hydrated = useIsHydrated() ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">

                <h2 className="card-title">useNumberFormat — locale : <code>{ locale }</code></h2>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Ratio</th>
                                <th>formatPercent</th>
                                <th className="text-base-content/65">ratio &lt; 0.1 (avant)</th>
                            </tr>
                        </thead>
                        <tbody>
                            { RATIOS.map( ratio => (
                                <tr key={ ratio }>
                                    <td><code>{ ratio }</code></td>
                                    <td className="tabular-nums">{ percent( ratio , SHARE ) }</td>
                                    <td className="tabular-nums text-base-content/65">{ before( ratio , locale ) }</td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Montant</th>
                                <th>formatNumber (EUR)</th>
                                <th>formatCompact (EUR)</th>
                                <th>formatCompact</th>
                            </tr>
                        </thead>
                        <tbody>
                            { AMOUNTS.map( amount => (
                                <tr key={ amount }>
                                    <td><code>{ amount }</code></td>
                                    <td className="tabular-nums">{ number( amount , { currency : 'EUR' , style : 'currency' } ) }</td>
                                    <td className="tabular-nums">{ hydrated ? compact( amount , { currency : 'EUR' } ) : null }</td>
                                    <td className="tabular-nums">{ hydrated ? compact( amount ) : null }</td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </div>

                { hydrated && (
                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Locale</th>
                                    <th>formatNumber( 1234567.891 )</th>
                                    <th>formatPercent( -0.042 )</th>
                                    <th>formatCompact( 168000 , EUR )</th>
                                </tr>
                            </thead>
                            <tbody>
                                { LOCALES.map( tag => (
                                    <tr key={ tag }>
                                        <td><code>{ tag }</code></td>
                                        <td className="tabular-nums">{ formatNumber( 1234567.891 , tag ) }</td>
                                        <td className="tabular-nums">{ formatPercent( -0.042 , tag , SHARE ) }</td>
                                        <td className="tabular-nums">{ formatCompact( 168000 , tag , { currency : 'EUR' } ) }</td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    </div>
                ) }

            </div>
        </div>
    ) ;
} ;

NumberFormatDemo.displayName = 'NumberFormatDemo' ;

export default NumberFormatDemo ;
