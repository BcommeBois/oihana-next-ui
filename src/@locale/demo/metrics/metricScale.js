const metricScale =
{
    fr :
    {
        title       : 'MetricScale' ,
        description : "L'échelle d'une grandeur : une bande par seau, et les deux bouts de la plage écrits dessous." ,

        simple :
        {
            title       : 'Simple' ,
            description : "La rampe dans l'ordre, du plus bas au plus haut. Les bandes sont franches parce que l'échelle l'est : un graphe quantitatif range ses valeurs en seaux, un dégradé lisse dirait le contraire." ,
            unit        : '{0} vues' ,
        } ,

        orientation :
        {
            title       : 'Orientation' ,
            description : "Debout, le petit bout est en bas — là où un lecteur l'attend. C'est ce que prennent les placements latéraux d'un graphe." ,
            horizontal  : 'Horizontale' ,
            vertical    : 'Verticale' ,
        } ,

        sizes :
        {
            title       : 'Tailles' ,
            description : "xs, sm, md, comme MetricLegend — les deux se posent au même endroit sous les mêmes graphes et doivent se lire à la même taille." ,
        } ,

        ticks :
        {
            title       : 'Frontières des seaux' ,
            description : "ticks imprime les bords, pas les bornes seules — éteint par défaut, parce que N seaux font N+1 chiffres et que ça se bouscule vite sous une barre de 224 px. Un nombre en montre au plus autant, en sautant des bords : chaque chiffre affiché reste une vraie frontière, quitte à ce que le dernier intervalle soit plus court." ,
            all         : 'Toutes — 4 seaux, 5 frontières' ,
            thinned     : 'ticks={ 4 } sur 10 seaux — 0, 96, 192, 240' ,
            vertical    : 'Debout' ,
            uneven      : "Une plage qui ne tombe pas rond : c'est valueFormatter qui décide de l'arrondi, pas l'échelle." ,
        } ,

        bounds :
        {
            title       : 'Sans bornes' ,
            description : "Sans min ni max, il ne reste que la rampe. Zéro est une borne comme une autre : c'est l'absence qui efface la ligne, pas la valeur nulle." ,
        } ,

        colors :
        {
            title       : 'Couleurs libres' ,
            description : "Comme partout dans metrics, un token du thème passe en classe et toute autre couleur CSS en style inline — de quoi aligner l'échelle sur la rampe du graphe voisin." ,
            tokens      : 'Tokens du thème' ,
            css         : 'Rampe nivo' ,
        } ,
    } ,
    en :
    {
        title       : 'MetricScale' ,
        description : 'The scale of a quantity: a band per bucket, and the two ends of the range written under them.' ,

        simple :
        {
            title       : 'Simple' ,
            description : 'The ramp in order, lowest to highest. The bands are discrete because the scale is: a quantitative chart sorts its values into buckets, and a smooth gradient would say otherwise.' ,
            unit        : '{0} views' ,
        } ,

        orientation :
        {
            title       : 'Orientation' ,
            description : 'Standing up, the low end is at the bottom — where a reader expects it. This is what a chart uses for its side placements.' ,
            horizontal  : 'Horizontal' ,
            vertical    : 'Vertical' ,
        } ,

        sizes :
        {
            title       : 'Sizes' ,
            description : 'xs, sm, md, like MetricLegend — the two sit in the same slot under the same charts and have to read at the same size.' ,
        } ,

        ticks :
        {
            title       : 'Bucket boundaries' ,
            description : 'ticks prints the edges rather than the two ends alone — off by default, because N buckets make N+1 figures and they crowd fast under a 224 px bar. A number prints at most that many, skipping whole edges: every figure shown stays a real boundary, even if that leaves the last interval shorter.' ,
            all         : 'All of them — 4 buckets, 5 boundaries' ,
            thinned     : 'ticks={ 4 } over 10 buckets — 0, 96, 192, 240' ,
            vertical    : 'Standing up' ,
            uneven      : 'A range that does not divide evenly: valueFormatter decides the rounding, not the scale.' ,
        } ,

        bounds :
        {
            title       : 'Without bounds' ,
            description : 'With no min and no max, only the ramp is left. Zero is a bound like any other: it is the absence that drops the line, not the value.' ,
        } ,

        colors :
        {
            title       : 'Free colors' ,
            description : 'As everywhere in metrics, a theme token becomes a class and any other CSS color lands as an inline style — enough to align the scale with the ramp of the chart next to it.' ,
            tokens      : 'Theme tokens' ,
            css         : 'nivo ramp' ,
        } ,
    } ,
} ;

export default metricScale ;
