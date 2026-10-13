const inventory =
{
    fr :
    {
        intro : 'Compter ce qu’il y a vraiment sur un emplacement, le comparer au stock théorique, recompter ce qui ne colle pas, puis justifier les écarts. Le stock théorique peut rester masqué pendant le comptage : on compte ce qu’on voit, sans chercher le bon chiffre.' ,
        plan :
        {
            title  : 'L’allée H2' ,
            text   : 'Où l’on en est dans l’allée : les emplacements comptés, celui en cours (entouré), les écarts à justifier. Pincez pour zoomer sur un téléphone.' ,
            states : { counted : 'Compté' , current : 'En cours' , gap : 'Écart' , todo : 'À compter' } ,
        } ,
        sound : 'Bip et vibration' ,
        blind : 'Comptage à l’aveugle : stock théorique masqué pendant le comptage' ,

        steps :
        {
            label    : 'Étapes de l’inventaire' ,
            location : 'Emplacement' ,
            count    : 'Comptage' ,
            recount  : 'Recomptage' ,
            validate : 'Validation' ,
        } ,

        products :
        {
            screws  : 'Vis inox 4 × 40, boîte de 100' ,
            hinges  : 'Charnière laiton 60 mm' ,
            angles  : 'Équerre d’assemblage 80 mm' ,
            found   : 'Crochet galvanisé 120 mm' ,
            unknown : 'Article {0}' ,
        } ,

        location :
        {
            label       : 'Scanner l’emplacement à compter' ,
            placeholder : 'Code de l’emplacement' ,
            wrong       : 'Mauvais emplacement : attendu {0}, scanné {1}.' ,
            right       : 'Emplacement {0} : comptage ouvert.' ,
        } ,

        count :
        {
            label       : 'Scanner l’article compté' ,
            placeholder : 'EAN de l’article' ,
            progress    : '{0} ligne(s) comptée(s) sur {1}' ,
            found       : '{0} : article non attendu ici, ajouté à l’inventaire.' ,
            closed      : 'Le comptage est terminé.' ,
            finish      : 'Terminer le comptage' ,
            sheet       : 'Quantité comptée' ,
            enter       : 'Saisir' ,
            enterOf     : 'Saisir la quantité de « {0} »' ,
            counted     : '{0} : {1} compté(s).' ,
        } ,

        recount :
        {
            label       : 'Scanner l’article à recompter' ,
            placeholder : 'EAN de l’article' ,
            todo        : '{0} ligne(s) à recompter.' ,
            none        : 'Aucun écart : rien à recompter.' ,
            settled     : '{0} : déjà confirmé.' ,
            confirmed   : '{0} : second comptage, {1}.' ,
            next        : 'Passer à la validation' ,
        } ,

        table :
        {
            product     : 'Article' ,
            theoretical : 'Théorique' ,
            first       : '1ᵉʳ comptage' ,
            second      : '2ᵉ comptage' ,
            gap         : 'Écart' ,
            hidden      : 'masqué' ,
            status      :
            {
                todo    : 'À compter' ,
                counted : 'Compté' ,
                recount : 'À recompter' ,
                ok      : 'Conforme' ,
                gap     : 'Écart confirmé' ,
                found   : 'Non attendu' ,
            } ,
        } ,

        validate :
        {
            reason    : 'Motif de l’écart — {0} ({1})' ,
            reasons   :
            {
                damaged  : 'Casse' ,
                lost     : 'Perte ou vol' ,
                movement : 'Erreur de mouvement' ,
                other    : 'Autre' ,
            } ,
            none      : 'Aucun écart : l’emplacement est conforme.' ,
            submit    : 'Valider l’inventaire' ,
            done      : 'Inventaire validé.' ,
            next      : 'Nouvel inventaire' ,
            record    : 'Ce que l’application enverrait' ,
        } ,

        labels :
        {
            title    : 'Étiquettes à scanner' ,
            note     : 'Scannez-les avec le téléphone, tapez leur code, ou cliquez sur « Utiliser ». Un article introuvable sur l’emplacement se saisit depuis sa ligne, avec « Saisir ».' ,
            use      : 'Utiliser' ,
            location : 'Emplacement H2-04-B' ,
            wrong    : 'Emplacement voisin H2-04-C' ,
            screws   : 'Vis inox' ,
            hinges   : 'Charnière' ,
            angles   : 'Équerre' ,
            found    : 'Article non attendu ici' ,
        } ,

        used :
        {
            title : 'Composants utilisés' ,
            note  : 'Chacun renvoie à sa page, avec toutes ses options.' ,
        } ,
    } ,

    en :
    {
        intro : 'Count what really is on a location, compare it with the book stock, count again what does not match, then account for the discrepancies. The book stock can stay hidden while counting : one counts what one sees, not the number one expects.' ,
        plan :
        {
            title  : 'Aisle H2' ,
            text   : 'Where the count stands in the aisle: the bins counted, the current one (ringed), the gaps to account for. Pinch to zoom on a phone.' ,
            states : { counted : 'Counted' , current : 'Current' , gap : 'Gap' , todo : 'To count' } ,
        } ,
        sound : 'Beep and vibration' ,
        blind : 'Blind count : book stock hidden while counting' ,

        steps :
        {
            label    : 'Steps of the count' ,
            location : 'Location' ,
            count    : 'Count' ,
            recount  : 'Recount' ,
            validate : 'Confirmation' ,
        } ,

        products :
        {
            screws  : 'Stainless screws 4 × 40, box of 100' ,
            hinges  : 'Brass hinge 60 mm' ,
            angles  : 'Corner bracket 80 mm' ,
            found   : 'Galvanised hook 120 mm' ,
            unknown : 'Product {0}' ,
        } ,

        location :
        {
            label       : 'Scan the location to count' ,
            placeholder : 'Location code' ,
            wrong       : 'Wrong location : expected {0}, scanned {1}.' ,
            right       : 'Location {0} : count open.' ,
        } ,

        count :
        {
            label       : 'Scan the product counted' ,
            placeholder : 'Product EAN' ,
            progress    : '{0} line(s) counted of {1}' ,
            found       : '{0} : not expected here, added to the count.' ,
            closed      : 'The count is over.' ,
            finish      : 'Finish the count' ,
            sheet       : 'Quantity counted' ,
            enter       : 'Enter' ,
            enterOf     : 'Enter the quantity of “{0}”' ,
            counted     : '{0} : {1} counted.' ,
        } ,

        recount :
        {
            label       : 'Scan the product to count again' ,
            placeholder : 'Product EAN' ,
            todo        : '{0} line(s) to count again.' ,
            none        : 'No discrepancy : nothing to count again.' ,
            settled     : '{0} : already confirmed.' ,
            confirmed   : '{0} : second count, {1}.' ,
            next        : 'Go to confirmation' ,
        } ,

        table :
        {
            product     : 'Product' ,
            theoretical : 'Book' ,
            first       : '1st count' ,
            second      : '2nd count' ,
            gap         : 'Gap' ,
            hidden      : 'hidden' ,
            status      :
            {
                todo    : 'To count' ,
                counted : 'Counted' ,
                recount : 'Count again' ,
                ok      : 'Matches' ,
                gap     : 'Gap confirmed' ,
                found   : 'Not expected' ,
            } ,
        } ,

        validate :
        {
            reason    : 'Reason for the gap — {0} ({1})' ,
            reasons   :
            {
                damaged  : 'Damaged' ,
                lost     : 'Lost or stolen' ,
                movement : 'Movement error' ,
                other    : 'Other' ,
            } ,
            none      : 'No discrepancy : the location matches.' ,
            submit    : 'Confirm the count' ,
            done      : 'Count confirmed.' ,
            next      : 'New count' ,
            record    : 'What the application would send' ,
        } ,

        labels :
        {
            title    : 'Labels to scan' ,
            note     : 'Scan them with the phone, type their code, or click « Use ». A product missing from the location is entered from its line, with « Enter ».' ,
            use      : 'Use' ,
            location : 'Location H2-04-B' ,
            wrong    : 'Next-door location H2-04-C' ,
            screws   : 'Stainless screws' ,
            hinges   : 'Hinge' ,
            angles   : 'Bracket' ,
            found    : 'Product not expected here' ,
        } ,

        used :
        {
            title : 'Components used' ,
            note  : 'Each one leads to its page, with all its options.' ,
        } ,
    } ,
} ;

export default inventory ;
