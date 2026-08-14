const schedulerAgenda =
{
    fr :
    {
        title       : 'Scheduler — la vue Agenda' ,
        description : "La coquille et sa première vue. L'agenda n'a pas d'axe de temps : un événement y est une ligne, pas un rectangle, et rien n'a besoin de tenir dans une colonne de cinquante pixels. C'est pour ça qu'il est la vue par défaut sous md." ,

        basic :
        {
            title       : 'Non contrôlé, sur le payload JSON-LD' ,
            description : "Le composant tient les événements, la vue et la date. Navigue : la série récurrente suit, les événements datés non. Un événement à cheval sur plusieurs jours apparaît dans chacun, et les morceaux qui ne sont pas de vraies extrémités le disent." ,
        } ,

        emptyDays :
        {
            title       : 'showEmptyDays' ,
            description : "Par défaut les jours vides disparaissent : un agenda liste ce qui a lieu. Activé, chaque jour de la fenêtre garde sa place — utile quand l'agenda sert de relevé plutôt que de liste." ,
        } ,

        controlled :
        {
            title       : 'Contrôlé, avec le journal des changements' ,
            description : "L'application tient les événements et reçoit chaque changement. Rien ne les déclenche encore — le déplacement arrive au lot 5 — alors les boutons ci-dessous appellent l'API du hook directement, ce qui est exactement ce que feront les gestes." ,
            move        : 'Décaler d’une heure' ,
            rename      : 'Renommer' ,
            remove      : 'Supprimer' ,
            add         : 'Ajouter un événement' ,
            reset       : 'Réinitialiser' ,
            pick        : 'Choisis un événement dans la liste ci-dessus.' ,
            log         : 'Journal des changements' ,
            empty       : 'Aucun changement pour l’instant.' ,
            newEvent    : 'Réunion improvisée' ,
            renamed     : 'Renommé' ,
        } ,

        custom :
        {
            title       : 'renderEvent' ,
            description : "Quand la carte par défaut ne suffit pas, l'événement se rend entièrement à la main. La fiche normalisée arrive en premier argument, et `source` y porte l'objet d'origine intact — ici la salle et le @type maison." ,
            room        : 'Salle' ,
        } ,

        mobile :
        {
            title       : 'Dans un téléphone' ,
            description : "La même vue, sans une prop de différence. Elle s'empile parce que son conteneur est étroit, pas parce que la fenêtre l'est : l'agenda répond à sa propre largeur, ce qui est le seul critère juste — un panneau de 360 px sur un grand écran a exactement le même besoin qu'un téléphone." ,
        } ,
    } ,

    en :
    {
        title       : 'Scheduler — the agenda view' ,
        description : 'The shell and its first view. The agenda has no time axis: an event is a row rather than a rectangle, and nothing has to fit in a fifty-pixel column. That is why it is the default view below md.' ,

        basic :
        {
            title       : 'Uncontrolled, over the JSON-LD payload' ,
            description : 'The component holds the events, the view and the date. Navigate: the recurring series follows, the dated events do not. An event spanning several days shows in each of them, and the pieces that are not real ends say so.' ,
        } ,

        emptyDays :
        {
            title       : 'showEmptyDays' ,
            description : 'Empty days are dropped by default: an agenda lists what happens. Turned on, every day of the window keeps its place — useful when the agenda is a record rather than a list.' ,
        } ,

        controlled :
        {
            title       : 'Controlled, with the change log' ,
            description : 'The application holds the events and receives every change. Nothing triggers them yet — dragging lands in lot 5 — so the buttons below call the hook API directly, which is exactly what the gestures will do.' ,
            move        : 'Shift by one hour' ,
            rename      : 'Rename' ,
            remove      : 'Delete' ,
            add         : 'Add an event' ,
            reset       : 'Reset' ,
            pick        : 'Pick an event in the list above.' ,
            log         : 'Change log' ,
            empty       : 'No change yet.' ,
            newEvent    : 'Impromptu meeting' ,
            renamed     : 'Renamed' ,
        } ,

        custom :
        {
            title       : 'renderEvent' ,
            description : 'When the default card is not enough, an event is rendered entirely by hand. The normalized record comes first, and its `source` carries the original object untouched — here the room and the house @type.' ,
            room        : 'Room' ,
        } ,

        mobile :
        {
            title       : 'In a phone' ,
            description : 'The same view, without a single prop of difference. It stacks because its container is narrow, not because the window is: the agenda answers to its own width, which is the only right criterion — a 360-pixel panel on a wide screen has exactly the same need as a phone.' ,
        } ,
    } ,
} ;

export default schedulerAgenda ;
