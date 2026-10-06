'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;
import InputTime from '@/components/inputs/InputTime' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * InputTime demo component.
 *
 * The 24-hour and 12-hour fields, seconds and milliseconds, the hour alone,
 * and the time object handed back.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.time'] - Dot notation path to the demo locale.
 */
const InputTimeDemo = ( { path = 'demo.inputs.time' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ time24 , setTime24 ] = useState( '14:30' ) ;
    const [ time12 , setTime12 ] = useState( '02:30' ) ;
    const [ timeWithSeconds , setTimeWithSeconds ] = useState( '14:30:45' ) ;
    const [ timeObject , setTimeObject ] = useState( null ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.h24 }</h3>

                <InputTime
                    label    = { t.h24?.label }
                    value    = { time24 }
                    onChange = { setTime24 }
                    helper   = { t.h24?.helper }
                />

                <InputTime
                    label    = { t.seconds?.label }
                    value    = { timeWithSeconds }
                    onChange = { setTimeWithSeconds }
                    useSeconds
                    helper   = { t.seconds?.helper }
                />

                <InputTime
                    label           = { t.millis?.label }
                    useSeconds
                    useMilliseconds
                    defaultValue    = "14:30:45.123"
                    helper          = { t.millis?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.h12 }</h3>

                <InputTime
                    ampm
                    label           = { t.h12?.label }
                    value           = { time12 }
                    onChange        = { setTime12 }
                    defaultMeridiem = "PM"
                    helper          = { t.h12?.helper }
                />

                <InputTime
                    ampm
                    useSeconds
                    label           = { t.h12Seconds?.label }
                    defaultValue    = "02:30:45"
                    defaultMeridiem = "PM"
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <InputTime
                    useFieldset
                    legend = { t.appointment?.legend }
                    helper = { t.appointment?.helper }
                />

                <InputTime
                    ampm
                    useFieldset
                    legend          = { t.meeting?.legend }
                    defaultMeridiem = "PM"
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.noIcon }</h3>

                <InputTime
                    label    = { t.plain?.label }
                    showIcon = { false }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.hourOnly }</h3>

                <InputTime
                    label      = { t.hourOnly?.label }
                    useMinutes = { false }
                    helper     = { t.hourOnly?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.object }</h3>

                <InputTime
                    label  = { t.object?.label }
                    onTime = { setTimeObject }
                    helper = { timeObject
                        ? format( t.object?.typed ?? '' , timeObject.toString() )
                        : t.object?.empty }
                />

                { timeObject && (
                    <div className="text-sm bg-base-300 p-4 rounded-box">
                        <p><strong>{ t.object?.hour }</strong> { timeObject.hour }</p>
                        <p><strong>{ t.object?.minute }</strong> { timeObject.minute }</p>
                        <p><strong>{ t.object?.second }</strong> { timeObject.second }</p>
                        <p><strong>{ t.object?.text }</strong> { timeObject.toString() }</p>
                    </div>
                ) }
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.error }</h3>

                <InputTime
                    label = { t.invalid?.label }
                    error = { t.invalid?.error }
                />

                <InputTime
                    ampm
                    label = { t.unavailable?.label }
                    error = { t.unavailable?.error }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.disabled }</h3>

                <InputTime
                    label        = { t.plain?.label }
                    defaultValue = "14:30"
                    disabled
                />

                <InputTime
                    ampm
                    label           = { t.meeting?.legend }
                    defaultValue    = "02:30"
                    defaultMeridiem = "PM"
                    disabled
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.readOnly }</h3>

                <InputTime
                    label        = { t.plain?.label }
                    defaultValue = "14:30"
                    readOnly
                />

                <InputTime
                    ampm
                    label           = { t.meeting?.legend }
                    defaultValue    = "02:30"
                    defaultMeridiem = "PM"
                    readOnly
                />
            </div>

        </Container>
    ) ;
} ;

export default InputTimeDemo ;
