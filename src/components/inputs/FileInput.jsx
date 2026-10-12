'use client' ;

import { useId } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import getFileInputClasses from '../../themes/components/fileInput' ;

/**
 * FileInput — the native file picker, styled by daisyUI.
 *
 * Laid out like {@link module:components/inputs/Input} : a label above (or a
 * fieldset legend), the field, then the error or the helper below it.
 *
 * 🔑 **`onChange` receives the files, not the event** — an array of `File`,
 * empty when the selection is cancelled, with the DOM event as a second
 * argument. Same contract as `Input`, whose handler receives the value.
 *
 * ⚠️ **The button text belongs to the browser.** « Choose file » / « No file
 * chosen » is drawn by the browser, in the browser's language, and no
 * attribute changes it. A translated trigger needs a button of its own in
 * front of a hidden field.
 *
 * ⚠️ **`capture` only means something on a phone.** `'environment'` opens the
 * back camera, `'user'` the front one, instead of the file chooser. A desktop
 * browser ignores it and shows its usual dialog.
 *
 * A file field cannot be given a value : it is uncontrolled by nature. To
 * empty it, set `value = ''` on the element reached through `ref`.
 *
 * @module components/inputs/FileInput
 * @see https://daisyui.com/components/file-input
 *
 * @example
 * ```jsx
 * // One file
 * <FileInput label="Invoice" accept=".pdf" onChange={ files => setFile( files[ 0 ] ) } />
 *
 * // Several images, with a helper
 * <FileInput
 *     accept   = "image/*"
 *     helper   = "JPEG or PNG"
 *     label    = "Photos"
 *     multiple
 *     onChange = { setPhotos }
 * />
 *
 * // Straight to the back camera on a phone
 * <FileInput accept="image/*" capture="environment" onChange={ setPhotos } />
 * ```
 *
 * @param {Object} props
 * @param {string} [props.accept] - The accepted types : MIME types, wildcards (`image/*`) or extensions (`.pdf`).
 * @param {'user'|'environment'} [props.capture] - On a phone, open a camera instead of the file chooser.
 * @param {string} [props.className] - Additional classes for the container.
 * @param {string} [props.color] - DaisyUI color : 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral'.
 * @param {boolean} [props.disabled=false] - Disable the field.
 * @param {string} [props.error] - Error message (turns the field to the error color).
 * @param {string} [props.fileInputClassName] - Additional classes for the field itself.
 * @param {string} [props.helper] - Helper text below the field.
 * @param {string} [props.id] - The field id. Generated when left out.
 * @param {string} [props.label] - Label text above the field.
 * @param {string} [props.legend] - Legend text, with `useFieldset`.
 * @param {boolean} [props.multiple=false] - Allow several files.
 * @param {string} [props.name] - The form field name.
 * @param {Function} [props.onChange] - `( files : File[] , event ) => void`.
 * @param {*} [props.ref] - Ref to the `<input type="file">` element.
 * @param {boolean} [props.required=false] - HTML5 required attribute.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - DaisyUI size.
 * @param {'ghost'} [props.style] - DaisyUI style.
 * @param {boolean} [props.useFieldset=false] - Use fieldset/legend instead of a label.
 */
const FileInput =
({
    accept ,
    capture ,
    className ,
    color ,
    disabled = false ,
    error ,
    fileInputClassName ,
    helper ,
    id ,
    label ,
    legend ,
    multiple = false ,
    name ,
    onChange ,
    ref ,
    required = false ,
    size ,
    style ,
    useFieldset = false ,

    ...inputProps
}) =>
{
    const fallbackId = useId() ;
    const inputId    = id || fallbackId ;
    const helperId   = `${ inputId }-helper` ;

    const hasError = Boolean( error ) ;

    const handleChange = event =>
    {
        onChange?.( Array.from( event.target.files ?? [] ) , event ) ;
    } ;

    const field =
    (
        <>
            <input
                accept           = { accept }
                aria-describedby = { error || helper ? helperId : undefined }
                aria-invalid     = { hasError }
                capture          = { capture }
                className        = { getFileInputClasses({
                    className : fileInputClassName ,
                    color     : hasError ? 'error' : color ,
                    size ,
                    style ,
                }) }
                disabled         = { disabled }
                id               = { inputId }
                multiple         = { multiple }
                name             = { name }
                onChange         = { handleChange }
                ref              = { ref }
                required         = { required }
                type             = "file"
                { ...inputProps }
            />

            {
                error ? (
                    <p id={ helperId } className="label text-xs text-error">
                        { error }
                    </p>
                ) : helper ? (
                    <p id={ helperId } className="label text-xs text-base-content/70">
                        { helper }
                    </p>
                ) : null
            }
        </>
    ) ;

    if ( useFieldset )
    {
        return (
            <fieldset className={ cn( 'fieldset w-full' , className ) }>
                { legend && <legend className="fieldset-legend">{ legend }</legend> }
                { field }
            </fieldset>
        ) ;
    }

    return (
        <div className={ cn( 'flex flex-col gap-2' , className ) }>
            { label && (
                <label htmlFor={ inputId } className="label">
                    { label }
                </label>
            ) }
            { field }
        </div>
    ) ;
} ;

FileInput.displayName = 'FileInput' ;

export default FileInput ;
