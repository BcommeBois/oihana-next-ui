'use client';

import { useRef } from 'react' ;

import Input from './Input' ;

import cn           from '../../themes/helpers/cn' ;
import styles       from './styles/InputActions.module.css' ;
import useMergeRefs from '../../hooks/useMergeRefs'
import useValue     from '../../hooks/useValue' ;

import { MdClose  as CloseIcon  } from 'react-icons/md' ;
import { FaSearch as SearchIcon } from 'react-icons/fa' ;

/**
 * InputClear component - An input with a clear button that appears when there's content.
 *
 * @param {Object} props
 * @param {string} [props.defaultValue=''] - Default value
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onClear] - Callback when clear button is clicked
 * @param {React.ReactNode} [props.icon] - Icon component (default: SearchIcon)
 * @param {string} [props.iconClassName] - Icon container classes
 * @param {boolean} [props.showClearButton=true] - Show clear button when input has value
 * @param {boolean} [props.showIcon=true] - Show left icon
 * @param {string} [props.clearLabel='Clear input'] - A11y label for the clear button
 * @param {boolean} [props.disabled=false] - Disable input
 * @param {boolean} [props.readOnly=false] - Make input read-only
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.label] - Label text
 * @param {string} [props.legend] - Legend text (for fieldset)
 * @param {boolean} [props.useFieldset=false] - Use fieldset wrapper
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.placeholder='Search...'] - Input placeholder
 * @param {*} [props.ref] - Ref object to access the input element
 * @param {Object} props.rest - Other props passed to InputClear
 *
 * @example
 * // Basic search input
 * <InputClear placeholder="Search products..." />
 *
 * @example
 * // Controlled with callback
 * const [search, setSearch] = useState('');
 * <InputClear value={search} onChange={setSearch} onClear={() => console.log('Cleared!')} />
 */
const InputClear =
({
    defaultValue = '',
    onChange : onChangeFromProps,
    value : valueFromProps,
    onClear,

    icon,
    iconClassName,

    clearLabel = 'Clear input',
    showClearButton = true,
    showIcon = true,

    disabled = false,
    readOnly = false,
    error,
    helper,
    label,
    legend,
    useFieldset = false,

    type = 'text',
    placeholder = 'Search...',

    ref ,

    ...rest
}) =>
{
    const [ value , setValue ] = useValue(defaultValue, valueFromProps, onChangeFromProps);

    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( internalRef , ref ) ;

    const handleChange = event =>
    {
        const inputValue = event?.target?.value ?? (typeof event === 'string' ? event : '');
        setValue(inputValue);
    } ;

    const handleClear = event =>
    {
        event?.preventDefault();
        setValue( '' ) ;
        onClear?.();
        requestAnimationFrame(() =>
        {
            internalRef.current?.focus();
        });
    };

    const iconElement = showIcon &&
    (
        <div className="flex items-center justify-center opacity-50">
            { icon || <SearchIcon /> }
        </div>
    ) ;

    const hasValue = value !== '' && value !== null && value !== undefined ;

    const clearButton = showClearButton && hasValue && !readOnly && !disabled ?
    (
        <button
            key        = "clear"
            type       = "button"
            onClick    = { handleClear }
            className  = { cn( 'btn join-item btn-square btn-ghost opacity-70 hover:opacity-100' , styles.btnInput , error && styles.btnInputError ) }
            aria-label = { clearLabel }
            title      = { clearLabel }
        >
            <CloseIcon className="h-4 w-4" />
        </button>
    )
    : null ;

    return (
        <Input
            actions       = { clearButton }
            disabled      = { disabled }
            error         = { error }
            helper        = { helper }
            icon          = { iconElement }
            iconClassName = { iconClassName }
            label         = { label }
            legend        = { legend }
            onChange      = { handleChange }
            placeholder   = { placeholder }
            readOnly      = { readOnly }
            ref           = { mergedRef }
            type          = { type }
            useFieldset   = { useFieldset }
            value         = { value }
            { ...rest }
        />
    );
};

InputClear.displayName = 'InputClear';

export default InputClear;