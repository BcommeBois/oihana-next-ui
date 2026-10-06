'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;
import InputPin  from '@/components/inputs/InputPin' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * InputPin demo component.
 *
 * A code typed one box at a time : the three alignments, fieldsets, a code
 * checked on completion, and a locked field.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.pin'] - Dot notation path to the demo locale.
 */
const InputPinDemo = ( { path = 'demo.inputs.pin' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ otpValue    , setOtpValue    ] = useState( '' ) ;
    const [ pinValue    , setPinValue    ] = useState( '' ) ;
    const [ verifyError , setVerifyError ] = useState( '' ) ;

    const handleOtpComplete = ( value ) =>
    {
        alert( format( t.otp?.entered ?? '' , value ) ) ;
    } ;

    const handlePinComplete = value =>
    {
        if ( value === '1234' )
        {
            setVerifyError( '' ) ;
            alert( t.code?.correct ) ;
        }
        else
        {
            setVerifyError( t.code?.invalid ) ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{ t.sections?.center }</h3>
                <InputPin
                    length     = { 6 }
                    type       = "number"
                    pattern    = "[0-9]"
                    value      = { otpValue }
                    onChange   = { setOtpValue }
                    onComplete = { handleOtpComplete }
                    align      = "center"
                    helper     = { t.otp?.helper }
                />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{ t.sections?.start }</h3>
                <InputPin
                    length     = { 4 }
                    type       = "password"
                    pattern    = "[0-9]"
                    value      = { pinValue }
                    onChange   = { setPinValue }
                    onComplete = { handlePinComplete }
                    align      = "start"
                    error      = { verifyError }
                    helper     = { !verifyError && t.code?.helper }
                />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{ t.sections?.end }</h3>
                <InputPin
                    length     = { 5 }
                    type       = "text"
                    pattern    = "[0-9A-Z]"
                    align      = "end"
                    onComplete = { value => console.log( 'Code:' , value ) }
                    helper     = { t.right?.helper }
                />
            </div>

            <InputPin
                useFieldset
                legend     = { t.verification?.legend }
                length     = { 6 }
                type       = "number"
                pattern    = "[0-9]"
                align      = "center"
                onComplete = { value => console.log( 'Code:' , value ) }
                helper     = { t.verification?.helper }
            />

            <InputPin
                useFieldset
                legend     = { t.fourDigits?.legend }
                length     = { 4 }
                type       = "password"
                pattern    = "[0-9]"
                align      = "start"
                onComplete = { value => console.log( 'PIN:' , value ) }
                helper     = { t.fourDigits?.helper }
            />

            <InputPin
                useFieldset
                legend         = { t.styled?.legend }
                length         = { 4 }
                type           = "number"
                pattern        = "[0-9]"
                align          = "end"
                inputClassName = "input-primary"
                onComplete     = { value => console.log( 'PIN:' , value ) }
            />

            <InputPin
                disabled
                defaultValue = "1234"
                label        = { t.disabled?.label }
                helper       = { t.disabled?.helper }
            />

        </Container>
    ) ;
} ;

export default InputPinDemo ;
