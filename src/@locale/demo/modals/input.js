const input =
{
    fr :
    {
        title       : 'InputModal — ouverture au focus' ,
        description : 'Cliquez dans le champ, ou servez-vous du bouton, pour ouvrir la modale.' ,

        withFocus    : 'Avec' ,
        withoutFocus : 'Sans' ,

        color :
        {
            label  : 'Couleur' ,
            modal  : 'Choisir une couleur' ,
            action : 'Choisir' ,
            hex    : 'Valeur hexadécimale' ,
        } ,

        date :
        {
            label  : 'Date' ,
            modal  : 'Choisir une date' ,
            action : 'Calendrier' ,
        } ,

        time :
        {
            label  : 'Heure' ,
            modal  : 'Choisir une heure' ,
            action : 'Horloge' ,
        } ,

        location :
        {
            label  : 'Lieu' ,
            modal  : 'Choisir un lieu' ,
            action : 'Choisir' ,
        } ,

        useCases :
        {
            title  : 'Quand se servir d’openOnFocus ?' ,
            good   : '✅ Bien pour :' ,
            avoid  : '❌ À éviter pour :' ,
            goodList  : [ 'Les sélecteurs de date' , 'Les sélecteurs d’heure' , 'Les sélecteurs de couleur' , 'Les choix en un clic' , 'Les champs en lecture seule' ] ,
            avoidList : [ 'Les formulaires complexes' , 'Les choix en plusieurs étapes' , 'Quand il faut taper' , 'Les envois de fichier' , 'Les champs modifiables' ] ,
        } ,

        options :
        {
            title      : 'Autres options' ,
            hideAction : 'Masquer le bouton d’action' ,
            autoOpen   : 'Champ qui s’ouvre seul' ,
            customName : 'onFocus personnalisé' ,
            customBody : 'Avec un gestionnaire à soi' ,
        } ,

        sample :
        {
            pattern : '// ✅ Le bon patron, avec un état temporaire' ,
            shown   : '// ce qui est affiché' ,
        } ,
    } ,
    en :
    {
        title       : 'InputModal — open on focus' ,
        description : 'Click in the field, or use the button, to open the dialog.' ,

        withFocus    : 'With' ,
        withoutFocus : 'Without' ,

        color :
        {
            label  : 'Color' ,
            modal  : 'Choose a color' ,
            action : 'Pick' ,
            hex    : 'Hex value' ,
        } ,

        date :
        {
            label  : 'Date' ,
            modal  : 'Select a date' ,
            action : 'Calendar' ,
        } ,

        time :
        {
            label  : 'Time' ,
            modal  : 'Select a time' ,
            action : 'Clock' ,
        } ,

        location :
        {
            label  : 'Location' ,
            modal  : 'Select a location' ,
            action : 'Choose' ,
        } ,

        useCases :
        {
            title  : 'When to use openOnFocus?' ,
            good   : '✅ Good for:' ,
            avoid  : '❌ Avoid for:' ,
            goodList  : [ 'Date pickers' , 'Time pickers' , 'Color pickers' , 'Single-click selections' , 'Read-only inputs' ] ,
            avoidList : [ 'Complex forms' , 'Multi-step selections' , 'When typing is needed' , 'File uploads' , 'Editable inputs' ] ,
        } ,

        options :
        {
            title      : 'Additional options' ,
            hideAction : 'Hide the action button' ,
            autoOpen   : 'Auto-opening input' ,
            customName : 'Custom onFocus handler' ,
            customBody : 'With a handler of its own' ,
        } ,

        sample :
        {
            pattern : '// ✅ The right pattern, with a temporary state' ,
            shown   : '// what is displayed' ,
        } ,
    } ,
} ;

export default input ;
