/**
 * Default labels of the filter family — `OptionFilterPicker` and
 * `RemoteFilterPicker`.
 *
 * A criterion names itself : the application passes its own bundle through the
 * `path` prop (« Colour », « Search a colour… », « All colours »), and it is read
 * OVER this one — a key the criterion leaves out falls back here. `unknown`
 * names an option that has no name : `{0}` is its id.
 */
const filter =
{
    fr :
    {
        all       : 'Tous' ,
        apply     : 'Appliquer' ,
        clearAll  : 'Effacer' ,
        close     : 'Fermer' ,
        empty     : 'Aucune option.' ,
        loadError : 'Le chargement a échoué.' ,
        retry     : 'Réessayer' ,
        search    : 'Rechercher…' ,
        title     : 'Filtrer' ,
        unknown   : '{0}' ,
    } ,

    en :
    {
        all       : 'All' ,
        apply     : 'Apply' ,
        clearAll  : 'Clear' ,
        close     : 'Close' ,
        empty     : 'No option.' ,
        loadError : 'Failed to load.' ,
        retry     : 'Retry' ,
        search    : 'Search…' ,
        title     : 'Filter' ,
        unknown   : '{0}' ,
    } ,
} ;

export default filter ;
