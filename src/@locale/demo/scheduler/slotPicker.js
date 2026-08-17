const slotPicker =
{
    fr :
    {
        title       : 'SlotPicker — ce qui est libre' ,
        noCalendar  : "Les grilles sans mois, ci-dessus et plus bas, ne l'ont pas oublié : c'est calendar={ false }, la prop pour un jour déjà choisi ailleurs. Elles montrent toutes le 12 août et ne diffèrent que d'un réglage — répéter un mois de six lignes entre chacune enterrerait justement la comparaison qu'elles servent à faire." ,
        description : "Les autres vues montrent ce qui est pris et le déplacent. Celle-ci calcule ce qui reste : les heures d'ouverture, moins ce qui y est déjà, découpé à la longueur demandée. Réserver n'est pas éditer — il n'y a encore rien à éditer, et toute la question est de trouver où le nouveau peut tenir." ,

        basic :
        {
            title       : 'Une salle' ,
            description : "L'Auditorium ouvre de 9 h à 22 h et trois choses y sont déjà programmées le 12. Un mois à gauche, les créneaux du jour à droite — et c'est la largeur du composant qui décide s'ils se rangent côte à côte ou l'un sous l'autre, jamais celle de la fenêtre." ,
            reports     : "Le composant rapporte le créneau choisi et s'arrête là. La réservation appartient à l'application, comme la création d'un événement depuis le lot 6 : l'identité d'un nouvel objet vient du serveur, et une clé inventée est une collision inventée." ,
            past        : "hidePast est éteint sur toute cette page, et c'est la seule raison pour laquelle elle montre quelque chose : le jeu de démo est daté d'août 2026, donc entièrement passé. Allumé — ce qui est le défaut, parce qu'un sélecteur qui propose hier est cassé — il ne resterait pas un créneau. Regarder une période révolue est légitime, et c'est exactement ce que cette prop permet." ,
            empty       : "Les samedis et dimanches sont barrés : l'Auditorium ne déclare ses horaires que du lundi au vendredi, et un jour sans rien de libre se voit avant qu'on clique dessus. C'est markEmptyDays, qui coûte un balayage du mois affiché — d'où la prop plutôt qu'un comportement d'office." ,
            filtered    : "Ce qui est passé en busy est pris tel quel, et c'est là que le filtrage se fait : ici on retire les entrées annulées, et surtout les journées entières. Le programme porte une exposition qui court du 10 au 17 — journée entière, donc minuit à minuit — et livrée comme une occupation elle bloquerait chaque heure de chaque jour de cette semaine. Une exposition dans le hall n'empêche pas de réserver une salle à 14 h : savoir laquelle de vos entrées tient vraiment un créneau n'est pas de l'arithmétique." ,
        } ,

        settings :
        {
            title       : 'duration, granularity, buffer' ,
            description : "Trois réglages, trois questions différentes. duration est la longueur du rendez-vous. granularity est le pas entre deux départs proposés : plus fin que la durée, les candidats se chevauchent — c'est voulu, et c'est ce que font les vrais systèmes de réservation. buffer garde du temps libre de part et d'autre de ce qui est déjà pris." ,
            buffer      : "Le battement gonfle ce qui est pris, il ne rogne pas les bornes d'ouverture : un quart d'heure de ménage après une réservation n'est pas un quart d'heure de ménage après l'ouverture des portes. Sans cette nuance, le premier créneau de la journée disparaîtrait sans raison." ,
        } ,

        resources :
        {
            title       : 'Par ressource' ,
            description : "« La première salle libre à 14 h » est la forme ordinaire d'une réservation. Chaque salle est lue avec ses propres horaires : l'Atelier n'ouvre qu'à 14 h, alors sa rangée commence plus tard sans qu'on ait rien à déclarer. Le créneau choisi porte son resourceId." ,
            empty       : "La Réserve ne déclare aucun horaire : elle n'a donc aucun créneau. Le silence n'est pas une fermeture — le lot 8 l'a tranché pour le hachurage — mais proposer un rendez-vous demande une affirmation positive : sans elle, on offrirait 3 h du matin. Une rangée vide reste affichée, parce que « cette salle est complète » est une réponse." ,
            fallback    : "defaultAvailability dit « 9 h – 18 h » une fois pour toutes, pour ce qui est resté muet." ,
        } ,

        panel :
        {
            title       : 'Dans une fiche' ,
            description : "La même chose dans une fenêtre qu'il faut refermer. Une coquille change le contrat : en ligne, un créneau choisi est rapporté tout de suite ; en modale, il n'y a rien d'autre à l'écran, donc le choix se valide. Une fenêtre qui réserverait au premier tap punirait une fausse manœuvre." ,
            footer      : "L'heure choisie est écrite dans le pied, là où le pouce la lit sans repartir chercher le bouton surligné trois rangées plus haut." ,
        } ,
    } ,

    en :
    {
        title       : 'SlotPicker — what is free' ,
        noCalendar  : 'The grids with no month, above and below, have not forgotten one: that is calendar={ false }, the prop for a day already chosen elsewhere. They all show 12 August and differ by a single setting — repeating a six-row month between each would bury the very comparison they exist for.' ,
        description : 'The other views show what is taken and move it. This one works out what is left: the opening hours, minus what already sits in them, cut to the length asked for. Booking is not editing — there is nothing to edit yet, and the whole question is finding where the new thing may go.' ,

        basic :
        {
            title       : 'One room' ,
            description : 'The Auditorium opens from 9 am to 10 pm and three things are already booked on the 12th. A month on the left, the day’s slots on the right — and it is the component’s own width that decides whether they sit side by side or stack, never the window’s.' ,
            reports     : 'The component reports the chosen slot and stops there. The booking belongs to the application, as the creation of an event has since lot 6: the identity of a new object comes from the server, and an invented key is an invented collision.' ,
            past        : 'hidePast is off across this whole page, and that is the only reason it shows anything: the demo payload is dated August 2026, so entirely in the past. On — which is the default, since a picker offering yesterday is broken — not one slot would be left. Looking at a period that is over is legitimate, and that is exactly what the prop is for.' ,
            empty       : 'Saturdays and Sundays are struck out: the Auditorium only declares hours from Monday to Friday, and a day with nothing free shows it before anyone clicks. That is markEmptyDays, which costs a scan of the month shown — hence a prop rather than a default.' ,
            filtered    : 'What goes into busy is taken as given, and that is where the filtering belongs: here we drop the cancelled entries, and above all the all-day ones. The programme carries an exhibition running from the 10th to the 17th — all-day, so midnight to midnight — and handed over as an occupation it would block every hour of every day of that week. An exhibition in the hall does not stop a room being booked at two: knowing which of your entries really holds a slot is not arithmetic.' ,
        } ,

        settings :
        {
            title       : 'duration, granularity, buffer' ,
            description : 'Three settings, three different questions. duration is how long the appointment lasts. granularity is the step between two offered starts: finer than the duration and the candidates overlap — deliberately, and that is what real booking systems do. buffer keeps time free on either side of what is already taken.' ,
            buffer      : 'The buffer inflates what is taken, it does not trim the opening bounds: a quarter of an hour of cleaning after a booking is not a quarter of an hour of cleaning after the doors open. Without that distinction, the first slot of the day would vanish for no reason.' ,
        } ,

        resources :
        {
            title       : 'By resource' ,
            description : '« The first room free at two » is the ordinary shape of a booking. Each room is read with its own hours: the Workshop only opens at 2 pm, so its row simply starts later, with nothing to declare. The chosen slot carries its resourceId.' ,
            empty       : 'The Store declares no hours at all, so it has no slots. Silence is not a closure — lot 8 settled that for the shading — but offering an appointment needs a positive statement: without one, three in the morning is bookable. An empty row stays on screen, because « that room is full » is an answer.' ,
            fallback    : 'defaultAvailability says « 9 to 6 » once, for whatever stayed silent.' ,
        } ,

        panel :
        {
            title       : 'In a panel' ,
            description : 'The same thing in a window that has to be answered. A shell changes the contract: inline, a chosen slot is reported at once; in a modal there is nothing else on screen, so the choice is confirmed. A window booking on the first tap would punish a mis-tap.' ,
            footer      : 'The chosen time is written in the footer, where a thumb reads it without going back to hunt for the highlighted button three rows up.' ,
        } ,
    } ,
} ;

export default slotPicker ;
