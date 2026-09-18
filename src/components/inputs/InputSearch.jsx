'use client';

import { useEffect, useRef } from 'react'

import cn from '../../themes/helpers/cn'
import getButtonClassNames , { SQUARE } from '../../themes/components/button' ;

import Input from './Input'

import styles from './styles/InputActions.module.css' ;

import useDebouncedValue from '../../hooks/useDebouncedValue'
import useMergeRefs      from '../../hooks/useMergeRefs'
import useValue          from '../../hooks/useValue'

import readInputValue from '../../helpers/react/readInputValue'

import { MdClose as CloseIcon, MdSearch as SearchIcon } from 'react-icons/md';

/**
 * InputSearch component - Search input with debounce, search button, and clear functionality.
 *
 * @param {Object} props
 * @param {number} [props.debounceDelay=0] - Milliseconds of quiet before `onSearch` fires on its own. The debounced search fires for every NEW value — a return to the default value included, so a field emptied from the keyboard resets the list — and never twice for the same value : Enter or the search button already searched it. Nothing fires on mount.
 * @param {Function} [props.onClear] - Called by the clear button. When given, it is trusted to reset the search itself, so the debounced search does not fire `onSearch('')` again ; without it, the debounced search does.
 * @param {import('../../themes/sizing/sizes').Size} [props.size] - Field + action button size : the clear and search buttons follow the field, as in the date and time pickers.
 */
const InputSearch =
({
    defaultValue = '' ,
    onChange: onChangeFromProps ,
    value: valueFromProps ,
    onSearch ,
    onClear ,

    debounceDelay = 0 ,

    icon ,
    iconClassName ,
    searchIcon ,

    clearLabel = 'Clear search',
    searchLabel= 'Search',

    showClearButton = false,
    showSearchButton = true,
    showIcon = true,

    disabled = false,
    readOnly = false,
    error,
    helper,
    label,
    legend,
    useFieldset = false,

    placeholder = 'Search...' ,

    // Out of `rest` : the spread below would override it, and Enter would stop
    // triggering `onSearch`.
    onKeyDown : onKeyDownFromProps ,

     ref,

    size ,
    ...rest
}) =>
{
    const [ value , setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( internalRef, ref ) ;

    const debouncedValue = useDebouncedValue( value , debounceDelay ) ;

    // The last value handed to `onSearch`, from any path. The debounced search
    // compares against it rather than against `defaultValue` : comparing to the
    // default skipped a return to it (a field emptied by hand never reset the
    // list) and repeated what Enter had just searched. Seeded with the default,
    // so nothing fires on mount.
    const lastSearched = useRef( defaultValue ) ;

    const handleChange = event =>
    {
        const inputValue = readInputValue( event ) ;
        setValue( inputValue ) ;
    };

    const handleSearch = event =>
    {
        event?.preventDefault() ;
        lastSearched.current = value ;
        onSearch?.(value) ;
    };

    const handleClear = event =>
    {
        event?.preventDefault() ;
        setValue( '' ) ;
        if ( onClear )
        {
            // The caller resets the search itself : the debounced search must not
            // hand it `''` a second time.
            lastSearched.current = '' ;
            onClear() ;
        }
        requestAnimationFrame( () =>
        {
            internalRef.current?.focus() ;
        } ) ;
    };

    const handleKeyDown = event =>
    {
        if (event.key === 'Enter' && !disabled && !readOnly)
        {
            event.preventDefault() ;
            lastSearched.current = value ;
            onSearch?.( value ) ;
        }

        onKeyDownFromProps?.( event ) ;
    };

    // Debounced auto-search
    useEffect(() =>
    {
        if ( debounceDelay > 0 && debouncedValue !== lastSearched.current )
        {
            lastSearched.current = debouncedValue ;
            onSearch?.( debouncedValue ) ;
        }
    }
    , [ debouncedValue , debounceDelay , onSearch ] ) ;

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            {icon || <SearchIcon />}
        </div>
    );

    const actions = [];

    const btnClassNames = cn
    (
        getButtonClassNames({ shape : SQUARE , size }) ,
        'join-item font-semibold' ,
        styles.btnInput ,
        error && styles.btnInputError ,
    ) ;

    if ( showClearButton && value && !readOnly && !disabled )
    {
        actions.push
        (
            <button
                key        = "clear"
                type       = "button"
                onClick    = { handleClear }
                className  = { btnClassNames }
                aria-label = { clearLabel }
                title      = { clearLabel }
            >
                <CloseIcon />
            </button>
        );
    }

    if ( showSearchButton && !readOnly )
    {
        actions.push
        (
            <button
                key        = "search"
                type       = "button"
                onClick    = { handleSearch }
                disabled   = { disabled }
                className  = { btnClassNames }
                aria-label = { searchLabel }
                title      = { searchLabel }
            >
                { searchIcon || <SearchIcon /> }
            </button>
        );
    }

    return (
        <Input
            actions       = { actions.length > 0 ? actions : null }
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            label         = { label }
            legend        = { legend }
            onChange      = { handleChange }
            onKeyDown     = { handleKeyDown }
            placeholder   = { placeholder }
            readOnly      = { readOnly }
            ref           = { mergedRef }
            type          = "text"
            useFieldset   = { useFieldset }
            value         = { value }
            size          = { size }
            { ...rest }
        />
    );
};

InputSearch.displayName = 'InputSearch';

export default InputSearch;