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

        busy :
        {
            title       : 'Pendant que la recherche s’exécute' ,
            note        : 'Pendant « busy », la croix troque son icône contre un spinner ; la loupe garde la sienne. Les deux ignorent le clic sans quitter l’ordre de tabulation ; le champ, lui, continue d’accepter la saisie.' ,
            toggle      : 'busy' ,
            value       : 'une valeur à effacer' ,
            placeholder : 'Chercher…' ,
        } ,

        shared :
        {
            title       : 'La recherche et le fondu de l’écran' ,
            note        : 'Sous un BusyNavigationProvider, la recherche d’adresse passe par la transition partagée : la surface s’estompe à chaque pause de frappe, et la croix tourne. « shared » coupé, la croix tourne seule.' ,
            toggle      : 'shared' ,
            placeholder : 'Tapez, puis attendez le rebond…' ,
            value       : 'Valeur lue dans l’adresse :' ,
        } ,
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

        busy :
        {
            title       : 'A search in flight' ,
            note        : 'While « busy », the clear button trades its icon for a spinner ; the search button keeps its own. Both ignore clicks without leaving the tab order ; the field itself keeps taking keystrokes.' ,
            toggle      : 'busy' ,
            value       : 'a value to clear' ,
            placeholder : 'Search…' ,
        } ,

        shared :
        {
            title       : 'The search and the screen’s transition' ,
            note        : 'Under a BusyNavigationProvider, the URL search goes through the shared transition : the surface fades at every pause of the typing, and the clear button spins. With « shared » off, the clear button spins alone.' ,
            toggle      : 'shared' ,
            placeholder : 'Type, then wait for the debounce…' ,
            value       : 'Value read from the address :' ,
        } ,
    } ,
} ;

export default search ;
