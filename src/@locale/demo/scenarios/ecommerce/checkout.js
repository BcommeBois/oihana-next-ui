const checkout =
{
    fr :
    {
        intro : 'Un tunnel de commande de bout en bout : le panier, la livraison, le paiement, la confirmation. Démonstration seulement : aucun paiement n’est fait, aucune donnée ne quitte la page. Utilisez la carte de test proposée.' ,

        steps :
        {
            label    : 'Étapes de la commande' ,
            cart     : 'Panier' ,
            delivery : 'Livraison' ,
            payment  : 'Paiement' ,
            done     : 'Confirmation' ,
        } ,

        items :
        {
            armchair : 'Fauteuil en lin naturel' ,
            lamp     : 'Lampe à poser en laiton' ,
            throw    : 'Plaid en laine' ,
        } ,

        cart :
        {
            quantity  : 'Quantité' ,
            remove    : 'Retirer « {0} »' ,
            empty     : 'Votre panier est vide.' ,
            refill    : 'Remettre les articles' ,
            promo     : 'Code promo' ,
            promoHelp : 'Essayez BIENVENUE10 (10 % de remise) ou LIVRAISON (livraison offerte).' ,
            apply     : 'Appliquer le code' ,
            applied   : 'Code {0} appliqué.' ,
            unknown   : 'Ce code n’existe pas ou n’est plus valable.' ,
            next      : 'Passer à la livraison' ,
        } ,

        summary :
        {
            title    : 'Récapitulatif' ,
            subtotal : 'Sous-total' ,
            discount : 'Remise' ,
            shipping : 'Livraison' ,
            free     : 'Offerte' ,
            total    : 'Total TTC' ,
        } ,

        delivery :
        {
            mode      : 'Mode de livraison' ,
            modes     :
            {
                home  : { title : 'À domicile' , subtitle : 'Livré chez vous en 2 à 3 jours ouvrés' } ,
                relay : { title : 'En point relais' , subtitle : 'Disponible en 3 à 5 jours ouvrés' } ,
                store : { title : 'Retrait en magasin' , subtitle : 'Prêt dès le prochain jour ouvré' } ,
            } ,
            address   : 'Adresse de livraison' ,
            addressHelp : 'Au moins trois caractères : la Base adresse nationale propose des adresses françaises.' ,
            date      : 'Date de livraison souhaitée' ,
            pickup    : 'Date de retrait' ,
            dateHelp  : 'Jours ouvrés seulement.' ,
            missing   : 'Choisissez une adresse et une date.' ,
            back      : 'Revenir au panier' ,
            next      : 'Passer au paiement' ,
        } ,

        payment :
        {
            test      : 'Remplir avec une carte de test' ,
            testHelp  : 'Carte de test publique : elle ne correspond à aucun compte.' ,
            holder    : 'Titulaire de la carte' ,
            number    : 'Numéro de carte' ,
            expiry    : 'Expiration' ,
            cvv       : 'Cryptogramme' ,
            brand     : 'Carte détectée : {0}' ,
            invalidNumber : 'Ce numéro de carte n’est pas valide.' ,
            invalidExpiry : 'Cette date est passée ou incomplète.' ,
            invalidCvv    : 'Le cryptogramme est incomplet.' ,
            invalidHolder : 'Indiquez le nom du titulaire.' ,
            pay       : 'Payer {0}' ,
            back      : 'Revenir à la livraison' ,
            secure    : 'Validation par votre banque' ,
            code      : 'Code reçu par SMS' ,
            codeHelp  : 'Pour la démonstration, le code est : {0}' ,
            wrongCode : 'Ce code ne correspond pas.' ,
            checking  : 'Vérification du paiement…' ,
        } ,

        done :
        {
            title    : 'Merci, votre commande est confirmée.' ,
            number   : 'Numéro de commande' ,
            pickup   : 'Présentez ce code au magasin pour retirer votre commande.' ,
            toast    : 'Commande {0} confirmée.' ,
            record   : 'Ce que l’application enverrait' ,
            again    : 'Nouvelle commande' ,
        } ,

        used :
        {
            title : 'Composants utilisés' ,
            note  : 'Chacun renvoie à sa page, avec toutes ses options.' ,
        } ,
    } ,

    en :
    {
        intro : 'A checkout from end to end : the cart, the delivery, the payment, the confirmation. A demonstration only : no payment is made, no data leaves the page. Use the test card offered.' ,

        steps :
        {
            label    : 'Steps of the order' ,
            cart     : 'Cart' ,
            delivery : 'Delivery' ,
            payment  : 'Payment' ,
            done     : 'Confirmation' ,
        } ,

        items :
        {
            armchair : 'Natural linen armchair' ,
            lamp     : 'Brass table lamp' ,
            throw    : 'Wool throw' ,
        } ,

        cart :
        {
            quantity  : 'Quantity' ,
            remove    : 'Remove “{0}”' ,
            empty     : 'Your cart is empty.' ,
            refill    : 'Put the items back' ,
            promo     : 'Promo code' ,
            promoHelp : 'Try BIENVENUE10 (10 % off) or LIVRAISON (free delivery).' ,
            apply     : 'Apply the code' ,
            applied   : 'Code {0} applied.' ,
            unknown   : 'This code does not exist or has expired.' ,
            next      : 'Go to delivery' ,
        } ,

        summary :
        {
            title    : 'Summary' ,
            subtotal : 'Subtotal' ,
            discount : 'Discount' ,
            shipping : 'Delivery' ,
            free     : 'Free' ,
            total    : 'Total incl. VAT' ,
        } ,

        delivery :
        {
            mode      : 'Delivery mode' ,
            modes     :
            {
                home  : { title : 'Home delivery' , subtitle : 'Delivered to you in 2 to 3 working days' } ,
                relay : { title : 'Pick-up point' , subtitle : 'Available in 3 to 5 working days' } ,
                store : { title : 'Collect in store' , subtitle : 'Ready the next working day' } ,
            } ,
            address   : 'Delivery address' ,
            addressHelp : 'Three characters at least : the French national address base suggests addresses in France.' ,
            date      : 'Preferred delivery date' ,
            pickup    : 'Collection date' ,
            dateHelp  : 'Working days only.' ,
            missing   : 'Choose an address and a date.' ,
            back      : 'Back to the cart' ,
            next      : 'Go to payment' ,
        } ,

        payment :
        {
            test      : 'Fill in a test card' ,
            testHelp  : 'A public test card : it matches no account.' ,
            holder    : 'Cardholder' ,
            number    : 'Card number' ,
            expiry    : 'Expiry' ,
            cvv       : 'Security code' ,
            brand     : 'Card detected : {0}' ,
            invalidNumber : 'This card number is not valid.' ,
            invalidExpiry : 'This date is past or incomplete.' ,
            invalidCvv    : 'The security code is incomplete.' ,
            invalidHolder : 'Give the cardholder’s name.' ,
            pay       : 'Pay {0}' ,
            back      : 'Back to delivery' ,
            secure    : 'Confirmation by your bank' ,
            code      : 'Code received by text message' ,
            codeHelp  : 'For the demonstration, the code is : {0}' ,
            wrongCode : 'This code does not match.' ,
            checking  : 'Checking the payment…' ,
        } ,

        done :
        {
            title    : 'Thank you, your order is confirmed.' ,
            number   : 'Order number' ,
            pickup   : 'Show this code in store to collect your order.' ,
            toast    : 'Order {0} confirmed.' ,
            record   : 'What the application would send' ,
            again    : 'New order' ,
        } ,

        used :
        {
            title : 'Components used' ,
            note  : 'Each one leads to its page, with all its options.' ,
        } ,
    } ,
} ;

export default checkout ;
