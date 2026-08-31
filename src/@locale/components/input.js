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
        } ,
    } ,
} ;

export default input ;
