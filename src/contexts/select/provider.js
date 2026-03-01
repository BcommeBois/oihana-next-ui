'use client' ;

import useObjectState from '../../hooks/useObjectState' ;

import SelectContext from './context' ;

/**
 * Default selection state.
 */
const DEFAULT_STATE =
{
    selectable      : false ,
    selectableItems : [] ,
    selectedItems   : [] ,
    selectRemove    : null ,
} ;

/**
 * Provides selection management for lists.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 *
 * @returns {React.ReactElement} The select context provider.
 *
 * @example
 * ```jsx
 * <SelectProvider>
 *     <DataTable />
 * </SelectProvider>
 * ```
 */
const SelectProvider = ( { children } ) =>
{
    const [ state , setState ] = useObjectState( DEFAULT_STATE ) ;

    // ------ Select all selectable items

    const selectAll = () =>
    {
        const { selectable , selectableItems } = state ;

        if ( selectable && Array.isArray( selectableItems ) )
        {
            setState( { selectedItems: [ ...selectableItems ] } ) ;
        }
    } ;

    // ------ Unselect all items

    const unselectAll = () =>
    {
        const { selectedItems } = state ;

        if ( Array.isArray( selectedItems ) && selectedItems.length > 0 )
        {
            setState( { selectedItems: [] } ) ;
        }
    } ;

    // ------ Set remove callback

    const setSelectRemove = ( method ) =>
    {
        setState( { selectRemove: method instanceof Function ? method : null } ) ;
    } ;

    // ------ Reset to default state

    const selectReset = () =>
    {
        setState( DEFAULT_STATE ) ;
    } ;

    // ------ Update selection state

    const setSelect = ( options ) =>
    {
        setState( options ) ;
    } ;

    // ------ Get number of selected items

    const numSelected = () =>
    {
        return state.selectedItems?.length ?? 0 ;
    } ;

    // ------ Toggle item selection

    const toggleSelected = ( item , key = null ) =>
    {
        if ( !state.selectable )
        {
            return ;
        }

        const selectedItems = Array.isArray( state.selectedItems )
            ? state.selectedItems
            : [] ;

        const index = key === null
            ? selectedItems.indexOf( item )
            : selectedItems.findIndex( ( element ) => item[ key ] === element[ key ] ) ;

        if ( index > -1 )
        {
            setState( { selectedItems: selectedItems.filter( ( _ , i ) => i !== index ) } ) ;
        }
        else
        {
            setState( { selectedItems: [ ...selectedItems , item ] } ) ;
        }
    } ;

    // ------ Provide context

    return (
        <SelectContext value={{
            ...state ,
            numSelected ,
            selectAll ,
            selectReset ,
            setSelect ,
            setSelectRemove ,
            toggleSelected ,
            unselectAll ,
        }}>
            { children }
        </SelectContext>
    ) ;
} ;

export default SelectProvider ;