'use client' ;

/**
 * RangeFilterPanel — a filter criterion over one or several NUMBER ranges with
 * open bounds : an amount, or the four measures of an item.
 *
 * One `DualRangeInput` per field, over a LOCAL draft of texts rewound at each
 * opening ; « Apply » converts it with `helpers/numbers/parseBound` and emits
 * the ranges that carry at least one bound — a field left empty is no filter.
 *
 * Both surfaces come from `AnchoredPanel` : an anchored dropdown on `md`+, a
 * full-screen sheet below.
 *
 * - **One field** — its two inputs fill a row above the slider ; the footer
 *   reads « Clear / Apply ».
 * - **Several** — a row per field, its label, unit and compact inputs on top,
 *   an optional `note` (a count) under its slider ; « Apply (n) » counts the
 *   fields that carry a bound.
 *
 * Each field sizes its slider on `max` — take it from the data with
 * `helpers/numbers/niceCeil` — but a value typed beyond it is kept : the
 * ceiling is a convenience, never a cap. `includeFloor : false` for a measure
 * where 0 means « not filled in » (see `parseBound`).
 *
 * Labels : the criterion's bundle at `path`, over `components.filter` — see
 * `useFilterLabels` ; `min` / `max` name the two inputs.
 *
 * @module components/filters/RangeFilterPanel
 */

import { useEffect , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import AnchoredPanel   from '../panels/AnchoredPanel' ;
import DualRangeInput  from '../ranges/DualRangeInput' ;
import useFilterLabels from './useFilterLabels' ;

import parseBound from '../../helpers/numbers/parseBound' ;

import cn from '../../themes/helpers/cn' ;

/**
 * @typedef {Object} RangeField
 * @property {string}          id                   - The key of its range in `selected` and in what `onApply` emits.
 * @property {number}          [digits]             - Decimals the slider writes ; defaults to the step's.
 * @property {Function}        [formatValue]        - Formats a bound for the slider.
 * @property {boolean}         [includeFloor=true]  - Whether a value at `min` is a bound.
 * @property {React.ReactNode} [label]              - The row's name (several fields).
 * @property {number}          [max=100]            - The slider's ceiling.
 * @property {number}          [min=0]              - The slider's floor.
 * @property {React.ReactNode} [note]               - A line under the slider (several fields).
 * @property {number}          [step=1]             - The step.
 * @property {React.ReactNode} [unit]               - Shown beside the label.
 */

/**
 * The texts of a draft, from applied numeric ranges.
 *
 * @param {RangeField[]} fields
 * @param {Object<string, { min : ?number , max : ?number }>} selected
 * @returns {Object<string, { min : string , max : string }>}
 */
const seed = ( fields , selected ) =>
{
    const draft = {} ;
    for ( const { id } of fields )
    {
        const range = selected?.[ id ] ;
        draft[ id ] = { min : range?.min != null ? String( range.min ) : '' , max : range?.max != null ? String( range.max ) : '' } ;
    }
    return draft ;
} ;

/**
 * @param {Object}                   props
 * @param {React.RefObject}          props.anchorRef       - The trigger : the dropdown's anchor.
 * @param {RangeField[]}             props.fields          - The ranges, in display order.
 * @param {boolean}                  props.isOpen          - Whether the panel is open ; owned by the caller.
 * @param {Function}                 props.onApply         - Called with `{ [id] : { min , max } }`, only the fields that carry a bound.
 * @param {Function}                 props.onClose         - Dismiss the panel.
 * @param {string}                   [props.panelClassName] - Width classes of the dropdown ; wider for several fields.
 * @param {number}                   [props.panelHeight]   - Estimated full dropdown height.
 * @param {string}                   [props.path]          - The criterion's own i18n bundle.
 * @param {Object<string, { min : ?number , max : ?number }>} [props.selected={}] - The applied ranges.
 *
 * @example
 * ```jsx
 * <RangeFilterPanel
 *     anchorRef = { anchorRef }
 *     fields    = { [ { id : 'price' , max : niceCeil( highest ) , step : 50 } ] }
 *     isOpen    = { isOpen }
 *     path      = "app.filters.price"
 *     selected  = { { price } }
 *     onApply   = { ranges => setPrice( ranges.price ?? null ) }
 *     onClose   = { () => setOpen( false ) }
 * />
 * ```
 */
const RangeFilterPanel =
({
    anchorRef ,
    fields = [] ,
    isOpen ,
    onApply ,
    onClose ,
    panelClassName ,
    panelHeight ,
    path ,
    selected = {} ,
}) =>
{
    const labels = useFilterLabels( path ) ;

    const [ draft , setDraft ] = useState( () => seed( fields , selected ) ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: rewinds on the open transition only ; `fields` and `selected` (fresh each render) must not retrigger it.
    useEffect( () =>
    {
        if ( isOpen ) { setDraft( seed( fields , selected ) ) ; }
    } , [ isOpen ] ) ;

    const several = fields.length > 1 ;

    const filled = fields.filter( ( { id } ) => ( draft[ id ]?.min ?? '' ) !== '' || ( draft[ id ]?.max ?? '' ) !== '' ) ;

    const clear = () => setDraft( seed( fields , {} ) ) ;

    const apply = () =>
    {
        const ranges = {} ;

        for ( const { id , min = 0 , includeFloor = true } of fields )
        {
            const lower = parseBound( draft[ id ]?.min , { floor : min , includeFloor } ) ;
            const upper = parseBound( draft[ id ]?.max , { floor : min , includeFloor } ) ;

            if ( lower != null || upper != null ) { ranges[ id ] = { min : lower , max : upper } ; }
        }

        onApply?.( ranges ) ;
        onClose?.() ;
    } ;

    const minLabel = labels.min ?? 'Min' ;
    const maxLabel = labels.max ?? 'Max' ;

    const footer = ( { size } ) => (
        <>
            <button
                type      = "button"
                className = { cn( 'btn btn-ghost' , size ) }
                disabled  = { filled.length === 0 }
                onClick   = { clear }
            >
                { labels.clearAll }
            </button>
            <button
                type      = "button"
                className = { cn( 'btn btn-primary' , size ) }
                onClick   = { apply }
            >
                { several && filled.length > 0 ? format( '{0} ({1})' , labels.apply , filled.length ) : labels.apply }
            </button>
        </>
    ) ;

    return (
        <AnchoredPanel
            anchorRef      = { anchorRef }
            closeLabel     = { labels.close }
            footer         = { footer }
            isOpen         = { isOpen }
            onClose        = { onClose }
            panelClassName = { panelClassName ?? ( several ? 'w-80 max-w-[90vw]' : 'w-72 max-w-[85vw]' ) }
            panelHeight    = { panelHeight ?? ( several ? 430 : 260 ) }
            panelWidth     = { several ? 320 : 288 }
            title          = { labels.title }
        >
            <div className="min-h-0 flex-1 overflow-y-auto">
                { fields.map( ( field , index ) => (
                    <DualRangeInput
                        key          = { field.id }
                        className    = { several ? cn( 'px-4 py-3' , index > 0 && 'border-t border-base-300/60' ) : 'p-3' }
                        digits       = { field.digits }
                        formatValue  = { field.formatValue }
                        includeFloor = { field.includeFloor }
                        label        = { several ? ( field.label ?? field.id ) : undefined }
                        max          = { field.max }
                        maxLabel     = { maxLabel }
                        min          = { field.min }
                        minLabel     = { minLabel }
                        note         = { field.note }
                        step         = { field.step }
                        unit         = { field.unit }
                        value        = { draft[ field.id ] ?? { min : '' , max : '' } }
                        onChange     = { next => setDraft( previous => ( { ...previous , [ field.id ] : next } ) ) }
                    />
                ) ) }
            </div>
        </AnchoredPanel>
    ) ;
} ;

RangeFilterPanel.displayName = 'RangeFilterPanel' ;

export default RangeFilterPanel ;
