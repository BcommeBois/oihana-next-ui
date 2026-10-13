/**
 * Default labels of the document components (`components/documents`).
 *
 * The words of a viewer's toolbar, of its states — loading, failed, empty,
 * engine missing — and of the password it may have to ask for. `page` and
 * `of` frame the page field : « Page 2 of 12 ».
 */
const document =
{
    fr :
    {
        download       : 'Télécharger' ,
        empty          : 'Aucun document' ,
        exitFullscreen : 'Quitter le plein écran' ,
        failed         : 'Le document n’a pas pu être ouvert.' ,
        first          : 'Première page' ,
        fitNone        : 'Taille réelle' ,
        fitPage        : 'Page entière' ,
        fitWidth       : 'Ajuster à la largeur' ,
        fullscreen     : 'Plein écran' ,
        last           : 'Dernière page' ,
        loading        : 'Ouverture du document…' ,
        missing        : 'Le moteur de documents n’est pas installé.' ,
        next           : 'Page suivante' ,
        of             : 'sur {0}' ,
        open           : 'Ouvrir dans un onglet' ,
        page           : 'Page' ,
        pages          : '{0} page(s)' ,
        previous       : 'Page précédente' ,
        print          : 'Imprimer' ,
        toolbar        : 'Outils du document' ,
        zoom           : '{0} %' ,
        zoomIn         : 'Agrandir' ,
        zoomOut        : 'Réduire' ,

        password :
        {
            agree : 'Ouvrir' ,
            label : 'Mot de passe' ,
            title : 'Ce document est protégé' ,
            wrong : 'Ce mot de passe n’ouvre pas le document.' ,
        } ,
    } ,
    en :
    {
        download       : 'Download' ,
        empty          : 'No document' ,
        exitFullscreen : 'Exit full screen' ,
        failed         : 'The document could not be opened.' ,
        first          : 'First page' ,
        fitNone        : 'Actual size' ,
        fitPage        : 'Whole page' ,
        fitWidth       : 'Fit to width' ,
        fullscreen     : 'Full screen' ,
        last           : 'Last page' ,
        loading        : 'Opening the document…' ,
        missing        : 'The document engine is not installed.' ,
        next           : 'Next page' ,
        of             : 'of {0}' ,
        open           : 'Open in a tab' ,
        page           : 'Page' ,
        pages          : '{0} page(s)' ,
        previous       : 'Previous page' ,
        print          : 'Print' ,
        toolbar        : 'Document tools' ,
        zoom           : '{0}%' ,
        zoomIn         : 'Zoom in' ,
        zoomOut        : 'Zoom out' ,

        password :
        {
            agree : 'Open' ,
            label : 'Password' ,
            title : 'This document is protected' ,
            wrong : 'This password does not open the document.' ,
        } ,
    } ,
} ;

export default document ;
