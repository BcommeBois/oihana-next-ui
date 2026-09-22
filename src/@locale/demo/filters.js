/**
 * Labels of the lab's filter criteria : each criterion names itself and leaves
 * the rest (« Appliquer », « Réessayer »…) to `components.filter`.
 */
const filters =
{
    fr :
    {
        colour :
        {
            all    : 'Toutes les couleurs' ,
            empty  : 'Aucune couleur.' ,
            search : 'Rechercher une couleur…' ,
            title  : 'Couleur' ,
        } ,

        country :
        {
            all    : 'Tous les pays' ,
            empty  : 'Aucun pays.' ,
            search : 'Rechercher un pays…' ,
            title  : 'Pays' ,
        } ,

        member :
        {
            all     : 'Tous les membres' ,
            empty   : 'Aucun membre.' ,
            search  : 'Rechercher un membre…' ,
            title   : 'Membre' ,
            unknown : 'Membre {0}' ,
        } ,
    } ,

    en :
    {
        colour :
        {
            all    : 'All colours' ,
            empty  : 'No colour.' ,
            search : 'Search a colour…' ,
            title  : 'Colour' ,
        } ,

        country :
        {
            all    : 'All countries' ,
            empty  : 'No country.' ,
            search : 'Search a country…' ,
            title  : 'Country' ,
        } ,

        member :
        {
            all     : 'All members' ,
            empty   : 'No member.' ,
            search  : 'Search a member…' ,
            title   : 'Member' ,
            unknown : 'Member {0}' ,
        } ,
    } ,
} ;

export default filters ;
