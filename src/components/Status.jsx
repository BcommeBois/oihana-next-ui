'use client' ;

import cn from '../themes/helpers/cn' ;

import getStatusClasses , { colors , getStatusLabelClass } from '../themes/components/status' ;

/**
 * Status component for DaisyUI 5.
 * A small visual indicator to show the current status of an element.
 *
 * @module components/Status
 * @see https://daisyui.com/components/status
 *
 * @example
 * ```jsx
 * // Simple status
 * <Status color="success" />
 *
 * // With label
 * <Status color="error" label="Offline" />
 *
 * // With ping animation
 * <Status color="error" ping label="Server is down" />
 *
 * // With bounce animation
 * <Status color="info" bounce label="Unread messages" />
 *
 * // Custom size
 * <Status color="primary" size="xl" />
 *
 * // Label on left
 * <Status color="success" label="Online" labelPosition="left" />
 *
 * // Any CSS colour, for a mark whose colour is DATA
 * <Status color={ role.color } label={ role.label } labelSize="xs" size="md" />
 * ```
 */

/**
 * ### 🔑 A colour from the palette, or a colour from a record
 *
 * `color` takes one of the eight daisyUI names — and then daisyUI paints the
 * mark — or **any CSS colour**, which is painted inline instead. Gathered from
 * two hand-written copies of this component in one application, both of which
 * said in their own doc comment that they existed only because the colour came
 * from an API and this component would not take it.
 *
 * ⚠️ **A free colour is not an accessible name.** When the colour is a palette
 * name it stands in for the missing `ariaLabel`, as it always has ; a hex
 * string never does, and the mark falls back to `'status'`.
 *
 * ⚠️ **The mark's scale is not the label's scale.** `size` drives the mark
 * (two pixels at `xs`, sixteen at `xl`) and `labelSize` the text beside it,
 * which is left at `text-sm` unless asked — passing `labelSize={ size }` is
 * what a caller wanting the two to move together writes.
 */

/**
 * @param {Object} props
 * @param {'bounce'|'ping'|'pulse'|'spin'} [props.animate] - Animation type
 * @param {string} [props.ariaLabel] - Accessibility label (defaults to color or 'status')
 * @param {React.ElementType} [props.as='div'] - HTML element type
 * @param {boolean} [props.bounce=false] - Apply bounce animation
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.color] - One of the eight daisyUI names, or any CSS colour.
 * @param {string} [props.label] - Label text
 * @param {string} [props.labelClassName] - Additional classes for label
 * @param {'left'|'right'} [props.labelPosition='right'] - Label position
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.labelSize] - Make the label follow a size. Left out, it reads at `text-sm`.
 * @param {boolean} [props.ping=false] - Apply ping animation (requires wrapper)
 * @param {string} [props.size='md'] - Size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} [props.statusClassName] - Additional classes for status element
 * @param {Object} [props.style] - Inline styles for the mark, merged over the free colour.
 */
const Status =
({
    animate ,
    ariaLabel ,
    as ,
    bounce = false ,
    className ,
    color ,
    label ,
    labelClassName ,
    labelPosition = 'right' ,
    labelSize ,
    ping = false ,
    size = 'md' ,
    statusClassName ,
    style ,

    ...rest
}) =>
{
    const Component = as ?? 'div' ;

    // --------- Determine animation class

    let animationClass = '' ;

    if ( animate )
    {
        animationClass = `animate-${ animate }` ;
    }
    else if ( bounce )
    {
        animationClass = 'animate-bounce' ;
    }
    else if ( ping )
    {
        animationClass = 'animate-ping' ;
    }

    // --------- Palette colour, or a colour of its own

    const free = Boolean( color ) && !colors.includes( color ) ;

    const freeStyle = free ? { backgroundColor : color , ...style } : style ;

    // --------- Status classes

    const statusClasses = getStatusClasses({
        color : free ? undefined : color ,
        size ,
        className : cn( animationClass , statusClassName ) ,
    }) ;

    // --------- Aria label

    const effectiveAriaLabel = ariaLabel || ( free ? 'status' : color ) || 'status' ;

    // --------- Label element

    const labelElement = label && (
        <span className={ cn( getStatusLabelClass( labelSize ) ?? 'text-sm' , labelClassName ) }>
            { label }
        </span>
    ) ;

    // --------- Ping wrapper (special case)

    if ( ping && label )
    {
        return (
            <Component className={ cn( 'inline-flex items-center gap-2' , className ) } { ...rest }>
                { labelPosition === 'left' && labelElement }

                <div className="inline-grid *:[grid-area:1/1]">
                    <div
                        aria-label = { effectiveAriaLabel }
                        className  = { statusClasses }
                        style      = { freeStyle }
                    />
                    <div
                        aria-hidden = "true"
                        className   = { getStatusClasses({ color : free ? undefined : color , size }) }
                        style       = { freeStyle }
                    />
                </div>

                { labelPosition === 'right' && labelElement }
            </Component>
        ) ;
    }

    // --------- Standard status (with or without label)

    if ( label )
    {
        return (
            <Component className={ cn( 'inline-flex items-center gap-2' , className ) } { ...rest }>
                { labelPosition === 'left' && labelElement }

                <div
                    aria-label = { effectiveAriaLabel }
                    className  = { statusClasses }
                    style      = { freeStyle }
                />

                { labelPosition === 'right' && labelElement }
            </Component>
        ) ;
    }

    // --------- Status only (no label)

    return (
        <Component
            aria-label = { effectiveAriaLabel }
            className  = { cn( statusClasses , className ) }
            style      = { freeStyle }
            { ...rest }
        />
    ) ;
} ;

Status.displayName = 'Status' ;

export default Status ;