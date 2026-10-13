'use client' ;

/**
 * SignaturePad — a signature drawn with a finger, a stylus or a mouse : a
 * proof of delivery, an intervention report, a receipt.
 *
 * The value is **not an image** but the strokes — `{ width , height , strokes }`,
 * each stroke a list of `[ x , y , pressure , t ]` in the pad's own pixels,
 * `t` the milliseconds since the signature's first point — a few kilobytes
 * an application stores as they are, shows again at any size, replays at
 * its own speed, and turns into a PNG, an SVG or a vector in a PDF whenever
 * it needs to. The pen stroke is drawn by `perfect-freehand` : thick where
 * the hand slowed, thin where it sped up, from the pressure of a stylus or
 * the speed of a finger.
 *
 * 🔑 **A drawn signature is a picture, not a qualified electronic
 * signature.** What gives it the value of a proof is the application's :
 * who signed (the account, the device), when (the server's clock), and on
 * what — the digest of the document as it was, `helpers/crypto/sha256`,
 * stored beside the strokes.
 *
 * A tap is not a signature : below `minPoints` over all its strokes, what
 * was drawn is wiped and the pad says so. `required` holds the form until
 * something is signed, through a hidden field the browser validates, and
 * says « a signature is required » in the pad's own words. `expandable`
 * adds a button that opens the pad over the whole window — on a phone, the
 * device is handed to the one who signs —, what is signed there coming back
 * as the value.
 *
 * The canvas is drawn at the device's pixel ratio and follows the size of
 * its box ; a value signed on another pad is scaled to fit it, and centred.
 * The pointer is captured on press, so a stroke that leaves the pad goes
 * on, and the pad takes no scroll gesture (`touch-action : none`). One
 * cannot sign with a keyboard, and the pad does not pretend one can : it is
 * an image named by its label, and the buttons beside it are real buttons.
 *
 * @module components/inputs/SignaturePad
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - The accessible name of the pad. Defaults to `label`, then the bundle's.
 * @param {string} [props.className] - Classes on the field.
 * @param {string} [props.color] - The ink, any CSS colour. Defaults to the text colour, readable in dark and light.
 * @param {?import('../../helpers/signature/scaleSignature').Signature} [props.defaultValue] - The signature at first (uncontrolled).
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.error] - Error message under the pad. Takes over the pad's own messages.
 * @param {boolean} [props.expandable=false] - A button that opens the pad over the whole window.
 * @param {React.ReactNode} [props.expandTitle] - The title of that window. Defaults to the bundle's « Sign full screen ».
 * @param {'png'|'svg'|'json'} [props.format='png'] - What the hidden input sends with a form : a PNG data url, an SVG document, or the strokes.
 * @param {string} [props.helper] - Helper text under the pad.
 * @param {string} [props.id]
 * @param {string} [props.label] - Label above the pad.
 * @param {number} [props.minPoints=12] - The points a signature needs, over all its strokes ; fewer is wiped.
 * @param {string} [props.name] - Sends the signature with a `<form>`, under this name, in `format` ; empty when nothing is signed.
 * @param {Function} [props.onChange] - `( signature | null ) => void` after each stroke, an undo or a clear.
 * @param {Function} [props.onEnd] - `( signature , { duration , points } ) => void` when a stroke ends on a valid signature — the moment to save.
 * @param {string} [props.padClassName] - Classes on the pad itself ; its height is set here (`h-40` by default).
 * @param {string} [props.path='components.signature'] - i18n path the labels are read from.
 * @param {string} [props.placeholder] - The words on the baseline, gone at the first stroke. Defaults to the bundle's « Sign here ».
 * @param {boolean} [props.readOnly=false] - Shows a signature, takes none.
 * @param {React.Ref} [props.ref] - A handle : `clear()`, `undo()`, `isEmpty()`, `replay()`, `expand()`, `toSvg( options )`, `toPng( options )`, `toDataURL()`, `canvas`.
 * @param {boolean} [props.replay=false] - Read-only : replays the signature at its own speed when it becomes true, and on mount if it is. Still where motion is reduced, or no point carries a time.
 * @param {boolean} [props.required=false] - The form waits for a signature.
 * @param {boolean} [props.showClear=true] - The « Clear » button.
 * @param {boolean} [props.showUndo=true] - The « Undo » button.
 * @param {number} [props.thickness=3] - The pen's width, in pixels.
 * @param {string} [props.validatorHint] - What « required » says. Defaults to the bundle's.
 * @param {?import('../../helpers/signature/scaleSignature').Signature} [props.value] - The signature (controlled).
 *
 * @example
 * ```jsx
 * const pad = useRef( null ) ;
 *
 * <SignaturePad expandable label="Signature du client" name="signature" onEnd={ setSignature } ref={ pad } required />
 * <Button onClick={ async () => upload( await pad.current.toPng( { scale : 4 } ) ) }>Save</Button>
 * ```
 */

import { useCallback , useEffect , useId , useImperativeHandle , useRef , useState } from 'react' ;

import { MdClear , MdOpenInFull , MdUndo } from 'react-icons/md' ;

import Button   from '../Button' ;
import Modal    from '../modals/Modal' ;
import useModal from '../modals/hooks/useModal' ;

import useValue from '../../hooks/useValue' ;

import frameAt , { signatureDuration } from '../../helpers/signature/frameAt' ;
import isSignatureEmpty                from '../../helpers/signature/isSignatureEmpty' ;
import signatureToPng                  from '../../helpers/signature/signatureToPng' ;
import signatureToSvg                  from '../../helpers/signature/signatureToSvg' ;
import strokesToPaths                  from '../../helpers/signature/strokesToPaths' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import cn from '../../themes/helpers/cn' ;

/** The pause a signature carries between a stored stroke and the next one drawn, in milliseconds. */
const PAUSE = 400 ;

/** A point from a pointer event : the pressure of one that reports none is 0.5 (a mouse while pressed). */
const point = ( event , rect , startedAt ) => [ event.clientX - rect.left , event.clientY - rect.top , event.pressure || 0.5 , Math.round( event.timeStamp - startedAt ) ] ;

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
        strokes : signature.strokes.map( stroke => stroke.map( ( [ x , y , pressure , t ] ) => [ x * scale + dx , y * scale + dy , pressure , t ] ) ) ,
        width   : box.width ,
    } ;
} ;

const points = signature => ( signature?.strokes ?? [] ).reduce( ( sum , stroke ) => sum + stroke.length , 0 ) ;

/**
 * The surface : the canvas, its size, its ink, the strokes drawn and the
 * one under the pointer. The field below and the full-window pad share it.
 */
const Surface =
({
    ariaLabel ,
    canvasRef ,
    children ,
    className ,
    color ,
    describedBy ,
    disabled ,
    frame ,
    id ,
    onInk ,
    onStroke ,
    placeholder ,
    readOnly ,
    thickness ,
    value ,
}) =>
{
    const box    = useRef( null ) ;
    const canvas = useRef( null ) ;

    // The stroke under the pointer, drawn straight on the canvas until it ends.
    const live      = useRef( null ) ;
    const pointer   = useRef( null ) ;
    const startedAt = useRef( 0 ) ;

    const [ size     , setSize     ] = useState( { height : 0 , width : 0 } ) ;
    const [ measured , setMeasured ] = useState( '#000000' ) ;

    const inactive = disabled || readOnly ;
    const empty    = isSignatureEmpty( value ) ;

    // The surface follows its box.
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

    // The ink follows the text colour, measured on the canvas : once laid out, and again on a theme
    // change — `data-theme` or a class on <html>, or the system's own —, or a stroke drawn in light
    // stays dark on dark. A state, not a callback : the React Compiler re-derives a callback's
    // dependencies from its body, and a counter it does not read would be dropped.
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

    const ink = color ?? measured ;

    useEffect( () => { onInk?.( ink ) ; } , [ ink , onInk ] ) ;

    useEffect( () => { if ( canvasRef ) canvasRef.current = canvas.current ; } ) ;

    /** Draws the value — or the frame of its replay —, fitted to the surface, and the live stroke if any. */
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

        const shown = frame === null || frame === undefined ? value : frameAt( value , frame ) ;

        // The value is drawn in its own units under a transform, so the pen scales with it.
        if ( shown?.width && shown?.height )
        {
            const { dx , dy , scale } = fit( shown , size ) ;

            context.save() ;
            context.translate( dx , dy ) ;
            context.scale( scale , scale ) ;

            for ( const d of strokesToPaths( shown , { size : thickness } ) )
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
    , [ frame , ink , size , thickness , value ] ) ;

    useEffect( draw , [ draw ] ) ;

    const onPointerDown = event =>
    {
        if ( inactive || pointer.current !== null || event.button > 0 )
        {
            return ;
        }

        event.preventDefault() ;
        event.currentTarget.setPointerCapture( event.pointerId ) ;

        pointer.current   = event.pointerId ;
        startedAt.current = event.timeStamp ;
        live.current      = [ point( event , event.currentTarget.getBoundingClientRect() , startedAt.current ) ] ;
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
            live.current.push( point( sample , rect , startedAt.current ) ) ;
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

        if ( stroke?.length > 0 )
        {
            // A value signed on another pad is brought to this one, as it is shown, before the stroke joins it.
            const base   = value && !empty ? fitSignature( value , size ) : { height : size.height , strokes : [] , width : size.width } ;
            const offset = base.strokes.length > 0 ? signatureDuration( base ) + PAUSE : 0 ;

            onStroke( { height : size.height , strokes : [ ...base.strokes , stroke.map( ( [ x , y , pressure , t ] ) => [ x , y , pressure , t + offset ] ) ] , width : size.width } ) ;
        }
        else
        {
            draw() ;
        }
    } ;

    return (
        <div
            aria-describedby = { describedBy }
            aria-disabled    = { disabled || undefined }
            aria-label       = { ariaLabel }
            className        = { cn(
                'relative h-40 w-full select-none overflow-hidden rounded-box border border-base-300 bg-base-100 text-base-content' ,
                !inactive && 'cursor-crosshair' ,
                disabled && 'opacity-60' ,
                className ,
            ) }
            id              = { id }
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
                    { placeholder }
                </div>
            ) }

            { children }
        </div>
    ) ;
} ;

/** On a narrow screen held upright, a word : the pad is wider the other way. */
const RotateHint = ( { text } ) =>
{
    const [ portrait , setPortrait ] = useState( false ) ;

    useEffect( () =>
    {
        const media = window.matchMedia?.( '(orientation: portrait) and (max-width: 640px)' ) ;

        if ( !media )
        {
            return undefined ;
        }

        const update = () => setPortrait( media.matches ) ;

        update() ;
        media.addEventListener( 'change' , update ) ;

        return () => media.removeEventListener( 'change' , update ) ;
    }
    , [] ) ;

    return portrait && text ? <p className="text-center text-xs text-base-content/60">{ text }</p> : null ;
} ;

const SignaturePad =
({
    ariaLabel ,
    className ,
    color ,
    defaultValue = null ,
    disabled = false ,
    error ,
    expandable = false ,
    expandTitle ,
    format = 'png' ,
    helper ,
    id ,
    label ,
    minPoints = 12 ,
    name ,
    onChange ,
    onEnd ,
    padClassName ,
    path = 'components.signature' ,
    placeholder ,
    readOnly = false ,
    ref ,
    replay = false ,
    required = false ,
    showClear = true ,
    showUndo = true ,
    thickness = 3 ,
    validatorHint ,
    value : valueFromProps ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const generatedId = useId() ;
    const fieldId     = id ?? generatedId ;
    const helperId    = `${ fieldId }-helper` ;

    const canvas = useRef( null ) ;

    const [ ink     , setInk     ] = useState( '#000000' ) ;
    const [ notice  , setNotice  ] = useState( '' ) ;
    const [ sent    , setSent    ] = useState( '' ) ;
    const [ touched , setTouched ] = useState( false ) ;
    const [ short   , setShort   ] = useState( false ) ;
    const [ frame   , setFrame   ] = useState( null ) ;
    const [ draft   , setDraft   ] = useState( null ) ;

    const empty    = isSignatureEmpty( value ) ;
    const inactive = disabled || readOnly ;

    const { close , modalRef , open } = useModal() ;

    // What the form sends, kept in step with the value.
    useEffect( () =>
    {
        if ( !name && !required )
        {
            return undefined ;
        }

        if ( empty )
        {
            setSent( '' ) ;
            return undefined ;
        }

        if ( format === 'json' )
        {
            setSent( JSON.stringify( value ) ) ;
            return undefined ;
        }

        if ( format === 'svg' )
        {
            setSent( signatureToSvg( value , { color : ink , size : thickness } ) ) ;
            return undefined ;
        }

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
    , [ empty , format , ink , name , required , thickness , value ] ) ;

    /** A stroke ended : the signature it makes, or nothing if it is too little to be one. */
    const onStroke = useCallback( next =>
    {
        setTouched( true ) ;

        if ( isSignatureEmpty( next , { minPoints } ) )
        {
            setValue( null ) ;
            setShort( true ) ;
            setNotice( labels.tooShort ?? '' ) ;
            return ;
        }

        setShort( false ) ;
        setValue( next ) ;
        onEnd?.( next , { duration : signatureDuration( next ) , points : points( next ) } ) ;
    }
    , [ labels.tooShort , minPoints , onEnd , setValue ] ) ;

    const clear = useCallback( () =>
    {
        setValue( null ) ;
        setShort( false ) ;
        setNotice( labels.cleared ?? '' ) ;
    }
    , [ labels.cleared , setValue ] ) ;

    const undo = useCallback( () =>
    {
        if ( !value || value.strokes.length === 0 )
        {
            return ;
        }

        const strokes = value.strokes.slice( 0 , -1 ) ;

        setValue( strokes.length === 0 ? null : { ...value , strokes } ) ;
    }
    , [ setValue , value ] ) ;

    // The replay : the frame advances with the clock until the last point.
    const play = useCallback( () =>
    {
        const duration = signatureDuration( value ) ;

        if ( duration === 0 || window.matchMedia?.( '(prefers-reduced-motion: reduce)' ).matches )
        {
            setFrame( null ) ;
            return undefined ;
        }

        const start = performance.now() ;
        let handle ;

        const tick = now =>
        {
            const elapsed = now - start ;

            if ( elapsed >= duration )
            {
                setFrame( null ) ;
                return ;
            }

            setFrame( elapsed ) ;
            handle = requestAnimationFrame( tick ) ;
        } ;

        setFrame( 0 ) ;
        handle = requestAnimationFrame( tick ) ;

        return () => cancelAnimationFrame( handle ) ;
    }
    , [ value ] ) ;

    useEffect( () =>
    {
        if ( replay && readOnly )
        {
            return play() ;
        }

        return undefined ;
    }
    , [ play , readOnly , replay ] ) ;

    const expand = useCallback( () =>
    {
        setDraft( value ) ;
        open() ;
    }
    , [ open , value ] ) ;

    const confirmDraft = () =>
    {
        if ( draft && !isSignatureEmpty( draft , { minPoints } ) )
        {
            setTouched( true ) ;
            setShort( false ) ;
            setValue( draft ) ;
            onEnd?.( draft , { duration : signatureDuration( draft ) , points : points( draft ) } ) ;
        }

        close() ;
    } ;

    useImperativeHandle( ref , () => (
    {
        canvas    : canvas.current ,
        clear ,
        expand ,
        isEmpty   : () => isSignatureEmpty( value ) ,
        replay    : play ,
        toDataURL : () => ( isSignatureEmpty( value ) ? '' : canvas.current?.toDataURL( 'image/png' ) ?? '' ) ,
        toPng     : options => signatureToPng( value , { color : ink , size : thickness , ...options } ) ,
        toSvg     : options => signatureToSvg( value , { color : ink , size : thickness , ...options } ) ,
        undo ,
    } )
    , [ clear , expand , ink , play , thickness , undo , value ] ) ;

    const nameOfPad = ariaLabel ?? label ?? labels.label ;

    const message = error
                 ?? ( short ? labels.tooShort : null )
                 ?? ( required && touched && empty && !inactive ? ( validatorHint ?? labels.required ) : null ) ;

    const describedBy = message || helper ? helperId : undefined ;

    return (
        <div className={ cn( 'flex flex-col gap-2' , className ) }>
            { label && <label className="label" htmlFor={ fieldId }>{ label }</label> }

            <Surface
                ariaLabel   = { nameOfPad }
                canvasRef   = { canvas }
                className   = { cn( message && 'border-error' , padClassName ) }
                color       = { color }
                describedBy = { describedBy }
                disabled    = { disabled }
                frame       = { frame }
                id          = { fieldId }
                onInk       = { setInk }
                onStroke    = { onStroke }
                placeholder = { placeholder ?? labels.signHere }
                readOnly    = { readOnly }
                thickness   = { thickness }
                value       = { value }
            >
                { expandable && !inactive && (
                    <Button className="absolute end-1 top-1" icon={ MdOpenInFull } onClick={ expand } shape="square" size="xs" style="ghost" title={ labels.expand } />
                ) }
            </Surface>

            { !inactive && ( showUndo || showClear ) && (
                <div className="flex justify-end gap-1">
                    { showUndo  && <Button disabled={ empty } icon={ MdUndo }  onClick={ undo }  size="xs" style="ghost" title={ labels.undo } /> }
                    { showClear && <Button disabled={ empty } icon={ MdClear } onClick={ clear } size="xs" style="ghost">{ labels.clear }</Button> }
                </div>
            ) }

            { message
                ? <p className="label text-xs text-error" id={ helperId }>{ message }</p>
                : helper ? <p className="label text-xs text-base-content/70" id={ helperId }>{ helper }</p> : null }

            <span aria-live="polite" className="sr-only">{ notice }</span>

            { ( name || required ) && (
                // A text input, not a hidden one : the browser validates `required` on it, and holds the form.
                <input
                    aria-hidden = "true"
                    className   = "sr-only"
                    disabled    = { disabled }
                    name        = { name }
                    onChange    = { () => {} }
                    onInvalid   = { event => { event.preventDefault() ; setTouched( true ) ; } }
                    required    = { required && !readOnly }
                    tabIndex    = { -1 }
                    type        = "text"
                    value       = { sent }
                />
            ) }

            { expandable && (
                <Modal
                    contentClassName = "flex min-h-0 flex-1 flex-col gap-3 p-4"
                    footerNode       = {
                        <div className="flex flex-wrap justify-end gap-2 px-4 py-3">
                            <Button disabled={ isSignatureEmpty( draft ) } icon={ MdUndo } onClick={ () => setDraft( current => ( current && current.strokes.length > 1 ? { ...current , strokes : current.strokes.slice( 0 , -1 ) } : null ) ) } style="ghost">{ labels.undo }</Button>
                            <Button disabled={ isSignatureEmpty( draft ) } icon={ MdClear } onClick={ () => setDraft( null ) } style="ghost">{ labels.clear }</Button>
                            <Button color="primary" disabled={ isSignatureEmpty( draft , { minPoints } ) } onClick={ confirmDraft }>{ labels.validate }</Button>
                        </div>
                    }
                    fullScreen
                    ref   = { modalRef }
                    title = { expandTitle ?? labels.expand }
                >
                    <RotateHint text={ labels.rotate } />
                    <Surface
                        ariaLabel   = { nameOfPad }
                        className   = "min-h-0 flex-1"
                        color       = { color }
                        onStroke    = { setDraft }
                        placeholder = { placeholder ?? labels.signHere }
                        thickness   = { thickness }
                        value       = { draft }
                    />
                </Modal>
            ) }
        </div>
    ) ;
} ;

SignaturePad.displayName = 'SignaturePad' ;

export default SignaturePad ;
