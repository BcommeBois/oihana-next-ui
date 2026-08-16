const schedulerWeek =
{
    fr :
    {
        title       : 'Scheduler — la grille horaire' ,
        description : "La vue où un événement cesse d'être une ligne et devient un rectangle placé : le haut vient de son début, la hauteur de sa durée, et la largeur se partage avec ce qui le recouvre. Un seul composant sert Jour et Semaine — la fenêtre dit déjà s'il y a une colonne ou sept." ,

        week :
        {
            title       : 'Semaine' ,
            description : "Trois bandes, et une seule défile : les noms de jours et la bande « journée entière » restent en place pendant que les heures glissent dessous. La grille s'ouvre sur scrollTime et non sur minuit, mais les bornes couvrent bien les 24 h — les restreindre masquerait une astreinte de nuit sans le dire." ,
        } ,

        move :
        {
            title       : 'Déplacer, étirer, créer — movable, resizable, creatable' ,
            description : "Trois gestes, trois props, toutes éteintes par défaut. Déplacer : à la souris on prend le bloc et on le pose ; au doigt on appuie une demi-seconde puis on glisse — le temps que le geste se distingue d'un défilement. Étirer : au survol, une poignée apparaît sur chaque bord réel. Créer : on trace sur une plage vide, ou on clique. Dans tous les cas la position d'origine reste en place, grisée, un aperçu suit le pointeur, et rien n'est recalculé avant le relâché — refaire le partage des colonnes à chaque image ferait sauter le bloc sous le doigt. Les bords s'aimantent au quart d'heure (snapMinutes), indépendamment du pas de la grille. Échap annule, et près d'un bord la zone défile toute seule." ,
            locked      : "L'inventaire ne bouge pas : isEventMovable le refuse. Un geste qui ne ferait rien au relâché n'est pas proposé du tout — le curseur ne change même pas, et les poignées n'apparaissent pas." ,
            create      : "Créer rapporte une plage à onEventCreate ; ici le rappel renvoie un objet, et la grille le pose. Renvoyer un objet est ce qui fait apparaître l'événement — sans retour, rien n'est ajouté et c'est à l'application de créer, ce que fera l'ouverture d'un éditeur. La librairie n'invente jamais d'identifiant : une clé inventée est une collision inventée. Un clic vaut une plage de createDuration ; tracer une durée plus courte que le pas donne le pas." ,
            recurring   : "Même règle sans qu'on ait à l'écrire : les occurrences d'une règle récurrente (le cycle d'initiation, le club de lecture) refusent le glisser comme l'étirement, car écrire le patch déplacerait toute la série. Les événements datés de la même grille, eux, se déplacent." ,
            created     : 'Nouveau' ,
        } ,

        overlap :
        {
            title       : 'Le chevauchement, enfin à l’écran' ,
            description : "layoutOverlaps est livré depuis le lot 1 et n'avait jamais rien dessiné. Jeudi, trois événements se recouvrent : ils se partagent la colonne, et celui qui n'a personne à côté de lui à un instant donné s'étend pour occuper la place libre." ,
        } ,

        day :
        {
            title       : 'Jour' ,
            description : "La même grille, une seule colonne. Rien à changer : c'est la fenêtre qui décide, pas le composant." ,
        } ,

        zoom :
        {
            title       : 'pixelsPerHour et slotDuration' ,
            description : "Le zoom et le pas de la grille sont deux réglages distincts — comme le sont le pas de la grille et l'aimant du glisser. Ici : 32 px/h avec un trait à l'heure, puis 64 px/h avec un trait au quart d'heure." ,
        } ,

        touch :
        {
            title       : 'Au doigt — interactive' ,
            description : "Une prop pour les quatre : interactive allume le déplacement, l'étirement, la création et la fiche. Les quatre et pas trois — sans la fiche, resizable promettrait à un doigt un geste qu'il ne peut pas faire, puisque les poignées font huit pixels et n'existent qu'au survol. Chacune des quatre reste prioritaire si on la passe : interactive avec resizable={ false } est un calendrier où l'on déplace sans étirer." ,
            open        : "Ouvrir. Sur téléphone la vue par défaut est l'agenda, et une ligne d'agenda ouvre désormais la fiche. C'est le seul chemin qu'un doigt ait vers une réservation : ici il n'y a ni axe où tracer, ni bord à tirer." ,
            create      : "Créer. Taper un créneau vide de la grille donne createDuration, exactement comme un clic à la souris. Un doigt qui s'attarde fait mûrir le geste sans l'avoir demandé : tant qu'il ne quitte pas le pas où il s'est posé, on lui rend un clic et non une plage d'un quart d'heure." ,
            resize      : "Redimensionner. Au doigt, ça se corrige dans le formulaire et pas au bord : ouvrir la fiche, Modifier, changer l'heure de fin. Une poignée de huit pixels au survol n'a aucun sens sur un écran tactile, et en inventer une de quatorze en cacherait le déplacement." ,
            month       : "Le mois n'a pas d'heures. Taper un jour ouvre sa fiche, et « Nouveau » y crée un événement d'une journée entière — décider qu'un rendez-vous commence à neuf heures serait une invention ; c'est le formulaire qui choisit l'heure." ,
            command     : "Et le bouton « Nouveau » de la barre : c'est la création sans pointeur, la seule que le clavier et l'agenda puissent atteindre. Elle vise la prochaine heure ronde du jour regardé, et le formulaire corrige. showCreateButton l'enlève pour qui place le sien." ,
        } ,

        narrow :
        {
            title       : 'Étroit, elle défile' ,
            description : "Les colonnes gardent une largeur plancher et la zone défile latéralement. Écraser sept jours dans un téléphone ne rend pas la semaine lisible, ça la rend fausse — c'est justement pour ça que l'agenda existe." ,
        } ,
    } ,

    en :
    {
        title       : 'Scheduler — the time grid' ,
        description : 'The view where an event stops being a row and becomes a placed rectangle: the top comes from its start, the height from its length, and the width is shared with whatever overlaps it. One component serves Day and Week — the window already says whether there is one column or seven.' ,

        week :
        {
            title       : 'Week' ,
            description : 'Three bands, and only one of them scrolls: the day names and the all-day band stay put while the hours slide under them. The grid opens on scrollTime rather than on midnight, but the bounds still cover the full day — narrowing them would hide a night shift without saying so.' ,
        } ,

        move :
        {
            title       : 'Move, stretch, create — movable, resizable, creatable' ,
            description : 'Three gestures, three props, all off by default. Move: with a mouse, take the block and drop it; with a finger, press for half a second and then drag — the time it takes for the gesture to tell itself apart from a scroll. Stretch: on hover, a handle appears on each real edge. Create: draw on an empty range, or click one. In every case the original position stays where it is, greyed, a preview follows the pointer, and nothing is laid out again before the release — re-sharing the columns on every frame would make the block jump out from under the finger. Edges snap to the quarter hour (snapMinutes), independently of the grid step. Escape cancels, and near an edge the area scrolls on its own.' ,
            locked      : 'The inventory does not move: isEventMovable refuses it. A gesture that would do nothing on release is not offered at all — the cursor stays as it was, and no handle appears.' ,
            create      : 'Creating reports a range to onEventCreate; here the callback returns an object, and the grid places it. Returning an object is what makes the event appear — return nothing and nothing is added, the creation being the application’s to make, which is what opening an editor does. The library never invents an identifier: an invented key is an invented collision. A click stands for a range of createDuration; drawing shorter than the step gives the step.' ,
            recurring   : 'The same rule, without having to write it: the occurrences of a recurring rule (the initiation cycle, the reading club) refuse the drag and the stretch alike, since writing the patch would move the whole series. The dated events of the same grid do move.' ,
            created     : 'New' ,
        } ,

        overlap :
        {
            title       : 'The overlap, finally on screen' ,
            description : 'layoutOverlaps shipped in lot 1 and had never drawn anything. On Thursday three events overlap: they share the column, and one with nobody beside it at a given moment grows into the free space.' ,
        } ,

        day :
        {
            title       : 'Day' ,
            description : 'The same grid, one column. Nothing to change: the window decides, not the component.' ,
        } ,

        zoom :
        {
            title       : 'pixelsPerHour and slotDuration' ,
            description : 'The zoom and the grid step are two settings, as the grid step and the drag snap are. Here: 32 px/h ruled at the hour, then 64 px/h ruled at the quarter.' ,
        } ,

        touch :
        {
            title       : 'On a finger — interactive' ,
            description : 'One prop for the four: interactive turns on moving, stretching, creating and the panel. The four rather than three — without the panel, resizable would promise a finger a gesture it cannot make, since the handles are eight pixels wide and only exist on hover. Each of the four still wins when passed on its own: interactive with resizable={ false } is a calendar one may move things around in but not stretch.' ,
            open        : 'Opening. On a phone the default view is the agenda, and an agenda row now opens the panel. It is the only path a finger has to a booking: there is no axis to draw on here, and no edge to pull.' ,
            create      : 'Creating. Tapping an empty slot of the grid gives createDuration, exactly as a click with a mouse does. A finger that dwells ripens the gesture without having asked for one: as long as it does not leave the step it landed in, it is given a click rather than a quarter-hour range.' ,
            resize      : 'Stretching. On a finger it is corrected in the form, not at the edge: open the panel, Edit, change the end. An eight-pixel hover handle means nothing on a touch screen, and inventing a fourteen-pixel one would hide the move underneath it.' ,
            month       : 'A month has no hours. Tapping a day opens it, and « New » there creates an all-day event — deciding that an appointment starts at nine would be an invention; the form is what picks an hour.' ,
            command     : 'And the toolbar\'s « New »: creating without a pointer, the only one a keyboard or an agenda can reach. It aims at the next whole hour of the day being looked at, and the form corrects it. showCreateButton removes it for whoever places their own.' ,
        } ,

        narrow :
        {
            title       : 'Narrow, it scrolls' ,
            description : 'The columns keep a floor and the area scrolls sideways. Squeezing seven days into a phone does not make a week readable, it makes it wrong — which is exactly why the agenda exists.' ,
        } ,
    } ,
} ;

export default schedulerWeek ;
