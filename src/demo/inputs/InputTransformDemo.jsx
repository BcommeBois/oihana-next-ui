'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import InputTransform from '@/components/inputs/Input' ;

const InputTransformDemo = () =>
{
    const [ email, setEmail ] = useState( '' ) ;
    const [ phone, setPhone ] = useState( '' ) ;
    const [ isEmailValid, setIsEmailValid ] = useState( true ) ;

    const validateEmail = ( value ) =>
    {
        const valid = !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value ) ;
        setIsEmailValid( valid ) ;
        return valid ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Transform Examples</h2>

            {/* Uppercase transformation */}
            <InputTransform
                label       = "Product Code (Uppercase)"
                transform   = { v => v.toUpperCase() }
                placeholder = "Enter code"
                helper      = "Automatically converted to uppercase"
            />

            {/* Lowercase transformation */}
            <InputTransform
                label       = "Username (Lowercase)"
                transform   = { v => v.toLowerCase() }
                placeholder = "Enter username"
                helper      = "Automatically converted to lowercase"
            />

            {/* Email validation with revert */}
            <InputTransform
                label       = "Email Address"
                value       = { email }
                onChange    = { setEmail }
                validate    = { validateEmail }
                error       = { !isEmailValid ? 'Invalid email format' : '' }
                placeholder = "your@email.com"
                helper      = "Reverts to previous value if invalid on blur"
            />

            {/* Phone formatting (display only) - CORRIGÉ */}
            <InputTransform
                label       = "Phone Number (FR Format)"
                value       = { phone }
                onChange    = { setPhone }
                transform   = { v => v.replace( /\D/g, '' ).slice( 0, 10 ) }
                format      = { v => v.replace( /(\d{2})(?=\d)/g, '$1 ' ).trim() }
                placeholder = "0123456789"
                helper      = { `Formatted as: 01 23 45 67 89 (${phone.length}/10 digits)` }
            />

            {/* Remove spaces and special chars */}
            <InputTransform
                label       = "Alphanumeric Only"
                transform   = { v => v.replace( /[^a-zA-Z0-9]/g, '' ) }
                placeholder = "Only letters and numbers"
                helper      = "Special characters are removed"
            />

            {/* Trim on blur - CORRIGÉ */}
            <InputTransform
                label         = "Name (Trimmed on Blur)"
                processOnBlur = { v => v.trim() }
                placeholder   = "Enter name"
                helper        = "Leading and trailing spaces removed when you leave the field"
            />

            {/* Number only with custom validation */}
            <InputTransform
                label       = "Age (18-99)"
                type        = "text"
                transform   = { v => v.replace( /\D/g, '' ).slice( 0, 2 ) }
                validate    = { v => !v || ( parseInt( v ) >= 18 && parseInt( v ) <= 99 ) }
                placeholder = "18"
                helper      = "Only numbers between 18 and 99"
            />

            {/* Process value before onChange */}
            <InputTransform
                label       = "Price (Stored as cents)"
                transform   = { v => v.replace( /[^\d.]/g, '' ) }
                format      = { v => v ? `${v} €` : '' }
                process     = { v => Math.round( parseFloat( v || 0 ) * 100 ) }
                placeholder = "0.00"
                helper      = "Displayed as euros, stored as cents"
            />

            {/* Trim start while typing, full trim on blur */}
            <InputTransform
                label         = "Username (Advanced Trim)"
                transform     = { v => v.trimStart() }
                processOnBlur = { v => v.trim() }
                placeholder   = "Enter username"
                helper        = "Leading spaces removed while typing, all spaces trimmed on blur"
            />

        </Container>
    ) ;
} ;

export default InputTransformDemo ;