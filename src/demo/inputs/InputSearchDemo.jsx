'use client' ;

import { Suspense , useCallback , useState } from 'react' ;

import { useSearchParams } from 'next/navigation' ;

import BusyNavigationProvider from '@/contexts/busyNavigation/provider' ;
import BusySurface            from '@/components/BusySurface' ;
import Container              from '@/display/Container' ;
import InputSearch            from '@/components/inputs/InputSearch' ;
import UrlSearch              from '@/components/inputs/UrlSearch' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * The query parameter the shared-transition demo writes — its own, so it
 * collides with nothing else on the page.
 * @type {string}
 */
const LOOKUP_PARAM = 'lookup' ;

/**
 * What the shared transition reloads : the value the URL carries.
 *
 * @param {Object} props
 * @param {string} props.label
 * @returns {React.ReactElement}
 */
const LookupValue = ( { label } ) =>
{
    const current = useSearchParams().get( LOOKUP_PARAM ) ?? '' ;

    return <p className="text-sm">{ label } <code>{ current || '—' }</code></p> ;
} ;

/**
 * InputSearch demo component.
 *
 * Demonstrates various configurations and use cases for InputSearch, opening
 * on the log of what a deferred field actually hands to `onSearch`.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.search'] - Dot notation path to the demo locale.
 */
const InputSearchDemo = ( { path = 'demo.inputs.search' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ loading , setLoading ] = useState( false ) ;
    const [ busy    , setBusy    ] = useState( true ) ;
    const [ shared  , setShared  ] = useState( true ) ;
    const [ results , setResults ] = useState( [] ) ;

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
            console.log( 'Searching for:' , value ) ;
            // Simulate an API call
            await new Promise( resolve => setTimeout( resolve , 1000 ) ) ;
            setResults( [ 'Result 1' , 'Result 2' , 'Result 3' ] ) ;
        }
        finally
        {
            setLoading( false ) ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">{ t.title }</h3>

            <div className="flex flex-col gap-3 rounded-box bg-base-100 p-4">
                <h4 className="font-semibold">{ t.log?.title }</h4>
                <p className="text-sm text-base-content/70">
                    { t.log?.note }
                </p>
                <InputSearch
                    debounceDelay   = { 400 }
                    onSearch        = { logSearch }
                    placeholder     = { t.log?.placeholder }
                    showClearButton
                />
                <ol className="flex flex-col gap-1 text-sm font-mono">
                    { searches.length === 0
                        ? <li className="text-base-content/50">{ t.log?.empty }</li>
                        : searches.map( ( value , index ) => (
                            <li key={ `${ index }-${ value }` }>{ searches.length - index }. « { value } »</li>
                        ) ) }
                </ol>
            </div>

            <InputSearch
                placeholder      = { t.auto?.placeholder }
                onSearch         = { value => console.log( 'Auto-searching:' , value ) }
                debounceDelay    = { 500 }
                showSearchButton = { false }
            />

            <InputSearch
                placeholder = { t.manual?.placeholder }
                onSearch    = { handleSearch }
            />

            <InputSearch
                placeholder   = { t.hybrid?.placeholder }
                onSearch      = { handleSearch }
                debounceDelay = { 300 }
                helper        = { loading ? t.hybrid?.searching : t.hybrid?.helper }
            />

            <InputSearch
                useFieldset
                legend      = { t.fieldset?.legend }
                placeholder = { t.fieldset?.placeholder }
                onSearch    = { value => console.log( 'Searching:' , value ) }
                helper      = { t.fieldset?.helper }
            />

            <InputSearch
                placeholder     = { t.withClear?.placeholder }
                onSearch        = { handleSearch }
                showClearButton = { true }
            />

            <InputSearch
                placeholder = { t.withoutIcon?.placeholder }
                onSearch    = { handleSearch }
                showIcon    = { false }
            />

            <InputSearch
                useFieldset
                legend      = { t.error?.legend }
                placeholder = { t.search }
                error       = { t.error?.error }
                onSearch    = { handleSearch }
            />

            <InputSearch
                disabled
                defaultValue = { t.disabled?.value }
                placeholder  = { t.search }
                onSearch     = { handleSearch }
            />

            <InputSearch
                readOnly
                defaultValue = { t.readOnly?.value }
                placeholder  = { t.search }
                onSearch     = { handleSearch }
            />

            <div className="flex flex-col gap-3 rounded-box bg-base-100 p-4">
                <h4 className="font-semibold">{ t.busy?.title }</h4>
                <p className="text-sm text-base-content/70">{ t.busy?.note }</p>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        checked   = { busy }
                        className = "toggle toggle-sm"
                        onChange  = { event => setBusy( event.target.checked ) }
                        type      = "checkbox"
                    />
                    { t.busy?.toggle }
                </label>
                <InputSearch
                    busy             = { busy }
                    defaultValue     = { t.busy?.value }
                    onSearch         = { () => {} }
                    placeholder      = { t.busy?.placeholder }
                    showClearButton
                    showSearchButton
                />
            </div>

            <div className="flex flex-col gap-3 rounded-box bg-base-100 p-4">
                <h4 className="font-semibold">{ t.shared?.title }</h4>
                <p className="text-sm text-base-content/70">{ t.shared?.note }</p>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        checked   = { shared }
                        className = "toggle toggle-sm"
                        onChange  = { event => setShared( event.target.checked ) }
                        type      = "checkbox"
                    />
                    { t.shared?.toggle }
                </label>
                <Suspense fallback={ null }>
                    <BusyNavigationProvider>
                        <div className="flex flex-col gap-3">
                            <UrlSearch
                                debounceDelay = { 400 }
                                paramName     = { LOOKUP_PARAM }
                                placeholder   = { t.shared?.placeholder }
                                shared        = { shared }
                                showClearButton
                            />
                            <BusySurface className="rounded-box border border-base-300 p-4">
                                <LookupValue label={ t.shared?.value } />
                            </BusySurface>
                        </div>
                    </BusyNavigationProvider>
                </Suspense>
            </div>

        </Container>
    ) ;
} ;

export default InputSearchDemo ;
