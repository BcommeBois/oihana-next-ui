import isString     from 'vegas-js-core/src/isString' ;
import notEmpty     from 'vegas-js-core/src/strings/notEmpty' ;
import padTo2Digits from 'vegas-js-core/src/numbers/padTo2Digits' ;
import padTo3Digits from 'vegas-js-core/src/numbers/padTo3Digits' ;

import convertTo12Hour               from './convertTo12Hour' ;
import convertTo24Hour               from './convertTo24Hour' ;
import parseTime                     from './parseTime' ;
import requireValidHourNumber        from './requireValidHourNumber' ;
import requireValidMillisecondNumber from './requireValidMillisecondNumber' ;
import requireValidMinuteNumber      from './requireValidMinuteNumber' ;
import requireValidSecondNumber      from './requireValidSecondNumber' ;

import meridies, { AM, PM } from './meridies' ;

export { AM, PM, meridies } ;

/**
 * This class provides helpers to store and manage time (hour, minutes, seconds, milliseconds).
 *
 * @example
 * const test = Time.parse( '22:52:25' ) ;
 * console.log( test.toString() ) ; // "22:52:25"
 *
 * test.ampm = true ;
 * console.log( test.toString() ) ; // "10:52:25 PM"
 *
 * @example
 * const time = new Time({ hour: 14, minute: 30 }) ;
 * console.log( time.toString() ) ; // "14:30"
 */
class Time
{
    /**
     * Creates a new Time instance.
     *
     * @param {Object|string} [init] - Time string or object with time components
     * @param {number} [init.hour=0] - Hour (0-23)
     * @param {number} [init.minute=0] - Minute (0-59)
     * @param {number} [init.second=0] - Second (0-59)
     * @param {number} [init.millisecond=0] - Millisecond (0-999)
     * @param {string} [init.meridiem] - 'AM' or 'PM'
     */
    constructor( init )
    {
        let hour, minute, second, millisecond, meridiem ;

        if ( isString( init ) && notEmpty( init ) )
        {
            ( [ hour = 0, minute = 0, second = 0, millisecond = 0, meridiem ] = parseTime( init ) ) ;
        }
        else
        {
            ( { hour = 0, minute = 0, second = 0, millisecond = 0, meridiem = null } = init || {} ) ;
        }

        this.#setTimeComponents( hour, minute, second, millisecond, meridiem ) ;
    }

    /**
     * Indicates if the time uses AM/PM format (true) or 24h format (false).
     * @type {boolean}
     */
    #ampm = false ;

    get ampm()
    {
        return this.#ampm ;
    }

    set ampm( bool )
    {
        if ( this.#ampm === bool )
        {
            return ;
        }

        if ( bool ) // Passer en format 12h
        {
            const [ hour12, meridiem ] = convertTo12Hour( this.#hour ) ;
            this.#hour = hour12 ;
            this.#meridiem = meridiem ;
        }
        else // Passer en format 24h
        {
            this.#hour = convertTo24Hour( this.#hour, this.#meridiem ) ;
            this.#meridiem = null ;
        }

        this.#ampm = bool ;
        this.#formatToString() ;
    }

    /**
     * The hour value.
     * @type {number}
     */
    #hour = 0 ;

    get hour()
    {
        return this.#hour ;
    }

    set hour( number )
    {
        this.#hour = requireValidHourNumber( number, this.#ampm ) ;

        // Mettre à jour le meridiem automatiquement si en mode 24h
        if ( !this.#ampm )
        {
            this.#meridiem = this.#hour >= 12 ? PM : AM ;
        }

        this.#formatToString() ;
    }

    /**
     * The meridiem component (AM or PM).
     * @type {string|null}
     */
    #meridiem = null ;

    get meridiem()
    {
        return this.#meridiem ;
    }

    set meridiem( value )
    {
        if ( this.#meridiem === value )
        {
            return ;
        }

        const meridiem = ( value === AM || value === PM ) ? value : null ;
        const wasAmPm = this.#ampm ;

        this.#ampm = notEmpty( meridiem ) ;
        this.#meridiem = meridiem ;

        // Si on change de format
        if ( wasAmPm !== this.#ampm )
        {
            if ( this.#ampm ) // Passer en format 12h
            {
                const [ hour12 ] = convertTo12Hour( this.#hour ) ;
                this.#hour = hour12 ;
            }
            else // Passer en format 24h
            {
                this.#hour = convertTo24Hour( this.#hour, meridiem ) ;
            }
        }

        this.#formatToString() ;
    }

    /**
     * The millisecond value.
     * @type {number}
     */
    #millisecond = 0 ;

    get millisecond()
    {
        return this.#millisecond ;
    }

    set millisecond( number )
    {
        this.#millisecond = requireValidMillisecondNumber( number ) ;
        this.#formatToString() ;
    }

    /**
     * The minute value.
     * @type {number}
     */
    #minute = 0 ;

    get minute()
    {
        return this.#minute ;
    }

    set minute( number )
    {
        this.#minute = requireValidMinuteNumber( number ) ;
        this.#formatToString() ;
    }

    /**
     * The second value.
     * @type {number}
     */
    #second = 0 ;

    get second()
    {
        return this.#second ;
    }

    set second( number )
    {
        this.#second = requireValidSecondNumber( number ) ;
        this.#formatToString() ;
    }

    /**
     * Get formatted time string.
     * @type {string}
     */
    get time()
    {
        return this.#_toString ;
    }

    /**
     * Get time value without meridiem.
     * @type {string}
     */
    #value ;

    get value()
    {
        return this.#value ;
    }

    /**
     * Check if this time equals another time.
     *
     * @param {Time|Object} time - Time to compare
     * @returns {boolean} True if equal
     */
    equals( time )
    {
        if ( time === null || time === undefined )
        {
            return false ;
        }

        if ( time === this )
        {
            return true ;
        }

        if ( time instanceof Time )
        {
            return time.time === this.#_toString ;
        }

        const { hour, minute, second, millisecond, meridiem, ampm } = time ;
        return this.#hour === hour
            && this.#minute === minute
            && this.#second === second
            && this.#millisecond === millisecond
            && this.#meridiem === meridiem
            && this.#ampm === ampm ;
    }

    /**
     * Create Time from Date object.
     *
     * @param {Date} date - Date object
     * @returns {Time} New Time instance
     */
    static from( date )
    {
        if ( date instanceof Date )
        {
            return new Time({
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds(),
                millisecond: date.getMilliseconds()
            }) ;
        }
        return new Time() ;
    }

    /**
     * Check if this time is after another time.
     *
     * @param {Time|Object} time - Time to compare
     * @returns {boolean} True if after
     */
    isAfter( time )
    {
        const { hour = 0, minute = 0, second = 0, millisecond = 0 } = time ;
        return this.#hour > hour
            || ( this.#hour === hour && (
                this.#minute > minute ||
                ( this.#minute === minute && (
                    this.#second > second ||
                    ( this.#second === second && this.#millisecond > millisecond )
                ))
            )) ;
    }

    /**
     * Check if this time is before another time.
     *
     * @param {Time|Object} time - Time to compare
     * @returns {boolean} True if before
     */
    isBefore( time )
    {
        const { hour = 0, minute = 0, second = 0, millisecond = 0 } = time ;
        return this.#hour < hour
            || ( this.#hour === hour && (
                this.#minute < minute ||
                ( this.#minute === minute && (
                    this.#second < second ||
                    ( this.#second === second && this.#millisecond < millisecond )
                ))
            )) ;
    }

    /**
     * Parse time string into Time instance.
     *
     * @param {string} expression - Time string (e.g., "14:30", "2:30 PM")
     * @returns {Time} New Time instance
     */
    static parse( expression )
    {
        const [ hour, minute, second, millisecond, meridiem ] = parseTime( expression ) ;
        return new Time({ hour, minute, second, millisecond, meridiem }) ;
    }

    /**
     * Set time components.
     *
     * @param {Object|string} [options] - Time string or object
     * @param {number} [options.hour] - Hour
     * @param {number} [options.minute] - Minute
     * @param {number} [options.second] - Second
     * @param {number} [options.millisecond] - Millisecond
     * @param {string} [options.meridiem] - 'AM' or 'PM'
     */
    set( options = {} )
    {
        let hour, minute, second, millisecond, meridiem ;

        if ( isString( options ) && notEmpty( options ) )
        {
            ( [ hour, minute, second, millisecond, meridiem ] = parseTime( options ) ) ;
        }
        else
        {
            ( { hour, minute, second, millisecond, meridiem } = options ) ;
        }

        this.#setTimeComponents( hour, minute, second, millisecond, meridiem ) ;
    }

    /**
     * Convert to plain object.
     *
     * @returns {Object} Time components
     */
    toObject()
    {
        const ampm        = this.ampm ;
        const hour        = this.hour ;
        const minute      = this.minute ;
        const second      = this.second ;
        const millisecond = this.millisecond ;
        const meridiem    = this.meridiem ;

        return { ampm, hour, minute, second, millisecond, meridiem } ;
    }

    /**
     * Convert to string.
     *
     * @returns {string} Formatted time string
     */
    toString()
    {
        return this.#_toString ;
    }

    /**
     * Private method to set all time components and update internal state.
     * Factorizes code used in both constructor and set() method.
     *
     * @private
     * @param {number} hour - Hour value
     * @param {number} minute - Minute value
     * @param {number} second - Second value
     * @param {number} millisecond - Millisecond value
     * @param {string|null} meridiem - Meridiem value ('AM', 'PM', or null)
     */
    #setTimeComponents( hour, minute, second, millisecond, meridiem )
    {
        this.#meridiem    = ( meridiem === AM || meridiem === PM ) ? meridiem : null ;
        this.#ampm        = notEmpty( this.#meridiem ) ;
        this.#hour        = requireValidHourNumber        ( hour, this.#ampm ) ;
        this.#minute      = requireValidMinuteNumber      ( minute ) ;
        this.#second      = requireValidSecondNumber      ( second ) ;
        this.#millisecond = requireValidMillisecondNumber ( millisecond ) ;
        this.#formatToString() ;
    }

    #_toString ;

    #formatToString()
    {
        let value = padTo2Digits( this.#hour ) + ':' + padTo2Digits( this.#minute ) ;

        if ( this.#second > 0 )
        {
            value += `:${padTo2Digits( this.#second )}` ;
        }

        if ( this.#millisecond > 0 )
        {
            value += `.${padTo3Digits( this.#millisecond )}` ;
        }

        this.#value = value ;

        if ( this.#ampm )
        {
            value += ' ' + this.#meridiem ;
        }

        this.#_toString = value ;
    }
}

export default Time ;