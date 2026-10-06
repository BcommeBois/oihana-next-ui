const validator =
{
    fr :
    {
        title : 'La validation HTML5' ,
        note  : 'Envoyez un formulaire avec une valeur invalide pour voir apparaître son indication.' ,

        email :
        {
            label  : 'Adresse e-mail' ,
            hint   : 'Saisissez une adresse valide.' ,
            submit : 'Valider l’adresse' ,
        } ,

        username :
        {
            label  : 'Identifiant' ,
            hint   : 'De 3 à 30 caractères : lettres, chiffres ou tiret.' ,
            title  : 'Lettres, chiffres ou tiret seulement.' ,
            submit : 'Valider l’identifiant' ,
        } ,

        password :
        {
            legend : 'Mot de passe' ,
            hint   : 'Huit caractères au moins, dont au moins un chiffre, une minuscule et une majuscule.' ,
            title  : 'Huit caractères au moins, dont un chiffre, une minuscule et une majuscule.' ,
            submit : 'Valider le mot de passe' ,
        } ,

        phone :
        {
            label  : 'Téléphone' ,
            hint   : 'Dix chiffres.' ,
            title  : 'Dix chiffres.' ,
            submit : 'Valider le téléphone' ,
        } ,

        age :
        {
            label       : 'Âge' ,
            placeholder : 'Un nombre entre 1 et 100' ,
            hint        : 'Entre 1 et 100.' ,
            title       : 'Entre 1 et 100.' ,
            submit      : 'Valider l’âge' ,
        } ,

        url :
        {
            label  : 'Adresse du site' ,
            hint   : 'Saisissez une adresse valide.' ,
            title  : 'Adresse invalide.' ,
            submit : 'Valider l’adresse' ,
        } ,

        newsletter :
        {
            legend : 'Lettre d’information' ,
            hint   : 'Saisissez une adresse valide.' ,
            helper : 'Un message de confirmation vous sera envoyé.' ,
            join   : 'OK' ,
        } ,
    } ,

    en :
    {
        title : 'HTML5 validation' ,
        note  : 'Submit a form with an invalid value to see its hint appear.' ,

        email :
        {
            label  : 'E-mail address' ,
            hint   : 'Enter a valid address.' ,
            submit : 'Validate the address' ,
        } ,

        username :
        {
            label  : 'Username' ,
            hint   : 'From 3 to 30 characters : letters, digits or dash.' ,
            title  : 'Letters, digits or dash only.' ,
            submit : 'Validate the username' ,
        } ,

        password :
        {
            legend : 'Password' ,
            hint   : 'Eight characters at least, with at least one digit, one lower case and one upper case letter.' ,
            title  : 'Eight characters at least, with a digit, a lower case and an upper case letter.' ,
            submit : 'Validate the password' ,
        } ,

        phone :
        {
            label  : 'Phone number' ,
            hint   : 'Ten digits.' ,
            title  : 'Ten digits.' ,
            submit : 'Validate the phone number' ,
        } ,

        age :
        {
            label       : 'Age' ,
            placeholder : 'A number between 1 and 100' ,
            hint        : 'Between 1 and 100.' ,
            title       : 'Between 1 and 100.' ,
            submit      : 'Validate the age' ,
        } ,

        url :
        {
            label  : 'Website address' ,
            hint   : 'Enter a valid address.' ,
            title  : 'Invalid address.' ,
            submit : 'Validate the address' ,
        } ,

        newsletter :
        {
            legend : 'Newsletter' ,
            hint   : 'Enter a valid address.' ,
            helper : 'A confirmation message will be sent to you.' ,
            join   : 'OK' ,
        } ,
    } ,
} ;

export default validator ;
