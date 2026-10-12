const feedback =
{
    fr :
    {
        state :
        {
            title    : 'État de l’appareil' ,
            note     : 'Le son ne joue qu’après un premier geste sur la page : un clic n’importe où le déverrouille. La vibration n’existe que sur Android.' ,
            unlocked : 'son déverrouillé' ,
            locked   : 'son verrouillé' ,
            audio    : 'Web Audio' ,
            vibrate  : 'vibration' ,
            yes      : 'oui' ,
            no       : 'non' ,
            unlock   : 'Déverrouiller le son' ,
        } ,
        settings :
        {
            title      : 'Réglages' ,
            note       : 'Ce sont des réglages de l’écran — une préférence du profil, par exemple — pas du hook.' ,
            sound      : 'Son' ,
            vibration  : 'Vibration' ,
            volume     : 'Volume' ,
            silent     : 'Jouer malgré le bouton silencieux (iPhone)' ,
            silentHelp : 'ignoreSilentMode : désactivé par défaut, puisqu’il passe outre un choix de l’utilisateur. Safari 17 et plus.' ,
        } ,
        signals :
        {
            title   : 'Les trois signaux' ,
            note    : 'Reconnaissables sans regarder : un bip aigu et court, deux bips, un bourdonnement grave.' ,
            success : 'Succès' ,
            warning : 'Attention' ,
            error   : 'Erreur' ,
        } ,
        custom :
        {
            title  : 'Un signal à soi' ,
            note   : 'Une suite de notes (fréquence, durée, forme d’onde, silence avant) et un motif de vibration, passés dans signals.' ,
            button : 'Terminé' ,
        } ,
        scan :
        {
            title    : 'Avec ce que l’écran affiche' ,
            note     : 'Le hook émet le signal ; l’écran choisit ce qu’il montre à côté. Ici une alerte, ailleurs une couleur ou rien du tout.' ,
            good     : 'Scanner le bon code' ,
            bad      : 'Scanner un mauvais code' ,
            accepted : 'Emplacement correct : H2-04-B.' ,
            refused  : 'Mauvais emplacement : attendu H2-04-B, scanné H2-04-C.' ,
            waiting  : 'Aucun scan pour l’instant.' ,
        } ,
    } ,

    en :
    {
        state :
        {
            title    : 'Device state' ,
            note     : 'Sound only plays after a first gesture on the page : a click anywhere unlocks it. Vibration exists on Android only.' ,
            unlocked : 'sound unlocked' ,
            locked   : 'sound locked' ,
            audio    : 'Web Audio' ,
            vibrate  : 'vibration' ,
            yes      : 'yes' ,
            no       : 'no' ,
            unlock   : 'Unlock the sound' ,
        } ,
        settings :
        {
            title      : 'Settings' ,
            note       : 'These are the screen’s settings — a profile preference, say — not the hook’s.' ,
            sound      : 'Sound' ,
            vibration  : 'Vibration' ,
            volume     : 'Volume' ,
            silent     : 'Play through the silent switch (iPhone)' ,
            silentHelp : 'ignoreSilentMode : off by default, since it overrides a choice the user made. Safari 17 and later.' ,
        } ,
        signals :
        {
            title   : 'The three signals' ,
            note    : 'Told apart without looking : a short high beep, two beeps, a low buzz.' ,
            success : 'Success' ,
            warning : 'Warning' ,
            error   : 'Error' ,
        } ,
        custom :
        {
            title  : 'A signal of your own' ,
            note   : 'A sequence of tones (frequency, duration, wave, silence before) and a vibration pattern, passed in signals.' ,
            button : 'Done' ,
        } ,
        scan :
        {
            title    : 'With what the screen shows' ,
            note     : 'The hook emits the signal ; the screen picks what it shows beside it. An alert here, a colour or nothing elsewhere.' ,
            good     : 'Scan the right code' ,
            bad      : 'Scan a wrong code' ,
            accepted : 'Right location : H2-04-B.' ,
            refused  : 'Wrong location : expected H2-04-B, scanned H2-04-C.' ,
            waiting  : 'No scan yet.' ,
        } ,
    } ,
} ;

export default feedback ;
