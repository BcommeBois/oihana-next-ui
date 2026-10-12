const scanner =
{
    fr :
    {
        intro      : 'Ouvrez cette page sur un téléphone et visez les codes de la page « QR et codes-barres » affichée sur un ordinateur — ou n’importe quel code-barres d’un emballage. La caméra demande HTTPS : le lab déployé l’est. Chaque lecture est normalisée : la même valeur quel que soit le moteur, et pour un GS1-128 ses identifiants (AI) découpés. ␝ marque un séparateur GS1.' ,
        settings   : 'Réglages' ,
        active     : 'Caméra active' ,
        sound      : 'Bip et vibration' ,
        engine     : 'Moteur' ,
        engineHelp : 'auto : le détecteur natif s’il lit tout (Chrome Android, macOS), sinon ZXing. Forcer zxing reproduit, sur Android, le chemin de l’iPhone.' ,
        engines    : { auto : 'auto' , native : 'natif' , zxing : 'zxing' } ,
        formats    : 'Formats' ,
        sets       : { all : 'Tous' , qr : 'QR' , products : 'Articles' , logistics : 'Logistique' } ,
        native     : 'Natif, formats pris en charge : {0}' ,
        noNative   : 'Pas de détecteur natif dans ce navigateur.' ,
        running    : 'Moteur en marche : {0}' ,
        waiting    : 'Moteur : pas encore démarré' ,
        preload    : 'Précharger ZXing' ,
        preloadHelp : 'preloadScanner() : télécharge le moteur WebAssembly à l’avance, pour qu’un scan hors ligne le trouve en cache. Ne fait rien là où le natif suffit, sauf forcé.' ,
        preloaded  : 'ZXing est prêt.' ,
        failed     : 'Échec du préchargement.' ,
        results    : 'Codes lus' ,
        empty      : 'Aucun code lu pour l’instant.' ,
        clear      : 'Effacer' ,
        error      : 'onError : {0}' ,
    } ,

    en :
    {
        intro      : 'Open this page on a phone and aim at the codes of the « QR & barcodes » page shown on a computer — or at any barcode on a package. The camera needs HTTPS : the deployed lab has it. Every reading is normalized : the same value whichever engine read it, and for a GS1-128 its application identifiers split. ␝ marks a GS1 separator.' ,
        settings   : 'Settings' ,
        active     : 'Camera on' ,
        sound      : 'Beep and vibration' ,
        engine     : 'Engine' ,
        engineHelp : 'auto : the native detector when it reads everything (Chrome on Android, macOS), ZXing otherwise. Forcing zxing replays, on Android, the path of an iPhone.' ,
        engines    : { auto : 'auto' , native : 'native' , zxing : 'zxing' } ,
        formats    : 'Formats' ,
        sets       : { all : 'All' , qr : 'QR' , products : 'Products' , logistics : 'Logistics' } ,
        native     : 'Native, formats supported : {0}' ,
        noNative   : 'No native detector in this browser.' ,
        running    : 'Engine running : {0}' ,
        waiting    : 'Engine : not started yet' ,
        preload    : 'Preload ZXing' ,
        preloadHelp : 'preloadScanner() : fetches the WebAssembly engine ahead of need, so an offline scan finds it cached. Does nothing where the native one is enough, unless forced.' ,
        preloaded  : 'ZXing is ready.' ,
        failed     : 'The preload failed.' ,
        results    : 'Codes read' ,
        empty      : 'No code read yet.' ,
        clear      : 'Clear' ,
        error      : 'onError : {0}' ,
    } ,
} ;

export default scanner ;
