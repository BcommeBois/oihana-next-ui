'use client' ;

import { useState } from 'react' ;

import { MdQrCodeScanner , MdPhotoCamera } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import cn from '../../themes/helpers/cn' ;

import getButtonClassNames , { SQUARE } from '../../themes/components/button' ;

import Input          from './Input' ;
import Modal          from '../modals/Modal' ;
import BarcodeScanner from '../barcodes/BarcodeScanner' ;
import useModal       from '../modals/hooks/useModal' ;

import styles from './styles/InputActions.module.css' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useValue  from '../../hooks/useValue' ;

import BarcodeContentError from '../../helpers/barcodes/BarcodeContentError' ;
import readTypedCode       from '../../helpers/barcodes/readTypedCode' ;

export const CAMERA   = 'camera' ;
export const KEYBOARD = 'keyboard' ;

/**
 * What a reading shows in the field : a GS1 code as on its label, anything else as read.
 *
 * @param {Object} reading
 * @returns {string}
 */
const display = ( { elements , value } ) =>
    elements ? elements.map( ( { ai , data } ) => `(${ ai })${ data }` ).join( '' ) : value ;

/**
 * InputScan — a field that takes a code from the camera or from the keyboard.
 *
 * Built on {@link module:components/inputs/Input} : a button stuck to the
 * field opens {@link module:components/barcodes/BarcodeScanner} — in a window
 * on a computer, full screen on a phone — and the field takes what is typed,
 * sent with Enter. 🔑 **Enter is taken**, so a scan field inside a `<form>`
 * never submits it.
 *
 * `onScan( reading )` receives the same reading from both sources — the one
 * {@link module:helpers/barcodes/normalizeScan} gives — plus where it came
 * from : `{ value , rawValue , format , symbology , gs1 , elements , source }`,
 * `source` being `'camera'` or `'keyboard'` (and, later, `'wedge'`). A GS1
 * element string typed as on a label — `(01)09501101530003(10)LOT-42` — is
 * checked and split like a scanned one, and gives the same `value`.
 *
 * 🔑 **The library knows no trade.** Which codes a screen accepts is the
 * screen's : `validate( reading )` returns `true`, or a message. Refused, the
 * message shows under the field, `onReject( reading , message )` is called and
 * `onScan` is not. A GS1 string typed wrong is refused before `validate` runs.
 *
 * It makes no sound : pair it with `useFeedbackSignal` — `success` in
 * `onScan`, `error` in `onReject`.
 *
 * @module components/inputs/InputScan
 *
 * @example
 * ```jsx
 * <InputScan label="Location" onScan={ ( { value } ) => goTo( value ) } />
 *
 * // Only EAN-13, a series of scans, the field emptied after each
 * <InputScan
 *     clearOnScan
 *     closeOnScan = { false }
 *     formats     = { [ 'ean_13' ] }
 *     onScan      = { addLine }
 *     validate    = { ( { value } ) => /^\d{13}$/.test( value ) || 'An EAN-13 was expected.' }
 * />
 * ```
 *
 * @param {Object} props - Every prop of `Input`, and :
 * @param {string} [props.cameraLabel] - The name of the camera button. Defaults to the i18n `camera` key read at `path`.
 * @param {boolean} [props.clearOnScan=false] - Empty the field after each accepted scan, for a run of scans.
 * @param {boolean} [props.closeOnScan=true] - Close the camera after a scan ; `false` keeps it reading.
 * @param {string} [props.defaultValue] - The initial text (uncontrolled).
 * @param {string} [props.error] - An error of the host's, shown over the field's own.
 * @param {string[]} [props.formats] - The formats the camera reads. Defaults to the scanner's.
 * @param {React.ReactNode} [props.icon] - The icon on the left. Defaults to a scan icon ; `null` for none.
 * @param {Function} [props.onChange] - `( text ) => void`, as the text changes.
 * @param {Function} [props.onReject] - `( reading , message ) => void`, for a code refused.
 * @param {Function} [props.onScan] - `( reading ) => void`, for a code accepted.
 * @param {string} [props.path='components.input.scan'] - i18n path of the labels.
 * @param {Object} [props.scannerProps] - Passed to `BarcodeScanner` (`engine`, `dedupeDelay`, `showTorch`…).
 * @param {boolean} [props.showCamera=true] - Offer the camera.
 * @param {string} [props.title] - The title of the camera window. Defaults to the i18n `title` key.
 * @param {Function} [props.validate] - `( reading ) => true | string`.
 * @param {string} [props.value] - The text (controlled).
 */
const InputScan =
({
    cameraLabel ,
    clearOnScan  = false ,
    closeOnScan  = true ,
    defaultValue = '' ,
    disabled ,
    error ,
    formats ,
    icon ,
    onChange ,
    onKeyDown ,
    onReject ,
    onScan ,
    path         = 'components.input.scan' ,
    readOnly ,
    scannerProps ,
    showCamera   = true ,
    size ,
    title ,
    validate ,
    value : valueFromProps ,

    ...rest
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const [ text , setText ] = useValue( defaultValue , valueFromProps , onChange ) ;
    const [ refusal , setRefusal ] = useState( null ) ;

    const { close , isOpen , modalRef , open } = useModal() ;

    const submit = ( reading , source ) =>
    {
        if ( !reading.value )
        {
            return ;
        }

        const scan    = { ...reading , source } ;
        const verdict = validate ? validate( scan ) : true ;

        if ( verdict !== true )
        {
            const message = typeof verdict === 'string' ? verdict : labels.invalid ;
            setRefusal( message ) ;
            onReject?.( scan , message ) ;
            return ;
        }

        setRefusal( null ) ;
        setText( clearOnScan ? '' : display( reading ) ) ;
        onScan?.( scan ) ;
    } ;

    const handleKeyDown = event =>
    {
        onKeyDown?.( event ) ;

        if ( event.key !== 'Enter' || event.nativeEvent?.isComposing || event.defaultPrevented )
        {
            return ;
        }

        event.preventDefault() ;

        try
        {
            submit( readTypedCode( event.currentTarget.value ) , KEYBOARD ) ;
        }
        catch ( exception )
        {
            if ( !( exception instanceof BarcodeContentError ) )
            {
                throw exception ;
            }

            const message = format( labels.gs1 ?? '{0}' , exception.message ) ;
            setRefusal( message ) ;
            onReject?.( { rawValue : event.currentTarget.value , source : KEYBOARD , value : event.currentTarget.value } , message ) ;
        }
    } ;

    const handleChange = next =>
    {
        setRefusal( null ) ;
        setText( next ) ;
    } ;

    const handleDetect = reading =>
    {
        if ( closeOnScan )
        {
            close() ;
        }
        submit( reading , CAMERA ) ;
    } ;

    const cameraName = cameraLabel ?? labels.camera ?? 'Scan with the camera' ;

    const actions = showCamera && !readOnly
        ?
        [
            <button
                aria-label = { cameraName }
                className  = { cn( getButtonClassNames( { shape : SQUARE , size } ) , 'join-item' , styles.btnInput , ( error || refusal ) && styles.btnInputError ) }
                disabled   = { disabled }
                key        = "camera"
                onClick    = { open }
                title      = { cameraName }
                type       = "button"
            >
                <MdPhotoCamera aria-hidden="true" />
            </button> ,
        ]
        : null ;

    return (
        <>
            <Input
                actions   = { actions }
                disabled  = { disabled }
                error     = { error ?? refusal ?? undefined }
                icon      = { icon === undefined ? <MdQrCodeScanner aria-hidden="true" className="opacity-50" /> : icon }
                onChange  = { handleChange }
                onKeyDown = { handleKeyDown }
                readOnly  = { readOnly }
                size      = { size }
                value     = { text }
                { ...rest }
            />

            { showCamera && (
                <Modal
                    fullScreenBreakpoint = "sm"
                    ref                  = { modalRef }
                    showFooter           = { false }
                    title                = { title ?? labels.title }
                >
                    <BarcodeScanner
                        active   = { isOpen }
                        formats  = { formats }
                        onDetect = { handleDetect }
                        { ...scannerProps }
                    />
                </Modal>
            ) }
        </>
    ) ;
} ;

InputScan.displayName = 'InputScan' ;

export default InputScan ;
