'use client' ;

/**
 * DualRangeInput — a range with **open bounds** : two number fields and a
 * `DualRange` slider, where an EMPTY field means « no bound ».
 *
 * « From 50 », « up to 200 », « between 50 and 200 » : the three questions a
 * range filter asks, and a slider alone can only ask the last one.
 *
 * 🔑 **The fields are the source of truth**, kept as TEXT by the caller
 * (`value = { min , max }`) : typing « 0.5 » stays fluid, where a number round
 * trip would fight the caret. Convert on apply with `helpers/numbers/parseBound`
 * — the same rule this component reads them with.
 *
 * The slider follows the fields and writes back into them :
 *
 *  - a handle pushed to an extreme CLEARS that bound — the extreme is « no
 *    bound », not « exactly the ceiling » ;
 *  - a value typed BEYOND the slider's ceiling is kept, the handle pinned at the
 *    end — the ceiling is a convenience sized on the data, never a cap ;
 *  - the slider writes clean stepped figures (`digits` decimals, no float
 *    noise, no trailing zeros).
 *
 * **The value at the floor** : `includeFloor` (default) keeps it as a bound — an
 * amount of 0 is real ; `false` treats it as none — a measure where 0 means
 * « not filled in ».
 *
 * Two layouts : without `label`, the two fields fill a row above the slider ;
 * with `label`, a header row carries the label, its `unit` and two compact
 * fields, and `note` (a count) goes under the slider — for a panel of several
 * ranges.
 *
 * @module components/ranges/DualRangeInput
 */

import DualRange from './DualRange' ;

import parseBound from '../../helpers/numbers/parseBound' ;

import cn from '../../themes/helpers/cn' ;

import { getInputClasses } from '../../themes/components/input' ;

/**
 * The number of decimals a step implies : `0.5` → 1, `50` → 0.
 *
 * @param {number} step
 * @returns {number}
 */
export const stepDigits = step => ( String( step ).split( '.' )[ 1 ] ?? '' ).length ;

/**
 * A number → its shortest text at a precision : no float noise, no trailing
 * zeros (`0.30000000000000004` → `'0.3'`).
 *
 * @param {number} value
 * @param {number} digits
 * @returns {string}
 */
export const stepText = ( value , digits ) => String( Number( value.toFixed( digits ) ) ) ;

/**
 * @param {Object}          props
 * @param {string}          [props.className]          - Additional class names for the wrapper.
 * @param {number}          [props.digits]             - Decimals the slider writes ; defaults to the step's.
 * @param {boolean}         [props.disabled=false]     - Disables the fields and the slider.
 * @param {Function}        [props.formatValue]        - Formats a bound for the slider's accessible value.
 * @param {boolean}         [props.includeFloor=true]  - Whether a value AT `min` is a bound (see `parseBound`).
 * @param {React.ReactNode} [props.label]              - A header label : switches to the compact layout.
 * @param {number}          [props.max=100]            - The slider's ceiling — a convenience, never a cap.
 * @param {string}          [props.maxLabel='Max']     - Placeholder and accessible name of the upper field.
 * @param {number}          [props.min=0]              - The slider's floor, and the fields' minimum.
 * @param {string}          [props.minLabel='Min']     - Placeholder and accessible name of the lower field.
 * @param {React.ReactNode} [props.note]               - A line under the slider (a count), compact layout.
 * @param {Function}        props.onChange             - Called with the next `{ min , max }` texts.
 * @param {string}          [props.size='sm']          - Size of the fields and the slider ; the compact fields are `xs`.
 * @param {number}          [props.step=1]             - Slider and fields step.
 * @param {React.ReactNode} [props.unit]               - Shown beside the label.
 * @param {{ min : string , max : string }} [props.value] - The fields' texts ; empty = no bound.
 *
 * @example
 * ```jsx
 * const [ draft , setDraft ] = useState( { min : '' , max : '' } ) ;
 *
 * <DualRangeInput max={ 5000 } step={ 50 } value={ draft } onChange={ setDraft } />
 *
 * onApply( { min : parseBound( draft.min ) , max : parseBound( draft.max ) } ) ;
 * ```
 */
const DualRangeInput =
({
    className ,
    digits ,
    disabled     = false ,
    formatValue ,
    includeFloor = true ,
    label ,
    max          = 100 ,
    maxLabel     = 'Max' ,
    min          = 0 ,
    minLabel     = 'Min' ,
    note ,
    onChange ,
    size         = 'sm' ,
    step         = 1 ,
    unit ,
    value        = { min : '' , max : '' } ,
}) =>
{
    const places = digits ?? stepDigits( step ) ;

    const numMin = parseBound( value.min , { floor : min , includeFloor } ) ;
    const numMax = parseBound( value.max , { floor : min , includeFloor } ) ;

    const clamp = n => Math.min( Math.max( n , min ) , max ) ;

    const start = clamp( numMin ?? min ) ;
    const end   = clamp( numMax ?? max ) ;

    const onSlider = ( [ s , e ] ) => onChange?.(
    {
        min : s <= min ? '' : stepText( s , places ) ,
        max : e >= max
            ? ( numMax != null && numMax > max ? value.max : '' )
            : stepText( e , places ) ,
    } ) ;

    const compact    = label != null ;
    const namePrefix = typeof label === 'string' ? `${ label } — ` : '' ;

    const field = ( key , text ) => (
        <input
            type        = "number"
            aria-label  = { `${ namePrefix }${ text }` }
            className   = { getInputClasses( { size : compact ? 'xs' : size , className : cn( 'text-right tabular-nums' , compact ? 'w-16' : 'w-full' ) } ) }
            disabled    = { disabled }
            min         = { min }
            placeholder = { text }
            step        = { step }
            value       = { value[ key ] ?? '' }
            onChange    = { event => onChange?.( { ...value , [ key ] : event.target.value } ) }
        />
    ) ;

    const fields = (
        <div className="flex items-center gap-1.5">
            { field( 'min' , minLabel ) }
            <span className="shrink-0 text-base-content/40">–</span>
            { field( 'max' , maxLabel ) }
        </div>
    ) ;

    return (
        <div className={ cn( 'flex flex-col' , compact ? 'gap-2.5' : 'gap-3' , className ) }>

            { compact
                ? (
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-sm">
                            { label } { unit && <span className="text-xs text-base-content/60">{ unit }</span> }
                        </span>
                        { fields }
                    </div>
                  )
                : fields
            }

            <DualRange
                color          = "primary"
                disabled       = { disabled }
                endAriaLabel   = { `${ namePrefix }${ maxLabel }` }
                formatValue    = { formatValue }
                max            = { max }
                min            = { min }
                size           = { size }
                startAriaLabel = { `${ namePrefix }${ minLabel }` }
                step           = { step }
                value          = { [ Math.min( start , end ) , Math.max( start , end ) ] }
                onChange       = { onSlider }
            />

            { compact && note && (
                <div className="-mt-1.5 text-right text-xs text-base-content/45 tabular-nums">{ note }</div>
            ) }

        </div>
    ) ;
} ;

DualRangeInput.displayName = 'DualRangeInput' ;

export default DualRangeInput ;
