/**
 * Labels of the invoice scenario.
 */
const invoice =
{
    fr :
    {
        intro : 'La facture d’une commande, écrite comme un composant React et rendue en PDF : l’aperçu se régénère pendant que vous remplissez le formulaire. Le même composant est rendu par le navigateur — télécharger, enregistrer — et par le serveur, dans une route, sans navigateur : les deux boutons du bas le montrent. Rien n’est conservé.' ,

        form :
        {
            title    : 'La commande' ,
            customer : 'Client' ,
            address  : 'Adresse' ,
            due      : 'Échéance' ,
            vat      : 'TVA 20 %' ,
            vatHelp  : 'Désactivée, la facture porte la mention d’autoliquidation.' ,
            note     : 'Mentions' ,
            long     : 'Facture longue' ,
            longHelp : 'Répète les lignes pour voir la pagination : les totaux ne se coupent pas, chaque page porte les codes et son numéro.' ,
        } ,

        items :
        {
            armchair : 'Fauteuil en lin naturel' ,
            lamp     : 'Lampe à poser en laiton' ,
            throw    : 'Plaid en laine' ,
        } ,

        defaults :
        {
            customer : 'Camille Martin' ,
            address  : '12 rue des Lilas, 75011 Paris' ,
            note     : 'Paiement à 30 jours par virement. En cas de retard, indemnité forfaitaire de 40 € pour frais de recouvrement.' ,
            reverse  : 'TVA non applicable — autoliquidation (art. 283-2 du CGI).' ,
        } ,

        actions :
        {
            title    : 'Le document' ,
            download : 'Télécharger' ,
            upload   : 'Enregistrer sur le serveur' ,
            uploaded : 'Facture {0} reçue par le serveur : {1}.' ,
            server   : 'Rendre côté serveur' ,
            rendered : 'Rendue par le serveur en {0} ms.' ,
            failed   : 'Le serveur n’a pas répondu : {0}' ,
            panel    : 'Rendue par le serveur' ,
            close    : 'Fermer' ,
        } ,

        document :
        {
            title       : 'Facture' ,
            number      : 'N°' ,
            date        : 'Date' ,
            due         : 'Échéance' ,
            seller      : 'Émetteur' ,
            buyer       : 'Client' ,
            description : 'Désignation' ,
            quantity    : 'Qté' ,
            unit        : 'PU HT' ,
            amount      : 'Montant HT' ,
            subtotal    : 'Total HT' ,
            vat         : 'TVA {0} %' ,
            total       : 'Total TTC' ,
            payment     : 'Payer en ligne' ,
            page        : 'Page {0} / {1}' ,
        } ,

        used :
        {
            title : 'Construit avec' ,
            note  : 'Le gabarit de la facture est à copier : la bibliothèque fournit les primitives, pas le modèle.' ,
        } ,
    } ,
    en :
    {
        intro : 'The invoice of an order, written as a React component and rendered as a PDF: the preview is generated again as you fill the form. The same component is rendered by the browser — download, save — and by the server, in a route, with no browser: the two bottom buttons show it. Nothing is kept.' ,

        form :
        {
            title    : 'The order' ,
            customer : 'Customer' ,
            address  : 'Address' ,
            due      : 'Due date' ,
            vat      : 'VAT 20%' ,
            vatHelp  : 'Off, the invoice carries the reverse-charge mention.' ,
            note     : 'Terms' ,
            long     : 'Long invoice' ,
            longHelp : 'Repeats the lines to show the pagination: the totals never split, every page carries the codes and its number.' ,
        } ,

        items :
        {
            armchair : 'Natural linen armchair' ,
            lamp     : 'Brass table lamp' ,
            throw    : 'Wool throw' ,
        } ,

        defaults :
        {
            customer : 'Camille Martin' ,
            address  : '12 rue des Lilas, 75011 Paris' ,
            note     : 'Payment within 30 days by bank transfer. Late payment incurs a fixed €40 recovery fee.' ,
            reverse  : 'VAT not applicable — reverse charge.' ,
        } ,

        actions :
        {
            title    : 'The document' ,
            download : 'Download' ,
            upload   : 'Save to the server' ,
            uploaded : 'Invoice {0} received by the server: {1}.' ,
            server   : 'Render on the server' ,
            rendered : 'Rendered by the server in {0} ms.' ,
            failed   : 'The server did not answer: {0}' ,
            panel    : 'Rendered by the server' ,
            close    : 'Close' ,
        } ,

        document :
        {
            title       : 'Invoice' ,
            number      : 'No.' ,
            date        : 'Date' ,
            due         : 'Due' ,
            seller      : 'From' ,
            buyer       : 'Bill to' ,
            description : 'Description' ,
            quantity    : 'Qty' ,
            unit        : 'Unit price' ,
            amount      : 'Amount' ,
            subtotal    : 'Subtotal' ,
            vat         : 'VAT {0}%' ,
            total       : 'Total' ,
            payment     : 'Pay online' ,
            page        : 'Page {0} / {1}' ,
        } ,

        used :
        {
            title : 'Built with' ,
            note  : 'The invoice template is there to be copied: the library provides the primitives, not the model.' ,
        } ,
    } ,
} ;

export default invoice ;
