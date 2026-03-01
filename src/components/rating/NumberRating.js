'use client' ;

import useRatingValue   from '../../hooks/useRatingValue' ;
import getButtonClasses from '../../themes/components/button' ;
import getGapX          from '../../themes/spacing/gapX' ;
import cn               from '../../themes/helpers/cn' ;

/**
 * Number Rating component with DaisyUI buttons.
 *
 * @module components/NumberRating
 *
 * @example
 * ```jsx
 * // Simple number rating
 * <NumberRating name="rating-1" />
 *
 * // With custom count
 * <NumberRating name="rating-2" count={10} />
 *
 * // Circle buttons
 * <NumberRating name="rating-3" shape="circle" />
 *
 * // Custom colors
 * <NumberRating
 *     name="rating-4"
 *     color="neutral"
 *     activeColor="primary"
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {string} [props.name] - Name for buttons (optional)
 * @param {number} [props.value] - Controlled value
 * @param {number} [props.defaultValue] - Default value for uncontrolled mode
 * @param {Function} [props.onChange] - Change handler (value) => void
 * @param {number} [props.count=5] - Number of buttons
 * @param {import('@/themes/components/button').ButtonShape} [props.shape='square'] - Button shape ('circle' or 'square')
 * @param {string} [props.size='sm'] - Button size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} [props.color='ghost'] - Inactive button color
 * @param {string} [props.activeColor='primary'] - Active button color
 * @param {import('@/themes/components/button').ButtonStyle} [props.style] - Button style: 'ghost', 'outline', 'soft', etc.
 * @param {import('@/themes/components/button').ButtonStyle} [props.activeStyle] - Active button style
 * @param {boolean} [props.readOnly=false] - Read-only mode
 * @param {boolean} [props.allowClear=true] - Allow clearing by clicking active button
 * @param {string | number | import('@/themes/sizing/sizes').ResponsiveSize} [props.gap] - Gap between buttons
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.buttonClassName] - Additional classes for buttons
 * @param {boolean} [props.disabled=false] - Disable all buttons
 * @param {Function} [props.itemContent] - Custom content renderer: (index, isActive) => ReactNode
 */
const NumberRating =
({
    name,
    value: controlledValue,
    defaultValue,
    onChange,
    count = 5,
    shape = 'circle',
    size = 'sm',
    color = 'ghost',
    activeColor = 'primary',
    style,
    activeStyle,
    readOnly = false,
    allowClear = true,
    gap= 1,
    className,
    buttonClassName,
    disabled = false,
    itemContent,
}) =>
{
    const { currentValue, handleChange } = useRatingValue({
        defaultValue ,
        controlledValue ,
        onChange ,
        readOnly ,
        disabled ,
    }) ;

    const handleClick = index =>
    {
        if ( readOnly || disabled )
        {
            return ;
        }

        // Toggle if allowClear and clicking active button
        const newValue = ( allowClear && currentValue === index ) ? 0 : index ;

        handleChange( newValue ) ;
    } ;

    const containerClasses = cn(
        'flex flex-wrap',
        gap && getGapX( gap ),
        disabled && 'opacity-60',
        className
    ) ;

    // Generate buttons
    const buttons = [] ;

    for ( let i = 1 ; i <= count ; i++ )
    {
        const isActive = i === currentValue ;

        const btnClasses = getButtonClasses({
            shape,
            size,
            color: isActive ? activeColor : color,
            style: isActive ? activeStyle : style,
            active: isActive,
            disabled,
            className: cn(
                readOnly && 'pointer-events-none cursor-default',
                buttonClassName
            ),
        }) ;

        const content = itemContent
            ? itemContent( i, isActive )
            : i ;

        buttons.push(
            <button
                key          = { i }
                type         = "button"
                name         = { name }
                className    = { btnClasses }
                onClick      = { () => handleClick( i ) }
                disabled     = { disabled }
                aria-label   = { `${i} ${i === 1 ? 'star' : 'stars'}` }
                aria-pressed = { isActive }
            >
                { content }
            </button>
        ) ;
    }

    return (
        <div className={ containerClasses }>
            { buttons }
        </div>
    ) ;
} ;

NumberRating.displayName = 'NumberRating' ;

export default NumberRating ;