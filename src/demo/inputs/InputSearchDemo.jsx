'use client' ;

import { useCallback , useState } from 'react' ;

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

    // Every value the debounced field hands to `onSearch`, newest first.
    const [ searches , setSearches ] = useState( [] ) ;

    const logSearch = useCallback( value => setSearches( list => [ value , ...list ].slice( 0 , 8 ) ) , [] ) ;

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
            // Simulate an API call
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

            {/* Debounced search log : what reaches onSearch, and how often */}
            <div className="flex flex-col gap-3 rounded-box bg-base-100 p-4">
                <h4 className="font-semibold">Recherche différée</h4>
                <p className="text-sm text-base-content/70">
                    Chaque appel à <code>onSearch</code> s'ajoute au journal. Tapez puis attendez, effacez au clavier
                    puis attendez : la valeur vide part aussi. Entrée ou la loupe ne font partir une valeur qu'une fois.
                </p>
                <InputSearch
                    debounceDelay   = { 400 }
                    onSearch        = { logSearch }
                    placeholder     = "Tapez, effacez, appuyez sur Entrée…"
                    showClearButton
                />
                <ol className="flex flex-col gap-1 text-sm font-mono">
                    { searches.length === 0
                        ? <li className="text-base-content/50">Aucune recherche envoyée</li>
                        : searches.map( ( value , index ) => (
                            <li key={ `${ index }-${ value }` }>{ searches.length - index }. « { value } »</li>
                        ) ) }
                </ol>
            </div>

            {/* Debounced auto-search (no search button) */}
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

            {/* With fieldset */}
            <InputSearch
                useFieldset
                legend      = "Product Search"
                placeholder = "Search in database..."
                onSearch    = { value => console.log( 'Searching:', value ) }
                helper      = "Press Enter or click search button"
            />

            {/* Without clear button */}
            <InputSearch
                placeholder     = "With a clear button..."
                onSearch        = { handleSearch }
                showClearButton = { true }
            />

            {/* Without the leading icon */}
            <InputSearch
                placeholder = "No left icon..."
                onSearch    = { handleSearch }
                showIcon    = { false }
            />

            {/* With error */}
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

            {/* Read-only (no buttons) */}
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