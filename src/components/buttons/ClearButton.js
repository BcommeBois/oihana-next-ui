/**
 * Pre-configured clear/close button.
 *
 * @module components/buttons/ClearButton
 *
 * @example
 * ```jsx
 * // Default
 * <ClearButton />
 *
 * // Custom color
 * <ClearButton color="error" />
 *
 * // With tooltip
 * <ClearButton tooltip="Clear selection" />
 * ```
 */

import { MdClose } from 'react-icons/md' ;

import Button from '../Button' ;

/**
 * @param {Object} props
 * @param {import('@/themes/components/button').ButtonColorValue} [props.color='secondary'] - Button color.
 * @param {Function} [props.icon] - Icon component.
 * @param {string} [props.path] - i18n path.
 * @param {import('@/themes/components/button').ButtonShape} [props.shape='circle'] - Button shape.
 * @param {import('@/themes/components/button').ButtonSize} [props.size='md'] - Button size.
 * @param {*} [props.rest] - Additional Button props.
 */
const ClearButton =
({
    color = 'secondary' ,
    icon  = MdClose ,
    path  = 'components.buttons.clear' ,
    shape = 'circle' ,
    size  = 'md' ,
    ...rest
}) =>
(
    <Button
        color = { color }
        icon  = { icon }
        path  = { path }
        shape = { shape }
        size  = { size }
        { ...rest }
    />
) ;

export default ClearButton ;