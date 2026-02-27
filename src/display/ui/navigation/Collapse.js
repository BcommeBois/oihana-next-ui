/**
 * Collapse component for nested navigation menus.
 *
 * @module display/ui/navigation/Collapse
 */

import Menu from './Menu' ;

/**
 * Renders a collapsible navigation group with nested items.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names for the inner menu.
 * @param {React.ComponentType<{ size?: number }>} [props.Icon] - Icon component.
 * @param {number} [props.iconSize=20] - Icon size in pixels.
 * @param {Object[]} [props.items] - Nested navigation items.
 * @param {string} [props.label] - Collapse header text.
 * @param {Function} [props.onAction] - Callback propagated to child items.
 *
 * @returns {React.ReactElement}
 */
const Collapse =
({
     className ,
     Icon ,
     iconSize = 20 ,
     items ,
     label ,
     onAction ,
 }) =>
    (
        <li>
            <details open>
                <summary>
                    { Icon && <Icon size={ iconSize } /> }
                    { label }
                </summary>
                <Menu
                    className = { className }
                    items     = { items }
                    onAction  = { onAction }
                />
            </details>
        </li>
    ) ;

export default Collapse ;