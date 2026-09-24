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

        search :
        {
            placeholder : 'Rechercher…' ,
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

        search :
        {
            placeholder : 'Search…' ,
        } ,
    } ,
} ;

export default input ;
