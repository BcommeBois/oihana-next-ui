/**
 * Labels of the PDF creation demo.
 */
const create =
{
    fr :
    {
        title : 'Créer un PDF' ,
        intro : 'Le second moteur, @react-pdf/renderer, écrit un PDF à partir d’un composant React : des vues en flexbox, du texte qui coule, des images, du SVG. Il pèse 1,4 Mo et n’est chargé qu’au moment de générer — jamais à l’ouverture de la page. Le même composant se rend dans le navigateur, pour l’aperçu, et sur le serveur, dans une route : voyez le scénario E-commerce › Facture.' ,

        engine :
        {
            ready   : '@react-pdf/renderer {0}' ,
            missing : '@react-pdf/renderer n’est pas installé.' ,
            waiting : 'moteur non chargé' ,
        } ,

        live :
        {
            title    : 'Créé à la volée' ,
            text     : 'Tapez : l’aperçu se régénère 300 ms après la dernière frappe, dans notre visionneuse, jamais dans un iframe. Le bouton génère le document au clic et le télécharge ; le QR code en bas de page est dessiné par nos encodeurs, sans dépendance.' ,
            heading  : 'Titre' ,
            body     : 'Texte' ,
            bodyHelp : 'Une ligne vide commence un paragraphe.' ,
            defaults :
            {
                heading : 'Compte rendu de visite' ,
                body    : 'Le site a été visité ce matin. Les travaux de la cour sont terminés et conformes au devis.\n\nReste à poser la signalétique de l’entrée, prévue la semaine prochaine. Aucune réserve.' ,
            } ,
            fileName : 'compte-rendu.pdf' ,
        } ,

        sheet :
        {
            title : 'Une planche d’étiquettes' ,
            text  : 'Un A4 d’étiquettes autocollantes 99,1 × 38,1 mm, 2 × 7, sur la grille d’une référence de papeterie courante : la grille est en millimètres, chaque étiquette est posée en absolu, et le code-barres de la référence est dessiné par la bibliothèque. Choisissez combien d’étiquettes : au-delà de quatorze, une seconde page.' ,
            count : 'Étiquettes' ,
            fileName : 'etiquettes.pdf' ,
            products :
            {
                armchair : 'Fauteuil en lin naturel' ,
                lamp     : 'Lampe à poser en laiton' ,
                throw    : 'Plaid en laine' ,
                table    : 'Table basse en chêne' ,
                vase     : 'Vase en grès' ,
                mirror   : 'Miroir rond' ,
                shelf    : 'Étagère murale' ,
            } ,
        } ,
    } ,
    en :
    {
        title : 'Creating a PDF' ,
        intro : 'The second engine, @react-pdf/renderer, writes a PDF from a React component: flexbox views, flowing text, images, SVG. It weighs 1.4 MB and is loaded only when a document is generated — never when the page opens. The same component renders in the browser, for the preview, and on the server, in a route: see the E-commerce › Invoice scenario.' ,

        engine :
        {
            ready   : '@react-pdf/renderer {0}' ,
            missing : '@react-pdf/renderer is not installed.' ,
            waiting : 'engine not loaded' ,
        } ,

        live :
        {
            title    : 'Made on the fly' ,
            text     : 'Type: the preview is generated again 300 ms after the last keystroke, in our viewer, never in an iframe. The button generates the document on click and downloads it; the QR code at the bottom is drawn by our encoders, with no dependency.' ,
            heading  : 'Title' ,
            body     : 'Text' ,
            bodyHelp : 'A blank line starts a paragraph.' ,
            defaults :
            {
                heading : 'Site visit report' ,
                body    : 'The site was visited this morning. The courtyard works are complete and match the quote.\n\nThe entrance signage remains, planned for next week. No reservations.' ,
            } ,
            fileName : 'visit-report.pdf' ,
        } ,

        sheet :
        {
            title : 'A sheet of labels' ,
            text  : 'An A4 of 99.1 × 38.1 mm self-adhesive labels, 2 × 7, on the grid of a common stationery reference: the grid is in millimetres, every label is placed absolutely, and the barcode of the reference is drawn by the library. Choose how many labels: past fourteen, a second page.' ,
            count : 'Labels' ,
            fileName : 'labels.pdf' ,
            products :
            {
                armchair : 'Natural linen armchair' ,
                lamp     : 'Brass table lamp' ,
                throw    : 'Wool throw' ,
                table    : 'Oak coffee table' ,
                vase     : 'Stoneware vase' ,
                mirror   : 'Round mirror' ,
                shelf    : 'Wall shelf' ,
            } ,
        } ,
    } ,
} ;

export default create ;
