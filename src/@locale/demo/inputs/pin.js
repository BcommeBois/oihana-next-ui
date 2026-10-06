const pin =
{
    fr :
    {
        title : 'Des codes' ,

        sections :
        {
            center   : 'Centré (par défaut)' ,
            start    : 'Aligné à gauche' ,
            end      : 'Aligné à droite' ,
        } ,

        otp :
        {
            helper   : 'Saisissez le code à 6 chiffres reçu sur votre téléphone.' ,
            entered  : 'Code saisi : {0}' ,
        } ,

        code :
        {
            helper  : 'Essayez 1234.' ,
            correct : 'Code correct !' ,
            invalid : 'Code invalide' ,
        } ,

        right : { helper : 'Aligné à droite.' } ,

        verification :
        {
            legend : 'Code de vérification (centré)' ,
            helper : 'Le code expire dans 5 minutes.' ,
        } ,

        fourDigits :
        {
            legend : 'Code à 4 chiffres (à gauche)' ,
            helper : 'Quatre chiffres.' ,
        } ,

        styled : { legend : 'Code stylé (à droite)' } ,

        disabled :
        {
            label  : 'Code désactivé' ,
            helper : 'Ce champ est verrouillé.' ,
        } ,
    } ,

    en :
    {
        title : 'Codes' ,

        sections :
        {
            center   : 'Centred (default)' ,
            start    : 'Aligned to the start' ,
            end      : 'Aligned to the end' ,
        } ,

        otp :
        {
            helper   : 'Enter the 6-digit code sent to your phone.' ,
            entered  : 'Code entered : {0}' ,
        } ,

        code :
        {
            helper  : 'Try 1234.' ,
            correct : 'Correct code !' ,
            invalid : 'Invalid code' ,
        } ,

        right : { helper : 'Aligned to the right.' } ,

        verification :
        {
            legend : 'Verification code (centred)' ,
            helper : 'The code expires in 5 minutes.' ,
        } ,

        fourDigits :
        {
            legend : '4-digit code (to the start)' ,
            helper : 'Four digits.' ,
        } ,

        styled : { legend : 'Styled code (to the end)' } ,

        disabled :
        {
            label  : 'Disabled code' ,
            helper : 'This field is locked.' ,
        } ,
    } ,
} ;

export default pin ;
