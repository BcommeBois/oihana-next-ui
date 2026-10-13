'use client' ;

import useRatingLabels from '../../hooks/useRatingLabels' ;
import useRatingValue  from '../../hooks/useRatingValue' ;

import getRatingClasses, { RATING_HIDDEN } from '../../themes/components/rating' ;

import getMaskClasses from '../../themes/components/mask' ;
import getGapX        from '../../themes/spacing/gapX' ;
import cn             from '../../themes/helpers/cn' ;

/**
 * Rating component for DaisyUI 5.
 *
 * @module components/Rating
 * @see https://daisyui.com/components/rating
 *
 * @example
 * ```jsx
 * // Simple rating
 * <Rating name="rating-1" />
 *
 * // Controlled with onChange
 * const [rating, setRating] = useState(3);
 * <Rating name="rating-2" value={rating} onChange={setRating} />
 *
 * // Half stars
 * <Rating name="rating-3" half size="lg" />
 *
 * // Custom shape and color
 * <Rating name="rating-4" shape="heart" color="error" />
 *
 * // Read-only
 * <Rating name="rating-5" value={4} readOnly />
 * ```
 */

/**
 * @param {Object} props
 * @param {string} [props.ariaLabel] - What is rated (« Quality »). Names the group, and the value when `readOnly`.
 * @param {string} [props.clearLabel] - Name of the hidden clear radio. Defaults to the i18n `clear` key read at `path`.
 * @param {Function} [props.itemLabel] - `( value , count ) => string`, the name of one item. Defaults to « 3 out of 5 » from the i18n `item` key, the value written in the language on screen.
 * @param {string} [props.path='components.rating'] - i18n path the labels are read from.
 * @param {string} props.name - Name for radio buttons (required, must be unique per rating) — also what the value is sent under with a `<form>` : the chosen value, `0` when cleared.
 * @param {number} [props.value] - Controlled value (0-count for full stars, 0-count*2 for half stars)
 * @param {number} [props.defaultValue] - Default value for uncontrolled mode
 * @param {Function} [props.onChange] - Change handler (value) => void
 * @param {number} [props.count=5] - Number of stars/items
 * @param {import('../../themes/components/rating').RatingSize | import('../../themes/components/rating').ResponsiveRatingSize} [props.size='md'] - Size: scalar ('xs'…'xl') or responsive object (e.g. `{ xs: 'sm', md: 'lg' }`)
 * @param {import('../../themes/components/mask').MaskShape} [props.shape='star-2'] - Mask shape
 * @param {import('../../themes/colors/backgroundColor').BackgroundColorValue} [props.color] - Background color
 * @param {boolean} [props.half=false] - Enable half-star ratings
 * @param {boolean} [props.readOnly=false] - Read-only mode : one image that says the value (« Rated 4 out of 5 »), the items hidden from screen readers. The value is still sent with a `<form>` under `name`, as a read-only field is.
 * @param {boolean} [props.allowClear=true] - Allow clearing the rating (adds hidden radio)
 * @param {string | number | import('../../themes/sizing/sizes').ResponsiveSize} [props.gap] - Gap between items (number or responsive object)
 * @param {string} [props.className] - Additional classes for container
 * @param {boolean} [props.disabled=false] - Disable all inputs
 */
const Rating =
({
    ariaLabel,
    clearLabel,
    itemLabel,
    path,
    name,
    value: controlledValue,
    defaultValue,
    onChange,
    count = 5,
    size = 'md',
    shape = 'star-2',
    color,
    half = false,
    readOnly = false,
    allowClear = true,
    gap= 0.5,
    className,
    disabled = false,
}) =>
{
    const { currentValue, handleChange } = useRatingValue({
        defaultValue ,
        controlledValue ,
        onChange ,
        readOnly ,
        disabled ,
    }) ;

    const labels = useRatingLabels({ ariaLabel , clearLabel , count , itemLabel , path }) ;

    const ratingClasses = getRatingClasses({
        size,
        half,
        className : cn
        (
            allowClear && !readOnly && 'relative',
            !half && gap && getGapX( gap ) ,
            disabled && 'opacity-60' ,
            className
        )
    }) ;

    // Generate rating items
    const items = [] ;
    const totalItems = half ? count * 2 : count ;

    // Hidden clear button (absolute, to avoid the gap on the left)
    if ( allowClear && !readOnly )
    {
        items.push(
            <input
                key="clear"
                type="radio"
                name       ={ name }
                className  = { cn( RATING_HIDDEN, 'absolute' ) }
                value      = { 0 }
                checked    = { currentValue === 0 }
                onChange   = { () => handleChange( 0 ) }
                disabled   = { disabled }
                aria-label = { labels.clear }
            />
        ) ;
    }

    // Rating items
    for ( let i = 1 ; i <= totalItems ; i++ )
    {
        const itemValue = half ? i * 0.5 : i ;
        const isChecked = currentValue === itemValue ;
        const isHalf2   = half && i % 2 === 0 ;

        const maskClasses = getMaskClasses({
            shape,
            color,
            half      : half ? ( i % 2 === 1 ? 'half-1' : 'half-2' ) : undefined,
            className : half && isHalf2 && gap ? getGapX( gap ) : undefined,
        }) ;

        if ( readOnly )
        {
            items.push(
                <div
                    key={ i }
                    className    ={ cn( maskClasses, isChecked && 'opacity-100', !isChecked && 'opacity-30' ) }
                    aria-hidden  = "true"
                />
            ) ;
        }
        else
        {
            items.push(
                <input
                    key        = { i }
                    type       = "radio"
                    name       = { name }
                    className  = { maskClasses }
                    value      = { itemValue }
                    checked    = { isChecked }
                    onChange   = { () => handleChange( itemValue ) }
                    disabled   = { disabled }
                    aria-label = { labels.item( itemValue ) }
                />
            ) ;
        }
    }

    // Read-only, the value is one picture read at once, not item by item.
    return readOnly
        ? (
            <div aria-label={ labels.value( currentValue ) } className={ ratingClasses } role="img">
                { items }
                { name && <input disabled={ disabled } name={ name } type="hidden" value={ currentValue } /> }
            </div>
        )
        : <div aria-label={ ariaLabel } className={ ratingClasses } role="radiogroup">{ items }</div> ;
} ;

Rating.displayName = 'Rating' ;

export default Rating ;