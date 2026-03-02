/**
 * Divider component for navigation menus.
 *
 * Wraps the generic Divider component with navigation-specific defaults.
 *
 * @module display/ui/navigation/Divider
 *
 * @example
 * ```js
 * // In navigation config:
 * { type: DIVIDER }
 * { type: DIVIDER , alignment: 'end' , label: 'Section' , color: 'primary' , className: 'py-4' }
 * ```
 */

import cn from '../../../themes/helpers/cn' ;

import Divider from '../../../components/Divider' ;

/**
 * Renders a divider inside a navigation menu.
 *
 * @param {Object} props
 * @param {import('../../../themes/components/divider').DividerAlignment} [props.alignment] - Content alignment.
 * @param {string} [props.className] - Additional class names.
 * @param {import('../../../themes/components/divider').DividerColorValue} [props.color] - Divider color.
 * @param {string} [props.label] - Divider text content.
 *
 * @returns {React.ReactElement}
 */
const NavigationDivider =
({
     alignment ,
     className ,
     color ,
     label ,
 }) =>
(
    <Divider
        alignment = { alignment }
        className = { cn( 'my-1 px-2' , className ) }
        color     = { color }
    >
        { label }
    </Divider>
) ;

export default NavigationDivider ;