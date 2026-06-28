import padTo2Digits from 'vegas-js-core/src/numbers/padTo2Digits' ;

import convertTo24Hour from './convertTo24Hour' ;
import { AM, PM } from './meridies' ;

const range = ( start , end , step = 1 ) =>
{
    const out = [] ;
    for ( let v = start ; v <= end ; v += step )
    {
        out.push( v ) ;
    }
    return out ;
} ;

/** Seconds-since-midnight for a (24h hour, minute, second) triple. */
const toSeconds = ( hour24 , minute , second ) => hour24 * 3600 + minute * 60 + second ;

/** Seconds-since-midnight of a 24-hour Time bound (null-safe). */
const boundSeconds = ( time ) => time ? toSeconds( time.hour , time.minute , time.second ) : null ;

/**
 * Builds the column descriptors for the {@link module:components/times/TimeColumns}
 * picker : hours, minutes, optional seconds and optional AM/PM, each option carrying
 * `selected` and `disabled` flags. Pure / testable.
 *
 * Bounds (`min` / `max`) are interpreted as **24-hour** Time objects, regardless of
 * the picker's `ampm` display. Disabling is pragmatic, per column (best case across
 * the finer columns) : an hour is disabled when its whole 1-hour span is out of
 * range, a minute when its whole 1-minute span is out for the selected hour, etc.
 *
 * @param {Object} options
 * @param {import('./Time').default|null} options.time - The current selection (or null).
 * @param {string|null} [options.meridiem] - Active meridiem (AM/PM) when `ampm`.
 * @param {boolean} [options.ampm=false] - 12-hour display (hours 1–12 + AM/PM column).
 * @param {boolean} [options.useSeconds=false] - Include a seconds column.
 * @param {number} [options.minuteStep=1] - Minutes increment.
 * @param {number} [options.secondStep=1] - Seconds increment.
 * @param {import('./Time').default|null} [options.min] - Earliest selectable time (24h).
 * @param {import('./Time').default|null} [options.max] - Latest selectable time (24h).
 * @returns {{ hours:Object[], minutes:Object[], seconds:Object[]|null, meridiem:Object[]|null }}
 */
export const getTimeColumns =
({
    time ,
    meridiem ,
    ampm = false ,
    useSeconds = false ,
    minuteStep = 1 ,
    secondStep = 1 ,
    min ,
    max ,
} = {}) =>
{
    const minSec = boundSeconds( min ) ;
    const maxSec = boundSeconds( max ) ;

    const selHour   = time ? time.hour : null ;
    const selMinute = time ? time.minute : null ;
    const selSecond = time ? time.second : null ;
    const merid     = ampm ? ( time ? time.meridiem : meridiem ) ?? AM : null ;

    const toHour24 = ( hour ) => ampm ? convertTo24Hour( hour , merid ) : hour ;

    const spanDisabled = ( earliest , latest ) =>
        ( minSec != null && latest < minSec ) || ( maxSec != null && earliest > maxSec ) ;

    // ---- Hours
    const hours = ( ampm ? range( 1 , 12 ) : range( 0 , 23 ) ).map( ( value ) =>
    {
        const h24 = toHour24( value ) ;
        return {
            value ,
            label    : padTo2Digits( value ) ,
            selected : value === selHour ,
            disabled : spanDisabled( toSeconds( h24 , 0 , 0 ) , toSeconds( h24 , 59 , 59 ) ) ,
        } ;
    } ) ;

    // ---- Minutes (bounds relative to the selected hour)
    const baseHour24 = toHour24( selHour ?? ( ampm ? 12 : 0 ) ) ;
    const minutes = range( 0 , 59 , minuteStep ).map( ( value ) =>
    ({
        value ,
        label    : padTo2Digits( value ) ,
        selected : value === selMinute ,
        disabled : spanDisabled( toSeconds( baseHour24 , value , 0 ) , toSeconds( baseHour24 , value , 59 ) ) ,
    }) ) ;

    // ---- Seconds (bounds relative to the selected hour + minute)
    const baseMinute = selMinute ?? 0 ;
    const seconds = useSeconds
        ? range( 0 , 59 , secondStep ).map( ( value ) =>
        {
            const t = toSeconds( baseHour24 , baseMinute , value ) ;
            return {
                value ,
                label    : padTo2Digits( value ) ,
                selected : value === selSecond ,
                disabled : ( minSec != null && t < minSec ) || ( maxSec != null && t > maxSec ) ,
            } ;
        } )
        : null ;

    // ---- Meridiem (no bound disabling in this lot)
    const meridiemOptions = ampm
        ? [ AM , PM ].map( ( value ) => ({ value , label : value , selected : value === merid , disabled : false }) )
        : null ;

    return { hours , minutes , seconds , meridiem : meridiemOptions } ;
} ;

export default getTimeColumns ;
