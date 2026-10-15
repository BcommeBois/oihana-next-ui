/**
 * Default labels of `display/OutboxBanner` and `display/OutboxList`.
 */
const outbox =
{
    fr :
    {
        statuses : { blocked : 'Bloqué' , conflict : 'Conflit' , done : 'Envoyé' , pending : 'En attente' , posting : 'Envoi…' , rejected : 'Refusé' } ,

        banner :
        {
            idle          : 'Toutes vos actions sont envoyées.' ,
            lastSync      : 'Dernier envoi à {0}.' ,
            pendingOne    : '1 action en attente d’envoi.' ,
            pendingMany   : '{0} actions en attente d’envoi.' ,
            sending       : 'Envoi en cours…' ,
            offlineOne    : 'Hors ligne · 1 action en attente, envoyée au retour du réseau.' ,
            offlineMany   : 'Hors ligne · {0} actions en attente, envoyées au retour du réseau.' ,
            failedOne     : '1 action refusée : {0}' ,
            failedOneBare : '1 action refusée.' ,
            failedMany    : '{0} actions refusées ou en conflit.' ,
            andPending    : '{0} en attente.' ,
            open          : 'Voir' ,
        } ,

        list :
        {
            empty      : 'Aucune action en attente.' ,
            otherScope : 'En attente d’un autre compte' ,
            next       : 'Nouvel essai dans {0} s' ,
            attempts   : '{0} essai(s)' ,
            retry      : 'Réessayer' ,
            remove     : 'Abandonner' ,
            confirm    : 'Confirmer ?' ,
            open       : 'Ouvrir' ,
        } ,

        errors :
        {
            aborted   : 'L’envoi a été interrompu.' ,
            blocked   : 'Une action dont elle dépend a échoué.' ,
            exhausted : 'Trop d’essais sans réponse du serveur.' ,
            network   : 'Pas de réseau.' ,
            quota     : 'L’appareil manque de place.' ,
            timeout   : 'Le serveur n’a pas répondu à temps.' ,
            unknown   : 'Le serveur a refusé l’action.' ,
        } ,
    } ,
    en :
    {
        statuses : { blocked : 'Blocked' , conflict : 'Conflict' , done : 'Sent' , pending : 'Pending' , posting : 'Sending…' , rejected : 'Refused' } ,

        banner :
        {
            idle          : 'All your actions are sent.' ,
            lastSync      : 'Last sent at {0}.' ,
            pendingOne    : '1 action waiting to be sent.' ,
            pendingMany   : '{0} actions waiting to be sent.' ,
            sending       : 'Sending…' ,
            offlineOne    : 'Offline · 1 action waiting, sent when the network is back.' ,
            offlineMany   : 'Offline · {0} actions waiting, sent when the network is back.' ,
            failedOne     : '1 action refused : {0}' ,
            failedOneBare : '1 action refused.' ,
            failedMany    : '{0} actions refused or in conflict.' ,
            andPending    : '{0} waiting.' ,
            open          : 'View' ,
        } ,

        list :
        {
            empty      : 'No action waiting.' ,
            otherScope : 'Waiting for another account' ,
            next       : 'Next attempt in {0} s' ,
            attempts   : '{0} attempt(s)' ,
            retry      : 'Retry' ,
            remove     : 'Abandon' ,
            confirm    : 'Confirm ?' ,
            open       : 'Open' ,
        } ,

        errors :
        {
            aborted   : 'The send was interrupted.' ,
            blocked   : 'An action it depends on failed.' ,
            exhausted : 'Too many attempts without an answer from the server.' ,
            network   : 'No network.' ,
            quota     : 'The device is short of space.' ,
            timeout   : 'The server did not answer in time.' ,
            unknown   : 'The server refused the action.' ,
        } ,
    } ,
} ;

export default outbox ;
