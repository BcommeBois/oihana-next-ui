const portalFullscreen =
{
    fr :
    {
        title       : 'Portal et le top layer du plein écran' ,
        description : "Ouvrez chaque surface ci-dessous, passez en plein écran et ouvrez-les à nouveau. Les quatre doivent passer au-dessus de la page dans les deux états — un panneau qui s'ouvre à moitié derrière cette carte est un portail qui visait document.body pendant que le top layer était ailleurs." ,

        enter  : 'Passer en plein écran' ,
        leave  : 'Quitter le plein écran' ,
        target : 'cible du portail :' ,
        onFull : "l'élément en plein écran" ,
        onBody : 'document.body' ,

        popoverDivider : 'Un popover sur un déclencheur' ,
        popoverTrigger : 'Choisir un mois' ,
        months         : [ 'Janvier' , 'Février' , 'Mars' , 'Avril' , 'Mai' , 'Juin' ] ,

        tipDivider : 'Une infobulle flottante' ,
        tip        : 'Cette bulle est portaillée aussi — elle doit dégager la page dans les deux états.' ,
        tipTrigger : 'Survolez-moi' ,

        modalDivider : 'Une modale' ,
        modalNote    : "Celle-ci n'a jamais été concernée : un <dialog> ouvert par showModal() entre de lui-même dans le top layer. Elle est là pour qu'une régression se voie à côté des autres plutôt que sur une autre page." ,
        modalTrigger : 'Ouvrir la modale' ,
        modalTitle   : 'Au-dessus de tout' ,
        modalBody    : 'Une modale rejoint le top layer après l’élément en plein écran, donc elle peint au-dessus. Fermez-la, puis réessayez le popover sans quitter le plein écran.' ,

        fillerDivider : 'Ce qui se trouve dessous' ,
        filler        : "Du remplissage, juste sous le déclencheur : un panneau ouvert doit couvrir ce texte, jamais glisser derrière. Il est haut exprès — laissez le popover ouvert et faites défiler : le panneau doit suivre son déclencheur plutôt que rester où il s'est ouvert." ,
    } ,
    en :
    {
        title       : 'Portal and the fullscreen top layer' ,
        description : 'Open each surface below, then switch to fullscreen and open them again. All four have to sit above the page in both states — a panel that half-opens behind this card is a portal aiming at document.body while the top layer is somewhere else.' ,

        enter  : 'Enter fullscreen' ,
        leave  : 'Leave fullscreen' ,
        target : 'portal target :' ,
        onFull : 'the fullscreen element' ,
        onBody : 'document.body' ,

        popoverDivider : 'A popover on a trigger' ,
        popoverTrigger : 'Choose a month' ,
        months         : [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' ] ,

        tipDivider : 'A floating tooltip' ,
        tip        : 'This bubble is portalled too — it has to clear the page in both states.' ,
        tipTrigger : 'Hover me' ,

        modalDivider : 'A modal' ,
        modalNote    : 'This one was never affected : a <dialog> opened with showModal() enters the top layer by itself. It is here so a regression would show up beside the others rather than on another page.' ,
        modalTrigger : 'Open the modal' ,
        modalTitle   : 'Above everything' ,
        modalBody    : 'A modal dialog joins the top layer after the fullscreen element, so it paints above it. Close this, and try the popover again without leaving fullscreen.' ,

        fillerDivider : 'What sits underneath' ,
        filler        : 'Filler, right under the trigger : an open panel has to cover this text, never slide behind it. It is tall on purpose — leave the popover open and scroll : the panel has to follow its trigger rather than stay where it opened.' ,
    } ,
} ;

export default portalFullscreen ;
