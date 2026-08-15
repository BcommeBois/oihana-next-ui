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
