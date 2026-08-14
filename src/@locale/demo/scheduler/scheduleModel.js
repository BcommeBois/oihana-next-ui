/**
 * Labels of the schedule model demo.
 *
 * `cases` is keyed by the id of each fixture entry : the payload carries the
 * data, the locale carries what that entry is there to prove. Keeping the two
 * apart is what lets the fixture stay a plain payload rather than a payload with
 * English prose baked into it.
 */
const scheduleModel =
{
    fr :
    {
        title       : 'fromSchemaList — du JSON-LD en entrée, des fiches en sortie' ,
        description : "Onze entrées volontairement pénibles : des instants et des dates nues, une durée sans date de fin, une séance annulée, un type maison qui porte byDay, une règle imbriquée dans eventSchedule, une série programmée sur aucun jour, une autre sur les jours fériés, et une référence de salle encodée à zéro. Rien dans les helpers ne connaît le nom d'un seul de ces types." ,

        toolbar :
        {
            previous  : '‹ Semaine' ,
            anchor    : 'Semaine du jeu de test' ,
            next      : 'Semaine ›' ,
            inclusive : 'allDayEndInclusive' ,
        } ,

        counts :
        {
            sources     : 'sources' ,
            occurrences : 'occurrences dans la fenêtre' ,
            segments    : 'segments après découpe par jour' ,
        } ,

        table :
        {
            id          : 'id' ,
            title       : 'titre' ,
            start       : 'début' ,
            end         : 'fin' ,
            allDay      : 'journée' ,
            resource    : 'salle' ,
            status      : 'statut' ,
            color       : 'couleur' ,
            type        : '@type de la source' ,
            allDayBadge : 'jour' ,
            noResource  : 'aucune' ,
            scheduled   : 'scheduled' ,
            empty       : 'Aucune occurrence cette semaine.' ,
        } ,

        produced :
        {
            title       : "Ce que les sources n'ont pas produit" ,
            description : "Une source qui ne donne aucune occurrence n'est pas forcément une erreur — et c'est justement ce qu'il faut pouvoir vérifier." ,
        } ,

        cases :
        {
            'concert-rentree'   : 'startDate et endDate en instants, salle déjà résolue en objet Place.' ,
            'heure-du-conte'    : "Aucune date de fin : la longueur vient d'une durée ISO 8601. La salle est une référence brute." ,
            'expo-photo'        : "Dates nues, donc journée entière. Que le 16 soit couvert ou non, c'est allDayEndInclusive qui le décide." ,
            'atelier-numerique' : 'Annulée : le statut survit jusque dans la fiche, de quoi la barrer à l’affichage.' ,
            'rencontre-auteur'  : "Replanifiée, et elle dit où elle était : de quoi dessiner le fantôme de l'ancien créneau." ,
            'ws-initiation'     : "Un type maison dont les helpers ignorent tout. Il s'étend parce qu'il porte byDay — et exceptDate retire le jeudi." ,
            'club-lecture'      : "La règle est imbriquée sous eventSchedule, que schema.org autorise à se répéter d'où le tableau. Premier mercredi du mois." ,
            'ws-ecriture'       : "byDay est un tableau vide : la série existe mais ne tourne aucun jour. Ce n'est pas la même chose que ne rien dire de ses jours." ,
            'ws-permanence'     : "PublicHolidays est un membre légal de DayOfWeek et n'est pas un jour de la semaine. Écarté, avec un avertissement en développement." ,
            'projection'        : 'Une référence de salle à zéro, comme les back-offices encodent « aucune ». Elle ne doit pas devenir une ligne nommée 0.' ,
            'fermeture'         : 'Une date nue et rien d’autre : journée entière, longue d’un jour.' ,
        } ,

        layout :
        {
            title       : 'layoutOverlaps — le partage de la largeur' ,
            description : "Les positions sortent en fractions de la colonne, jamais en pixels : la vue les multiplie par la largeur dont elle dispose. Un événement seul en vol prend toute la place, deux qui se recouvrent se la partagent." ,
            column      : 'col' ,
        } ,

        patch :
        {
            title       : 'Le retour — toSchemaPatch' ,
            description : "L'adaptateur va dans les deux sens ou il ne sert à rien. Voici le fragment que produirait un déplacement, prêt à être renvoyé à l'API — un patch, jamais un objet reconstruit. Sur une journée entière, la fin exclusive tenue en interne est ramenée au dernier jour couvert : lire puis réécrire ne doit rien changer." ,
            occurrence  : 'occurrence' ,
        } ,

        scale :
        {
            title       : "createTimeScale — l'axe" ,
            description : "Une seule arithmétique pour la grille horaire et pour le timeline : ils ne diffèrent que par l'axe sur lequel elle est projetée. Ici, 08:00 → 22:00 à 48 pixels par heure." ,
            size        : 'hauteur' ,
            length      : '1 h 30' ,
            snap        : 'aimant 09:22' ,
        } ,
    } ,

    en :
    {
        title       : 'fromSchemaList — JSON-LD in, records out' ,
        description : 'Eleven deliberately awkward entries go in: instants and bare dates, a duration with no end date, a cancelled session, a house type carrying byDay, a rule nested under eventSchedule, a series scheduled on no day at all, one scheduled on public holidays, and a room reference encoded as a zero. Nothing in the helpers knows the name of a single one of those types.' ,

        toolbar :
        {
            previous  : '‹ Week' ,
            anchor    : 'Week of the fixture' ,
            next      : 'Week ›' ,
            inclusive : 'allDayEndInclusive' ,
        } ,

        counts :
        {
            sources     : 'sources' ,
            occurrences : 'occurrences in the window' ,
            segments    : 'segments once cut into days' ,
        } ,

        table :
        {
            id          : 'id' ,
            title       : 'title' ,
            start       : 'start' ,
            end         : 'end' ,
            allDay      : 'all-day' ,
            resource    : 'room' ,
            status      : 'status' ,
            color       : 'color' ,
            type        : 'source @type' ,
            allDayBadge : 'day' ,
            noResource  : 'none' ,
            scheduled   : 'scheduled' ,
            empty       : 'No occurrence this week.' ,
        } ,

        produced :
        {
            title       : 'What the sources did not produce' ,
            description : 'A source yielding no occurrence is not necessarily a mistake — and that is exactly what has to be checkable.' ,
        } ,

        cases :
        {
            'concert-rentree'   : 'startDate and endDate as instants, location already resolved into a Place.' ,
            'heure-du-conte'    : 'No endDate at all: the length comes from an ISO 8601 duration. The room is a bare reference.' ,
            'expo-photo'        : 'Bare dates, so the event is all-day. Whether the 16th is covered is what allDayEndInclusive decides.' ,
            'atelier-numerique' : 'Cancelled: the status survives into the record, enough for a view to strike it through.' ,
            'rencontre-auteur'  : 'Rescheduled, and it says where it used to be — enough to draw the ghost of the old slot.' ,
            'ws-initiation'     : 'A house type the helpers know nothing about. It expands because it carries byDay — and exceptDate removes the Thursday.' ,
            'club-lecture'      : 'The rule is nested under eventSchedule, which schema.org allows to repeat, hence the array. First Wednesday of the month.' ,
            'ws-ecriture'       : 'byDay is an empty array: the series exists but runs on no day. Not the same as saying nothing about its days.' ,
            'ws-permanence'     : 'PublicHolidays is a legal DayOfWeek member and is not a weekday. Dropped, with a development warning.' ,
            'projection'        : 'A room reference of zero, the way back offices encode “none”. It must not become a row named 0.' ,
            'fermeture'         : 'A bare date and nothing else: all-day, one day long.' ,
        } ,

        layout :
        {
            title       : 'layoutOverlaps — sharing the width' ,
            description : 'Positions come out as fractions of the column, never as pixels: the view multiplies them by whatever width it has. An event alone in flight takes the whole of it, two that overlap share it.' ,
            column      : 'col' ,
        } ,

        patch :
        {
            title       : 'The way back — toSchemaPatch' ,
            description : 'The adapter works both ways or it is only half of one. Here is the fragment a move would produce, ready to be sent back — a patch, never a rebuilt object. On an all-day event the exclusive end held internally is walked back to the last day covered: reading then writing must change nothing.' ,
            occurrence  : 'occurrence' ,
        } ,

        scale :
        {
            title       : 'createTimeScale — the axis' ,
            description : 'One arithmetic for the time grid and for the timeline: they differ only by the axis it is projected onto. Here, 08:00 → 22:00 at 48 pixels per hour.' ,
            size        : 'height' ,
            length      : '1 h 30' ,
            snap        : 'snap 09:22' ,
        } ,
    } ,
} ;

export default scheduleModel ;
