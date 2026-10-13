/**
 * Labels of the rating demo : `Rating`, `NumberRating` and `IconRating`.
 *
 * API values — a gap, a shape, a count — label their own example : they are
 * not copy, and stay out of this file.
 */
const rating =
{
    fr :
    {
        clear : 'Effacer' ,
        value : 'Valeur :' ,

        rating :
        {
            title      : '⭐ Rating (étoiles et masques)' ,
            simple     : 'Note simple' ,
            gap        : 'Avec espacement' ,
            noGap      : 'Sans espace' ,
            responsive : 'Adaptatif' ,
            sizes      : 'Toutes les tailles' ,
            colors     : 'Couleurs' ,
            shapes     : 'Formes' ,
            half       : 'Demi-étoiles' ,
            controlled : 'Note contrôlée' ,
        } ,

        states :
        {
            title    : 'Lecture seule et désactivé' ,
            readOnly : 'Lecture seule' ,
            disabled : 'Désactivé' ,
            noClear  : 'Sans effacement' ,
        } ,

        number :
        {
            title       : '🔢 NumberRating (boutons)' ,
            simple      : 'NumberRating simple' ,
            shapes      : 'Carré ou rond' ,
            circleValue : 'Valeur du rond :' ,
            colors      : 'Combinaisons de couleurs' ,
            count       : 'Nombre d’éléments' ,
            content     : 'Contenu personnalisé' ,
            emoji       : 'Émojis' ,
            letters     : 'Lettres' ,
            stars       : 'Étoiles dans les boutons' ,
            controlled  : 'NumberRating contrôlé' ,
        } ,

        useCases :
        {
            title : '💼 Cas d’usage' ,

            product :
            {
                name        : 'Smartphone X' ,
                description : 'Le dernier haut de gamme, plein de fonctions.' ,
                rate        : 'Votre note :' ,
                buy         : 'Acheter' ,
            } ,

            reviews :
            {
                title : 'Avis clients' ,
                items :
                [
                    { initials : 'JD' , name : 'Jeanne Dupuis' , text : 'Excellent produit ! Je le recommande vivement.' , value : 5 } ,
                    { initials : 'AM' , name : 'Antoine Martin' , text : 'Un bon rapport qualité-prix.' , value : 4 } ,
                ] ,
            } ,

            survey :
            {
                title   : 'Enquête de satisfaction' ,
                service : 'Notez notre service (1 à 10) :' ,
                overall : 'Votre expérience globale :' ,
            } ,
        } ,

        icons :
        {
            title    : '⭐ IconRating (icônes)' ,
            stars    : 'Étoiles' ,
            default  : 'Par défaut' ,
            gap      : 'Avec espacement' ,
            circle   : 'Forme ronde' ,
            others   : 'Autres icônes' ,
            hearts   : 'Cœurs' ,
            thumbs   : 'Pouces' ,
            colors   : 'Couleurs personnalisées' ,
        } ,

        responsive :
        {
            title  : 'Taille adaptative' ,
            before : 'size accepte un objet point de rupture → taille. Redimensionnez la fenêtre : cette note grandit de ' ,
            after  : ' au fil des points de rupture.' ,
        } ,

        names :
        {
            title      : 'Noms accessibles' ,
            text       : 'Chaque élément se lit « 3 sur 5 », dans la langue affichée — quoi qu’il montre : étoiles, cœurs ou chiffres. ariaLabel dit ce qui est noté ; en lecture seule, toute la valeur se lit d’un coup ; itemLabel remplace les mots. Vérifiez-les dans l’inspecteur d’accessibilité.' ,
            quality    : 'Qualité' ,
            named      : 'ariaLabel « Qualité »' ,
            average    : 'Note moyenne' ,
            readOnly   : 'Lecture seule, demi-note' ,
            hearts     : 'Cœurs' ,
            liked      : 'À quel point vous avez aimé' ,
            service    : 'Service' ,
            itemLabel  : 'itemLabel' ,
            levels     : [ 'Mauvais' , 'Passable' , 'Bien' , 'Très bien' , 'Excellent' ] ,
        } ,

        form :
        {
            title    : 'Dans un formulaire' ,
            text     : 'Avec un name, chaque note part avec le formulaire : la valeur choisie, 0 si elle est effacée. Une note en lecture seule part aussi ; une note désactivée, non.' ,
            readOnly : 'Lecture seule' ,
            disabled : 'Désactivé' ,
            send     : 'Envoyer' ,
            sent     : 'Envoyé :' ,
        } ,
    } ,

    en :
    {
        clear : 'Clear' ,
        value : 'Value:' ,

        rating :
        {
            title      : '⭐ Rating (stars and masks)' ,
            simple     : 'Simple rating' ,
            gap        : 'With a gap' ,
            noGap      : 'No gap' ,
            responsive : 'Responsive' ,
            sizes      : 'All sizes' ,
            colors     : 'Colours' ,
            shapes     : 'Shapes' ,
            half       : 'Half stars' ,
            controlled : 'Controlled rating' ,
        } ,

        states :
        {
            title    : 'Read-only and disabled' ,
            readOnly : 'Read-only' ,
            disabled : 'Disabled' ,
            noClear  : 'No clear' ,
        } ,

        number :
        {
            title       : '🔢 NumberRating (buttons)' ,
            simple      : 'Simple NumberRating' ,
            shapes      : 'Square or circle' ,
            circleValue : 'Circle value:' ,
            colors      : 'Colour combinations' ,
            count       : 'Number of items' ,
            content     : 'Custom content' ,
            emoji       : 'Emoji' ,
            letters     : 'Letters' ,
            stars       : 'Stars in buttons' ,
            controlled  : 'Controlled NumberRating' ,
        } ,

        useCases :
        {
            title : '💼 Use cases' ,

            product :
            {
                name        : 'Smartphone X' ,
                description : 'The latest flagship, packed with features.' ,
                rate        : 'Your rating:' ,
                buy         : 'Buy now' ,
            } ,

            reviews :
            {
                title : 'Customer reviews' ,
                items :
                [
                    { initials : 'JD' , name : 'John Doe' , text : 'Excellent product! Highly recommended.' , value : 5 } ,
                    { initials : 'AS' , name : 'Alice Smith' , text : 'Good value for money.' , value : 4 } ,
                ] ,
            } ,

            survey :
            {
                title   : 'Satisfaction survey' ,
                service : 'Rate our service (1 to 10):' ,
                overall : 'Overall experience:' ,
            } ,
        } ,

        icons :
        {
            title    : '⭐ IconRating (icons)' ,
            stars    : 'Stars' ,
            default  : 'Default' ,
            gap      : 'With a gap' ,
            circle   : 'Circle shape' ,
            others   : 'Other icons' ,
            hearts   : 'Hearts' ,
            thumbs   : 'Thumbs' ,
            colors   : 'Custom colours' ,
        } ,

        responsive :
        {
            title  : 'Responsive size' ,
            before : 'size accepts a breakpoint → size object. Resize the window: this rating grows ' ,
            after  : ' across breakpoints.' ,
        } ,

        names :
        {
            title      : 'Accessible names' ,
            text       : 'Each item is read « 3 out of 5 » in the language on screen — whatever it shows: stars, hearts or numbers. ariaLabel says what is rated; read-only, the whole value is read at once; itemLabel replaces the words. Check them in the accessibility inspector.' ,
            quality    : 'Quality' ,
            named      : 'ariaLabel « Quality »' ,
            average    : 'Average rating' ,
            readOnly   : 'Read-only, half' ,
            hearts     : 'Hearts' ,
            liked      : 'How much you liked it' ,
            service    : 'Service' ,
            itemLabel  : 'itemLabel' ,
            levels     : [ 'Poor' , 'Fair' , 'Good' , 'Very good' , 'Excellent' ] ,
        } ,

        form :
        {
            title    : 'In a form' ,
            text     : 'With a name, each rating is sent with the form: the chosen value, 0 when cleared. A read-only one is sent too; a disabled one is not.' ,
            readOnly : 'Read-only' ,
            disabled : 'Disabled' ,
            send     : 'Send' ,
            sent     : 'Sent:' ,
        } ,
    } ,
} ;

export default rating ;
