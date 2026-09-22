/**
 * Default labels of the filter family — `OptionFilterPicker` and
 * `RemoteFilterPicker`.
 *
 * A criterion names itself : the application passes its own bundle through the
 * `path` prop (« Colour », « Search a colour… », « All colours »), and it is read
 * OVER this one — a key the criterion leaves out falls back here. `unknown`
 * names an option that has no name : `{0}` is its id.
 *
 * `clearFilters` and `remove` are read by `ClearFiltersChip` and `FilterChip` ;
 * `min` and `max` by `RangeFilterPanel` ; the `settings` block by
 * `FilterSettingsButton` ; the `period` block by `PeriodFilterPanel`.
 */
const filter =
{
    fr :
    {
        all          : 'Tous' ,
        apply        : 'Appliquer' ,
        clearAll     : 'Effacer' ,
        clearFilters : 'Tout effacer' ,
        close     : 'Fermer' ,
        empty     : 'Aucune option.' ,
        loadError : 'Le chargement a échoué.' ,
        max       : 'Max' ,
        min       : 'Min' ,
        remove    : 'Retirer le filtre' ,
        retry     : 'Réessayer' ,
        search    : 'Rechercher…' ,
        title     : 'Filtrer' ,
        unknown   : '{0}' ,

        period :
        {
            clearField   : 'Effacer la date' ,
            from         : 'Du' ,
            hint         : 'Laissez une borne vide pour une période ouverte.' ,
            inverted     : 'La date de fin précède la date de début.' ,
            openCalendar : 'Ouvrir le calendrier' ,
            title        : 'Filtrer par période' ,
            to           : 'Au' ,

            presets :
            {
                last30    : '30 derniers jours' ,
                lastMonth : 'Le mois dernier' ,
                lastYear  : 'L’année dernière' ,
                quarter   : 'Ce trimestre' ,
                year      : 'Cette année' ,
            } ,
        } ,

        settings :
        {
            apply       : 'Appliquer' ,
            cancel      : 'Annuler' ,
            checkAll    : 'Tout cocher' ,
            clearedMany : '{0} filtres actifs seront retirés.' ,
            clearedOne  : '1 filtre actif sera retiré.' ,
            close       : 'Fermer' ,
            help        : 'Décochez un filtre pour le retirer de cette page.' ,
            title       : 'Filtres affichés' ,
            trigger     : 'Choisir les filtres à afficher' ,
            uncheckAll  : 'Tout décocher' ,
        } ,
    } ,

    en :
    {
        all          : 'All' ,
        apply        : 'Apply' ,
        clearAll     : 'Clear' ,
        clearFilters : 'Clear all' ,
        close     : 'Close' ,
        empty     : 'No option.' ,
        loadError : 'Failed to load.' ,
        max       : 'Max' ,
        min       : 'Min' ,
        remove    : 'Remove filter' ,
        retry     : 'Retry' ,
        search    : 'Search…' ,
        title     : 'Filter' ,
        unknown   : '{0}' ,

        period :
        {
            clearField   : 'Clear date' ,
            from         : 'From' ,
            hint         : 'Leave one end empty for an open-ended period.' ,
            inverted     : 'The end date precedes the start date.' ,
            openCalendar : 'Open calendar' ,
            title        : 'Filter by period' ,
            to           : 'To' ,

            presets :
            {
                last30    : 'Last 30 days' ,
                lastMonth : 'Last month' ,
                lastYear  : 'Last year' ,
                quarter   : 'This quarter' ,
                year      : 'This year' ,
            } ,
        } ,

        settings :
        {
            apply       : 'Apply' ,
            cancel      : 'Cancel' ,
            checkAll    : 'Tick all' ,
            clearedMany : '{0} active filters will be removed.' ,
            clearedOne  : '1 active filter will be removed.' ,
            close       : 'Close' ,
            help        : 'Untick a filter to remove it from this page.' ,
            title       : 'Filters shown' ,
            trigger     : 'Choose the filters to show' ,
            uncheckAll  : 'Untick all' ,
        } ,
    } ,
} ;

export default filter ;
