const barcode =
{
    fr :
    {
        playground :
        {
            title  : 'Essayer' ,
            note   : 'Choisissez un format, tapez un contenu : le code se redessine à chaque frappe. Scannez-le avec un téléphone (Google Lens, l’appareil photo) pour vérifier ce qu’il contient.' ,
            format : 'Format' ,
            label  : 'Contenu' ,
            text   : 'Texte' ,
            width  : '{0} modules de large' ,
        } ,
        textModes :
        {
            retail : 'commerce' ,
            simple : 'simple' ,
            none   : 'aucun' ,
        } ,
        reasons :
        {
            empty      : 'Rien à encoder.' ,
            characters : 'Ce caractère n’est pas permis ici : des chiffres seulement en EAN, UPC, ITF-14 et dans les identifiants GS1 numériques ; de l’ASCII seulement en Code 128 ; le jeu de caractères GS1 en GS1-128.' ,
            length     : 'Mauvais nombre de chiffres : {0} ou {1} attendus, {2} saisis.' ,
            lengthOne  : 'Mauvaise longueur : {0} attendus au plus (ou exactement), {1} saisis.' ,
            syntax     : 'Écrivez chaque identifiant entre parenthèses, suivi de sa donnée : (01)09501101530003(10)LOT-42.' ,
            checkDigit : 'Le chiffre de contrôle devrait être {0}, pas {1}.' ,
            format     : 'Format inconnu.' ,
        } ,
        export :
        {
            title : 'Exporter' ,
            note  : 'Le même symbole que l’affichage, texte compris : en SVG autonome (partout, serveur compris) ou en PNG à l’échelle choisie (navigateur).' ,
            scale : 'Échelle (pixels par module)' ,
            svg   : 'Télécharger le SVG' ,
            png   : 'Télécharger le PNG' ,
        } ,
        sizes :
        {
            title : 'Tailles' ,
            note  : 'Chaque taille fixe la largeur d’un module, en pixels entiers pour des barres nettes, et la hauteur des barres. « full » prend la largeur du conteneur.' ,
            full  : 'size="full" dans un conteneur de 16 rem' ,
        } ,
        margins :
        {
            title : 'Marge verticale' ,
            note  : 'La norme n’impose pas de marge en haut et en bas : celle-ci est pour l’œil, 6 modules par défaut. Un nombre pour les deux, ou { top , bottom }. Les marges de côté, elles, sont celles du format (quietZone).' ,
        } ,
        formats :
        {
            title : 'Les six formats' ,
            note  : 'EAN-13 et EAN-8 pour les articles, UPC-A pour l’Amérique du Nord (les mêmes barres qu’un EAN-13 commençant par 0), Code 128 pour tout texte ASCII, GS1-128 pour les étiquettes logistiques, ITF-14 pour les cartons.' ,
        } ,
        gs1 :
        {
            title    : 'GS1-128 : les étiquettes logistiques' ,
            note     : 'Un Code 128 qui porte des identifiants GS1 entre parenthèses : (00) le SSCC d’une palette, (01) le GTIN de l’article, (10) le lot, (17) la péremption… Les longueurs fixes et les chiffres de contrôle sont vérifiés ; un séparateur est placé après chaque identifiant à longueur variable. Un scanner le rapporte comme code_128.' ,
            spaced   : 'espacé' ,
            compact  : 'compact' ,
            captions : [ 'SSCC d’une palette' , 'GTIN, péremption, lot' , 'GTIN contenu, quantité, commande' ] ,
        } ,
        itf :
        {
            title   : 'ITF-14 : les cartons' ,
            note    : 'Le code des unités logistiques, imprimé en grand sur le carton : barres larges 2,5 fois plus larges que les fines, et un cadre (barres de support) qui protège la lecture quand l’impression bave. Un scanner le rapporte comme itf.' ,
            bearers : { frame : 'cadre' , bars : 'haut et bas' , none : 'aucun' } ,
        } ,
        layouts :
        {
            title  : 'Présentation du texte' ,
            note   : 'En présentation commerce, les barres de garde descendent plus bas et chaque chiffre se place sous ses barres ; le premier chiffre d’un EAN-13 est dans la marge, les deux chiffres extérieurs d’un UPC-A sont plus petits.' ,
        } ,
        typeface :
        {
            title  : 'Le texte : taille, police, graisse, couleur' ,
            note   : 'Réglé par props et jamais par CSS, pour que les exports suivent. En présentation commerce, textScale reste entre 0,5 et 1,2 ; les chiffres se chevaucheraient au-delà. Le texte n’est jamais lu par le scanner : changer la police ne change rien aux barres.' ,
            font   : 'Police' ,
            weight : 'Graisse' ,
            normal : 'normale' ,
            bold   : 'grasse' ,
            fonts  : { mono : 'monospace' , sans : 'sans empattements' , serif : 'à empattements' } ,
        } ,
        code128 :
        {
            title : 'Code 128 : le jeu C pour les chiffres' ,
            note  : 'Le jeu C range deux chiffres par symbole : une suite de chiffres assez longue y bascule, et le code raccourcit.' ,
            width : '{0} modules' ,
        } ,
        checkDigit :
        {
            title     : 'Chiffre de contrôle' ,
            completed : '12 chiffres : le 13ᵉ est calculé' ,
            refused   : '4006381333930 : refusé' ,
            waiting   : 'onError n’a pas encore été appelé.' ,
            error     : 'onError a reçu : {0}' ,
        } ,
        colors :
        {
            title  : 'Sur fond sombre' ,
            note   : 'Le fond fait partie du code : il reste clair quel que soit le thème.' ,
        } ,
    } ,

    en :
    {
        playground :
        {
            title  : 'Try it' ,
            note   : 'Pick a format, type a content : the code redraws on every keystroke. Scan it with a phone (Google Lens, the camera app) to check what it holds.' ,
            format : 'Format' ,
            label  : 'Content' ,
            text   : 'Text' ,
            width  : '{0} modules wide' ,
        } ,
        textModes :
        {
            retail : 'retail' ,
            simple : 'simple' ,
            none   : 'none' ,
        } ,
        reasons :
        {
            empty      : 'Nothing to encode.' ,
            characters : 'That character is not allowed here : digits only in EAN, UPC, ITF-14 and the numeric GS1 identifiers ; ASCII only in Code 128 ; the GS1 character set in GS1-128.' ,
            length     : 'Wrong number of digits : {0} or {1} expected, {2} typed.' ,
            lengthOne  : 'Wrong length : {0} expected at most (or exactly), {1} typed.' ,
            syntax     : 'Write every identifier in parentheses, followed by its data : (01)09501101530003(10)LOT-42.' ,
            checkDigit : 'The check digit should be {0}, not {1}.' ,
            format     : 'Unknown format.' ,
        } ,
        export :
        {
            title : 'Export' ,
            note  : 'The same symbol as the display, text included : as a standalone SVG (anywhere, a server included) or as a PNG at the chosen scale (browser).' ,
            scale : 'Scale (pixels per module)' ,
            svg   : 'Download the SVG' ,
            png   : 'Download the PNG' ,
        } ,
        sizes :
        {
            title : 'Sizes' ,
            note  : 'Each size sets the width of a module, in whole pixels for sharp bars, and the height of the bars. « full » takes the width of the container.' ,
            full  : 'size="full" in a 16 rem container' ,
        } ,
        margins :
        {
            title : 'Vertical margin' ,
            note  : 'The standard asks for no margin above and below : this one is for the eye, 6 modules by default. One number for both, or { top , bottom }. The side margins are the format’s own (quietZone).' ,
        } ,
        formats :
        {
            title : 'The six formats' ,
            note  : 'EAN-13 and EAN-8 for products, UPC-A for North America (the bars of an EAN-13 starting with 0), Code 128 for any ASCII text, GS1-128 for logistics labels, ITF-14 for cartons.' ,
        } ,
        gs1 :
        {
            title    : 'GS1-128 : logistics labels' ,
            note     : 'A Code 128 carrying GS1 identifiers in parentheses : (00) the SSCC of a pallet, (01) the GTIN of the product, (10) the lot, (17) the expiry… Fixed lengths and check digits are verified ; a separator follows every identifier of variable length. A scanner reports it as code_128.' ,
            spaced   : 'spaced' ,
            compact  : 'compact' ,
            captions : [ 'SSCC of a pallet' , 'GTIN, expiry, lot' , 'Contained GTIN, count, order' ] ,
        } ,
        itf :
        {
            title   : 'ITF-14 : cartons' ,
            note    : 'The code of trade units, printed large on the carton : wide bars 2.5 times the narrow ones, and a frame (bearer bars) that keeps it readable when the print bleeds. A scanner reports it as itf.' ,
            bearers : { frame : 'frame' , bars : 'top and bottom' , none : 'none' } ,
        } ,
        layouts :
        {
            title  : 'Text layout' ,
            note   : 'In the retail layout, the guard bars run lower and every digit sits under its own bars ; the first digit of an EAN-13 lives in the margin, the two outer digits of a UPC-A are smaller.' ,
        } ,
        typeface :
        {
            title  : 'The text : size, face, weight, colour' ,
            note   : 'Set through props and never through CSS, so the exports follow. In the retail layout, textScale stays between 0.5 and 1.2 ; beyond, the digits would overlap. A scanner never reads the text : changing the face changes nothing in the bars.' ,
            font   : 'Face' ,
            weight : 'Weight' ,
            normal : 'normal' ,
            bold   : 'bold' ,
            fonts  : { mono : 'monospace' , sans : 'sans-serif' , serif : 'serif' } ,
        } ,
        code128 :
        {
            title : 'Code 128 : set C for digits' ,
            note  : 'Set C packs two digits per symbol : a long enough run of digits switches to it, and the code gets shorter.' ,
            width : '{0} modules' ,
        } ,
        checkDigit :
        {
            title     : 'Check digit' ,
            completed : '12 digits : the 13th is computed' ,
            refused   : '4006381333930 : refused' ,
            waiting   : 'onError has not been called yet.' ,
            error     : 'onError received : {0}' ,
        } ,
        colors :
        {
            title  : 'On a dark surface' ,
            note   : 'The background belongs to the code : it stays light whatever the theme.' ,
        } ,
    } ,
} ;

export default barcode ;
