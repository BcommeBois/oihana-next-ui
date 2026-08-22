'use client' ;

import {
    getBarListBar ,
    getBarListLabelClasses ,
    getBarListRowClasses ,
    getBarListTrackClasses ,
    getBarListValueClasses ,
} from '../../themes/components/barList' ;

import Link from '../links/Link' ;

/**
 * One row of a {@link module:components/metrics/BarList} : a tinted bar whose width
 * carries the value, the name on top of it, and the formatted value in its own column.
 *
 * **One interactive element per row, at most.** A link nested inside a button is invalid
 * HTML and unreachable by keyboard in a predictable order, so `href` wins : the row
 * becomes a link, and `onSelect` still fires on the way out. Without `href`, `onSelect`
 * makes the row a button, and a row with neither stays an inert `div`.
 *
 * The value cell is deliberately left out of the interactive element, exactly as the bar
 * width is measured on the label column alone : the numbers form a column of their own
 * that the bars never run under.
 *
 * @module components/metrics/BarListRow
 *
 * @param {Object} props
 * @param {boolean} [props.animated=false] - Ease the bar to its new width on value changes.
 * @param {string} [props.barClassName] - Additional classes on the bar.
 * @param {string} [props.className] - Additional classes on the row.
 * @param {string} [props.color] - Bar colour : a DaisyUI token, or any CSS colour.
 * @param {boolean} [props.external=false] - Open `href` in a new tab through a plain anchor rather than a `Link`.
 * @param {boolean} [props.fade=false] - Fade the whole row in alongside the bar, rather than growing the bar alone.
 * @param {string} [props.href] - Destination. Turns the row into a link.
 * @param {React.ReactNode} [props.icon] - Decorative node shown before the name.
 * @param {string} [props.labelClassName] - Additional classes on the label.
 * @param {string} props.name - The row label.
 * @param {Function} [props.onSelect] - Click handler. Turns the row into a button when there is no `href`.
 * @param {React.Ref} [props.ref] - Forwarded to the row.
 * @param {boolean} [props.reveal=false] - The bar is growing in : keep the transition even without `animated`.
 * @param {number} [props.revealDelay] - Milliseconds this bar waits before it starts growing.
 * @param {import('../../themes/components/barList').BarListSize|Object} [props.size='md'] - Row height, scalar or per breakpoint.
 * @param {boolean} [props.still=false] - The bar is being pinned back to nothing : it must not transition.
 * @param {React.ReactNode} [props.value] - The formatted value.
 * @param {string} [props.valueClassName] - Additional classes on the value cell.
 * @param {number} [props.width=0] - Bar width, as a percentage of the track.
 */
const BarListRow =
({
    animated = false ,
    barClassName ,
    className ,
    color ,
    external = false ,
    fade = false ,
    href ,
    icon ,
    labelClassName ,
    name ,
    onSelect ,
    ref ,
    reveal = false ,
    revealDelay ,
    size ,
    still = false ,
    value ,
    valueClassName ,
    width = 0 ,
    ...rest
}) =>
{
    const interactive = !!href || !!onSelect ;

    const { className : barClasses , style } = getBarListBar({
        animated ,
        className : barClassName ,
        color ,
        interactive ,
        reveal ,
        still ,
    }) ;

    const trackProps =
    {
        className : getBarListTrackClasses({ interactive }) ,
        ...!!onSelect && { onClick : onSelect } ,
    } ;

    const content = (
        <>
            <span
                aria-hidden = "true"
                className   = { barClasses }
                style       =
                {{
                    ...style ,
                    width : `${ width }%` ,
                    // Inline rather than a `delay-*` class : built from an index, it would
                    // never appear literally in a source file and Tailwind would not emit it.
                    ...revealDelay ? { transitionDelay : `${ revealDelay }ms` } : null ,
                }}
            />

            <span className={ getBarListLabelClasses({ className : labelClassName }) }>
                { icon ? <span aria-hidden="true" className="flex shrink-0 items-center">{ icon }</span> : null }
                <span className="truncate">{ name }</span>
            </span>
        </>
    ) ;

    let track ;

    if ( href && external )
    {
        track = <a href={ href } rel="noreferrer" target="_blank" { ...trackProps }>{ content }</a> ;
    }
    else if ( href )
    {
        track = <Link href={ href } { ...trackProps }>{ content }</Link> ;
    }
    else if ( onSelect )
    {
        track = <button type="button" { ...trackProps }>{ content }</button> ;
    }
    else
    {
        track = <div { ...trackProps }>{ content }</div> ;
    }

    const rowClasses = getBarListRowClasses({
        className ,
        reveal : fade && reveal ,
        size ,
        still  : fade && still ,
    }) ;

    // The row leaves at the same moment as its own bar, so the two read as one arrival.
    const rowStyle = fade && revealDelay
        ? { ...rest.style , transitionDelay : `${ revealDelay }ms` }
        : rest.style ;

    return (
        <li className={ rowClasses } ref={ ref } { ...rest } style={ rowStyle }>
            { track }
            <span className={ getBarListValueClasses({ className : valueClassName }) }>{ value }</span>
        </li>
    ) ;
} ;

BarListRow.displayName = 'BarListRow' ;

export default BarListRow ;
