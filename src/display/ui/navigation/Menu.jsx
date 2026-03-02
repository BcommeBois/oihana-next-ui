/**
 * Menu component for rendering navigation items.
 *
 * @module display/ui/navigation/Menu
 */

import components from './Items' ;

/**
 * Renders a list of navigation items.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names.
 * @param {Object[]} [props.items] - Navigation item definitions.
 * @param {Function} [props.onAction] - Callback propagated to child items.
 *
 * @returns {React.ReactElement}
 */
const Menu =
({
     className ,
     items ,
     onAction ,
 }) =>
{
    const content = Array.isArray( items ) && items.length > 0
        ? items.reduce( ( list , item , index ) =>
            {
                const { type , ...props } = item || {} ;
                const Component = components[ type ] ;

                if ( Component )
                {
                    list.push
                    (
                        <Component
                            key      = { props.id || `item-${ index }` }
                            onAction = { onAction }
                            { ...props }
                        />
                    ) ;
                }

                return list ;
            }
            , [] )
        : null ;

    return (
        <ul className={ className }>
            { content }
        </ul>
    ) ;
} ;

export default Menu ;