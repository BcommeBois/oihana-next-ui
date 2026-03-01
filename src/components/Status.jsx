'use client' ;

import cn from '../themes/helpers/cn' ;

import getStatusClasses from '../themes/components/status' ;

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
 * ```
 */

/**
 * @param {Object} props
 * @param {'bounce'|'ping'|'pulse'|'spin'} [props.animate] - Animation type
 * @param {string} [props.ariaLabel] - Accessibility label (defaults to color or 'status')
 * @param {React.ElementType} [props.as='div'] - HTML element type
 * @param {boolean} [props.bounce=false] - Apply bounce animation
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.color] - Status color: 'primary', 'secondary', 'success', 'error', etc.
 * @param {string} [props.label] - Label text
 * @param {string} [props.labelClassName] - Additional classes for label
 * @param {'left'|'right'} [props.labelPosition='right'] - Label position
 * @param {boolean} [props.ping=false] - Apply ping animation (requires wrapper)
 * @param {string} [props.size='md'] - Size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} [props.statusClassName] - Additional classes for status element
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
    ping = false ,
    size = 'md' ,
    statusClassName ,

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

    // --------- Status classes

    const statusClasses = getStatusClasses({
        color ,
        size ,
        className : cn( animationClass , statusClassName ) ,
    }) ;

    // --------- Aria label

    const effectiveAriaLabel = ariaLabel || color || 'status' ;

    // --------- Label element

    const labelElement = label && (
        <span className={ cn( 'text-sm' , labelClassName ) }>
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
                    />
                    <div
                        aria-hidden = "true"
                        className   = { getStatusClasses({ color , size }) }
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
            { ...rest }
        />
    ) ;
} ;

Status.displayName = 'Status' ;

export default Status ;