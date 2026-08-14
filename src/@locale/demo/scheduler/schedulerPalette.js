const schedulerPalette =
{
    fr :
    {
        title       : 'Colorier par ressource — la palette' ,
        description : "Huit jetons DaisyUI suffisent tant qu'on colorie un événement. Dès qu'on colorie par salle, par tournée ou par catégorie, ils ne suffisent plus. La palette répond au nombre ; l'attribution répond à la stabilité — la même salle garde sa teinte d'une semaine à l'autre." ,
        hint        : 'Bascule aussi le thème clair/sombre : la rampe est poussée plus claire sur fond sombre, pour que rien ne se noie dans le fond.' ,

        wins :
        {
            title       : 'La couleur de la donnée gagne toujours' ,
            description : "Le Concert et l'Exposition portent un `color` dans le payload — ils gardent le leur. La palette ne répond que pour ce que la donnée n'a pas dit, ce qui permet de la brancher sans réécrire les événements déjà colorés." ,
        } ,

        key :
        {
            title       : 'getColorKey' ,
            description : "Par défaut la clé est la ressource, ce qui est l'intention courante. Ici on colorie explicitement par salle : les trois salles prennent trois teintes, et les événements sans salle restent neutres." ,
        } ,

        stable :
        {
            title       : 'Pourquoi c’est stable' ,
            description : "Les clés sont triées avant d'être indexées, jamais prises dans l'ordre d'arrivée — sinon une semaine où la Salle Bleue apparaît en premier décalerait toutes les couleurs. Une salle ajoutée ne déplace que ce qui la suit alphabétiquement ; `colorKeys` fige l'ordre pour de bon." ,
        } ,
    } ,

    en :
    {
        title       : 'Colouring by resource — the palette' ,
        description : 'Eight DaisyUI tokens are enough while colouring one event. They stop being enough the moment the colour means a room, a round or a category. The palette answers the count; the assignment answers stability — the same room keeps its tint from one week to the next.' ,
        hint        : 'Switch the light/dark theme too: the ramp is pushed lighter on a dark background, so nothing sinks into the canvas.' ,

        wins :
        {
            title       : 'The data’s own colour always wins' ,
            description : 'The concert and the exhibition carry a `color` in the payload — they keep it. The palette only answers for what the data left unsaid, which is what lets it be switched on without rewriting the events that already had one.' ,
        } ,

        key :
        {
            title       : 'getColorKey' ,
            description : 'The key defaults to the resource, which is the usual intent. Here the colour is explicitly by room: three rooms take three tints, and the events without one stay neutral.' ,
        } ,

        stable :
        {
            title       : 'Why it is stable' ,
            description : 'Keys are sorted before they are indexed, never taken in order of appearance — a week where the Blue Room happens to come first would otherwise shift every colour. A room added only moves what sorts after it; `colorKeys` freezes the order for good.' ,
        } ,
    } ,
} ;

export default schedulerPalette ;
