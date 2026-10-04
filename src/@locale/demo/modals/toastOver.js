const toastOver =
{
    fr :
    {
        title       : 'Un toast au-dessus d’une modale' ,
        description : 'Vérifiez qu’un toast passe au-dessus du fond d’une modale. Le cas d’essai : le top layer natif du dialog contre le popover du ToastProvider.' ,

        vertical   : 'Vertical' ,
        horizontal : 'Horizontal' ,
        current    : 'Actuel' ,
        close      : 'Fermer' ,

        basic :
        {
            trigger : 'Ouvrir une modale avec des toasts' ,
            title   : 'Un toast au-dessus d’une modale' ,
            body    : 'Cliquez sur n’importe lequel des boutons ci-dessous. Chaque toast doit apparaître AU-DESSUS du fond de la modale, et rester entièrement cliquable (sa croix doit fonctionner).' ,
            success : 'Déclencher un toast de réussite' ,
            warning : 'Déclencher un toast d’avertissement' ,
            error   : 'Déclencher un toast d’erreur' ,
            saved   : 'Enregistré !' ,
            review  : 'Attention — relisez votre saisie.' ,
            wrong   : 'Quelque chose s’est mal passé.' ,
        } ,

        stress :
        {
            divider   : 'Épreuve : un toast sous des modales empilées' ,
            note      : 'Ces boutons déclenchent un toast D’ABORD, puis ouvrent une modale quelques centaines de millisecondes plus tard. Sans le MutationObserver du fournisseur, la modale volerait le sommet de la pile du top layer et masquerait le toast. Avec lui, le popover du toast est repromu dès que le nouveau dialog s’ouvre.' ,
            thenOpen  : 'Toast → puis ouvrir le niveau 1' ,
            thenStack : 'Toast → puis empiler 3 modales' ,
            first     : 'Toast déclenché avant l’ouverture — il doit rester au-dessus !' ,
            survive   : 'Regardez-moi survivre à 3 modales empilées.' ,

            level1       : 'Niveau 1 (ouvert après le toast)' ,
            level1Body   : 'Cette modale a été ouverte APRÈS que le toast était déjà visible. Le MutationObserver du fournisseur doit avoir repromu le popover du toast au sommet de la pile du top layer.' ,
            openLevel2   : 'Ouvrir le niveau 2' ,
            fromLevel1   : 'Déclencher un toast d’erreur depuis ici' ,
            fromLevel1Ko : 'Toast déclenché depuis le niveau 1 !' ,

            level2     : 'Niveau 2' ,
            level2Body : 'Le niveau 2 est ouvert. Le toast doit toujours être visible au-dessus du fond.' ,
            openLevel3 : 'Ouvrir le niveau 3' ,

            level3     : 'Niveau 3' ,
            level3Body : 'Niveau 3 — le plus profond de la pile. Le toast doit toujours être au-dessus.' ,
        } ,

        note : 'Essayez toutes les combinaisons ({0} × {1} = 9 positions) : haut / milieu / bas × début / centre / fin. Chaque toast doit s’ancrer au coin, au bord ou au centre choisi — indépendamment de l’endroit où se trouve la modale.' ,
    } ,
    en :
    {
        title       : 'Toast over Modal' ,
        description : 'Check that a toast appears above a modal backdrop. The test case : the native dialog top layer against the ToastProvider popover.' ,

        vertical   : 'Vertical' ,
        horizontal : 'Horizontal' ,
        current    : 'Current' ,
        close      : 'Close' ,

        basic :
        {
            trigger : 'Open a modal with toast triggers' ,
            title   : 'Toast over Modal' ,
            body    : 'Click any of the buttons below. Each toast must appear ABOVE the modal backdrop, and stay fully clickable (its close cross must work).' ,
            success : 'Trigger success toast' ,
            warning : 'Trigger warning toast' ,
            error   : 'Trigger error toast' ,
            saved   : 'Saved successfully!' ,
            review  : 'Heads up — please review your input.' ,
            wrong   : 'Something went wrong.' ,
        } ,

        stress :
        {
            divider   : 'Stress test : a toast under stacked modals' ,
            note      : 'These buttons fire a toast FIRST, then open a modal a few hundred milliseconds later. Without the MutationObserver in the provider, the modal would steal the top of the top-layer stack and hide the toast. With it, the toast popover is re-promoted as soon as the new dialog opens.' ,
            thenOpen  : 'Toast → then open Level 1' ,
            thenStack : 'Toast → then auto-stack 3 modals' ,
            first     : 'Toast fired before opening the modal — it should stay on top!' ,
            survive   : 'Watch me survive 3 stacked modals.' ,

            level1       : 'Level 1 (opened after the toast)' ,
            level1Body   : 'This modal was opened AFTER the toast was already visible. The MutationObserver in the provider should have re-promoted the toast popover to the top of the top-layer stack.' ,
            openLevel2   : 'Open Level 2' ,
            fromLevel1   : 'Trigger an error toast from here' ,
            fromLevel1Ko : 'Toast fired from Level 1!' ,

            level2     : 'Level 2' ,
            level2Body : 'Level 2 is open. The toast should still be visible above the backdrop.' ,
            openLevel3 : 'Open Level 3' ,

            level3     : 'Level 3' ,
            level3Body : 'Level 3 — deepest stack. The toast should still be on top.' ,
        } ,

        note : 'Try every combination ({0} × {1} = 9 positions) : top / middle / bottom × start / center / end. Each toast should anchor at the chosen corner, edge or center — independently of where the modal sits.' ,
    } ,
} ;

export default toastOver ;
