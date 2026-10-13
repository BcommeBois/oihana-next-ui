'use client' ;

import useRatingLabels  from '../../hooks/useRatingLabels' ;
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
 * @param {string} [props.ariaLabel] - What is rated (« Quality »). Names the group of buttons.
 * @param {Function} [props.itemLabel] - `( value , count ) => string`, the name of one button. Defaults to « 3 out of 5 » from the i18n `item` key read at `path`.
 * @param {string} [props.path='components.rating'] - i18n path the labels are read from.
 * @param {string} [props.name] - Sends the rating with a `<form>`, under this name : the chosen value, `0` when cleared — through a hidden input, as `Rating` does with its radios. Read-only, it is sent too ; disabled, it is not.
 * @param {number} [props.value] - Controlled value
 * @param {number} [props.defaultValue] - Default value for uncontrolled mode
 * @param {Function} [props.onChange] - Change handler (value) => void
 * @param {number} [props.count=5] - Number of buttons
 * @param {import('../../themes/components/button').ButtonShape} [props.shape='square'] - Button shape ('circle' or 'square')
 * @param {string} [props.size='sm'] - Button size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {import('../../themes/components/button').ButtonColorValue} [props.color] - Inactive button color. Without one, the inactive buttons are `ghost`.
 * @param {import('../../themes/components/button').ButtonColorValue} [props.activeColor='primary'] - Active button color
 * @param {import('../../themes/components/button').ButtonStyle} [props.style] - Inactive button style: 'ghost', 'outline', 'soft', etc. Defaults to `'ghost'` when no `color` is given, none otherwise.
 * @param {import('../../themes/components/button').ButtonStyle} [props.activeStyle] - Active button style. Mostly without effect : daisyUI fills a pressed button (`[aria-pressed=true]`) with its colour whatever its style — `ghost`, `outline` or `soft` alike. Pick content that reads on `activeColor` instead (an `activeIconColor` of `IconRating`, for one).
 * @param {boolean} [props.readOnly=false] - Read-only mode
 * @param {boolean} [props.allowClear=true] - Allow clearing by clicking active button
 * @param {string | number | import('../../themes/sizing/sizes').ResponsiveSize} [props.gap] - Gap between buttons
 * @param {string} [props.className] - Additional classes for container
 * @param {string} [props.buttonClassName] - Additional classes for buttons
 * @param {boolean} [props.disabled=false] - Disable all buttons
 * @param {Function} [props.itemContent] - Custom content renderer: (index, isActive) => ReactNode
 */
const NumberRating =
({
    ariaLabel,
    itemLabel,
    path,
    name,
    value: controlledValue,
    defaultValue,
    onChange,
    count = 5,
    shape = 'circle',
    size = 'sm',
    color,
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

    const labels = useRatingLabels({ ariaLabel , count , itemLabel , path }) ;

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
            style: isActive ? activeStyle : ( style ?? ( color ? undefined : 'ghost' ) ),
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
                className    = { btnClasses }
                onClick      = { () => handleClick( i ) }
                disabled     = { disabled }
                aria-label   = { labels.item( i ) }
                aria-pressed = { isActive }
            >
                { content }
            </button>
        ) ;
    }

    return (
        // biome-ignore lint/a11y/useSemanticElements: `<fieldset>` groups form controls and brings its own box model ; these are toggle buttons, and `role="group"` on a div is what WAI-ARIA defines for them — as in `SegmentedControl`.
        <div aria-label={ ariaLabel } className={ containerClasses } role="group">
            { buttons }
            { name && <input disabled={ disabled } name={ name } type="hidden" value={ currentValue } /> }
        </div>
    ) ;
} ;

NumberRating.displayName = 'NumberRating' ;

export default NumberRating ;