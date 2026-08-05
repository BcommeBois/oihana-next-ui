/**
 * Default labels of the modal family.
 *
 * `Modal` reads the root keys (`agree`, `disagree`, `close`) ; each preset
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
        agree    : 'OK' ,
        disagree : 'Annuler' ,
        close    : 'Fermer' ,

        alert    :
        {
            agree : 'OK' ,
        } ,

        confirm  :
        {
            agree : 'Confirmer' ,
        } ,

        input    :
        {
            action : 'Parcourir' ,
            agree  : 'Appliquer' ,
        } ,
    } ,

    en :
    {
        agree    : 'OK' ,
        disagree : 'Cancel' ,
        close    : 'Close' ,

        alert    :
        {
            agree : 'OK' ,
        } ,

        confirm  :
        {
            agree : 'Confirm' ,
        } ,

        input    :
        {
            action : 'Browse' ,
            agree  : 'Apply' ,
        } ,
    } ,
} ;

export default modal ;
