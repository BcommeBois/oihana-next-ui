const picking =
{
    fr :
    {
        intro : 'Une ligne de préparation de bout en bout : scanner l’emplacement, scanner l’article, saisir la quantité prise et, s’il en manque, dire pourquoi. Les étiquettes se scannent avec un téléphone sur cet écran, ou se tapent, ou s’utilisent d’un clic.' ,
        sound : 'Bip et vibration' ,

        steps :
        {
            label    : 'Étapes de la ligne' ,
            location : 'Emplacement' ,
            product  : 'Article' ,
            quantity : 'Quantité' ,
            confirm  : 'Validation' ,
        } ,

        line :
        {
            title    : 'Ligne à préparer' ,
            location : 'Emplacement' ,
            product  : 'Planche chêne 27 × 200 — 2,40 m' ,
            ean      : 'EAN' ,
            expected : 'Quantité attendue' ,
            unit     : 'pièces' ,
        } ,

        location :
        {
            label       : 'Scanner l’emplacement' ,
            placeholder : 'Code de l’emplacement' ,
            wrong       : 'Mauvais emplacement : attendu {0}, scanné {1}.' ,
            right       : 'Emplacement {0} confirmé.' ,
        } ,

        product :
        {
            label       : 'Scanner l’article' ,
            placeholder : 'EAN de l’article' ,
            wrong       : 'Mauvais article : attendu {0}, scanné {1}.' ,
            right       : 'Article confirmé.' ,
        } ,

        quantity :
        {
            enter   : 'Saisir la quantité' ,
            change  : 'Modifier la quantité' ,
            sheet   : 'Quantité prise' ,
            picked  : 'Quantité prise : {0} sur {1}' ,
            over    : 'Pas plus que la quantité attendue.' ,
            full    : 'Quantité complète.' ,
            gap     : 'Écart de {0} : choisissez un motif.' ,
        } ,

        confirm :
        {
            reason     : 'Motif de l’écart' ,
            reasons    :
            {
                damaged : 'Casse' ,
                missing : 'Manquant' ,
                label   : 'Erreur d’étiquette' ,
                other   : 'Autre' ,
            } ,
            photo      : 'Photo de la casse' ,
            photoHelp  : 'Obligatoire pour une casse : c’est le justificatif.' ,
            validate   : 'Valider la ligne' ,
            done       : 'Ligne validée.' ,
            next       : 'Ligne suivante' ,
            record     : 'Ce que l’application enverrait' ,
        } ,

        used :
        {
            title : 'Composants utilisés' ,
            note  : 'Chacun renvoie à sa page, avec toutes ses options.' ,
        } ,

        labels :
        {
            title       : 'Étiquettes à scanner' ,
            note        : 'Deux bonnes, deux mauvaises. Scannez-les avec le téléphone, tapez leur code, ou cliquez sur « Utiliser ».' ,
            use         : 'Utiliser' ,
            location    : 'Emplacement H2-04-B' ,
            wrongPlace  : 'Emplacement voisin H2-04-C' ,
            product     : 'Article attendu' ,
            wrongItem   : 'Autre article' ,
        } ,
    } ,

    en :
    {
        intro : 'A picking line from end to end : scan the location, scan the product, enter the quantity picked and, when some is missing, say why. The labels scan with a phone on this screen, or can be typed, or used with a click.' ,
        sound : 'Beep and vibration' ,

        steps :
        {
            label    : 'Steps of the line' ,
            location : 'Location' ,
            product  : 'Product' ,
            quantity : 'Quantity' ,
            confirm  : 'Confirmation' ,
        } ,

        line :
        {
            title    : 'Line to pick' ,
            location : 'Location' ,
            product  : 'Oak board 27 × 200 — 2.40 m' ,
            ean      : 'EAN' ,
            expected : 'Expected quantity' ,
            unit     : 'pieces' ,
        } ,

        location :
        {
            label       : 'Scan the location' ,
            placeholder : 'Location code' ,
            wrong       : 'Wrong location : expected {0}, scanned {1}.' ,
            right       : 'Location {0} confirmed.' ,
        } ,

        product :
        {
            label       : 'Scan the product' ,
            placeholder : 'Product EAN' ,
            wrong       : 'Wrong product : expected {0}, scanned {1}.' ,
            right       : 'Product confirmed.' ,
        } ,

        quantity :
        {
            enter   : 'Enter the quantity' ,
            change  : 'Change the quantity' ,
            sheet   : 'Quantity picked' ,
            picked  : 'Quantity picked : {0} of {1}' ,
            over    : 'No more than the expected quantity.' ,
            full    : 'Full quantity.' ,
            gap     : 'Short by {0} : choose a reason.' ,
        } ,

        confirm :
        {
            reason     : 'Reason for the discrepancy' ,
            reasons    :
            {
                damaged : 'Damaged' ,
                missing : 'Missing' ,
                label   : 'Wrong label' ,
                other   : 'Other' ,
            } ,
            photo      : 'Photo of the damage' ,
            photoHelp  : 'Required for damage : it is the evidence.' ,
            validate   : 'Confirm the line' ,
            done       : 'Line confirmed.' ,
            next       : 'Next line' ,
            record     : 'What the application would send' ,
        } ,

        used :
        {
            title : 'Components used' ,
            note  : 'Each one leads to its page, with all its options.' ,
        } ,

        labels :
        {
            title       : 'Labels to scan' ,
            note        : 'Two right, two wrong. Scan them with the phone, type their code, or click « Use ».' ,
            use         : 'Use' ,
            location    : 'Location H2-04-B' ,
            wrongPlace  : 'Next-door location H2-04-C' ,
            product     : 'Expected product' ,
            wrongItem   : 'Another product' ,
        } ,
    } ,
} ;

export default picking ;
