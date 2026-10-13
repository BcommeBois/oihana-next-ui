/**
 * Labels of the field demo : the network, the screen, the keys.
 */
const field =
{
    fr :
    {
        title : 'Sur le terrain' ,
        intro : 'Avant tout composant, trois choses qu’un écran tenu en main demande : savoir si le serveur est joignable, garder l’écran allumé, et des touches qui agissent. Le bandeau de connexion n’apparaît que hors ligne : coupez le réseau (mode avion, ou l’onglet Réseau des outils de développement en « Offline ») pour le voir.' ,

        online :
        {
            title : 'Le réseau' ,
            text  : 'navigator.onLine dit si une interface est active, pas si le serveur répond : useOnline le confirme par un HEAD de /version.json, et réessaie toutes les 30 s hors ligne.' ,
            yes   : 'Serveur joignable' ,
            no    : 'Hors ligne' ,
            since : 'depuis {0}' ,
            check : 'Vérifier maintenant' ,
        } ,

        wake :
        {
            title       : 'L’écran' ,
            text        : 'Le verrou d’écran est relâché par le navigateur quand l’onglet passe en arrière-plan ; useWakeLock le redemande au retour. Un choix du moment, rien n’est gardé.' ,
            on          : 'Écran gardé allumé' ,
            off         : 'Écran libre' ,
            unsupported : 'Pas de Screen Wake Lock ici (Firefox, ancien Safari, ou http).' ,
        } ,

        keys :
        {
            title     : 'Les touches' ,
            text      : 'useHotkeys : touches de fonction, raccourcis, une lettre seule. Une lettre tapée dans le champ reste une lettre ; F1 et Échap passent quoi qu’il arrive.' ,
            last      : 'dernière touche : {0}' ,
            none      : 'appuyez sur une touche' ,
            field     : 'Un champ' ,
            fieldHelp : 'Tapez « v » ici : rien ne se déclenche' ,
        } ,
    } ,
    en :
    {
        title : 'In the field' ,
        intro : 'Before any component, three things a hand-held screen asks for: whether the server can be reached, a screen that stays on, and keys that act. The connection band shows only offline: cut the network (airplane mode, or the Network tab of the developer tools set to Offline) to see it.' ,

        online :
        {
            title : 'The network' ,
            text  : 'navigator.onLine says whether an interface is up, not whether the server answers: useOnline confirms it with a HEAD of /version.json, and tries again every 30 s while offline.' ,
            yes   : 'Server reachable' ,
            no    : 'Offline' ,
            since : 'since {0}' ,
            check : 'Check now' ,
        } ,

        wake :
        {
            title       : 'The screen' ,
            text        : 'The browser releases the screen lock when the tab goes to the background; useWakeLock asks again on return. A choice of the moment, nothing is kept.' ,
            on          : 'Screen kept on' ,
            off         : 'Screen free' ,
            unsupported : 'No Screen Wake Lock here (Firefox, older Safari, or http).' ,
        } ,

        keys :
        {
            title     : 'The keys' ,
            text      : 'useHotkeys: function keys, shortcuts, a bare letter. A letter typed in the field stays a letter; F1 and Escape go through whatever has the focus.' ,
            last      : 'last key: {0}' ,
            none      : 'press a key' ,
            field     : 'A field' ,
            fieldHelp : 'Type « v » here: nothing fires' ,
        } ,
    } ,
} ;

export default field ;
