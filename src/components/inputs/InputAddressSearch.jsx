'use client' ;

/**
 * A field that proposes addresses as you type.
 *
 * @module components/inputs/InputAddressSearch
 */

import { useCallback , useEffect , useId , useLayoutEffect , useRef , useState } from 'react' ;

import { MdLocationOn } from 'react-icons/md' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import readInputValue from '../../helpers/react/readInputValue' ;

import useDebouncedValue from '../../hooks/useDebouncedValue' ;
import useValue          from '../../hooks/useValue' ;

import cn from '../../themes/helpers/cn' ;

import Loading from '../Loading' ;
import Portal  from '../Portal' ;

import Input from './Input' ;

export const EMPTY     = 'empty' ;
export const FAILED    = 'failed' ;
export const IDLE      = 'idle' ;
export const SEARCHING = 'searching' ;

const DEFAULT_DELAY  = 300 ;
const DEFAULT_LENGTH = 3 ;

/** Breathing room between the field and its list. */
const GAP = 4 ;

/**
 * Where the list has to be mounted to escape whatever clips it.
 *
 * A dropdown positioned inside its field is at the mercy of every ancestor
 * with an `overflow` : a map frame clips it at the bottom edge, a modal body
 * clips it too. Portalling to the body escapes both — **except** inside a
 * `<dialog>` opened modally, whose top layer paints above everything in the
 * body. So a dialog ancestor, when there is one, is the right host.
 *
 * @param {HTMLElement|null} node
 * @returns {HTMLElement|null}
 */
const hostFor = ( node ) => node?.closest?.( 'dialog' ) ?? null ;

/**
 * A combobox over a geocoder.
 *
 * **It knows nothing about who answers.** `geocode( query , { signal } )` is
 * given by the caller and returns `Place` objects — which provider, in which
 * country, under which terms is an application's decision and never the
 * library's. `helpers/geo/adapters/ban` is one such function, shipped beside
 * rather than wired in.
 *
 * **The abort signal is not an optimisation.** Without it a slow first request
 * lands after a fast second one and the list shows results for what was being
 * typed two words ago. Every superseded request is cancelled, which is the only
 * arrangement that cannot show a stale answer.
 *
 * **It is a combobox, so it is built like one** : `aria-expanded`,
 * `aria-controls`, `aria-activedescendant`, arrow keys to walk the list, Enter
 * to take the highlighted one, Escape to close, and focus never leaving the
 * field. Done by eye, this is a list only a mouse can reach.
 *
 * **It builds on `Input`, not on `InputSearch`.** That one owns the Enter key
 * for its own search, and a combobox needs Enter to mean « take the highlighted
 * suggestion » — fighting it would fire a search on every selection.
 *
 * @param {Object} props
 * @param {string} [props.className] - Classes on the container.
 * @param {number} [props.debounceDelay=300] - Milliseconds of quiet before asking.
 * @param {string} [props.emptyLabel] - Shown when the search returns nothing. Defaults to the i18n `empty` key read at `path`.
 * @param {string} [props.errorLabel] - Shown when the geocoder throws. Defaults to the i18n `error` key read at `path`.
 * @param {Function} props.geocode - `( query , { signal } ) => Promise<Place[]>`.
 * @param {number} [props.minLength=3] - Shorter queries are not sent.
 * @param {Function} [props.onSelect] - `( place ) => void`, when one is chosen.
 * @param {string} [props.path='components.input.address'] - i18n path the labels are read from.
 * @param {Function} [props.renderOption] - `( place ) => ReactNode`, replaces the default line.
 * @param {string} [props.searchingLabel] - Shown while a request is in flight. Defaults to the i18n `searching` key read at `path`.
 * @param {string} [props.value] - Controlled query text.
 *
 * @example
 * ```jsx
 * import ban from 'oihana-next-ui/helpers/geo/adapters/ban'
 *
 * <InputAddressSearch geocode={ ban } onSelect={ ( place ) => setPoint( fromSchema( place ) ) } />
 * ```
 */
const InputAddressSearch =
({
    className ,
    debounceDelay = DEFAULT_DELAY ,
    defaultValue = '' ,
    emptyLabel ,
    errorLabel ,
    geocode ,
    minLength = DEFAULT_LENGTH ,
    onChange : onChangeFromProps ,
    onSelect ,
    path = 'components.input.address' ,
    renderOption ,
    searchingLabel ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const {
        empty     : emptyFromI18n     = 'No address found' ,
        error     : errorFromI18n     = 'The search failed' ,
        searching : searchingFromI18n = 'Searching…' ,
    }
    = useI18n( path , NO_LOCALE , false ) ;

    const listId = useId() ;

    const [ query , setQuery ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;

    const [ active  , setActive  ] = useState( -1 ) ;
    const [ open    , setOpen    ] = useState( false ) ;
    const [ results , setResults ] = useState( [] ) ;
    const [ status  , setStatus  ] = useState( IDLE ) ;

    const debounced  = useDebouncedValue( query , debounceDelay ) ;
    const controller = useRef( null ) ;
    const chosen     = useRef( null ) ;

    const anchorRef = useRef( null ) ;
    const hostRef   = useRef( null ) ;

    const [ coords , setCoords ] = useState( null ) ;

    // Placed in fixed coordinates from the field's own rect, and kept there
    // while the page scrolls or resizes under it.
    useLayoutEffect( () =>
    {
        if ( !open || !anchorRef.current )
        {
            return ;
        }

        const place = () =>
        {
            const rect = anchorRef.current?.getBoundingClientRect() ;

            if ( !rect )
            {
                return ;
            }

            hostRef.current = hostFor( anchorRef.current ) ;

            setCoords({ left : rect.left , top : rect.bottom + GAP , width : rect.width }) ;
        } ;

        place() ;

        window.addEventListener( 'resize' , place ) ;
        window.addEventListener( 'scroll' , place , true ) ;

        return () =>
        {
            window.removeEventListener( 'resize' , place ) ;
            window.removeEventListener( 'scroll' , place , true ) ;
        } ;
    }
    , [ open ] ) ;

    useEffect( () => () => controller.current?.abort() , [] ) ;

    useEffect( () =>
    {
        const text = String( debounced ?? '' ).trim() ;

        // Picking a suggestion writes its label into the field, which would
        // otherwise be read as a new query and reopen the list on the answer.
        if ( chosen.current === text )
        {
            return ;
        }

        controller.current?.abort() ;

        if ( !geocode || text.length < minLength )
        {
            setResults( [] ) ;
            setStatus( IDLE ) ;
            setOpen( false ) ;
            return ;
        }

        const next = new AbortController() ;

        controller.current = next ;

        setStatus( SEARCHING ) ;
        setOpen( true ) ;

        geocode( text , { signal : next.signal } )
            .then( ( places ) =>
            {
                if ( next.signal.aborted )
                {
                    return ;
                }

                setResults( places ?? [] ) ;
                setStatus( ( places ?? [] ).length ? IDLE : EMPTY ) ;
                setActive( -1 ) ;
            } )
            .catch( ( failure ) =>
            {
                if ( failure?.name === 'AbortError' || next.signal.aborted )
                {
                    return ;
                }

                setResults( [] ) ;
                setStatus( FAILED ) ;
            } ) ;
    }
    , [ debounced , geocode , minLength ] ) ;

    const choose = useCallback( ( place ) =>
    {
        if ( !place )
        {
            return ;
        }

        const label = place.name ?? '' ;

        chosen.current = label ;

        setQuery( label ) ;
        setOpen( false ) ;
        setActive( -1 ) ;
        setStatus( IDLE ) ;

        onSelect?.( place ) ;
    }
    , [ onSelect , setQuery ] ) ;

    const handleChange = ( event ) =>
    {
        chosen.current = null ;
        setQuery( readInputValue( event ) ) ;
    } ;

    const handleKeyDown = ( event ) =>
    {
        if ( event.key === 'Escape' )
        {
            setOpen( false ) ;
            setActive( -1 ) ;
            return ;
        }

        if ( event.key === 'Enter' && open && active >= 0 )
        {
            event.preventDefault() ;
            choose( results[ active ] ) ;
            return ;
        }

        if ( event.key !== 'ArrowDown' && event.key !== 'ArrowUp' )
        {
            return ;
        }

        if ( !results.length )
        {
            return ;
        }

        event.preventDefault() ;
        setOpen( true ) ;

        // Wrapping both ways : a list of five is walked in either direction, and
        // stopping at the end is a dead key nobody expects.
        setActive( ( current ) =>
        {
            const step = event.key === 'ArrowDown' ? 1 : -1 ;
            return ( current + step + results.length ) % results.length ;
        } ) ;
    } ;

    const optionId = ( index ) => `${ listId }-option-${ index }` ;

    const message = status === EMPTY  ? ( emptyLabel ?? emptyFromI18n )
                  : status === FAILED ? ( errorLabel ?? errorFromI18n )
                  : null ;

    return (
        <div className={ cn( 'relative' , className ) } ref={ anchorRef }>

            <Input
                aria-activedescendant = { open && active >= 0 ? optionId( active ) : undefined }
                aria-autocomplete     = "list"
                aria-controls         = { listId }
                aria-expanded         = { open }
                autoComplete          = "off"
                icon                  = { <MdLocationOn /> }
                onBlur                = { () => setOpen( false ) }
                onChange              = { handleChange }
                onKeyDown             = { handleKeyDown }
                role                  = "combobox"
                value                 = { query }
                { ...rest }
            />

            {
                open && coords && (
                    <Portal containerRef={ hostRef }>
                    <div
                        className = "fixed z-1000 max-h-72 overflow-y-auto rounded-box border border-base-300 bg-base-100 shadow-lg"
                        id        = { listId }
                        role      = "listbox"
                        style     = {{ left : coords.left , top : coords.top , width : coords.width }}
                    >
                        {
                            status === SEARCHING && !results.length && (
                                <p className="flex items-center gap-2 px-3 py-2 text-sm text-base-content/60">
                                    <Loading size="xs" /> { searchingLabel ?? searchingFromI18n }
                                </p>
                            )
                        }

                        {
                            message && (
                                <p className="px-3 py-2 text-sm text-base-content/60">{ message }</p>
                            )
                        }

                        {
                            results.map( ( place , index ) => (
                                // biome-ignore lint/a11y/useFocusableInteractive: an `aria-activedescendant` combobox keeps focus in the field on purpose — a focusable option would take it away and break the pattern.
                                <div
                                    aria-selected = { index === active }
                                    className     = { cn
                                    (
                                        'cursor-pointer px-3 py-2 text-sm' ,
                                        index === active ? 'bg-primary text-primary-content' : 'hover:bg-base-200' ,
                                    )}
                                    id            = { optionId( index ) }
                                    key           = { place.id ?? place.name ?? index }
                                    // `mousedown` rather than `click` : the field's blur fires
                                    // first and would close the list before a click could land.
                                    onMouseDown   = { ( event ) => { event.preventDefault() ; choose( place ) ; } }
                                    onMouseEnter  = { () => setActive( index ) }
                                    role          = "option"
                                >
                                    { renderOption ? renderOption( place ) : place.name }
                                </div>
                            ) )
                        }
                    </div>
                    </Portal>
                )
            }

        </div>
    ) ;
} ;

InputAddressSearch.displayName = 'InputAddressSearch' ;

export default InputAddressSearch ;
