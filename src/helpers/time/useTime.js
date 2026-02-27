// @/hooks/useTime.js

import { useEffect, useState } from 'react' ;
import { usePrevious } from 'react-use' ;

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import useValue from '@/hooks/useValue' ;
import Time from '@/helpers/time/Time' ;
import { AM, PM } from '@/helpers/time/meridies' ;

/**
 * React hook to manage time state with AM/PM support.
 *
 * @param {Object} options
 * @param {boolean} [options.ampm=false] - Use 12-hour format
 * @param {string} [options.defaultMeridiem] - Default meridiem (AM/PM)
 * @param {string} [options.defaultValue] - Default time value
 * @param {string} [options.meridiemFromProps] - Controlled meridiem
 * @param {string} [options.valueFromProps] - Controlled value
 * @param {Function} [options.onChangeFromProps] - Value change callback
 * @param {Function} [options.onChangeMeridiemFromProps] - Meridiem change callback
 * @param {Function} [options.onTime] - Time object change callback
 *
 * @returns {Object} Time state and setters
 *
 * @example
 * const { value, meridiem, time, setValue, setMeridiem, toggleMeridiem } = useTime({
 *     ampm: true,
 *     defaultValue: '14:30',
 *     defaultMeridiem: 'PM'
 * });
 */
const useTime =
({
    ampm = false,

    defaultMeridiem,
    defaultValue,

    meridiemFromProps,
    valueFromProps,

    onChangeFromProps,
    onChangeMeridiemFromProps,
    onTime,
}) =>
{
    // --------- Controlled / Uncontrolled state

    const [ value    , setValue    ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;
    const [ meridiem , setMeridiem ] = useValue( defaultMeridiem, meridiemFromProps, onChangeMeridiemFromProps ) ;
    const [ time     , setTime      ] = useState( null ) ;

    // --------- Setters

    const toggleMeridiem = () =>
    {
        setMeridiem( meridiem === AM ? PM : AM ) ;
    } ;

    // --------- Track previous values

    const previousAmpm     = usePrevious( ampm ) ;
    const previousMeridiem = usePrevious( meridiem ) ;
    const previousValue    = usePrevious( value ) ;

    // --------- Initialize meridiem in AM/PM mode

    useEffect( () =>
    {
        if ( ampm && !meridiem )
        {
            setMeridiem( defaultMeridiem ?? AM ) ;
        }
    }, [ ampm, meridiem, defaultMeridiem, setMeridiem ] ) ;

    // --------- Sync Time object with value and format changes

    useEffect( () =>
    {
        // Skip if nothing changed
        if ( value === previousValue && ampm === previousAmpm && meridiem === previousMeridiem )
        {
            return ;
        }

        let timeString = value || '' ;

        if ( notEmpty( timeString ) && ampm && notEmpty( meridiem ) )
        {
            timeString += ` ${meridiem}` ;
        }

        try
        {
            const newTime = notEmpty( timeString ) ? new Time( timeString ) : null ;

            if ( newTime && newTime.ampm !== ampm )
            {
                newTime.ampm = ampm ;
            }

            const hasChanged = ( newTime === null && time !== null )
                            || ( newTime !== null && time === null )
                            || ( newTime !== null && !newTime.equals( time ) ) ;

            if ( hasChanged )
            {
                setTime( newTime ) ;
                onTime?.( newTime ) ;
            }
        }
        catch ( error )
        {
            console.error( 'Invalid time:', timeString, error ) ;

            // Ne mettre à jour que si time n'est pas déjà null
            if ( time !== null )
            {
                setTime( null ) ;
                onTime?.( null ) ;
            }
        }
    }
    , [ value, ampm, meridiem, previousValue, previousAmpm, previousMeridiem, time, onTime ] ) ;

    // --------- Sync value when switching between 12h/24h formats

    useEffect( () =>
    {
        if ( !time || previousAmpm === ampm )
        {
            return ;
        }

        const newTime = new Time( time.toObject() ) ;
        newTime.ampm = ampm ;

        const newValue = newTime.value ; // Sans meridiem

        if ( newValue !== value )
        {
            setValue( newValue ) ;
        }

        if ( ampm && newTime.meridiem !== meridiem )
        {
            setMeridiem( newTime.meridiem ) ;
        }
    } , [ ampm, previousAmpm, time, value, meridiem, setValue, setMeridiem ] ) ;

    // --------- Return state and setters

    return {
        value,
        meridiem,
        time,
        setValue,
        setMeridiem,
        toggleMeridiem,

        // Debug helpers
        previousValue,
        previousMeridiem,
        previousAmpm,
    } ;
} ;

export default useTime ;