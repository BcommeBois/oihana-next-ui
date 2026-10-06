const password =
{
    fr :
    {
        title : 'Des mots de passe' ,

        simple    : { placeholder : 'Saisissez votre mot de passe' } ,
        noToggle  : { placeholder : 'Sans la bascule d’affichage' } ,
        noIcon    : { placeholder : 'Sans icône' } ,

        labelled :
        {
            label       : 'Mot de passe' ,
            placeholder : 'Saisissez un mot de passe' ,
            helper      : 'Huit caractères au minimum.' ,
        } ,

        fieldset :
        {
            legend      : 'Votre mot de passe' ,
            placeholder : 'Saisissez un mot de passe' ,
            helper      : 'L’œil affiche ou masque ce que vous tapez.' ,
        } ,

        secure :
        {
            label       : 'Mot de passe sûr' ,
            placeholder : 'Mot de passe' ,
            title       : 'Huit caractères au moins, dont un chiffre, une minuscule et une majuscule.' ,
            hint        : 'Huit caractères au moins, dont au moins un chiffre, une minuscule et une majuscule.' ,
            submit      : 'Valider le mot de passe' ,
        } ,

        customIcon : { placeholder : 'Avec une icône choisie' } ,

        error :
        {
            placeholder : 'Mot de passe' ,
            error       : 'Mot de passe incorrect' ,
        } ,

        disabled : { placeholder : 'Mot de passe désactivé' } ,
        readOnly : { placeholder : 'Mot de passe en lecture seule' } ,

        custom :
        {
            label       : 'Noms accessibles donnés par l’hôte' ,
            placeholder : 'Saisissez votre mot de passe' ,
            show        : 'Afficher le mot de passe' ,
            hide        : 'Masquer le mot de passe' ,
            helper      : 'Survolez l’œil : ces deux noms viennent de l’hôte, pas du bundle.' ,
        } ,
    } ,

    en :
    {
        title : 'Passwords' ,

        simple    : { placeholder : 'Enter your password' } ,
        noToggle  : { placeholder : 'Without the visibility toggle' } ,
        noIcon    : { placeholder : 'Without an icon' } ,

        labelled :
        {
            label       : 'Password' ,
            placeholder : 'Enter a password' ,
            helper      : 'Eight characters at the very least.' ,
        } ,

        fieldset :
        {
            legend      : 'Your password' ,
            placeholder : 'Enter a password' ,
            helper      : 'The eye shows or hides what you type.' ,
        } ,

        secure :
        {
            label       : 'Secure password' ,
            placeholder : 'Password' ,
            title       : 'Eight characters at least, with a digit, a lower case and an upper case letter.' ,
            hint        : 'Eight characters at least, with at least one digit, one lower case and one upper case letter.' ,
            submit      : 'Validate the password' ,
        } ,

        customIcon : { placeholder : 'With an icon of your own' } ,

        error :
        {
            placeholder : 'Password' ,
            error       : 'Incorrect password' ,
        } ,

        disabled : { placeholder : 'Disabled password' } ,
        readOnly : { placeholder : 'Read-only password' } ,

        custom :
        {
            label       : 'Accessible names given by the host' ,
            placeholder : 'Enter your password' ,
            show        : 'Show the password' ,
            hide        : 'Hide the password' ,
            helper      : 'Hover the eye : those two names come from the host, not from the bundle.' ,
        } ,
    } ,
} ;

export default password ;
