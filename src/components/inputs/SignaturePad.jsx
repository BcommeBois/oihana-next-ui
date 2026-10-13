'use client' ;

/**
 * SignaturePad — a signature drawn with a finger, a stylus or a mouse : a
 * proof of delivery, an intervention report, a receipt.
 *
 * The value is **not an image** but the strokes — `{ width , height , strokes }`,
 * each stroke a list of `[ x , y , pressure ]` in the pad's own pixels —
 * a few kilobytes an application stores as they are, shows again at any
 * size, and turns into a PNG, an SVG or a vector in a PDF whenever it
 * needs to. The pen stroke is drawn by `perfect-freehand` : thick where the
 * hand slowed, thin where it sped up, from the pressure of a stylus or the
 * speed of a finger.
 *
 * 🔑 **A drawn signature is a picture, not a qualified electronic
 * signature.** What gives it the value of a proof is the application's :
 * who signed (the account, the device), when (the server's clock), and on
 * what — the digest of the document as it was, `helpers/crypto/sha256`,
 * stored beside the strokes.
 *
 * The canvas is drawn at the device's pixel ratio and follows the width of
 * its box ; a value signed on another pad is scaled to fit it, and centred. The pointer is
 * captured on press, so a stroke that leaves the pad goes on, and the pad
 * takes no scroll gesture (`touch-action : none`). One cannot sign with a
 * keyboard, and the pad does not pretend one can : it is an image named by
 * its label, and the buttons beside it are real buttons.
 *
 * @module components/inputs/SignaturePad
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - The accessible name of the pad. Defaults to `label`, then the bundle's.
 * @param {string} [props.className] - Classes on the field. The pad's height is set here (`h-40` by default).
 * @param {string} [props.color] - The ink, any CSS colour. Defaults to the text colour, readable in dark and light.
 * @param {?import('../../helpers/signature/scaleSignature').Signature} [props.defaultValue] - The signature at first (uncontrolled).
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.error] - Error message under the pad.
 * @param {'png'|'svg'|'json'} [props.format='png'] - What the hidden input sends with a form : a PNG data url, an SVG document, or the strokes.
 * @param {string} [props.helper] - Helper text under the pad.
 * @param {string} [props.id]
 * @param {string} [props.label] - Label above the pad.
 * @param {string} [props.name] - Sends the signature with a `<form>`, under this name, in `format` ; empty when nothing is signed.
 * @param {Function} [props.onChange] - `( signature | null ) => void` after each stroke, an undo or a clear.
 * @param {Function} [props.onEnd] - `( signature ) => void` when a stroke ends — the moment to save.
 * @param {string} [props.padClassName] - Classes on the pad itself.
 * @param {string} [props.path='components.signature'] - i18n path the labels are read from.
 * @param {string} [props.placeholder] - The words on the baseline, gone at the first stroke. Defaults to the bundle's « Sign here ».
 * @param {boolean} [props.readOnly=false] - Shows a signature, takes none.
 * @param {React.Ref} [props.ref] - A handle : `clear()`, `undo()`, `isEmpty()`, `toSvg( options )`, `toPng( options )`, `toDataURL()`, `canvas`.
 * @param {boolean} [props.showClear=true] - The « Clear » button.
 * @param {boolean} [props.showUndo=true] - The « Undo » button.
 * @param {number} [props.thickness=3] - The pen's width, in pixels.
 * @param {?import('../../helpers/signature/scaleSignature').Signature} [props.value] - The signature (controlled).
 *
 * @example
 * ```jsx
 * const pad = useRef( null ) ;
 *
 * <SignaturePad label="Signature du client" name="signature" onEnd={ setSignature } ref={ pad } />
 * <Button onClick={ async () => upload( await pad.current.toPng( { scale : 4 } ) ) }>Save</Button>
 * ```
 */

import { useCallback , useEffect , useId , useImperativeHandle , useRef , useState } from 'react' ;

import { MdClear , MdUndo } from 'react-icons/md' ;

import Button from '../Button' ;

import useValue from '../../hooks/useValue' ;

import isSignatureEmpty from '../../helpers/signature/isSignatureEmpty' ;
import signatureToPng   from '../../helpers/signature/signatureToPng' ;
import signatureToSvg   from '../../helpers/signature/signatureToSvg' ;
import strokesToPaths   from '../../helpers/signature/strokesToPaths' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import cn from '../../themes/helpers/cn' ;

/** The pressure of a pointer that reports none (a mouse says 0.5 while pressed). */
const point = ( event , rect ) => [ event.clientX - rect.left , event.clientY - rect.top , event.pressure || 0.5 ] ;

/**
 * How a signature fits a box : scaled to the smaller of the two ratios — a
 * wide pad into a short box keeps its height — and centred.
 */
const fit = ( signature , box ) =>
{
    const scale = Math.min( box.width / signature.width , box.height / signature.height ) ;

    return {
        dx : ( box.width  - signature.width  * scale ) / 2 ,
        dy : ( box.height - signature.height * scale ) / 2 ,
        scale ,
    } ;
} ;

/** The signature in the box's own coordinates, as `fit` places it. */
const fitSignature = ( signature , box ) =>
{
    const { dx , dy , scale } = fit( signature , box ) ;

    return {
        height  : box.height ,
        strokes : signature.strokes.map( stroke => stroke.map( ( [ x , y , pressure ] ) => [ x * scale + dx , y * scale + dy , pressure ] ) ) ,
        width   : box.width ,
    } ;
} ;

const SignaturePad =
({
    ariaLabel ,
    className ,
    color ,
    defaultValue = null ,
    disabled = false ,
    error ,
    format = 'png' ,
    helper ,
    id ,
    label ,
    name ,
    onChange ,
    onEnd ,
    padClassName ,
    path = 'components.signature' ,
    placeholder ,
    readOnly = false ,
    ref ,
    showClear = true ,
    showUndo = true ,
    thickness = 3 ,
    value : valueFromProps ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const generatedId = useId() ;
    const fieldId     = id ?? generatedId ;
    const helperId    = `${ fieldId }-helper` ;

    const box    = useRef( null ) ;
    const canvas = useRef( null ) ;

    // The stroke under the pointer, drawn straight on the canvas until it ends.
    const live    = useRef( null ) ;
    const pointer = useRef( null ) ;

    const [ size   , setSize   ] = useState( { height : 0 , width : 0 } ) ;
    const [ notice , setNotice ] = useState( '' ) ;
    const [ sent   , setSent   ] = useState( '' ) ;
    const [ measured , setMeasured ] = useState( '#000000' ) ;

    // The ink follows the text colour, measured on the canvas : once it is laid out, and again on a
    // theme change — `data-theme` or a class on <html>, or the system's own —, or a stroke drawn
    // in light stays dark on dark. A state, not a callback : the React Compiler re-derives a
    // callback's dependencies from its body, and a counter it does not read would be dropped.
    useEffect( () =>
    {
        const measure = () =>
        {
            if ( canvas.current )
            {
                setMeasured( getComputedStyle( canvas.current ).color ) ;
            }
        } ;

        measure() ;

        if ( typeof MutationObserver === 'undefined' )
        {
            return undefined ;
        }

        const bump     = () => requestAnimationFrame( measure ) ;
        const observer = new MutationObserver( bump ) ;
        const media    = window.matchMedia?.( '(prefers-color-scheme: dark)' ) ;

        observer.observe( document.documentElement , { attributeFilter : [ 'class' , 'data-dark' , 'data-theme' ] , attributes : true } ) ;
        media?.addEventListener( 'change' , bump ) ;

        return () =>
        {
            observer.disconnect() ;
            media?.removeEventListener( 'change' , bump ) ;
        } ;
    }
    , [] ) ;

    const empty    = isSignatureEmpty( value ) ;
    const inactive = disabled || readOnly ;

    // The pad follows its box.
    useEffect( () =>
    {
        const node = box.current ;

        if ( !node || typeof ResizeObserver === 'undefined' )
        {
            return undefined ;
        }

        const observer = new ResizeObserver( entries =>
        {
            const { height , width } = entries[ 0 ].contentRect ;
            setSize( { height : Math.round( height ) , width : Math.round( width ) } ) ;
        } ) ;

        observer.observe( node ) ;

        return () => observer.disconnect() ;
    }
    , [] ) ;

    const ink = color ?? measured ;

    /** Draws the value, scaled to the pad, and the live stroke if any. */
    const draw = useCallback( () =>
    {
        const node = canvas.current ;

        if ( !node || size.width === 0 )
        {
            return ;
        }

        const ratio = window.devicePixelRatio || 1 ;

        if ( node.width !== size.width * ratio || node.height !== size.height * ratio )
        {
            node.width  = size.width * ratio ;
            node.height = size.height * ratio ;
        }

        const context = node.getContext( '2d' ) ;

        context.setTransform( ratio , 0 , 0 , ratio , 0 , 0 ) ;
        context.clearRect( 0 , 0 , size.width , size.height ) ;
        context.fillStyle = ink ;

        // The value is drawn in its own units under a transform, so the pen scales with it.
        if ( value?.width && value?.height )
        {
            const { dx , dy , scale } = fit( value , size ) ;

            context.save() ;
            context.translate( dx , dy ) ;
            context.scale( scale , scale ) ;

            for ( const d of strokesToPaths( value , { size : thickness } ) )
            {
                context.fill( new Path2D( d ) ) ;
            }

            context.restore() ;
        }

        if ( live.current )
        {
            for ( const d of strokesToPaths( { height : size.height , strokes : [ live.current ] , width : size.width } , { size : thickness } ) )
            {
                context.fill( new Path2D( d ) ) ;
            }
        }
    }
    , [ ink , size , thickness , value ] ) ;

    useEffect( draw , [ draw ] ) ;

    // What the form sends, kept in step with the value.
    useEffect( () =>
    {
        if ( !name )
        {
            return ;
        }

        if ( empty )
        {
            setSent( '' ) ;
        }
        else if ( format === 'json' )
        {
            setSent( JSON.stringify( value ) ) ;
        }
        else if ( format === 'svg' )
        {
            setSent( signatureToSvg( value , { color : ink , size : thickness } ) ) ;
        }
        else
        {
            let stale = false ;

            signatureToPng( value , { color : ink , size : thickness } ).then( blob =>
            {
                if ( stale || !blob )
                {
                    return ;
                }

                const reader = new FileReader() ;
                reader.onload = () => { if ( !stale ) setSent( reader.result ) ; } ;
                reader.readAsDataURL( blob ) ;
            } ) ;

            return () => { stale = true ; } ;
        }

        return undefined ;
    }
    , [ empty , format , ink , name , thickness , value ] ) ;

    const commit = useCallback( next =>
    {
        setValue( next ) ;
    }
    , [ setValue ] ) ;

    const onPointerDown = event =>
    {
        if ( inactive || pointer.current !== null || event.button > 0 )
        {
            return ;
        }

        event.preventDefault() ;
        event.currentTarget.setPointerCapture( event.pointerId ) ;

        pointer.current = event.pointerId ;
        live.current    = [ point( event , event.currentTarget.getBoundingClientRect() ) ] ;
    } ;

    const onPointerMove = event =>
    {
        if ( pointer.current !== event.pointerId || !live.current )
        {
            return ;
        }

        const rect   = event.currentTarget.getBoundingClientRect() ;
        const events = event.nativeEvent.getCoalescedEvents?.() ?? [ event.nativeEvent ] ;

        for ( const sample of events )
        {
            live.current.push( point( sample , rect ) ) ;
        }

        draw() ;
    } ;

    const onPointerEnd = event =>
    {
        if ( pointer.current !== event.pointerId )
        {
            return ;
        }

        const stroke = live.current ;

        pointer.current = null ;
        live.current    = null ;

        if ( !stroke || stroke.length === 0 )
        {
            return ;
        }

        // A value signed on another pad is brought to this one, as it is shown, before the stroke joins it.
        const base = value && !isSignatureEmpty( value ) ? fitSignature( value , size ) : { height : size.height , strokes : [] , width : size.width } ;
        const next = { height : size.height , strokes : [ ...base.strokes , stroke ] , width : size.width } ;

        commit( next ) ;
        onEnd?.( next ) ;
    } ;

    const clear = useCallback( () =>
    {
        live.current = null ;
        commit( null ) ;
        setNotice( labels.cleared ?? '' ) ;
    }
    , [ commit , labels.cleared ] ) ;

    const undo = useCallback( () =>
    {
        if ( !value || value.strokes.length === 0 )
        {
            return ;
        }

        const strokes = value.strokes.slice( 0 , -1 ) ;

        commit( strokes.length === 0 ? null : { ...value , strokes } ) ;
    }
    , [ commit , value ] ) ;

    useImperativeHandle( ref , () => (
    {
        canvas    : canvas.current ,
        clear ,
        isEmpty   : () => isSignatureEmpty( value ) ,
        toDataURL : () => ( isSignatureEmpty( value ) ? '' : canvas.current?.toDataURL( 'image/png' ) ?? '' ) ,
        toPng     : options => signatureToPng( value , { color : ink , size : thickness , ...options } ) ,
        toSvg     : options => signatureToSvg( value , { color : ink , size : thickness , ...options } ) ,
        undo ,
    } )
    , [ clear , ink , thickness , undo , value ] ) ;

    const nameOfPad = ariaLabel ?? label ?? labels.label ;

    return (
        <div className={ cn( 'flex flex-col gap-2' , className ) }>
            { label && <label className="label" htmlFor={ fieldId }>{ label }</label> }

            <div
                aria-describedby = { error || helper ? helperId : undefined }
                aria-disabled    = { disabled || undefined }
                aria-label       = { nameOfPad }
                className        = { cn(
                    'relative h-40 w-full select-none overflow-hidden rounded-box border border-base-300 bg-base-100 text-base-content' ,
                    !inactive && 'cursor-crosshair' ,
                    disabled && 'opacity-60' ,
                    error && 'border-error' ,
                    padClassName ,
                ) }
                id              = { fieldId }
                onPointerCancel = { onPointerEnd }
                onPointerDown   = { onPointerDown }
                onPointerMove   = { onPointerMove }
                onPointerUp     = { onPointerEnd }
                ref             = { box }
                role            = "img"
                style           = { { touchAction : 'none' } }
            >
                <canvas className="block h-full w-full" ref={ canvas } style={ { color } } />

                { empty && !readOnly && (
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 bottom-6 border-b border-dashed border-base-content/30 pb-1 text-center text-sm text-base-content/40">
                        { placeholder ?? labels.signHere }
                    </div>
                ) }
            </div>

            { !inactive && ( showUndo || showClear ) && (
                <div className="flex justify-end gap-1">
                    { showUndo  && <Button disabled={ empty } icon={ MdUndo }  onClick={ undo }  size="xs" style="ghost" title={ labels.undo } /> }
                    { showClear && <Button disabled={ empty } icon={ MdClear } onClick={ clear } size="xs" style="ghost">{ labels.clear }</Button> }
                </div>
            ) }

            { error
                ? <p className="label text-xs text-error" id={ helperId }>{ error }</p>
                : helper ? <p className="label text-xs text-base-content/70" id={ helperId }>{ helper }</p> : null }

            <span aria-live="polite" className="sr-only">{ notice }</span>

            { name && <input disabled={ disabled } name={ name } type="hidden" value={ sent } /> }
        </div>
    ) ;
} ;

SignaturePad.displayName = 'SignaturePad' ;

export default SignaturePad ;
