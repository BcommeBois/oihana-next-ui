const card =
{
    fr :
    {
        title : 'Une carte de paiement' ,

        sections :
        {
            complete : 'Le formulaire complet' ,
            fieldset : 'Dans des fieldsets' ,
            noIcon   : 'Sans icônes' ,
            error    : 'En erreur' ,
            disabled : 'Désactivé' ,
        } ,

        number   : { label : 'Numéro de carte' , detected : 'Type reconnu : {0}' } ,
        expiry   : { label : 'Expiration' } ,
        cvv      : { label : 'Code de sécurité' , three : 'Trois chiffres' , four : 'Quatre chiffres (Amex)' } ,

        submit    : 'Payer' ,
        submitted : 'Carte envoyée.\nNuméro : {0}\nExpiration : {1}\nCode : {2}' ,

        fieldset :
        {
            number   : { legend : 'Numéro de carte' , helper : 'Les seize chiffres de la carte.' } ,
            expiry   : { legend : 'Date d’expiration' } ,
            cvv      : { legend : 'Code de sécurité' } ,
        } ,

        errors :
        {
            number : 'Numéro de carte invalide' ,
            expiry : 'La carte a expiré' ,
            cvv    : 'Code de sécurité invalide' ,
        } ,
    } ,

    en :
    {
        title : 'A payment card' ,

        sections :
        {
            complete : 'The whole form' ,
            fieldset : 'In fieldsets' ,
            noIcon   : 'Without icons' ,
            error    : 'In error' ,
            disabled : 'Disabled' ,
        } ,

        number   : { label : 'Card number' , detected : 'Type detected : {0}' } ,
        expiry   : { label : 'Expiry' } ,
        cvv      : { label : 'Security code' , three : 'Three digits' , four : 'Four digits (Amex)' } ,

        submit    : 'Pay' ,
        submitted : 'Card submitted.\nNumber : {0}\nExpiry : {1}\nCode : {2}' ,

        fieldset :
        {
            number   : { legend : 'Card number' , helper : 'The card’s sixteen digits.' } ,
            expiry   : { legend : 'Expiry date' } ,
            cvv      : { legend : 'Security code' } ,
        } ,

        errors :
        {
            number : 'Invalid card number' ,
            expiry : 'The card has expired' ,
            cvv    : 'Invalid security code' ,
        } ,
    } ,
} ;

export default card ;
