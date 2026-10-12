'use client' ;

import { useId , useRef , useState } from 'react' ;

import { MdAdd , MdBackspace , MdRemove } from 'react-icons/md' ;

import cn from '../../themes/helpers/cn' ;

import getButtonClassNames , { OUTLINE , SOFT } from '../../themes/components/button' ;

import { LG , MD , XL } from '../../themes/sizing/sizes' ;

import useI18n         from '../../contexts/locale/useI18n' ;
import NO_LOCALE       from '../../contexts/locale/noLocale' ;
import useNumberFormat from '../../hooks/useNumberFormat' ;
import usePressRepeat  from '../../hooks/usePressRepeat' ;
import useValue        from '../../hooks/useValue' ;

import applyKeypadKey ,
{
    formatKeypadText ,
    getDecimalSeparator ,
    keypadKeyFromEvent ,
    KEYPAD_KEYS ,
    parseKeypadText ,
    toKeypadText ,
} from '../../helpers/numbers/applyKeypadKey' ;

import { PRESS_REPEAT_DELAY , PRESS_REPEAT_INTERVAL } from '../../helpers/timers/createPressRepeat' ;

export const PHONE      = 'phone' ;
export const CALCULATOR = 'calculator' ;

/**
 * The digit rows of each layout, top to bottom.
 * @type {Object.<string,string[][]>}
 */
const ROWS =
{
    [ CALCULATOR ] : [ [ '7' , '8' , '9' ] , [ '4' , '5' , '6' ] , [ '1' , '2' , '3' ] ] ,
    [ PHONE      ] : [ [ '1' , '2' , '3' ] , [ '4' , '5' , '6' ] , [ '7' , '8' , '9' ] ] ,
} ;

/**
 * Key and display sizes. A key is never under 48 pixels : a gloved thumb on a
 * phone held in one hand.
 */
const keySizeMap =
{
    [ MD ] : 'h-12 min-h-12 text-xl' ,
    [ LG ] : 'h-14 min-h-14 text-2xl' ,
    [ XL ] : 'h-16 min-h-16 text-3xl' ,
} ;

const displaySizeMap =
{
    [ MD ] : 'min-h-14 text-3xl' ,
    [ LG ] : 'min-h-16 text-4xl' ,
    [ XL ] : 'min-h-20 text-5xl' ,
} ;

const unitSizeMap =
{
    [ MD ] : 'text-lg' ,
    [ LG ] : 'text-xl' ,
    [ XL ] : 'text-2xl' ,
} ;

// As wide as the display is high, and as high : the stepper frames the number.
const stepperSizeMap =
{
    [ MD ] : 'h-auto min-h-14 w-14' ,
    [ LG ] : 'h-auto min-h-16 w-16' ,
    [ XL ] : 'h-auto min-h-20 w-20' ,
} ;

const iconSizeMap =
{
    [ MD ] : 'size-6' ,
    [ LG ] : 'size-7' ,
    [ XL ] : 'size-8' ,
} ;

/**
 * NumericKeypad — a quantity typed with the thumb, on a pad that is always the same.
 *
 * Made for a phone held in one hand, a glove on, eyes on the shelf : large
 * keys in a fixed place, the number shown big. The display is an `<output>`,
 * not a field — 🔑 **no system keyboard ever opens**, so nothing slides up over
 * the screen and the keys never move.
 *
 * 🔑 **A number, never a string.** `onChange` receives a `number`, or `null`
 * while nothing is typed — `0` is a quantity, empty is not. What is on screen
 * meanwhile (`12,` or `0,50`) is the keypad's own business.
 *
 * 🔑 **A key past a limit is refused, not corrected.** Past `max`, one decimal
 * too many, a negative number (refused unless `min` is negative) : the value
 * stays as it was and `onLimit( { reason , value } )` says why, with the value
 * the key would have given. Confirming under `min` is refused the same way. A
 * quantity that changes by itself is a quantity nobody typed — so the keypad
 * never brings it back inside the range.
 *
 * The decimal separator is the language's (`,` in French), shown only when
 * `decimals` is above 0. −/+ around the display step by `step` ; with
 * `repeat`, held down they go on stepping — after `repeatDelay`, one step every
 * `repeatInterval` — and stop at the first step refused, so `onLimit` is
 * called once.
 *
 * With the focus on it, the physical keyboard works too : digits, `.` or `,`,
 * Backspace, Delete and Escape (clear), `+` and `-` (when the stepper shows),
 * and Enter — 🔑 **Enter is taken**, so a keypad inside a `<form>` never
 * submits it. Escape on an empty keypad is let through, to close the sheet or
 * window it sits in.
 *
 * It makes no sound : pair it with `useFeedbackSignal` — `success` in
 * `onSubmit`, `warning` in `onLimit`.
 *
 * @module components/inputs/NumericKeypad
 *
 * @example
 * ```jsx
 * <NumericKeypad label="Quantity" max={ 999 } onSubmit={ save } />
 *
 * // A volume in m³, three decimals, inside a range
 * <NumericKeypad
 *     decimals = { 3 }
 *     max      = { 50 }
 *     min      = { 0.5 }
 *     onChange = { setVolume }
 *     onLimit  = { () => signal( 'warning' ) }
 *     step     = { 0.5 }
 *     unit     = "m³"
 *     value    = { volume }
 * />
 * ```
 *
 * @param {Object} props
 * @param {string} [props.className] - Added to the keypad's root.
 * @param {number} [props.decimals=0] - The decimals allowed. 0 hides the separator key.
 * @param {?number} [props.defaultValue=null] - The initial value (uncontrolled).
 * @param {boolean} [props.disabled=false] - Disable every key.
 * @param {React.ReactNode} [props.label] - The keypad's visible name. Without one, it is named by the i18n `label` key.
 * @param {'phone'|'calculator'} [props.layout='phone'] - `phone` puts 1-2-3 on top, `calculator` 7-8-9.
 * @param {?number} [props.max] - The largest value. None by default.
 * @param {?number} [props.min=0] - The smallest value : 0 by default, so negative numbers are refused. `null` for none.
 * @param {Function} [props.onChange] - `( value : ?number ) => void`.
 * @param {Function} [props.onLimit] - `( { reason , value } ) => void`, for a key refused. `reason` is `max`, `min`, `decimals` or `length`.
 * @param {Function} [props.onSubmit] - `( value : number ) => void`. Shows the confirm button.
 * @param {string} [props.path='components.input.keypad'] - i18n path of the labels.
 * @param {React.ReactNode} [props.placeholder] - Shown while nothing is typed.
 * @param {boolean} [props.repeat=false] - Held down, − and + repeat : after `repeatDelay`, one step every `repeatInterval`, stopping at a limit.
 * @param {number} [props.repeatDelay=400] - Before − or + held down starts repeating, in milliseconds.
 * @param {number} [props.repeatInterval=100] - Between two repeated steps, in milliseconds.
 * @param {boolean} [props.showStepper=true] - Show −/+ around the display.
 * @param {'md'|'lg'|'xl'} [props.size='md'] - Keys of 48, 56 or 64 pixels.
 * @param {number} [props.step=1] - What −/+ take or add.
 * @param {string} [props.submitLabel] - The confirm button's text. Defaults to the i18n `submit` key.
 * @param {React.ReactNode} [props.unit] - Shown after the number : `m³`, `kg`, `colis`.
 * @param {?number} [props.value] - The value (controlled).
 * @param {Object} [props.rest] - Passed to the root.
 */
const NumericKeypad =
({
    className ,
    decimals     = 0 ,
    defaultValue = null ,
    disabled     = false ,
    label ,
    layout       = PHONE ,
    max ,
    min          = 0 ,
    onChange ,
    onLimit ,
    onSubmit ,
    path         = 'components.input.keypad' ,
    placeholder ,
    repeat         = false ,
    repeatDelay    = PRESS_REPEAT_DELAY ,
    repeatInterval = PRESS_REPEAT_INTERVAL ,
    showStepper  = true ,
    size         = MD ,
    step         = 1 ,
    submitLabel ,
    unit ,
    value : valueFromProps ,

    ...rest
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const { locale } = useNumberFormat() ;

    const labelId = useId() ;
    const rootRef = useRef( null ) ;

    const [ value , setValue ] = useValue( defaultValue , valueFromProps , onChange ) ;

    // What is typed so far : `12.` and `0.50` are no numbers yet, so the text is kept beside the value.
    const [ typed , setTyped ] = useState( () => toKeypadText( value , decimals ) ) ;

    // A value set from outside wins over what was typed.
    const text = parseKeypadText( typed ) === ( value ?? null ) ? typed : toKeypadText( value , decimals ) ;

    const options = { decimals , max , min , step } ;

    const repeatOptions = { delay : repeatDelay , enabled : repeat , interval : repeatInterval } ;

    const press = key =>
    {
        if ( disabled )
        {
            return false ;
        }

        const next = applyKeypadKey( text , key , options ) ;

        if ( next.refused )
        {
            onLimit?.( next.refused ) ;
            return false ;
        }

        if ( key === KEYPAD_KEYS.SUBMIT )
        {
            if ( next.value !== null )
            {
                onSubmit?.( next.value ) ;
            }
            return true ;
        }

        setTyped( next.text ) ;

        if ( next.value !== ( value ?? null ) )
        {
            setValue( next.value ) ;
        }

        return true ;
    } ;

    const decrease = usePressRepeat( () => press( KEYPAD_KEYS.DECREMENT ) , repeatOptions ) ;
    const increase = usePressRepeat( () => press( KEYPAD_KEYS.INCREMENT ) , repeatOptions ) ;

    const onKeyDown = event =>
    {
        const key = keypadKeyFromEvent( event ) ;

        if ( !key || disabled )
        {
            return ;
        }

        if ( ( key === KEYPAD_KEYS.INCREMENT || key === KEYPAD_KEYS.DECREMENT ) && !showStepper )
        {
            return ;
        }

        // Escape on an empty keypad belongs to the sheet or window around it.
        if ( event.key === 'Escape' && text === '' )
        {
            return ;
        }

        if ( key === KEYPAD_KEYS.SUBMIT && !onSubmit )
        {
            event.preventDefault() ;
            return ;
        }

        event.preventDefault() ;
        event.stopPropagation() ;
        press( key ) ;
    } ;

    // The keys keep the focus on the keypad, so the physical keyboard goes on working after a tap.
    const keepFocus = event =>
    {
        event.preventDefault() ;
        rootRef.current?.focus( { preventScroll : true } ) ;
    } ;

    const keyClassName = ( extra ) => cn
    (
        getButtonClassNames( { style : SOFT } ) ,
        'w-full font-semibold tabular-nums' ,
        keySizeMap[ size ] ?? keySizeMap[ MD ] ,
        extra ,
    ) ;

    const iconClassName = iconSizeMap[ size ] ?? iconSizeMap[ MD ] ;

    // A function, not a component : a component declared here would be a new type on every render.
    const renderKey = ( keyName , content , name , extra ) => (
        <button
            aria-label  = { name }
            className   = { keyClassName( extra ) }
            disabled    = { disabled }
            key         = { keyName }
            onClick     = { () => press( keyName ) }
            onMouseDown = { keepFocus }
            tabIndex    = { -1 }
            title       = { name }
            type        = "button"
        >
            { content }
        </button>
    ) ;

    const clearKey = renderKey( KEYPAD_KEYS.CLEAR , 'C' , labels.clear ) ;

    const shown = formatKeypadText( text , locale ) ;

    return (
        // biome-ignore lint/a11y/useSemanticElements: a fieldset would bring a form's semantics to a keypad that submits nothing.
        <div
            aria-disabled   = { disabled || undefined }
            aria-label      = { label ? undefined : labels.label }
            aria-labelledby = { label ? labelId : undefined }
            className       = { cn( 'flex w-full max-w-sm flex-col gap-2 rounded-box outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary' , className ) }
            onKeyDown       = { onKeyDown }
            ref             = { rootRef }
            role            = "group"
            tabIndex        = { disabled ? -1 : 0 }
            { ...rest }
        >
            { label && (
                <span className="text-sm font-medium" id={ labelId }>{ label }</span>
            ) }

            <div className="flex items-stretch gap-2">
                { showStepper && (
                    <button
                        aria-label  = { labels.decrease }
                        className   = { cn( getButtonClassNames( { style : OUTLINE } ) , 'shrink-0 select-none touch-manipulation' , stepperSizeMap[ size ] ?? stepperSizeMap[ MD ] ) }
                        disabled    = { disabled }
                        onMouseDown = { keepFocus }
                        tabIndex    = { -1 }
                        title       = { labels.decrease }
                        type        = "button"
                        { ...decrease }
                    >
                        <MdRemove aria-hidden="true" className={ iconClassName } />
                    </button>
                ) }

                <output
                    aria-atomic = "true"
                    className   = { cn(
                        'flex min-w-0 flex-1 items-baseline justify-end gap-2 rounded-field bg-base-200 px-3 py-2 font-semibold tabular-nums' ,
                        displaySizeMap[ size ] ?? displaySizeMap[ MD ] ,
                        disabled && 'opacity-50'
                    ) }
                >
                    <span className={ cn( 'truncate' , !shown && 'text-base-content/40' ) }>
                        { shown || placeholder }
                    </span>
                    { unit && (
                        <span className={ cn( 'shrink-0 font-normal text-base-content/60' , unitSizeMap[ size ] ?? unitSizeMap[ MD ] ) }>
                            { unit }
                        </span>
                    ) }
                </output>

                { showStepper && (
                    <button
                        aria-label  = { labels.increase }
                        className   = { cn( getButtonClassNames( { style : OUTLINE } ) , 'shrink-0 select-none touch-manipulation' , stepperSizeMap[ size ] ?? stepperSizeMap[ MD ] ) }
                        disabled    = { disabled }
                        onMouseDown = { keepFocus }
                        tabIndex    = { -1 }
                        title       = { labels.increase }
                        type        = "button"
                        { ...increase }
                    >
                        <MdAdd aria-hidden="true" className={ iconClassName } />
                    </button>
                ) }
            </div>

            <div className="grid grid-cols-3 gap-2">
                { ( ROWS[ layout ] ?? ROWS[ PHONE ] ).flat().map( digit => renderKey( digit , digit ) ) }

                { decimals > 0 ? renderKey( KEYPAD_KEYS.DECIMAL , getDecimalSeparator( locale ) ) : clearKey }

                { renderKey( '0' , '0' ) }

                { renderKey( KEYPAD_KEYS.BACKSPACE , <MdBackspace aria-hidden="true" className={ iconClassName } /> , labels.backspace ) }
            </div>

            { ( decimals > 0 || onSubmit ) && (
                <div className="grid grid-cols-3 gap-2">
                    { decimals > 0 && clearKey }
                    { onSubmit && (
                        <button
                            className   = { cn(
                                getButtonClassNames( { color : 'primary' } ) ,
                                'w-full' ,
                                keySizeMap[ size ] ?? keySizeMap[ MD ] ,
                                decimals > 0 ? 'col-span-2' : 'col-span-3'
                            ) }
                            disabled    = { disabled || text === '' }
                            onClick     = { () => press( KEYPAD_KEYS.SUBMIT ) }
                            onMouseDown = { keepFocus }
                            type        = "button"
                        >
                            { submitLabel ?? labels.submit }
                        </button>
                    ) }
                </div>
            ) }
        </div>
    ) ;
} ;

NumericKeypad.displayName = 'NumericKeypad' ;

export default NumericKeypad ;
