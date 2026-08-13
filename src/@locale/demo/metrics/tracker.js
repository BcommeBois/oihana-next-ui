const tracker =
{
    fr :
    {
        title       : 'Tracker' ,
        description : "Une bande de blocs, un par observation, où la couleur porte l'état." ,

        simple :
        {
            title       : 'Simple' ,
            description : "90 jours de disponibilité. Chaque bloc porte son tooltip — en CSS pur, sans un seul composant React par case." ,
        } ,

        statuses :
        {
            title       : 'États' ,
            description : "success, warning, error, info, neutral — et base-300 pour un bloc dont on ne sait rien. Ce sont des tokens du thème : aucune variante dark: à écrire." ,
        } ,

        sizes :
        {
            title       : 'Hauteurs' ,
            description : 'xs, sm, md (défaut), lg — et une hauteur responsive.' ,
        } ,

        bounds :
        {
            title       : 'Bornes et résumé' ,
            description : "Le patron des pages de statut : un résumé au-dessus, les bornes de la période en dessous. startLabel accepte une fonction, qui reçoit le nombre de blocs réellement affichés." ,
            summary     : '{0} % de disponibilité sur la période' ,
            start       : 'il y a {0} jours' ,
            end         : "aujourd'hui" ,
        } ,

        responsive :
        {
            title       : 'Troncature responsive' ,
            description : "Les mêmes 90 jours dans trois largeurs. Le composant mesure son conteneur — pas la fenêtre — et garde les blocs les plus récents qui tiennent à minBlockWidth. Réduis la fenêtre : la bande large en perd, les autres non." ,
            narrow      : 'Conteneur étroit' ,
            medium      : 'Conteneur moyen' ,
            wide        : 'Pleine largeur' ,
        } ,

        limit :
        {
            title       : 'Plafond explicite' ,
            description : "maxBlocks plafonne en plus de ce qui tient, quand le nombre est connu d'avance. Ici 30, sur les mêmes 90 jours." ,
        } ,

        colors :
        {
            title       : 'Couleurs libres' ,
            description : "Comme partout dans metrics, une couleur CSS qui n'est pas un token passe en style inline." ,
        } ,

        day :
        {
            up      : '{0} — aucun incident' ,
            slow    : '{0} — lenteurs' ,
            down    : '{0} — indisponible' ,
            unknown : '{0} — aucune donnée' ,
        } ,
    } ,
    en :
    {
        title       : 'Tracker' ,
        description : 'A strip of blocks, one per observation, where the color carries the state.' ,

        simple :
        {
            title       : 'Simple' ,
            description : 'Ninety days of uptime. Every block carries its tooltip — in pure CSS, without one React component per cell.' ,
        } ,

        statuses :
        {
            title       : 'States' ,
            description : 'success, warning, error, info, neutral — and base-300 for a block nothing is known about. These are theme tokens: no dark: variant to write.' ,
        } ,

        sizes :
        {
            title       : 'Heights' ,
            description : 'xs, sm, md (default), lg — plus a responsive height.' ,
        } ,

        bounds :
        {
            title       : 'Bounds and summary' ,
            description : 'The status-page pattern: a summary above, the bounds of the period below. startLabel accepts a function, which receives the number of blocks actually shown.' ,
            summary     : '{0} % uptime over the period' ,
            start       : '{0} days ago' ,
            end         : 'today' ,
        } ,

        responsive :
        {
            title       : 'Responsive truncation' ,
            description : 'The same ninety days at three widths. The component measures its container — not the window — and keeps the most recent blocks that fit at minBlockWidth. Narrow the window: the wide strip loses blocks, the others do not.' ,
            narrow      : 'Narrow container' ,
            medium      : 'Medium container' ,
            wide        : 'Full width' ,
        } ,

        limit :
        {
            title       : 'Explicit cap' ,
            description : 'maxBlocks caps on top of what fits, when the number is known in advance. Thirty here, over the same ninety days.' ,
        } ,

        colors :
        {
            title       : 'Free colors' ,
            description : 'As everywhere in metrics, a CSS color that is not a theme token lands as an inline style.' ,
        } ,

        day :
        {
            up      : '{0} — no incident' ,
            slow    : '{0} — degraded' ,
            down    : '{0} — down' ,
            unknown : '{0} — no data' ,
        } ,
    } ,
} ;

export default tracker ;
