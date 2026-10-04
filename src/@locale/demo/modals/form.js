const form =
{
    fr :
    {
        title       : 'FormModal & ModalFooter' ,
        description : 'Modifiez le nom puis fermez : la question est posée. Enregistrez : le bouton attend, tout est verrouillé, puis la modale se ferme — sauf si le serveur refuse.' ,

        openForm   : 'Ouvrir le formulaire' ,
        openInfo   : 'Ouvrir une fiche en lecture' ,
        refuse     : 'Le serveur refuse' ,
        nameBadge  : 'nom = {0}' ,
        closeBadge : 'onClose × {0}' ,

        formTitle  : "Renommer l'étiquette" ,
        nameLabel  : 'Nom' ,
        initial    : 'Alpha' ,
        refused    : 'Refusé par le serveur — la modale reste ouverte.' ,
        required   : 'Le nom est obligatoire.' ,
        dirty      : 'Modifications non enregistrées' ,

        infoTitle  : 'Fiche en lecture' ,
        infoClose  : 'Fermer' ,
        infoStatus : 'Aucune décision à prendre ici.' ,
        infoBody   : "Un pied donné onAgree seul n'a qu'un bouton." ,
    } ,
    en :
    {
        title       : 'FormModal & ModalFooter' ,
        description : 'Change the name then close : the question is asked. Save : the button waits, everything locks, then the dialog closes — unless the server refuses.' ,

        openForm   : 'Open the form' ,
        openInfo   : 'Open a read-only panel' ,
        refuse     : 'The server refuses' ,
        nameBadge  : 'name = {0}' ,
        closeBadge : 'onClose × {0}' ,

        formTitle  : 'Rename the label' ,
        nameLabel  : 'Name' ,
        initial    : 'Alpha' ,
        refused    : 'Refused by the server — the dialog stays open.' ,
        required   : 'The name is required.' ,
        dirty      : 'Unsaved changes' ,

        infoTitle  : 'Read-only panel' ,
        infoClose  : 'Close' ,
        infoStatus : 'No decision to make here.' ,
        infoBody   : 'A footer given onAgree alone has a single button.' ,
    } ,
} ;

export default form ;
