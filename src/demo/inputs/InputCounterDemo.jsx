'use client' ;

import Container    from '@/display/Container' ;
import InputCounter from '@/components/inputs/InputCounter' ;

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
 */
const InputCounterDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">Input Counter Examples</h3>

            {/* Sans icône */}
            <InputCounter
                defaultValue = { 18 }
                min          = { 0 }
                max          = { 100 }
                showIcon     = { false }
            />

            {/* Sans stepper */}
            <InputCounter
                defaultValue = { 50 }
                showStepper  = { false }
            />

            {/* Simple counter */}
            <InputCounter
                defaultValue = { 18 }
                min          = { 0 }
                max          = { 120 }
                step         = { 1 }
                precision    = { 0 }
                placeholder  = "Age"
            />

            {/* With fieldset */}
            <InputCounter
                useFieldset
                legend       = "Your age"
                icon         = { <BirthdayIcon /> }
                defaultValue = { 25 }
                min          = { 18 }
                max          = { 99 }
                step         = { 1 }
                precision    = { 0 }
                helper       = "You must be 18 or older"
            />

            {/* Quantity counter */}
            <InputCounter
                useFieldset
                legend       = "Quantity"
                icon         = { <CartIcon /> }
                defaultValue = { 1 }
                min          = { 1 }
                max          = { 99 }
                step         = { 1 }
                precision    = { 0 }
            />

            {/* With error state */}
            <InputCounter
                useFieldset
                legend       = "Price"
                defaultValue = { 0 }
                min          = { 0 }
                max          = { 9999 }
                step         = { 0.01 }
                precision    = { 2 }
                error        = "Price must be greater than 0"
            />

            {/* Read-only (no stepper) */}
            <InputCounter
                defaultValue = { 100 }
                readOnly
                placeholder  = "Read-only counter"
            />

            {/* Disabled */}
            <InputCounter
                defaultValue = { 50 }
                disabled
                placeholder  = "Disabled counter"
            />

        </Container>
    ) ;
} ;

export default InputCounterDemo ;