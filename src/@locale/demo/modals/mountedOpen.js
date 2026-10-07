const mountedOpen =
{
    fr :
    {
        title       : 'Montée à la demande, ouverte au montage' ,
        description : "Chaque bouton monte un composant qui ouvre sa propre modale depuis un effet de montage, sans second clic. Les quatre cartes ne diffèrent que par la façon dont la modale atteint le portail et dont on lui dit de s'ouvrir." ,

        mount    : 'Monter et ouvrir' ,
        unmount  : 'Démonter' ,
        attached : 'ref attachée' ,
        opened   : 'ouverte au montage' ,
        missing  : 'ref toujours nulle' ,
        close    : 'Fermer' ,

        wrapped :
        {
            card  : 'Enveloppée dans un Portal par l’appelant' ,
            hint  : 'Portal autour de Modal, et un showModal() sur le nœud.' ,
            title : 'Enveloppée par l’appelant' ,
            body  : 'Montée et ouverte dans la même passe, à travers un Portal que l’appelant a écrit lui-même.' ,
        } ,

        prop :
        {
            card  : 'Placée dans un portail par la modale elle-même' ,
            hint  : 'La prop portal sur Modal, et le même showModal().' ,
            title : 'prop portal' ,
            body  : 'On demande à la modale de se placer elle-même dans un portail, avec la prop portal, plutôt que de l’envelopper.' ,
        } ,

        hook :
        {
            card  : 'Pilotée par useModal' ,
            hint  : 'open() depuis le hook, qui possède le nœud et ses écouteurs.' ,
            title : 'useModal' ,
            body  : 'Ouverte par open() plutôt que par le nœud du DOM, ce qui laisse le hook libre de retenir l’intention jusqu’à ce qu’il ait quelque chose à ouvrir.' ,
        } ,

        onMount :
        {
            card  : 'Déclarée avec openOnMount' ,
            hint  : 'useModal({ openOnMount : true }) et aucun effet dans le composant.' ,
            title : 'openOnMount' ,
            body  : 'Le composant ne porte aucun effet et ne fait aucun appel. Il se monte en voulant déjà être ouvert, et le hook ouvre le nœud qu’on finit par lui donner, quand que ce soit.' ,
        } ,

        note : 'Le badge dit si le nœud existait quand l’effet a tourné. Une modale qui reste fermée avec « ref attachée » est un défaut différent d’une qui reste fermée avec « ref toujours nulle » : la seconde veut dire que l’effet a tourné avant que le nœud soit dans le document, et que l’appel optionnel l’a avalé.' ,
    } ,
    en :
    {
        title       : 'Mounted on demand, opened on mount' ,
        description : 'Each button mounts a component that opens its own modal from a mount effect, with no second click. The four cards differ only in how the modal reaches the portal and how it is told to open.' ,

        mount    : 'Mount and open' ,
        unmount  : 'Unmount' ,
        attached : 'ref attached' ,
        opened   : 'opened on mount' ,
        missing  : 'ref still null' ,
        close    : 'Close' ,

        wrapped :
        {
            card  : 'Wrapped in a Portal by the caller' ,
            hint  : 'Portal around Modal, and a showModal() on the node.' ,
            title : 'Wrapped by the caller' ,
            body  : 'Mounted and opened in the same pass, through a Portal the caller wrote itself.' ,
        } ,

        prop :
        {
            card  : 'Placed in a portal by the modal itself' ,
            hint  : 'The portal prop on Modal, and the same showModal().' ,
            title : 'portal prop' ,
            body  : 'The modal is asked to place itself in a portal, through the portal prop, rather than being wrapped by the caller.' ,
        } ,

        hook :
        {
            card  : 'Driven by useModal' ,
            hint  : 'open() from the hook, which owns the node and its listeners.' ,
            title : 'useModal' ,
            body  : 'Opened through open() instead of the DOM node, so the hook is free to hold the intention until it has something to open.' ,
        } ,

        onMount :
        {
            card  : 'Declared with openOnMount' ,
            hint  : 'useModal({ openOnMount : true }) and no effect in the component at all.' ,
            title : 'openOnMount' ,
            body  : 'The component holds no effect and makes no call. It mounts already meaning to be open, and the hook opens whatever node it is eventually given, whenever that is.' ,
        } ,

        note : 'The badge reports whether the node existed when the effect ran. A modal that stays shut with « ref attached » is a different defect from one that stays shut with « ref still null » : the second means the effect ran before the node was in the document, and the optional call swallowed it.' ,
    } ,
} ;

export default mountedOpen ;
