const barList =
{
    fr :
    {
        title       : 'BarList' ,
        description : 'Un classement de valeurs, chacune dessinée comme une barre à la mesure de sa part.' ,

        simple :
        {
            title       : 'Simple' ,
            description : 'Trié par ordre décroissant par défaut : une liste de barres est un classement.' ,
        } ,

        formatter :
        {
            title       : 'Format et pourcentages' ,
            description : "valueFormatter met en forme la valeur, showPercentage ajoute sa part du total. La colonne des valeurs reste alignée quoi qu'il arrive." ,
            visitors    : '{0} visiteurs' ,
        } ,

        sizes :
        {
            title       : 'Hauteurs de ligne' ,
            description : "sm, md (défaut), lg — et une hauteur responsive. Sur mobile, lg donne une cible tactile confortable." ,
        } ,

        colors :
        {
            title       : 'Couleurs' ,
            description : "Une couleur globale, ou une couleur par ligne pour faire ressortir ce qui compte. Les tokens du thème comme les couleurs CSS libres sont acceptés." ,
        } ,

        scale :
        {
            title       : 'Échelle partagée' ,
            description : "Sans max, chaque liste se normalise sur son propre maximum et deux listes ne sont pas comparables. Avec le même max, elles le deviennent." ,
            before      : 'Sans max' ,
            after       : 'Avec max = 1000' ,
            thisWeek    : 'Cette semaine' ,
            lastWeek    : 'Semaine dernière' ,
        } ,

        interactive :
        {
            title       : 'Lignes cliquables et liens' ,
            description : "onSelect transforme la ligne en bouton, href en lien — jamais les deux, un lien dans un bouton n'est ni valide ni atteignable au clavier." ,
            selected    : 'Sélection : {0}' ,
            none        : 'Clique sur une ligne.' ,
        } ,

        states :
        {
            title       : 'Chargement et liste vide' ,
            description : "loading affiche des squelettes au nombre de lignes attendu, pour que le panneau ne saute pas quand la donnée arrive. Une liste vide bascule sur EmptyState." ,
            empty       : 'Aucune visite sur la période' ,
            hint        : 'Élargis la plage de dates pour voir des résultats.' ,
        } ,

        reveal :
        {
            title       : 'Entrée progressive des barres' ,
            description : "reveal fait pousser chaque barre depuis zéro, avec revealStagger millisecondes de décalage d'une ligne à l'autre. Elle rejoue au montage, quand loading retombe à false — la forme d'un appel API — et à chaque changement de revealKey. Un simple changement de données ne la rejoue pas. Ignorée si le système demande moins d'animations." ,
            replay      : "Rejouer" ,
            refetch     : "Recharger (simule un appel API)" ,
            fade        : "Avec fondu de la ligne" ,
        } ,

        errors :
        {
            title : 'Erreurs les plus fréquentes' ,
        } ,
    } ,
    en :
    {
        title       : 'BarList' ,
        description : 'A ranked list of values, each drawn as a bar as wide as its share.' ,

        simple :
        {
            title       : 'Simple' ,
            description : 'Sorted descending by default: a bar list is a ranking.' ,
        } ,

        formatter :
        {
            title       : 'Formatting and percentages' ,
            description : 'valueFormatter shapes the value, showPercentage appends its share of the total. The value column stays aligned whatever happens.' ,
            visitors    : '{0} visitors' ,
        } ,

        sizes :
        {
            title       : 'Row heights' ,
            description : 'sm, md (default), lg — plus a responsive height. On mobile, lg gives a comfortable touch target.' ,
        } ,

        colors :
        {
            title       : 'Colors' ,
            description : 'One color for the list, or one per row to make what matters stand out. Theme tokens and free CSS colors are both accepted.' ,
        } ,

        scale :
        {
            title       : 'Shared scale' ,
            description : 'Without max, each list normalises on its own largest value and two lists cannot be compared. Given the same max, they can.' ,
            before      : 'Without max' ,
            after       : 'With max = 1000' ,
            thisWeek    : 'This week' ,
            lastWeek    : 'Last week' ,
        } ,

        interactive :
        {
            title       : 'Clickable rows and links' ,
            description : 'onSelect turns the row into a button, href into a link — never both, since a link inside a button is neither valid nor reachable by keyboard.' ,
            selected    : 'Selected: {0}' ,
            none        : 'Click a row.' ,
        } ,

        states :
        {
            title       : 'Loading and empty' ,
            description : 'loading shows as many skeletons as the data will have rows, so the panel does not jump when it lands. An empty list falls back to EmptyState.' ,
            empty       : 'No visit over the period' ,
            hint        : 'Widen the date range to see results.' ,
        } ,

        reveal :
        {
            title       : 'Bars growing in' ,
            description : 'reveal grows every bar from nothing, each row leaving revealStagger milliseconds after the one above it. It plays on mount, whenever loading falls back to false — the shape of an API call — and whenever revealKey changes. A change of data alone does not replay it. Ignored when the system asks for less motion.' ,
            replay      : 'Replay' ,
            refetch     : 'Refetch (fakes an API call)' ,
            fade        : 'With a row fade' ,
        } ,

        errors :
        {
            title : 'Most frequent errors' ,
        } ,
    } ,
} ;

export default barList ;
