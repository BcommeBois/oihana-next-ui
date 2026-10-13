/**
 * Labels of the timeline demo.
 */
const timeline =
{
    fr :
    {
        intro : 'Des moments sur une ligne : l’historique d’un colis, les étapes d’un projet, le journal d’un document. Le statut colore la ligne jusqu’à l’entrée (fait, en cours) ou la laisse grise (à venir) — et un lecteur d’écran entend le statut en mots.' ,

        parcel :
        {
            title   : 'Un colis' ,
            text    : 'Avancez ou reculez la livraison : la ligne suit, l’étape en cours porte un anneau. Les titres d’un côté (le plus courant pour un historique), de l’autre, ou en alternance comme les exemples daisyUI.' ,
            back    : 'Étape précédente' ,
            next    : 'Étape suivante' ,
            side    : 'Côté' ,
            sides   : { end : 'à droite' , start : 'à gauche' , alternate : 'alterné' } ,
            compact : 'Compact' ,
            box     : 'Cartes' ,
            titles  :
            {
                ordered   : 'Commande reçue' ,
                prepared  : 'Préparée' ,
                shipped   : 'Expédiée' ,
                delivery  : 'En cours de livraison' ,
                delivered : 'Livrée' ,
            } ,
            descriptions :
            {
                ordered   : 'Paiement accepté, commande n° 2026-0042.' ,
                prepared  : '3 articles, 1 colis de 4,2 kg.' ,
                shipped   : 'Remise au transporteur, suivi FR123456789.' ,
                delivery  : 'Le livreur est en tournée.' ,
                delivered : 'Signée par le destinataire.' ,
            } ,
        } ,

        project :
        {
            title  : 'Un projet, à l’horizontale' ,
            text   : 'À l’horizontale pour quelques étapes qui tiennent sur une ligne ; une couleur par entrée si l’on veut (ici les deux premières en vert).' ,
            brief  : 'Cadrage' ,
            design : 'Maquettes' ,
            build  : 'Développement' ,
            test   : 'Recette' ,
            launch : 'Mise en ligne' ,
        } ,

        responsive :
        {
            title : 'Adapté à l’écran, icônes calées en haut' ,
            text  : 'responsive : en alternance sur un écran large, compact sous md — réduisez la fenêtre. snapIcon cale l’icône en haut de l’entrée plutôt qu’au milieu, utile quand les cartes n’ont pas la même hauteur.' ,
        } ,

        journal :
        {
            title   : 'Un journal' ,
            text    : 'Sans cartes, compact, l’heure à gauche : qui a fait quoi, quand — le journal d’audit d’un bon de réception signé, avec son empreinte. Composable : chaque entrée est un TimelineItem, avec son icône, un lien pour celle en cours.' ,
            steps   : { opened : 'Réception ouverte' , checked : 'Lignes contrôlées' , photo : 'Bon de livraison photographié' , signed : 'Signé par le réceptionnaire' , sent : 'Envoyé au serveur' , archived : 'Archivé' } ,
            opened  : 'Palette 106141411234567897, par C. Martin' ,
            checked : '3 lignes, 40 pièces, aucun écart' ,
            photo   : 'IMG_0412.jpg, 1,8 Mo' ,
            sent    : 'En attente du réseau' ,
        } ,
    } ,
    en :
    {
        intro : 'Moments on a line: a parcel’s history, a project’s steps, a document’s journal. The status colours the line up to the entry (done, current) or leaves it grey (to come) — and a screen reader hears the status in words.' ,

        parcel :
        {
            title   : 'A parcel' ,
            text    : 'Move the delivery forward or back: the line follows, the current step wears a ring. Titles on one side (the usual for a history), the other, or alternating as daisyUI’s examples do.' ,
            back    : 'Previous step' ,
            next    : 'Next step' ,
            side    : 'Side' ,
            sides   : { end : 'right' , start : 'left' , alternate : 'alternate' } ,
            compact : 'Compact' ,
            box     : 'Cards' ,
            titles  :
            {
                ordered   : 'Order received' ,
                prepared  : 'Prepared' ,
                shipped   : 'Shipped' ,
                delivery  : 'Out for delivery' ,
                delivered : 'Delivered' ,
            } ,
            descriptions :
            {
                ordered   : 'Payment accepted, order no. 2026-0042.' ,
                prepared  : '3 items, 1 parcel of 4.2 kg.' ,
                shipped   : 'Handed to the carrier, tracking FR123456789.' ,
                delivery  : 'The driver is on the road.' ,
                delivered : 'Signed by the recipient.' ,
            } ,
        } ,

        project :
        {
            title  : 'A project, across' ,
            text   : 'Horizontal for a few steps that fit on one line; a colour per entry if you like (the first two in success here).' ,
            brief  : 'Brief' ,
            design : 'Design' ,
            build  : 'Build' ,
            test   : 'Test' ,
            launch : 'Launch' ,
        } ,

        responsive :
        {
            title : 'Responsive, snapped icons' ,
            text  : 'responsive: alternating on a wide screen, compact below md — shrink the window. snapIcon snaps the icon to the start of the entry, for cards of different heights.' ,
        } ,

        journal :
        {
            title   : 'A journal' ,
            text    : 'No cards, compact, the time on the left: who did what, when — the audit journal of a signed goods receipt, with its digest. Composable: each entry is a TimelineItem, with its icon, a link for the current one.' ,
            steps   : { opened : 'Receipt opened' , checked : 'Lines checked' , photo : 'Delivery note photographed' , signed : 'Signed by the receiver' , sent : 'Sent to the server' , archived : 'Archived' } ,
            opened  : 'Pallet 106141411234567897, by C. Martin' ,
            checked : '3 lines, 40 pieces, no discrepancy' ,
            photo   : 'IMG_0412.jpg, 1.8 MB' ,
            sent    : 'Waiting for the network' ,
        } ,
    } ,
} ;

export default timeline ;
