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
            title       : 'Déplacer — movable' ,
            description : "À la souris, on prend le bloc et on le pose ; au doigt, on appuie une demi-seconde puis on glisse — le temps que le geste se distingue d'un défilement. La position d'origine reste en place, grisée, un aperçu suit le pointeur, et rien n'est recalculé avant le relâché : refaire le partage des colonnes à chaque image ferait sauter le bloc sous le doigt. Le début s'aimante au quart d'heure (snapMinutes), indépendamment du pas de la grille. Échap annule, et près d'un bord la zone défile toute seule." ,
            locked      : "L'inventaire ne bouge pas : isEventMovable le refuse. Un geste qui ne ferait rien au relâché n'est pas proposé du tout — le curseur ne change même pas." ,
            recurring   : "Même règle sans qu'on ait à l'écrire : les occurrences d'une règle récurrente (le cycle d'initiation, le club de lecture) refusent le glisser, car écrire le patch déplacerait toute la série. Les événements datés de la même grille, eux, se déplacent." ,
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
            description : "Le zoom et le pas de la grille sont deux réglages distincts — comme le seront le pas de la grille et l'aimant du glisser au lot 5. Ici : 32 px/h avec un trait à l'heure, puis 64 px/h avec un trait au quart d'heure." ,
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
            title       : 'Moving — movable' ,
            description : 'With a mouse, take the block and drop it; with a finger, press for half a second and then drag — the time it takes for the gesture to tell itself apart from a scroll. The original position stays where it is, greyed, a preview follows the pointer, and nothing is laid out again before the release: re-sharing the columns on every frame would make the block jump out from under the finger. The start snaps to the quarter hour (snapMinutes), independently of the grid step. Escape cancels, and near an edge the area scrolls on its own.' ,
            locked      : 'The inventory does not move: isEventMovable refuses it. A gesture that would do nothing on release is not offered at all — even the cursor stays as it was.' ,
            recurring   : 'The same rule, without having to write it: the occurrences of a recurring rule (the initiation cycle, the reading club) refuse the drag, since writing the patch would move the whole series. The dated events of the same grid do move.' ,
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
            description : 'The zoom and the grid step are two settings, as the grid step and the drag snap will be in lot 5. Here: 32 px/h ruled at the hour, then 64 px/h ruled at the quarter.' ,
        } ,

        narrow :
        {
            title       : 'Narrow, it scrolls' ,
            description : 'The columns keep a floor and the area scrolls sideways. Squeezing seven days into a phone does not make a week readable, it makes it wrong — which is exactly why the agenda exists.' ,
        } ,
    } ,
} ;

export default schedulerWeek ;
