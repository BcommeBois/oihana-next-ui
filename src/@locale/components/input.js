/**
 * Default labels of the input controls that carry an accessible name of their
 * own — the stepper buttons of `InputCounter` / `InputCurrency`, and the
 * visibility toggle of `InputPassword`.
 *
 * `geoPoint` is the exception : its two labels *are* visible copy, a field
 * being unusable without one. It sits here rather than in a bundle of its own
 * because it belongs to the same family.
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
