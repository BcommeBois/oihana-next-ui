/**
 * Default labels of the input controls that carry an accessible name of their
 * own — the stepper buttons of `InputCounter` / `InputCurrency`, and the
 * visibility toggle of `InputPassword`.
 *
 * `address` and `geoPoint` are the exceptions : their labels *are* visible copy
 * — a field is unusable without a name, and a suggestion list that fails
 * silently tells nobody why. They sit here rather than in bundles of their own
 * because they belong to the same family.
 *
 * `search.placeholder` is the generic placeholder of `UrlSearch`, read only
 * when the calling screen's own bundle offers none — a list says what it
 * searches (« Search an article… »), and falls back here when it does not.
 *
 * `password.rules` and `password.strength` are visible copy too : the
 * checklist and the meter a reader is shown under a new-password field. Their
 * `length` line carries a `{0}`, filled with the length the host asks for — a
 * label that says « 8 » next to a field refusing anything under 12 is worse
 * than no label. A host owning its own wording passes a `path` instead.
 *
 * `keypad` names the keys of `NumericKeypad` that show a symbol (⌫, C, −, +),
 * the keypad itself when the host gives it no label, and words its submit
 * button — visible copy, that one.
 *
 * `scan` names the camera button and window of `InputScan`, and words a refused
 * code : `invalid` when the host's `validate` says no without a reason of its
 * own, `gs1` (with `{0}`, the encoder's detail) for a GS1 string typed wrong.
 *
 * `tags` is both : `add` and `remove` name the two controls of `InputTags`,
 * while `duplicate` and `invalid` are the sentences a refused entry shows — a
 * field that silently drops what was typed tells nobody why. A host with a
 * reason of its own passes it from `validateTag`.
 *
 * The rest are `aria-label` (and `title`) values only : nothing there is visible
 * copy. They were hardcoded English in each signature and never passed by any
 * host, so a screen reader announced them in English on an otherwise French
 * form.
 */
const input =
{
    fr :
    {
        address :
        {
            empty     : 'Aucune adresse trouvée' ,
            error     : 'La recherche a échoué' ,
            searching : 'Recherche…' ,
        } ,

        counter :
        {
            decrease : 'Diminuer' ,
            increase : 'Augmenter' ,
        } ,

        geoPoint :
        {
            latitude  : 'Latitude' ,
            longitude : 'Longitude' ,
        } ,

        keypad :
        {
            backspace : 'Effacer le dernier chiffre' ,
            clear     : 'Tout effacer' ,
            decrease  : 'Diminuer' ,
            increase  : 'Augmenter' ,
            label     : 'Pavé numérique' ,
            submit    : 'Valider' ,
        } ,

        password :
        {
            hide : 'Masquer le mot de passe' ,
            show : 'Afficher le mot de passe' ,

            rules :
            {
                digit     : 'Un chiffre' ,
                length    : 'Au moins {0} caractères' ,
                lowercase : 'Une lettre minuscule' ,
                match     : 'Les deux mots de passe sont identiques' ,
                symbol    : 'Un caractère spécial' ,
                uppercase : 'Une lettre majuscule' ,
            } ,

            strength :
            {
                medium : 'Moyen' ,
                strong : 'Fort' ,
                weak   : 'Faible' ,
            } ,
        } ,

        scan :
        {
            camera  : 'Scanner avec la caméra' ,
            title   : 'Scanner un code' ,
            invalid : 'Ce code n’est pas accepté ici.' ,
            gs1     : 'Code GS1 invalide : {0}' ,
        } ,

        search :
        {
            placeholder : 'Rechercher…' ,
        } ,

        tags :
        {
            add       : 'Ajouter' ,
            duplicate : 'Déjà présent dans la liste.' ,
            invalid   : 'Cette entrée ne peut pas être ajoutée.' ,
            remove    : 'Retirer' ,
        } ,
    } ,

    en :
    {
        address :
        {
            empty     : 'No address found' ,
            error     : 'The search failed' ,
            searching : 'Searching…' ,
        } ,

        counter :
        {
            decrease : 'Decrease' ,
            increase : 'Increase' ,
        } ,

        geoPoint :
        {
            latitude  : 'Latitude' ,
            longitude : 'Longitude' ,
        } ,

        keypad :
        {
            backspace : 'Delete the last digit' ,
            clear     : 'Clear' ,
            decrease  : 'Decrease' ,
            increase  : 'Increase' ,
            label     : 'Numeric keypad' ,
            submit    : 'Confirm' ,
        } ,

        password :
        {
            hide : 'Hide password' ,
            show : 'Show password' ,

            rules :
            {
                digit     : 'One digit' ,
                length    : 'At least {0} characters' ,
                lowercase : 'One lowercase letter' ,
                match     : 'Both passwords match' ,
                symbol    : 'One special character' ,
                uppercase : 'One uppercase letter' ,
            } ,

            strength :
            {
                medium : 'Medium' ,
                strong : 'Strong' ,
                weak   : 'Weak' ,
            } ,
        } ,

        scan :
        {
            camera  : 'Scan with the camera' ,
            title   : 'Scan a code' ,
            invalid : 'This code is not accepted here.' ,
            gs1     : 'Invalid GS1 code : {0}' ,
        } ,

        search :
        {
            placeholder : 'Search…' ,
        } ,

        tags :
        {
            add       : 'Add' ,
            duplicate : 'Already in the list.' ,
            invalid   : 'This entry cannot be added.' ,
            remove    : 'Remove' ,
        } ,
    } ,
} ;

export default input ;
