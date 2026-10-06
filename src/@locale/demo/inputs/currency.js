const currency =
{
    fr :
    {
        title : 'Des montants' ,

        probe :
        {
            title        : 'Banc de frappe' ,
            note         : 'Tapez dans l’un ou l’autre : le badge doit suivre chaque frappe, décimales comprises. Un badge resté sur « vide » signifie que la frappe a été jetée.' ,
            controlled   : 'Contrôlé (FR, 2 décimales)' ,
            uncontrolled : 'Non contrôlé (defaultValue + onChange)' ,
        } ,

        eur : { label : 'Prix (EUR)' } ,
        usd : { label : 'Prix (USD)' } ,

        fieldset :
        {
            legend : 'Prix de l’article' ,
            helper : 'Le prix doit être entre 0 et 999,99.' ,
        } ,

        controlled : { label : 'Prix contrôlé' } ,
        noStepper  : { label : 'Sans les flèches' } ,
        noIcon     : { label : 'Sans icône' } ,
        french     : { label : 'Prix (format FR)' } ,
        noPadding  : { label : 'Sans zéros de remplissage' } ,

        error :
        {
            label : 'Prix' ,
            error : 'Le prix doit être supérieur à 0.' ,
        } ,

        disabled : { label : 'Désactivé' } ,
        readOnly : { label : 'En lecture seule' } ,
    } ,

    en :
    {
        title : 'Amounts' ,

        probe :
        {
            title        : 'Typing bench' ,
            note         : 'Type in either field : the badge must follow every keystroke, decimals included. A badge stuck on « empty » means the keystroke was thrown away.' ,
            controlled   : 'Controlled (FR, 2 decimals)' ,
            uncontrolled : 'Uncontrolled (defaultValue + onChange)' ,
        } ,

        eur : { label : 'Price (EUR)' } ,
        usd : { label : 'Price (USD)' } ,

        fieldset :
        {
            legend : 'Item price' ,
            helper : 'The price must be between 0 and 999.99.' ,
        } ,

        controlled : { label : 'Controlled price' } ,
        noStepper  : { label : 'Without the steppers' } ,
        noIcon     : { label : 'Without an icon' } ,
        french     : { label : 'Price (French format)' } ,
        noPadding  : { label : 'Without zero padding' } ,

        error :
        {
            label : 'Price' ,
            error : 'The price must be greater than 0.' ,
        } ,

        disabled : { label : 'Disabled' } ,
        readOnly : { label : 'Read-only' } ,
    } ,
} ;

export default currency ;
