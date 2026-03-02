/**
 * Navigation component for the sidebar.
 *
 * @module display/ui/navigation/Navigation
 */

import cn from '../../themes/helpers/cn' ;

import useNavigation from '../../contexts/navigation' ;

import Menu from './navigation/Menu' ;

/**
 * Renders the sidebar navigation.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names.
 * @param {Function} [props.onAction] - Callback propagated to menu items.
 *
 * @returns {React.ReactElement}
 */
const Navigation =
({
     className ,
     onAction ,
 }) =>
(
    <div className={ cn( 'flex flex-1 flex-col w-full text-base-content' , className ) }>
        <Menu
            className = "menu w-full gap-2"
            items     = { useNavigation().navigation }
            onAction  = { onAction }
        />
    </div>
) ;

export default Navigation ;