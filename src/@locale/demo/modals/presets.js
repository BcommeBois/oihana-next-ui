const presets =
{
    fr :
    {
        title       : 'Quatre préréglages qui demandent avant de lâcher' ,
        description : 'Une confirmation à retaper, une valeur montrée une seule fois, une question posée au passage, et une charge utile en lecture. Rien ici n’est détruit : les deux lignes sont des entrées d’un tableau.' ,

        rows : [ 'Premier enregistrement' , 'Second enregistrement' ] ,

        typed :
        {
            subtitle    : 'Une seule instance, repointée de ligne en ligne. Tapez un identifiant puis fermez par Échap ou par un clic à côté de la fenêtre, et rouvrez LA MÊME ligne : le champ est vide et le bouton verrouillé.' ,
            removed     : 'supprimé' ,
            delete      : 'Supprimer' ,
            modalTitle  : 'Supprimer cet enregistrement ?' ,
            description : 'Cela retire {0} de la liste ci-dessous.' ,
        } ,

        secret :
        {
            subtitle    : 'La valeur EST le déclencheur : il n’y a pas de drapeau d’ouverture. Rien ne la referme tant qu’elle n’est pas sauvegardée — essayez Échap. Copiez-la, puis attendez deux secondes : l’icône revient au presse-papiers et le bouton reste déverrouillé. Le toast est l’hôte qui réagit à un rappel, pas la bibliothèque.' ,
            reveal      : 'Révéler une valeur' ,
            exampleLead : 'Exemple : ' ,
            example     : 'une valeur qu’une API ne renvoie qu’une fois' ,
            copyFailed  : 'La valeur n’a pas pu être copiée.' ,
            copied      : 'Valeur copiée dans le presse-papiers.' ,
            downloadKo  : 'Le téléchargement n’a pas pu démarrer.' ,
            downloaded  : 'Enregistrée sous {0}.' ,
        } ,

        prompt :
        {
            subtitle    : 'Son montage EST la demande d’ouverture. Elle rend le texte sans ses espaces, et une chaîne vide quand rien n’a été tapé. Son champ grandit avec ce qu’on tape, par textAreaProps.' ,
            ask         : 'Poser une question' ,
            empty       : 'répondu sans rien' ,
            agree       : 'Envoyer' ,
            body        : 'Le texte est rendu sans ses espaces, et rien n’est obligatoire.' ,
            label       : 'Ce que vous voulez' ,
            placeholder : 'Une ligne de texte' ,
            modalTitle  : 'Que faut-il consigner ?' ,
        } ,

        json :
        {
            subtitle   : 'Elle prend la valeur, pas une chaîne : la charge utile est mise en forme ici, et le bouton de copie est dans l’en-tête, là où un écran tactile peut l’atteindre. Elle prévient son hôte de la copie plutôt que de toaster — et l’hôte, ici, toaste.' ,
            show       : 'Afficher la charge utile' ,
            modalSub   : 'La charge utile dont cette carte a été rendue.' ,
            copyFailed : 'La charge utile n’a pas pu être copiée.' ,
            copied     : 'Charge utile copiée dans le presse-papiers.' ,
        } ,
    } ,
    en :
    {
        title       : 'Four presets that ask before they let go' ,
        description : 'A confirmation typed back, a value shown once, a question asked in passing, and a payload read only. Nothing here is destroyed : the two rows are entries in an array.' ,

        rows : [ 'First record' , 'Second record' ] ,

        typed :
        {
            subtitle    : 'One instance, re-aimed from row to row. Type an id then dismiss with Escape or a click beside the dialog, and reopen THE SAME row : the field is empty again, and the button is locked.' ,
            removed     : 'removed' ,
            delete      : 'Delete' ,
            modalTitle  : 'Delete this record?' ,
            description : 'This removes {0} from the list below.' ,
        } ,

        secret :
        {
            subtitle    : 'The value IS the trigger : there is no open flag. Nothing dismisses it while it is unsaved — try Escape. Copy it, then wait a couple of seconds : the icon goes back to the clipboard, and the button stays unlocked. The toast is the host reacting to a callback, not the library.' ,
            reveal      : 'Reveal a value' ,
            exampleLead : 'Example : ' ,
            example     : 'a value an API would return exactly once' ,
            copyFailed  : 'The value could not be copied.' ,
            copied      : 'Value copied to the clipboard.' ,
            downloadKo  : 'The download could not be started.' ,
            downloaded  : 'Saved as {0}.' ,
        } ,

        prompt :
        {
            subtitle    : 'Mounting it is the request to open it. It hands back the trimmed text, and an empty string when nothing was typed. Its field grows with what is typed, through textAreaProps.' ,
            ask         : 'Ask a question' ,
            empty       : 'answered with nothing' ,
            agree       : 'Send' ,
            body        : 'The text is handed back trimmed, and nothing is required.' ,
            label       : 'Anything you like' ,
            placeholder : 'A line of text' ,
            modalTitle  : 'What should be recorded?' ,
        } ,

        json :
        {
            subtitle   : 'It takes the value, not a string : the payload is pretty-printed here, and the copy button sits in the header where a touch screen can reach it. It tells its host about the copy rather than toasting — and the host, here, toasts.' ,
            show       : 'Show the payload' ,
            modalSub   : 'The payload this card was rendered from.' ,
            copyFailed : 'The payload could not be copied.' ,
            copied     : 'Payload copied to the clipboard.' ,
        } ,
    } ,
} ;

export default presets ;
