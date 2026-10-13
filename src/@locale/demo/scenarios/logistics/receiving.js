const receiving =
{
    fr :
    {
        intro : 'Une palette arrive au quai : on l’identifie, on contrôle chaque ligne contre la commande, on justifie les écarts, on photographie le bon de livraison signé. Les étiquettes GS1 portent l’article, le lot, la date limite et la quantité : un scan suffit à tout lire.' ,
        sound : 'Bip et vibration' ,

        steps :
        {
            label   : 'Étapes de la réception' ,
            pallet  : 'Palette' ,
            lines   : 'Contrôle' ,
            review  : 'Clôture' ,
            done    : 'Validée' ,
        } ,

        delivery :
        {
            supplier : 'Fournisseur' ,
            supplierName : 'Scierie du Lot' ,
            order    : 'Commande' ,
            pallet   : 'Palette (SSCC)' ,
        } ,

        products :
        {
            oak    : 'Planche chêne 27 × 200' ,
            batten : 'Tasseau pin 40 × 40' ,
            panel  : 'Panneau contreplaqué 18 mm' ,
            other  : 'Article hors commande' ,
        } ,

        pallet :
        {
            label       : 'Scanner l’étiquette de la palette' ,
            placeholder : '(00) SSCC' ,
            wrong       : 'Cette palette n’est pas attendue : {0}.' ,
            notSscc     : 'Ce code n’est pas une étiquette de palette : il faut un SSCC (00).' ,
            right       : 'Palette {0} : réception ouverte.' ,
        } ,

        lines :
        {
            label       : 'Scanner les étiquettes des colis' ,
            placeholder : '(01) article (10) lot (17) date (30) quantité' ,
            product     : 'Article' ,
            expected    : 'Attendu' ,
            received    : 'Reçu' ,
            state       : 'État' ,
            lots        : 'Lot {0}, limite {1} : {2}' ,
            correct     : 'Corriger' ,
            correctOf   : 'Corriger « {0} »' ,
            sheet       : 'Quantité reçue' ,
            added       : '{0} : +{1}.' ,
            short       : '{0} : +{1}. Date limite proche : {2}.' ,
            expired     : '{0} : date limite dépassée ({1}), colis refusé.' ,
            unknown     : 'Cet article n’est pas dans la commande.' ,
            notGs1      : 'Ce code n’est pas une étiquette GS1 de colis.' ,
            again       : 'La palette est déjà ouverte.' ,
            finish      : 'Terminer le contrôle' ,
            status      :
            {
                todo    : 'À contrôler' ,
                full    : 'Complet' ,
                short   : 'Manque {0}' ,
                over    : 'Excédent {0}' ,
            } ,
        } ,

        review :
        {
            reason     : 'Motif de l’écart — {0}' ,
            reasons    :
            {
                missing : 'Manquant' ,
                excess  : 'Excédent' ,
                damaged : 'Casse' ,
                other   : 'Autre' ,
            } ,
            note       : 'Aucun écart : il reste le bon de livraison.' ,
            photo      : 'Bon de livraison signé' ,
            photoHelp  : 'Obligatoire : la photo du bon signé par le chauffeur.' ,
            sign       : 'Signature du réceptionnaire' ,
            signHelp   : 'Obligatoire. Signez en grand avec le bouton du coin : on tend le téléphone au chauffeur. Le tracé est gardé avec l’empreinte de ce qui a été signé : les lignes et l’heure.' ,
            receipt    : 'Télécharger le bon de réception' ,
            validate   : 'Valider la réception' ,
            done       : 'Réception validée.' ,
            next       : 'Nouvelle réception' ,
            record     : 'Ce que l’application enverrait' ,
        } ,

        labels :
        {
            title   : 'Étiquettes à scanner' ,
            note    : 'Scannez-les avec le téléphone, tapez leur contenu, ou cliquez sur « Utiliser ». Les dates sont calculées depuis aujourd’hui.' ,
            use     : 'Utiliser' ,
            pallet  : 'Palette attendue' ,
            foreign : 'Palette d’un autre envoi' ,
            oak     : 'Chêne, 12 pièces' ,
            batten  : 'Tasseaux, 10 pièces, date proche' ,
            panel   : 'Panneaux, 6 pièces' ,
            expired : 'Chêne, date dépassée' ,
            other   : 'Article hors commande' ,
        } ,

        receipt :
        {
            fileName   : 'bon-de-reception' ,
            title      : 'Bon de réception' ,
            order      : 'Commande' ,
            pallet     : 'Palette' ,
            date       : 'Réceptionnée le' ,
            product    : 'Article' ,
            expected   : 'Attendu' ,
            received   : 'Reçu' ,
            reason     : 'Motif' ,
            signedBy   : 'Signature du réceptionnaire' ,
            digest     : 'Empreinte' ,
            digestNote : 'SHA-256 des lignes, de l’heure et du tracé au moment de la signature.' ,
        } ,

        used :
        {
            title : 'Composants utilisés' ,
            note  : 'Chacun renvoie à sa page, avec toutes ses options.' ,
        } ,
    } ,

    en :
    {
        intro : 'A pallet reaches the dock : identify it, check each line against the order, account for the discrepancies, photograph the signed delivery note. GS1 labels carry the product, the lot, the expiry date and the quantity : one scan reads it all.' ,
        sound : 'Beep and vibration' ,

        steps :
        {
            label   : 'Steps of the receipt' ,
            pallet  : 'Pallet' ,
            lines   : 'Check' ,
            review  : 'Closing' ,
            done    : 'Confirmed' ,
        } ,

        delivery :
        {
            supplier : 'Supplier' ,
            supplierName : 'Scierie du Lot' ,
            order    : 'Order' ,
            pallet   : 'Pallet (SSCC)' ,
        } ,

        products :
        {
            oak    : 'Oak board 27 × 200' ,
            batten : 'Pine batten 40 × 40' ,
            panel  : 'Plywood panel 18 mm' ,
            other  : 'Product not ordered' ,
        } ,

        pallet :
        {
            label       : 'Scan the pallet label' ,
            placeholder : '(00) SSCC' ,
            wrong       : 'This pallet is not expected : {0}.' ,
            notSscc     : 'This code is no pallet label : an SSCC (00) is needed.' ,
            right       : 'Pallet {0} : receipt open.' ,
        } ,

        lines :
        {
            label       : 'Scan the parcel labels' ,
            placeholder : '(01) product (10) lot (17) date (30) quantity' ,
            product     : 'Product' ,
            expected    : 'Expected' ,
            received    : 'Received' ,
            state       : 'State' ,
            lots        : 'Lot {0}, expiry {1} : {2}' ,
            correct     : 'Correct' ,
            correctOf   : 'Correct “{0}”' ,
            sheet       : 'Quantity received' ,
            added       : '{0} : +{1}.' ,
            short       : '{0} : +{1}. Expiry date close : {2}.' ,
            expired     : '{0} : expiry date passed ({1}), parcel refused.' ,
            unknown     : 'This product is not in the order.' ,
            notGs1      : 'This code is no GS1 parcel label.' ,
            again       : 'The pallet is already open.' ,
            finish      : 'Finish the check' ,
            status      :
            {
                todo    : 'To check' ,
                full    : 'Complete' ,
                short   : 'Short {0}' ,
                over    : 'Excess {0}' ,
            } ,
        } ,

        review :
        {
            reason     : 'Reason for the discrepancy — {0}' ,
            reasons    :
            {
                missing : 'Missing' ,
                excess  : 'Excess' ,
                damaged : 'Damaged' ,
                other   : 'Other' ,
            } ,
            note       : 'No discrepancy : the delivery note is left.' ,
            photo      : 'Signed delivery note' ,
            photoHelp  : 'Required : the photo of the note signed by the driver.' ,
            sign       : 'Receiver’s signature' ,
            signHelp   : 'Required. Sign full screen with the corner button: the phone is handed to the driver. The strokes are kept with the digest of what was signed: the lines and the time.' ,
            receipt    : 'Download the receipt' ,
            validate   : 'Confirm the receipt' ,
            done       : 'Receipt confirmed.' ,
            next       : 'New receipt' ,
            record     : 'What the application would send' ,
        } ,

        labels :
        {
            title   : 'Labels to scan' ,
            note    : 'Scan them with the phone, type their content, or click « Use ». The dates are worked out from today.' ,
            use     : 'Use' ,
            pallet  : 'Expected pallet' ,
            foreign : 'Pallet of another shipment' ,
            oak     : 'Oak, 12 pieces' ,
            batten  : 'Battens, 10 pieces, close date' ,
            panel   : 'Panels, 6 pieces' ,
            expired : 'Oak, date passed' ,
            other   : 'Product not ordered' ,
        } ,

        receipt :
        {
            fileName   : 'receipt' ,
            title      : 'Goods receipt' ,
            order      : 'Order' ,
            pallet     : 'Pallet' ,
            date       : 'Received on' ,
            product    : 'Product' ,
            expected   : 'Expected' ,
            received   : 'Received' ,
            reason     : 'Reason' ,
            signedBy   : 'Receiver’s signature' ,
            digest     : 'Digest' ,
            digestNote : 'SHA-256 of the lines, the time and the strokes at the moment of signing.' ,
        } ,

        used :
        {
            title : 'Components used' ,
            note  : 'Each one leads to its page, with all its options.' ,
        } ,
    } ,
} ;

export default receiving ;
