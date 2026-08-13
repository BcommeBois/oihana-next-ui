const sparkline =
{
    fr :
    {
        title       : 'Sparkline' ,
        description : "La forme d'une série, assez petite pour tenir à côté d'un nombre." ,

        variants :
        {
            title       : 'Variantes' ,
            description : "line (défaut), area et bar. Une seule prop : l'aire n'est que la ligne refermée sur sa base." ,
            line        : 'Ligne' ,
            area        : 'Aire' ,
            bar         : 'Barres' ,
        } ,

        sizes :
        {
            title       : 'Hauteurs' ,
            description : 'xs, sm, md (défaut), lg — et une hauteur responsive. La largeur revient au conteneur, donc une classe suffit à la fixer.' ,
        } ,

        domain :
        {
            title       : 'Domaine' ,
            description : "Par défaut le domaine est l'étendue des données : c'est la forme qui compte. Ancrer l'échelle à zéro l'aplatit — utile seulement pour comparer plusieurs séries, via min et max." ,
            auto        : 'Domaine automatique' ,
            zero        : 'min = 0' ,
            shared      : 'min = 0, max = 100 sur les deux' ,
        } ,

        fill :
        {
            title       : 'Remplissage' ,
            description : 'gradient (défaut), solid, none — sur la variante area uniquement.' ,
        } ,

        trend :
        {
            title       : 'Couleur et tendance' ,
            description : "Un token du thème, une couleur CSS libre, ou colorByTrend qui prend la direction du trajet : vert si ça monte, rouge si ça descend, neutre si c'est plat." ,
            up          : 'En hausse' ,
            down        : 'En baisse' ,
            flat        : 'Stable' ,
        } ,

        edges :
        {
            title       : 'Cas limites' ,
            description : "Série vide, point unique, série plate, et des trous — qui restent des trous, sauf si connectNulls dit le contraire. Une mesure manquante n'est pas un zéro. Une valeur hors d'un domaine imposé s'écrase sur la borne plutôt que de sortir du cadre." ,
            empty       : 'Vide' ,
            single      : 'Un seul point' ,
            constant    : 'Série plate' ,
            gaps        : 'Trous' ,
            connected   : 'Trous, connectNulls' ,
            clamped     : 'Hors domaine (min 40, max 60)' ,
        } ,

        recipe :
        {
            title       : 'Recette : la tuile KPI' ,
            description : "Aucun composant de plus : Card + Stats + Stat, dont figure accueille la sparkline. Le Delta du prochain lot ira dans description." ,
            visitors    : 'Visiteurs' ,
            revenue     : 'Chiffre d\'affaires' ,
            errors      : 'Erreurs' ,
            period      : '30 derniers jours' ,
        } ,
    } ,
    en :
    {
        title       : 'Sparkline' ,
        description : 'The shape of a series, small enough to sit next to a number.' ,

        variants :
        {
            title       : 'Variants' ,
            description : 'line (default), area and bar. One prop: the area is only the line closed onto its baseline.' ,
            line        : 'Line' ,
            area        : 'Area' ,
            bar         : 'Bars' ,
        } ,

        sizes :
        {
            title       : 'Heights' ,
            description : 'xs, sm, md (default), lg — plus a responsive height. Width is left to the container, so one class pins it.' ,
        } ,

        domain :
        {
            title       : 'Domain' ,
            description : 'The domain defaults to the extent of the data: the shape is what matters. Anchoring the scale at zero flattens it — useful only to compare several series, through min and max.' ,
            auto        : 'Automatic domain' ,
            zero        : 'min = 0' ,
            shared      : 'min = 0, max = 100 on both' ,
        } ,

        fill :
        {
            title       : 'Fill' ,
            description : 'gradient (default), solid, none — on the area variant only.' ,
        } ,

        trend :
        {
            title       : 'Color and trend' ,
            description : 'A theme token, a free CSS color, or colorByTrend which takes the direction of travel: green rising, red falling, neutral when flat.' ,
            up          : 'Rising' ,
            down        : 'Falling' ,
            flat        : 'Steady' ,
        } ,

        edges :
        {
            title       : 'Edge cases' ,
            description : 'Empty series, single point, flat series, and gaps — which stay gaps unless connectNulls says otherwise. A missing measurement is not a zero. A value outside an imposed domain flattens against the bound rather than escaping the box.' ,
            empty       : 'Empty' ,
            single      : 'Single point' ,
            constant    : 'Flat series' ,
            gaps        : 'Gaps' ,
            connected   : 'Gaps, connectNulls' ,
            clamped     : 'Out of domain (min 40, max 60)' ,
        } ,

        recipe :
        {
            title       : 'Recipe: the KPI tile' ,
            description : 'No extra component: Card + Stats + Stat, whose figure takes the sparkline. Next lot\'s Delta will go into description.' ,
            visitors    : 'Visitors' ,
            revenue     : 'Revenue' ,
            errors      : 'Errors' ,
            period      : 'Last 30 days' ,
        } ,
    } ,
} ;

export default sparkline ;
