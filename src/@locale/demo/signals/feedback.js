const feedback =
{
    fr :
    {
        master :
        {
            title     : 'L’interrupteur général de l’appareil' ,
            note      : 'FeedbackProvider garde ces réglages sur l’appareil et commande tous les signaux de l’application : coupé ici, plus rien ne sonne, quels que soient les réglages de l’écran plus bas — un écran peut couper, jamais rallumer. Le même SoundButton est dans la barre du haut.' ,
            sound     : 'Son' ,
            vibration : 'Vibration' ,
            volume    : 'Volume par défaut' ,
        } ,
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
            title      : 'Réglages de l’écran' ,
            note       : 'Ceux que l’écran passe au hook : ils ne peuvent que couper ce que l’interrupteur général autorise.' ,
            sound      : 'Son' ,
            vibration  : 'Vibration' ,
            volume     : 'Volume' ,
            device     : 'appareil' ,
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
        master :
        {
            title     : 'The device’s master switch' ,
            note      : 'FeedbackProvider keeps these settings on the device and rules every signal of the application : off here, nothing sounds, whatever the screen’s settings below say — a screen can silence, never sound again. The same SoundButton sits in the top bar.' ,
            sound     : 'Sound' ,
            vibration : 'Vibration' ,
            volume    : 'Default volume' ,
        } ,
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
            title      : 'The screen’s settings' ,
            note       : 'The ones the screen hands to the hook : they can only silence what the master switch allows.' ,
            sound      : 'Sound' ,
            vibration  : 'Vibration' ,
            volume     : 'Volume' ,
            device     : 'device' ,
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
