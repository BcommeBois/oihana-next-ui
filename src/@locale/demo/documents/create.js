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

        markdown :
        {
            title    : 'Depuis du Markdown' ,
            text     : 'Le texte d’un champ Markdown — une description, des conditions générales, un compte rendu — devient un PDF sans écrire de gabarit : titres, gras, italique, listes imbriquées, cases à cocher, citations, code, liens, images PNG ou JPEG, tables. Le parseur est celui de l’écran (GFM) ; les colonnes d’une table prennent la place de leur contenu. MarkdownDocument fait les pages et leur numéro ; PdfMarkdown pose le même bloc dans un gabarit à vous.' ,
            field    : 'Markdown' ,
            help     : 'L’HTML brut et les notes de bas de page ne sont pas rendus : un PDF n’a pas de DOM. Une image SVG laisse son texte alternatif.' ,
            fileName : 'compte-rendu.pdf' ,
            page     : 'Page {0} / {1}' ,
            sample   : `# Compte rendu de chantier

Visite du **12 octobre** sur le site de la rue des Lilas, en présence du maître d’ouvrage et du conducteur de travaux. L’avancement est *conforme au planning*, à une réserve près.

## Avancement

| Lot | Avancement | Reste à faire |
|:---|---:|:---|
| Gros œuvre | 100 % | — |
| Menuiseries extérieures | 80 % | Porte d’entrée, livraison le 20 |
| Électricité | 45 % | Tableau, prises de l’étage |
| Peinture | 0 % | Après le ~~15~~ 22 octobre |

## Points relevés

1. La dalle de la cour est **terminée** et conforme au devis.
2. La signalétique de l’entrée reste à poser :
   - le panneau principal est livré,
   - les lettres découpées arrivent la semaine prochaine.
3. Un câble passe en diagonale dans le couloir : à reprendre avant la peinture.

## Décisions

- [x] Valider le coloris des menuiseries (RAL 7016)
- [x] Commander la porte d’entrée
- [ ] Planifier la réception des peintures

> La réserve sur le câble du couloir est à lever sous huit jours ; le peintre ne commencera pas avant.

Référence du chantier : \`CH-2026-0042\`. Les photos sont dans le dossier partagé : [espace du chantier](https://oihana-next-ui.vercel.app/modules/documentsCreate).

---

![Logo](/assets/icons/logo.png)
` ,
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

        markdown :
        {
            title    : 'From Markdown' ,
            text     : 'The text of a Markdown field — a description, terms, a report — becomes a PDF with no template to write: headings, bold, italic, nested lists, task lists, quotes, code, links, PNG or JPEG images, tables. The parser is the screen’s (GFM); a table’s columns take the room of their content. MarkdownDocument makes the pages and their numbers; PdfMarkdown puts the same block in a template of yours.' ,
            field    : 'Markdown' ,
            help     : 'Raw HTML and footnotes are not rendered: a PDF has no DOM. An SVG image leaves its alt text.' ,
            fileName : 'site-report.pdf' ,
            page     : 'Page {0} / {1}' ,
            sample   : `# Site report

Visit of **12 October** to the Lilas street site, with the client and the site manager. Progress is *on schedule*, with one reservation.

## Progress

| Work package | Progress | Remaining |
|:---|---:|:---|
| Structure | 100% | — |
| External joinery | 80% | Front door, delivered on the 20th |
| Electrics | 45% | Panel, upstairs sockets |
| Painting | 0% | After ~~15~~ 22 October |

## Findings

1. The courtyard slab is **complete** and matches the quote.
2. The entrance signage remains:
   - the main panel is delivered,
   - the cut letters arrive next week.
3. A cable runs across the corridor: to be rerouted before painting.

## Decisions

- [x] Approve the joinery colour (RAL 7016)
- [x] Order the front door
- [ ] Schedule the painting handover

> The corridor cable reservation is to be lifted within eight days; the painter will not start before.

Site reference: \`CH-2026-0042\`. Photos are in the shared folder: [site workspace](https://oihana-next-ui.vercel.app/modules/documentsCreate).

---

![Logo](/assets/icons/logo.png)
` ,
        } ,
    } ,
} ;

export default create ;
