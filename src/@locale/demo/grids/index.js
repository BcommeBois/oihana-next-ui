/**
 * Labels of the grid demos.
 */
const grids =
{
    cellGrid :
    {
        fr :
        {
            intro : 'Un plan fait de cellules : les emplacements d’une allée, les sièges d’une salle, les places d’un parking. La bibliothèque ne sait pas ce qu’est une cellule — la page donne les états et leurs couleurs. On pince pour zoomer, on glisse pour se déplacer, les flèches parcourent le plan, et chaque cellule se lit « A-07, Plein, 12 ».' ,

            aisle :
            {
                title    : 'Une allée' ,
                text     : '6 niveaux × 20 positions, un couloir à la colonne 11. Sélection simple, multiple, ou aucune ; pincez / Ctrl + molette / les boutons pour zoomer, glissez pour déplacer — un tap reste un tap.' ,
                mode     : 'Sélection' ,
                modes    : { single : 'simple' , multiple : 'multiple' , none : 'aucune' } ,
                zoom     : 'zoom {0} %' ,
                selected : 'sélection : {0}' ,
                none     : 'rien de sélectionné' ,
                keys     : 'Au clavier :' ,
                zoomKeys : '· zoom :' ,
                wheel    : 'molette' ,
                states   : { blocked : 'Bloqué' , free : 'Libre' , full : 'Plein' , reserved : 'Réservé' } ,
            } ,

            hall :
            {
                title  : 'Une salle' ,
                text   : 'Une scène sur toute la largeur (span, désactivée), une allée centrale, des sièges pris (disabled : visibles, mais ni sélectionnables ni atteignables aux flèches) et libres : choisissez les vôtres — deux sont déjà choisis par la page (value). renderCell dessine le contenu, l’état « choisi » vient de la page.' ,
                pick   : 'Touchez des sièges libres.' ,
                chosen : '{0} siège(s) choisi(s).' ,
                states : { chosen : 'Choisi' , free : 'Libre' , stage : 'Scène' , taken : 'Pris' } ,
            } ,

            park :
            {
                title  : 'Un parking' ,
                text   : 'Sans zoom ni sélection, des cellules plus larges, et l’immatriculation dessinée par renderCell.' ,
                states : { free : 'Libre' , taken : 'Occupée' } ,
            } ,
        } ,
        en :
        {
            intro : 'A plan made of cells: the bins of an aisle, the seats of a hall, the bays of a car park. The library does not know what a cell is — the page gives the states and their colours. Pinch to zoom, drag to move, the arrows walk the plan, and every cell reads « A-07, Full, 12 ».' ,

            aisle :
            {
                title    : 'An aisle' ,
                text     : '6 levels × 20 positions, a corridor at column 11. Single, multiple or no selection; pinch / Ctrl + wheel / the buttons to zoom, drag to move — a tap stays a tap.' ,
                mode     : 'Selection' ,
                modes    : { single : 'single' , multiple : 'multiple' , none : 'none' } ,
                zoom     : 'zoom {0}%' ,
                selected : 'selected: {0}' ,
                none     : 'nothing selected' ,
                keys     : 'Keyboard:' ,
                zoomKeys : '· zoom:' ,
                wheel    : 'wheel' ,
                states   : { blocked : 'Blocked' , free : 'Free' , full : 'Full' , reserved : 'Reserved' } ,
            } ,

            hall :
            {
                title  : 'A hall' ,
                text   : 'A stage across the top (span, disabled), a central aisle, seats taken (disabled: visible, but neither selectable nor reached by the arrows) and free: choose yours — two are already chosen by the page (value). renderCell draws the content, the « chosen » state comes from the page.' ,
                pick   : 'Touch free seats.' ,
                chosen : '{0} seat(s) chosen.' ,
                states : { chosen : 'Chosen' , free : 'Free' , stage : 'Stage' , taken : 'Taken' } ,
            } ,

            park :
            {
                title  : 'A car park' ,
                text   : 'No zoom, no selection, wider cells, and the plate drawn by renderCell.' ,
                states : { free : 'Free' , taken : 'Taken' } ,
            } ,
        } ,
    } ,
} ;

export default grids ;
