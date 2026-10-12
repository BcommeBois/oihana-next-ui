const card =
{
    fr :
    {
        title : 'Une carte de paiement' ,

        sections :
        {
            complete : 'Le formulaire complet' ,
            validated : 'Avec validation' ,
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

        validated :
        {
            note    : 'validate sur les trois champs : l’erreur apparaît une fois la saisie complète ou le champ quitté, jamais pendant la frappe. Le cryptogramme suit la marque (brand), et « Payer » attend onValidChange des trois. Cartes de test publiques : Visa 4242 4242 4242 4242, Mastercard 5555 5555 5555 4444, Amex 3782 822463 10005.' ,
            fill    : 'Remplir avec une carte de test' ,
            pay     : 'Payer' ,
            ready   : 'Les trois champs sont valides.' ,
            waiting : 'En attente d’une carte valide.' ,
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
            validated : 'With validation' ,
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

        validated :
        {
            note    : 'validate on the three fields : the error shows once the entry is complete or the field left, never while typing. The security code follows the brand, and « Pay » waits for onValidChange from all three. Public test cards : Visa 4242 4242 4242 4242, Mastercard 5555 5555 5555 4444, Amex 3782 822463 10005.' ,
            fill    : 'Fill in a test card' ,
            pay     : 'Pay' ,
            ready   : 'The three fields are valid.' ,
            waiting : 'Waiting for a valid card.' ,
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
