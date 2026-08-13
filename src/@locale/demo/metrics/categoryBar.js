const categoryBar =
{
    fr :
    {
        title       : 'CategoryBar' ,
        description : 'Une barre horizontale qui découpe un total en segments proportionnels.' ,

        simple :
        {
            title       : 'Simple' ,
            description : 'Trois valeurs, les couleurs du thème par défaut.' ,
        } ,

        sizes :
        {
            title       : 'Épaisseurs' ,
            description : 'xs, sm, md (défaut), lg, xl — et une taille responsive : fine sur mobile, épaisse à partir de lg. xl existe pour le bullet, dont la piste doit loger une mesure.' ,
        } ,

        labels :
        {
            title       : 'Labels cumulés' ,
            description : "Les totaux courants au-dessus de la barre. Un label qui ne tient pas est retiré plutôt que superposé — réduis la fenêtre pour voir l'effet." ,
        } ,

        marker :
        {
            title       : 'Marker' ,
            description : 'Un seuil pointé sur la barre, avec son tooltip. Il reprend la couleur du segment sur lequel il tombe.' ,
            goal        : 'Objectif : {0}' ,
        } ,

        legend :
        {
            title       : 'Segments nommés et légende' ,
            description : 'Avec items, chaque segment porte un tooltip et la légende se replie sur plusieurs lignes quand la place manque.' ,
        } ,

        bullet :
        {
            title       : 'Bullet' ,
            description : "Avec measure, les segments deviennent des bandes qualitatives et la barre se lit comme un bullet graph : la mesure par-dessus, l'objectif en marqueur. Les bandes sont des teintes de base-content — elles se voient sur n'importe quelle surface et dans les deux thèmes, là où un base-200 disparaît sur une carte base-200. Les gaps disparaissent d'eux-mêmes, sinon la pointe de la mesure ne tomberait pas là où l'échelle le dit." ,
            current     : 'Réalisé : {0}' ,
        } ,

        measureColors :
        {
            title       : 'Couleur de la mesure' ,
            description : "measure.color prend les trois mêmes formes que partout : un token du thème, une classe utilitaire toute faite (utile pour les teintes translucides), ou une couleur CSS libre qui passe en style inline. Par défaut primary, comme Sparkline et BarList — la mesure est la donnée, les bandes sont le fond." ,
        } ,

        domain :
        {
            title       : 'Domaine explicite' ,
            description : "max étend l'échelle au-delà des bandes — le reste du domaine reste visible en fond. max ne peut qu'étendre : réduire l'échelle sous la somme des bandes les ferait déborder de la piste." ,
        } ,

        compare :
        {
            title        : 'Comparaison' ,
            description  : "L'argument de la forme : trois indicateurs sur la même échelle, comparables d'un coup d'œil. Trois jauges rondes prendraient dix fois la place sans s'aligner." ,
            sales        : 'Ventes' ,
            margin       : 'Marge' ,
            satisfaction : 'Satisfaction' ,
        } ,

        colors :
        {
            title       : 'Couleurs libres' ,
            description : "Un hex, un oklch, une variable CSS : tout ce qui n'est pas un token du thème passe en style inline. De quoi aligner la barre sur la palette d'un graphe voisin." ,
        } ,

        edges :
        {
            title       : 'Cas limites' ,
            description : 'Somme nulle, valeurs décimales, et un segment à zéro qui ne casse pas les arrondis des extrémités.' ,
        } ,

        storage :
        {
            documents : 'Documents' ,
            photos    : 'Photos' ,
            videos    : 'Vidéos' ,
            free      : 'Libre' ,
            unit      : '{0} Go' ,
            tooltip   : '{0} — {1} Go' ,
        } ,
    } ,
    en :
    {
        title       : 'CategoryBar' ,
        description : 'A horizontal bar splitting a total into proportional segments.' ,

        simple :
        {
            title       : 'Simple' ,
            description : 'Three values, the default theme colors.' ,
        } ,

        sizes :
        {
            title       : 'Thickness' ,
            description : 'xs, sm, md (default), lg, xl — plus a responsive size: thin on mobile, thick from lg up. xl exists for the bullet, whose track has to hold a measure.' ,
        } ,

        labels :
        {
            title       : 'Cumulative labels' ,
            description : 'The running totals above the bar. A label that does not fit is dropped rather than overlapped — narrow the window to see it happen.' ,
        } ,

        marker :
        {
            title       : 'Marker' ,
            description : 'A threshold pointed at on the bar, with its tooltip. It takes the color of the segment it lands on.' ,
            goal        : 'Target: {0}' ,
        } ,

        legend :
        {
            title       : 'Named segments and legend' ,
            description : 'With items, every segment carries a tooltip and the legend wraps onto as many rows as it needs.' ,
        } ,

        bullet :
        {
            title       : 'Bullet' ,
            description : 'With measure, the segments become qualitative bands and the bar reads as a bullet graph: the measure over them, the target as the marker. The bands are tints of base-content — they show on any surface and in both themes, where a base-200 band vanishes on a base-200 card. The gaps drop on their own, otherwise the tip of the measure would not land where the scale says.' ,
            current     : 'Actual: {0}' ,
        } ,

        measureColors :
        {
            title       : 'Measure color' ,
            description : 'measure.color takes the same three forms as everywhere else: a theme token, a ready-made utility class (which is how translucent tints are reachable), or a free CSS color landing as an inline style. Defaults to primary, like Sparkline and BarList — the measure is the data, the bands are the ground.' ,
        } ,

        domain :
        {
            title       : 'Explicit domain' ,
            description : 'max extends the scale past the bands — the rest of the domain stays visible as a background. It can only extend: a scale shorter than the sum of the bands would push them off the track.' ,
        } ,

        compare :
        {
            title        : 'Comparison' ,
            description  : 'The argument for the shape: three indicators on one scale, compared at a glance. Three round gauges would take ten times the room and still not line up.' ,
            sales        : 'Sales' ,
            margin       : 'Margin' ,
            satisfaction : 'Satisfaction' ,
        } ,

        colors :
        {
            title       : 'Free colors' ,
            description : 'A hex, an oklch, a CSS variable: anything that is not a theme token lands as an inline style. Enough to align the bar with the palette of a chart next to it.' ,
        } ,

        edges :
        {
            title       : 'Edge cases' ,
            description : 'A zero total, decimal values, and a zero-width segment that does not break the rounded ends.' ,
        } ,

        storage :
        {
            documents : 'Documents' ,
            photos    : 'Photos' ,
            videos    : 'Videos' ,
            free      : 'Free' ,
            unit      : '{0} GB' ,
            tooltip   : '{0} — {1} GB' ,
        } ,
    } ,
} ;

export default categoryBar ;
