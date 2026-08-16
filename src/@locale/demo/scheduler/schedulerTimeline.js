const schedulerTimeline =
{
    fr :
    {
        title       : 'Scheduler — la vue Ressources' ,
        description : "La grille de la semaine avec l'axe pivoté, et c'est tout ce qui la distingue : createSpanScale remplace createTimeScale parce qu'un timeline a un seul axe continu au lieu d'un jour répété par colonne, et layoutOverlaps revient inchangé — ce qu'il rendait en colonnes qui se partagent une largeur devient des voies qui se partagent la hauteur d'une ligne. Deux réservations de la même salle à la même heure ne peuvent pas se partager la largeur : la largeur, c'est le temps." ,

        day :
        {
            title       : 'Une journée, les heures en abscisse' ,
            description : "Les gestes des lots 5 et 6 marchent ici sans une ligne de plus : useTimeDrag a gagné une orientation, pas un jumeau. Déplacer une carte vers une autre ligne change sa ressource — et comme aucune propriété schema.org ne dit « ressource », la librairie ne devine pas : elle rapporte la nouvelle ligne dans le descripteur de changement, à l'application d'écrire, ou à setResourceId de dire comment." ,
        } ,

        week :
        {
            title       : 'Une semaine, les jours en abscisse' ,
            description : "Même composant, même code : timelineDays passe à 7 et la fenêtre fait le reste, exactement comme une seule grille horaire sert le Jour et la Semaine. Un événement à cheval sur minuit est ici une seule barre, jamais coupée par jour — c'est précisément ce qu'on demande à un timeline. À cette échelle, une heure vaut sept pixels : les barres courtes écrivent donc leur titre à côté d'elles, comme dans un diagramme de Gantt, et l'exposition qui traverse la semaine garde le sien dedans. Ce qu'une semaine montre, c'est l'occupation ; pour le détail, un clic ouvre la fiche. Selon la densité, ces libellés aident ou se marchent dessus — d'où showNarrowLabels, montré ici dans les deux positions." ,
        } ,

        hours :
        {
            title       : 'Les heures d’ouverture' ,
            description : "L'atelier n'ouvre qu'à 14 h : le reste de sa ligne est ombré. C'est OpeningHoursSpecification lu tel quel — la même propriété que consommera le SlotPicker pour calculer des créneaux libres. Ici elle ne fait que dessiner. Et une ressource qui ne déclare rien n'est pas ombrée du tout : le silence n'est pas une fermeture." ,
        } ,

        legend :
        {
            title       : 'La légende, enfin' ,
            description : "Elle attendait depuis la palette du lot 3 bis qu'une source donne des noms aux ressources. La voici, sur MetricLegend : la légende et le timeline lisent la même liste dans le même ordre, ce qui est tout l'intérêt d'une liste déclarée." ,
        } ,

        derived :
        {
            title       : 'Sans resources — la solution de repli' ,
            description : "Aucune liste déclarée : les lignes sont celles que les événements mentionnent, dans l'ordre où on les a rencontrées. Une salle libre toute la journée n'a donc pas de ligne du tout, et l'ordre change avec les données. Pratique pour regarder un payload, jamais pour planifier." ,
        } ,
    } ,

    en :
    {
        title       : 'Scheduler — the resource view' ,
        description : 'The week grid with its axis pivoted, and that is all that separates them: createSpanScale replaces createTimeScale because a timeline has one continuous axis rather than a day repeated per column, and layoutOverlaps comes back unchanged — what it returned as columns sharing a width becomes lanes sharing a row height. Two bookings of the same room at the same hour cannot share the width: the width is the time.' ,

        day :
        {
            title       : 'A day, hours across' ,
            description : 'The gestures of the fifth and sixth lots work here without a line added: useTimeDrag gained an orientation, not a twin. Dragging a card to another row changes its resource — and since no schema.org property means "resource", the library does not guess: it reports the new row in the change descriptor, for the application to write, or for setResourceId to say how.' ,
        } ,

        week :
        {
            title       : 'A week, days across' ,
            description : 'Same component, same code: timelineDays becomes 7 and the window does the rest, exactly as one time grid serves Day and Week. An event crossing midnight is one bar here, never cut per day — which is precisely what a timeline is asked for. At this scale an hour is worth seven pixels, so short bars write their title beside them the way a Gantt chart does, while the exhibition crossing the week keeps its own inside. What a week shows is occupancy; for the detail, a click opens the panel. Depending on the density those labels either help or run into one another — hence showNarrowLabels, shown here both ways.' ,
        } ,

        hours :
        {
            title       : 'Opening hours' ,
            description : 'The workshop opens at two: the rest of its row is shaded. That is OpeningHoursSpecification read as it stands — the same property the slot picker will consume to compute free slots. Here it only draws. And a resource declaring nothing is not shaded at all: silence is not a closure.' ,
        } ,

        legend :
        {
            title       : 'The legend, at last' ,
            description : 'It had been waiting since the palette lot for a source to give the resources names. Here it is, on MetricLegend: the legend and the timeline read the same list in the same order, which is the whole point of a declared one.' ,
        } ,

        derived :
        {
            title       : 'Without resources — the fallback' ,
            description : 'Nothing declared: the rows are whatever the events mention, in the order they were first seen. A room free all day therefore has no row at all, and the order shifts with the data. Useful to look at a payload, never to plan with.' ,
        } ,
    } ,
} ;

export default schedulerTimeline ;
