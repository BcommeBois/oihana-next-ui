/**
 * Copy of {@link module:demo/modals/BottomSheetDemo}.
 *
 * The rows are a generic menu on purpose : what a sheet carries belongs to the
 * product, and the demo must not suggest otherwise.
 */
const bottomSheet =
{
    fr :
    {
        title       : 'Feuille montant du bas' ,
        description : "Un panneau qui monte du bas de l'écran et se referme en le glissant vers le bas — ce qu'un menu ancré dans un coin ne peut pas être sur un appareil tenu à deux mains. Il ne porte aucun contenu : ce qui s'y pose appartient au produit." ,

        open      : 'Ouvrir la feuille' ,
        animate   : 'Jouer la montée' ,
        animateOn : 'Elle monte.' ,
        animateOff: 'Elle est simplement là — ce que doit faire une feuille apparue parce que la fenêtre a changé de taille, et non parce qu’on l’a demandée.' ,

        sheetLabel : 'Menu' ,
        heading    : 'Un en-tête, si le produit en veut un' ,
        close      : 'Fermer' ,

        rows :
        [
            'Première entrée' ,
            'Deuxième entrée' ,
            'Troisième entrée' ,
        ] ,

        hint : 'Glissez la feuille vers le bas, ou touchez à côté, ou pressez Échap : dans les trois cas elle redescend AVANT que le dialogue se ferme.' ,
    } ,

    en :
    {
        title       : 'Sheet rising from the bottom' ,
        description : 'A panel that rises from the bottom of the screen and is dismissed by swiping it down — what a menu anchored to a corner cannot be on a device held in two hands. It carries no content of its own : what goes on it belongs to the product.' ,

        open      : 'Open the sheet' ,
        animate   : 'Play the rise' ,
        animateOn : 'It rises.' ,
        animateOff: 'It is simply there — what a sheet that appeared because the window was resized should do, rather than one that was asked for.' ,

        sheetLabel : 'Menu' ,
        heading    : 'A heading, if the product wants one' ,
        close      : 'Close' ,

        rows :
        [
            'First entry' ,
            'Second entry' ,
            'Third entry' ,
        ] ,

        hint : 'Swipe the sheet down, or tap beside it, or press Escape : all three make it fall back BEFORE the dialog closes.' ,
    } ,
} ;

export default bottomSheet ;
