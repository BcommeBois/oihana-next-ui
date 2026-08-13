const delta =
{
    fr :
    {
        title       : 'Delta' ,
        description : "Une variation, sa direction et le jugement qu'on porte dessus." ,

        simple :
        {
            title       : 'Simple' ,
            description : "value est un ratio par défaut : 0.124 donne +12,4 %. La flèche dit le fait, la couleur dit si c'est une bonne nouvelle." ,
        } ,

        inverted :
        {
            title       : 'inverted : quand baisser est une bonne nouvelle' ,
            description : "Un taux d'erreur, un churn, une latence, un coût. inverted échange les couleurs et jamais la flèche — la flèche décrit la donnée, elle ne la juge pas." ,
            normal      : 'Visiteurs (monter est bon)' ,
            reverse     : "Taux d'erreur (baisser est bon)" ,
        } ,

        variants :
        {
            title       : 'Badge ou texte' ,
            description : "badge (défaut) pour une cellule de tableau, text pour se glisser sous un nombre sans l'alourdir." ,
        } ,

        formats :
        {
            title       : 'Formats et localisation' ,
            description : "percent lit un ratio, number lit la valeur telle quelle. Les nombres sont mis en forme dans la langue du LangProvider — bascule la langue de l'application pour voir le séparateur décimal suivre." ,
            percent     : 'percent (défaut)' ,
            number      : 'number' ,
            custom      : 'valueFormatter' ,
            points      : '{0} points' ,
        } ,

        neutral :
        {
            title       : 'Bande neutre' ,
            description : "neutralThreshold : en deçà, ce n'est pas une tendance mais du bruit. À zéro par défaut, donc toute variation compte." ,
            without     : 'Sans seuil' ,
            with        : 'neutralThreshold = 0.05' ,
        } ,

        fromTo :
        {
            title       : 'from / to' ,
            description : "Le composant calcule la variation, avec la valeur de départ en valeur absolue au dénominateur — une métrique qui remonte d'un socle négatif ne doit pas ressortir en baisse. Partir de zéro n'a pas de ratio : la valeur est alors annoncée indisponible." ,
            growth      : '11 100 → 12 480' ,
            drop        : '840 → 615' ,
            negative    : '−200 → −50' ,
            zero        : '0 → 320' ,
        } ,

        missing :
        {
            title       : 'Valeur absente' ,
            description : "Un tiret muet plutôt que rien : une tuile dont la donnée n'est pas encore arrivée garde sa mise en page." ,
        } ,

        recipe :
        {
            title       : 'La tuile KPI, complète' ,
            description : "La sparkline dans figure, le delta dans description. Toujours aucun composant de plus." ,
            visitors    : 'Visiteurs' ,
            revenue     : "Chiffre d'affaires" ,
            errors      : 'Taux d\'erreur' ,
            since       : 'vs période précédente' ,
        } ,
    } ,
    en :
    {
        title       : 'Delta' ,
        description : 'A change, its direction, and the verdict on it.' ,

        simple :
        {
            title       : 'Simple' ,
            description : 'value is a ratio by default: 0.124 gives +12.4%. The arrow states the fact, the color says whether it is good news.' ,
        } ,

        inverted :
        {
            title       : 'inverted: when falling is the good news' ,
            description : 'An error rate, a churn, a latency, a cost. inverted swaps the colors and never the arrow — the arrow describes the data, it does not judge it.' ,
            normal      : 'Visitors (up is good)' ,
            reverse     : 'Error rate (down is good)' ,
        } ,

        variants :
        {
            title       : 'Badge or text' ,
            description : 'badge (default) for a table cell, text to sit under a number without weighing it down.' ,
        } ,

        formats :
        {
            title       : 'Formats and localization' ,
            description : 'percent reads a ratio, number reads the value as it is. Numbers are formatted in the language of the LangProvider — switch the application language and watch the decimal separator follow.' ,
            percent     : 'percent (default)' ,
            number      : 'number' ,
            custom      : 'valueFormatter' ,
            points      : '{0} points' ,
        } ,

        neutral :
        {
            title       : 'Neutral band' ,
            description : 'neutralThreshold: below it, this is not a trend but noise. Zero by default, so every change counts.' ,
            without     : 'No threshold' ,
            with        : 'neutralThreshold = 0.05' ,
        } ,

        fromTo :
        {
            title       : 'from / to' ,
            description : 'The component works the change out, with the absolute starting value as the denominator — a metric climbing back from a negative baseline must not come out falling. Growth from zero has no ratio, and is reported as unavailable.' ,
            growth      : '11,100 → 12,480' ,
            drop        : '840 → 615' ,
            negative    : '−200 → −50' ,
            zero        : '0 → 320' ,
        } ,

        missing :
        {
            title       : 'Missing value' ,
            description : 'A quiet dash rather than nothing: a tile whose data has not landed yet keeps its layout.' ,
        } ,

        recipe :
        {
            title       : 'The KPI tile, complete' ,
            description : 'The sparkline in figure, the delta in description. Still no extra component.' ,
            visitors    : 'Visitors' ,
            revenue     : 'Revenue' ,
            errors      : 'Error rate' ,
            since       : 'vs previous period' ,
        } ,
    } ,
} ;

export default delta ;
