'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;
import Input     from '@/components/inputs/Input' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * Input transform demo component.
 *
 * Nine fields that change what is typed : the case, the characters kept, what
 * is shown against what is stored, and what a blur settles.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.transform'] - Dot notation path to the demo locale.
 */
const InputTransformDemo = ( { path = 'demo.inputs.transform' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ email , setEmail ] = useState( '' ) ;
    const [ phone , setPhone ] = useState( '' ) ;
    const [ isEmailValid , setIsEmailValid ] = useState( true ) ;

    const validateEmail = ( value ) =>
    {
        const valid = !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value ) ;
        setIsEmailValid( valid ) ;
        return valid ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <Input
                label       = { t.upper?.label }
                transform   = { v => v.toUpperCase() }
                placeholder = { t.upper?.placeholder }
                helper      = { t.upper?.helper }
            />

            <Input
                label       = { t.lower?.label }
                transform   = { v => v.toLowerCase() }
                placeholder = { t.lower?.placeholder }
                helper      = { t.lower?.helper }
            />

            <Input
                label       = { t.email?.label }
                value       = { email }
                onChange    = { setEmail }
                validate    = { validateEmail }
                error       = { !isEmailValid ? t.email?.error : '' }
                placeholder = { t.email?.placeholder }
                helper      = { t.email?.helper }
            />

            <Input
                label       = { t.phone?.label }
                value       = { phone }
                onChange    = { setPhone }
                transform   = { v => v.replace( /\D/g , '' ).slice( 0 , 10 ) }
                format      = { v => v.replace( /(\d{2})(?=\d)/g , '$1 ' ).trim() }
                placeholder = { t.phone?.placeholder }
                helper      = { format( t.phone?.helper ?? '' , phone.length ) }
            />

            <Input
                label       = { t.alphanumeric?.label }
                transform   = { v => v.replace( /[^a-zA-Z0-9]/g , '' ) }
                placeholder = { t.alphanumeric?.placeholder }
                helper      = { t.alphanumeric?.helper }
            />

            <Input
                label         = { t.trimmed?.label }
                processOnBlur = { v => v.trim() }
                placeholder   = { t.trimmed?.placeholder }
                helper        = { t.trimmed?.helper }
            />

            <Input
                label       = { t.age?.label }
                type        = "text"
                transform   = { v => v.replace( /\D/g , '' ).slice( 0 , 2 ) }
                validate    = { v => !v || ( parseInt( v ) >= 18 && parseInt( v ) <= 99 ) }
                placeholder = { t.age?.placeholder }
                helper      = { t.age?.helper }
            />

            <Input
                label       = { t.price?.label }
                transform   = { v => v.replace( /[^\d.]/g , '' ) }
                format      = { v => v ? `${ v } €` : '' }
                process     = { v => Math.round( parseFloat( v || 0 ) * 100 ) }
                placeholder = { t.price?.placeholder }
                helper      = { t.price?.helper }
            />

            <Input
                label         = { t.advancedTrim?.label }
                transform     = { v => v.trimStart() }
                processOnBlur = { v => v.trim() }
                placeholder   = { t.advancedTrim?.placeholder }
                helper        = { t.advancedTrim?.helper }
            />

        </Container>
    ) ;
} ;

export default InputTransformDemo ;
