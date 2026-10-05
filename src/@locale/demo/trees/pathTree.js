const pathTree =
{
    fr :
    {
        title       : 'PathTree — une hiérarchie qui n’existe que dans les chaînes' ,
        description : 'Aucun des éléments ci-dessous ne dit qui est son parent : la hiérarchie est dans son chemin pointé, et groupByPath la lit. Les deux cartes montrent le même arbre en lecture et en sélection.' ,

        search      : 'Rechercher' ,
        placeholder : 'Tapez pour filtrer — les branches s’ouvrent' ,
        expandAll   : 'Tout déplier' ,
        collapseAll : 'Tout replier' ,
        empty       : 'Aucun élément ne correspond.' ,

        read :
        {
            title    : 'En lecture' ,
            subtitle : 'Le badge compte les feuilles du sous-arbre entier. Le dépliage est un bouton, pas un details : voir le JSDoc du composant.' ,
        } ,

        select :
        {
            title    : 'En sélection' ,
            subtitle : 'Chaque dossier porte une case tri-état sur tout son sous-arbre. Les deux lignes marquées d’un cadenas sont verrouillées : elles sortent du compte, sinon la case resterait indéterminée pour toujours.' ,
            selected : '{0} sélectionné(s)' ,
            locked   : 'verrouillé' ,
            clear    : 'Tout désélectionner' ,
        } ,

        notes :
        {
            title : 'Deux décisions visibles dans les données' ,
            depth : 'Le chemin le plus profond dépasse le plafond de 4 niveaux : sa queue est RECOLLÉE en un seul segment plutôt que coupée, pour qu’aucun élément ne se retrouve sans parent.' ,
            orphan : 'Le dernier élément n’a pas de chemin du tout : il atterrit dans le dossier « — » au lieu de disparaître de la liste.' ,
        } ,
    } ,
    en :
    {
        title       : 'PathTree — a hierarchy that exists only in the strings' ,
        description : 'None of the items below says who its parent is : the hierarchy is in its dotted path, and groupByPath reads it out. The two cards show the same tree in read and in selection.' ,

        search      : 'Search' ,
        placeholder : 'Type to filter — the branches open' ,
        expandAll   : 'Expand all' ,
        collapseAll : 'Collapse all' ,
        empty       : 'No item matches.' ,

        read :
        {
            title    : 'In read' ,
            subtitle : 'The badge counts the leaves of the whole subtree. The disclosure is a button, not a details : see the component JSDoc.' ,
        } ,

        select :
        {
            title    : 'In selection' ,
            subtitle : 'Each folder carries a tri-state checkbox over its whole subtree. The two rows marked with a padlock are locked : they are out of the count entirely, or the box would stay indeterminate forever.' ,
            selected : '{0} selected' ,
            locked   : 'locked' ,
            clear    : 'Clear the selection' ,
        } ,

        notes :
        {
            title : 'Two decisions you can see in the data' ,
            depth : 'The deepest path goes past the cap of 4 levels : its tail is REJOINED into one segment rather than cut, so no item is left without a parent.' ,
            orphan : 'The last item has no path at all : it lands in the « — » folder instead of dropping out of the list.' ,
        } ,
    } ,
} ;

export default pathTree ;
