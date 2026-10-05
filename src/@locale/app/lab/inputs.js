/**
 * Labels of the lab's Inputs page : its title, its filter bar and the sentence
 * each component shows when it is the one being looked at.
 *
 * The `items` keys are the filter keys of the page, dashes included, so a row
 * and its sentence are read by the same name and cannot drift apart. The five
 * `categories` are named here too, while the page keeps identifiers of its own
 * — a category used both as a heading and as a grouping key cannot be a
 * translated string, or the grouping breaks in the other language.
 *
 * `title` and `description` are also what `I18nMetas` puts in the document.
 */
const inputs =
{
    fr :
    {
        title       : 'Les champs de saisie' ,
        description : 'La collection des champs : du texte, des nombres, des dates et des heures, des mots de passe, et ce qui valide.' ,
        tip         : '💡 Les onglets filtrent par catégorie, ou isolent un composant.' ,
        count       : '{0} composant(s)' ,

        categories :
        {
            dates       : 'Date et heure' ,
            numbers     : 'Nombres' ,
            security    : 'Sécurité' ,
            specialized : 'Spécialisés' ,
            text        : 'Texte' ,
        } ,

        items :
        {
            'all' :
            {
                label       : 'Tous' ,
                description : 'Tous les champs de la page, groupés par catégorie.' ,
            } ,
            'transform' :
            {
                label       : 'Transformation' ,
                description : 'La saisie transformée à la frappe : majuscules, minuscules, capitales.' ,
            } ,
            'clear' :
            {
                label       : 'Effacer' ,
                description : 'Un champ qui porte son propre bouton d’effacement.' ,
            } ,
            'search' :
            {
                label       : 'Recherche' ,
                description : 'Un champ de recherche, immédiat ou différé.' ,
            } ,
            'sizes' :
            {
                label       : 'Tailles' ,
                description : 'Les boutons collés à un champ prennent sa taille.' ,
            } ,
            'action' :
            {
                label       : 'Action' ,
                description : 'Un champ avec un bouton collé, qui valide la saisie au clic ou à Entrée.' ,
            } ,
            'tags' :
            {
                label       : 'Étiquettes' ,
                description : 'Une liste d’entrées construite une à une, chacune refusable avec sa raison.' ,
            } ,
            'i18n-input' :
            {
                label       : 'Multilingue' ,
                description : 'Un champ qui garde une valeur par langue.' ,
            } ,
            'counter' :
            {
                label       : 'Compteur' ,
                description : 'Un nombre, avec ses deux boutons.' ,
            } ,
            'currency' :
            {
                label       : 'Monnaie' ,
                description : 'Un montant, avec son symbole et son format.' ,
            } ,
            'percentage' :
            {
                label       : 'Pourcentage' ,
                description : 'Un pourcentage, borné.' ,
            } ,
            'date' :
            {
                label       : 'Date' ,
                description : 'Une date au clavier, dans le format demandé.' ,
            } ,
            'date-range' :
            {
                label       : 'Période' ,
                description : 'Deux dates : un début et une fin.' ,
            } ,
            'time' :
            {
                label       : 'Heure' ,
                description : 'Une heure au clavier.' ,
            } ,
            'password' :
            {
                label       : 'Mot de passe' ,
                description : 'Un mot de passe et sa bascule d’affichage.' ,
            } ,
            'password-strength' :
            {
                label       : 'Robustesse' ,
                description : 'La jauge, la liste de règles, et le couple nouveau / confirmation.' ,
            } ,
            'pin' :
            {
                label       : 'Code' ,
                description : 'Un code saisi chiffre par chiffre.' ,
            } ,
            'validator' :
            {
                label       : 'Validation' ,
                description : 'Les règles HTML5 et le message qu’elles affichent.' ,
            } ,
            'card' :
            {
                label       : 'Carte' ,
                description : 'Un numéro de carte, formaté à la frappe.' ,
            } ,
            'hex-color' :
            {
                label       : 'Couleur' ,
                description : 'Une couleur en hexadécimal (#RRGGBB).' ,
            } ,
            'url-email' :
            {
                label       : 'URL et e-mail' ,
                description : 'Deux champs qui valident ce qu’ils attendent.' ,
            } ,
        } ,
    } ,

    en :
    {
        title       : 'Input components' ,
        description : 'The collection of fields : text, numbers, dates and times, passwords, and what validates.' ,
        tip         : '💡 The tabs filter by category, or isolate one component.' ,
        count       : '{0} component(s)' ,

        categories :
        {
            dates       : 'Date & time' ,
            numbers     : 'Numbers' ,
            security    : 'Security' ,
            specialized : 'Specialized' ,
            text        : 'Text' ,
        } ,

        items :
        {
            'all' :
            {
                label       : 'All' ,
                description : 'Every field of the page, grouped by category.' ,
            } ,
            'transform' :
            {
                label       : 'Transform' ,
                description : 'The draft transformed as it is typed : upper case, lower case, capitals.' ,
            } ,
            'clear' :
            {
                label       : 'Clear' ,
                description : 'A field carrying its own clear button.' ,
            } ,
            'search' :
            {
                label       : 'Search' ,
                description : 'A search field, immediate or deferred.' ,
            } ,
            'sizes' :
            {
                label       : 'Sizes' ,
                description : 'The buttons attached to a field follow its size.' ,
            } ,
            'action' :
            {
                label       : 'Action' ,
                description : 'A field with a trailing button that commits the draft on click or Enter.' ,
            } ,
            'tags' :
            {
                label       : 'Tags' ,
                description : 'A list of entries built one at a time, each refusable with its own reason.' ,
            } ,
            'i18n-input' :
            {
                label       : 'Multilingual' ,
                description : 'A field holding one value per language.' ,
            } ,
            'counter' :
            {
                label       : 'Counter' ,
                description : 'A number, with its two buttons.' ,
            } ,
            'currency' :
            {
                label       : 'Currency' ,
                description : 'An amount, with its symbol and its format.' ,
            } ,
            'percentage' :
            {
                label       : 'Percentage' ,
                description : 'A percentage, bounded.' ,
            } ,
            'date' :
            {
                label       : 'Date' ,
                description : 'A date typed in, in the format asked for.' ,
            } ,
            'date-range' :
            {
                label       : 'Range' ,
                description : 'Two dates : a start and an end.' ,
            } ,
            'time' :
            {
                label       : 'Time' ,
                description : 'A time typed in.' ,
            } ,
            'password' :
            {
                label       : 'Password' ,
                description : 'A password and its visibility toggle.' ,
            } ,
            'password-strength' :
            {
                label       : 'Strength' ,
                description : 'The meter, the rule checklist, and the new / confirm couple.' ,
            } ,
            'pin' :
            {
                label       : 'PIN' ,
                description : 'A code typed one digit at a time.' ,
            } ,
            'validator' :
            {
                label       : 'Validator' ,
                description : 'The HTML5 rules and the message they show.' ,
            } ,
            'card' :
            {
                label       : 'Card' ,
                description : 'A card number, formatted as it is typed.' ,
            } ,
            'hex-color' :
            {
                label       : 'Colour' ,
                description : 'A colour in hexadecimal (#RRGGBB).' ,
            } ,
            'url-email' :
            {
                label       : 'URL & e-mail' ,
                description : 'Two fields that validate what they expect.' ,
            } ,
        } ,
    } ,
} ;

export default inputs ;
