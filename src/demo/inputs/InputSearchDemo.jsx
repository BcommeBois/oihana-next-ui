'use client' ;

import { useState } from 'react' ;

import Container   from '@/display/Container' ;
import InputSearch from '@/components/inputs/InputSearch' ;

/**
 * InputSearch demo component.
 *
 * Demonstrates various configurations and use cases for InputSearch.
 */
const InputSearchDemo = () =>
{
    const [ loading, setLoading ] = useState( false ) ;
    const [ results, setResults ] = useState( [] ) ;

    const handleSearch = async value =>
    {
        if ( !value )
        {
            return ;
        }

        setLoading( true ) ;

        try
        {
            console.log( 'Searching for:', value ) ;
            // Simuler un appel API
            await new Promise( resolve => setTimeout( resolve, 1000 ) ) ;
            setResults( [ 'Result 1', 'Result 2', 'Result 3' ] ) ;
        }
        finally
        {
            setLoading( false ) ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">Input Search Examples</h3>

            {/* Recherche automatique avec debounce (pas de bouton search) */}
            <InputSearch
                placeholder      = "Search products (auto-search with 500ms debounce)..."
                onSearch         = { value => console.log( 'Auto-searching:', value ) }
                debounceDelay    = { 500 }
                showSearchButton = { false }
            />

            {/* Recherche manuelle (clic ou Enter uniquement) */}
            <InputSearch
                placeholder = "Search manually (click button or press Enter)..."
                onSearch    = { handleSearch }
            />

            {/* Hybride : debounce + bouton */}
            <InputSearch
                placeholder   = "Hybrid search (300ms debounce + button)..."
                onSearch      = { handleSearch }
                debounceDelay = { 300 }
                helper        = { loading ? 'Searching...' : 'Type to search or click button' }
            />

            {/* Avec fieldset */}
            <InputSearch
                useFieldset
                legend      = "Product Search"
                placeholder = "Search in database..."
                onSearch    = { value => console.log( 'Searching:', value ) }
                helper      = "Press Enter or click search button"
            />

            {/* Sans bouton clear */}
            <InputSearch
                placeholder     = "With a clear button..."
                onSearch        = { handleSearch }
                showClearButton = { true }
            />

            {/* Sans icône à gauche */}
            <InputSearch
                placeholder = "No left icon..."
                onSearch    = { handleSearch }
                showIcon    = { false }
            />

            {/* Avec erreur */}
            <InputSearch
                useFieldset
                legend      = "Search"
                placeholder = "Search..."
                error       = "No results found"
                onSearch    = { handleSearch }
            />

            {/* Disabled */}
            <InputSearch
                disabled
                defaultValue = "Disabled search"
                placeholder  = "Search..."
                onSearch     = { handleSearch }
            />

            {/* Read-only (pas de boutons) */}
            <InputSearch
                readOnly
                defaultValue = "Read-only value"
                placeholder  = "Search..."
                onSearch     = { handleSearch }
            />

        </Container>
    ) ;
} ;

export default InputSearchDemo ;