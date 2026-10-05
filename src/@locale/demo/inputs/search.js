const search =
{
    fr :
    {
        title : 'Chercher' ,

        search : 'Rechercher…' ,

        log :
        {
            title       : 'Recherche différée' ,
            note        : 'Chaque appel à onSearch s’ajoute au journal. Tapez puis attendez, effacez au clavier puis attendez : la valeur vide part aussi. Entrée ou la loupe ne font partir une valeur qu’une fois.' ,
            placeholder : 'Tapez, effacez, appuyez sur Entrée…' ,
            empty       : 'Aucune recherche envoyée' ,
        } ,

        auto   : { placeholder : 'Recherche automatique, différée de 500 ms…' } ,
        manual : { placeholder : 'Recherche manuelle : la loupe ou Entrée…' } ,

        hybrid :
        {
            placeholder : 'Recherche différée de 300 ms, plus la loupe…' ,
            searching   : 'Recherche…' ,
            helper      : 'Tapez, ou servez-vous de la loupe.' ,
        } ,

        fieldset :
        {
            legend      : 'Recherche d’article' ,
            placeholder : 'Chercher dans la base…' ,
            helper      : 'Appuyez sur Entrée ou servez-vous de la loupe.' ,
        } ,

        withClear  : { placeholder : 'Avec une croix pour vider…' } ,
        withoutIcon : { placeholder : 'Sans la loupe à gauche…' } ,

        error :
        {
            legend : 'Recherche' ,
            error  : 'Aucun résultat' ,
        } ,

        disabled : { value : 'Recherche désactivée' } ,
        readOnly : { value : 'Valeur en lecture seule' } ,
    } ,

    en :
    {
        title : 'Searching' ,

        search : 'Search…' ,

        log :
        {
            title       : 'Deferred search' ,
            note        : 'Every call to onSearch is added to the log. Type then wait, clear with the keyboard then wait : the empty value leaves too. Enter or the magnifier sends a value once only.' ,
            placeholder : 'Type, clear, press Enter…' ,
            empty       : 'No search sent yet' ,
        } ,

        auto   : { placeholder : 'Automatic search, deferred by 500 ms…' } ,
        manual : { placeholder : 'Manual search : the magnifier or Enter…' } ,

        hybrid :
        {
            placeholder : 'Search deferred by 300 ms, plus the magnifier…' ,
            searching   : 'Searching…' ,
            helper      : 'Type, or use the magnifier.' ,
        } ,

        fieldset :
        {
            legend      : 'Item search' ,
            placeholder : 'Search the database…' ,
            helper      : 'Press Enter or use the magnifier.' ,
        } ,

        withClear  : { placeholder : 'With a cross to empty it…' } ,
        withoutIcon : { placeholder : 'Without the leading magnifier…' } ,

        error :
        {
            legend : 'Search' ,
            error  : 'No result' ,
        } ,

        disabled : { value : 'Disabled search' } ,
        readOnly : { value : 'Read-only value' } ,
    } ,
} ;

export default search ;
