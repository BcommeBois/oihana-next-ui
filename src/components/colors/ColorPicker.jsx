'use client' ;

import { useCallback , useEffect , useRef , useState } from 'react' ;

import useValue from '../../hooks/useValue' ;

import hexToHsva from '../../helpers/colors/hexToHsva' ;
import hsvaToHex from '../../helpers/colors/hsvaToHex' ;

import getColorPickerClasses , { DEFAULT_PRESETS } from '../../themes/components/colorPicker' ;

import InputHexColor from '../inputs/InputHexColor' ;

import ColorIndicator from './ColorIndicator' ;
import Saturation     from './picker/Saturation' ;
import Hue            from './picker/Hue' ;
import Alpha          from './picker/Alpha' ;

import { MdColorize as EyeDropperIcon } from 'react-icons/md' ;

const FALLBACK = '#000000' ;

// A fully-typed hex value (#rrggbb / #rrggbbaa) — partial / shorthand typing does
// not move the square, so the field never fights what the user is typing.
const HEX_RE = /^#?([0-9a-f]{6}|[0-9a-f]{8})$/i ;

/**
 * ColorPicker — a self-contained, hand-rolled color picker panel.
 *
 * Saturation/brightness square + hue (+ optional alpha) tracks, an editable hex
 * field ({@link InputHexColor}), an optional eyedropper
 * (native EyeDropper API, progressive) and an optional preset palette. Controlled
 * or uncontrolled via {@link useValue} ; emits a hex string
 * ('#RRGGBB', or '#RRGGBBAA' when `alpha`).
 *
 * The picker keeps its own HSVA state as the source of truth and only re-seeds it
 * from the hex value when that value changes from the *outside* (typed, preset,
 * eyedropper, prop) — so dragging into black or grey never loses the hue.
 *
 * @module components/colors/ColorPicker
 *
 * @param {Object} props
 * @param {boolean} [props.alpha=false] - Enable the alpha track and emit '#RRGGBBAA'.
 * @param {string} [props.className] - Extra classes for the panel.
 * @param {string} [props.defaultValue] - Initial value (uncontrolled).
 * @param {(value: string) => void} [props.onChange] - Change handler.
 * @param {string[]} [props.presets] - Preset swatches (defaults to a built-in palette).
 * @param {boolean} [props.showEyeDropper=true] - Show the screen eyedropper (when supported).
 * @param {boolean} [props.showInput=true] - Show the editable hex field.
 * @param {boolean} [props.showPresets=true] - Show the preset palette.
 * @param {import('../../themes/components/colorPicker').ColorPickerSize} [props.size='md'] - Panel size.
 * @param {string} [props.value] - Controlled value.
 *
 * @example
 * ```jsx
 * const [ color , setColor ] = useState( '#FF5733' ) ;
 * <ColorPicker value={ color } onChange={ setColor } />
 * ```
 */
const ColorPicker =
({
    alpha = false ,
    className ,
    defaultValue ,
    onChange : onChangeFromProps ,
    presets = DEFAULT_PRESETS ,
    showEyeDropper = true ,
    showInput = true ,
    showPresets = true ,
    size ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const [ hex , setHex ] = useValue( defaultValue , valueFromProps , onChangeFromProps ) ;

    const [ hsva , setHsva ] = useState( () => hexToHsva( hex || FALLBACK ) ) ;

    // Tracks our own last emit so external changes (and only those) re-seed the HSVA.
    const lastEmitted = useRef( hex || FALLBACK ) ;

    useEffect( () =>
    {
        const next = hex || FALLBACK ;
        if ( next !== lastEmitted.current )
        {
            lastEmitted.current = next ;
            if ( HEX_RE.test( next ) )
            {
                setHsva( hexToHsva( next ) ) ;
            }
        }
    }
    , [ hex ] ) ;

    // Latest values mirrored into refs so `update` stays referentially STABLE.
    // Interactive registers its drag listeners on mousedown ; if `update` changed
    // every render (it reads hsva / alpha / setHex), Interactive's cleanup effect
    // would tear those listeners down mid-drag — breaking drag-to-pick. Refs avoid that.
    const hsvaRef   = useRef( hsva ) ;   hsvaRef.current   = hsva ;
    const alphaRef  = useRef( alpha ) ;  alphaRef.current  = alpha ;
    const setHexRef = useRef( setHex ) ; setHexRef.current = setHex ;

    // Drag updates : mutate HSVA directly (absolute values) and emit the hex.
    const update = useCallback( partial =>
    {
        const nextHsva = { ...hsvaRef.current , ...partial } ;
        hsvaRef.current = nextHsva ;
        setHsva( nextHsva ) ;
        const out = hsvaToHex( nextHsva , alphaRef.current ) ;
        lastEmitted.current = out ;
        setHexRef.current( out ) ;
    }
    , [] ) ;

    // EyeDropper API support (client only).
    const [ eyeDropperSupported , setEyeDropperSupported ] = useState( false ) ;

    useEffect( () =>
    {
        if ( typeof window !== 'undefined' && 'EyeDropper' in window )
        {
            setEyeDropperSupported( true ) ;
        }
    }
    , [] ) ;

    const handleEyeDropper = async () =>
    {
        if ( typeof window === 'undefined' || !( 'EyeDropper' in window ) )
        {
            return ;
        }
        try
        {
            const eyeDropper = new window.EyeDropper() ;
            const result = await eyeDropper.open() ;
            if ( result?.sRGBHex )
            {
                setHex( result.sRGBHex.toUpperCase() ) ;
            }
        }
        catch
        {
            // user cancelled — ignore
        }
    } ;

    return (
        <div className={ getColorPickerClasses({ className , size }) } { ...rest }>

            {/* Saturation / brightness square */}
            <div className="relative aspect-square w-full rounded-box shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]">
                <Saturation hsva={ hsva } onChange={ update } />
            </div>

            {/* Hue (+ alpha) tracks, with optional eyedropper */}
            <div className="flex items-center gap-3">
                { showEyeDropper && eyeDropperSupported && (
                    <button
                        type       = "button"
                        className  = "btn btn-ghost btn-square btn-sm shrink-0"
                        onClick    = { handleEyeDropper }
                        aria-label = "Pick a color from the screen"
                    >
                        <EyeDropperIcon className="size-5" />
                    </button>
                )}

                <div className="flex flex-1 flex-col gap-3">
                    <div className="relative h-3 w-full">
                        <Hue hue={ hsva.h } onChange={ update } />
                    </div>
                    { alpha && (
                        <div className="relative h-3 w-full">
                            <Alpha hsva={ hsva } onChange={ update } />
                        </div>
                    )}
                </div>
            </div>

            {/* Editable hex field */}
            { showInput && (
                <InputHexColor
                    alpha       = { alpha }
                    value       = { hex ?? '' }
                    onChange    = { setHex }
                    placeholder = { alpha ? 'RRGGBBAA' : 'RRGGBB' }
                />
            )}

            {/* Presets */}
            { showPresets && presets?.length > 0 && (
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium opacity-60">Presets</span>
                    <div className="flex flex-wrap gap-1.5">
                        { presets.map( ( color ) => (
                            <button
                                key        = { color }
                                type       = "button"
                                onClick    = { () => setHex( color ) }
                                aria-label = { `Use ${ color }` }
                                className  = "rounded outline-offset-2 transition-transform hover:scale-110 focus-visible:outline"
                            >
                                <ColorIndicator color={ color } size="md" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    ) ;
} ;

ColorPicker.displayName = 'ColorPicker' ;

export default ColorPicker ;
