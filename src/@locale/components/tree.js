/**
 * Default labels of `PathTree` and of the toolbar a host builds around it.
 *
 * `count` is the only one the component reads : the badge on each folder, as
 * « selected of total » when the tree is selectable, and « leaves of total »
 * when it is not.
 *
 * `collapseAll` and `expandAll` are read by the HOST, not by the component.
 * The two buttons sit in a toolbar beside a search field and whatever else a
 * screen offers, which `PathTree` knows nothing about — but the labels belong
 * here all the same, because three screens of a consuming application were
 * each spelling « Tout replier » inline, in French, as the fallback of a key
 * they had declared separately.
 *
 * Kept apart from `components.sortable`, which names the drag handle of the
 * sortable family : that tree REORDERS a hierarchy, this one reads one.
 */
const tree =
{
    fr :
    {
        collapseAll : 'Tout replier' ,
        count       : '{0}/{1}' ,
        expandAll   : 'Tout déplier' ,
    } ,

    en :
    {
        collapseAll : 'Collapse all' ,
        count       : '{0}/{1}' ,
        expandAll   : 'Expand all' ,
    } ,
} ;

export default tree ;
