'use client' ;

import { useEffect, useRef, useId } from 'react'

import cn from '../../themes/helpers/cn' ;

import getTextareaClasses from '../../themes/components/textarea'
import useTransformValue  from '../../hooks/useTransformValue'
import useMergeRefs       from '../../hooks/useMergeRefs'

/**
 * TextArea component with error states, transformations, auto-resize, and HTML5 validation.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes for the container
 * @param {string} [props.textareaClassName] - Additional classes for the textarea element
 * @param {string} [props.color] - DaisyUI color
 * @param {string} [props.size] - DaisyUI size
 * @param {string} [props.style] - DaisyUI style: 'ghost'
 * @param {string} [props.error] - Error message
 * @param {string} [props.helper] - Helper text
 * @param {string} [props.validatorHint] - Validation hint text
 * @param {string} [props.label] - Label text
 * @param {string} [props.legend] - Legend text
 * @param {string} [props.id] - Textarea ID
 * @param {string} [props.placeholder] - Textarea placeholder
 * @param {boolean} [props.useFieldset=false] - Use fieldset/legend
 * @param {boolean} [props.useValidator=false] - Enable validator styling
 * @param {boolean} [props.required=false] - HTML5 required
 * @param {number} [props.minLength] - HTML5 minlength
 * @param {number} [props.maxLength] - HTML5 maxlength
 * @param {string} [props.title] - HTML5 title
 * @param {number} [props.rows=3] - Visible text lines (ignored if autosize=true)
 * @param {number} [props.cols] - Visible width
 * @param {string} [props.resize='vertical'] - CSS resize
 * @param {boolean} [props.autosize=false] - Auto-resize based on content
 * @param {number} [props.minRows=3] - Minimum rows when autosize enabled
 * @param {number} [props.maxRows] - Maximum rows when autosize enabled
 * @param {string|number} [props.defaultValue] - Default value
 * @param {string|number} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.transform] - Transform input before storing
 * @param {Function} [props.validate] - Validate value before onChange
 * @param {Function} [props.format] - Format value for display only
 * @param {Function} [props.process] - Process value before sending to onChange
 * @param {Function} [props.processOnBlur] - Additional processing on blur
 * @param {boolean} [props.revertOnBlurIfInvalid=true] - Revert to previous value on blur if invalid
 * @param {Object} [props.ref] - Ref forwarded to the textarea element
 * @param {Object} props.rest - Additional textarea props
 *
 * @example
 * // Auto-resize textarea
 * <TextArea
 *     autosize
 *     minRows={3}
 *     maxRows={10}
 *     placeholder="Grows as you type..."
 * />
 */
const TextArea =
({
    autosize = false,
    className,
    color,
    cols,
    helper,
    error,
    id,
    label,
    legend,
    placeholder,
    minLength,
    maxLength,
    required = false,
    rows = 3,
    size,
    style,
    title,
    minRows = 3,
    maxRows,
    resize = 'vertical',
    textareaClassName,
    useFieldset = false,
    useValidator = false,
    validatorHint,

    defaultValue,
    value: valueFromProps,
    onChange: onChangeFromProps,
    transform,
    validate,
    format,
    process,
    processOnBlur,
    revertOnBlurIfInvalid = true,

    ref ,

    ...rest
}) =>
{
    const fallbackId = useId() ;
    const textareaId = id || fallbackId ;
    const helperId   = `${textareaId}-helper` ;
    const hasError   = Boolean( error ) ;

    // --------- Refs management

    const internalRef = useRef( null ) ;
    const mergedRef   = useMergeRefs( internalRef, ref ) ;

    // --------- Styles

    const textareaClasses = cn
    (
        getTextareaClasses({
            color: hasError ? 'error' : color ,
            size ,
            style
        }),
        'w-full' ,
        useValidator && 'validator' ,
        textareaClassName
    ) ;

    const resizeStyles =
    {
        resize   : autosize ? 'none'   : resize ,
        overflow : autosize ? 'hidden' : undefined
    } ;

    // --------- Value management

    const { displayValue, handleChange, handleBlur: handleTransformBlur } = useTransformValue({
        defaultValue ,
        value : valueFromProps ,
        onChange : onChangeFromProps ,
        transform ,
        validate ,
        format ,
        process ,
        processOnBlur ,
        onBlur : rest.onBlur ,
        revertOnBlurIfInvalid
    }) ;

// --------- Auto-resize effect

    useEffect( () =>
    {
        const textarea = internalRef.current ;

        if ( !autosize || !textarea )
        {
            return ;
        }

        // Reset height to compute scrollHeight
        textarea.style.height = 'auto' ;

        const computed      = window.getComputedStyle( textarea ) ;
        const lineHeight    = parseFloat( computed.lineHeight ) || 20 ; // Fallback safe
        const paddingTop    = parseFloat( computed.paddingTop ) ;
        const paddingBottom = parseFloat( computed.paddingBottom ) ;
        const borderTop     = parseFloat( computed.borderTopWidth ) ;
        const borderBottom  = parseFloat( computed.borderBottomWidth ) ;

        const verticalPadding = paddingTop + paddingBottom + borderTop + borderBottom ;

        const minH = minRows ? ( minRows * lineHeight ) + verticalPadding : 0 ;
        const maxH = maxRows ? ( maxRows * lineHeight ) + verticalPadding : Infinity ;

        const newHeight = Math.min( Math.max( textarea.scrollHeight, minH ), maxH ) ;

        textarea.style.height = `${newHeight}px` ;

    }, [ displayValue, autosize, minRows, maxRows ]) ;

    const textareaGroup = (
        <>
            <textarea
                aria-invalid     = { hasError }
                aria-describedby = { error || helper ? helperId : undefined }
                className        = { textareaClasses }
                cols             = { cols }
                id               = { textareaId }
                placeholder      = { placeholder }
                ref              = { mergedRef }
                required         = { required }
                minLength        = { minLength }
                maxLength        = { maxLength }
                rows             = { autosize ? minRows : rows }
                onChange         = { handleChange }
                onBlur           = { handleTransformBlur }
                style            = { resizeStyles }
                title            = { title }
                value            = { displayValue }
                { ...rest }
            />

            {
                error ? (
                    <p className="label text-xs text-error">
                        { error }
                    </p>
                ) : helper ? (
                    <p className="label text-xs text-base-content/70">
                        { helper }
                    </p>
                ) : null
            }

            {
                useValidator && validatorHint && (
                    <p className="validator-hint hidden">
                        { validatorHint }
                    </p>
                )
            }
        </>
    ) ;

    if ( useFieldset )
    {
        return (
            <fieldset className={ cn( 'fieldset w-full', className ) }>
                { legend && <legend className="fieldset-legend">{ legend }</legend> }
                { textareaGroup }
            </fieldset>
        ) ;
    }

    return (
        <div className={ cn( 'flex flex-col gap-2', className ) }>
            { label && (
                <label htmlFor={ id } className="label">
                    { label }
                </label>
            )}
            { textareaGroup }
        </div>
    ) ;
} ;

export default TextArea ;