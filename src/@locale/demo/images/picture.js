/**
 * Labels of the lab's Picture demo.
 *
 * 🔑 **What a reader reads is here ; what the component takes is not.** The
 * `code` badges naming a prop or its value (`objectFit="cover"`,
 * `lazyRootMargin="200px"`, `fill + aspect-square`) are API and stay where
 * they are, as do the `mockup-code` samples and the `console.log` calls the
 * mock console mirrors — a sample a reader copies must read in the language
 * the code is written in.
 *
 * Keys ending in `alt` are alternative texts : never seen, always read aloud.
 * Those taking `{0}` are formatted with `fastformat`.
 */
const picture =
{
    fr :
    {
        title : 'Le composant Picture' ,

        sections :
        {
            basic      : 'Une image et son attente' ,
            masonry    : 'Une galerie en briques' ,
            lazy       : 'Le montage à l’approche du cadre' ,
            dimensions : 'Dimensions automatiques et mode « remplir »' ,
            useCases   : 'Trois mises en pratique' ,
            corners    : 'Du contenu dans les coins' ,
        } ,

        basic :
        {
            alt    : 'Un paysage au hasard' ,
            loaded : 'Chargée' ,
            reload : 'Recharger l’image' ,
        } ,

        masonry :
        {
            alt         : 'Image {0} de la galerie' ,
            description : 'Une galerie qui répartit elle-même ses images en colonnes, selon la largeur disponible.' ,
            tip         :
            {
                label : 'Astuce' ,
                text  : 'Des hauteurs différentes composent une grille qui coule, sans trou en bas des colonnes.' ,
            } ,
        } ,

        lazy :
        {
            description : 'Une image n’entre dans le DOM qu’en arrivant dans le cadre. Faites défiler pour les voir apparaître une à une.' ,
            note        : 'ne se confond pas avec le chargement différé du navigateur : le composant entier n’est pas rendu tant qu’il n’est pas visible, ce qui épargne des nœuds du DOM autant que des requêtes.' ,

            comparison :
            {
                lazyAlt    : 'Montage différé' ,
                lazyHint   : 'chargée au défilement' ,
                normal     : 'Ordinaire' ,
                normalAlt  : 'Chargement ordinaire' ,
                normalHint : 'chargée tout de suite' ,
                title      : 'Avec et sans' ,
            } ,

            grid :
            {
                alt         : 'Image différée {0}' ,
                description : 'Chaque image se monte en arrivant dans le cadre, deux cents pixels avant son bord.' ,
                title       : 'Douze images différées' ,
            } ,

            margin :
            {
                alt         : 'Marge de {0}' ,
                description : 'règle de combien de pixels avant le cadre l’image commence à se charger.' ,
                hints       :
                {
                    early    : 'bien avant' ,
                    edge     : 'au bord' ,
                    standard : 'par défaut' ,
                } ,
                title       : 'L’anticipation du chargement' ,
            } ,

            when :
            {
                items :
                {
                    galleries : { label : 'Les longues galeries' , text : 'des grilles de vingt images et plus' } ,
                    heavy     : { label : 'Les pages lourdes' , text : 'pour alléger le DOM au premier rendu' } ,
                    lists     : { label : 'Les listes infinies' , text : 'du contenu chargé au fil du défilement' } ,
                    mobile    : { label : 'Le mobile' , text : 'pour économiser la bande passante et la batterie' } ,
                } ,
                title : 'Quand s’en servir ?' ,
            } ,
        } ,

        dimensions :
        {
            fill :
            {
                alt : 'Mode remplir, {0}' ,
            } ,

            note :
            {
                label : 'Le mode « remplir »' ,
                text  : 'rend l’image élastique : elle occupe tout son parent en gardant ses proportions. Ses dimensions naturelles s’affichent en développement.' ,
            } ,

            objectFit :
            {
                alt   : 'Cadrage {0}' ,
                title : 'Les quatre cadrages' ,
            } ,
        } ,

        useCases :
        {
            dimensions :
            {
                alt     : 'Lecture des dimensions' ,
                console :
                {
                    displayed : 'la taille à laquelle elle s’affiche' ,
                    natural   : 'la taille de l’image d’origine' ,
                    title     : 'Ouvrez la console du navigateur :' ,
                    useful    : 'De quoi traiter une image, la valider, ou la mesurer' ,
                } ,
                description : 'Lire les dimensions naturelles d’une image, pour les traiter ou les afficher.' ,
                title       : 'Lire les dimensions' ,
            } ,

            gallery :
            {
                alt         : 'Image {0} de la galerie' ,
                description : 'Une grille aux proportions égales — ce que demande une planche de photos.' ,
                title       : 'Une galerie élastique' ,
            } ,

            hero :
            {
                alt         : 'Bandeau d’en-tête' ,
                description : 'Un bandeau pleine largeur, très étiré — ce que demande un en-tête.' ,
                overlay     :
                {
                    subtitle : 'Une bibliothèque de composants Next.js, libre' ,
                    title    : 'Bienvenue sur Oihana Next UI' ,
                } ,
                title       : 'Un bandeau d’en-tête' ,
            } ,

            summary :
            {
                items :
                {
                    dimensions : { label : 'Les dimensions' , text : 'onLoad donne la taille naturelle' } ,
                    gallery    : { label : 'La galerie' , text : 'une grille régulière, avec aspect-square et fill' } ,
                    hero       : { label : 'Le bandeau' , text : 'un format large, avec aspect-21/9 et priority' } ,
                } ,
                title : 'Ce qu’il faut retenir' ,
            } ,
        } ,

        corners :
        {
            description : 'N’importe quel contenu dans les quatre coins d’une image : pastilles, boutons, icônes, texte.' ,

            estate :
            {
                alt      : 'Bien immobilier' ,
                beds     : '🛏️ {0} chambres · 🚿 {1} salles de bain' ,
                featured : 'À la une' ,
                flag     : 'NOUVEAU' ,
                from     : 'À partir de' ,
            } ,

            photo :
            {
                alt   : 'Photo de galerie' ,
                likes : '{0} j’aime' ,
            } ,

            positions :
            {
                items :
                {
                    bottomLeft         : 'le coin bas gauche — un prix, une donnée' ,
                    bottomRight        : 'le coin bas droit — un état, un appel à l’action' ,
                    dimensionsPosition : 'où placer la pastille des dimensions' ,
                    showDimensions     : 'affiche les dimensions naturelles de l’image' ,
                    topLeft            : 'le coin haut gauche — une pastille, une étiquette' ,
                    topRight           : 'le coin haut droit — un bouton d’action' ,
                } ,
                title : 'Les emplacements disponibles' ,
            } ,

            product :
            {
                alt   : 'Produit' ,
                stock : 'En stock' ,
            } ,

            scenarios :
            {
                estate  : 'Une annonce immobilière' ,
                photo   : 'Une photo et ses données' ,
                product : 'Une fiche produit' ,
                video   : 'Une vignette vidéo' ,
            } ,

            video :
            {
                alt  : 'Vidéo' ,
                live : 'EN DIRECT' ,
            } ,
        } ,
    } ,

    en :
    {
        title : 'Picture examples' ,

        sections :
        {
            basic      : 'A picture and its wait' ,
            masonry    : 'A masonry gallery' ,
            lazy       : 'Mounted as the frame comes near' ,
            dimensions : 'Automatic dimensions and fill mode' ,
            useCases   : 'Three things put to use' ,
            corners    : 'Content in the corners' ,
        } ,

        basic :
        {
            alt    : 'A random landscape' ,
            loaded : 'Loaded' ,
            reload : 'Reload the image' ,
        } ,

        masonry :
        {
            alt         : 'Gallery image {0}' ,
            description : 'A gallery spreading its own images across columns, by the width it is given.' ,
            tip         :
            {
                label : 'Tip' ,
                text  : 'Differing heights make a grid that flows, with no hole at the foot of a column.' ,
            } ,
        } ,

        lazy :
        {
            description : 'An image enters the DOM only as it reaches the frame. Scroll to see them appear one at a time.' ,
            note        : 'is not the browser’s own lazy loading : the whole component goes unrendered until it is visible, which spares DOM nodes as much as requests.' ,

            comparison :
            {
                lazyAlt    : 'Lazy mount' ,
                lazyHint   : 'loaded on scroll' ,
                normal     : 'Ordinary' ,
                normalAlt  : 'Ordinary loading' ,
                normalHint : 'loaded straight away' ,
                title      : 'With it and without' ,
            } ,

            grid :
            {
                alt         : 'Lazy image {0}' ,
                description : 'Each image mounts as it reaches the frame, two hundred pixels before its edge.' ,
                title       : 'Twelve lazy images' ,
            } ,

            margin :
            {
                alt         : 'A margin of {0}' ,
                description : 'sets how many pixels before the frame the image starts loading.' ,
                hints       :
                {
                    early    : 'well before' ,
                    edge     : 'at the edge' ,
                    standard : 'the default' ,
                } ,
                title       : 'Loading ahead of time' ,
            } ,

            when :
            {
                items :
                {
                    galleries : { label : 'Long galleries' , text : 'grids of twenty images and more' } ,
                    heavy     : { label : 'Heavy pages' , text : 'to lighten the DOM on first render' } ,
                    lists     : { label : 'Endless lists' , text : 'content loaded as the reader scrolls' } ,
                    mobile    : { label : 'Mobile' , text : 'to spare bandwidth and battery' } ,
                } ,
                title : 'When is it worth it ?' ,
            } ,
        } ,

        dimensions :
        {
            fill :
            {
                alt : 'Fill mode, {0}' ,
            } ,

            note :
            {
                label : 'Fill mode' ,
                text  : 'makes the image elastic : it takes up its whole parent and keeps its proportions. Its natural dimensions show in development.' ,
            } ,

            objectFit :
            {
                alt   : 'Object fit {0}' ,
                title : 'The four object fits' ,
            } ,
        } ,

        useCases :
        {
            dimensions :
            {
                alt     : 'Reading the dimensions' ,
                console :
                {
                    displayed : 'the size it is shown at' ,
                    natural   : 'the size of the original image' ,
                    title     : 'Open the browser console to see :' ,
                    useful    : 'Enough to process an image, validate it, or measure it' ,
                } ,
                description : 'Reading an image’s natural dimensions, to process them or to show them.' ,
                title       : 'Reading the dimensions' ,
            } ,

            gallery :
            {
                alt         : 'Gallery image {0}' ,
                description : 'A grid of equal proportions — what a sheet of photographs asks for.' ,
                title       : 'An elastic gallery' ,
            } ,

            hero :
            {
                alt         : 'Header banner' ,
                description : 'A full-width banner, very wide — what a header asks for.' ,
                overlay     :
                {
                    subtitle : 'An open-source Next.js component library' ,
                    title    : 'Welcome to Oihana Next UI' ,
                } ,
                title       : 'A header banner' ,
            } ,

            summary :
            {
                items :
                {
                    dimensions : { label : 'Dimensions' , text : 'onLoad gives the natural size' } ,
                    gallery    : { label : 'The gallery' , text : 'an even grid, with aspect-square and fill' } ,
                    hero       : { label : 'The banner' , text : 'a wide format, with aspect-21/9 and priority' } ,
                } ,
                title : 'What to take away' ,
            } ,
        } ,

        corners :
        {
            description : 'Any content at all in the four corners of an image : badges, buttons, icons, text.' ,

            estate :
            {
                alt      : 'Property' ,
                beds     : '🛏️ {0} bedrooms · 🚿 {1} bathrooms' ,
                featured : 'Featured' ,
                flag     : 'NEW' ,
                from     : 'Starting at' ,
            } ,

            photo :
            {
                alt   : 'Gallery photograph' ,
                likes : '{0} likes' ,
            } ,

            positions :
            {
                items :
                {
                    bottomLeft         : 'the bottom-left corner — a price, a figure' ,
                    bottomRight        : 'the bottom-right corner — a state, a call to action' ,
                    dimensionsPosition : 'where to put the dimensions badge' ,
                    showDimensions     : 'shows the image’s natural dimensions' ,
                    topLeft            : 'the top-left corner — a badge, a label' ,
                    topRight           : 'the top-right corner — an action button' ,
                } ,
                title : 'The corners on offer' ,
            } ,

            product :
            {
                alt   : 'Product' ,
                stock : 'In stock' ,
            } ,

            scenarios :
            {
                estate  : 'A property listing' ,
                photo   : 'A photograph and its figures' ,
                product : 'A product card' ,
                video   : 'A video thumbnail' ,
            } ,

            video :
            {
                alt  : 'Video' ,
                live : 'LIVE' ,
            } ,
        } ,
    } ,
} ;

export default picture ;
