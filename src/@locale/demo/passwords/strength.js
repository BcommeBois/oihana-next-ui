const strength =
{
    fr :
    {
        title : 'La robustesse d’un mot de passe' ,
        note  : 'La jauge et la liste de règles n’affichent rien tant que le champ est vide. Tapez pour les voir apparaître, et regardez le bouton se déverrouiller quand chaque ligne est cochée.' ,

        sections :
        {
            signUp : 'Formulaire d’inscription' ,
            twelve : 'Douze caractères' ,
            single : 'Sans confirmation' ,
        } ,

        signUp :
        {
            password  : 'Nouveau mot de passe' ,
            confirm   : 'Confirmez le mot de passe' ,
            mismatch  : 'Les deux mots de passe doivent être identiques' ,
            submit    : 'Créer le compte' ,
            submitted : 'Envoyé — les deux champs ont été vidés par reset().' ,
        } ,

        passphrase :
        {
            password : 'Phrase secrète' ,
            confirm  : 'Confirmez la phrase secrète' ,
            mismatch : 'Les deux phrases secrètes doivent être identiques' ,
        } ,

        single : { password : 'Mot de passe' } ,
    } ,

    en :
    {
        title : 'Password strength' ,
        note  : 'The meter and the checklist render nothing while the field is empty. Start typing to see them appear, and watch the button unlock once every line is ticked.' ,

        sections :
        {
            signUp : 'Sign-up form' ,
            twelve : 'Twelve characters' ,
            single : 'No confirmation field' ,
        } ,

        signUp :
        {
            password  : 'New password' ,
            confirm   : 'Confirm password' ,
            mismatch  : 'Both passwords must be identical' ,
            submit    : 'Create the account' ,
            submitted : 'Submitted — both fields were emptied by reset().' ,
        } ,

        passphrase :
        {
            password : 'Passphrase' ,
            confirm  : 'Confirm passphrase' ,
            mismatch : 'Both passphrases must be identical' ,
        } ,

        single : { password : 'Password' } ,
    } ,
} ;

export default strength ;
