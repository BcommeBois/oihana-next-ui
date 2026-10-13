/**
 * Labels of the signature pad demo.
 */
const signature =
{
    fr :
    {
        intro : 'Signez au doigt, au stylet ou à la souris. La valeur n’est pas une image mais le tracé — quelques kilo-octets que l’application stocke, réaffiche à toute taille et convertit quand elle en a besoin. Le trait est épais là où la main ralentit, fin là où elle accélère.' ,

        pad :
        {
            title    : 'Le pad' ,
            label    : 'Signature du client' ,
            helper   : 'Annuler retire le dernier trait, Effacer repart de zéro.' ,
            strokes  : '{0} trait(s), {1} point(s)' ,
            empty    : 'rien de signé' ,
            png      : 'PNG' ,
            svg      : 'SVG' ,
            json     : 'La valeur' ,
            download : 'Télécharger le PNG' ,
        } ,

        readOnly :
        {
            title : 'Une signature reçue' ,
            text  : 'En lecture seule, le pad montre un tracé et n’en prend aucun : la même valeur, mise à l’échelle de sa boîte.' ,
            label : 'Signée le 12 octobre' ,
            replay : 'Rejouer' ,
            replayHelp : 'Chaque point porte son instant : la signature se redessine à sa vitesse réelle. Sans animation quand le système la réduit.' ,
        } ,

        form :
        {
            title  : 'Dans un formulaire' ,
            text   : 'Avec name, un champ caché envoie la signature : un PNG en data URL par défaut, format="svg" ou "json" sinon. Vide tant que rien n’est signé. Avec required, le navigateur retient le formulaire et le pad dit qu’une signature manque ; un simple tap (moins de 12 points) est effacé.' ,
            label  : 'Bon pour accord' ,
            helper : 'Le bouton du coin ouvre le pad en plein écran : signez en grand, puis Valider.' ,
            submit : 'Envoyer' ,
            sent   : 'Le formulaire a envoyé « {0} » : {1} caractères, commençant par {2}' ,
            none   : 'Le formulaire a envoyé une valeur vide.' ,
        } ,

        keep :
        {
            title    : 'D’un rechargement à l’autre' ,
            text     : 'La valeur est un objet : elle se garde telle quelle. Ce pad l’écrit dans le stockage du navigateur à chaque trait et la relit au montage — rechargez la page.' ,
            label    : 'Signature conservée' ,
            restored : 'Restaurée depuis le stockage' ,
        } ,

        proof :
        {
            title : 'Ce que vaut une signature dessinée' ,
            text  : 'Une image, pas une signature électronique qualifiée. Ce qui en fait une preuve est à l’application : qui a signé, quand (l’heure du serveur), et sur quoi — l’empreinte SHA-256 du document tel qu’il était, gardée à côté du tracé. helpers/crypto/sha256 la calcule ; le scénario Logistique › Réception montre la recette complète.' ,
        } ,
    } ,
    en :
    {
        intro : 'Sign with a finger, a stylus or a mouse. The value is not an image but the strokes — a few kilobytes the application stores, shows again at any size and converts when it needs to. The stroke is thick where the hand slows, thin where it speeds up.' ,

        pad :
        {
            title    : 'The pad' ,
            label    : 'Customer signature' ,
            helper   : 'Undo removes the last stroke, Clear starts over.' ,
            strokes  : '{0} stroke(s), {1} point(s)' ,
            empty    : 'nothing signed' ,
            png      : 'PNG' ,
            svg      : 'SVG' ,
            json     : 'The value' ,
            download : 'Download the PNG' ,
        } ,

        readOnly :
        {
            title : 'A received signature' ,
            text  : 'Read-only, the pad shows strokes and takes none: the same value, scaled to its box.' ,
            label : 'Signed on 12 October' ,
            replay : 'Replay' ,
            replayHelp : 'Every point carries its moment: the signature draws itself again at its real speed. Still when the system reduces motion.' ,
        } ,

        form :
        {
            title  : 'In a form' ,
            text   : 'With name, a hidden input sends the signature: a PNG data url by default, format="svg" or "json" otherwise. Empty until something is signed. With required, the browser holds the form and the pad says a signature is missing; a mere tap (fewer than 12 points) is wiped.' ,
            label  : 'Approved' ,
            helper : 'The corner button opens the pad full screen: sign wide, then Confirm.' ,
            submit : 'Send' ,
            sent   : 'The form sent « {0} »: {1} characters, starting with {2}' ,
            none   : 'The form sent an empty value.' ,
        } ,

        keep :
        {
            title    : 'Across a reload' ,
            text     : 'The value is an object: it keeps as it is. This pad writes it to the browser’s storage after each stroke and reads it back on mount — reload the page.' ,
            label    : 'Kept signature' ,
            restored : 'Restored from storage' ,
        } ,

        proof :
        {
            title : 'What a drawn signature is worth' ,
            text  : 'A picture, not a qualified electronic signature. What makes it a proof is the application’s: who signed, when (the server’s clock), and on what — the SHA-256 digest of the document as it was, kept beside the strokes. helpers/crypto/sha256 computes it; the Logistics › Receiving scenario shows the whole recipe.' ,
        } ,
    } ,
} ;

export default signature ;
