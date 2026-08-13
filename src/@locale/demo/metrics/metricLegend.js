const metricLegend =
{
    fr :
    {
        title       : 'MetricLegend' ,
        description : "La légende d'une métrique : une pastille, un nom, et une valeur quand il y en a une." ,

        simple :
        {
            title       : 'Simple' ,
            description : 'Des parts nommées et chiffrées. Les couleurs sont des tokens du thème.' ,
            documents   : 'Documents' ,
            photos      : 'Photos' ,
            videos      : 'Vidéos' ,
            free        : 'Libre' ,
            unit        : '{0} Go' ,
        } ,

        markers :
        {
            title       : 'Formes de marqueur' ,
            description : "dot (défaut) pour une surface pleine — segment, bloc — square, et line pour une courbe." ,
            dot         : 'dot' ,
            square      : 'square' ,
            line        : 'line' ,
        } ,

        orientation :
        {
            title       : 'Orientation' ,
            description : "En colonne, ou responsive : empilée sur mobile, en ligne à partir de md. Réduis la fenêtre pour voir le passage." ,
            vertical    : 'Verticale' ,
            responsive  : 'Responsive : verticale sur mobile, horizontale à partir de md' ,
        } ,

        sizes :
        {
            title       : 'Tailles' ,
            description : "xs, sm, md. Par défaut : xs sur mobile, sm à partir du breakpoint sm." ,
        } ,

        series :
        {
            title       : 'Sans valeur' ,
            description : "Une légende de séries ne nomme que des couleurs : sans value, l'entrée affiche son nom seul plutôt qu'un zéro inventé. Chaque entrée peut porter un tooltip." ,
            visits      : 'Visites' ,
            visitsTip   : 'Sessions uniques par jour' ,
            sales       : 'Ventes' ,
            salesTip    : 'Commandes validées' ,
            errors      : 'Erreurs' ,
            errorsTip   : 'Réponses 5xx' ,
        } ,

        sparklines :
        {
            title       : 'Plusieurs sparklines' ,
            description : "Ce pour quoi le marqueur line existe : trois courbes dans une même tuile, identifiées par un trait de leur couleur." ,
        } ,

        bar :
        {
            title       : 'Dans CategoryBar' ,
            description : "C'est la même légende que showLegend affiche sous la barre. legendProps donne accès à marker, orientation et size." ,
        } ,

        colors :
        {
            title       : 'Couleurs libres' ,
            description : "Comme partout dans metrics, une couleur CSS qui n'est pas un token passe en style inline — de quoi aligner la légende sur la palette d'un graphe voisin." ,
            first       : 'Bleu' ,
            second      : 'Orange' ,
            third       : 'Rouge' ,
        } ,
    } ,
    en :
    {
        title       : 'MetricLegend' ,
        description : 'The legend of a metric: a mark, a name, and a value when there is one.' ,

        simple :
        {
            title       : 'Simple' ,
            description : 'Named and quantified shares. The colors are theme tokens.' ,
            documents   : 'Documents' ,
            photos      : 'Photos' ,
            videos      : 'Videos' ,
            free        : 'Free' ,
            unit        : '{0} GB' ,
        } ,

        markers :
        {
            title       : 'Marker shapes' ,
            description : 'dot (default) for a filled area — a segment, a block — square, and line for a curve.' ,
            dot         : 'dot' ,
            square      : 'square' ,
            line        : 'line' ,
        } ,

        orientation :
        {
            title       : 'Orientation' ,
            description : 'As a column, or responsive: stacked on mobile, inline from md up. Narrow the window to see it switch.' ,
            vertical    : 'Vertical' ,
            responsive  : 'Responsive: vertical on mobile, horizontal from md up' ,
        } ,

        sizes :
        {
            title       : 'Sizes' ,
            description : 'xs, sm, md. Default: xs on mobile, sm from the sm breakpoint up.' ,
        } ,

        series :
        {
            title       : 'Without a value' ,
            description : 'A series legend only names colors: with no value, an entry shows its name alone rather than an invented zero. Every entry can carry a tooltip.' ,
            visits      : 'Visits' ,
            visitsTip   : 'Unique sessions per day' ,
            sales       : 'Sales' ,
            salesTip    : 'Confirmed orders' ,
            errors      : 'Errors' ,
            errorsTip   : '5xx responses' ,
        } ,

        sparklines :
        {
            title       : 'Several sparklines' ,
            description : 'What the line marker exists for: three curves in one tile, each identified by a stroke of its own color.' ,
        } ,

        bar :
        {
            title       : 'Inside CategoryBar' ,
            description : 'This is the very legend showLegend draws under the bar. legendProps reaches marker, orientation and size.' ,
        } ,

        colors :
        {
            title       : 'Free colors' ,
            description : 'As everywhere in metrics, a CSS color that is not a theme token lands as an inline style — enough to align the legend with the palette of a chart next to it.' ,
            first       : 'Blue' ,
            second      : 'Orange' ,
            third       : 'Red' ,
        } ,
    } ,
} ;

export default metricLegend ;
