'use client' ;

/**
 * PeriodFilterPanel — a filter criterion over a window of days, **open at
 * either end** : « from 1 July », « until 31 July », or both.
 *
 * Shortcuts first (« last 30 days », « last month »…) — a click applies and
 * closes, it IS the decision — then two `InputDatePicker`, « From » and « To »,
 * each optional and clearable, committed by « Apply ».
 *
 * **Two pickers rather than one `InputDateRangePicker`, on purpose** : the range
 * field only parses when BOTH dates are valid, so it cannot say « from 1 July »,
 * which is an ordinary question.
 *
 * An inverted window (end before start) is a legitimate — if empty — question :
 * it applies, and is flagged, never silently swapped.
 *
 * It emits ISO days `{ from , to }`, each `null` when open. Built from LOCAL
 * parts (`helpers/date/toIsoDay`), never with `toISOString()`. Each shortcut's
 * window is computed at CLICK time : a page left open overnight must not offer
 * yesterday's month.
 *
 * Both surfaces come from `AnchoredPanel`. The pickers' calendars open in a
 * portal, and a day clicked there does not close the dropdown.
 *
 * Labels : the criterion's bundle at `path`, over `components.filter.period`,
 * over `components.filter` ; `presets` names the shortcuts by id.
 *
 * @module components/filters/PeriodFilterPanel
 */

import { useEffect , useState } from 'react' ;

import AnchoredPanel   from '../panels/AnchoredPanel' ;
import InputDatePicker from '../inputs/InputDatePicker' ;
import useFilterLabels from './useFilterLabels' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import toIsoDay from '../../helpers/date/toIsoDay' ;

import cn from '../../themes/helpers/cn' ;

/**
 * The i18n path of the period's own defaults.
 * @type {string}
 */
export const PERIOD_LABELS_PATH = 'components.filter.period' ;

/**
 * The English last resort of the period's labels.
 * @type {Object}
 */
export const PERIOD_LABELS =
{
    clearField   : 'Clear date' ,
    from         : 'From' ,
    hint         : 'Leave one end empty for an open-ended period.' ,
    inverted     : 'The end date precedes the start date.' ,
    openCalendar : 'Open calendar' ,
    title        : 'Filter by period' ,
    to           : 'To' ,
    presets      :
    {
        last30    : 'Last 30 days' ,
        lastMonth : 'Last month' ,
        lastYear  : 'Last year' ,
        quarter   : 'This quarter' ,
        year      : 'This year' ,
    } ,
} ;

/**
 * @typedef {Object} PeriodPreset
 * @property {string}   id    - Names it in `presets` labels.
 * @property {Function} range - `() => { from , to }` ISO days, computed at click time.
 */

/**
 * The default shortcuts, in display order.
 * @type {PeriodPreset[]}
 */
export const PERIOD_PRESETS =
[
    {
        id    : 'last30' ,
        range : () =>
        {
            const to   = new Date() ;
            const from = new Date() ;
            from.setDate( from.getDate() - 29 ) ;
            return { from : toIsoDay( from ) , to : toIsoDay( to ) } ;
        } ,
    } ,
    {
        id    : 'lastMonth' ,
        range : () =>
        {
            const today = new Date() ;
            // Day 0 of the current month = the last day of the previous one.
            return {
                from : toIsoDay( new Date( today.getFullYear() , today.getMonth() - 1 , 1 ) ) ,
                to   : toIsoDay( new Date( today.getFullYear() , today.getMonth() , 0 ) ) ,
            } ;
        } ,
    } ,
    {
        id    : 'quarter' ,
        range : () =>
        {
            const today = new Date() ;
            const first = Math.floor( today.getMonth() / 3 ) * 3 ;
            return { from : toIsoDay( new Date( today.getFullYear() , first , 1 ) ) , to : toIsoDay( today ) } ;
        } ,
    } ,
    {
        id    : 'year' ,
        range : () =>
        {
            const today = new Date() ;
            return { from : toIsoDay( new Date( today.getFullYear() , 0 , 1 ) ) , to : toIsoDay( today ) } ;
        } ,
    } ,
    {
        id    : 'lastYear' ,
        range : () =>
        {
            const year = new Date().getFullYear() - 1 ;
            // Month 11, day 31 — a whole closed year, not « up to today ».
            return { from : toIsoDay( new Date( year , 0 , 1 ) ) , to : toIsoDay( new Date( year , 11 , 31 ) ) } ;
        } ,
    } ,
] ;

/**
 * `2026-07-01` → `01/07/2026`, by moving the parts around — no `Date`, so no
 * time zone can shift the day.
 *
 * @param {?string} iso
 * @returns {string} The masked day, or `''` when absent or malformed.
 */
const isoToMask = iso =>
{
    const [ year , month , day ] = ( iso ?? '' ).split( '-' ) ;
    return year && month && day ? `${ day }/${ month }/${ year }` : '' ;
} ;

/**
 * @param {Object}          props
 * @param {React.RefObject} props.anchorRef                - The trigger : the dropdown's anchor.
 * @param {boolean}         props.isOpen                   - Whether the panel is open ; owned by the caller.
 * @param {Function}        props.onApply                  - Called with `{ from , to }` ISO days, each `null` when open.
 * @param {Function}        props.onClose                  - Dismiss the panel.
 * @param {string}          [props.path]                   - The criterion's own i18n bundle.
 * @param {PeriodPreset[]}  [props.presets=PERIOD_PRESETS] - The shortcuts ; `[]` for none.
 * @param {{ from : ?string , to : ?string }} [props.selected] - The applied window, ISO days.
 *
 * @example
 * ```jsx
 * <PeriodFilterPanel
 *     anchorRef = { anchorRef }
 *     isOpen    = { isOpen }
 *     selected  = { period }
 *     onApply   = { setPeriod }
 *     onClose   = { () => setOpen( false ) }
 * />
 * ```
 */
const PeriodFilterPanel =
({
    anchorRef ,
    isOpen ,
    onApply ,
    onClose ,
    path ,
    presets = PERIOD_PRESETS ,
    selected ,
}) =>
{
    const family = useFilterLabels() ;
    const period = useI18n( PERIOD_LABELS_PATH , NO_LOCALE , false ) ?? {} ;
    const own    = useI18n( path ?? PERIOD_LABELS_PATH , NO_LOCALE , false ) ?? {} ;

    const labels =
    {
        ...family ,
        ...PERIOD_LABELS ,
        ...period ,
        ...own ,
        presets : { ...PERIOD_LABELS.presets , ...( period.presets ?? {} ) , ...( own.presets ?? {} ) } ,
    } ;

    // The MASKED strings the two fields carry, so typing stays fluid…
    const [ draft , setDraft ] = useState( () => ( { from : isoToMask( selected?.from ) , to : isoToMask( selected?.to ) } ) ) ;

    // …and the parsed ISO days they hand back : the mask logic belongs to the field.
    const [ dates , setDates ] = useState( () => ( { from : selected?.from ?? null , to : selected?.to ?? null } ) ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: rewinds on the open transition only ; `selected` (a fresh object each render) must not retrigger it.
    useEffect( () =>
    {
        if ( isOpen )
        {
            setDraft( { from : isoToMask( selected?.from ) , to : isoToMask( selected?.to ) } ) ;
            setDates( { from : selected?.from ?? null , to : selected?.to ?? null } ) ;
        }
    } , [ isOpen ] ) ;

    /**
     * Records one parsed end. **Idempotent** : each field emits on mount with
     * its seeded value, and the handler is new at every render — without a
     * bail-out returning the SAME state, the effect calling it would loop.
     *
     * @param {'from'|'to'} key
     * @param {?Date}       date
     */
    const setDate = ( key , date ) => setDates( previous =>
    {
        const next = date ? toIsoDay( date ) : null ;
        return previous[ key ] === next ? previous : { ...previous , [ key ] : next } ;
    } ) ;

    const clear = () =>
    {
        setDraft( { from : '' , to : '' } ) ;
        setDates( { from : null , to : null } ) ;
    } ;

    const applyPreset = ( preset ) =>
    {
        onApply?.( preset.range() ) ;
        onClose?.() ;
    } ;

    const apply = () =>
    {
        onApply?.( { from : dates.from , to : dates.to } ) ;
        onClose?.() ;
    } ;

    const hasDraft = !!draft.from || !!draft.to ;
    const inverted = !!dates.from && !!dates.to && dates.from > dates.to ;

    const footer = ( { size } ) => (
        <>
            <button type="button" className={ cn( 'btn btn-ghost' , size ) } disabled={ !hasDraft } onClick={ clear }>
                { labels.clearAll }
            </button>
            <button type="button" className={ cn( 'btn btn-primary' , size ) } onClick={ apply }>
                { labels.apply }
            </button>
        </>
    ) ;

    const picker = ( key ) => (
        <InputDatePicker
            clearLabel   = { labels.clearField }
            label        = { labels[ key ] }
            onChange     = { value => setDraft( previous => ( { ...previous , [ key ] : value } ) ) }
            onDate       = { date => setDate( key , date ) }
            size         = "sm"
            triggerLabel = { labels.openCalendar }
            value        = { draft[ key ] }
        />
    ) ;

    return (
        <AnchoredPanel
            anchorRef   = { anchorRef }
            closeLabel  = { labels.close }
            footer      = { footer }
            isOpen      = { isOpen }
            onClose     = { onClose }
            panelHeight = { 320 }
            panelWidth  = { 288 }
            title       = { labels.title }
        >
            <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-4 p-3">

                    { presets.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            { presets.map( preset => (
                                <button
                                    key       = { preset.id }
                                    type      = "button"
                                    className = "btn btn-xs btn-ghost border border-base-300"
                                    onClick   = { () => applyPreset( preset ) }
                                >
                                    { labels.presets[ preset.id ] ?? preset.id }
                                </button>
                            ) ) }
                        </div>
                    ) }

                    { picker( 'from' ) }
                    { picker( 'to' ) }

                    { inverted
                        ? <p className="text-xs text-warning">{ labels.inverted }</p>
                        : <p className="text-xs text-base-content/50">{ labels.hint }</p>
                    }

                </div>
            </div>
        </AnchoredPanel>
    ) ;
} ;

PeriodFilterPanel.displayName = 'PeriodFilterPanel' ;

export default PeriodFilterPanel ;
