/**
 * Default labels of the assignment family — `AssignmentList` and
 * `AssignmentEditorModal`.
 *
 * Nothing here names WHAT is attached : a title naming a family of things
 * belongs to the screen, which is the only place that knows. What
 * lives here is the vocabulary of the gesture itself — how many, how to
 * search, what a pending change reads like, and the question asked before
 * those changes are lost.
 */
const assignment =
{
    fr :
    {
        list :
        {
            count       : '{0} assigné(s)' ,
            empty       : 'Rien n’est attaché.' ,
            manage      : 'Gérer' ,
            search      : 'Filtrer…' ,
            searchEmpty : 'Rien ne correspond à « {0} »' ,
        } ,

        editor :
        {
            diff : '+{0} / −{1}' ,
            none : 'Aucune modification' ,

            exit :
            {
                agree       : 'Abandonner' ,
                description : 'Vous avez {0} modification(s) non enregistrée(s).' ,
                disagree    : 'Continuer' ,
                title       : 'Abandonner les modifications ?' ,
            } ,
        } ,
    } ,

    en :
    {
        list :
        {
            count       : '{0} assigned' ,
            empty       : 'Nothing attached.' ,
            manage      : 'Manage' ,
            search      : 'Filter…' ,
            searchEmpty : 'Nothing matches « {0} »' ,
        } ,

        editor :
        {
            diff : '+{0} / −{1}' ,
            none : 'No change' ,

            exit :
            {
                agree       : 'Discard' ,
                description : 'You have {0} unsaved change(s).' ,
                disagree    : 'Keep editing' ,
                title       : 'Discard the changes?' ,
            } ,
        } ,
    } ,
} ;

export default assignment ;
