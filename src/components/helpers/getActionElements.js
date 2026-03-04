import cn from '../../themes/helpers/cn' ;

import styles from '../inputs/styles/InputActions.module.css' ;

/**
 * Renders action buttons for input/select components.
 *
 * @param {React.ReactNode|React.ReactNode[]} [actions] - Action button(s)
 * @param {boolean} [hasError=false] - Whether to apply error styling
 * @returns {React.ReactNode[]} Array of rendered action elements
 *
 * @example
 * ```js
 * const actionElements = getActionElements
 * (
 *     <button className="btn">Clear</button> ,
 *     hasError
 * ) ;
 * ```
 */
const getActionElements = ( actions, hasError = false ) =>
{
    if ( !actions )
    {
        return [] ;
    }

    const actionButtons = Array.isArray( actions ) ? actions : [ actions ] ;

    return actionButtons.map( ( action, index ) =>
    {
        if ( !action )
        {
            return null ;
        }

        return (
            <action.type
                key       = { action.key || index }
                { ...action.props }
                className = { cn
                (
                    action.props.className ,
                    hasError && styles.btnInputError
                )}
            />
        ) ;
    }) ;
} ;

export default getActionElements ;