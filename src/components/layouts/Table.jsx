'use client' ;

import cn from '../../themes/helpers/cn' ;
import getTableClasses from '../../themes/components/table' ;

/**
 * Table component for displaying data in a table format with DaisyUI 5 styling.
 * Supports zebra striping, sticky rows/columns, and multiple sizes.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='table'] - HTML element to render
 * @param {React.ReactNode} [props.children] - Table content (thead, tbody, tfoot, tr, th, td)
 * @param {string} [props.className] - Additional classes for the table
 * @param {string} [props.containerClassName] - Classes for the scrollable container wrapper
 * @param {boolean} [props.pinCols=false] - Make all <th> columns sticky
 * @param {boolean} [props.pinRows=false] - Make all rows inside <thead> and <tfoot> sticky
 * @param {boolean} [props.scrollable=true] - Wrap table in overflow-x-auto container
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size='md'] - Table size
 * @param {boolean} [props.zebra=false] - Show zebra stripe rows
 * @param {React.Ref<HTMLTableElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to the table element
 */
const Table =
({
    as ,
    children ,
    className ,
    containerClassName ,
    pinCols = false ,
    pinRows = false ,
    scrollable = true ,
    size ,
    zebra = false ,

    ref ,

    ...rest
}) =>
{
    const Component = as || 'table' ;

    const tableClasses = getTableClasses({
        className ,
        pinCols ,
        pinRows ,
        size ,
        zebra ,
    }) ;

    const table = (
        <Component
            className = { tableClasses }
            ref       = { ref }
            { ...rest }
        >
            { children }
        </Component>
    ) ;

    // Wrap in scrollable container if needed
    if ( scrollable )
    {
        const wrapperClasses = cn( 'overflow-x-auto' , containerClassName ) ;

        return (
            <div className={ wrapperClasses }>
                { table }
            </div>
        ) ;
    }

    return table ;
} ;

Table.displayName = 'Table' ;

export default Table ;