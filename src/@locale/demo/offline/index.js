/**
 * Labels of the offline demos.
 */
const offline =
{
    lab :
    {
        fr : { refused : 'Envoi refusé ({0}) : {1}' } ,
        en : { refused : 'Send refused ({0}) : {1}' } ,
    } ,

    outbox :
    {
        fr :
        {
            title : 'Le banc d’essai de la file' ,
            intro : 'La file du lab, montée sur toutes ses pages : une file d’intentions gardée dans IndexedDB (la base « lab »), envoyée dans l’ordre vers une route d’essai qui retient les clés d’idempotence. Remplissez-la, coupez le réseau, changez de page — la bannière vous suit —, changez de compte : rien ne se perd (outils de développement → Application → IndexedDB → lab).' ,

            queue :
            {
                title    : 'Mettre en file' ,
                text     : 'Chaque bouton met une intention en file ; en ligne, elle part aussitôt. Les refus viennent de la route d’essai (?fail=…).' ,
                simple   : 'Une réception' ,
                photo    : 'Une réception avec la photo du bon' ,
                reject   : 'Une réception refusée (422)' ,
                conflict : 'En conflit (409)' ,
                modified : 'Modifiée ailleurs (412)' ,
                flaky    : 'Le serveur tombe deux fois (500)' ,
                quote    : 'Un devis et 3 lignes qui en dépendent' ,
                replace  : 'La réception PO-2026-118 (remplace celle en attente)' ,
                after    : 'Corriger une réception en route' ,
                hints    :
                {
                    after   : 'La première part et met 3 s à répondre ; la correction, mise en file pendant ce temps, l’attend (after) puis part.' ,
                    flaky   : 'Elle recule de 5 s, puis de 10 s, puis passe.' ,
                    quote   : 'Les lignes attendent le devis, puis reçoivent son numéro.' ,
                    replace : 'Hors ligne, cliquez deux fois : une seule reste en file.' ,
                } ,
            } ,

            controls :
            {
                title       : 'Le réseau et le compte' ,
                offline     : 'Simuler hors ligne' ,
                offlineHelp : 'Rien ne part, tout part dans l’ordre au retour. Pour une vraie coupure : outils de développement → Réseau → Offline.' ,
                account     : 'Compte' ,
                accountHelp : 'Les envois d’un autre compte sont gardés et jamais envoyés.' ,
                online      : 'Serveur joignable' ,
                away        : 'Hors ligne' ,
                draining    : 'Envoi en cours…' ,
                lastSync    : 'Dernier envoi réussi à {0}' ,
                never       : 'Aucun envoi réussi' ,
                send        : 'Envoyer maintenant' ,
                clear       : 'Vider la file' ,
                replay      : 'Rejouer la même clé' ,
                replayHelp  : 'Renvoie le dernier élément livré avec son Idempotency-Key.' ,
                replayNone  : 'Aucun envoi livré à rejouer.' ,
                replayed    : 'Réponse {0}, Idempotent-Replayed : {1}, {2} — rien n’a été créé deux fois.' ,
                created     : 'Réponse {0} : le serveur ne connaissait pas cette clé (il a redémarré ?), il a créé {1}.' ,
                counts      : '{0} en attente · {1} refusé(s) · {2} en conflit · {3} bloqué(s) · {4} livré(s) · {5} d’un autre compte' ,
            } ,

            indicator :
            {
                label : '{0} action(s) à suivre' ,
                text  : 'Le compteur sur l’icône de la barre : useOutbox().counts dans un Indicator.' ,
            } ,

            list :
            {
                title : 'Ce que l’application montre' ,
                text  : 'OutboxList : chaque action nommée par son type, son statut, la raison d’un refus, Réessayer, Abandonner (deux appuis).' ,
            } ,

            kinds : { line : 'Ligne de devis' , quote : 'Devis' , receipt : 'Réception' } ,

            table :
            {
                caption  : 'La file en base, de la plus ancienne à la plus récente' ,
                empty    : 'La file est vide.' ,
                id       : 'Id' ,
                kind     : 'Type' ,
                scope    : 'Compte' ,
                status   : 'Statut' ,
                attempts : 'Essais' ,
                next     : 'Prochain essai' ,
                error    : 'Erreur' ,
                result   : 'Réponse' ,
                actions  : 'Actions' ,
                now      : 'maintenant' ,
                in       : 'dans {0} s' ,
                needs    : 'dépend de {0}' ,
                after    : 'après {0}' ,
                retry    : 'Réessayer' ,
                remove   : 'Abandonner' ,
                exhausted : 'trop d’essais' ,
            } ,

            statuses : { blocked : 'Bloqué' , conflict : 'Conflit' , done : 'Livré' , pending : 'En attente' , posting : 'En cours' , rejected : 'Refusé' } ,

            log :
            {
                title : 'Journal (onSettle)' ,
                text  : 'Chaque élément qui arrive à un état final : c’est là qu’une application affiche un toast.' ,
                empty : 'Rien encore.' ,
            } ,
        } ,
        en :
        {
            title : 'The outbox test bench' ,
            intro : 'The lab’s queue, mounted over all its pages : a queue of intentions kept in IndexedDB (the « lab » database), sent in order to a test route that remembers the idempotency keys. Fill it, cut the network, change page — the banner follows —, switch accounts : nothing is lost (developer tools → Application → IndexedDB → lab).' ,

            queue :
            {
                title    : 'Queue' ,
                text     : 'Each button queues an intention ; online, it leaves at once. The refusals come from the test route (?fail=…).' ,
                simple   : 'A receipt' ,
                photo    : 'A receipt with the photo of the note' ,
                reject   : 'A refused receipt (422)' ,
                conflict : 'In conflict (409)' ,
                modified : 'Changed elsewhere (412)' ,
                flaky    : 'The server fails twice (500)' ,
                quote    : 'A quote and 3 lines that depend on it' ,
                replace  : 'Receipt PO-2026-118 (replaces the pending one)' ,
                after    : 'Correct a receipt on its way' ,
                hints    :
                {
                    after   : 'The first leaves and takes 3 s to answer ; the correction, queued meanwhile, waits for it (after) then leaves.' ,
                    flaky   : 'It backs off 5 s, then 10 s, then goes through.' ,
                    quote   : 'The lines wait for the quote, then receive its number.' ,
                    replace : 'Offline, click twice : only one stays queued.' ,
                } ,
            } ,

            controls :
            {
                title       : 'The network and the account' ,
                offline     : 'Simulate offline' ,
                offlineHelp : 'Nothing leaves, everything leaves in order when back. For a real cut : developer tools → Network → Offline.' ,
                account     : 'Account' ,
                accountHelp : 'The items of another account are kept and never sent.' ,
                online      : 'Server reachable' ,
                away        : 'Offline' ,
                draining    : 'Sending…' ,
                lastSync    : 'Last successful send at {0}' ,
                never       : 'No successful send yet' ,
                send        : 'Send now' ,
                clear       : 'Empty the queue' ,
                replay      : 'Replay the same key' ,
                replayHelp  : 'Sends the last delivered item again with its Idempotency-Key.' ,
                replayNone  : 'No delivered item to replay.' ,
                replayed    : 'Answer {0}, Idempotent-Replayed : {1}, {2} — nothing was created twice.' ,
                created     : 'Answer {0} : the server did not know this key (did it restart ?), it created {1}.' ,
                counts      : '{0} pending · {1} refused · {2} in conflict · {3} blocked · {4} delivered · {5} of another account' ,
            } ,

            indicator :
            {
                label : '{0} action(s) to follow' ,
                text  : 'The counter on the bar icon : useOutbox().counts in an Indicator.' ,
            } ,

            list :
            {
                title : 'What the application shows' ,
                text  : 'OutboxList : each action named by its kind, its status, the reason of a refusal, Retry, Abandon (two presses).' ,
            } ,

            kinds : { line : 'Quote line' , quote : 'Quote' , receipt : 'Receipt' } ,

            table :
            {
                caption  : 'The queue as stored, oldest first' ,
                empty    : 'The queue is empty.' ,
                id       : 'Id' ,
                kind     : 'Kind' ,
                scope    : 'Account' ,
                status   : 'Status' ,
                attempts : 'Attempts' ,
                next     : 'Next attempt' ,
                error    : 'Error' ,
                result   : 'Answer' ,
                actions  : 'Actions' ,
                now      : 'now' ,
                in       : 'in {0} s' ,
                needs    : 'depends on {0}' ,
                after    : 'after {0}' ,
                retry    : 'Retry' ,
                remove   : 'Abandon' ,
                exhausted : 'too many attempts' ,
            } ,

            statuses : { blocked : 'Blocked' , conflict : 'Conflict' , done : 'Delivered' , pending : 'Pending' , posting : 'Sending' , rejected : 'Refused' } ,

            log :
            {
                title : 'Log (onSettle)' ,
                text  : 'Every item reaching a final status : where an application shows a toast.' ,
                empty : 'Nothing yet.' ,
            } ,
        } ,
    } ,
} ;

export default offline ;
