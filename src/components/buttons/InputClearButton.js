/**
 * Clear button styled for input groups (join, square, ghost).
 *
 * @module components/buttons/InputClearButton
 *
 * @example
 * ```jsx
 * // In a join group
 * <div className="join">
 *     <input className="input join-item" />
 *     <InputClearButton onClick={handleClear} />
 * </div>
 * ```
 */

import ClearButton from './ClearButton' ;

/**
 * @param {Object} props
 * @param {*} [props.rest] - Additional ClearButton props.
 */
const InputClearButton =
({
     join  = true ,
     style = 'ghost' ,
     ...rest
 }) =>
    (
        <ClearButton
            join  = { join }
            style = { style }
            { ...rest }
        />
    ) ;

export default InputClearButton ;