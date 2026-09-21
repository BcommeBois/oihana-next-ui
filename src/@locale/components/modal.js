/**
 * Default labels of the modal family.
 *
 * `Modal` reads the root keys (`agree`, `agreeBusy`, `disagree`, `close`) ; each preset
 * (`alert`, `confirm`, `input`, `form`)
 * reads its own sub-block for the labels that differ from the base — and
 * only those, so `disagree` and `close` stay defined in a single place.
 *
 * Override the whole block from the host application by declaring
 * `components.modal` in its own i18n source.
 */
const modal =
{
    fr :
    {
        agree     : 'OK' ,
        agreeBusy : 'En cours…' ,
        disagree  : 'Annuler' ,
        close     : 'Fermer' ,

        alert    :
        {
            agree : 'OK' ,
        } ,

        confirm  :
        {
            agree : 'Confirmer' ,
        } ,

        form     :
        {
            agree     : 'Enregistrer' ,
            agreeBusy : 'Enregistrement…' ,
            exit      :
            {
                agree       : 'Abandonner' ,
                description : 'Vos modifications seront perdues.' ,
                disagree    : 'Continuer la saisie' ,
                title       : 'Abandonner les modifications ?' ,
            } ,
        } ,

        input    :
        {
            action : 'Parcourir' ,
            agree  : 'Appliquer' ,
        } ,
    } ,

    en :
    {
        agree     : 'OK' ,
        agreeBusy : 'Working…' ,
        disagree  : 'Cancel' ,
        close     : 'Close' ,

        alert    :
        {
            agree : 'OK' ,
        } ,

        confirm  :
        {
            agree : 'Confirm' ,
        } ,

        form     :
        {
            agree     : 'Save' ,
            agreeBusy : 'Saving…' ,
            exit      :
            {
                agree       : 'Discard' ,
                description : 'Your changes will be lost.' ,
                disagree    : 'Keep editing' ,
                title       : 'Discard changes?' ,
            } ,
        } ,

        input    :
        {
            action : 'Browse' ,
            agree  : 'Apply' ,
        } ,
    } ,
} ;

export default modal ;
