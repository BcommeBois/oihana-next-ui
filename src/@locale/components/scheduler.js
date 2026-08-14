/**
 * Default labels of the `Scheduler` family.
 *
 * `views` names each view in the switcher. The names are read by the toolbar, so
 * an application adding a view of its own supplies its label alongside these.
 *
 * `allDay` replaces the time on an event that has none — an agenda row still owes
 * the reader something in that column, and an empty cell reads as missing data.
 */
const scheduler =
{
    fr :
    {
        today    : 'Aujourd’hui' ,
        previous : 'Période précédente' ,
        next     : 'Période suivante' ,
        allDay   : 'Journée' ,
        empty    : 'Rien de prévu sur cette période.' ,
        emptyDay : 'Rien de prévu' ,
        continues : 'suite' ,
        more      : 'de plus' ,
        views :
        {
            agenda   : 'Agenda' ,
            day      : 'Jour' ,
            week     : 'Semaine' ,
            month    : 'Mois' ,
            timeline : 'Ressources' ,
        } ,
    } ,

    en :
    {
        today    : 'Today' ,
        previous : 'Previous period' ,
        next     : 'Next period' ,
        allDay   : 'All day' ,
        empty    : 'Nothing scheduled in this period.' ,
        emptyDay : 'Nothing scheduled' ,
        continues : 'cont.' ,
        more      : 'more' ,
        views :
        {
            agenda   : 'Agenda' ,
            day      : 'Day' ,
            week     : 'Week' ,
            month    : 'Month' ,
            timeline : 'Resources' ,
        } ,
    } ,
} ;

export default scheduler ;
