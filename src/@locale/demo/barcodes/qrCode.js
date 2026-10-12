const qrCode =
{
    fr :
    {
        playground :
        {
            title       : 'Essayer' ,
            note        : 'Tapez un texte : le code se redessine à chaque frappe. Scannez-le avec un téléphone pour vérifier ce qu’il contient.' ,
            label       : 'Contenu' ,
            value       : 'https://oihana-next-ui.vercel.app' ,
            ecc         : 'Correction d’erreur' ,
            modules     : '{0} × {0} modules, marge comprise' ,
            counter     : '{0} / {1} {2}' ,
            overflow    : 'Trop long : {0} {1} au maximum à ce niveau de correction.' ,
        } ,
        modes :
        {
            numeric      : 'chiffres' ,
            alphanumeric : 'caractères (mode alphanumérique)' ,
            byte         : 'octets UTF-8' ,
        } ,
        export :
        {
            title    : 'Exporter' ,
            note     : 'Le même tracé que l’affichage, en document SVG autonome (pour une API, un fichier, un e-mail) ou en image PNG à l’échelle choisie. Le PNG demande un navigateur ; le SVG se génère partout, serveur compris.' ,
            scale    : 'Échelle du PNG (pixels par module)' ,
            svg      : 'Télécharger le SVG' ,
            png      : 'Télécharger le PNG' ,
            weight   : 'SVG : {0} caractères' ,
            pixels   : 'PNG : {0} × {0} px' ,
        } ,
        sizes :
        {
            title : 'Tailles' ,
            note  : 'Cinq tailles prédéfinies, un nombre de pixels, ou « full » pour la largeur du conteneur.' ,
            full  : 'size="full" dans un conteneur de 12 rem' ,
        } ,
        ecc :
        {
            title : 'Niveaux de correction' ,
            note  : 'Le même contenu aux quatre niveaux : plus le code supporte de dégâts, plus il compte de modules.' ,
        } ,
        colors :
        {
            title       : 'Couleurs et fond' ,
            note        : 'Le fond fait partie du code : sur une surface sombre il reste clair. Rendu transparent, le code s’inverse et beaucoup de lecteurs ne le lisent plus.' ,
            plain       : 'Par défaut' ,
            custom      : 'Couleurs libres' ,
            onDark      : 'Sur fond sombre' ,
            transparent : 'Transparent sur fond sombre (à éviter)' ,
        } ,
        quietZone :
        {
            title : 'Marge blanche' ,
            note  : 'Quatre modules par défaut, comme le demande la norme. Réduite à un, le code se lit mal dès qu’il touche un autre motif.' ,
        } ,
        contents :
        {
            title  : 'Contenus' ,
            url    : 'Une adresse' ,
            text   : 'Du texte accentué' ,
            sample : 'Été à Cœur-d’Orange — ça marche ✅' ,
            wifi   : 'Un accès Wi-Fi' ,
        } ,
        tooLong :
        {
            title  : 'Contenu trop long' ,
            note   : 'Au-delà de la capacité d’un code QR, le composant n’affiche rien et appelle onError avec une QRCodeCapacityError : le mode, la longueur, la limite et le niveau.' ,
            error  : 'onError a reçu : {0}' ,
            waiting : 'onError n’a pas encore été appelé.' ,
        } ,
    } ,

    en :
    {
        playground :
        {
            title       : 'Try it' ,
            note        : 'Type a text : the code redraws on every keystroke. Scan it with a phone to check what it holds.' ,
            label       : 'Content' ,
            value       : 'https://oihana-next-ui.vercel.app' ,
            ecc         : 'Error correction' ,
            modules     : '{0} × {0} modules, margin included' ,
            counter     : '{0} / {1} {2}' ,
            overflow    : 'Too long : {0} {1} at most at this correction level.' ,
        } ,
        modes :
        {
            numeric      : 'digits' ,
            alphanumeric : 'characters (alphanumeric mode)' ,
            byte         : 'UTF-8 bytes' ,
        } ,
        export :
        {
            title    : 'Export' ,
            note     : 'The same path as the display, as a standalone SVG document (for an API, a file, an e-mail) or as a PNG image at the chosen scale. The PNG needs a browser ; the SVG is generated anywhere, a server included.' ,
            scale    : 'PNG scale (pixels per module)' ,
            svg      : 'Download the SVG' ,
            png      : 'Download the PNG' ,
            weight   : 'SVG : {0} characters' ,
            pixels   : 'PNG : {0} × {0} px' ,
        } ,
        sizes :
        {
            title : 'Sizes' ,
            note  : 'Five preset sizes, a number of pixels, or « full » for the width of the container.' ,
            full  : 'size="full" in a 12 rem container' ,
        } ,
        ecc :
        {
            title : 'Error correction levels' ,
            note  : 'The same content at the four levels : the more damage the code survives, the more modules it counts.' ,
        } ,
        colors :
        {
            title       : 'Colours and background' ,
            note        : 'The background belongs to the code : on a dark surface it stays light. Made transparent, the code turns inverted and many scanners no longer read it.' ,
            plain       : 'Default' ,
            custom      : 'Colours of its own' ,
            onDark      : 'On a dark surface' ,
            transparent : 'Transparent on a dark surface (avoid)' ,
        } ,
        quietZone :
        {
            title : 'Quiet zone' ,
            note  : 'Four modules by default, as the standard asks. Cut down to one, the code reads poorly as soon as it touches another pattern.' ,
        } ,
        contents :
        {
            title  : 'Contents' ,
            url    : 'An address' ,
            text   : 'Accented text' ,
            sample : 'Café in Zürich — it works ✅' ,
            wifi   : 'A Wi-Fi access' ,
        } ,
        tooLong :
        {
            title  : 'Content too long' ,
            note   : 'Past the capacity of a QR code, the component renders nothing and calls onError with a QRCodeCapacityError : the mode, the length, the limit and the level.' ,
            error  : 'onError received : {0}' ,
            waiting : 'onError has not been called yet.' ,
        } ,
    } ,
} ;

export default qrCode ;
