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

        narrow :
        {
            title       : 'Narrow, it scrolls' ,
            description : 'The columns keep a floor and the area scrolls sideways. Squeezing seven days into a phone does not make a week readable, it makes it wrong — which is exactly why the agenda exists.' ,
        } ,
    } ,
} ;

export default schedulerWeek ;
