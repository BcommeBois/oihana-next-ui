'use client' ;

import { useEffect , useState } from 'react' ;

import Link from '@/components/links/Link' ;

/** A day, in milliseconds. */
export const DAY = 24 * 60 * 60 * 1000 ;

/** How many days each period covers ; a year is drawn month by month. */
export const PERIODS = { month : 30 , week : 7 , year : 365 } ;

/**
 * A number between 0 and 1 drawn from a seed : the same seed, the same number.
 * (mulberry32)
 *
 * @param {number} seed
 * @returns {number}
 */
export const noise = seed =>
{
    let value = ( seed + 0x6d2b79f5 ) | 0 ;
    value = Math.imul( value ^ ( value >>> 15 ) , value | 1 ) ;
    value ^= value + Math.imul( value ^ ( value >>> 7 ) , value | 61 ) ;
    return ( ( value ^ ( value >>> 14 ) ) >>> 0 ) / 4294967296 ;
} ;

/**
 * The number of a day since the epoch : the seed of everything measured that day.
 *
 * @param {Date} date
 * @returns {number}
 */
export const dayNumber = date => Math.floor( Date.UTC( date.getFullYear() , date.getMonth() , date.getDate() ) / DAY ) ;

/**
 * Today's number, read in the browser only : the server and the first render
 * must agree, and a date of the day may not. `null` until then.
 *
 * @returns {?number}
 */
export const useToday = () =>
{
    const [ today , setToday ] = useState( null ) ;

    useEffect( () =>
    {
        setToday( dayNumber( new Date() ) ) ;
    } , [] ) ;

    return today ;
} ;

/**
 * Groups days into months, oldest first, each with its days.
 *
 * @param {Array<{ day : number }>} days
 * @returns {Array<{ key : string , days : Array }>} `key` is `YYYY-MM`.
 */
export const byMonth = days =>
{
    const months = new Map() ;

    for ( const day of days )
    {
        const date = new Date( day.day * DAY ) ;
        const key  = `${ date.getUTCFullYear() }-${ String( date.getUTCMonth() + 1 ).padStart( 2 , '0' ) }` ;
        months.set( key , [ ...( months.get( key ) ?? [] ) , day ] ) ;
    }

    return [ ...months ].map( ( [ key , list ] ) => ( { days : list , key } ) ) ;
} ;

/**
 * A card of a dashboard : a title, then its content.
 */
export const Panel = ( { children , className = '' , title } ) => (
    <section className={ `flex min-w-0 flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm ${ className }` }>
        <h4 className="font-semibold">{ title }</h4>
        { children }
    </section>
) ;

/**
 * The components a screen is built of, each leading to its page.
 *
 * @param {Object} props
 * @param {Array<{ href : string , name : string }>} props.items
 * @param {string} [props.note]
 * @param {string} [props.title]
 */
export const UsedComponents = ( { items , note , title } ) => (
    <section className="flex flex-col gap-2">
        <h4 className="font-semibold">{ title }</h4>
        <p className="text-xs text-base-content/60">{ note }</p>
        <ul className="flex flex-wrap gap-2">
            { items.map( ( { href , name } ) => (
                <li key={ name }>
                    <Link className="badge badge-outline badge-sm font-mono hover:badge-primary" href={ href }>{ name }</Link>
                </li>
            ) ) }
        </ul>
    </section>
) ;
