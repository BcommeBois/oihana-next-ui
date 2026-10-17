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

    shell :
    {
        fr :
        {
            online   : 'Serveur joignable' ,
            away     : 'Hors ligne' ,
            asked    : 'La page demandée, {0}, n’a pas encore été ouverte sur cet appareil : elle demande le réseau.' ,
            none     : 'La page demandée demande le réseau.' ,
            retry    : 'Réessayer' ,
            how      : 'Le service worker garde cette page à l’installation (pwa.offlineShell) et y renvoie toute navigation qui échoue, la page demandée dans ?from=. Une page déjà visitée, elle, s’ouvre depuis le cache.' ,
            outbox   : 'Ce qui attend d’être envoyé' ,
            read     : 'Ce qui se lit sans réseau' ,
            readText : 'Les fiches vues ou préparées restent consultables, et la recherche continue sur elles.' ,
            reserve  : 'La réserve →' ,
            bench    : 'La file d’envoi →' ,
        } ,
        en :
        {
            online   : 'Server reachable' ,
            away     : 'Offline' ,
            asked    : 'The page asked for, {0}, was never opened on this device : it needs the network.' ,
            none     : 'The page asked for needs the network.' ,
            retry    : 'Retry' ,
            how      : 'The service worker keeps this page at install (pwa.offlineShell) and sends any failed navigation to it, the page asked for in ?from=. A page already visited opens from the cache.' ,
            outbox   : 'What waits to be sent' ,
            read     : 'What can be read without a network' ,
            readText : 'The records seen or prepared can still be read, and searched.' ,
            reserve  : 'The reserve →' ,
            bench    : 'The outbox →' ,
        } ,
    } ,

    store :
    {
        fr :
        {
            title : 'Lire sans réseau' ,
            intro : 'Une liste de colis cherchée sur le serveur en ligne, et dans la réserve de l’appareil hors ligne — le même écran, qui dit lequel il lit. Une fiche ouverte en ligne est gardée 7 jours ; « Préparer ma journée » garde les 200 colis, épinglés. Coupez le réseau : la recherche continue, sur ce que l’appareil a gardé.' ,
            online       : 'Serveur joignable' ,
            away         : 'Hors ligne' ,
            simulate     : 'Simuler hors ligne' ,
            prepare      : 'Préparer ma journée' ,
            prepareHelp  : 'Garde tous les colis, épinglés, pour la journée.' ,
            prepared     : '{0} colis gardés pour la journée.' ,
            prepareFailed : 'Le serveur n’a pas répondu : rien n’a été gardé.' ,
            search :
            {
                label            : 'Rechercher un colis' ,
                placeholder      : 'Numéro, produit, essence, emplacement, fournisseur…' ,
                essence          : 'Essence' ,
                allEssences      : 'Toutes les essences' ,
                state            : 'État' ,
                allStates        : 'Tous les états' ,
                available        : 'Disponible maintenant' ,
                availableOffline : 'Le stock en temps réel n’existe que sur le serveur : filtre indisponible hors ligne.' ,
            } ,
            mode :
            {
                online  : '{0} colis sur le serveur.' ,
                offline : 'Recherche hors ligne — parmi vos {0} colis.' ,
                empty   : 'Hors ligne, et la réserve est vide : ouvrez des fiches ou préparez la journée une fois en ligne.' ,
            } ,
            table  : { empty : 'Aucun colis.' , essence : 'Essence' , location : 'Emplacement' , number : 'Colis' , product : 'Produit' , state : 'État' } ,
            states : { intact : 'Intact' , opened : 'Entamé' , reserved : 'Réservé' } ,
            detail :
            {
                title         : 'Fiche du colis' ,
                pick          : 'Touchez un numéro pour ouvrir sa fiche.' ,
                missing       : 'Cette fiche n’est pas dans la réserve : ouvrez-la une fois en ligne.' ,
                seen          : 'Vue à {0}' ,
                pinned        : 'épinglée' ,
                expired       : 'périmée' ,
                product       : 'Produit' ,
                essence       : 'Essence' ,
                location      : 'Emplacement' ,
                volume        : 'Volume' ,
                pieces        : 'Pièces' ,
                lot           : 'Lot' ,
                supplier      : 'Fournisseur' ,
                receivedAt    : 'Reçu le' ,
                certification : 'Certification' ,
                drying        : 'Séchage' ,
            } ,
            reserve :
            {
                title   : 'Ce que la réserve garde' ,
                text    : 'Chaque fiche ouverte en ligne est gardée 7 jours ; la journée préparée, épinglée, sans limite. Le ménage retire les fiches périmées, jamais les épinglées, jamais celles dont un envoi en attente a besoin.' ,
                count   : '{0} fiche(s), dont {1} épinglée(s)' ,
                seenAt  : 'Vue le' ,
                expires : 'Expire le' ,
                pinned  : 'épinglée' ,
                forget  : 'Oublier' ,
                sweep   : 'Faire le ménage' ,
                swept   : '{0} fiche(s) retirée(s).' ,
                clear   : 'Vider la réserve' ,
            } ,
        } ,
        en :
        {
            title : 'Reading without a network' ,
            intro : 'A list of parcels searched on the server online, and in the device’s reserve offline — the same screen, which says which one it reads. A record opened online is kept 7 days ; « Prepare my day » keeps the 200 parcels, pinned. Cut the network : the search goes on, over what the device kept.' ,
            online       : 'Server reachable' ,
            away         : 'Offline' ,
            simulate     : 'Simulate offline' ,
            prepare      : 'Prepare my day' ,
            prepareHelp  : 'Keeps every parcel, pinned, for the day.' ,
            prepared     : '{0} parcels kept for the day.' ,
            prepareFailed : 'The server did not answer : nothing was kept.' ,
            search :
            {
                label            : 'Search a parcel' ,
                placeholder      : 'Number, product, species, location, supplier…' ,
                essence          : 'Species' ,
                allEssences      : 'All species' ,
                state            : 'State' ,
                allStates        : 'All states' ,
                available        : 'Available now' ,
                availableOffline : 'Real-time stock only exists on the server : filter unavailable offline.' ,
            } ,
            mode :
            {
                online  : '{0} parcels on the server.' ,
                offline : 'Offline search — among your {0} parcels.' ,
                empty   : 'Offline, and the reserve is empty : open records or prepare the day once online.' ,
            } ,
            table  : { empty : 'No parcel.' , essence : 'Species' , location : 'Location' , number : 'Parcel' , product : 'Product' , state : 'State' } ,
            states : { intact : 'Intact' , opened : 'Opened' , reserved : 'Reserved' } ,
            detail :
            {
                title         : 'Parcel record' ,
                pick          : 'Touch a number to open its record.' ,
                missing       : 'This record is not in the reserve : open it once online.' ,
                seen          : 'Seen at {0}' ,
                pinned        : 'pinned' ,
                expired       : 'expired' ,
                product       : 'Product' ,
                essence       : 'Species' ,
                location      : 'Location' ,
                volume        : 'Volume' ,
                pieces        : 'Pieces' ,
                lot           : 'Lot' ,
                supplier      : 'Supplier' ,
                receivedAt    : 'Received on' ,
                certification : 'Certification' ,
                drying        : 'Drying' ,
            } ,
            reserve :
            {
                title   : 'What the reserve keeps' ,
                text    : 'Every record opened online is kept 7 days ; the prepared day, pinned, without limit. The sweep removes the expired records, never the pinned ones, never the ones a waiting send needs.' ,
                count   : '{0} record(s), {1} pinned' ,
                seenAt  : 'Seen on' ,
                expires : 'Expires on' ,
                pinned  : 'pinned' ,
                forget  : 'Forget' ,
                sweep   : 'Sweep' ,
                swept   : '{0} record(s) removed.' ,
                clear   : 'Empty the reserve' ,
            } ,
        } ,
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
                busy     : 'Le serveur demande d’attendre (429)' ,
                quote    : 'Un devis et 3 lignes qui en dépendent' ,
                replace  : 'La réception PO-2026-118 (remplace celle en attente)' ,
                after    : 'Corriger une réception en route' ,
                hints    :
                {
                    after   : 'La première part et met 3 s à répondre ; la correction, mise en file pendant ce temps, l’attend (after) puis part.' ,
                    flaky   : 'Elle recule de 5 s, puis de 10 s, puis passe.' ,
                    busy    : 'Deux fois « réessayez dans 3 s » : toute la file attend 3 s, sans compter de tentative, puis la réception passe.' ,
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
                busy     : 'The server asks to wait (429)' ,
                quote    : 'A quote and 3 lines that depend on it' ,
                replace  : 'Receipt PO-2026-118 (replaces the pending one)' ,
                after    : 'Correct a receipt on its way' ,
                hints    :
                {
                    after   : 'The first leaves and takes 3 s to answer ; the correction, queued meanwhile, waits for it (after) then leaves.' ,
                    flaky   : 'It backs off 5 s, then 10 s, then goes through.' ,
                    busy    : 'Twice « retry in 3 s » : the whole queue waits 3 s, no attempt counted, then the receipt goes through.' ,
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
