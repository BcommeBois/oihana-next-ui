'use client' ;

import { useState } from 'react' ;

import Container  from '@/display/Container' ;
import InputClear from '@/components/inputs/InputClear' ;

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
 */
const InputClearDemo = () =>
{
    const [ search, setSearch ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">Input Clear Examples</h3>

            {/* Simple search */}
            <InputClear
                showIcon    = { false }
                placeholder = "Search products..."
            />

            {/* Controlled */}
            <InputClear
                value       = { search }
                onChange    = { setSearch }
                onClear     = { () => console.log( 'Search cleared!' ) }
                placeholder = "Controlled search..."
            />

            {/* With fieldset */}
            <InputClear
                useFieldset
                legend      = "Search"
                icon        = { <SearchIcon /> }
                placeholder = "Search in database..."
                helper      = "Type to search, click X to clear"
            />

            {/* Email with clear */}
            <InputClear
                type        = "email"
                label       = "Email Address"
                icon        = { <EmailIcon /> }
                placeholder = "your@email.com"
                helper      = "We'll never share your email"
            />

            {/* Filter with custom icon */}
            <InputClear
                icon        = { <FilterIcon /> }
                placeholder = "Filter results..."
            />

            {/* With error */}
            <InputClear
                useFieldset
                legend      = "Product Search"
                error       = "No products found"
                placeholder = "Search..."
            />

            {/* Disabled */}
            <InputClear
                disabled
                defaultValue = "Disabled search"
                placeholder  = "Search..."
            />

            {/* Read-only (no clear button) */}
            <InputClear
                readOnly
                defaultValue = "Read-only value"
                placeholder  = "Search..."
            />

        </Container>
    ) ;
} ;

export default InputClearDemo ;