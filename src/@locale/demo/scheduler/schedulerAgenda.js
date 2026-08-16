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
            description : "L'application tient les événements et reçoit chaque changement. Les boutons ci-dessous appellent l'API du hook directement — exactement ce que font les gestes de la grille horaire, et ce que fera l'éditeur." ,
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

        details :
        {
            title       : 'La fiche — details' ,
            description : "Consulter n'est pas modifier, et c'est le cas courant : un rendez-vous se regarde bien plus souvent qu'il ne se change. La fiche s'ouvre donc en lecture, et un bouton Modifier n'apparaît que là où les permissions l'accordent — la même coquille sert les deux, parce que deux composants partageraient le placement, l'en-tête et le pied, puis divergeraient au premier correctif. Ce qu'elle imprime vient de fields, où chaque descripteur porte la propriété qu'il lit : une propriété ajoutée côté serveur devient une ligne ici en une ligne, en lecture comme en écriture." ,
            editing     : "Modifier ouvre le formulaire dans la même coquille : le titre, les deux bornes, la journée entière, puis les champs déclarés. Rien n'est écrit avant Enregistrer — le brouillon ne touche pas l'événement, et l'abandonner ne coûte rien, ce qui est toute la différence entre un éditeur et un geste. Supprimer se confirme sur place, le bouton devient Confirmer : un modal dans un modal est une impasse. Et tracer une plage vide ouvre le même formulaire, déjà rempli de la plage — créer, c'est éditer un événement qui n'existe pas encore. Le lieu est un objet Place : un champ texte le réduirait à une chaîne, donc il est déclaré editable et servi par un select maison qui rend un vrai objet." ,
            permissions : "getEventPermissions répond à une seule question — ce que cet utilisateur peut faire de cet objet. Ici l'heure du conte est en lecture seule : sa fiche s'ouvre, mais elle ne se déplace pas et ne montre aucune poignée — les autres, si. Un même accesseur commande donc la fiche et les gestes. Attention : refuser la lecture ne masque rien — ce qui ne doit pas être vu ne doit pas être envoyé, et le tri d'autorité reste côté API." ,
            bookings    : "Quatre réservations, quatre endroits différents où se trouve la date : dans reservationFor pour le concert, startTime/endTime pour la table, checkinTime/checkoutTime pour la chambre, et pickupTime seul pour la navette. L'adaptateur les trouve toutes les quatre sans lire un seul @type — c'est la liste ordonnée de paires de datePairs qui répond, et elle s'étend pour tes propres sous-types. Ici la fiche s'ouvre en feuille par le bas : c'est la même, avec un placement différent." ,
            linked      : "Ouvre la réservation du concert et clique Modifier : les dates sont là, mais verrouillées, avec la raison écrite. Elles n'appartiennent pas à la réservation, elles appartiennent au concert — les changer replanifierait la soirée pour tous les autres réservataires. La chambre et la table, qui portent leurs propres dates, s'éditent normalement. Ce n'est pas une limite, c'est ce que dit le vocabulaire ; et le refus tient en un seul prédicat, pour le jour où un cas particulier devra l'ouvrir." ,
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
            description : 'The application holds the events and receives every change. The buttons below call the hook API directly — exactly what the gestures of the time grid do, and what the editor will do.' ,
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

        details :
        {
            title       : 'The panel — details' ,
            description : 'Consulting is not editing, and it is the common case: a booking is looked at far more often than it is changed. The panel opens in reading, and an Edit button appears only where the permissions grant it — one shell serves both, since two components would share the placement, the header and the footer, then diverge at the first fix. What it prints comes from fields, where each descriptor names the property it reads: a property added server-side becomes a row here in one line, reading and writing alike.' ,
            editing     : 'Edit opens the form in the same shell: the title, both bounds, the all-day switch, then the declared fields. Nothing is written before Save — the draft does not touch the event, and abandoning it costs nothing, which is the whole difference between an editor and a gesture. Deleting confirms in place, the button turning into Confirm: a modal inside a modal is a dead end. And drawing an empty range opens the same form, already filled with that range — creating is editing an event that does not exist yet. The location is a Place object: a text field would reduce it to a string, so it is declared editable and served by a select of our own that hands back a whole object.' ,
            permissions : 'getEventPermissions answers a single question — what this user may do with this object. Here the story hour is read-only: its panel opens, but it does not move and shows no handle — the others do. One accessor drives the panel and the gestures alike. Mind that refusing to read hides nothing: what is not to be seen is not to be sent, and the authoritative filtering stays server-side.' ,
            bookings    : 'Four reservations, four different places to keep a date: inside reservationFor for the concert, startTime/endTime for the table, checkinTime/checkoutTime for the room, and pickupTime alone for the shuttle. The adapter finds all four without reading a single @type — the ordered pair list of datePairs answers, and it extends to subtypes of your own. Here the panel opens as a bottom sheet: same panel, different placement.' ,
            linked      : 'Open the concert booking and press Edit: the dates are there, but locked, with the reason written out. They do not belong to the booking, they belong to the concert — changing them would reschedule the evening for everyone else who booked it. The room and the table, which carry their own dates, edit normally. This is not a shortcoming, it is what the vocabulary says; and the refusal is a single predicate, for the day a special case has to open it.' ,
        } ,

        mobile :
        {
            title       : 'In a phone' ,
            description : 'The same view, without a single prop of difference. It stacks because its container is narrow, not because the window is: the agenda answers to its own width, which is the only right criterion — a 360-pixel panel on a wide screen has exactly the same need as a phone.' ,
        } ,
    } ,
} ;

export default schedulerAgenda ;
