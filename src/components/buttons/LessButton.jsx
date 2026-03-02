/**
 * Pre-configured "less/minus" button for numeric inputs.
 *
 * @module components/buttons/LessButton
 *
 * @example
 * ```jsx
 * // Default
 * <LessButton />
 *
 * // With onClick
 * <LessButton onClick={() => setValue( v => v - 1 )} />
 *
 * // Custom icon
 * <LessButton icon={MdMinimize} />
 *
 * // Custom color
 * <LessButton color="error" />
 * ```
 */

import { MdRemove } from 'react-icons/md' ;

import InputButton from './InputButton' ;

/**
 * @param {Object} props
 * @param {Function} [props.icon] - Icon component.
 * @param {string} [props.path] - i18n path.
 * @param {*} [props.rest] - Additional InputButton props.
 */
const LessButton =
({
     icon = MdRemove ,
     path = 'components.buttons.less' ,
     ...rest
 }) =>
(
    <InputButton
        icon = { icon }
        path = { path }
        { ...rest }
    />
) ;

export default LessButton ;