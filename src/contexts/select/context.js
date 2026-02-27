import { createContext } from 'react' ;

/**
 * @typedef {Object} SelectContextValue
 * @property {boolean} selectable - Whether selection is enabled.
 * @property {any[]} selectableItems - Items available for selection.
 * @property {any[]} selectedItems - Currently selected items.
 * @property {Function | null} selectRemove - Remove callback.
 * @property {() => number} numSelected - Get number of selected items.
 * @property {() => void} selectAll - Select all items.
 * @property {() => void} selectReset - Reset to default state.
 * @property {(options: Object) => void} setSelect - Update selection state.
 * @property {(method: Function | null) => void} setSelectRemove - Set remove callback.
 * @property {(item: any, key?: string | null) => void} toggleSelected - Toggle item selection.
 * @property {() => void} unselectAll - Unselect all items.
 */

const SelectContext = createContext( /** @type {SelectContextValue | null} */ ( null ) ) ;

SelectContext.displayName = 'SelectContext' ;

export default SelectContext ;