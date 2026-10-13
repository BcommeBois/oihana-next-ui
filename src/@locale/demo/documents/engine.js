/**
 * Labels of the PDF engine demo.
 */
const engine =
{
    fr :
    {
        intro    : 'Le moteur est pdf.js, chargé à la demande à travers react-pdf. Son worker, ses décodeurs WebAssembly et ses polices sont servis par l’application sous /pdfjs/<version>/ — copiés au build par oihana-copy-pdfjs-assets, gardés en cache par le service worker. Ouvrez l’onglet Réseau : rien ne vient d’un CDN.' ,
        waiting  : 'Moteur : pas encore chargé' ,
        ready    : 'Moteur prêt : pdf.js {0}, servi depuis {1}' ,
        missing  : 'react-pdf n’est pas installé.' ,
        sample   : 'La première page d’un PDF d’exemple' ,
        sampleHelp : 'Le fichier public/documents/sample.pdf, rendu par <Document> et <Page>. La visionneuse complète — toutes les pages, le zoom, la barre d’outils — vient au lot suivant.' ,
        open     : 'Ouvrir le PDF dans un onglet' ,
        pages    : '{0} page(s)' ,
    } ,
    en :
    {
        intro    : 'The engine is pdf.js, loaded on demand through react-pdf. Its worker, WebAssembly decoders and fonts are served by the application under /pdfjs/<version>/ — copied at build time by oihana-copy-pdfjs-assets, kept by the service worker. Open the Network tab: nothing comes from a CDN.' ,
        waiting  : 'Engine: not loaded yet' ,
        ready    : 'Engine ready: pdf.js {0}, served from {1}' ,
        missing  : 'react-pdf is not installed.' ,
        sample   : 'The first page of a sample PDF' ,
        sampleHelp : 'The file public/documents/sample.pdf, drawn by <Document> and <Page>. The full viewer — every page, zoom, a toolbar — comes with the next lot.' ,
        open     : 'Open the PDF in a tab' ,
        pages    : '{0} page(s)' ,
    } ,
} ;

export default engine ;
