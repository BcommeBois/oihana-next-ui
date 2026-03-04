'use client' ;

import { use } from 'react' ;

import SelectContext from './context' ;

/**
 * Access the selection context.
 *
 * @returns {import('./context').SelectContextValue} The selection state and methods.
 *
 * @throws {Error} If used outside SelectProvider.
 *
 * @example
 * ```jsx
 * const { selectable , selectedItems , toggleSelected } = useSelect() ;
 *
 * // Toggle an item
 * toggleSelected( item ) ;
 *
 * // Toggle by key
 * toggleSelected( item , 'id' ) ;
 *
 * // Select all
 * selectAll() ;
 * ```
 */
const useSelect = () =>
{
    const context = use( SelectContext ) ;

    if ( !context )
    {
        throw new Error( 'useSelect must be used within a SelectProvider.' ) ;
    }

    return context ;
} ;

export default useSelect ;