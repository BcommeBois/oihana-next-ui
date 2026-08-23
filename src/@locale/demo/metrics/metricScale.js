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
