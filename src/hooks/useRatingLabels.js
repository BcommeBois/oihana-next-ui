'use client' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import NO_LOCALE       from '../contexts/locale/noLocale' ;
import useI18n         from '../contexts/locale/useI18n' ;
import useNumberFormat from './useNumberFormat' ;

/**
 * What a rating says to a screen reader : each item, the clear control, and
 * the whole value when it is only shown.
 *
 * 🔑 **« 3 out of 5 », never « 3 stars »** : the items may be hearts, numbers
 * or icons. A half value is written in the language on screen — « 2,5 » in
 * French. `itemLabel( value , count )` replaces the item's words entirely.
 *
 * @module hooks/useRatingLabels
 *
 * @param {Object} options
 * @param {string} [options.ariaLabel] - What is rated (« Quality »). Named in the read-only value.
 * @param {string} [options.clearLabel] - Name of the clear control. Defaults to the i18n `clear` key.
 * @param {number} options.count - How many items the rating has.
 * @param {Function} [options.itemLabel] - `( value , count ) => string`, the name of one item.
 * @param {string} [options.path='components.rating'] - i18n path the labels are read from.
 *
 * @returns {{ clear : string , item : (value: number) => string , value : (value: number) => string }}
 */
const useRatingLabels = ( { ariaLabel , clearLabel , count , itemLabel , path = 'components.rating' } ) =>
{
    const {
        clear = 'Clear the rating' ,
        item  = '{0} out of {1}' ,
        named = '{0}: {1} out of {2}' ,
        value = 'Rated {0} out of {1}' ,
    } = useI18n( path , NO_LOCALE , false ) ;

    const { formatNumber } = useNumberFormat() ;

    const total = formatNumber( count ) ;

    return {
        clear : clearLabel ?? clear ,
        item  : current => itemLabel?.( current , count ) ?? format( item , formatNumber( current ) , total ) ,
        value : current => ariaLabel
            ? format( named , ariaLabel , formatNumber( current ) , total )
            : format( value , formatNumber( current ) , total ) ,
    } ;
} ;

export default useRatingLabels ;
