/**
 * Pre-configured "more/plus" button for numeric inputs.
 *
 * @module components/buttons/MoreButton
 *
 * @example
 * ```jsx
 * // Default
 * <MoreButton />
 *
 * // With onClick
 * <MoreButton onClick={() => setValue( v => v + 1 )} />
 *
 * // Custom icon
 * <MoreButton icon={MdAddCircle} />
 *
 * // Custom color
 * <MoreButton color="success" />
 * ```
 */

import { MdAdd } from 'react-icons/md' ;

import InputButton from './InputButton' ;

/**
 * @param {Object} props
 * @param {Function} [props.icon] - Icon component.
 * @param {string} [props.path] - i18n path.
 * @param {*} [props.rest] - Additional InputButton props.
 */
const MoreButton =
({
     icon = MdAdd ,
     path = 'components.buttons.more' ,
     ...rest
 }) =>
(
    <InputButton
        icon = { icon }
        path = { path }
        { ...rest }
    />
) ;

export default MoreButton ;