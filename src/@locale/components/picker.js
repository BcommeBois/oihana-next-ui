/**
 * Default labels of the picker family — `Popover` and the inputs built on it
 * (`InputColor`, `InputDatePicker`, `InputDateRangePicker`, `InputDateTimePicker`,
 * `InputTimePicker`).
 *
 * `Popover` reads the root keys (`apply`, `cancel`) ; each input reads its own
 * sub-block for the labels that name *what* is being picked, and leaves the two
 * footer buttons to `Popover`. `InputColor` is the exception : it opens a `Modal`
 * rather than a `Popover`, so it reads `apply` / `cancel` here itself — the
 * picker wording (« Appliquer ») is not the modal one (« OK »).
 *
 * `clear` and `open` at the root are last resorts for a variant that declares
 * neither ; prefer naming the target in the sub-block, an aria-label saying
 * « Effacer » alone tells a screen reader nothing.
 */
const picker =
{
    fr :
    {
        apply  : 'Appliquer' ,
        cancel : 'Annuler' ,
        clear  : 'Effacer' ,
        open   : 'Ouvrir' ,

        color :
        {
            clear      : 'Retirer la couleur' ,
            eyeDropper : 'Choisir une couleur à l’écran' ,
            presets    : 'Préréglages' ,
            title      : 'Choisir une couleur' ,
        } ,

        date :
        {
            clear : 'Effacer la date' ,
            open  : 'Ouvrir le calendrier' ,
        } ,

        dateRange :
        {
            clear : 'Effacer la période' ,
            open  : 'Ouvrir le calendrier' ,
        } ,

        dateTime :
        {
            clear : 'Effacer la date et l’heure' ,
            open  : 'Ouvrir le sélecteur de date et d’heure' ,
        } ,

        time :
        {
            clear : 'Effacer l’heure' ,
            now   : 'Maintenant' ,
            open  : 'Ouvrir le sélecteur d’heure' ,
        } ,
    } ,

    en :
    {
        apply  : 'Apply' ,
        cancel : 'Cancel' ,
        clear  : 'Clear' ,
        open   : 'Open' ,

        color :
        {
            clear      : 'Clear color' ,
            eyeDropper : 'Pick a color from the screen' ,
            presets    : 'Presets' ,
            title      : 'Pick a color' ,
        } ,

        date :
        {
            clear : 'Clear date' ,
            open  : 'Open calendar' ,
        } ,

        dateRange :
        {
            clear : 'Clear date range' ,
            open  : 'Open calendar' ,
        } ,

        dateTime :
        {
            clear : 'Clear date-time' ,
            open  : 'Open date-time picker' ,
        } ,

        time :
        {
            clear : 'Clear time' ,
            now   : 'Now' ,
            open  : 'Open time picker' ,
        } ,
    } ,
} ;

export default picker ;
