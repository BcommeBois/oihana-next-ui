const schedulerMonth =
{
    fr :
    {
        title       : 'Scheduler — la vue Mois' ,
        description : "Six semaines, toujours, et des événements posés sur des rails. Une exposition du 10 au 16 se lit comme une seule barre traversant la semaine — pas comme sept puces. C'est ce qui distingue cette vue de l'agenda, et ce qui lui vaut son propre algorithme de placement." ,

        basic :
        {
            title       : 'La grille' ,
            description : "Le sélecteur de vues apparaît enfin : deux vues, et la coquille sait dimensionner leurs fenêtres. Les barres multi-jours perdent leur coin et leur filet au bord de la semaine, pour qu'un séjour à cheval sur un dimanche se lise comme une seule durée sur deux lignes." ,
        } ,

        overflow :
        {
            title       : 'maxEventsPerDay et le « +N de plus »' ,
            description : "Une case ne peut montrer qu'un nombre fini de rails. Au-delà, la barre n'est pas dessinée et chaque jour qu'elle couvrait compte un événement caché — le décompte est par jour, pas par semaine, parce que deux jours d'une même ligne en cachent rarement autant. Le nombre est calculé, pas mesuré : mesurer coûte une passe de rendu et se trompe sur la première." ,
            three       : 'maxEventsPerDay = 3 (défaut)' ,
            one         : 'maxEventsPerDay = 1' ,
        } ,

        popover :
        {
            title       : 'Le jour, en Popover' ,
            description : "Un clic sur une case ouvre sa journée entière — les événements cachés compris, parce qu'une liste ne montrant que le débordement obligerait à recomposer le jour de tête. Dropdown sur grand écran, positionné par useDropdownPosition selon la place disponible, et modal plein écran sur mobile." ,
        } ,

        narrow :
        {
            title       : 'Étroit, elle cesse de nommer' ,
            description : "Sept colonnes réclament une centaine de pixels chacune avant qu'un titre veuille dire quelque chose. En dessous — une container query, donc un panneau étroit sur grand écran se comporte comme un téléphone — les cases affichent des points de densité et c'est la case entière qui ouvre le jour. Une meilleure cible au doigt qu'un « +2 » de huit pixels." ,
        } ,
    } ,

    en :
    {
        title       : 'Scheduler — the month view' ,
        description : 'Six weeks, always, with events laid on rails. An exhibition running from the 10th to the 16th reads as one bar crossing the week — not as seven chips. That is what sets this view apart from the agenda, and what earns it a placement algorithm of its own.' ,

        basic :
        {
            title       : 'The grid' ,
            description : 'The view switcher finally appears: two views, and the shell already knows how to size their windows. Multi-day bars lose their corner and their rule at the edge of a week, so a stay crossing a Sunday reads as one span over two rows.' ,
        } ,

        overflow :
        {
            title       : 'maxEventsPerDay and the « +N more »' ,
            description : 'A cell can only show so many rails. Past that, a bar is not drawn and every day it covered counts one hidden event — the count is per day rather than per week, since two days of the same row rarely hide the same number. The figure is computed, not measured: measuring costs a render pass and gets the first one wrong.' ,
            three       : 'maxEventsPerDay = 3 (default)' ,
            one         : 'maxEventsPerDay = 1' ,
        } ,

        popover :
        {
            title       : 'The day, in a Popover' ,
            description : 'Clicking a cell opens its whole day — hidden events included, because a list showing only the overflow would make the reader rebuild the day in their head. A dropdown on a wide screen, placed by useDropdownPosition according to the room available, and a fullscreen modal on a phone.' ,
        } ,

        narrow :
        {
            title       : 'Narrow, it stops naming things' ,
            description : 'Seven columns need roughly a hundred pixels each before a title is worth printing. Below that — a container query, so a narrow panel on a wide screen behaves like a phone — the cells show density dots and the whole cell opens the day. A better target for a finger than an eight-pixel « +2 ».' ,
        } ,
    } ,
} ;

export default schedulerMonth ;
