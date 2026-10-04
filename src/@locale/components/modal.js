/**
 * Default labels of the modal family.
 *
 * `Modal` reads the root keys (`agree`, `agreeBusy`, `disagree`, `close`) ; each preset
 * (`alert`, `confirm`, `form`, `input`, `json`, `secret`, `typed`)
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

        json     :
        {
            agree      : 'Fermer' ,
            copyFailed : 'Copie impossible dans le presse-papiers.' ,
            subtitle   : null ,
            title      : 'Charge utile' ,
        } ,

        secret   :
        {
            agree          : 'J\'ai bien enregistré cette valeur' ,
            copy           : 'Copier' ,
            copied         : 'Copié' ,
            copyFailed     : 'Copie impossible dans le presse-papiers.' ,
            download       : 'Télécharger' ,
            downloaded     : 'Téléchargé' ,
            downloadFailed : 'Téléchargement impossible. Utilisez le bouton « Copier ».' ,
            hint           : 'Téléchargez ou copiez la valeur pour débloquer le bouton ci-dessous.' ,
            label          : 'Valeur' ,
            title          : 'Enregistrez cette valeur maintenant' ,
            warning        : 'Cette valeur ne s\'affiche qu\'une seule fois. Si vous fermez cette fenêtre sans l\'enregistrer, elle ne pourra plus être récupérée.' ,
        } ,

        typed    :
        {
            helper : 'La validation se débloquera dès que la valeur attendue sera saisie correctement.' ,
            label  : 'Confirmez en saisissant la valeur attendue :' ,
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

        json     :
        {
            agree      : 'Close' ,
            copyFailed : 'Unable to copy to the clipboard.' ,
            subtitle   : null ,
            title      : 'Payload' ,
        } ,

        secret   :
        {
            agree          : 'I have saved this value' ,
            copy           : 'Copy' ,
            copied         : 'Copied' ,
            copyFailed     : 'Unable to copy to the clipboard.' ,
            download       : 'Download' ,
            downloaded     : 'Downloaded' ,
            downloadFailed : 'Download failed. Use the copy button instead.' ,
            hint           : 'Download or copy the value to unlock the button below.' ,
            label          : 'Secret' ,
            title          : 'Save this value now' ,
            warning        : 'This value is shown only once. Close this dialog without saving it and it cannot be recovered.' ,
        } ,

        typed    :
        {
            helper : 'The action unlocks once the expected value is typed correctly.' ,
            label  : 'Confirm by typing the expected value :' ,
        } ,
    } ,
} ;

export default modal ;
