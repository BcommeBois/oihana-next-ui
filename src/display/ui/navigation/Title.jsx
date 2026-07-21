/**
 * Title component for navigation menus.
 *
 * Renders a non-interactive section heading using the DaisyUI
 * `menu-title` class, so a data-driven menu can group its items under
 * labelled sections.
 *
 * @module display/ui/navigation/Title
 *
 * @example
 * ```js
 * // In navigation config:
 * { type: TITLE , label: 'Settings' }
 * { type: TITLE , id: 'section.account' , Icon: AccountIcon }
 * ```
 */

import cn from '../../../themes/helpers/cn' ;

/**
 * Renders a section title inside a navigation menu.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names.
 * @param {React.ComponentType<{ size?: number }>} [props.Icon] - Optional icon component.
 * @param {number} [props.iconSize=16] - Icon size in pixels.
 * @param {string} [props.label] - Section heading text.
 *
 * @returns {React.ReactElement}
 */
const NavigationTitle =
({
    className ,
    Icon ,
    iconSize = 16 ,
    label ,
}) =>
(
    <li className={ cn( 'menu-title' , className ) }>
        { Icon
            ? (
                <span className="flex flex-row items-center gap-2">
                    <Icon size={ iconSize } />
                    { label }
                </span>
            )
            : label
        }
    </li>
) ;

export default NavigationTitle ;
