/**
 * Default labels of the sortable components — `SortableFlexItem`,
 * `SortableGridItem`, `SortableListRow`, `SortableTableRow` and
 * `SortableTreeItem`.
 *
 * One bundle for the five of them : they all draw the same drag handle and
 * were all declaring the same `'Drag to reorder'` string. A handle is a handle
 * whatever it drags, so naming it once is what keeps the five from drifting.
 *
 * These labels are `aria-label` only — nothing here shows on screen.
 */
const sortable =
{
    fr :
    {
        handle : 'Glisser pour réordonner' ,
        toggle : 'Déplier ou replier' ,
    } ,

    en :
    {
        handle : 'Drag to reorder' ,
        toggle : 'Toggle' ,
    } ,
} ;

export default sortable ;
