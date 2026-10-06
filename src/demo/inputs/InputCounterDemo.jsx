'use client' ;

import Container    from '@/display/Container' ;
import InputCounter from '@/components/inputs/InputCounter' ;

import useI18n from '@/contexts/locale/useI18n' ;

import {
    FaBirthdayCake as BirthdayIcon ,
}
from "react-icons/fa" ;

import {
    MdShoppingCart as CartIcon ,
}
from "react-icons/md" ;

/**
 * InputCounter demo component.
 *
 * Demonstrates various configurations and use cases for InputCounter.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.counter'] - Dot notation path to the demo locale.
 */
const InputCounterDemo = ( { path = 'demo.inputs.counter' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">{ t.title }</h3>

            <InputCounter
                defaultValue = { 18 }
                min          = { 0 }
                max          = { 100 }
                showIcon     = { false }
            />

            <InputCounter
                defaultValue = { 50 }
                showStepper  = { false }
            />

            <InputCounter
                defaultValue = { 18 }
                min          = { 0 }
                max          = { 120 }
                step         = { 1 }
                precision    = { 0 }
                placeholder  = { t.age?.placeholder }
            />

            <InputCounter
                useFieldset
                legend       = { t.yourAge?.legend }
                icon         = { <BirthdayIcon /> }
                defaultValue = { 25 }
                min          = { 18 }
                max          = { 99 }
                step         = { 1 }
                precision    = { 0 }
                helper       = { t.yourAge?.helper }
            />

            <InputCounter
                useFieldset
                legend       = { t.quantity?.legend }
                icon         = { <CartIcon /> }
                defaultValue = { 1 }
                min          = { 1 }
                max          = { 99 }
                step         = { 1 }
                precision    = { 0 }
            />

            <InputCounter
                useFieldset
                legend       = { t.price?.legend }
                defaultValue = { 0 }
                min          = { 0 }
                max          = { 9999 }
                step         = { 0.01 }
                precision    = { 2 }
                error        = { t.price?.error }
            />

            <InputCounter
                defaultValue = { 100 }
                readOnly
                placeholder  = { t.readOnly?.placeholder }
            />

            <InputCounter
                defaultValue = { 50 }
                disabled
                placeholder  = { t.disabled?.placeholder }
            />

        </Container>
    ) ;
} ;

export default InputCounterDemo ;
