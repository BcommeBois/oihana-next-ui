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
            description : 'xs, sm, md (défaut), lg — et une taille responsive : fine sur mobile, épaisse à partir de lg.' ,
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
            description : 'xs, sm, md (default), lg — plus a responsive size: thin on mobile, thick from lg up.' ,
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
