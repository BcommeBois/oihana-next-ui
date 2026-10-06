const modal =
{
    fr :
    {
        title : 'Exemples de modales avec le hook useModal' ,
        close : 'Fermer' ,

        simple :
        {
            title   : 'Modale simple' ,
            trigger : 'Ouvrir la modale simple' ,
            modal   : 'Bonjour !' ,
            body    : 'Appuyez sur Échap ou cliquez sur le bouton ci-dessous pour fermer.' ,
        } ,

        i18n :
        {
            title       : 'Libellés localisés' ,
            note        : 'Aucune des trois modales ci-dessous ne reçoit de prop agree, disagree ni closeTitle. Chaque libellé — les deux boutons et le nom accessible de la croix de fermeture — est lu dans le bundle components.modal. Basculez la langue du labo et rouvrez-les : les libellés suivent.' ,
            modalBody   : 'Libellés de base : components.modal.agree et components.modal.disagree.' ,
            confirmBody : 'Le bouton de validation lit components.modal.confirm.agree, celui de refus retombe sur components.modal.disagree.' ,
            alertBody   : 'Un seul bouton, qui lit components.modal.alert.agree.' ,
        } ,

        popover :
        {
            title       : 'Mode popover — léger, non bloquant (usePopover)' ,
            note        : 'usePopover, sur demande : la modale passe par l\'API Popover native du navigateur au lieu d\'un dialog. Elle peut s\'ouvrir DÉCLARATIVEMENT (un bouton avec popovertarget, sans JS) ou par useModal. Échap et un clic sur le fond la ferment. Elle NE bloque PAS la page — pour des panneaux légers, pas pour une confirmation bloquante.' ,
            declarative : 'Ouvrir (déclaratif — sans JS)' ,
            viaHook     : 'Ouvrir (par useModal)' ,
            declTitle   : 'Modale popover (déclarative)' ,
            declBody    : 'Ouverte par un bouton portant popovertarget — zéro JavaScript. Échap ou un clic sur le fond la ferme.' ,
            hookTitle   : 'Modale popover (par useModal)' ,
            hookBody    : 'Le même mode popover, ouvert et fermé par le hook useModal.' ,
        } ,

        breakpoint :
        {
            title   : 'Plein écran responsive (point de rupture)' ,
            md      : 'Plein écran sous md (mobile)' ,
            lg      : 'Plein écran sous lg (tablette + mobile)' ,
            xl      : 'Plein écran sous xl (bureau + tablette + mobile)' ,
            lead    : 'Cette modale est :' ,
            mdTitle : 'Plein écran sur mobile' ,
            mdFull  : 'Plein écran sur mobile (sous 768 px)' ,
            mdNorm  : 'Normale sur bureau (à partir de 768 px)' ,
            resize  : 'Redimensionnez votre fenêtre pour voir l\'effet.' ,
            lgTitle : 'Plein écran sur tablette et mobile' ,
            lgFull  : 'Plein écran sur tablette et mobile (sous 1024 px)' ,
            lgNorm  : 'Normale sur grand écran (à partir de 1024 px)' ,
            xlTitle : 'Presque toujours en plein écran' ,
            xlFull  : 'Plein écran jusqu\'à xl (sous 1280 px)' ,
            xlNorm  : 'Normale seulement sur les très grands écrans (à partir de 1280 px)' ,
        } ,

        toggle :
        {
            title  : 'Bascule d\'une modale (avec suivi d\'état)' ,
            open   : 'Ouvrir la bascule' ,
            close  : 'Fermer la bascule' ,
            opened : 'Ouverte' ,
            closed : 'Fermée' ,
            modal  : 'Modale à bascule' ,
            body   : 'Cette modale se sert de la fonction toggle et de l\'état isOpen.' ,
        } ,

        alerts :
        {
            title        : 'Modales d’alerte (un seul bouton)' ,
            success      : 'Alerte de réussite' ,
            info         : 'Alerte d’information' ,
            warning      : 'Alerte d’avertissement' ,
            error        : 'Alerte d’erreur' ,
            successTitle : 'Réussi !' ,
            successAgree : 'Parfait !' ,
            successBody  : 'Votre opération s’est terminée correctement.' ,
            infoTitle    : 'Information' ,
            infoAgree    : 'Compris' ,
            infoLead     : 'Quelques informations importantes :' ,
            infoList     : [ 'Votre session expirera dans 10 minutes' , 'Enregistrez votre travail régulièrement' , 'Contactez le support en cas de besoin' ] ,
            warningTitle : 'Avertissement' ,
            warningAgree : 'J’ai compris' ,
            warningBody  : 'Cette action peut avoir des conséquences imprévues.' ,
            errorTitle   : 'Erreur' ,
            errorLead    : 'Le paiement n’a pas pu être traité' ,
            errorBody    : 'Vérifiez vos informations de paiement et réessayez.' ,
            errorCode    : 'Code d’erreur : CARD_DECLINED' ,
        } ,

        confirms :
        {
            title          : 'Modales de confirmation (deux boutons)' ,
            delete         : 'Supprimer l’élément' ,
            save           : 'Enregistrer les modifications' ,
            deleteTitle    : 'Supprimer l’élément' ,
            deleteAgree    : 'Supprimer' ,
            deleteDisagree : 'Annuler' ,
            deleteBody     : 'Voulez-vous vraiment supprimer cet élément ?' ,
            deleteWarning  : 'Cette action est irréversible.' ,
            saveTitle      : 'Enregistrer les modifications' ,
            saveAgree      : 'Enregistrer' ,
            saveDisagree   : 'Abandonner' ,
            saveBody       : 'Vous avez des modifications non enregistrées. Voulez-vous les enregistrer avant de partir ?' ,
        } ,

        fullscreen :
        {
            title   : 'Modale en plein écran' ,
            trigger : 'Ouvrir la modale en plein écran' ,
            modal   : 'Modale en plein écran' ,
            lead    : 'Cette modale occupe tout l’écran' ,
            body    : 'Pratique pour un contenu immersif ou un formulaire' ,
        } ,

        placement :
        {
            title           : 'Responsive et placement' ,
            responsive      : 'Responsive (bas → milieu)' ,
            top             : 'Placement en haut' ,
            bottom          : 'Placement en bas' ,
            responsiveTitle : 'Modale responsive' ,
            responsiveBody  : 'Cette modale s’affiche en bas sur mobile (modal-bottom) et au milieu sur bureau (sm:modal-middle).' ,
            topTitle        : 'Modale en haut' ,
            topBody         : 'Cette modale est positionnée en haut de l’écran.' ,
            bottomTitle     : 'Modale en bas' ,
            bottomBody      : 'Cette modale est positionnée en bas de l’écran.' ,
        } ,

        width :
        {
            title   : 'Largeur sur mesure' ,
            trigger : 'Ouvrir une modale large (max-w-5xl)' ,
            modal   : 'Modale large' ,
            lead    : 'Cette modale a une largeur maximale de 5xl.' ,
            columns : [ 'Colonne 1' , 'Colonne 2' , 'Colonne 3' ] ,
            cells   : [ 'Une modale large va bien à un contenu complexe' , 'Comme une mise en page en colonnes' , 'Ou un formulaire détaillé' ] ,
        } ,

        behavior :
        {
            title           : 'Options de comportement' ,
            noBackdrop      : 'Sans clic sur le fond' ,
            noEsc           : 'Sans touche Échap' ,
            withClose       : 'Avec une croix de fermeture' ,
            noBackdropTitle : 'Sans clic sur le fond' ,
            noBackdropLead  : 'Cliquer à côté ne ferme pas cette modale.' ,
            noBackdropBody  : 'Servez-vous du bouton ou de la touche Échap.' ,
            noEscTitle      : 'Sans touche Échap' ,
            noEscLead       : 'La touche Échap ne ferme pas cette modale.' ,
            noEscBody       : 'Servez-vous du bouton ou cliquez à côté.' ,
            closeTitle      : 'Croix de fermeture dans le coin' ,
            closeBody       : 'Cette modale porte une croix de fermeture en haut à droite.' ,
            closeAgree      : 'OK' ,
        } ,

        customFooter :
        {
            title         : 'Pied sur mesure' ,
            noFooter      : 'Sans pied' ,
            options       : 'Options de pied sur mesure' ,
            noFooterTitle : 'Modale sans pied' ,
            noFooterBody  : 'Cette modale n’a pas de pied. Fermez-la par la croix ou par Échap.' ,
            modal         : 'Pied sur mesure' ,
            accept        : 'Accepter' ,
            decline       : 'Refuser' ,
            learn         : 'En savoir plus' ,
            body          : 'Cette modale porte un bouton de son cru dans le pied, à côté des boutons standards.' ,
        } ,

        footerNode :
        {
            title       : 'footerNode — pied collé en bas, contenu qui défile' ,
            when        : 'Quand se servir de footerNode' ,
            note        : 'Servez-vous de la prop footerNode quand le pied standard agree / disagree est trop rigide — typiquement pour un formulaire avec une ligne d\'état, des boutons à soi, ou toute mise en page qui n\'entre pas dans la rangée modal-action par défaut.' ,
            givesTitle  : '✅ Ce que ça apporte' ,
            givesList   : [ 'Le pied toujours collé au bas de la modale' , 'La zone de contenu qui défile seule, en douceur' , 'L\'en-tête qui reste en haut' , 'Aucun !important à poser' , 'Aucune tuyauterie modalBoxClassName à écrire' ] ,
            rulesTitle  : '⚠️ Règles de priorité' ,
            rulesLead   : 'Quand footerNode est donné, ces props sont IGNORÉES :' ,
            rulesNote   : 'Un console.warn est émis en développement si l’une d’elles est passée à côté.' ,
            standard    : 'Le mode standard (sans footerNode) ne change pas : le comportement de showFooter, avec sa rangée agree / disagree collée en bas, fonctionne exactement comme avant.' ,
            beforeAfter : 'Avant / après' ,
            before      : '❌ Avant (recette à la main — 8 lignes, 5 marqueurs !)' ,
            after       : '✅ Après — une prop, aucune surcharge' ,
            trigger     : 'Ouvrir une modale avec footerNode et un long formulaire' ,
            modal       : 'Modifier un profil (long formulaire)' ,
            saved       : 'Enregistré il y a 2 secondes' ,
            cancel      : 'Annuler' ,
            save        : 'Enregistrer' ,
            scroll      : 'Faites défiler dans cette modale : l\'en-tête reste en haut et le pied reste visible en bas pendant que le formulaire défile.' ,
            field       : 'Champ {0}' ,
            fieldHint   : 'Saisissez la valeur du champ {0}' ,
        } ,

        form :
        {
            title        : 'Formulaire dans une modale' ,
            trigger      : 'Ouvrir la modale de formulaire' ,
            modal        : 'Inscription' ,
            submit       : 'Envoyer' ,
            cancel       : 'Annuler' ,
            name         : 'Nom' ,
            nameHint     : 'Saisissez votre nom' ,
            email        : 'Courriel' ,
            emailHint    : 'Saisissez votre courriel' ,
            password     : 'Mot de passe' ,
            passwordHint : 'Saisissez un mot de passe' ,
            terms        : 'J’accepte les conditions d’utilisation' ,
        } ,

        hookUsage :
        {
            title : 'Usage du hook useModal' ,
        } ,

        stacked :
        {
            title      : 'Modales empilées (imbrication)' ,
            note       : 'On peut ouvrir plusieurs modales l\'une sur l\'autre : le navigateur gère l\'ordre d\'empilement.' ,
            trigger    : 'Ouvrir la modale de niveau 1' ,
            l1Title    : 'Niveau 1 : configuration' ,
            l1Agree    : 'Tout enregistrer' ,
            l1Disagree : 'Annuler' ,
            l1Body     : 'Voici la première couche. On pourrait y configurer un objet complexe.' ,
            l1Ask      : 'Besoin d’ajouter un sous-élément ?' ,
            l1Open     : 'Ouvrir le niveau 2 : formulaire du sous-élément' ,
            l1Note     : 'Le fond du niveau 2 recouvrira le niveau 1.' ,
            l2Title    : 'Niveau 2 : détails du sous-élément' ,
            l2Agree    : 'Ajouter le sous-élément' ,
            l2Disagree : 'Revenir' ,
            l2Name     : 'Nom du sous-élément' ,
            l2NameHint : 'par ex. Composant X' ,
            l2Divider  : 'Garde-fou' ,
            l2Body     : 'Avant de confirmer, on peut même ouvrir une troisième couche.' ,
            l2Delete   : 'Supprimer le sous-élément (niveau 3)' ,
            l3Title    : 'Niveau 3 : confirmer la suppression' ,
            l3Agree    : 'Supprimer maintenant' ,
            l3Disagree : 'Le garder' ,
            l3Body     : 'Vraiment sûr ? C’est la troisième couche de modales.' ,
        } ,

        closeAll :
        {
            title       : 'Tout fermer d’un coup' ,
            note        : 'closeAllOpenDialogs() ferme chaque <dialog> ouvert du document, sans rien demander — ce qu’il faut avant un départ forcé, et seulement là. Les deux modales ci-dessous partent ensemble, depuis un bouton de la seconde.' ,
            trigger     : 'Ouvrir la première modale' ,
            firstTitle  : 'Première couche' ,
            firstBody   : 'Celle-ci reste ouverte sous la suivante.' ,
            openSecond  : 'Ouvrir la seconde par-dessus' ,
            secondTitle : 'Seconde couche' ,
            secondBody  : 'Un seul appel, et les deux s’en vont.' ,
            closeAll    : 'Tout fermer' ,
        } ,
    } ,
    en :
    {
        title : 'Modal examples with the useModal hook' ,
        close : 'Close' ,

        simple :
        {
            title   : 'Simple modal' ,
            trigger : 'Open the simple modal' ,
            modal   : 'Hello!' ,
            body    : 'Press ESC or click the button below to close.' ,
        } ,

        i18n :
        {
            title       : 'Localized labels' ,
            note        : 'None of the three modals below is given an agree, a disagree or a closeTitle prop. Every label — the two buttons and the accessible name of the header close button — is read from the components.modal bundle. Switch the language of the lab and reopen them : the labels follow.' ,
            modalBody   : 'Base labels : components.modal.agree and components.modal.disagree.' ,
            confirmBody : 'The agree button reads components.modal.confirm.agree, the disagree button falls back to the base components.modal.disagree.' ,
            alertBody   : 'Single button, reading components.modal.alert.agree.' ,
        } ,

        popover :
        {
            title       : 'Popover mode — light, non-blocking (usePopover)' ,
            note        : 'usePopover, opt-in : the modal renders through the browser\'s native Popover API instead of a dialog. It can be opened DECLARATIVELY (a button with popovertarget, no JS) or through useModal. Escape and a backdrop click close it. It does NOT block the page — use it for light panels, not for a blocking confirmation.' ,
            declarative : 'Open (declarative — no JS)' ,
            viaHook     : 'Open (through useModal)' ,
            declTitle   : 'Popover modal (declarative)' ,
            declBody    : 'Opened by a button carrying popovertarget — zero JavaScript. Escape or a backdrop click closes it.' ,
            hookTitle   : 'Popover modal (through useModal)' ,
            hookBody    : 'The same popover mode, opened and closed through the useModal hook.' ,
        } ,

        breakpoint :
        {
            title   : 'Responsive fullscreen (breakpoint)' ,
            md      : 'Fullscreen under md (mobile)' ,
            lg      : 'Fullscreen under lg (tablet + mobile)' ,
            xl      : 'Fullscreen under xl (desktop + tablet + mobile)' ,
            lead    : 'This modal is :' ,
            mdTitle : 'Mobile fullscreen' ,
            mdFull  : 'Fullscreen on mobile (under 768 px)' ,
            mdNorm  : 'Normal on desktop (from 768 px)' ,
            resize  : 'Resize your window to see the effect.' ,
            lgTitle : 'Tablet and mobile fullscreen' ,
            lgFull  : 'Fullscreen on tablet and mobile (under 1024 px)' ,
            lgNorm  : 'Normal on a large screen (from 1024 px)' ,
            xlTitle : 'Almost always fullscreen' ,
            xlFull  : 'Fullscreen up to xl (under 1280 px)' ,
            xlNorm  : 'Normal only on very large screens (from 1280 px)' ,
        } ,

        toggle :
        {
            title  : 'Toggling a modal (with state tracking)' ,
            open   : 'Open the toggle' ,
            close  : 'Close the toggle' ,
            opened : 'Open' ,
            closed : 'Closed' ,
            modal  : 'Toggle modal' ,
            body   : 'This modal uses the toggle function and the isOpen state.' ,
        } ,

        alerts :
        {
            title        : 'Alert modals (single button)' ,
            success      : 'Success alert' ,
            info         : 'Info alert' ,
            warning      : 'Warning alert' ,
            error        : 'Error alert' ,
            successTitle : 'Success!' ,
            successAgree : 'Great!' ,
            successBody  : 'Your operation was completed successfully.' ,
            infoTitle    : 'Information' ,
            infoAgree    : 'Got it' ,
            infoLead     : 'Here\'s some important information :' ,
            infoList     : [ 'Your session will expire in 10 minutes' , 'Please save your work regularly' , 'Contact support if you need help' ] ,
            warningTitle : 'Warning' ,
            warningAgree : 'I understand' ,
            warningBody  : 'This action may have unintended consequences.' ,
            errorTitle   : 'Error' ,
            errorLead    : 'Payment could not be processed' ,
            errorBody    : 'Please check your payment information and try again.' ,
            errorCode    : 'Error code : CARD_DECLINED' ,
        } ,

        confirms :
        {
            title          : 'Confirmation modals (two buttons)' ,
            delete         : 'Delete the item' ,
            save           : 'Save changes' ,
            deleteTitle    : 'Delete the item' ,
            deleteAgree    : 'Delete' ,
            deleteDisagree : 'Cancel' ,
            deleteBody     : 'Are you sure you want to delete this item?' ,
            deleteWarning  : 'This action cannot be undone.' ,
            saveTitle      : 'Save changes' ,
            saveAgree      : 'Save' ,
            saveDisagree   : 'Discard' ,
            saveBody       : 'You have unsaved changes. Do you want to save them before leaving?' ,
        } ,

        fullscreen :
        {
            title   : 'Fullscreen modal' ,
            trigger : 'Open the fullscreen modal' ,
            modal   : 'Fullscreen modal' ,
            lead    : 'This modal takes the full screen' ,
            body    : 'Great for immersive content or a form' ,
        } ,

        placement :
        {
            title           : 'Responsive and placement' ,
            responsive      : 'Responsive (bottom → middle)' ,
            top             : 'Top placement' ,
            bottom          : 'Bottom placement' ,
            responsiveTitle : 'Responsive modal' ,
            responsiveBody  : 'This modal appears at the bottom on mobile (modal-bottom) and in the middle on desktop (sm:modal-middle).' ,
            topTitle        : 'Top modal' ,
            topBody         : 'This modal is positioned at the top of the screen.' ,
            bottomTitle     : 'Bottom modal' ,
            bottomBody      : 'This modal is positioned at the bottom of the screen.' ,
        } ,

        width :
        {
            title   : 'Custom width' ,
            trigger : 'Open a wide modal (max-w-5xl)' ,
            modal   : 'Wide modal' ,
            lead    : 'This modal has a custom maximum width of 5xl.' ,
            columns : [ 'Column 1' , 'Column 2' , 'Column 3' ] ,
            cells   : [ 'A wide modal suits complex content' , 'Like a multi-column layout' , 'Or a detailed form' ] ,
        } ,

        behavior :
        {
            title           : 'Behavior options' ,
            noBackdrop      : 'No backdrop click' ,
            noEsc           : 'No ESC key' ,
            withClose       : 'With a close button' ,
            noBackdropTitle : 'No backdrop click' ,
            noBackdropLead  : 'Clicking outside will not close this modal.' ,
            noBackdropBody  : 'Use the button or the ESC key to close.' ,
            noEscTitle      : 'No ESC key' ,
            noEscLead       : 'The ESC key will not close this modal.' ,
            noEscBody       : 'Use the button or click outside to close.' ,
            closeTitle      : 'Close button in the corner' ,
            closeBody       : 'This modal has a close button in the top-right corner.' ,
            closeAgree      : 'OK' ,
        } ,

        customFooter :
        {
            title         : 'Custom footer' ,
            noFooter      : 'No footer' ,
            options       : 'Custom footer options' ,
            noFooterTitle : 'Modal without a footer' ,
            noFooterBody  : 'This modal has no footer. Close it with the cross or the ESC key.' ,
            modal         : 'Custom footer' ,
            accept        : 'Accept' ,
            decline       : 'Decline' ,
            learn         : 'Learn more' ,
            body          : 'This modal has a button of its own in the footer, beside the standard ones.' ,
        } ,

        footerNode :
        {
            title       : 'footerNode — footer pinned at the bottom, content that scrolls' ,
            when        : 'When to use footerNode' ,
            note        : 'Use the footerNode prop when the standard agree / disagree footer is too rigid — typically for a form with a status line, buttons of your own, or any layout that does not fit the default modal-action row.' ,
            givesTitle  : '✅ What it gives you' ,
            givesList   : [ 'The footer always pinned at the bottom of the modal-box' , 'The content area scrolling on its own, smoothly' , 'The header staying at the top' , 'No !important override to write' , 'No modalBoxClassName boilerplate' ] ,
            rulesTitle  : '⚠️ Precedence rules' ,
            rulesLead   : 'When footerNode is set, these props are IGNORED :' ,
            rulesNote   : 'A console.warn is emitted in development if any of them is passed alongside.' ,
            standard    : 'Standard mode (without footerNode) is unchanged : the showFooter behaviour, with its pinned agree / disagree row, still works exactly as before.' ,
            beforeAfter : 'Before / after' ,
            before      : '❌ Before (manual recipe — 8 lines, 5 ! markers)' ,
            after       : '✅ After — one prop, no overrides' ,
            trigger     : 'Open a modal with footerNode and a long form' ,
            modal       : 'Edit a profile (long form)' ,
            saved       : 'Saved 2 seconds ago' ,
            cancel      : 'Cancel' ,
            save        : 'Save' ,
            scroll      : 'Scroll inside this modal : the header stays at the top and the footer stays visible at the bottom while the form scrolls.' ,
            field       : 'Field {0}' ,
            fieldHint   : 'Enter the value for field {0}' ,
        } ,

        form :
        {
            title        : 'Form in a modal' ,
            trigger      : 'Open the form modal' ,
            modal        : 'Registration' ,
            submit       : 'Submit' ,
            cancel       : 'Cancel' ,
            name         : 'Name' ,
            nameHint     : 'Enter your name' ,
            email        : 'Email' ,
            emailHint    : 'Enter your email' ,
            password     : 'Password' ,
            passwordHint : 'Enter a password' ,
            terms        : 'Accept the terms and conditions' ,
        } ,

        hookUsage :
        {
            title : 'useModal hook usage' ,
        } ,

        stacked :
        {
            title      : 'Stacked modals (nesting)' ,
            note       : 'Several modals can be opened on top of each other : the browser handles the stacking order.' ,
            trigger    : 'Open the Level 1 modal' ,
            l1Title    : 'Level 1 : configuration' ,
            l1Agree    : 'Save all' ,
            l1Disagree : 'Cancel' ,
            l1Body     : 'This is the first layer. You might be configuring a complex object here.' ,
            l1Ask      : 'Need to add a sub-item?' ,
            l1Open     : 'Open Level 2 : the sub-item form' ,
            l1Note     : 'The backdrop of Level 2 will cover Level 1.' ,
            l2Title    : 'Level 2 : sub-item details' ,
            l2Agree    : 'Add the sub-item' ,
            l2Disagree : 'Go back' ,
            l2Name     : 'Sub-item name' ,
            l2NameHint : 'e.g. Component X' ,
            l2Divider  : 'Safety check' ,
            l2Body     : 'Before confirming, a third layer can even be opened.' ,
            l2Delete   : 'Delete the sub-item (Level 3)' ,
            l3Title    : 'Level 3 : confirm the deletion' ,
            l3Agree    : 'Delete now' ,
            l3Disagree : 'Keep it' ,
            l3Body     : 'Are you absolutely sure? This is the third layer of modals.' ,
        } ,

        closeAll :
        {
            title       : 'Closing them all at once' ,
            note        : 'closeAllOpenDialogs() closes every open <dialog> in the document, without asking — what a forced departure needs, and nothing else. The two modals below leave together, from a button inside the second one.' ,
            trigger     : 'Open the first modal' ,
            firstTitle  : 'First layer' ,
            firstBody   : 'This one stays open under the next.' ,
            openSecond  : 'Open the second one over it' ,
            secondTitle : 'Second layer' ,
            secondBody  : 'One call, and both of them go.' ,
            closeAll    : 'Close them all' ,
        } ,
    } ,
} ;

export default modal ;
