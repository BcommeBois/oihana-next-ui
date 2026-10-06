const urlEmail =
{
    fr :
    {
        title : 'Adresses et liens' ,

        sections :
        {
            email : 'Le champ e-mail' ,
            url   : 'Le champ adresse' ,
        } ,

        email :
        {
            basic      : { label : 'Adresse e-mail' , helper : 'Saisissez votre adresse.' } ,
            required   : { label : 'Adresse (obligatoire)' , hint : 'Saisissez une adresse valide.' } ,
            multiple   : { label : 'Plusieurs adresses' , placeholder : 'une@exemple.com, deux@exemple.com' , helper : 'Séparez-les par des virgules.' } ,
            multipleV  : { label : 'Plusieurs adresses (validées)' , hint : 'Une ou plusieurs adresses valides, séparées par des virgules.' , helper : 'La validation HTML5 s’en charge toute seule.' } ,
            fieldset   : { legend : 'Adresse de contact' , helper : 'Elle ne sera jamais partagée.' } ,
            noIcon     : { label : 'Adresse sans icône' } ,
            error      : { label : 'Adresse en erreur' , error : 'Cette adresse est déjà prise' } ,
            disabled   : { label : 'Adresse désactivée' } ,
        } ,

        url :
        {
            basic      : { label : 'Adresse du site' , helper : 'Le https:// est ajouté tout seul.' } ,
            secure     : { hint : 'Seules les adresses HTTPS sont acceptées.' } ,
            plain      : { placeholder : 'http://localhost:3000' } ,
            strict     : { hint : 'Doit commencer par https://' } ,
            noProtocol : { label : 'Adresse du portfolio' , helper : 'Sans le protocole.' } ,
            required   : { label : 'Site de la société (obligatoire)' , hint : 'Saisissez une adresse valide.' } ,
            noButton   : { label : 'Adresse sans bouton d’ouverture' , helper : 'Le champ seul, sans action.' } ,
            fieldset   : { legend : 'Lien vers un profil' , helper : 'L’adresse de votre profil public.' } ,
            noIcon     : { label : 'Adresse sans icône' } ,
            error      : { label : 'Adresse en erreur' , error : 'Format d’adresse invalide' } ,
            disabled   : { label : 'Adresse désactivée' } ,
            readOnly   : { label : 'Adresse en lecture seule' } ,
        } ,
    } ,

    en :
    {
        title : 'Addresses and links' ,

        sections :
        {
            email : 'The e-mail field' ,
            url   : 'The address field' ,
        } ,

        email :
        {
            basic      : { label : 'E-mail address' , helper : 'Enter your address.' } ,
            required   : { label : 'Address (required)' , hint : 'Enter a valid address.' } ,
            multiple   : { label : 'Several addresses' , placeholder : 'one@example.com, two@example.com' , helper : 'Separate them with commas.' } ,
            multipleV  : { label : 'Several addresses (validated)' , hint : 'One or more valid addresses, separated by commas.' , helper : 'HTML5 validation handles it on its own.' } ,
            fieldset   : { legend : 'Contact address' , helper : 'It will never be shared.' } ,
            noIcon     : { label : 'Address without an icon' } ,
            error      : { label : 'Address in error' , error : 'That address is already taken' } ,
            disabled   : { label : 'Disabled address' } ,
        } ,

        url :
        {
            basic      : { label : 'Website address' , helper : 'The https:// is added on its own.' } ,
            secure     : { hint : 'Only HTTPS addresses are accepted.' } ,
            plain      : { placeholder : 'http://localhost:3000' } ,
            strict     : { hint : 'Must start with https://' } ,
            noProtocol : { label : 'Portfolio address' , helper : 'Without the protocol.' } ,
            required   : { label : 'Company website (required)' , hint : 'Enter a valid address.' } ,
            noButton   : { label : 'Address without an open button' , helper : 'The field alone, with no action.' } ,
            fieldset   : { legend : 'Link to a profile' , helper : 'The address of your public profile.' } ,
            noIcon     : { label : 'Address without an icon' } ,
            error      : { label : 'Address in error' , error : 'Invalid address format' } ,
            disabled   : { label : 'Disabled address' } ,
            readOnly   : { label : 'Read-only address' } ,
        } ,
    } ,
} ;

export default urlEmail ;
