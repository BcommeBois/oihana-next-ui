'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import InputPin from '@/components/inputs/InputPin' ;

const InputPinDemo = () =>
{
    const [ otpValue    , setOtpValue    ] = useState( '' ) ;
    const [ pinValue    , setPinValue    ] = useState( '' ) ;
    const [ verifyError , setVerifyError ] = useState( '' ) ;

    const handleOtpComplete = ( value ) =>
    {
        console.log( 'OTP Complete:', value ) ;
        alert( `OTP entered: ${value}` ) ;
    } ;

    const handlePinComplete = value =>
    {
        console.log( 'PIN Complete:', value ) ;
        if ( value === '1234' )
        {
            setVerifyError( '' ) ;
            alert( 'PIN correct!' ) ;
        }
        else
        {
            setVerifyError( 'Invalid PIN code' ) ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input PIN/OTP Examples</h2>

            {/* Centered (default) */}
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Centered (Default)</h3>
                <InputPin
                    length       = { 6 }
                    type         = "number"
                    pattern      = "[0-9]"
                    value        = { otpValue }
                    onChange     = { setOtpValue }
                    onComplete   = { handleOtpComplete }
                    align        = "center"
                    helper       = "Enter the 6-digit code sent to your phone"
                />
            </div>

            {/* Aligned to start */}
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Aligned to Start</h3>
                <InputPin
                    length       = { 4 }
                    type         = "password"
                    pattern      = "[0-9]"
                    value        = { pinValue }
                    onChange     = { setPinValue }
                    onComplete   = { handlePinComplete }
                    align        = "start"
                    error        = { verifyError }
                    helper       = { !verifyError && "Try 1234" }
                />
            </div>

            {/* Aligned to end */}
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">Aligned to End</h3>
                <InputPin
                    length       = { 5 }
                    type         = "text"
                    pattern      = "[0-9A-Z]"
                    align        = "end"
                    onComplete   = { value => console.log( 'Code:', value ) }
                    helper       = "Aligned to the right"
                />
            </div>

            {/* With fieldset - centered */}
            <InputPin
                useFieldset
                legend       = "Enter Verification Code (Centered)"
                length       = { 6 }
                type         = "number"
                pattern      = "[0-9]"
                align        = "center"
                onComplete   = { value => console.log( 'Code:', value ) }
                helper       = "Code expires in 5 minutes"
            />

            {/* With fieldset - start */}
            <InputPin
                useFieldset
                legend       = "Enter PIN (Start)"
                length       = { 4 }
                type         = "password"
                pattern      = "[0-9]"
                align        = "start"
                onComplete   = { value => console.log( 'PIN:', value ) }
                helper       = "4-digit PIN code"
            />

            {/* Custom styling with alignment */}
            <InputPin
                useFieldset
                legend       = "Custom Styled PIN (End)"
                length       = { 4 }
                type         = "number"
                pattern      = "[0-9]"
                align        = "end"
                inputClassName = "input-primary"
                onComplete   = { value => console.log( 'PIN:', value ) }
            />

            {/* Disabled */}
            <InputPin
                disabled
                defaultValue = "1234"
                label        = "Disabled PIN"
                helper       = "This input is currently locked"
            />

        </Container>
    ) ;
} ;

export default InputPinDemo ;