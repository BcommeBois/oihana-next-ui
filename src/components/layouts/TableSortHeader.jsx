'use client' ;

/**
 * TableSortHeader — a column header that sorts, and says so.
 *
 * 🚨 **`aria-sort` belongs on the `<th>`, never on the button inside it.**
 * WAI-ARIA defines the attribute on `columnheader` and `rowheader` only : put
 * it on a `<button>` and it is simply ignored, so the table looks sorted to
 * anyone who can see the arrow and to nobody else. This is the mistake this
 * component exists to stop repeating — it was written that way in the
 * application it came from, eight times in one file.
 *
 * The header is a `<th>` carrying the state, and a button carrying the
 * action : the whole label is the target, and the arrow rides with it.
 *
 * ⚠️ **Exactly one column may be `ascending` or `descending`.** Sorting is a
 * property of the table, not of a column, and two headers claiming it
 * contradict each other — which is why the sorted column is named once, from
 * outside, and each header compares itself to it.
 *
 * @module components/layouts/TableSortHeader
 *
 * @example
 * ```jsx
 * const [ sort , setSort ] = useState( { ascending : true , column : 'name' } ) ;
 *
 * const toggle = column => setSort( current => (
 *     { ascending : current.column === column ? !current.ascending : true , column }
 * ) ) ;
 *
 * <thead>
 *     <tr>
 *         <TableSortHeader ascending={ sort.ascending } column="name"  label="Name"  onSort={ toggle } sort={ sort.column } />
 *         <TableSortHeader ascending={ sort.ascending } column="total" label="Total" onSort={ toggle } sort={ sort.column } className="text-right" />
 *     </tr>
 * </thead>
 * ```
 */

import { MdArrowDownward , MdArrowUpward } from 'react-icons/md' ;

import cn from '../../themes/helpers/cn' ;

/**
 * Read from the smallest value up.
 * @type {string}
 */
export const ASCENDING = 'ascending' ;

/**
 * Read from the largest value down.
 * @type {string}
 */
export const DESCENDING = 'descending' ;

/**
 * Sortable, and not the column the table is sorted on.
 * @type {string}
 */
export const NONE = 'none' ;

/**
 * @param {Object}   props
 * @param {boolean}  [props.ascending=true] - Which end the table is read from. Only meaningful on the sorted column.
 * @param {string}   [props.className]      - Additional class names for the header cell.
 * @param {string}   props.column           - What this header sorts on.
 * @param {React.ReactNode} props.label     - What the header reads.
 * @param {Function} [props.onSort]         - Called with `column` when the header is pressed.
 * @param {string}   [props.scope='col']    - The cell's scope, for a header that is not a column's.
 * @param {?string}  [props.sort]           - The column the table is sorted on, named from outside.
 */
const TableSortHeader =
({
    ascending = true ,
    className ,
    column ,
    label ,
    onSort ,
    scope = 'col' ,
    sort ,
}) =>
{
    const sorted = column === sort ;

    const Arrow = ascending ? MdArrowUpward : MdArrowDownward ;

    return (
        <th
            aria-sort = { sorted ? ( ascending ? ASCENDING : DESCENDING ) : NONE }
            className = { className }
            scope     = { scope }
        >
            <button
                className = { cn( 'inline-flex items-center gap-1 cursor-pointer hover:text-base-content' ) }
                onClick   = { () => onSort?.( column ) }
                type      = "button"
            >
                { label }
                { sorted && <Arrow aria-hidden className="size-3.5" /> }
            </button>
        </th>
    ) ;
} ;

TableSortHeader.displayName = 'TableSortHeader' ;

export default TableSortHeader ;
