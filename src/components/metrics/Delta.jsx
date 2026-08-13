'use client' ;

import { use , useMemo } from 'react' ;

import { TbArrowDownRight as DownIcon , TbMinus as FlatIcon , TbArrowUpRight as UpIcon } from 'react-icons/tb' ;

import LangContext from '../../contexts/lang/context' ;

import { getDeltaColor , getDeltaTextClasses } from '../../themes/components/delta' ;

import Badge from '../Badge' ;

/**
 * Language used to format numbers when no provider and no `locale` prop say otherwise.
 *
 * A fixed value rather than the runtime default : left to resolve on its own, the server
 * and the browser can disagree on the decimal separator, which hydrates as a mismatch.
 *
 * @type {string}
 */
const DEFAULT_LOCALE = 'en' ;

/**
 * Shown in place of a value that is not there yet.
 * @type {string}
 */
const PLACEHOLDER = '—' ;

const ICONS =
{
    down : DownIcon ,
    flat : FlatIcon ,
    up   : UpIcon ,
} ;

/**
 * Works out the change from a pair of measurements.
 *
 * The denominator is the **absolute** starting value, so a metric climbing back from a
 * negative baseline does not come out falling.
 *
 * @param {number} from - The earlier measurement.
 * @param {number} to - The later one.
 * @param {string} format - `'percent'` for a ratio, `'number'` for a difference.
 * @returns {number | null} The change, or `null` when a ratio has no meaning.
 */
const getChange = ( from , to , format ) =>
{
    if ( format !== 'percent' )
    {
        return to - from ;
    }

    // Growth from nothing has no ratio — anything over zero is infinite. Reporting it as
    // unavailable is honest ; reporting it as +100 % would not be.
    if ( from === 0 )
    {
        return to === 0 ? 0 : null ;
    }

    return ( to - from ) / Math.abs( from ) ;
} ;

/**
 * A change, with its direction and a verdict on it.
 *
 * **A variation carries two things, and the whole point is not to confuse them.** The
 * *direction* is a fact — the number went up or down — and the arrow states it. The
 * *judgement* depends on the metric, and the colour states that. More visitors is good
 * news ; more errors, more churn, more latency, more cost is not.
 *
 * That is what `inverted` is for, and its rule is worth stating plainly : **it swaps the
 * colours, never the arrow.** An error rate that fell shows a downward arrow, in green.
 *
 * **Numbers are formatted in the reader's language**, taken from the surrounding
 * `LangProvider` — which resolves it server-side from a cookie, so the formatting is
 * settled before hydration rather than after it. `locale` overrides it, and
 * `valueFormatter` replaces the whole thing.
 *
 * @module components/metrics/Delta
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Text alternative, for a change that needs its context spelled out.
 * @param {string} [props.className] - Additional classes.
 * @param {import('../../themes/components/delta').DeltaFormat} [props.format='percent'] - `'percent'` reads `value` as a ratio ; `'number'` reads it as it is.
 * @param {number} [props.from] - Earlier measurement. With `to`, the change is worked out for you.
 * @param {React.ReactNode} [props.icon] - Replaces the direction icon.
 * @param {boolean} [props.inverted=false] - Falling is the good news — an error rate, a churn, a cost.
 * @param {string} [props.locale] - BCP 47 tag overriding the language of the surrounding provider.
 * @param {number} [props.neutralThreshold=0] - A change no larger than this counts as no change.
 * @param {React.Ref} [props.ref] - Forwarded to the root.
 * @param {boolean} [props.showIcon=true] - Draw the direction icon.
 * @param {import('../../themes/components/badge').BadgeSize} [props.size] - Size, on the badge variant.
 * @param {import('../../themes/components/badge').BadgeStyle} [props.style='soft'] - Badge style, on the badge variant.
 * @param {number} [props.to] - Later measurement, paired with `from`.
 * @param {number} [props.value] - The change itself. A ratio under `format="percent"`. Wins over `from` / `to`.
 * @param {Function} [props.valueFormatter] - Formats the change : `( value , direction ) => string`.
 * @param {import('../../themes/components/delta').DeltaVariant} [props.variant='badge'] - `'badge'` or bare `'text'`.
 *
 * @example A rise, as a badge
 * ```jsx
 * <Delta value={ 0.124 } />   // → « +12,4 % » in green
 * ```
 *
 * @example An error rate : falling is the good news
 * ```jsx
 * <Delta value={ -0.08 } inverted />   // → « −8 % », downward arrow, in green
 * ```
 *
 * @example Worked out from two measurements, under a number
 * ```jsx
 * <Stat
 *     title       = "Visiteurs"
 *     value       = "12 480"
 *     description = { <Delta from={ 11 100 } to={ 12 480 } variant="text" /> }
 * />
 * ```
 *
 * @example Noise is not a trend
 * ```jsx
 * <Delta value={ 0.002 } neutralThreshold={ 0.005 } />   // → neutral, flat indicator
 * ```
 */
const Delta =
({
    ariaLabel ,
    className ,
    format = 'percent' ,
    from ,
    icon ,
    inverted = false ,
    locale ,
    neutralThreshold = 0 ,
    ref ,
    showIcon = true ,
    size ,
    style = 'soft' ,
    to ,
    value ,
    valueFormatter ,
    variant = 'badge' ,
    ...rest
}) =>
{
    // Read defensively rather than through `useLang`, which throws : a component of a
    // published library has no business requiring the host to have wrapped it in a
    // provider just to print a number.
    const context = use( LangContext ) ;

    const language = locale ?? context?.lang ?? DEFAULT_LOCALE ;

    const change = Number.isFinite( value )
        ? value
        : Number.isFinite( from ) && Number.isFinite( to )
            ? getChange( from , to , format )
            : null ;

    const formatter = useMemo( () => new Intl.NumberFormat( language , {
        maximumFractionDigits : 1 ,
        signDisplay           : 'exceptZero' ,
        style                 : format === 'percent' ? 'percent' : 'decimal' ,
    } ) , [ format , language ] ) ;

    const direction = change === null || Math.abs( change ) <= neutralThreshold
        ? 'flat'
        : change > 0 ? 'up' : 'down' ;

    const color = getDeltaColor( { direction , inverted , variant } ) ;

    const Icon = ICONS[ direction ] ;

    // The sign lives in the text, never in the icon alone : an arrow is invisible to a
    // screen reader, and a change read out without its direction is worse than no change
    // at all.
    const label = change === null
        ? PLACEHOLDER
        : valueFormatter
            ? valueFormatter( change , direction )
            : formatter.format( change ) ;

    // A richer label goes in beside the number rather than on the root through
    // `aria-label`, which a plain `span` does not expose : nothing here carries a role
    // that could hold a name, and inventing one — `role="img"` over a piece of text —
    // would be worse than the spare sentence a screen reader actually wants.
    const content = (
        <>
            { showIcon && change !== null ? (
                icon ?? <Icon aria-hidden="true" className="shrink-0" />
            ) : null }

            { ariaLabel ? <span className="sr-only">{ ariaLabel }</span> : null }

            <span aria-hidden={ ariaLabel ? 'true' : undefined }>{ label }</span>
        </>
    ) ;

    if ( variant === 'text' )
    {
        return (
            <span className={ getDeltaTextClasses( { className , color } ) } ref={ ref } { ...rest }>
                { content }
            </span>
        ) ;
    }

    return (
        <Badge
            as        = "span"
            className = { className }
            color     = { color }
            ref       = { ref }
            size      = { size }
            style     = { style }
            { ...rest }
        >
            { content }
        </Badge>
    ) ;
} ;

Delta.displayName = 'Delta' ;

export default Delta ;
