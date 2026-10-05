'use client' ;

import { useState } from 'react' ;

import Container  from '@/display/Container' ;
import InputClear from '@/components/inputs/InputClear' ;

import useI18n from '@/contexts/locale/useI18n' ;

import {
    FaFilter   as FilterIcon ,
    FaEnvelope as EmailIcon  ,
    FaSearch   as SearchIcon ,
}
from "react-icons/fa" ;

/**
 * InputClear demo component.
 *
 * Demonstrates various configurations and use cases for InputClear.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.clear'] - Dot notation path to the demo locale.
 */
const InputClearDemo = ( { path = 'demo.inputs.clear' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ search , setSearch ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">{ t.title }</h3>

            <InputClear
                showIcon    = { false }
                placeholder = { t.simple?.placeholder }
            />

            <InputClear
                value       = { search }
                onChange    = { setSearch }
                onClear     = { () => console.log( 'Search cleared!' ) }
                placeholder = { t.controlled?.placeholder }
            />

            <InputClear
                useFieldset
                legend      = { t.fieldset?.legend }
                icon        = { <SearchIcon /> }
                placeholder = { t.fieldset?.placeholder }
                helper      = { t.fieldset?.helper }
            />

            <InputClear
                type        = "email"
                label       = { t.email?.label }
                icon        = { <EmailIcon /> }
                placeholder = { t.email?.placeholder }
                helper      = { t.email?.helper }
            />

            <InputClear
                icon        = { <FilterIcon /> }
                placeholder = { t.filter?.placeholder }
            />

            <InputClear
                useFieldset
                legend      = { t.error?.legend }
                error       = { t.error?.error }
                placeholder = { t.search }
            />

            <InputClear
                disabled
                defaultValue = { t.disabled?.value }
                placeholder  = { t.search }
            />

            <InputClear
                readOnly
                defaultValue = { t.readOnly?.value }
                placeholder  = { t.search }
            />

        </Container>
    ) ;
} ;

export default InputClearDemo ;
