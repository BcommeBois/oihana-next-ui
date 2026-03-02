/**
 * Base button for input controls (increment/decrement, clear, etc.).
 *
 * @module components/buttons/InputButton
 *
 * @example
 * ```jsx
 * import { MdAdd } from 'react-icons/md' ;
 *
 * // Default (ghost, square, join)
 * <InputButton icon={MdAdd} />
 *
 * // Custom color
 * <InputButton icon={MdRemove} color="error" />
 * ```
 */

import Button from '../Button'

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Root element type.
 * @param {boolean} [props.join=true] - DaisyUI join-item modifier.
 * @param {import('../../themes/components/button').ButtonShape} [props.shape='square'] - Button shape.
 * @param {import('../../themes/components/button').ButtonStyle} [props.style='ghost'] - Button style.
 * @param {*} [props.rest] - Additional Button props.
 */
const InputButton =
({
     color ,
     join  = true ,
     shape = 'square' ,
     style = 'ghost' ,
     ...rest
 }) =>
    (
        <Button
            color = { color }
            join  = { join }
            shape = { shape }
            style = { style }
            { ...rest }
        />
    ) ;

export default InputButton ;