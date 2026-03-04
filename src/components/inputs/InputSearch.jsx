'use client';

import { useEffect, useRef } from 'react'

import cn from '../../themes/helpers/cn'

import Input from './Input'

import styles from './styles/InputActions.module.css' ;

import useDebouncedValue from '../../hooks/useDebouncedValue'
import useMergeRefs      from '../../hooks/useMergeRefs'
import useValue          from '../../hooks/useValue'

import { MdClose as CloseIcon, MdSearch as SearchIcon } from 'react-icons/md';

/**
 * InputSearch component - Search input with debounce, search button, and clear functionality.
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

     ref,

    ...rest
}) =>
{
    const [ value , setValue ] = useValue( defaultValue, valueFromProps, onChangeFromProps ) ;

    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( internalRef, ref ) ;

    const debouncedValue = useDebouncedValue( value , debounceDelay ) ;

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? ( typeof event === 'string' ? event : '' ) ;
        setValue( inputValue ) ;
    };

    const handleSearch = event =>
    {
        event?.preventDefault() ;
        onSearch?.(value) ;
    };

    const handleClear = event =>
    {
        event?.preventDefault() ;
        setValue( '' ) ;
        onClear?.() ;
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
            onSearch?.( value ) ;
        }
    };

    // Auto-search avec debounce
    useEffect(() =>
    {
        if ( debounceDelay > 0 && debouncedValue !== defaultValue )
        {
            onSearch?.( debouncedValue ) ;
        }
    }
    , [ debouncedValue , debounceDelay , defaultValue , onSearch ] ) ;

    const iconElement = showIcon && (
        <div className="flex items-center justify-center opacity-50">
            {icon || <SearchIcon />}
        </div>
    );

    const actions = [];

    const btnClassNames = cn
    (
        'btn join-item btn-square font-semibold' ,
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
            { ...rest }
        />
    );
};

InputSearch.displayName = 'InputSearch';

export default InputSearch;