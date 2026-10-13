/**
 * Labels of the PDF viewer demo.
 */
const viewer =
{
    fr :
    {
        intro : 'Le moteur est pdf.js, chargé à la demande à travers react-pdf et servi par l’application sous /pdfjs/<version>/ — worker, décodeurs WebAssembly et polices, gardés en cache par le service worker. Ouvrez l’onglet Réseau : rien ne vient d’un CDN.' ,
        engine :
        {
            ready   : 'pdf.js {0}' ,
            missing : 'react-pdf n’est pas installé.' ,
            waiting : 'moteur en cours de chargement' ,
        } ,

        viewer :
        {
            title   : 'La visionneuse' ,
            text    : 'Toutes les pages dans une colonne qui défile, la page courante suivie au défilement, le zoom par paliers. Seules les pages proches de l’écran sont dessinées : les autres gardent un espace blanc de leur taille. Imprimer ouvre le document dans un onglet, où le navigateur l’imprime ; plein écran couvre la fenêtre de l’application avec la visionneuse, sans toucher au plein écran du navigateur.' ,
            fit     : 'Ajustement' ,
            fits    : { width : 'largeur' , page : 'page' , none : 'réelle' } ,
            toolbar : 'Barre d’outils' ,
            toolbars : { top : 'haut' , bottom : 'bas' , both : 'les deux' , none : 'sans' } ,
            textLayer : 'Couche texte' ,
            textHelp : 'Le texte sélectionnable par-dessus la page. Sans, le rendu est un peu plus léger.' ,
            page    : 'Page {0} sur {1}' ,
            zoom    : 'Zoom {0} %' ,
        } ,

        dropped :
        {
            title  : 'Un PDF déposé' ,
            text   : 'Un fichier déposé ou choisi s’ouvre tel quel : la visionneuse prend un File comme une adresse. Rien ne part sur le réseau. La croix de la liste le retire ; déposez-en un autre pour le remplacer.' ,
            label  : 'Déposez un PDF' ,
            helper : 'Un seul fichier, 20 Mo au plus.' ,
            empty  : 'Déposez un PDF ci-dessus pour l’ouvrir ici.' ,
        } ,

        long :
        {
            title    : 'Quarante pages' ,
            text     : 'Faites défiler : les pages se dessinent à l’approche et se libèrent en s’éloignant. Le compteur dit combien sont dessinées à cet instant.' ,
            rendered : '{0} page(s) dessinée(s) sur {1}' ,
        } ,

        secret :
        {
            title : 'Un PDF protégé' ,
            text  : 'Le document demande son mot de passe avant de s’ouvrir, et le redemande s’il est faux. Celui-ci : « oihana ».' ,
            open  : 'Ouvrir le document protégé' ,
        } ,
    } ,
    en :
    {
        intro : 'The engine is pdf.js, loaded on demand through react-pdf and served by the application under /pdfjs/<version>/ — worker, WebAssembly decoders and fonts, kept by the service worker. Open the Network tab: nothing comes from a CDN.' ,
        engine :
        {
            ready   : 'pdf.js {0}' ,
            missing : 'react-pdf is not installed.' ,
            waiting : 'engine loading' ,
        } ,

        viewer :
        {
            title   : 'The viewer' ,
            text    : 'Every page in a scrolling column, the current page followed as you scroll, zoom by steps. Only the pages near the screen are drawn: the others keep a white placeholder of their size. Print opens the document in a tab, where the browser prints it; full screen covers the application’s window with the viewer, without touching the browser’s own full screen.' ,
            fit     : 'Fit' ,
            fits    : { width : 'width' , page : 'page' , none : 'actual' } ,
            toolbar : 'Toolbar' ,
            toolbars : { top : 'top' , bottom : 'bottom' , both : 'both' , none : 'none' } ,
            textLayer : 'Text layer' ,
            textHelp : 'Selectable text over the page. Without it, drawing is a little lighter.' ,
            page    : 'Page {0} of {1}' ,
            zoom    : 'Zoom {0}%' ,
        } ,

        dropped :
        {
            title  : 'A dropped PDF' ,
            text   : 'A dropped or picked file opens as it is: the viewer takes a File like a url. Nothing goes over the network. The cross in the list removes it; drop another one to replace it.' ,
            label  : 'Drop a PDF' ,
            helper : 'One file, 20 MB at most.' ,
            empty  : 'Drop a PDF above to open it here.' ,
        } ,

        long :
        {
            title    : 'Forty pages' ,
            text     : 'Scroll: pages are drawn as they come near and freed as they go. The counter says how many are drawn right now.' ,
            rendered : '{0} page(s) drawn out of {1}' ,
        } ,

        secret :
        {
            title : 'A protected PDF' ,
            text  : 'The document asks its password before opening, and asks again when it is wrong. This one: « oihana ».' ,
            open  : 'Open the protected document' ,
        } ,
    } ,
} ;

export default viewer ;
